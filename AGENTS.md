# Agent notes

## Sitemap lastmod

Sitemap `<lastmod>` comes from git history (`scripts/generate-site-files.ts` via `scripts/lib/sitemap-lastmod.mjs`). It must change only on real content edits. Never use build time or checkout mtime when git history exists.

Skip a commit for lastmod when any of these is true:

- its SHA is listed in `data/sitemap-lastmod-policy.json` `ignoreCommits`;
- the commit message has the trailer `Sitemap-Lastmod: skip`;
- it touches more than 25 files under `src/content/` or `src/pages/` and the trailer is not `Sitemap-Lastmod: material`.

If every commit that touches a file is skipped, lastmod is that file's oldest commit date (creation).

### Writer and publisher process

Add `Sitemap-Lastmod: skip` to the squash-merge commit message (and to the end of the PR body) for link-only, mechanical, redirect and noindex PRs, including site clean-up PR-2 to PR-7. Real content rewrites carry no trailer, or `Sitemap-Lastmod: material` when the PR is large enough to hit the 25-file bulk threshold but the edits are substantive.

The auto-merge workflow (`.github/workflows/auto-merge-bot-prs.yml`) squash-merges with `commit_title` set to the PR title and does not pass `commit_message`. GitHub may therefore omit the PR body from the squash commit, which would drop trailers. Do not rely on the trailer surviving auto-merge. After those merges, add the squash SHA to `ignoreCommits` in a follow-up if lastmod would otherwise bump.
