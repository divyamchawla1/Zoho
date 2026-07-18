# 05 — Technical Requirements

## Stack

- **Next.js** (App Router) + **TypeScript** (`strict: true`)
- **Tailwind CSS**
- **Motion for React** (or Framer Motion) — animation only, not layout
- Local JSON in `/content`, typed by `/schemas/content-types.ts`
- SVG + CSS for all diagrams. **No diagram library.** No D3, no Mermaid, no flow libraries — the diagrams are generated from the content model and are simple by design.
- No CMS, no database, no auth in v1.

Server components by default. `"use client"` only where interaction genuinely requires it: filters, toggles, the hero transformation, disclosures, the mobile nav, the form.

## Content layer

```
/content/*.json          → source of truth
/schemas/content-types.ts → the contract
/lib/content.ts          → typed loaders (async from day one)
/lib/resolve.ts          → slug array → resolved objects
/lib/validate.ts         → build-time validation
```

Rules:

1. **No content in components.** Ever. Not a heading, not a label, not a fallback string that is really copy.
2. All access goes through `/lib/content.ts`. No component imports a JSON file directly.
3. Cross-references are slugs, resolved at the loader.
4. Loaders are `async` from day one even though the data is local — this is what makes the CMS migration a loader change instead of a rewrite.
5. `TBD` values are filtered at the loader. A component should never receive `"TBD"` and decide what to do with it.
6. **Build-time validation fails the build** on a broken slug reference. `scripts/validate-content.mjs` already implements the rules — port them into `/lib/validate.ts` and call it during the build.

## Rendering

Static generation for every route. `generateStaticParams` from the content model. No request-time server work. No ISR — the content changes when the repo changes.

## Contact form

Provider selected by env var; the form is built provider-agnostic.

```
CONTACT_PROVIDER=none | resend | formspree | zoho-forms
```

- `none` → render the mailto fallback and state plainly that the form is not connected. **Never simulate success.**
- Server action or route handler; validation on both sides.
- Honeypot + basic rate limiting. No third-party CAPTCHA in v1.

## Environment variables

See `.env.example`. No real values in the repo, ever.

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG images |
| `CONTACT_PROVIDER` | `none` \| `resend` \| `formspree` \| `zoho-forms` |
| `CONTACT_TO_EMAIL` | Recipient — TBD |
| `RESEND_API_KEY` | If Resend |
| `FORMSPREE_ENDPOINT` | If Formspree |
| `ZOHO_FORM_ENDPOINT` | If Zoho Forms |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional, TBD |

**Nothing secret goes in a `NEXT_PUBLIC_` var.** Anything prefixed `NEXT_PUBLIC_` is in the browser bundle and is public — treat it as published.

## Performance

- Target strong Core Web Vitals; the hero animation must not cost LCP.
- Fonts: `next/font`, subset, `display: swap`, preloaded. Font loading is a common critical-chain problem — do not let it become one here.
- SVG diagrams inline; no image requests for structural content.
- Lazy-load non-critical client components.
- No layout shift. Reserve space for the hero visual.

## Testing gates (every phase)

- [ ] `tsc --noEmit` passes
- [ ] `eslint` passes
- [ ] `next build` passes
- [ ] `node scripts/validate-content.mjs` passes
- [ ] No console errors or warnings
- [ ] No horizontal overflow at 320 / 360 / 768 / 1024 / 1440
- [ ] Full keyboard traversal
- [ ] `prefers-reduced-motion` verified
- [ ] No broken internal links
