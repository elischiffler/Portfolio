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
- **Body text**: `font-weight: 400`, color `var(--color-espresso)`, line-height `1.5`
- **Muted text**: color `var(--color-sage)`

### Font Size Tokens

Defined in `:root` and responsive-adjusted at `≤768px`:

| Token         | Desktop                      | Mobile                        | Usage                              |
| ------------- | ---------------------------- | ----------------------------- | ---------------------------------- |
| `--text-2xs`  | `0.65rem`                    | —                             | Sidebar labels                     |
| `--text-xs`   | `0.7rem`                     | `0.6rem`                      | Timestamps, small meta             |
| `--text-sm`   | `0.8rem`                     | `0.75rem`                     | Descriptions, tech stacks, buttons |
| `--text-base` | `0.95rem`                    | `0.875rem`                    | Body text                          |
| `--text-md`   | `1.1rem`                     | —                             | Card titles, nav icons             |
| `--text-lg`   | `1.4rem`                     | `1.2rem`                      | Section sub-headings, header icons |
| `--text-xl`   | `2rem`                       | `1.5rem`                      | Page titles                        |
| `--text-2xl`  | `clamp(3.5rem, 6vw, 5.5rem)` | `clamp(2.5rem, 10vw, 3.5rem)` | Landing name                       |

## Backgrounds

- Page background: `var(--color-cream)` — set on `body` in `index.css`
- No animated backgrounds, no particle systems, no WebGL shaders
- Section backgrounds are transparent (inherit the cream background)

## Components

### Navigation (Sidebar)

A fixed left sidebar (`72px` wide) contains two groups: section nav buttons at the top and social/resume links at the bottom (GitHub, LinkedIn, Resume — email link removed). On hover, the icon fades out and a label fades in (CSS opacity + scale transition, `0.15s`). Active section icon is `var(--color-espresso)` at `1.25rem`; inactive icons are `var(--color-mocha)` at `1.1rem`. Social icons use `var(--color-mocha)`, turning `var(--color-espresso)` on hover. The sidebar uses `border-right: 1px solid var(--color-linen)` and the main content area has `margin-left: 72px`. The `.sidebar-line` element exists in the DOM but is `display: none` — do not re-enable it.

**Mobile (≤768px):** The sidebar converts to a fixed top bar (`56px` tall, full width) with `flex-direction: row`. Nav icons and social icons sit side by side. The hover-to-show-label behavior is disabled on touch — icons remain visible at all times. The snap container gets `margin-top: 56px` instead of `margin-left: 72px`. Labels (`.sidebar-label`, `.sidebar-social-label`) are `display: none` on mobile.

### Cards / ProfileCard

- Background: `var(--color-linen)`
- Border: `1px solid var(--color-sage)`
- No holographic effects, no tilt animation gradients, no sunpillar shine
- Simple `box-shadow: 0 2px 16px rgba(58,45,40,0.08)` for lift

### Stack (About Me photos)

- Keep the draggable Stack interaction — it's subtle and functional
- Card border: `2px solid var(--color-mocha)`

### MusicPlayer (About Me)

- Background per track row: `var(--color-linen)`, border `1px solid var(--color-sage)`
- Active track border becomes `var(--color-mocha)`
- Play/pause button: circular, `1.5px solid var(--color-mocha)`, icon fill `var(--color-mocha)`
- Waveform bars: unplayed `var(--color-sage)`, played `var(--color-mocha)`
- Labels/time: `var(--color-mocha)`, `font-weight: 500–600`
- 3 tracks with seamless crossfade looping (audio-only overlap, no visual transition)
- Pauses and resets when user scrolls away from About Me section

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
- **Keep**: MusicPlayer waveform progress — real-time `requestAnimationFrame` update of played bar fills, no CSS animation
- **Keep**: Section scroll — CSS `scroll-snap-type: y proximity` with `scroll-snap-stop: always` on sections. Scroll dampening (100px max per wheel event) prevents skipping sections. Sections fade in/out via JS `IntersectionObserver` with 20 thresholds: invisible below 20% visible, ramps to full opacity by 60% visible. Sidebar nav uses native `scrollIntoView({ behavior: 'smooth' })`. **Mobile:** scroll-snap is disabled (`scroll-snap-type: none`), sections use `min-height: auto` (except Landing and Projects which keep `min-height: calc(100vh - 56px)`), and opacity is forced to 1 (no fade effect).
- **Keep**: Projects swipe hint — one-time overlay with cursor icon dragging left, triggered at 10% section visibility (overlay only), animation starts at 50%. Dismissed by interaction or after 3s. Hidden on mobile.
- **Keep**: Projects down-arrow bounce — subtle 5px vertical bounce on 2s loop, stops on hover. Hidden on mobile.
- **Remove**: CosmicDust background, Beams WebGL, ShinyText shimmer sweep, BlurText blur-in stagger on every word
- **Allowed**: Simple CSS `transition` on hover (color, opacity, border-color). Max duration `0.2s`.
- **No**: particles, WebGL canvases, infinite background animations, shimmer effects

## Spacing

All spacing uses CSS custom properties defined in `:root`:

| Token         | Value     | Usage                       |
| ------------- | --------- | --------------------------- |
| `--space-2xs` | `0.25rem` | Tight inner gaps            |
| `--space-xs`  | `0.5rem`  | Small gaps, tight padding   |
| `--space-sm`  | `0.75rem` | Component inner gaps        |
| `--space-md`  | `1rem`    | Standard gap                |
| `--space-lg`  | `1.5rem`  | Card gaps, between elements |
| `--space-xl`  | `2rem`    | Section padding, major gaps |
| `--space-2xl` | `3rem`    | Large separations           |
| `--space-3xl` | `5rem`    | Landing layout gaps         |

- Section padding: `var(--space-xl)` (2rem), reduced to `var(--space-lg)` on mobile
- Sections are full viewport height (`100vh`)
- Gap between major layout elements: `3rem`
- Gap within content groups: `1rem`–`2rem`

## Border Radius

| Token           | Value  | Usage                          |
| --------------- | ------ | ------------------------------ |
| `--radius-sm`   | `4px`  | Buttons, small elements        |
| `--radius-md`   | `6px`  | Cards, images                  |
| `--radius-lg`   | `8px`  | Project cards, larger surfaces |
| `--radius-xl`   | `12px` | Stack cards                    |
| `--radius-full` | `50%`  | Circles                        |

## Transitions

| Token                 | Value        | Usage            |
| --------------------- | ------------ | ---------------- |
| `--transition-fast`   | `0.15s ease` | Sidebar hover    |
| `--transition-normal` | `0.2s ease`  | Buttons, links   |
| `--transition-slow`   | `0.8s ease`  | Crossfade images |
