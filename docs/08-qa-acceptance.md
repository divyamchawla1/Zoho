# 08 — QA & Acceptance Criteria

## The 30-second test

A qualified stranger lands on the homepage, reads for 30 seconds, and leaves. They must be able to say:

1. He is a **Business Process Consultant**.
2. He works **across industries**.
3. He understands **both business operations and software implementation**.
4. He turns **unclear requirements into structured processes and implementable solutions**.
5. He has **deep Zoho experience without being limited to Zoho**.

**Failure conditions.** If the visitor's summary is any of these, the build has failed regardless of how it looks:

- "He's a Zoho guy."
- "He's a developer."
- "He's a project manager."
- "It's an online CV."
- "It's an agency site."

## Positioning

- [ ] "Business Process Consultant" is visible above the fold
- [ ] The hero line is the brand line, verbatim
- [ ] Zoho does not appear in the hero, the homepage meta description, or above section 10
- [ ] No logo wall anywhere
- [ ] The Process Library is discoverable from the homepage
- [ ] The Eleven Questions appear as a designed device, not a bullet list

## Content & confidentiality

- [ ] No client, partner, company or individual name anywhere — including `git log`
- [ ] No invented metric, percentage, count or year
- [ ] `testimonials.json` and `metrics.json` are `[]` and their components do not render
- [ ] Every `price` is `"TBD"` and no price is displayed
- [ ] `effect.type` is `"expected"` except where genuinely verified
- [ ] No exposure level upgraded in prose
- [ ] British/SA English throughout
- [ ] Anonymisation notice appears wherever client work is described

## Design

- [ ] Does not resemble a developer portfolio, agency template, SaaS page or dashboard
- [ ] Dark and warm-light sections alternate deliberately
- [ ] Not every section is a card
- [ ] Diagram colour semantics match the standard in `09-case-study-diagrams.md`
- [ ] Hero headline readable at 320px
- [ ] No stock photography, no AI illustration, no placeholder portrait

## Interaction

- [ ] Hero transformation is deterministic and replays
- [ ] Reduced-motion path shows the static comparison
- [ ] Filters reflect and restore from URL params
- [ ] Current ⇄ Future toggle updates diagram, summary **and** callouts together
- [ ] Sticky case-study nav works and does not trap focus
- [ ] Mobile nav traps and returns focus
- [ ] No scroll-jacking

## Contact form

- [ ] Validates properly, errors announced
- [ ] With no provider configured: mailto fallback shown and the state stated honestly
- [ ] **Never shows a success state for a message that was not sent**

## Technical

- [ ] `tsc --noEmit`, `eslint`, `next build` all pass
- [ ] `node scripts/validate-content.mjs` passes
- [ ] Build **fails** on a deliberately broken slug reference (test this once)
- [ ] No console errors
- [ ] No horizontal overflow at 320 / 360 / 768 / 1024 / 1440
- [ ] Metadata on every route; sitemap and robots present
- [ ] Preview deployments disallow indexing

## Accessibility

See `07-accessibility.md`. All of it is acceptance criteria.

## Content management

- [ ] A new industry can be added by editing `industries.json` alone
- [ ] A new process can be added by editing `processes.json` alone
- [ ] A new case study can be added by editing `case-studies.json` alone
- [ ] No component contains content
- [ ] A CMS migration would touch `/lib` only — no page component changes
