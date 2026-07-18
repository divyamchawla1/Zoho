# Divyam Chawla — Business Process Consultant Portfolio

A Claude Code build package for a personal portfolio website.

This repository is **not the website**. It is the complete specification and content for building it: 13 numbered documents, 16 typed content collections, a validated content model, and a phased build plan.

## Positioning

The site must position Divyam Chawla as a **Business Process Consultant** specialising in CRM, operational transformation and Zoho solution architecture.

It must not read as a Zoho developer's site, a CRM administrator's site, a project manager's site, an online resume, or an agency template.

## Quick start

```bash
# 1. Extract this ZIP and open the folder in your terminal
# 2. Verify the content model is intact
node scripts/validate-content.mjs

# 3. Run Claude Code from this directory with the instruction in START_HERE.md
```

## What is in here

| Path | Contents |
|---|---|
| `CLAUDE.md` | Governing build instruction — read first |
| `START_HERE.md` | The execution instruction and Phase 1 boundary |
| `MASTER_BUILD_PROMPT.md` | The creative and functional brief |
| `docs/01`–`docs/13` | Architecture, design, interaction, confidentiality, technical, SEO, accessibility, QA, diagrams, deployment, CMS migration, open questions, gap process |
| `content/` | 16 JSON collections — 50 processes, 12 case studies, 18 industries, 19 services, 10 deliverables, 6 engagement models, 12 FAQs, 10 insight placeholders |
| `schemas/content-types.ts` | The content contract. Type-checks clean under `--strict` |
| `scripts/validate-content.mjs` | Zero-dependency cross-reference validator |
| `tasks/build-phases.md` | Five phases with QA gates |
| `CONTENT_GAPS_AND_TBDS.md` | What Divyam still needs to supply |
| `PERSONAL_CONTEXT_ENHANCEMENTS.md` | What was added in this revision and on what basis |

## Non-negotiables

- **Nothing is invented.** No client names, testimonials, certifications, metrics, project counts or years of experience. `testimonials.json` and `metrics.json` ship empty and stay empty.
- **All client work is anonymised**, including partner relationships. The white-label relationship is itself confidential.
- **Technology comes last.** Zoho never appears in the hero and never above homepage section 10.
- **Empty means the component does not render.** It does not mean add an example.
- `docs/04-content-and-confidentiality.md` **governs.** It wins every conflict.
