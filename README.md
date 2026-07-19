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
- **GitHub Actions** — auto-deploys to GitHub Pages on push to `main`

## Getting Started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run lint      # ESLint
npm run format    # Prettier
```

## Deployment

Pushes to `main` automatically trigger a GitHub Actions workflow that builds and deploys to GitHub Pages. No manual deploy step needed.

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
  generateTailoredResume.py # AI-tailored resume generation using Claude
  requirements.txt          # Python dependencies
  .env.example              # Template for API key config
tailored_resumes/           # Generated output (gitignored)
```

## Resume Generation

The `scripts/` folder contains a resume pipeline that generates both a base PDF and AI-tailored versions for specific job applications.

### Setup

```bash
pip install -r scripts/requirements.txt
cp scripts/.env.example scripts/.env
# Add your Anthropic API key to scripts/.env
```

### Base Resume

Regenerate the portfolio's base resume PDF from `master_resume.py`:

```bash
python scripts/generateResume.py
```

### Tailored Resume

Generate a one-page resume tailored to a specific job description:

```bash
# From a JD file
python scripts/generateTailoredResume.py tailored_resumes/jd_company.txt -n "Company"

# Or paste interactively (press Enter twice when done)
python scripts/generateTailoredResume.py -n "Company"
```

Output goes to `tailored_resumes/` with:

- `EliSchiffler_Resume_Company.pdf` — the tailored PDF
- `EliSchiffler_Resume_Company.json` — raw data showing what was changed

The tailoring script uses Claude to reorder sections, rephrase bullets for keyword matching, and select relevant coursework — while staying truthful and fitting on one page.
