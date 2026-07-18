# 13 — Content Gap Process

`CONTENT_GAPS_AND_TBDS.md` at the repo root is the actual list. This document is the process around it.

## The build agent's gates

**Empty means absent.** If `testimonials.json` is `[]`, the testimonials component does not appear in the DOM. Not a placeholder. Not a skeleton. Not "Testimonials coming soon". Absent.

**STOP if completing something requires inventing a fact.** Do not estimate, do not infer, do not use a reasonable industry average, do not write "trusted by teams across three continents" because it is technically defensible. Log it to `CONTENT_GAPS_AND_TBDS.md` and ship without it.

**Every cross-reference resolves.** Validation fails the build. See `05-technical-requirements.md`.

**Nothing over-claims.** If the copy reads stronger than the content supports, the copy is wrong.

## Divyam's review pass

1. **Confidentiality** — is any case study recognisable to someone in that industry?
2. **Accuracy** — is every claim true, and is every exposure level right?
3. **Completeness** — which TBDs are you willing to resolve, and which stay TBD permanently?

## Deliberately absent — do not "fix" these

| Absent | Why | Do not |
|---|---|---|
| Testimonials | None with written approval | Add examples or "sample" quotes |
| Client logos | Confidential; several white-labelled | Add a logo wall of *software* instead |
| Metrics and percentages | None verified | Estimate, infer, or cite an industry benchmark |
| Years of experience | Not supplied | Calculate one from anything |
| Certifications | Not supplied | List "familiar with" as a credential |
| Portrait | Not supplied | Use an avatar, illustration or initial |
| Pricing | Not decided | Invent a range or a "from" figure |
| Project / client counts | Not supplied | Count the case studies and present it as a project count |
| Named clients and partners | Confidential | Hint, describe distinctively, or name a market so precisely that it identifies |
| Insight bodies | Not written | Write them for him |

## Logging format

When something is skipped, append to `CONTENT_GAPS_AND_TBDS.md`:

```
- [ ] <what was skipped> — needed for <route/component> — blocked on <what Divyam must supply>
```

That file is the handover. It is more valuable than a fabricated version of the site would have been.
