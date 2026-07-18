# 04 — Content & Confidentiality Rules

> **This document governs.** Where it conflicts with any other document in this package, this one wins. Where it conflicts with something that would look better, this one wins.

## Public positioning

**Use:**
- Business Process Consultant *(primary — this is the identity)*
- Business Process Consultant specialising in CRM, operational transformation and Zoho solution architecture *(specialist line)*
- Business Process Transformation Consultant & Solution Architect *(senior framing)*
- Business Process Consultant | CRM and Operational Transformation | Solution Architecture *(profile line)*

**Never present him as:**
- Zoho developer · CRM administrator · project manager · automation expert
- AI engineer or ML specialist
- Accountant or financial adviser
- A management consultant with no implementation experience
- A freelancer with a skill list

## Absolute anonymisation

Never appears anywhere in this codebase — including alt text, code comments, filenames, commit messages, `git` history, JSON keys or a stray TODO:

- Client names · end-customer names · partner names · internal company names
- Individual names of any kind — colleagues, client contacts, partner principals
- Email addresses · phone numbers · addresses
- Commercial estimates · rate cards · margins · effort figures
- Private screenshots · customer data · credentials · security configuration
- Confidential transcripts · proprietary documents
- Internal disagreements, escalations or terminated engagements

**The white-label relationship is itself confidential.** Naming a partner is as much a breach as naming their client.

## Approved descriptors

Use exactly what is in `case-studies.json` and `industries.json`:

South African B2B laboratory and instrumentation distributor · South African early-childhood development sector organisation · European marine and yacht services business · European Zoho implementation partner · Financial-services marketplace · Multi-channel retail business · Flooring supply and installation business · Installation and home-improvement services business · Non-profit rescue organisation · Slovenian driver training business · Manufacturing business with an internal tool room · Partner-led integration project · Australian telecommunications provider · US energy company

**Do not enrich these.** Do not add a city, a size, a sector detail or a founding year to make a descriptor feel more real. Specificity is identification.

## No invented evidence — none

Do not create, infer, estimate, or "reasonably assume":

- Percentage improvements · time saved · revenue impact · cost reduction
- User counts · project counts · client counts · years of experience
- Testimonials or quotes · client logos · awards · certifications
- A portrait or any image of Divyam
- Pricing, day rates or package costs

`testimonials.json` and `metrics.json` **ship as empty arrays**. That is deliberate.

> **Empty means the component does not render. It does not mean "add an example."**
> If a section would look better with three testimonials in it, the section is wrong — not the content.

`effect.type` is `"expected"` unless a verified outcome exists. It stays `"expected"`. `verifiedMetrics` stays `[]`. `price` stays `"TBD"`.

## Exposure levels are honesty, not modesty

| Level | Meaning | Never render as |
|---|---|---|
| `operator-experience` | He runs this business himself | — |
| `solutioning-experience` | Designed the process and architecture | "expert in" |
| `process-experience` | Worked the process, not the whole engagement | "specialist in" |
| `project-exposure` | Involved in projects touching this industry | "extensive experience in" |

Never upgrade a level in copy. An industry page for a `project-exposure` industry says what it says. This restraint is more persuasive than the alternative, and it is also simply true.

## Language

Prefer: designed · mapped · structured · clarified · architected · coordinated · defined · reviewed · separated · established.

Avoid: revolutionary · world-class · unmatched · guaranteed · 10x · industry-leading · passionate · game-changing · seamless.

**British / South African English** throughout: organisation, prioritise, specialise, licence (noun) / license (verb), programme, whilst → while. Currency is never assumed.

Write for a business owner who is tired. Short sentences beat clever ones.

## Zoho

Zoho is real, deep and commercially valuable — and it is **the ninth thing** the site says, not the first.

- Not in the hero. Not in the meta description of the homepage. Not above homepage section 10.
- Never a logo wall.
- In `technology.json`, the *capability* is stated before the product names. Keep that order in the UI.
- On a case study, technology appears after the process and architecture reasoning.

## Pre-publish checklist

- [ ] `grep -ri` the repo for every real client, partner and individual name — including in `git log`
- [ ] No metric, percentage, count or year of experience anywhere
- [ ] `testimonials.json` and `metrics.json` still `[]`
- [ ] Every `price` still `"TBD"`
- [ ] Every `effect.type` still `"expected"` (except where explicitly verified)
- [ ] No exposure level upgraded in prose
- [ ] Zoho below the fold and below every process section
- [ ] British/SA spelling consistent
- [ ] No placeholder portrait, avatar or logo
- [ ] `git config user.email` set before the first commit — see `10-deployment.md`
