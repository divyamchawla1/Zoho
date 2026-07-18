# 12 — Clarification Questions for Divyam

These are **for Divyam**, not for the build agent. The build agent must not answer them, guess at them, or resolve them by picking something reasonable. Ship without, and log it.

## Blocking launch

1. **Professional email address** for the contact form recipient and the mailto fallback.
2. **Final domain.**
3. **LinkedIn URL** — currently `TBD` in `contact.json`. Without it, the `Person` schema ships with no `sameAs` and the footer has no profile link.
4. **Contact form provider** — Resend, Formspree, Zoho Forms, or launch with mailto only?

## Blocking credibility (all currently absent by design)

5. **Years of experience** — publish a number, or continue without? Currently no number appears anywhere.
6. **Certifications** — any Zoho or other certifications you want listed? None are claimed.
7. **Professional portrait** — supply one, or ship without? Currently no image, no avatar, no placeholder.
8. **Named clients** — is *any* client nameable with written permission? Assumed: none.
9. **Testimonials** — any you can obtain with approval? `testimonials.json` is empty.
10. **Verified metrics** — any outcome you can evidence? `metrics.json` is empty and every `effect.type` is `"expected"`.

## Commercial

11. **Pricing** — every engagement model shows `typicalDuration: "TBD"` and every service `price: "TBD"`. Publish ranges, publish nothing, or publish "from"?
12. **Front-door engagement model** — which of the six do you actually want people to ask for? The site currently presents them evenly.
13. **Partner-led confidentiality** — confirm that no partner may be named, including the fact that a relationship exists. The package assumes yes.
14. **Your own e-commerce / jewellery business** — nameable, or does it stay as "own e-commerce and jewellery business"? Currently unnamed.

## Content review

15. **Case-study identifiability review** — read all twelve as a stranger who works in that industry. Flag any that are recognisable. Look hardest at:
    - `marine-licensing-relationship-architecture` — the six-role model is distinctive
    - `partner-configurator-scoping-tool` — a partner with a configurator and a specific pricing conflict
    - `ecd-training-verification-crm` — a named sector in a named country
    - `b2b-distribution-crm-over-erp` — a specific platform combination in a specific market
16. **Exposure level review** — check every `exposure` value in `industries.json`. Deliberately conservative. Correct anything wrong in either direction.
17. **Insights** — ten placeholders with titles and summaries, no bodies. Which will you actually write? Delete the rest — an insights section of permanent placeholders is worse than none.
18. **The Eleven Questions** — treated as a signature brand device. Comfortable with that prominence?
19. **Tone check** — the copy is direct and occasionally dry. Read `about.json` `principles` and `operatorExperience` and confirm it sounds like you.
20. **Downloadable assets** — a sample redacted deliverable would be strong evidence. Is any of it publishable?

## Technical

21. **Analytics** — any, and which?
22. **Hosting** — Vercel assumed. Preference?
23. **Repository visibility** — public or private? If public, the git history and the commit email are published too.
24. **CV / resume** — downloadable, or deliberately absent? Currently absent, consistent with "not an online resume".

## Escalate rather than resolve

If the build agent hits any of these mid-build, it stops and logs to `CONTENT_GAPS_AND_TBDS.md`:

- Any requirement that can only be completed by inventing a fact
- Any case study that seems identifiable
- Any place where an empty array would render an empty section
- Any conflict between `04-content-and-confidentiality.md` and another document — 04 wins, but flag it
