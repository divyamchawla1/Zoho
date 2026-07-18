# 02 — Design System

## Concept: The Process Architect

An editorial consulting publication crossed with a systems map. Confident typography, deliberate whitespace, fine structural lines, directional paths and workflow nodes — the visual language of someone who draws processes for a living.

It must not resemble:

- a developer portfolio (dark hero, gradient text, project cards)
- a consulting agency template (stock photography, three columns of icons)
- a SaaS landing page (glassmorphism, floating shapes, pricing tiers)
- a dashboard
- anything cyberpunk or neon

## Colour tokens

| Token | Hex | Use |
|---|---|---|
| `ink-950` | `#08111F` | Deepest surface, hero, section inversions |
| `ink-900` | `#0D1726` | Dark section base |
| `ink-800` | `#172338` | Dark surface elevation, borders on dark |
| `paper-50` | `#F7F5EF` | **Primary surface.** Warm off-white — not white |
| `paper-100` | `#EFECE4` | Secondary surface |
| `paper-200` | `#E1DDD2` | Rules, hairlines, dividers |
| `accent-500` | `#4F7CFF` | Primary accent, transitions in diagrams |
| `accent-400` | `#6F92FF` | Accent on dark surfaces |
| `teal-500` | `#22B8A7` | Future state |
| `warning-500` | `#DFA949` | Current state |
| `success-500` | `#3FAE7A` | Final positive state |
| `danger-500` | `#D86666` | Negative transition, gap markers |
| `violet-500` | `#8068F2` | Reserved. Use sparingly or not at all |

**The diagram colours are not decorative.** State / transition / negative transition / final positive state is Divyam's actual client-delivery flowchart standard. The site uses the same standard as the documents he ships. That consistency *is* the credibility argument — see `09-case-study-diagrams.md`.

⚠️ **Verify `accent-500` on `paper-50` for WCAG AA.** Electric blue on warm off-white is the most likely contrast failure in this palette. If it fails at body size, darken the accent for text and keep the bright value for graphics only.

## Typography

- Display / headings: **Sora** (fallback Manrope, Space Grotesk)
- Body: **Inter** (fallback DM Sans)
- Technical labels, diagram text, eyebrows: **IBM Plex Mono**

Fluid type scale. The hero headline should be genuinely large on desktop and still readable at 320px. Reading width ~720px. Max content width ~1440px.

## Layout

12 / 6 / 4 column grid (desktop / tablet / mobile). Generous vertical rhythm. Alternate dark `ink` and warm `paper` sections deliberately — the rhythm of the page is part of the argument.

## Shapes and geometry

- Border radius 0–4px. Squared, not soft.
- **Resist the card reflex.** Most sections should be structured with rules, grids and alignment, not boxes. If everything is a card, nothing has hierarchy.
- Circles only as process nodes or status markers.
- Directional paths and connectors are the signature motif. Use them where they mean something.

## Motion

- 150–250ms for interface feedback
- 400–700ms for section reveals
- Spring physics for node reorganisation only
- No infinite decorative motion
- `prefers-reduced-motion` is a designed path, not a fallback — see `03-interactions.md`

## Three signature devices

1. **The transformation** — the hero process animation. The single strongest asset on the site.
2. **The Eleven Questions** — the decision framework rendered as a memorable, ownable device. This is brand, not content.
3. **Current ⇄ Future toggle** — appears on case studies and process pages. One interaction that demonstrates the whole value proposition.

## Icons and imagery

Minimal line icons. Prefer a diagram to an icon. No stock photography, no generic AI illustrations, no 3D objects, no logo mosaics, no skill bars, no percentage rings.

There is no portrait until Divyam supplies one. Do not substitute an avatar, an illustration or an initial-based placeholder.
