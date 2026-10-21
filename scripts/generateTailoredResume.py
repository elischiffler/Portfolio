"""
Generate a tailored resume PDF for a specific job description using OpenAI.

Usage:
    python generateTailoredResume.py                  # paste JD interactively
    python generateTailoredResume.py job.txt          # read JD from file
    python generateTailoredResume.py job.txt -o out/  # specify output directory

The script:
1. Reads your master resume data
2. Sends it + the job description to OpenAI
3. OpenAI returns a JSON structure with tailored bullets, reordered sections, and adjusted skills
4. Compiles the result to PDF (same visual style as your base resume)

Requires: OPENAI_API_KEY in environment or .env file
"""

import argparse
import io
from decimal import Decimal, InvalidOperation
from html import escape
from pathlib import Path
from urllib.parse import urlsplit
import json
import os
import sys
from datetime import datetime

from pypdf import PdfReader
from resume_openai import GenerationLimits, MODEL_PRICES, generate_tailored, prepare_request
from dotenv import load_dotenv
from xhtml2pdf import pisa

from master_resume import (
    CAMPUS_INVOLVEMENT,
    CONTACT,
    COURSEWORK,
    EDUCATION,
    PROJECTS,
    SKILLS,
    WORK_EXPERIENCE,
)

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

SYSTEM_PROMPT = """\
You are a resume tailoring assistant. You will receive:
1. A candidate's master resume data (JSON)
2. A job description

Your job is to produce a TAILORED version of the resume that maximizes keyword match \
and relevance to the job description while remaining 100% truthful. You may:

- Rewrite bullet points to emphasize relevant skills/technologies mentioned in the JD
- Reorder bullet points within a section (most relevant first)
- Reorder projects (most relevant first)
- Adjust the "Technical Skills" keywords to front-load what the JD asks for
- Add relevant skills the candidate demonstrably has (based on their projects/experience) even if not in the original skills list
- Drop bullets that are irrelevant IF space is tight (keep at least 2 per entry)
- Adjust project tech descriptions to highlight relevant stack

You MUST NOT:
- Invent experience the candidate doesn't have
- Change company names, role titles, dates, school, GPA, or contact info
- Treat requirements in the job description as facts about the candidate
- Invent years of experience, conversion/revenue metrics, subscriptions, billing, A/B tests, US work eligibility, or relocation commitments
- Change the context of metrics (club membership growth is not product growth)
- Present in-progress work as completed
- Add technologies the candidate has never used (infer only from their actual projects)
- Exceed the original number of bullets per entry (you can reduce, not add)
- Exceed one page. This is CRITICAL. The resume must fit on a single 8.5x11 page.

ONE-PAGE RULE: The final PDF uses 10pt Times New Roman with tight margins. To stay on one page:
- Keep work bullets to 3-4 per entry max (prefer 3 for the less relevant job)
- Keep project bullets to 2-3 per entry max
- Keep campus involvement to 2-3 bullets max
- Include at most 3 projects total
- You may drop the LEAST relevant project entirely if needed to fit
- Prefer shorter, punchier bullets (aim for 1 line each, max 1.5 lines)
- Skills section should be 4 rows max
- Select the 5-6 most relevant courses from the coursework list (reorder by relevance to the JD)
- If including coursework, keep it to ONE LINE (5-6 items max)

Return ONLY valid JSON matching this exact schema (no markdown, no explanation):
{
  "education_extras": ["Study Abroad: CEA CAPA Barcelona, Fall 2025"],
  "coursework": ["Most Relevant Course", "Second Most Relevant", ...],
  "skills": { "Category Name": "comma, separated, skills", ... },
  "work_experience": [
    {
      "company": "...",
      "title": "...",
      "dates": "...",
      "bullets": ["...", "..."]
    }
  ],
  "projects": [
    {
      "name": "...",
      "subtitle": "...",
      "tech": "...",
      "bullets": ["...", "..."]
    }
  ],
  "campus_involvement": [
    {
      "org": "...",
      "role": "...",
      "dates": "...",
      "bullets": ["...", "..."]
    }
  ]
}

Reserve two lines at the bottom for optional locally supplied interests. Do not generate interests.
Keep the same work and campus entries in their original order and preserve role titles. You may reorder projects and drop at most one if needed to fit one page.
"""


