"""Offline regression checks for billing, data integrity and PDF generation."""

import copy
import io
import json
import sys
import tempfile
import unittest
from decimal import Decimal
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import httpx
from openai import OpenAI as RealOpenAI, InternalServerError
from pypdf import PdfReader

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import generateTailoredResume as generator
import resume_openai as provider


def source_resume():
    data = json.loads(generator.build_master_json())
    data["projects"] = data["projects"][:3]
    data["coursework"] = []
    for section in ["work_experience", "projects", "campus_involvement"]:
        for entry in data[section]:
            entry["bullets"] = entry["bullets"][:2]
    return data


class ProviderTests(unittest.TestCase):
    def test_budget_and_input_limits_reject_before_client_creation(self):
        with patch.object(provider, "OpenAI") as client:
            for limits in [
                provider.GenerationLimits(max_cost_usd=Decimal("0.000001")),
                provider.GenerationLimits(max_input_tokens=10),
                provider.GenerationLimits(model="unknown-model"),
                provider.GenerationLimits(max_cost_usd=Decimal("NaN")),
                provider.GenerationLimits(max_cost_usd=Decimal("Infinity")),
                provider.GenerationLimits(max_output_tokens=0),
                provider.GenerationLimits(max_output_tokens=32769),
            ]:
                with self.subTest(limits=limits), self.assertRaises(ValueError):
                    provider.prepare_request("JSON", "{}", "role", limits)
            client.assert_not_called()

    def test_unicode_input_bound_and_exact_cost(self):
        limits = provider.GenerationLimits()
        messages, report = provider.prepare_request("JSON", "{}", "音楽", limits)
        expected = sum(len(m["content"].encode("utf-8")) for m in messages) + 1024
        self.assertEqual(report["input_token_upper_bound"], expected)
        cost = (Decimal(expected) * Decimal("0.4") + 4096 * Decimal("1.6")) / 1000000
        self.assertEqual(Decimal(report["request_cost_upper_bound_usd"]), cost)
        self.assertLess(cost, limits.max_cost_usd)
        self.assertEqual(report["max_requests"], 1)
        self.assertEqual(report["automatic_retries"], 0)

    def test_offline_preflight_contains_no_contact_or_core_education(self):
        messages, _ = provider.prepare_request(generator.SYSTEM_PROMPT, generator.build_master_json(), "role", provider.GenerationLimits())
        request = json.dumps(messages)
        for value in [generator.CONTACT["email"], generator.CONTACT["phone"], generator.EDUCATION["gpa"], generator.EDUCATION["school"]]:
            self.assertNotIn(value, request)

    def test_network_boundary_rechecks_mutated_input_and_missing_key(self):
        limits = provider.GenerationLimits()
        messages, _ = provider.prepare_request("JSON", "{}", "role", limits)
        with patch.object(provider, "OpenAI") as client:
            with self.assertRaises(ValueError):
                provider.generate_tailored(messages, limits, "")
            messages[1]["content"] = "x" * 24001
            with self.assertRaises(ValueError):
                provider.generate_tailored(messages, limits, "test-key")
            client.assert_not_called()

    def test_real_sdk_transport_is_openai_only_and_does_not_retry(self):
        requests = []

        def handle(request):
            requests.append(request)
            return httpx.Response(500, json={"error": {"message": "simulated server error"}})

        def client_factory(**kwargs):
            self.assertEqual(kwargs["base_url"], "https://api.openai.com/v1")
            self.assertEqual(kwargs["max_retries"], 0)
            return RealOpenAI(**kwargs, http_client=httpx.Client(transport=httpx.MockTransport(handle)))

        limits = provider.GenerationLimits()
        messages, _ = provider.prepare_request("JSON", "{}", "role", limits)
        with patch.dict("os.environ", {"OPENAI_BASE_URL": "https://unapproved.invalid/v1"}), patch.object(provider, "OpenAI", side_effect=client_factory):
            with self.assertRaises(InternalServerError):
                provider.generate_tailored(messages, limits, "test-key")
        self.assertEqual(len(requests), 1)
        self.assertEqual(str(requests[0].url), "https://api.openai.com/v1/chat/completions")
        payload = json.loads(requests[0].content)
        self.assertEqual(payload["max_completion_tokens"], 4096)
        self.assertEqual(payload["n"], 1)
        self.assertFalse(payload["store"])
        self.assertEqual(payload["response_format"], {"type": "json_object"})
        self.assertNotIn("tools", payload)

    def test_mock_response_usage_and_truncation(self):
        limits = provider.GenerationLimits()
        messages, _ = provider.prepare_request("JSON", "{}", "role", limits)
        response = SimpleNamespace(
            model=limits.model,
            choices=[SimpleNamespace(finish_reason="stop", message=SimpleNamespace(content='{"projects": []}', refusal=None))],
            usage=SimpleNamespace(prompt_tokens=100, completion_tokens=20),
        )
        with patch.object(provider, "OpenAI") as client:
            client.return_value.__enter__.return_value.chat.completions.create.return_value = response
            data, usage = provider.generate_tailored(messages, limits, "test-key")
            self.assertEqual(data, {"projects": []})
            self.assertEqual(Decimal(usage["uncached_cost_upper_bound_usd"]), Decimal("0.000072"))
            response.choices[0].finish_reason = "length"
            with self.assertRaisesRegex(ValueError, "complete resume"):
                provider.generate_tailored(messages, limits, "test-key")


