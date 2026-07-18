# Master Build Prompt

Build a portfolio website for **Divyam Chawla**, a Business Process Consultant working between business operations, CRM transformation, solution architecture and software implementation.

It must not feel like a Zoho consultant's page, an online resume, a developer portfolio or a consulting agency template.

It should feel like a **living library of business process knowledge** that happens to belong to someone available for hire.

## Core positioning

Hero:

> **I map how businesses work—and design how they should work next.**

Supporting:

> Business Process Consultant helping organisations simplify operations, structure complex requirements, and implement practical CRM and operational systems.

Elsewhere:

> From discovery and process mapping to solution architecture, scope, implementation planning and UAT, I help businesses move from operational confusion to structured digital systems.

## Audience

Business owners · operations leaders · Zoho and CRM implementation partners · technology consulting firms · department heads · transformation leads · anyone with a fragmented requirement and no idea how to brief it.

## Design concept — The Process Architect

Editorial consulting publication × systems map. Large type, deliberate whitespace, fine grid lines, connected nodes, directional paths, step flows, alternating dark and warm-light sections. Modern and visual without becoming decorative.

## Homepage — 12 sections, fixed order

### 1. Hero
Left: eyebrow (Business Process Consultant), headline, supporting text, CTAs (Explore My Work · Browse the Process Library).
Right: the **process transformation**.

State A — fragmented: customer messages, email, spreadsheet, manager approval, finance handoff, missing follow-up, disconnected reporting. Scattered, duplicated, unconnected.

State B — structured: `Enquiry → Qualification → Approval → Fulfilment → Finance → Reporting`.

Deterministic. Replayable. Static comparison under reduced motion. **It must explain the work, not decorate the page.** Not a particle animation.

### 2. The problem
What arrives (a call recording, screenshots, four spreadsheets, three opinions, a deadline) versus what is needed (a process, an architecture, a scope). This frames everything below it.

### 3. Selected transformations
Large horizontal panels — not a card grid. From `case-studies.json` where `featured: true`, ordered by `featureOrder`:

1. Marketplace and instalment commerce architecture
2. Marine licensing and relationship architecture
3. CRM over an existing ERP: deciding the source of truth
4. Training, assessment and verification lifecycle
5. Retail customer-support transformation
6. Partner scoping configurator: auditing a product before it ships

Each shows: industry, the challenge, processes analysed, his contribution, a simplified workflow preview, and a link in.

### 4. Industry experience
Interactive matrix from `industries.json`. Hover/focus/tap reveals that industry's processes. **Shows the exposure level.** 18 industries.

### 5. Process library preview
Grouped by the six families in `process-categories.json`. Filterable by category and industry. Make the depth visible — 50 processes is the argument.

### 6. Methodology
Five stages as one connected journey: Discover → Map → Redesign → Architect → Activate. Each reveals inputs, activity and outputs.

### 7. The Eleven Questions
The decision framework as a **signature device**. Every requirement goes through the same eleven questions before it becomes a build. This is brand — design it accordingly.

### 8. What clients bring / what I produce
Split section. Left: rough explanations, recordings, screenshots, spreadsheets, disconnected requests, multiple app ideas, unclear ownership. Right: business understanding, current-state process, gap analysis, future-state workflow, solution architecture, scope and assumptions, dependencies and risks, implementation roadmap, testing criteria.

### 9. Deliverables
What actually gets handed over. From `deliverables.json`.

### 10. Technology enablement
**Below everything above. Never higher.**

> Technology is selected after the process is understood.

Capability groups from `technology.json`, capability stated before product names. **No logo wall.**

### 11. About preview
Role intersection or capability map. No skill bars. No portrait — there isn't one.

### 12. Final CTA

> **Have a complicated process that is difficult to explain?**
>
> Bring the rough requirement, existing workflow or operational problem. I will help structure it into a clear process and practical solution direction.

CTA: **Discuss Your Process**

## Work index

Filterable case-study library. Filters: industry, process category, engagement stage, technology group.

Every card states which engagement stages the work involved — discovery, process mapping, architecture, requirement documentation, estimation, delivery leadership, UAT. That honesty is the differentiator.

## Case-study detail — 20 sections

Executive summary · industry context · business model · operational challenge · stakeholders · current-state process · process gaps · key discovery questions · future-state process · solution architecture · standard versus custom · scope decisions · dependencies · client responsibilities · risks · contribution · deliverables produced · expected or achieved effect · related processes · related industries · CTA.

Plus: sticky section nav, Current ⇄ Future toggle, expandable diagrams, anonymisation notice.

The `standardVsCustom` and `scopeDecisions` sections are where the consulting judgement is visible. Design them properly — they are not appendices.

## Industries

Index (matrix) + 18 detail pages. Each: overview, typical problems, processes worked on, example anonymised engagements, architecture considerations, common risks, deliverables, services, related case studies — and the exposure level, rendered plainly.

## Process library

Index (filterable) + 50 detail pages. Each: objective, stakeholders, common current-state problems, recommended future-state pattern, controls, data required, reporting, risks, **discovery questions**, technology categories, related industries, related case studies.

The discovery questions are the reason this library is worth more than a services page. Do not bury them.

## Methodology

Five stages in depth: purpose, inputs, activities, questions asked, outputs, risks checked, client responsibilities, deliverables, case studies. Plus The Eleven Questions and the five-layer testing model.

## Services

19 services from `services.json`. Each: who it is for, when it is needed, inputs, activities, deliverables, engagement model, **what is not included**, related case studies.

The `notIncluded` field is deliberate — it is a scope-discipline signal in a section that is usually pure sales. Render it.

**No prices.** Every one is `TBD`.

## About

Not a biography. Not a resume.

Role intersection model, capability map (no percentages), consulting principles, professional timeline (dates are TBD — render as sequence, not calendar), operator experience, AI position.

He works between business and technology; enters unfamiliar industries and learns the business first; organises ambiguity; designs for implementation and adoption; has cross-industry and international exposure; works partner-led and white-label; runs his own e-commerce business; uses AI as a consulting layer and is **not** an AI engineer.

## Insights

Editorial section. Ten placeholders with titles and summaries, **no bodies**. Index renders; detail pages only for `status: "published"`; placeholders are `noindex`. Do not write the articles.

## Contact

Focused business enquiry. Fields from `contact.json`. Provider via env var.

With no provider configured: mailto fallback and an honest statement. **Never simulate a successful send.**

## Success criteria

Thirty seconds on the homepage. The visitor concludes:

1. Business Process Consultant
2. Works across industries
3. Understands business operations **and** software implementation
4. Converts unclear requirements into structured processes and implementable solutions
5. Deep Zoho experience without being limited to Zoho

If they conclude "he's a Zoho guy" — the build failed.