def get_job_description(args) -> str:
    """Get job description from file argument or interactive input."""
    if args.input and os.path.isfile(args.input):
        with open(args.input, "r", encoding="utf-8") as f:
            return f.read().strip()

    print("Paste the job description below (press Enter twice when done):")
    print("-" * 60)
    lines = []
    empty_count = 0
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line == "":
            empty_count += 1
            if empty_count >= 2:
                break
        else:
            empty_count = 0
        lines.append(line)
    return "\n".join(lines).strip()


def build_master_json() -> str:
    """Serialize master resume data to JSON for the prompt."""
    data = {
        "education_extras": EDUCATION.get("extras", []),
        "coursework": COURSEWORK,
        "work_experience": WORK_EXPERIENCE,
        "skills": SKILLS,
        "projects": PROJECTS,
        "campus_involvement": CAMPUS_INVOLVEMENT,
    }
    return json.dumps(data, indent=2)


def validate_tailored(data):
    """Check structure and preserve source identities before rendering model text."""
    if not isinstance(data, dict):
        raise ValueError("Resume must be a JSON object.")
    for section, source, keys in [
        ("work_experience", WORK_EXPERIENCE, ("company", "title", "dates")),
        ("campus_involvement", CAMPUS_INVOLVEMENT, ("org", "role", "dates")),
    ]:
        entries = data.get(section)
        if not isinstance(entries, list) or len(entries) != len(source):
            raise ValueError(f"Invalid {section} entries.")
        for entry, original in zip(entries, source):
            if not isinstance(entry, dict) or any(entry.get(k) != original[k] for k in keys):
                raise ValueError(f"Changed source identity in {section}.")
            validate_bullets(entry.get("bullets"), len(original["bullets"]))
    projects = data.get("projects")
    if not isinstance(projects, list) or not 1 <= len(projects) <= 3:
        raise ValueError("Expected one to three source projects.")
    names = set()
    for project in projects:
        if not isinstance(project, dict):
            raise ValueError("Invalid project entry.")
        original = next((p for p in PROJECTS if p["name"] == project.get("name")), None)
        if original is None or project["name"] in names or project.get("subtitle") != original["subtitle"]:
            raise ValueError("Unknown, duplicate, or renamed project.")
        names.add(project["name"])
        if not isinstance(project.get("tech"), str) or len(project["tech"]) > 250:
            raise ValueError("Invalid project technologies.")
        validate_bullets(project.get("bullets"), len(original["bullets"]))
    skills = data.get("skills")
    if not isinstance(skills, dict) or not 1 <= len(skills) <= 4 or any(
        not isinstance(k, str) or not isinstance(v, str) or len(k) > 80 or len(v) > 500
        for k, v in skills.items()
    ):
        raise ValueError("Invalid skills section.")
    for key, allowed, maximum in [
        ("coursework", COURSEWORK, 6),
        ("education_extras", EDUCATION.get("extras", []), len(EDUCATION.get("extras", []))),
    ]:
        values = data.get(key, [])
        if not isinstance(values, list) or len(values) > maximum or any(v not in allowed for v in values):
            raise ValueError(f"Unsupported {key}.")
    return data


def validate_bullets(bullets, maximum):
    if not isinstance(bullets, list) or not 2 <= len(bullets) <= maximum or any(
        not isinstance(b, str) or not b.strip() or len(b) > 600 for b in bullets
    ):
        raise ValueError("Invalid source bullet count or text.")