class ResumeTests(unittest.TestCase):
    def test_changed_identity_and_unknown_projects_rejected(self):
        for mutate in [
            lambda d: d["work_experience"][0].update(title="Senior Engineer"),
            lambda d: d["campus_involvement"][0].update(dates="2020–Present"),
            lambda d: d["projects"][0].update(name="Invented project"),
            lambda d: d.update(coursework=["Invented course"]),
        ]:
            data = source_resume()
            mutate(data)
            with self.assertRaises(ValueError):
                generator.validate_tailored(data)

    def test_interests_validate_links_and_escape_html(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "interests.json"
            path.write_text(json.dumps([{"text": "Music <audio> & production", "url": "https://example.com/music"}]))
            interests = generator.load_interests(path)
            html = generator.build_tailored_html(source_resume(), interests)
            self.assertIn("Music &lt;audio&gt; &amp; production", html)
            self.assertIn('href="https://example.com/music"', html)
            for url in ["file:///tmp/private", "javascript:alert(1)", "http://example.com", "https://user:pass@example.com"]:
                path.write_text(json.dumps([{"text": "Music", "url": url}]))
                with self.assertRaises(ValueError):
                    generator.load_interests(path)

    def test_pdf_is_one_page_with_extractable_music_and_link(self):
        data = source_resume()
        original = copy.deepcopy(data)
        interests = [{"text": "Music: Create songs and learn production and mastering in my free time.", "url": "https://soundcloud.com/eli-schiffler"}]
        pdf = generator.render_pdf(generator.validate_tailored(data), interests)
        reader = PdfReader(io.BytesIO(pdf))
        self.assertEqual(len(reader.pages), 1)
        self.assertIn("production and mastering", reader.pages[0].extract_text())
        self.assertIn("eli-schiffler", reader.pages[0].extract_text())
        self.assertEqual(data, original)
        links = [a.get_object().get("/A", {}).get("/URI") for a in reader.pages[0].get("/Annots", [])]
        self.assertIn(interests[0]["url"], links)

    def test_overflow_rejected(self):
        data = source_resume()
        for section in ["work_experience", "projects", "campus_involvement"]:
            for entry in data[section]:
                entry["bullets"] = ["Detailed source fact. " * 28] * 3
        with self.assertRaisesRegex(ValueError, "exceeds one page"):
            generator.render_pdf(data, [])

    def test_dry_run_and_from_json_never_call_provider(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(generator, "generate_tailored") as api:
            root = Path(directory)
            jd = root / "job.txt"
            jd.write_text("Full-stack software engineer; SQL and quality.")
            with patch.object(sys, "argv", ["generator", str(jd), "--dry-run", "-o", str(root / "absent")]), patch("sys.stdout", new_callable=io.StringIO):
                generator.main()
            self.assertFalse((root / "absent").exists())
            source = root / "source.json"
            source.write_text(json.dumps(source_resume()))
            with patch.object(sys, "argv", ["generator", "--from-json", str(source), "-o", directory, "-n", "Offline"]), patch("sys.stdout", new_callable=io.StringIO):
                generator.main()
            self.assertTrue((root / "EliSchiffler_Resume_Offline.pdf").exists())
            api.assert_not_called()

    def test_existing_output_rejected_before_api(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(generator, "generate_tailored") as api:
            (Path(directory) / "EliSchiffler_Resume_Existing.pdf").write_bytes(b"preserve")
            with patch.object(sys, "argv", ["generator", "-o", directory, "-n", "Existing"]):
                with self.assertRaisesRegex(ValueError, "already exists"):
                    generator.main()
            api.assert_not_called()
            self.assertEqual((Path(directory) / "EliSchiffler_Resume_Existing.pdf").read_bytes(), b"preserve")


if __name__ == "__main__":
    unittest.main()
