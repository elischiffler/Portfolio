# Local Portfolio container

Run commands from the repository root with Docker running Linux containers and
Docker Compose available. Use Node 24 and npm for checks outside Docker. Local
preview is the only deployment configured by this change.

Set the image revision to the current commit before using Compose. In PowerShell:

```powershell
$env:PORTFOLIO_REVISION = git rev-parse HEAD
```

In a POSIX shell:

```sh
export PORTFOLIO_REVISION="$(git rev-parse HEAD)"
```

Do not label uncommitted source as a production release. During development, record
that the working tree is dirty; final acceptance must identify the tested commit
and image. The image's OCI source and revision labels link it to this repository.

## Lifecycle

```sh
docker compose build
docker compose up -d --wait --wait-timeout 60
docker compose ps
docker compose logs --tail 100 portfolio-web
docker compose restart portfolio-web
docker compose stop
docker compose start --wait --wait-timeout 60
docker compose down
```

The preview is at `http://127.0.0.1:8080`. Its explicit health endpoint is
`/healthz`. The service name is `portfolio-web`, internal port 8080. It binds only
to loopback on the host. Do not bind it publicly as a substitute for a production
proxy. No persistent data volume is needed; all published assets belong to the
image. Stop/removal commands apply only to this Compose project.

If port 8080 is occupied, set `PORTFOLIO_PORT` to an available port in the same
shell (`$env:PORTFOLIO_PORT = '8081'` in PowerShell or
`export PORTFOLIO_PORT=8081` in a POSIX shell), then start Compose. The binding
remains loopback-only. Keep the same revision/port variables for lifecycle commands.

Acceptance deadlines selected before validation: startup and restart recovery
60 seconds, individual HTTP request 10 seconds, graceful shutdown 10 seconds.
Desktop review uses 1440 by 900 pixels and mobile review uses 390 by 844 pixels.

## Local and CI checks

From the repository root after `npm ci`:

The hook regression tests also require Git and `sh` on PATH (Git for Windows
provides the shell on Windows).

```sh
npm run format:check
npm run lint
npm run build
npm run test:hook
```

After the production container is healthy, run `npm run test:smoke`. It uses
`http://127.0.0.1:8080` by default; set `PORTFOLIO_BASE_URL` when using another
local preview port. The suite validates the real HTTP server, including MIME,
cache/security headers, SPA fallback versus asset 404s, PDF, and audio byte ranges.
The hook regression checks verify both failure paths without changing the index
or unrelated working files. No additional browser-test dependency is introduced;
perform the desktop/mobile interaction checks in the validation record manually.

The `Validate Portfolio` workflow runs the `quality-and-container` job on pull
requests and main, with read-only repository permissions and no publishing step.
It runs these commands, builds the production image, starts Compose, and runs the
HTTP suite. Workflow files do not prove branch-protection enforcement; inspect
remote settings separately. There is no TypeScript checker in this JavaScript app.

## Serving and runtime contract

The multi-stage image builds from the npm lockfile with Husky hooks disabled, then
copies only the production output into the static runtime. The static server runs
as a nonroot user with a read-only root filesystem and explicit temporary writable
paths. No Python runtime, resume tooling, private environment files, or database
credentials belong in this image.

Compose initially limits the static runtime to 128 MiB memory, 0.5 CPU, and 64
processes. `/tmp` is a 16 MiB tmpfs for server state. Log rotation retains at most
three 10 MiB files. These are runtime limits, not limits for the Node builder,
which preserves the 4 GiB JavaScript heap setting. The project is `portfolio-local`;
it owns its own default network and no persistent volumes. See measured usage in
the validation record before treating these initial values as sufficient capacity.

HTML revalidates; fingerprinted Vite assets use long-lived immutable caching.
Unversioned public media and the resume must not be cached immutable indefinitely.
They use five-minute caching with revalidation after expiration.
SPA navigations fall back to HTML, but nonexistent asset requests return 404.
Audio supports byte ranges, the resume is served as PDF, and `/healthz` is an
explicit response independent of fallback. TLS belongs to the future shared proxy;
this local HTTP preview does not send HSTS or introduce an untested restrictive CSP.

## Production and recovery boundary

Merging this change retires the Pages publishing workflow and freezes further
updates to the currently published site. It does not unpublish Pages, change DNS,
or remove `CNAME`. No cloud server, registry publishing, or Docker production
deployment is configured. Existing hosting remains until an approved cutover.

A later enabling PR must select the host, registry access, proxy/network ownership,
and credentials; validate required checks on the actual merged main commit; deploy
the tested immutable image; serialize deployment and prevent stale releases; and
verify health. User-approved merges then authorize the configured pipeline without
another routine deployment approval. Never deploy by mutable `latest` identity.

Record the current and previous image digests and preserve release/proxy
configuration off-host. This static site has no runtime database or uploads to
back up. Image rollback must select the recorded previous digest and pass health
and browser smoke checks. DNS rollback has propagation delays and does not happen
automatically with image rollback. Verify HTTPS and the replacement endpoint before
an explicitly approved DNS cutover, retain Pages through propagation and an
observation window, then retire Pages hosting separately.

Missing production inputs do not prevent local validation; missing container or
browser evidence does. See [validation](validation.md) for exact results.
