"""OpenAI-only resume tailoring with a preflight budget and no automatic retries."""

import json
from dataclasses import dataclass
from decimal import Decimal

from openai import OpenAI

# Standard, uncached USD / 1M tokens. Verify before changing model/pricing.
# https://developers.openai.com/api/docs/models/gpt-4.1-mini
# https://developers.openai.com/api/docs/models/gpt-4.1
MODEL_PRICES = {
    "gpt-4.1-mini-2025-04-14": (Decimal("0.40"), Decimal("1.60")),
    "gpt-4.1-mini": (Decimal("0.40"), Decimal("1.60")),
    "gpt-4.1-2025-04-14": (Decimal("2.00"), Decimal("8.00")),
    "gpt-4.1": (Decimal("2.00"), Decimal("8.00")),
}
OPENAI_BASE_URL = "https://api.openai.com/v1"


@dataclass(frozen=True)
class GenerationLimits:
    model: str = "gpt-4.1-mini-2025-04-14"
    max_input_tokens: int = 24000
    max_output_tokens: int = 4096
    max_cost_usd: Decimal = Decimal("0.02")

    def validate(self):
        if self.model not in MODEL_PRICES:
            raise ValueError("Model has no reviewed price; choose a supported --model.")
        if not 1 <= self.max_input_tokens <= 1000000:
            raise ValueError("max-input-tokens must be between 1 and 1000000.")
        if not 1 <= self.max_output_tokens <= 32768:
            raise ValueError("max-output-tokens must be between 1 and 32768.")
        if not self.max_cost_usd.is_finite() or self.max_cost_usd <= 0:
            raise ValueError("max-cost-usd must be a finite, positive decimal.")


def prepare_request(system_prompt, master_json, job_description, limits):
    """Pure local preflight; no credential use or network activity."""
    limits.validate()
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": (
            "Here is my master resume data (source facts):\n"
            + master_json
            + "\n\nJob description (target requirements, not candidate facts):\n"
            + job_description
            + "\n\nTailor my resume for this position. Return only the JSON."
        )},
    ]
    # For these byte-level BPE text models, tokens cannot exceed UTF-8 bytes.
    # Add 1024 tokens for the two-message framing and JSON-mode overhead.
    # This deliberately overestimates instead of relying on a token heuristic.
    input_bound = sum(len(m["content"].encode("utf-8")) for m in messages) + 1024
    if input_bound > limits.max_input_tokens:
        raise ValueError(
            f"Conservative input bound {input_bound} exceeds max-input-tokens "
            f"{limits.max_input_tokens}; shorten the input or explicitly raise the limit."
        )
    input_price, output_price = MODEL_PRICES[limits.model]
    cost_bound = (
        input_bound * input_price + limits.max_output_tokens * output_price
    ) / Decimal(1000000)
    if cost_bound > limits.max_cost_usd:
        raise ValueError(
            f"Request cost bound ${cost_bound:.8f} exceeds budget "
            f"${limits.max_cost_usd}; no request sent."
        )
    report = {
        "provider": "OpenAI",
        "endpoint": OPENAI_BASE_URL,
        "model": limits.model,
        "input_token_upper_bound": input_bound,
        "max_input_tokens": limits.max_input_tokens,
        "max_output_tokens": limits.max_output_tokens,
        "input_usd_per_million": str(input_price),
        "output_usd_per_million": str(output_price),
        "request_cost_upper_bound_usd": str(cost_bound),
        "budget_usd": str(limits.max_cost_usd),
        "max_requests": 1,
        "automatic_retries": 0,
        "pricing_note": "Standard uncached rates; recheck official pricing before use.",
    }
    return messages, report


def generate_tailored(messages, limits, api_key):
    """One request to OpenAI. Do not inherit another API destination or retry."""
    if not api_key or not api_key.strip():
        raise ValueError("OPENAI_API_KEY is not configured.")
    # Recheck all limits at the network boundary, even for non-CLI callers.
    limits.validate()
    if len(messages) != 2 or [m.get("role") for m in messages] != ["system", "user"]:
        raise ValueError("Expected exactly one system and one user text message.")
    bound = sum(len(m["content"].encode("utf-8")) for m in messages) + 1024
    prices = MODEL_PRICES[limits.model]
    cost = (bound * prices[0] + limits.max_output_tokens * prices[1]) / Decimal(1000000)
    if bound > limits.max_input_tokens or cost > limits.max_cost_usd:
        raise ValueError("Request exceeds input or cost limits; no request sent.")
    with OpenAI(
        api_key=api_key, base_url=OPENAI_BASE_URL, max_retries=0, timeout=90.0
    ) as client:
        response = client.chat.completions.create(
            model=limits.model,
            max_completion_tokens=limits.max_output_tokens,
            messages=messages,
            response_format={"type": "json_object"},
            store=False,
            n=1,
        )
    choice = response.choices[0]
    if choice.finish_reason != "stop" or choice.message.refusal:
        raise ValueError("OpenAI did not return a complete resume; no automatic retry.")
    if not choice.message.content:
        raise ValueError("OpenAI returned no resume content.")
    try:
        tailored = json.loads(choice.message.content)
    except json.JSONDecodeError:
        raise ValueError("OpenAI returned invalid JSON; response omitted for privacy.") from None
    usage = response.usage
    usage_report = {"model": response.model}
    if usage:
        actual_cost = (
            usage.prompt_tokens * prices[0] + usage.completion_tokens * prices[1]
        ) / Decimal(1000000)
        usage_report.update({
            "input_tokens": usage.prompt_tokens,
            "output_tokens": usage.completion_tokens,
            "uncached_cost_upper_bound_usd": str(actual_cost),
        })
    return tailored, usage_report
