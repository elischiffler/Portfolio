"""
Generate a tailored resume PDF for a specific job description using Claude.

Usage:
    python generateTailoredResume.py                  # paste JD interactively
    python generateTailoredResume.py job.txt          # read JD from file
    python generateTailoredResume.py job.txt -o out/  # specify output directory

The script:
1. Reads your master resume data
2. Sends it + the job description to Claude
3. Claude returns a JSON structure with tailored bullets, reordered sections, and adjusted skills
4. Compiles the result to PDF (same visual style as your base resume)

Requires: ANTHROPIC_API_KEY in environment or .env file
"""

import argparse
import json
import os
import sys
from datetime import datetime

import anthropic
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
- Change company names, dates, school, GPA, or contact info
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

Keep the same number of work entries and campus entries. You may reorder projects and drop at most one if needed to fit one page.
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


def call_claude(job_description: str) -> dict:
    """Send master resume + JD to Claude, return tailored JSON."""
    client = anthropic.Anthropic()

    user_message = f"""Here is my master resume data:

```json
{build_master_json()}
```

Here is the job description I'm applying to:

```
{job_description}
```

Tailor my resume for this position. Return only the JSON."""

    print("Calling Claude to tailor resume...")
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    text = ""
    for block in response.content:
        if hasattr(block, "text"):
            text = block.text.strip()
            break

    if not text:
        raise ValueError("No text content in Claude response")

    # Handle case where Claude wraps in ```json ... ```
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0]

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        print(f"Raw response (first 500 chars):\n{text[:500]}")
        print(f"Raw response (last 500 chars):\n{text[-500:]}")
        sys.exit(1)


def build_tailored_html(tailored: dict) -> str:
    """Build HTML resume using tailored data + unchanged fields (education, contact)."""

    work_experience = tailored["work_experience"]
    skills = tailored["skills"]
    projects = tailored["projects"][:3]  # Hard cap: max 3 projects
    campus_involvement = tailored["campus_involvement"]
    education_extras = tailored.get("education_extras", [])
    coursework = tailored.get("coursework", [])

    # Hard caps to guarantee one-page fit
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
    </body>
    </html>"""


def main():
    parser = argparse.ArgumentParser(description="Generate a tailored resume PDF using Claude")
    parser.add_argument("input", nargs="?", help="Path to a .txt file containing the job description")
    parser.add_argument("-o", "--output-dir", default=os.path.join(os.path.dirname(__file__), "..", "tailored_resumes"),
                        help="Directory to save the output PDF (default: ../tailored_resumes/)")
    parser.add_argument("-n", "--name", default=None,
                        help="Output filename (without extension). Default: resume_YYYY-MM-DD_HHMMSS")
    args = parser.parse_args()

    # Validate API key
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("Error: ANTHROPIC_API_KEY not set. Add it to scripts/.env or export it.")
        sys.exit(1)

    # Get job description
    jd = get_job_description(args)
    if not jd:
        print("Error: Empty job description.")
        sys.exit(1)

    print(f"Job description length: {len(jd)} chars")

    # Call Claude
    tailored = call_claude(jd)

    # Build HTML and compile to PDF
    html = build_tailored_html(tailored)

    # Ensure output directory exists
    output_dir = os.path.normpath(args.output_dir)
    os.makedirs(output_dir, exist_ok=True)

    # Generate filename
    if args.name:
        filename = f"EliSchiffler_Resume_{args.name}.pdf"
    else:
        timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
        filename = f"EliSchiffler_Resume_{timestamp}.pdf"

    output_path = os.path.join(output_dir, filename)

    with open(output_path, "w+b") as output:
        status = pisa.CreatePDF(html, dest=output)

    if status.err:
        print(f"Error generating PDF: {status.err}")
        sys.exit(1)

    print(f"\nTailored resume saved to: {output_path}")

    # Also save the raw JSON for inspection
    json_path = output_path.replace(".pdf", ".json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(tailored, f, indent=2)
    print(f"Raw tailored data saved to: {json_path}")


if __name__ == "__main__":
    main()
