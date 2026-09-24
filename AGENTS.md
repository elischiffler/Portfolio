# Portfolio development

This is a static React/Vite JavaScript site. Preserve the design, content, media,
section navigation, and LinkedIn header sandbox unless the task changes them.
Python resume scripts are development tooling; `scripts/master_resume.py` owns
resume content. The website needs no database or runtime application secrets.

Use Node 24 and npm from the repository root. Install with `npm ci`. Run
`npm run format:check`, `npm run lint`, and `npm run build`, plus the focused
container checks documented in the [runbook](docs/container-runbook.md).
No TypeScript migration is needed for this JavaScript project. Format intended
files explicitly; never reformat unrelated work as a side effect of a commit.

Use isolated task branches/worktrees. Inspect the diff, commit, push, and open a
PR for agreed implementation work. The user owns merges; never enable auto-merge
or push directly to main. Use a draft PR if meaningful validation is blocked.

The Pages publishing workflow is retired by this change, but the existing Pages
site remains online until a separately approved cutover. Docker production
deployment, host/proxy selection, and DNS changes are not configured here.
See the runbook for release/recovery requirements and the
[validation record](docs/validation.md) for evidence and limitations.