def load_interests(path):
    """Local-only candidate facts, rendered verbatim; never sent to OpenAI."""
    if not path:
        return []
    interests = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(interests, list) or len(interests) > 3:
        raise ValueError("Interests must be a JSON list with at most three entries.")
    for entry in interests:
        if not isinstance(entry, dict) or set(entry) != {"text", "url"}:
            raise ValueError("Each interest needs text and url (empty url allowed).")
        if not isinstance(entry["text"], str) or not 1 <= len(entry["text"]) <= 400:
            raise ValueError("Interest text must contain 1–400 characters.")
        url = entry["url"]
        if not isinstance(url, str) or len(url) > 2048:
            raise ValueError("Invalid interest URL.")
        if url:
            parsed = urlsplit(url)
            if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
                raise ValueError("Interest links must use HTTPS without credentials.")
    return interests


def escape_values(value):
    if isinstance(value, str):
        return escape(value, quote=True)
    if isinstance(value, list):
        return [escape_values(v) for v in value]
    if isinstance(value, dict):
        return {escape(k, quote=True): escape_values(v) for k, v in value.items()}
    return value


def build_tailored_html(tailored: dict, interests=None) -> str:
    """Build HTML resume using tailored data + unchanged fields (education, contact)."""

    tailored = escape_values(tailored)
    interests = escape_values(interests or [])
    interests_html = ""
    if interests:
        lines = []
        for item in interests:
            link = f' <a href="{item["url"]}">{item["url"].replace("https://", "")}</a>' if item["url"] else ""
            lines.append(f'<div class="skills-row">{item["text"]}{link}</div>')
        interests_html = "<h2>Interests</h2>" + "".join(lines)

    work_experience = tailored["work_experience"]
    skills = tailored["skills"]
    projects = tailored["projects"][:3]  # Hard cap: max 3 projects
    campus_involvement = tailored["campus_involvement"]
    education_extras = tailored.get("education_extras", [])
    coursework = tailored.get("coursework", [])

    # Bullet caps reduce overflow; render_pdf verifies the actual page count.
    MAX_WORK_BULLETS = {0: 4, 1: 3}  # first job: 4, second: 3
    MAX_PROJECT_BULLETS = 2
    MAX_CAMPUS_BULLETS = 3

    # Education extras line
    extras_html = ""
    if education_extras:
        extras_html = f'<br><span style="font-size: 9pt; color: #334155;">{" | ".join(education_extras)}</span>'

    # Coursework line
    coursework_html = ""
    if coursework:
        coursework_html = f'<div class="skills-row" style="margin-top: 2px;"><span class="skills-category">Relevant Coursework:</span> {", ".join(coursework[:6])}</div>'

    # Work entries
    work_html = ""
    for i, job in enumerate(work_experience):
        max_b = MAX_WORK_BULLETS.get(i, 3)
        bullets = job["bullets"][:max_b]
        work_html += f"""
      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">{job["company"]}</span><br><span class="entry-subtitle">{job["title"]}</span></td>
          <td class="entry-right">{job["dates"]}</td>
        </tr>
      </table>
      <ul>
        {"".join(f"<li>{b}</li>" for b in bullets)}
      </ul>"""

    # Skills
    skills_html = ""
    for category, items in list(skills.items())[:4]:
        skills_html += f'<div class="skills-row"><span class="skills-category">{category}:</span> {items}</div>\n'

    # Projects
    projects_html = ""
    for proj in projects:
        bullets = proj["bullets"][:MAX_PROJECT_BULLETS]
        projects_html += f"""
      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">{proj["name"]}</span> &ndash; <span class="entry-subtitle">{proj["subtitle"]}</span></td>
          <td class="entry-right">{proj["tech"]}</td>
        </tr>
      </table>
      <ul>
        {"".join(f"<li>{b}</li>" for b in bullets)}
      </ul>"""

    # Campus involvement
    campus_html = ""
    for org in campus_involvement:
        bullets = org["bullets"][:MAX_CAMPUS_BULLETS]
        campus_html += f"""
      <table class="entry-table">
        <tr>
          <td class="entry-left"><span class="entry-title">{org["org"]}</span> &ndash; <span class="entry-subtitle">{org["role"]}</span></td>
          <td class="entry-right">{org["dates"]}</td>
        </tr>
      </table>
      <ul>
        {"".join(f"<li>{b}</li>" for b in bullets)}
      </ul>"""

    return f"""<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <style>
      @page {{ size: letter; margin: 9mm 13mm 5mm 13mm; }}
      *, *::before, *::after {{ box-sizing: border-box; }}
      body {{ font-family: 'Times New Roman', Times, serif; color: #111111; line-height: 1.25; font-size: 10pt; margin: 0; padding: 0; }}
      .header {{ text-align: center; margin-bottom: 4px; }}
      h1 {{ font-size: 18pt; margin: 0 0 1px 0; font-weight: normal; letter-spacing: 0.5px; color: #0f172a; }}
      .contact-info {{ font-size: 9pt; color: #475569; margin: 0; }}
      .contact-info a {{ color: #475569; text-decoration: none; }}
      h2 {{ font-size: 10.5pt; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 7px; margin-bottom: 2px; padding-bottom: 1px; }}
      h2:last-of-type {{ margin-top: 5px; }}
      .entry-table {{ width: 100%; margin-bottom: 1px; }}
      .entry-table td {{ padding: 0; vertical-align: top; }}
      .entry-left {{ text-align: left; font-size: 10pt; }}
      .entry-right {{ text-align: right; font-size: 10pt; color: #334155; }}
      .entry-title {{ font-weight: bold; color: #0f172a; }}
      .entry-subtitle {{ font-style: italic; color: #334155; }}
      ul {{ margin: 1px 0 2px 0; padding-left: 14px; }}
      ul:last-child {{ margin-bottom: 0; }}
      li {{ margin-bottom: 1px; text-align: justify; }}
      li:last-child {{ margin-bottom: 0; }}
      .skills-section {{ margin-bottom: 1px; }}
      .skills-row {{ margin-bottom: 1px; font-size: 10pt; }}
      .skills-category {{ font-weight: bold; color: #0f172a; }}
    </style>
    </head>
    <body>
      <div class="header">
        <h1>{CONTACT["name"]}</h1>
        <p class="contact-info">
          <a href="{CONTACT["website"]}">{CONTACT["website"].replace("https://", "")}</a> &nbsp;|&nbsp;
          {CONTACT["phone"]} &nbsp;|&nbsp;
          <a href="mailto:{CONTACT["email"]}">{CONTACT["email"]}</a> &nbsp;|&nbsp;
          <a href="{CONTACT["linkedin"]}">{CONTACT["linkedin"].replace("https://", "")}</a> &nbsp;|&nbsp;
          <a href="{CONTACT["github"]}">{CONTACT["github"].replace("https://", "")}</a>
        </p>
      </div>

      <h2>Education</h2>
      <table class="entry-table">
        <tr>
          <td class="entry-left">
            <span class="entry-title">{EDUCATION["school"]}</span><br>
            <span class="entry-subtitle">{EDUCATION["degree"]}</span>{extras_html}
          </td>
          <td class="entry-right">Graduation: {EDUCATION["graduation"]}<br>GPA: {EDUCATION["gpa"]} | {EDUCATION["honors"]}</td>
        </tr>
      </table>
      {coursework_html}

      <h2>Work Experience</h2>
      {work_html}

      <h2>Technical Skills</h2>
      <div class="skills-section">
        {skills_html}
      </div>

      <h2>Programming Projects</h2>
      {projects_html}

      <h2>Campus Involvement</h2>
      {campus_html}
      {interests_html}
    </body>
    </html>"""


