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
4. Record the current GoDaddy apex A records and `www` CNAME. As checked on
   September 26, 2026, the apex uses GitHub Pages addresses `185.199.108.153`
   through `185.199.111.153`, and `www` points to
   `elischiffler.github.io`. Keep unrelated records, especially mail and
   verification records, unchanged.

## DNS switch

At GoDaddy, change only the apex A records and `www` record to the values shown
for the Vercel project. On September 26, 2026, Vercel recommended
`A elischiffler.dev 76.76.21.21` and `A www.elischiffler.dev 76.76.21.21`;
inspect again immediately before cutover. Do not change the domain's
nameservers. Confirm both
hostnames resolve to the intended targets, TLS certificates are active, and
the site works at both names. The last published GitHub Pages site remains
available as a rollback target until Pages hosting is disabled separately.

## Recovery

If the Vercel domain fails, restore the recorded GitHub Pages apex A records
and `www` CNAME, then verify DNS and HTTPS again. This restores the last
published Pages version. To publish newer content to Pages again, restore the
Pages deployment workflow in a separate PR.

## Local checks

```sh
npm ci
npm run lint
npm run build
```
