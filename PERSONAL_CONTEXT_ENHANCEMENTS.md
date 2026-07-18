# Personal Context Enhancements

What changed in this revision, and on what basis. Everything below came either from the uploaded package, from the professional context document supplied alongside it, or from prior conversations about Divyam's actual work. **Nothing was invented.** Where something was not known, it became a `TBD` rather than a guess.

## What the original package got right and kept

The positioning, the brand line, the design concept, the five-stage methodology, the anonymisation instinct and the refusal to fabricate evidence were all correct and are unchanged. The colour palette, the type stack, the hero transformation concept and the flagship case study selection survive intact.

## Where it was thin, and what was done

| Area | Before | After |
|---|---|---|
| Processes | 16, five fields each | **50**, twelve fields each, including **discovery questions** — the differentiator |
| Case studies | 6, ~18 fields | **12**, full 20-section structure with `standardVsCustom`, `scopeDecisions`, `dependencies`, `clientResponsibilities` |
| Industries | 13, four fields | **18**, nine fields, plus an honest `exposure` level per industry |
| Services | 8 | **19**, each with an engagement model and a `notIncluded` list |
| Methodology | Stage names and activities | Purpose, inputs, activities, **questions asked**, outputs, risks checked, client responsibilities — plus **The Eleven Questions** and a five-layer testing model |
| Deliverables | 8, one line each | **10**, with audience, contents and sample outlines |
| Docs | 6 short files | **13** files, including SEO, accessibility, diagram standards, deployment, CMS migration and open questions |
| Schema | 8 types, loose | **Full contract**, `--strict` clean, with honesty encoded in the types |
| Validation | None | `scripts/validate-content.mjs` — every cross-reference checked, build-breaking |
| Governance | Implicit | `docs/04` declared supreme; precedence order in `CLAUDE.md` |

## Context used from prior knowledge

Each of the six new case studies is drawn from real engagements, anonymised to a descriptor and stripped of every name, figure and commercial term. What was kept is the **reasoning**, because that is what has portfolio value and what is not confidential.

- **`b2b-distribution-crm-over-erp`** — a CRM layer over a retained inventory platform and accounting platform. The source-of-truth question, the "real time is a phrase, not a specification" position, and the discipline of recording every manual sales action as a time-stamped state. Anonymised to "South African B2B laboratory and instrumentation distributor". No client name, no platform-specific commercial detail, no user count beyond a generic "roughly a dozen".
- **`ecd-training-verification-crm`** — reconciling many partially-agreeing sources into one client-facing specification, the study-versus-training modelling decision, custom modules for domain concepts, partial verification outcomes, and the rule that a client-facing document carries no internal provenance. Anonymised to a sector and a country. No individuals, no organisation name, no version history.
- **`field-service-job-lifecycle`** — three job types needing three blueprints, and the scope deviation report covering address validation, deposit calculation and skill-based scheduling. The lesson kept is that reporting deviation beats absorbing it.
- **`claims-process-rebuild`** — the cascading product/claim/issue classification as the structural centre, inspectors participating through forms rather than licences, and raising the missing dependency table as a blocker.
- **`partner-configurator-scoping-tool`** — a partner-led audit: a structuring axis contradicting the partner's own catalogue, three conflicting retail figures, a reproducible crash, and internal cost fields exposed in a public bundle. The partner is unnamed and unlocated beyond "European". This is the only case with `effect.type: "achieved"`, because the findings themselves are the outcome and they are not a metric.
- **`driving-school-portal`** — a public-facing portal over an operational process, the admin dashboard audited rather than assumed, and a payment dependency escalated rather than scheduled around.

Two existing cases were substantially deepened using the same reasoning: `marine-licensing-relationship-architecture` (the dated party-role model supporting six concurrent company roles per vessel — the clearest relationship-modelling lesson in the portfolio) and `marketplace-installment-commerce` (the lending boundary as a scope *exclusion* rather than a deferral).

## Positioning strengthened

- **The Eleven Questions** were promoted from a buried quality checklist to a named, ownable brand device with a homepage section. It is the most portable thing about how he works.
- **Exposure levels** were added to every industry (`operator-experience` / `solutioning-experience` / `process-experience` / `project-exposure`), encoded in the type system, and validated. The instruction not to imply expertise where involvement was limited is now enforced by the schema rather than by good intentions.
- **`notIncluded` on every service** and **`standardVsCustom` on every case study** make scope discipline visible in the two places a portfolio normally oversells.
- **`fashion-jewellery` is marked `operator-experience`** and the About page carries an operator section — the e-commerce business is a differentiator, not a footnote.
- **The AI position is stated in both directions**: what the AI work is, and explicitly what he is not claiming. The instruction not to position him as an AI engineer is now content, not just a rule.
- **Homepage section 10** — technology below everything — is stated as non-negotiable in four separate documents, because it is the single decision that determines whether the site says "consultant" or "Zoho guy".

## Confidentiality decisions

- Partner relationships are treated as confidential in themselves. Naming a partner is a breach even without naming their client.
- Descriptors may not be enriched. Adding a city or a size to make a descriptor feel real is identification.
- The identifiability of four specific cases is flagged for Divyam's own review in `docs/12` §15 — the marine relationship model and the partner configurator are distinctive enough to warrant a second look from someone who knows those markets.
- Nothing about internal disagreements, escalations or terminated engagements appears anywhere.

## What was deliberately not added

Testimonials, metrics, logos, certifications, years, counts, a portrait, prices, insight bodies, timeline dates. All are listed in `CONTENT_GAPS_AND_TBDS.md`. The site is built to render nothing where nothing is known — which is a stronger position than a plausible invention, and the only one consistent with what the site claims about how he works.
