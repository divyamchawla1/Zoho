# 07 — Accessibility Requirements

WCAG 2.1 AA is the floor, not the goal. A site arguing that its author designs for the person who did not ask for the system cannot be inaccessible. It would be a self-refuting argument.

## Foundations

- Semantic HTML first. ARIA only where native semantics genuinely fall short.
- One `h1` per page. No heading levels skipped for visual reasons.
- Skip-to-content link as the first focusable element.
- Every interactive element reachable and operable by keyboard.
- Visible focus states — designed, not the browser default, and never removed.
- Landmarks: `header`, `nav`, `main`, `footer`.

## Diagrams — the specific risk on this site

The diagrams carry meaning that exists nowhere else. This is where this site will fail an audit if anywhere.

Every SVG diagram must have:

1. `role="img"` and an `aria-label` naming what it shows.
2. **A sequential text alternative in the DOM** — the same steps as an ordered list, visually hidden or in a disclosure. Generated from the same content array that generates the diagram, so it cannot drift.
3. Never colour as the only differentiator. State / transition / negative / final are distinguished by shape, border and label, with colour as reinforcement.

The hero transformation needs a text description of **both states** and what changed between them — not just a label saying "process animation".

## Reduced motion

`prefers-reduced-motion: reduce` is a designed path:
- Transformation → static side-by-side comparison
- Reveals → immediate
- Parallax → none
- Focus and hover feedback → retained

## Contrast

⚠️ **Verify `accent-500` (#4F7CFF) on `paper-50` (#F7F5EF).** This is the most likely failure in the palette. If it fails at body size, darken the accent for text and reserve the bright value for graphics and large display type only.

Also verify: `paper-200` rules on `paper-50`, muted text on both grounds, and every diagram label against its own fill.

## Forms

- Real `<label>` elements. Not placeholders.
- Errors announced (`aria-live`), associated with their field, and written in words rather than codes.
- Required fields marked in text, not by colour or an asterisk alone.
- The submit state must be honest — if it did not send, do not say it did.

## Interactive components

- Filters: operable by keyboard, result count announced.
- Toggles: `aria-pressed` or radio semantics, whichever fits.
- Disclosures: `button` + `aria-expanded`.
- Mobile nav: focus trapped while open, returned on close, `Escape` closes.
- Sticky nav: must never trap focus or obscure a focused element.

## Testing passes

- [ ] Keyboard-only traversal of every route
- [ ] Screen reader pass on the homepage, one case study, one process page
- [ ] `prefers-reduced-motion` on
- [ ] 200% zoom, no loss of content or function
- [ ] Contrast checked on every token pair actually used
- [ ] Automated axe pass with zero violations
- [ ] Every diagram has a text alternative that says the same thing
