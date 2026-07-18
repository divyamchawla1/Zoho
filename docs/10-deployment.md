# 10 — Deployment

## Target

Vercel assumed (Netlify or Cloudflare Pages are fine — nothing here is Vercel-specific). Fully static generation, no request-time server work beyond the contact form handler.

## Before the first commit

**Set the git identity.** Commit history is public if the repo ever is, and an author email is not recoverable once pushed.

```bash
git config user.name "Divyam Chawla"
git config user.email "<the professional address — TBD>"
```

Never commit: source materials, transcripts, client documents, screenshots, exported data, `.env` files, or notes containing a real name. `.gitignore` covers the obvious cases; it cannot cover a pasted paragraph.

## Pre-deploy checklist

- [ ] Final domain confirmed (TBD)
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] Contact provider configured — **or** the honest fallback verified in production
- [ ] `CONTACT_TO_EMAIL` set (TBD)
- [ ] Preview/staging environments return `Disallow: /`
- [ ] No secret in any `NEXT_PUBLIC_` variable
- [ ] `node scripts/validate-content.mjs` passes
- [ ] `next build` passes clean
- [ ] The confidentiality checklist in `04-content-and-confidentiality.md` completed

## Security

- Keep Next.js patched. Framework CVEs are routine and the upgrade is cheap; being on an unpatched version of a framework on a consultant's own site is a bad look as well as a risk.
- **Nothing internal in the client bundle.** Anything `NEXT_PUBLIC_` is published. Anything imported into a client component is published, including the parts of a JSON file you did not intend to ship.
  > A previous engagement shipped internal cost and effort fields in a public JavaScript bundle. Do not repeat that here — check what actually reaches the browser before launch.
- Contact form: honeypot, rate limiting, no reflected input.
- A live domain is an operational asset. Monitor it. Domains left unattended get compromised and serve spam.

## Post-deploy checks

- [ ] All routes render on the real domain
- [ ] Canonicals and sitemap use the production URL
- [ ] OG images generate on every route type
- [ ] Contact form behaves as configured — test the actual path, including the failure path
- [ ] Lighthouse pass on homepage, one case study, one process page
- [ ] No console errors in production
- [ ] `robots.txt` correct in production and blocking in preview
