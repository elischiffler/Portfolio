# Eli Schiffler — Portfolio

My personal portfolio site, built as a single-page React app with scroll-snap navigation.

[**elischiffler.dev**](https://elischiffler.dev)

## Sections

- **Landing** — Headshot, name, tagline, and a 22-skill icon grid
- **Work Experience** — Robert Half (Summer 2026, present) and Sandia National Laboratories (Summer 2025), each with clickable image slideshows and a lightbox viewer
- **Projects** — Infinite horizontal carousel (desktop) / vertical stack (mobile) of 4 project cards with lightbox, drag-to-scroll, and swipe hint
- **About Me** — Bio, draggable photo stack, and a 3-track music player with waveform visualization

## Tech Stack

- **React 19** + **Vite**
- **Plain CSS** with a custom design-token system (colors, spacing, typography, radii, transitions)
- **Framer Motion** — used only for the draggable Stack component
- **react-icons** — icon library
- **GitHub Actions** — validates changes on pull requests and pushes to `main`

## Getting Started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run lint      # ESLint
npm run format    # Prettier
```

## Deployment

The live site at [elischiffler.dev](https://elischiffler.dev) is served by the
`portfolio` Vercel project connected to this repository. Pushes to `main`
automatically build with `npm ci` and `npm run build`, serving `dist/`.
GitHub Actions runs lint and build validation; pushes no longer publish to
GitHub Pages. See [the Vercel cutover runbook](docs/vercel-cutover.md) for the
historical cutover and rollback steps.

## Project Structure

```
src/
  pages/          # LandingPage, Work, Projects, AboutMe
  components/     # Stack, Crossfade, MusicPlayer, Sidebar
  index.css       # Global tokens & shared styles
public/
  audio/          # MP3 loops for MusicPlayer
  images/         # Project screenshots, work photos, About Me photos
  EliSchifflerResume.pdf
scripts/
  master_resume.py          # Single source of truth for all resume content
  generateResume.py         # Generates the base PDF (public/EliSchifflerResume.pdf)
  generateTailoredResume.py # AI-tailored resume generation using OpenAI
  requirements.txt          # Python dependencies
  .env.example              # Template for API key config
tailored_resumes/           # Generated output (gitignored)
```

## Resume Generation

The `scripts/` folder contains a resume pipeline that generates both a base PDF and AI-tailored versions for specific job applications.

### Setup

```bash
python -m venv scripts/.venv
scripts/.venv/bin/pip install -r scripts/requirements.txt
cp scripts/.env.example scripts/.env
# Use your existing OPENAI_API_KEY environment variable, or add it to scripts/.env.
# Never commit scripts/.env.
```

### Base Resume

Regenerate the portfolio's base resume PDF from `master_resume.py`:

```bash
scripts/.venv/bin/python scripts/generateResume.py
```

### Tailored Resume

Generate a one-page resume tailored to a specific job description:

```bash
# From a JD file
scripts/.venv/bin/python scripts/generateTailoredResume.py tailored_resumes/jd_company.txt -n "Company"

# Or paste interactively (press Enter twice when done)
scripts/.venv/bin/python scripts/generateTailoredResume.py -n "Company"
```

Output goes to `tailored_resumes/` with:

- `EliSchiffler_Resume_Company.pdf` — the tailored PDF
- `EliSchiffler_Resume_Company.json` — raw data showing what was changed

The tailoring script uses OpenAI to rephrase and select source-backed content. Contact information and core education fields stay local. Review the JSON for factual accuracy before sharing the PDF; validation preserves source identities but cannot prove rewritten bullets are true.

The default model is `gpt-4.1-mini-2025-04-14`. Use `--model`, `--max-input-tokens`, `--max-output-tokens`, and `--max-cost-usd` (or `RESUME_MODEL`, `RESUME_MAX_INPUT_TOKENS`, `RESUME_MAX_OUTPUT_TOKENS`, `RESUME_MAX_COST_USD`) to configure a run. Defaults are 24,000 input tokens, 4,096 output tokens, and a **$0.02 per invocation** budget. Models without a reviewed price in `scripts/resume_openai.py` are rejected. The pricing table uses standard uncached USD rates; verify [OpenAI pricing](https://developers.openai.com/api/docs/pricing) before use and update the table if rates change. These controls bound one invocation, not account-wide spend.

Preflight is entirely local and works without an API key:

```bash
scripts/.venv/bin/python scripts/generateTailoredResume.py tailored_resumes/jd_company.txt --dry-run
```

Before sending, the script prints the provider, model, conservative input token bound, output limit, and worst-case cost at the configured rates. Input is bounded by UTF-8 bytes plus a framing allowance; oversized inputs and over-budget requests are rejected without truncation. It makes one request to `https://api.openai.com/v1`, with no automatic retries, provider fallback, or SDK response storage. `OPENAI_BASE_URL` does not redirect this generator. Failures do not automatically generate again. Successful API usage is saved to a private `.usage.json` file.

Optional interests stay local and render verbatim in an **Interests** section. Supply a gitignored JSON file containing up to three entries, each with `text` and `url` (HTTPS or an empty string):

```json
[
  {
    "text": "Music: I create songs and learn production and mastering in my free time.",
    "url": "https://soundcloud.com/eli-schiffler"
  }
]
```

```bash
scripts/.venv/bin/python scripts/generateTailoredResume.py tailored_resumes/jd_company.txt -n Company --interests-file tailored_resumes/interests.json
```

The renderer escapes model text and checks the actual PDF page count. If it overflows, the response JSON is already saved. Edit that private JSON and render again with a new name, without paying for another request:

```bash
scripts/.venv/bin/python scripts/generateTailoredResume.py --from-json tailored_resumes/EliSchiffler_Resume_Company.json -n CompanyReviewed --interests-file tailored_resumes/interests.json
```

Existing outputs are never overwritten. Keep job inputs, tailored JSON, usage reports, and private PDFs under the gitignored `tailored_resumes/` directory. The base resume source and public PDF are unchanged by tailoring.

Run the offline tests (no API calls or credentials required):

```bash
scripts/.venv/bin/python -m unittest discover -s scripts/tests -v
```
