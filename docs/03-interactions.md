# 03 — Interaction Specification

## 1. Hero process transformation

The most important thing on the site. It must *explain the work*, not decorate the page.

**State A — fragmented.** Nodes scattered, misaligned, some duplicated, no connections: customer message, email, spreadsheet, approval, finance, delivery, follow-up, reporting.

**State B — structured.** The same material reorganised into one connected flow:
`Enquiry → Qualification → Approval → Fulfilment → Finance → Reporting`

Rules:

- Deterministic. Same result every time. Not a particle system.
- Auto-plays once on load, then rests in State B.
- Replay control, always visible, keyboard-accessible.
- A text description of both states exists in the DOM for screen readers (see `07-accessibility.md`).
- `prefers-reduced-motion`: render a static side-by-side comparison of A and B. No animation, no fade. The comparison still communicates the whole idea — which is the point.

## 2. Industry matrix

Desktop: hover or focus reveals that industry's processes. Click opens the detail page.
Mobile: tap expands, second tap or an explicit CTA navigates.

Each cell shows the **exposure level** (`solutioning experience` / `process experience` / `project exposure` / `operator experience`). This is honesty rendered as UI — do not hide it in a tooltip and do not upgrade it in copy.

## 3. Filtering (processes, case studies, industries)

- Filters reflect into URL query params so a filtered view can be shared.
- Filters restore from the URL on load.
- Keyboard-operable. Results count announced to assistive technology.
- Empty result state says what to clear.
- Process filters: category, industry, engagement stage.
- Case filters: industry, process category, engagement stage, technology group.

## 4. Current ⇄ Future toggle

One control updates **three things together**: the diagram, the summary text, and the risk/control callouts. If only the diagram changes, the interaction has failed — the point is that the whole argument changes.

## 5. Expandable diagrams

Accessible disclosure (`button` + `aria-expanded`). Never hide essential information behind hover alone. On mobile, expansion goes full-width rather than a modal.

## 6. Sticky case-study navigation

The case studies are long by design. A sticky contents rail with the current section indicated. Collapses to a compact control on mobile. Never traps focus.

## 7. Navigation

Sticky desktop header. Mobile: full-screen sheet with focus trapped while open and returned on close. Current route indicated. Skip-to-content link as the first focusable element.

## 8. Scroll behaviour

Subtle reveals on section entry only. Not every paragraph. No scroll-jacking. No parallax. Browser back/forward must behave normally.

## 9. Search (Phase 5, optional)

Across industries, processes and case studies. Client-side over a generated index. Only build it if it can be fast and keyboard-complete; the filters already carry most of this load.

## 10. Contact form

- Real validation, real error messages, errors announced.
- **If no provider is configured, the form must not fake success.** Show the mailto fallback and say plainly that the form is not connected yet.
- A false success state is the one unforgivable bug on this site: a lost enquiry from a business owner who thinks they made contact.

## 11. Reduced motion

When `prefers-reduced-motion: reduce`:
- Transformation → static comparison
- Reveals → immediate
- Parallax → removed
- Focus and hover feedback → retained
