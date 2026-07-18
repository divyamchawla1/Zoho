# Start Here

Build a portfolio website for **Divyam Chawla**, a **Business Process Consultant** specialising in CRM, operational transformation and Zoho solution architecture.

## Read before writing any code

| File | Treat as |
|---|---|
| `CLAUDE.md` | The governing build instruction |
| `docs/04-content-and-confidentiality.md` | **Supreme. Wins every conflict.** |
| `MASTER_BUILD_PROMPT.md` | The creative and functional brief |
| `docs/01`–`docs/13` | The full specification |
| `content/` | The source of truth for everything the site says |
| `schemas/content-types.ts` | The contract between content and UI |
| `tasks/build-phases.md` | The execution sequence |

Then run `node scripts/validate-content.mjs` to confirm the content model is intact before you build against it.

## Phase 1 only

1. Project setup — Next.js App Router, TypeScript strict, Tailwind
2. Design tokens and typography from `docs/02-design-system.md`
3. Content loaders, types and **build-time validation**
4. Global layout, navigation and footer
5. **Homepage** — all 12 sections in the fixed order
6. **One flagship case study**: `marketplace-installment-commerce`
7. Responsive and accessibility validation
8. Production build passing

**Stop there.** Do not attempt every route in one pass. Establish the design system, the homepage and one case study, then reuse that system for the other 90+ routes in Phase 2.

## What to report at the end of Phase 1

- A concise implementation summary
- Files created
- Anything you logged to `CONTENT_GAPS_AND_TBDS.md`
- Any conflict you found between documents
- The contrast result for `accent-500` on `paper-50` (flagged as a likely AA failure in `docs/02` and `docs/07`)

## Rules that apply from the first line of code

- **Invent nothing.** If a requirement can only be finished by making up a fact, stop and log it.
- **Empty means absent.** An empty array renders no component — not a placeholder.
- **No content in components.** Ever.
- **No client, partner or individual names** anywhere, including commit messages.
- **Zoho is the ninth thing the site says**, not the first.
