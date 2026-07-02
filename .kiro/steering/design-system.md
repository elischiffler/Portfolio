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

- **Font**: `'Poppins', sans-serif` — loaded from Google Fonts in `LandingPage.css`
- **Headings**: `font-weight: 700`, color `var(--color-espresso)`
- **Subheadings / labels**: `font-weight: 600`, color `var(--color-mocha)`
- **Body text**: `font-weight: 400`, color `var(--color-espresso)`, line-height `1.6`
- **Muted text**: color `var(--color-sage)`

## Backgrounds

- Page background: `var(--color-cream)` — set on `body` in `index.css`
- No animated backgrounds, no particle systems, no WebGL shaders
- Section backgrounds are transparent (inherit the cream background)

## Components

### Navigation (Landing page)

Simple text links or minimal icon buttons. No 3D glass effects. Use `var(--color-mocha)` for icons, `var(--color-tan)` on hover.

### Cards / ProfileCard

- Background: `var(--color-linen)`
- Border: `1px solid var(--color-sage)`
- No holographic effects, no tilt animation gradients, no sunpillar shine
- Simple `box-shadow: 0 2px 16px rgba(58,45,40,0.08)` for lift

### Stack (About Me photos)

- Keep the draggable Stack interaction — it's subtle and functional
- Card border: `2px solid var(--color-mocha)`

### Auto-scrolling Carousel (Work + Projects)

- Keep — it's useful and unobtrusive
- Border-radius: `8px`

### Buttons / Links

- Border: `1.5px solid var(--color-mocha)`
- Text: `var(--color-espresso)`
- Hover: background `var(--color-linen)`, border `var(--color-tan)`
- No glowing, no scale transforms beyond `scale(1.02)`

### Skill Tags (Landing page)

- Plain inline text with icon, no shimmer animation
- Color: `var(--color-espresso)`

## Animations

- **Keep**: Stack drag (Framer Motion) — subtle and interactive
- **Remove**: CosmicDust background, Beams WebGL, ShinyText shimmer sweep, BlurText blur-in stagger on every word
- **Allowed**: Simple CSS `transition` on hover (color, opacity, border-color). Max duration `0.2s`.
- **No**: particles, WebGL canvases, infinite background animations, shimmer effects

## Spacing

- Section padding: `2rem` sides, sections are full viewport height (`100vh`)
- Gap between major layout elements: `3rem`
- Gap within content groups: `1rem`–`2rem`
