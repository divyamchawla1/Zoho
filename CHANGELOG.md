# Changelog

## v2 — Enhanced package

Audit and expansion of the original `divyam_portfolio_claude_code` package.

### Added

- `PERSONAL_CONTEXT_ENHANCEMENTS.md`, `CONTENT_GAPS_AND_TBDS.md`, `CHANGELOG.md`, `.env.example`
- `docs/06-seo.md`, `docs/07-accessibility.md`, `docs/09-case-study-diagrams.md`, `docs/10-deployment.md`, `docs/11-cms-migration.md`, `docs/12-clarification-questions.md`, `docs/13-content-gap-checklist.md`
- `scripts/validate-content.mjs` — zero-dependency cross-reference validator
- `content/process-categories.json`, `content/engagement-models.json`, `content/faqs.json`, `content/testimonials.json` (empty), `content/metrics.json` (empty)

### Significantly changed

- `schemas/content-types.ts` — rewritten as a full contract; `--strict` clean; honesty constraints encoded in the types (`ExposureLevel`, `effect.type`, `price: "TBD"`)
- `content/processes.json` — 16 → **50**, each with discovery questions, data, reporting, risks and technology categories
- `content/case-studies.json` — 6 → **12**, full 20-section structure
- `content/industries.json` — 13 → **18**, with honest exposure levels and auto-validated cross-links
- `content/services.json` — 8 → **19**, each with an engagement model and a `notIncluded` list
- `content/methodology.json` — expanded with questions asked, risks checked, client responsibilities, **The Eleven Questions** and the five-layer testing model
- `content/deliverables.json` — 8 → **10**, with audience, contents and sample outlines
- `content/about.json` — added capability map, role intersection, principles, timeline, operator experience, explicit AI position
- `content/technology.json` — regrouped so the capability precedes the product names; custom front-end group added
- `content/insights.json` — 5 → **10**, with typed status and empty bodies
- `docs/01`–`docs/05` — expanded substantially; homepage order fixed; validation made build-breaking
- `CLAUDE.md` — precedence order added; `docs/04` declared supreme
- `MASTER_BUILD_PROMPT.md` — homepage restructured to 12 sections; The Eleven Questions promoted to a section
- `tasks/build-phases.md` — QA gates per phase; Process Explorer made conditional

### Removed

- Contradictions between `docs/01` and `MASTER_BUILD_PROMPT.md` on homepage section order
- Duplicated positioning statements across four files (now stated once and referenced)
- The implication that Zoho-first framing was acceptable anywhere below the hero
