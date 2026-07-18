# 11 — Future CMS Migration

## v1 is local JSON on purpose

No CMS, no database, no auth. The content is stable, the author is technical, and the site is static. A CMS in v1 would add an account, a bill, an outage surface and a build dependency in exchange for nothing.

That is a decision with an expiry date, not a permanent position — so v1 is built so the migration is a **loader change**.

## The one rule

> **Migration must touch zero page components.**

```
content (JSON today, CMS tomorrow)
        ↓
/lib/content.ts   ← the ONLY thing that changes
        ↓
components (never change)
```

## Enforced from Phase 1

1. No content in components. Not a heading, not a label, not a "temporary" string.
2. All content access through `/lib/content.ts`. No component imports JSON directly.
3. `/schemas/content-types.ts` is the contract. Both sides conform to it — the loader's job is to return these types no matter where the data came from.
4. Cross-references are slugs, resolved at the loader.
5. **Loaders are `async` from day one.** They do not need to be today. They need to be tomorrow, and retrofitting async through a component tree is exactly the rewrite this rule exists to prevent.
6. `TBD` filtering happens in the loader, not the component.

## When to migrate

Migrate when Divyam is editing content weekly and the git round-trip is the bottleneck — or when someone else needs to edit it. Not before.

## Candidate approaches

**Lightweight (likely right):** MDX or a content-collections library. Keeps everything in the repo, adds structure and validation, no external service. Migration is nearly free.

**Full CMS:** Sanity, Contentful or Payload. Real editing UI, real cost, real dependency. Worth it only when a non-technical person is editing.

**Do not use Zoho WorkDrive or Zoho Writer as the CMS.** They are excellent document tools and are not a structured content backend. It would also be exactly the mistake this site spends fifty pages arguing against: choosing the product before the requirement.

## Migration steps

1. Model the content types in the chosen system, mirroring `content-types.ts` exactly.
2. Import the existing JSON.
3. Rewrite `/lib/content.ts` to fetch instead of read. Same signatures, same return types.
4. Keep `/lib/validate.ts` running — a CMS makes broken references *more* likely, not less, because there is no diff to review.
5. Run the full QA suite from `08-qa-acceptance.md`.
6. Diff the rendered output. It should be identical.

## Rules that must survive the migration

- Empty means the component does not render (`testimonials`, `metrics`)
- `TBD` is filtered, never displayed
- Build-time validation fails the build on a broken reference
- Everything in `04-content-and-confidentiality.md`

A CMS makes it easier to publish a mistake. The rules matter more afterwards, not less.
