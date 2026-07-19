"""
Generates the base (non-tailored) resume PDF from master_resume.py data.
Output: ../public/EliSchifflerResume.pdf
"""

import os
import sys

from xhtml2pdf import pisa

from master_resume import (
    CAMPUS_INVOLVEMENT,
    CONTACT,
    DEFAULT_MAX_CAMPUS_BULLETS,
    DEFAULT_MAX_PROJECT_BULLETS,
    DEFAULT_MAX_WORK_BULLETS,
    DEFAULT_PROJECTS,
    EDUCATION,
    PROJECTS,
    SKILLS,
    WORK_EXPERIENCE,
)


def build_html() -> str:
    """Build the full HTML resume from master data."""

    # Work entries
    work_html = ""
    for job in WORK_EXPERIENCE:
        bullets = job["bullets"][:DEFAULT_MAX_WORK_BULLETS]
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
    for category, items in SKILLS.items():
        skills_html += f'<div class="skills-row"><span class="skills-category">{category}:</span> {items}</div>\n'

    # Projects (only default set)
    projects_html = ""
    for proj in PROJECTS:
        if proj["name"] not in DEFAULT_PROJECTS:
            continue
        bullets = proj["bullets"][:DEFAULT_MAX_PROJECT_BULLETS]
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
    for org in CAMPUS_INVOLVEMENT:
        bullets = org["bullets"][:DEFAULT_MAX_CAMPUS_BULLETS]
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
            <span class="entry-subtitle">{EDUCATION["degree"]}</span>{"".join(f'<br><span style="font-size: 9pt; color: #334155;">{e}</span>' for e in EDUCATION.get("extras", []))}
          </td>
          <td class="entry-right">Graduation: {EDUCATION["graduation"]}<br>GPA: {EDUCATION["gpa"]} | {EDUCATION["honors"]}</td>
        </tr>
      </table>

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


def compile_resume():
    output_path = os.path.join(os.path.dirname(__file__), "..", "public", "EliSchifflerResume.pdf")
    output_path = os.path.normpath(output_path)

    with open(output_path, "w+b") as output:
        status = pisa.CreatePDF(build_html(), dest=output)

    if status.err:
        print(f"Error generating PDF: {status.err}")
        sys.exit(1)
    else:
        print(f"Generated {output_path}")


if __name__ == "__main__":
    compile_resume()
