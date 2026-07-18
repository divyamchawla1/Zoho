# Build Phases

Each phase ends with the full testing gate from `docs/05-technical-requirements.md` and the relevant checks from `docs/08-qa-acceptance.md`. Do not start the next phase until the gate passes.

## Phase 1 — Foundation

- Next.js App Router, TypeScript `strict`, Tailwind
- Fonts and design tokens from `docs/02-design-system.md`
- **Verify `accent-500` on `paper-50` for WCAG AA** and report the result
- `/schemas/content-types.ts` wired into `/lib/content.ts`, `/lib/resolve.ts`, `/lib/validate.ts`
- **Build-time validation that fails the build on a broken slug reference** — port the rules from `scripts/validate-content.mjs` and test it once with a deliberate break
- Global layout, navigation, footer, skip link
- **Homepage — all 12 sections in the fixed order**
- **Hero process transformation** with replay and reduced-motion static comparison
- **One flagship case study**: `marketplace-installment-commerce`
- Responsive 320 → 1440, keyboard traversal, production build

**Then stop and report.** Do not continue into Phase 2 without review.

## Phase 2 — The content system

- `/work` index with filters (URL params)
- Remaining 11 case-study pages
- `/industries` matrix + 18 detail pages with exposure levels
- `/processes` library + 50 detail pages
- Current ⇄ Future toggle
- Expandable diagrams with text alternatives
- Sticky case-study navigation
- Full cross-link graph

This is the largest phase by volume and the smallest by new design — it should be reuse, not invention. If you find yourself designing something new here, the Phase 1 system was incomplete.

## Phase 3 — Consulting pages

- `/methodology` — five stages, The Eleven Questions, testing model
- `/services` — 19 services with `notIncluded` rendered
- `/engagement-models` — 6 models
- `/deliverables` — 10 with sample outlines
- `/about` — role intersection, capability map, principles, timeline, operator experience, AI position
- `/faq`

## Phase 4 — Insights and contact

- `/insights` index — placeholders visible, bodies absent, `noindex`
- `/insights/[slug]` — renders only for `status: "published"`
- `/contact` — form, validation, provider via env
- **The honest fallback path, tested** — with `CONTACT_PROVIDER=none`, confirm the form does not fake success

## Phase 5 — Polish

- Metadata across all routes from the content model
- Dynamic OG images (`next/og`)
- Structured data — **no fabricated fields**
- Sitemap and robots, with preview environments disallowed
- Performance pass — the hero must not cost LCP
- Full accessibility audit (`docs/07`)
- Motion refinement
- Empty-state verification — every empty array renders nothing
- **The Process Explorer** (Industry → Process → Case → Deliverable → Technology) — *conditional*. Build it only if it stays simple, fast, mobile-usable and keyboard-complete. If not, ship the filterable library.
- Optional: search across industries, processes and case studies
- Final confidentiality sweep (`docs/04` pre-publish checklist), including `git log`
