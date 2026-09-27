# Portfolio Vercel cutover

The `portfolio` project under the `eli-schifflers-projects` Vercel team is
connected to `elischiffler/Portfolio`. Its production branch is `main`, its
framework preset is Vite, its install command is `npm ci`, its build command
is `npm run build`, and its output directory is `dist`.

## Before changing DNS

1. Ensure the intended commit has passed the repository checks and has been
   merged to `main` with user approval. Confirm the Vercel production deployment
   for that exact commit is `READY`.
2. Test the Vercel deployment URL, including the home page, resume PDF, images,
   and audio. Check browser console and mobile layout.
3. Add `elischiffler.dev` and `www.elischiffler.dev` to the Vercel project.
   Use `vercel domains inspect` to record the exact required DNS targets.
4. Record the current GoDaddy apex A records and `www` CNAME. Keep unrelated
   records, especially mail and verification records, unchanged.

## DNS switch

At GoDaddy, change only the apex A records and `www` CNAME to the values shown
for the Vercel project. Do not change the domain's nameservers. Confirm both
hostnames resolve to the intended targets, TLS certificates are active, and
the site works at both names. Keep GitHub Pages available until verification
is complete.

## Recovery

If the Vercel domain fails, restore the recorded GitHub Pages apex A records
and `www` CNAME, then verify DNS and HTTPS again. The old Pages workflow should
only be retired in a later PR after the new domain has remained healthy.

## Local checks

```sh
npm ci
npm run lint
npm run build
```
