# Content Gaps and TBDs

Everything here is **deliberately absent**. Nothing in this list may be invented, estimated or filled with a placeholder. The build agent appends to this file when it skips something; Divyam works down it.

## Blocking launch

- [ ] **Professional email address** — `contact.json.email` is `TBD`. Needed for the form recipient and the mailto fallback.
- [ ] **Final domain** — needed for `NEXT_PUBLIC_SITE_URL`, canonicals, sitemap and OG images.
- [ ] **LinkedIn URL** — `contact.json.linkedin` is `TBD`. Until supplied, `Person` schema ships without `sameAs` and the footer has no profile link.
- [ ] **Contact form provider** — Resend, Formspree, Zoho Forms, or mailto only. Until decided, the form shows the honest fallback.
- [ ] **`CONTACT_TO_EMAIL`** — see `.env.example`.

## Evidence — absent by design

- [ ] **Professional portrait** — no image, no avatar, no illustration, no initial. If none is supplied, the About page ships without one.
- [ ] **Verified project metrics** — `metrics.json` is `[]`. Every `effect.type` is `"expected"` and every `verifiedMetrics` is `[]`.
- [ ] **Testimonials** — `testimonials.json` is `[]`. Requires written approval before a single one is added.
- [ ] **Publicly approved client names** — assumed: none. Every case study is anonymised.
- [ ] **Certifications** — none claimed.
- [ ] **Years of experience** — no number anywhere on the site.
- [ ] **Project / client counts** — not published. Do not count the case studies and present the total as a project count.
- [ ] **Downloadable portfolio assets** — a redacted sample deliverable would be strong evidence. None currently publishable.
- [ ] **CV / resume** — deliberately absent, consistent with "not an online resume". Confirm.

## Commercial

- [ ] **Pricing** — every service `price: "TBD"`; every engagement model `typicalDuration: "TBD"`. Decide: ranges, "from" figures, or nothing.
- [ ] **Front-door engagement model** — which of the six should the site actually push?
- [ ] **Own e-commerce / jewellery business** — nameable or not? Currently unnamed.

## Content

- [ ] **Insight bodies** — ten placeholders, all with `body: []`. The build agent must not write them. Decide which you will write and delete the rest.
- [ ] **Timeline dates** — `about.json.timeline` periods are `TBD`. Rendered as sequence, not calendar, until supplied.
- [ ] **Case-study identifiability review** — see `docs/12-clarification-questions.md` §15.
- [ ] **Exposure level review** — see `docs/12-clarification-questions.md` §16.

## Technical

- [ ] **Analytics** — `NEXT_PUBLIC_ANALYTICS_ID` unset. Decide whether to have any.
- [ ] **Hosting** — Vercel assumed.
- [ ] **Repository visibility** — if public, the commit history and author email are public too. Set `git config user.email` before the first commit.
- [ ] **Contrast verification** — `accent-500` (#4F7CFF) on `paper-50` (#F7F5EF) is flagged as a likely WCAG AA failure at body size. Verify and adjust the text accent if needed.

## Appended by the build agent

<!-- Format: - [ ] <what was skipped> — needed for <route/component> — blocked on <what Divyam must supply> -->

- [x] Not a skip, but flagged for review: homepage sections 2 ("The problem") and 8 ("What clients bring / what I produce") had prescribed copy in `MASTER_BUILD_PROMPT.md` but no backing content collection. Rather than hard-code that copy into components (violating "no content in components") or invent new phrasing, it was transcribed verbatim from `MASTER_BUILD_PROMPT.md` into a new `content/homepage.json`, typed as `HomepageContent` in `schemas/content-types.ts`, loaded via `getHomepage()`. Divyam should read `content/homepage.json` and confirm the phrasing — it was copied, not authored.
- [ ] **Contact form rate limiting** — `docs/05-technical-requirements.md` calls for "honeypot + basic rate limiting." The honeypot is implemented (a hidden field that silently short-circuits to the honest not-connected state if filled). Real rate limiting was deliberately not implemented: a naive in-memory counter would not work correctly across serverless function instances on Vercel and would just be a false sense of security, which conflicts with this site's own "no invented evidence" standard. Needed before a real `CONTACT_PROVIDER` goes live: a durable store (Vercel KV / Upstash Redis or similar) keyed by IP or session, wired into `app/contact/actions.ts`.
- [ ] **Contact form end-to-end test against a real provider** — only the `CONTACT_PROVIDER=none` path has been tested (as instructed for this phase). The `resend`, `formspree` and `zoho-forms` branches in `app/contact/actions.ts` are implemented against each provider's public API shape but unverified, since no API keys or endpoints exist in this environment. Test each once real credentials are available.
