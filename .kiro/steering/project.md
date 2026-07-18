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
    Sidebar/      # Fixed left navigation with section links and social icons (GitHub, LinkedIn, Resume)
  lib/
    utils.ts      # Tailwind cn() helper
public/
  favicon.svg     # ES monogram favicon (transparent, Poppins bold espresso)
  images/         # Project screenshots, About Me photos, Headshot
    projects/     # thumb/ and full/ subdirectories for project card images
    work/         # Work experience screenshots
  EliSchifflerResume.pdf
```

## Pages

| Page        | Purpose                                                                                                                                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LandingPage | Headshot, name/tagline, 22-skill grid with icons, decorative "ES" watermark                                                                                                                                                                                                                                   |
| Work        | Two work entries (Robert Half — Summer 2025, Sandia National Laboratories — Summer 2024), each with a Crossfade and text description. Robert Half shows 6 screenshots; Sandia shows a single laser optics photo. Has a bottom snap anchor for scroll-up entry.                                                |
| Projects    | Infinite horizontal carousel of 4 project cards with drag-to-scroll, lightbox image viewer, swipe hint animation on first visit, and a bouncing down-arrow nav hint. Each card has a Crossfade, description, tech stack, and links. Two cards (Roadtrip Planner, UMami) show `dummy-login` credential blocks. |
| AboutMe     | Bio paragraphs (3) and draggable photo Stack (5 images)                                                                                                                                                                                                                                                       |

## Build & Dev Commands

```bash
npm run dev       # local dev server (Vite)
npm run build     # production build
npm run deploy    # build + push to gh-pages branch
npm run format    # Prettier
npm run lint      # ESLint
```
