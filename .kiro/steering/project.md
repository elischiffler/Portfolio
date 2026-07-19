# Portfolio Project Overview

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Plain CSS (per-component CSS files) + Tailwind v4 (utility only)
- **Animations**: Framer Motion (used minimally — only for the draggable Stack component)
- **Icons**: react-icons
- **Routing**: None — single page, vertical scroll-snap layout
- **Deploy**: GitHub Pages via `gh-pages`, deployed to `elischiffler.github.io/Portfolio`

### Installed but unused packages

Several packages exist in `node_modules` from earlier experiments but are **not used in any source file**. Do not introduce them into new code without discussion:
`@mui/material`, `@emotion/react`, `@emotion/styled`, `@react-three/drei`, `@react-three/fiber`, `three`, `cobe`, `animated-backgrounds`, `react-tsparticles`, `react-router-dom`, `lucide-react`, `motion` (separate from `framer-motion`)

## Project Structure

```
src/
  pages/          # Full-screen sections (LandingPage, Work, Projects, AboutMe)
  components/     # Reusable UI pieces
    Stack/        # Draggable stacked photo cards (Framer Motion)
    Crossfade/    # Image crossfade slideshow used in Work and Projects
    MusicPlayer/  # Waveform audio player with crossfade looping (About Me)
    Sidebar/      # Fixed left navigation with section links and social icons (GitHub, LinkedIn, Resume)
  lib/
    utils.ts      # Tailwind cn() helper
public/
  favicon.svg     # ES monogram favicon (transparent, Poppins bold espresso)
  audio/          # MP3 loops for the MusicPlayer (PortfolioLoop1–3.mp3)
  images/         # Project screenshots, About Me photos, Headshot
    projects/     # thumb/ and full/ subdirectories for project card images
    work/         # Work experience screenshots (Protiviti, Robert Half, Sandia)
  EliSchifflerResume.pdf
```

## Pages

| Page        | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LandingPage | Headshot, name/tagline, 22-skill grid with icons, decorative "ES" watermark                                                                                                                                                                                                                                                                                                                                                |
| Work        | Two work entries (Robert Half — Summer 2025, Sandia National Laboratories — Summer 2024), each with a Crossfade and text description. Robert Half shows 6 screenshots (3 Protiviti verification portal + 3 Robert Half verification portal); Sandia shows a single laser optics photo. Has a bottom snap anchor for scroll-up entry.                                                                                       |
| Projects    | Infinite horizontal carousel of 4 project cards with drag-to-scroll, lightbox image viewer, swipe hint animation on first visit, and a bouncing down-arrow nav hint. Each card has a Crossfade, description, tech stack, and links. Two cards (Roadtrip Planner, UMami) show `dummy-login` credential blocks. On mobile, the carousel becomes a vertical stack of full-width cards (no drag, no swipe hint, no nav arrow). |
| AboutMe     | Bio paragraphs (3), draggable photo Stack (8 images), and a MusicPlayer component with 3 looping tracks displayed as waveforms                                                                                                                                                                                                                                                                                             |

## Build & Dev Commands

```bash
npm run dev       # local dev server (Vite)
npm run build     # production build (NODE_OPTIONS=--max-old-space-size=4096)
npm run deploy    # build + push to gh-pages branch (HUSKY=0 to skip hooks)
npm run format    # Prettier
npm run lint      # ESLint
```
