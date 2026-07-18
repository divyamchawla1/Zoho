# 01 — Site Architecture

## Primary navigation (7 items)

Work · Industries · Process Library · Methodology · Services · About · Contact

`Insights`, `Deliverables`, `Engagement Models` and `FAQ` live in the footer. They are real pages with real value, but seven items is the ceiling for a navigation bar that has to work on a phone, and these four are not what a first-time visitor is looking for.

## Route model

| Route | Source | Notes |
|---|---|---|
| `/` | `global.json`, `case-studies.json`, `industries.json`, `processes.json`, `methodology.json`, `technology.json`, `about.json`, `contact.json` | Fixed section order — see below |
| `/work` | `case-studies.json` | Filterable index |
| `/work/[slug]` | `case-studies.json` | 12 static pages |
| `/industries` | `industries.json` | Interactive matrix |
| `/industries/[slug]` | `industries.json` | 18 static pages |
| `/processes` | `processes.json`, `process-categories.json` | Filterable library — the strategic asset |
| `/processes/[slug]` | `processes.json` | 50 static pages |
| `/methodology` | `methodology.json` | Five stages + The Eleven Questions + testing model |
| `/services` | `services.json` | 19 services grouped |
| `/services/[slug]` | `services.json` | Optional in Phase 3; index-with-disclosure is acceptable if detail pages would be thin |
| `/deliverables` | `deliverables.json` | 10 deliverables with sample outlines |
| `/engagement-models` | `engagement-models.json` | 6 models |
| `/about` | `about.json` | Capability map, role intersection, principles, timeline |
| `/insights` | `insights.json` | Index only in v1 — see below |
| `/insights/[slug]` | `insights.json` | Only renders for `status: "published"` |
| `/faq` | `faqs.json` | Grouped, FAQPage structured data |
| `/contact` | `contact.json` | Form + honest fallback |

## Homepage section order — FIXED

This order is a positioning decision, not a layout preference. Do not reorder it.

1. Hero — positioning + the process transformation visual
2. The problem — what arrives versus what is needed
3. Selected transformations — featured case studies (`featured: true`, by `featureOrder`)
4. Industry experience — interactive matrix
5. Process library preview — grouped by category, with a count and a route in
6. Methodology — the five stages as one connected journey
7. The Eleven Questions — the decision framework, as a signature device
8. What clients bring / what I produce — the split section
9. Deliverables — what actually gets handed over
10. **Technology enablement** — must sit below every business-process section
11. About preview
12. Final CTA

**Rule 10 is not negotiable.** If technology moves above the process sections, the site says "Zoho consultant" and the entire positioning fails. Zoho appears nowhere in the hero, nowhere above section 10, and never as a logo wall.

## Cross-linking rules

Every entity carries slug arrays. The loader resolves them; components never look up content themselves.

- Case study → industries, processes, services, deliverables
- Industry → processes, case studies, deliverables, services
- Process → industries, case studies
- Service → engagement model, processes, case studies
- Methodology stage → deliverables, case studies
- Insight → processes, methodology stages
- Deliverable → services

A broken cross-reference **fails the build**. It does not render a dead link. See `scripts/validate-content.mjs` — the same rules belong in `/lib/validate.ts`.

## The Process Explorer (Industry → Process → Case → Deliverable → Technology)

Deferred to Phase 5, and conditional. Build it only if it stays simple, performant, mobile-usable and keyboard-accessible. If it cannot, ship the filterable library instead — a working library beats an impressive explorer that nobody can operate on a phone.

## Content model

Local JSON in `/content`, typed by `/schemas/content-types.ts`, loaded through `/lib/content.ts`. Page components read typed objects and nothing else. See `11-cms-migration.md`.
