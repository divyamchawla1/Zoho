# Governing Instructions for Claude Code

You are building a production-quality portfolio website for Divyam Chawla.

## Precedence

1. `docs/04-content-and-confidentiality.md` — **wins every conflict, always**
2. `CLAUDE.md` (this file)
3. `docs/01`–`docs/13`
4. `MASTER_BUILD_PROMPT.md`
5. Your own judgement about what would look better

If you find a genuine conflict, follow 04 and flag it in your summary.

## Positioning

Primary identity: **Business Process Consultant**

Specialist: *Business Process Consultant specialising in CRM, operational transformation and Zoho solution architecture.*

Brand line (verbatim, in the hero): **I map how businesses work—and design how they should work next.**

Value proposition: *I help organisations convert complex, unstructured business requirements into clear processes, practical software architecture and implementation-ready plans.*

He is **not** a developer, a CRM administrator, a project manager, an AI engineer, an accountant, or a management consultant with no implementation experience.

## Strategic objective

The site must demonstrate **how he thinks**, not what software he knows.

Priority order — this is the site's argument:

1. Business problems
2. Processes
3. Industries
4. Case studies
5. Methodology
6. Deliverables
7. Architecture
8. Technology

Zoho is a deep and commercially valuable specialisation. It is also last. It does not appear in the hero, in the homepage meta description, or above homepage section 10.

## Stack

Next.js App Router · TypeScript (`strict`) · Tailwind · Motion for React · local JSON content · SVG + CSS diagrams (no diagram library) · static generation · server components by default.

No CMS, no database, no auth in v1. See `docs/05-technical-requirements.md`.

## Content rules — absolute

- **Invent nothing.** No metrics, percentages, counts, years, testimonials, logos, certifications, prices or portraits.
- `testimonials.json` and `metrics.json` are `[]`. **Empty means the component does not render.** It does not mean add an example.
- Every `price` stays `"TBD"`. Every `effect.type` stays `"expected"` unless verified.
- No client, partner, company or individual name anywhere — including alt text, comments, filenames and commit messages. The white-label relationship is itself confidential.
- Do not enrich the anonymised descriptors. Specificity is identification.
- Do not upgrade an exposure level in prose.
- British / South African English.
- **No content in components.** All content flows from `/content` through `/lib/content.ts`.

If you cannot finish something without inventing a fact: **stop, log it to `CONTENT_GAPS_AND_TBDS.md`, ship without it.**

## Visual direction

"The Process Architect" — editorial consulting publication crossed with a systems map. Deep ink foundations, warm off-white surfaces, electric blue accent, strong typography, fine grid lines, directional paths, process nodes, subtle motion.

Avoid: developer-portfolio styling, agency templates, SaaS landing pages, logo walls, skill bars, stock photography, gradients, glassmorphism, cyberpunk, repetitive cards, generic AI illustration.

See `docs/02-design-system.md` and `docs/09-case-study-diagrams.md`. **The diagram colour semantics are Divyam's real client-delivery standard — match them exactly.**

## Interactions

Hero process transformation (deterministic, replayable, reduced-motion static comparison) · industry matrix · filtering with URL params · Current ⇄ Future toggle · expandable diagrams · sticky case-study nav · accessible mobile nav.

**The contact form must never fake success.** With no provider configured, show the mailto fallback and say so.

See `docs/03-interactions.md`.

## Code quality

- Typed content, reusable components, server-first
- Build-time content validation that **fails the build** on a broken reference
- Metadata, sitemap, robots, structured data with no fabricated fields
- WCAG 2.1 AA, `prefers-reduced-motion`, full keyboard support
- Every diagram has a sequential text alternative generated from the same data
- No horizontal overflow at 320px

## Build discipline

Follow `tasks/build-phases.md`. Phase 1 is design system + homepage + one flagship case study (`marketplace-installment-commerce`), then **stop and report**. Do not attempt 90 routes in one uncontrolled pass.

## The test that matters

A stranger reads the homepage for 30 seconds and concludes: Business Process Consultant, cross-industry, understands operations *and* software, turns unclear requirements into structured processes, deep Zoho without being limited to it.

If they conclude "he's a Zoho guy" or "he's a developer", the build has failed — regardless of how good it looks.
