# Design System

## Philosophy

The portfolio is intentionally minimal. The work speaks for itself — the UI exists to frame it, not compete with it. Avoid flashy effects, heavy animations, particle systems, or anything that distracts from the content.

## Color Palette (Nude)

All colors must come from this palette. No blues, no neons, no grays.

| Token              | Hex       | Usage                                           |
| ------------------ | --------- | ----------------------------------------------- |
| `--color-espresso` | `#3A2D28` | Primary text, headings, active states           |
| `--color-mocha`    | `#A48374` | Accent color, borders, icons, subtle highlights |
| `--color-tan`      | `#CBAD8D` | Hover states, secondary accents, link hover     |
| `--color-sage`     | `#D1C7BD` | Muted text, secondary labels, dividers          |
| `--color-linen`    | `#EBE3DB` | Card backgrounds, section dividers              |
| `--color-cream`    | `#F1EDE6` | Page background                                 |

These variables are defined in `src/index.css` under `:root`.

## Typography

- **Font**: `'Poppins', sans-serif` — loaded from Google Fonts in both `index.css` and `LandingPage.css`
- **Headings**: `font-weight: 700`, color `var(--color-espresso)`
- **Subheadings / labels**: `font-weight: 600`, color `var(--color-mocha)`
- **Body text**: `font-weight: 400`, color `var(--color-espresso)`, line-height `1.6`
- **Muted text**: color `var(--color-sage)`

## Backgrounds

- Page background: `var(--color-cream)` — set on `body` in `index.css`
- No animated backgrounds, no particle systems, no WebGL shaders
- Section backgrounds are transparent (inherit the cream background)

## Components

### Navigation (Sidebar)

A fixed left sidebar (`72px` wide) contains two groups: section nav buttons at the top and social/resume links at the bottom (GitHub, LinkedIn, Resume — email link removed). On hover, the icon fades out and a label fades in (CSS opacity + scale transition, `0.15s`). Active section icon is `var(--color-espresso)` at `1.25rem`; inactive icons are `var(--color-mocha)` at `1.1rem`. Social icons use `var(--color-mocha)`, turning `var(--color-espresso)` on hover. The sidebar uses `border-right: 1px solid var(--color-linen)` and the main content area has `margin-left: 72px`. The `.sidebar-line` element exists in the DOM but is `display: none` — do not re-enable it.

### Cards / ProfileCard

- Background: `var(--color-linen)`
- Border: `1px solid var(--color-sage)`
- No holographic effects, no tilt animation gradients, no sunpillar shine
- Simple `box-shadow: 0 2px 16px rgba(58,45,40,0.08)` for lift

### Stack (About Me photos)

- Keep the draggable Stack interaction — it's subtle and functional
- Card border: `2px solid var(--color-mocha)`

### Crossfade (Work + Projects images)

The `Crossfade` component cycles through images using CSS opacity transitions (`0.8s ease`). It is **not** a scroll carousel. Images can use `object-fit: cover` (default) or `object-fit: contain` with `var(--color-linen)` background for screenshots. Border-radius applied via the parent context (e.g., `8px` on project cards).

### Buttons / Links

- Border: `1.5px solid var(--color-mocha)`
- Text: `var(--color-espresso)`
- Hover: background `var(--color-linen)`, border `var(--color-tan)`
- No glowing, no scale transforms beyond `scale(1.02)`

### Skill Tags (Landing page)

- Plain inline text with icon, no shimmer animation
- Color: `var(--color-espresso)`, icon color `var(--color-mocha)`
- 22 skills total as of current implementation

### Dummy Login (Projects page)

The Roadtrip Planner and UMami cards show a credential hint block (`.dummy-login`) with test credentials for the live demo. Style: `background var(--color-cream)`, `border 1px solid var(--color-sage)`, `border-radius 4px`. Only used on cards that have a live demo requiring login.

## Animations

- **Keep**: Stack drag (Framer Motion) — subtle and interactive
- **Keep**: Crossfade image transitions (`opacity 0.8s ease`)
- **Keep**: Section scroll — CSS `scroll-snap-type: y proximity` with `scroll-snap-stop: always` on sections. Scroll dampening (100px max per wheel event) prevents skipping sections. Sections fade in/out via JS `IntersectionObserver` with 20 thresholds: invisible below 20% visible, ramps to full opacity by 60% visible. Sidebar nav uses native `scrollIntoView({ behavior: 'smooth' })`.
- **Keep**: Projects swipe hint — one-time overlay with cursor icon dragging left, triggered at 10% section visibility (overlay only), animation starts at 50%. Dismissed by interaction or after 3s.
- **Keep**: Projects down-arrow bounce — subtle 5px vertical bounce on 2s loop, stops on hover.
- **Remove**: CosmicDust background, Beams WebGL, ShinyText shimmer sweep, BlurText blur-in stagger on every word
- **Allowed**: Simple CSS `transition` on hover (color, opacity, border-color). Max duration `0.2s`.
- **No**: particles, WebGL canvases, infinite background animations, shimmer effects

## Spacing

- Section padding: `2rem` sides, sections are full viewport height (`100vh`)
- Gap between major layout elements: `3rem`
- Gap within content groups: `1rem`–`2rem`
