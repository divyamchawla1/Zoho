# 06 — SEO Requirements

## Strategy

The commercial bet is not "business process consultant" as a head term. It is the **Process Library**: 50 pages, each answering a specific operational question that a specific person searches at the moment they have the problem — *how should merchant payout work*, *when should stock be allocated*, *defect or transit damage*, *who owns the source of truth between CRM and ERP*.

Those pages are the strategic asset. They are the top indexation priority, and they are why the library was built at this depth.

## Metadata

Generated **from the content model**, never templated with a keyword pattern.

- Title: entity name + a real qualifier. Not "| Business Process Consultant | Zoho | CRM".
- Description: the entity's own `objective` / `summary` / `executiveSummary`, trimmed. Written for a human.
- Canonical on every route from `NEXT_PUBLIC_SITE_URL`.
- **The homepage meta description does not contain the word Zoho.**

## Open Graph

Dynamic OG images via `next/og`. Dark `ink-950` ground, the entity name, the category, and a fragment of the diagram language. No photograph. No logo. Consistent across all 90+ routes.

## Structured data

- `Person` on `/about` — name, job title, description. **No `sameAs` until real URLs exist** (LinkedIn is TBD). No `alumniOf`, no `award`, no `hasCredential` — nothing is verified.
- `ProfessionalService` on `/` and `/services` — name, description, service list. **No `aggregateRating`, no `review`, no `priceRange`.**
- `FAQPage` on `/faq` — from `faqs.json`.
- `Article` **only** on insights with `status: "published"`. Placeholders get `noindex` and no Article schema.
- `BreadcrumbList` on all detail pages.

> No structured data field may contain a value that does not exist. An empty `aggregateRating` is worse than no schema — it is a false claim in a machine-readable format.

## Sitemap and robots

- `sitemap.xml` generated from the content model. Insight placeholders excluded.
- `robots.txt` allows production.
- **Preview and staging deployments must return `Disallow: /`.** Key off `VERCEL_ENV` or equivalent. A duplicated preview domain in the index is a real and avoidable problem.

## Internal linking

The cross-link graph is the SEO structure. Every process links to its industries and case studies; every case study links back. This happens automatically from the slug arrays — which is the reason cross-references are validated at build time rather than trusted.

## What we will not do

- No keyword stuffing in headings
- No thin pages created to hit a count
- No fabricated schema
- No "Zoho consultant in [city]" pages
