# Portfolio Project Overview

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Plain CSS (per-component CSS files) + Tailwind v4 (utility only)
- **Animations**: Framer Motion (used minimally — only for the draggable Stack component)
- **Icons**: react-icons
- **Routing**: None — single page, vertical scroll-snap layout
- **Deploy**: GitHub Pages via `gh-pages`, deployed to `elischiffler.github.io/Portfolio`

## Project Structure

```
src/
  pages/          # Full-screen snap sections (LandingPage, Work, Projects, AboutMe)
  components/     # Reusable UI pieces
    Stack/        # Draggable stacked photo cards (Framer Motion)
    ProfileCard/  # Headshot card with social links
    BlurText/     # Text with blur-in animation (currently minimized/removed)
    ShinyText/    # Shimmer text (deprecated in favor of plain text)
    GlassIcons/   # 3D glass icon buttons (deprecated in favor of plain nav)
    Backgrounds/  # CosmicDust + Beams (deprecated — use plain background)
  lib/
    utils.ts      # Tailwind cn() helper
public/
  images/         # Project screenshots, About Me photos, Headshot
  EliSchifflerResume.pdf
```

## Pages

| Page        | Purpose                                                                         |
| ----------- | ------------------------------------------------------------------------------- |
| LandingPage | Intro, headshot/profile card, navigation to other sections, skills list         |
| Work        | Sandia National Labs quantum engineering internship with carousel + description |
| Projects    | 4 featured projects with auto-scrolling carousels and GitHub/live links         |
| AboutMe     | Bio text, draggable photo stack, contact icons (email, LinkedIn, GitHub)        |

## Build & Dev Commands

```bash
npm run dev       # local dev server (Vite)
npm run build     # production build
npm run deploy    # build + push to gh-pages branch
npm run format    # Prettier
npm run lint      # ESLint
```
