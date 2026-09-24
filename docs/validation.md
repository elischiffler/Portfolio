# Portfolio pilot validation

Status: local acceptance passed on 2026-09-24. This is the pre-PR evidence snapshot.
Current remote CI and final committed image identity are recorded in the PR
handoff. No pending remote check is represented as passing here.

## Preflight

- Base commit: `697aba77dcfb8821daaa3b189b6a34a9b6ff6973` (fresh origin/main).
- Task branch: `chore/portfolio-docker-pilot`; original checkout preserved.
- Windows host; Docker Linux client/server 29.5.3, Compose 5.1.4.
- Docker allocation: 16 CPUs, 8,247,738,368 bytes (about 7.68 GiB); host Node 24.16.0.
- Pages API: built, custom domain configured, HTTPS enforced. No hosting/DNS mutations.
- Public assets: 51 files, 77,420,045 bytes before implementation.
- Deadlines selected before testing: startup/recovery 60 s, HTTP 10 s, stop 10 s.
- Viewports: desktop 1440x900; mobile 390x844.

## Gate evidence

Commands run from the repository root. HTTP checks use the actual Compose image;
browser checks use in-app Chromium. API/Auth/database/upload integration criteria
are not applicable to this static site. Google Fonts is the existing external
stylesheet provider. No production application API was invoked.

| Gate  | Status  | Evidence or remaining work                                                                                                                                                                                                            |
| ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1-S2 | PASS    | npm ci, format:check, lint, build, test:hook and real-image test:smoke pass. Two hook and seven HTTP tests pass. Docker independently installs from the lockfile.                                                                     |
| S3-S4 | PASS    | Stop 0.47 s; start-to-healthy 5.79 s. Inspect/exec verifies uid 101, read-only root, loopback binding, dropped capabilities, no-new-privileges, resource/log limits, and absence of Node/npm/Git/Python or development app directory. |
| S5-S6 | PASS    | Browser journeys have no unexplained console errors or failed local requests. Context is allowlisted; no runtime secrets are required. Existing public project demo-login text is unchanged, not a server credential.                 |
| S7    | BLOCKED | Current PR CI pending at this snapshot. Workflow runs PR/main quality and actual-image HTTP checks. GitHub API reports main is not protected; enforcement is optional, not a passing control.                                         |
| S8    | PASS    | Compose build/up/ps/logs/stop/start exercised; recreation preserves intended static content. No persistent volume exists.                                                                                                             |
| P1    | PASS    | test:hook induces separate lint/format failures and verifies fixture, tracked source, and index remain unchanged. Valid source passes normal checks.                                                                                  |
| P2    | PASS    | Diff removes publishing, grants contents:read only, and retains CNAME. Pages API still reports built/HTTPS. No hosting/DNS mutations.                                                                                                 |
| P3    | PASS    | test:smoke checks health, UTF-8 root/fallback, JS/CSS, static-prefix/extension 404s, cache/security headers, PDF signature, audio 206, and image MIME.                                                                                |
| P4    | PASS    | Desktop/mobile navigation, carousel, work/project lightboxes, photos, resume, music, and sandbox inspected. Export PNG verified 3168x792; initial transfer measured below.                                                            |
| P5    | BLOCKED | Local runtime checks pass; current remote CI remains required before the pilot passes.                                                                                                                                                |

The pre-commit local image ID is
`sha256:c5ffc8fad827cb1e41c7a98c093591bb8acddbe7fb821d3e2660ea5796dbf55e`.
Its OCI revision names the base commit because this snapshot precedes the
implementation commit. It is not a published release. Rebuild after committing
and record the final commit/image in the PR; never promote the development tag.

## Browser regression procedure

At both viewports, use Home, Work, Projects, and About sidebar buttons. Open
work/project image viewers, advance an image, and close. On desktop drag the
horizontal project lane and About photo stack; on mobile verify a vertical
project stack. Play/pause music after a user gesture: the timer advanced to 0:05
on desktop and 0:08 on mobile. All three waveform durations loaded. Click Resume
and verify its PDF through the HTTP test.

Visit `/?sandbox=linkedin-header`, then click Download Header. The existing font
link caused html-to-image to log CSSOM SecurityErrors, reproduced with unchanged
application code served by Vite preview on port 4173 as well as Docker. Both
produced downloads, so this was a pre-existing console error, not a Docker
serving failure. Adding `crossorigin="anonymous"` permits CORS-authorized
stylesheet access. A fresh browser session now has no errors and exports the
same 910,437-byte, 3168x792 PNG. Repeat this manual regression check when changing
fonts/export behavior. The in-app download-event listener timed out despite a
saved file; actual file timestamp and PNG header supplied the export evidence.

JavaScript and CSS stayed byte-identical to the baseline production build; only
the document's font-loading attribute changed. SHA-256:

- JS: `fa1c6cbf9cafe8003e2673502ca292e8b2fecb98f80313a2be6fe939c4a79a09`.
- CSS: `1a9fec6b7d7df27fb9e5ee6e491a76bb8990afa469adaaa3b0e0dbb30144aee8`.

## Measurements and separate performance scope

The image is about 97.4 MiB. One idle sample showed 4.93 MiB, 0.00% CPU, and three
PIDs. These are local observations, not load-test or production capacity claims.
Initial limits of 128 MiB/0.5 CPU sufficed for the individual pilot checks.

A fresh `http://localhost:8080/` origin at 1440x900 generated 38 successful local
responses totaling 49,189,416 body bytes (about 46.9 MiB) before navigation.
Measured from nginx access logs between 16:34:58Z and 16:35:23Z on 2026-09-24,
excluding health probes, HTTP/TLS overhead, and external Google Fonts traffic.
This is server-observed body transfer, not a complete browser wire total.
Three About Me PNGs alone total 34,717,030 bytes; waveform audio loads on mount.

A separate performance PR should evaluate responsive image formats/sizes and
deferred offscreen photo/audio loading, measuring the same initial-load scenario
and preserving appearance/playback. This PR does not recompress media, remove
assets, or redesign the UI.

Combined rehearsal and production cutover are later gates. No subsequent
application implementation starts until the Portfolio pilot passes. The PR
handoff supplies final committed image identity and current CI for this snapshot.