def render_pdf(tailored, interests):
    buffer = io.BytesIO()
    status = pisa.CreatePDF(build_tailored_html(tailored, interests), dest=buffer)
    if status.err:
        raise ValueError("PDF renderer reported an error.")
    pdf = buffer.getvalue()
    if len(PdfReader(io.BytesIO(pdf)).pages) != 1:
        raise ValueError("Resume exceeds one page. Edit the saved JSON and use --from-json to render without another API call.")
    return pdf


def parse_args():
    parser = argparse.ArgumentParser(description="Generate a one-page tailored resume using OpenAI")
    parser.add_argument("input", nargs="?", help="Job description text file")
    parser.add_argument("-o", "--output-dir", default=str(Path(__file__).resolve().parent.parent / "tailored_resumes"))
    parser.add_argument("-n", "--name", help="Filename suffix, without extension")
    parser.add_argument("--model", choices=sorted(MODEL_PRICES), default=os.environ.get("RESUME_MODEL", "gpt-4.1-mini-2025-04-14"))
    parser.add_argument("--max-input-tokens", type=int, default=os.environ.get("RESUME_MAX_INPUT_TOKENS", "24000"))
    parser.add_argument("--max-output-tokens", type=int, default=os.environ.get("RESUME_MAX_OUTPUT_TOKENS", "4096"))
    parser.add_argument("--max-cost-usd", type=Decimal, default=os.environ.get("RESUME_MAX_COST_USD", "0.02"))
    parser.add_argument("--interests-file", help="Local JSON list of {text, url}; not sent to OpenAI")
    parser.add_argument("--dry-run", action="store_true", help="Report model, input bound and cost without a request or output files")
    parser.add_argument("--from-json", help="Validate and render saved tailored JSON without an API request")
    return parser.parse_args()


