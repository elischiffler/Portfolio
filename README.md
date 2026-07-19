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
```