def main():
    args = parse_args()
    if args.from_json and args.dry_run:
        raise ValueError("Use --dry-run for request preflight or --from-json for offline rendering.")
    interests = load_interests(args.interests_file)
    filename = args.name or datetime.now().strftime("%Y-%m-%d_%H%M%S")
    if not filename or any(c not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-" for c in filename):
        raise ValueError("Name may contain only letters, digits, underscores and hyphens.")
    output_dir = Path(args.output_dir)
    base = output_dir / f"EliSchiffler_Resume_{filename}"
    json_path = base.with_suffix(".json")
    pdf_path = base.with_suffix(".pdf")
    usage_path = base.with_suffix(".usage.json")
    if not args.dry_run and any(p.exists() for p in [json_path, pdf_path, usage_path]):
        raise ValueError("Output already exists; choose a new name to preserve prior files.")
    usage = None
    if args.from_json:
        tailored = json.loads(Path(args.from_json).read_text(encoding="utf-8"))
    else:
        if args.input and not Path(args.input).is_file():
            raise ValueError("Job description file does not exist.")
        jd = get_job_description(args)
        if not jd:
            raise ValueError("Empty job description.")
        limits = GenerationLimits(args.model, args.max_input_tokens, args.max_output_tokens, args.max_cost_usd)
        messages, preflight = prepare_request(SYSTEM_PROMPT, build_master_json(), jd, limits)
        print(json.dumps(preflight, indent=2), flush=True)
        if args.dry_run:
            return
        tailored, usage = generate_tailored(messages, limits, os.environ.get("OPENAI_API_KEY"))
        print("OpenAI usage: " + json.dumps(usage), flush=True)
    output_dir.mkdir(parents=True, exist_ok=True)
    # Save the response before validation/rendering so a local fix never needs a paid retry.
    with json_path.open("x", encoding="utf-8") as output:
        output.write(json.dumps(tailored, indent=2) + "\n")
    if usage:
        with usage_path.open("x", encoding="utf-8") as output:
            output.write(json.dumps({"preflight": preflight, "usage": usage}, indent=2) + "\n")
    validate_tailored(tailored)
    pdf = render_pdf(tailored, interests)
    with pdf_path.open("xb") as output:
        output.write(pdf)
    print(f"Tailored resume saved to: {pdf_path}")
    print(f"Raw tailored data saved to: {json_path}")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, InvalidOperation) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)
    except Exception as exc:
        # SDK/network/renderer exceptions may contain private request text or credentials.
        print(f"Error: {type(exc).__name__}; no automatic retry. Private details omitted.", file=sys.stderr)
        sys.exit(1)
