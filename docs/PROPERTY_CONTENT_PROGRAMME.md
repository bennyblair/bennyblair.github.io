# Property content programme — operating runbook

Authorized by Daniel's explicit “PLEASE IMPLEMENT THIS PLAN” instruction in Codex on 6 September 2026. This programme updates the earlier two-per-week cadence and authorizes routine editorial repairs. It does not claim that an automated editor is a human financial reviewer.

## Scope and targets

Business-purpose finance secured by residential or commercial property in Australia. Cover purchases, refinancing, bridging and business equity release. No personal/home-loan purpose, new city-page batches, fabricated transactions, invented credentials, guaranteed terms or outreach sending. Retain existing aggregate company claims as instructed.

Targets: three new articles a week; fifteen substantive existing-page improvements a week; fifty existing-page reviews a week. Fifty is the starting weekly review target. Five hundred routes over eight weeks requires an average of63reviews/week; add13redirect/excluded or other bounded reviews each week (or equivalent front-loaded review work) and show any pace deficit rather than promising500from400reviews. Review the full registered portfolio over eight weeks and continue unresolved repairs thereafter. A retained page requires a real reader/render review. Automated inventory is triage, not completed review.

## Owners and schedules

Codex is the primary editor and reviewer coordinator. A weekday 07:00 Sydney heartbeat in the current task prepares work: review ten queued routes; prepare three meaningful repairs where evidence permits; research/draft a new article only when the approved reserve has fewer than six items. Do not force a rewrite or invent an article to satisfy a target.

OpenClaw remains the single publication coordinator. New articles release individually Monday/Wednesday/Friday at 10:00 Sydney. A weekday 11:00 repair release job drains at most three verified repair proposals, one at a time. New articles and repairs have independent allowances, but share one merge/deployment lock. Wait for exact deployed-revision and URL verification before releasing another batch. Stop both queues on failed or indeterminate production audit.

The GitHub manual daily-publication workflow is validation-only, not another scheduler. Legacy page-upgrade and research jobs are draft-only and cannot push main, publish content, or inject unreviewed production items.

## Canonical inputs and state

- `data/seo-page-registry.json`: authoritative route, search-owner, risk and lifecycle records.
- `data/seo-content-programme.json`: scope, targets, priority routes and candidate topics.
- `data/seo-content-automation-policy.json` plus immutable history: new-article release rules.
- `data/seo-content-repair-policy.json` and `data/seo-repairs/README.md`: narrowly permitted repair rules.
- Workspace `seo/content-programme.json`: derived inventory, review decisions, evidence and progress. Preserve prior history and rescan when sources change.
- Workspace `seo/content-programme-drafts/`: unpublished new article packages, source briefs and independent reviews. Package paths are not live URLs.
- Existing control-plane GSC reports and execution receipts: observation and deployment evidence. Keep missing GA4/CRM outcomes unavailable, not zero.

Run from the website checkout:

```sh
npm run content:programme -- scan --gsc ../reports/seo-control-plane/gsc-segmented-YYYY-MM-DD.json
npm run content:programme -- next --limit 10
npm run content:programme -- record-release --receipt ../reports/content-programme/RELEASE.json
npm run content:programme -- report --output ../reports/content-programme/weekly-progress.json
```

Select the latest complete, valid GSC report by its actual observation window, not filesystem modification time. The May Semrush pack is historical Australian research, not a current ranking or traffic forecast. Verify present search results and source facts for new briefs.

Record every completed reader review using `record-review`, with `--path`, `--decision`, `--stage`, `--reviewer`, `--note` and an existing `--evidence` file. Decisions: retain, repair, rewrite, investigate_consolidation. Stages: reviewed, draft_ready, held, verified. A verified receipt must name the exact URL/current source hash, checked time, passed checks and passed live rendering. Record an automated review as automated. Never manufacture approval, sources, review dates, settlement outcomes or receipts.

## Shared worker leases

Run from the OpenClaw workspace (the SQLite file is shared by host and container):

```sh
python3 -m seo.content_coordinator claim --owner RUN_ID --path /resources/guides/SLUG
python3 -m seo.content_coordinator publish --owner RUN_ID --sha EXPECTED_RELEASE_SHA --path /resources/guides/SLUG
python3 -m seo.content_coordinator finish --owner RUN_ID --receipt reports/RECEIPT.json
python3 -m seo.content_coordinator release --owner RUN_ID --path /resources/guides/SLUG
```

Claim before editing. Release URL ownership when the reviewed draft is handed off; the publisher claims it again after validating current hashes. A production lease spans merge and deployment. For a GitHub squash merge, call `bind-deployment` with the observed merged-PR receipt before `finish` or `fail`; `seo/README.md` defines the exact fields. Preserve the original planned head, actual merge SHA, URL set and observation timestamps. `fail --note` blocks both publication lanes. `recover --receipt --note` requires a fresh passed exact-revision/live-URL receipt. Stale leases are never silently expired or stolen; inspect their owner and actual process before an explicit recovery. A receipt contains status `passed`, equal40-character expectedSha/deployedSha, current checkedAt, liveRender `passed` and the verified full URLs. Programme release receipts additionally carry one `pages` item per URL: path, current sourceHash, deployedSha and passed live_render/http_status/canonical/robots/content checks. Source bytes are rehashed when recording credit. These locks coordinate workers; existing CI and protection gates still enforce publication eligibility.

## Daily editorial work

1. Read current instructions and this runbook; attempt qmd once and use canonical files if unavailable. Check git cleanliness without resetting unrelated work. Fetch current main and work in an isolated branch/worktree.
2. Review the first priority URLs, then relevant property-transaction pages by evidence. Check actual `protectedUntil`; scheduled `reviewAt` is a performance review date and is not a publication hold.
3. Audit rendered titles/descriptions, one page H1, purpose, evidence, internal links, image, author and CTA. A missing explicit metadata field may have a valid rendered fallback.
4. Repair useful existing text. Keep dates and URLs unless a real content/review event supports a change. Consolidation, noindex and removal require complete intent and performance evidence plus their existing review path; low traffic alone is insufficient.
5. For each new article, prove a distinct reader decision, compare the full existing corpus and current search results, collect primary sources with claim mapping, and draft the shortest complete answer. Link to its service and genuinely relevant guides. Use canonical Ben/Daniel author data and an article-specific 1200x630 WebP under 250 KB.
6. Obtain an independent eight-dimension editorial review, revise blockers, and require the existing quality threshold. Classify risk from actual content. Broad financial subject matter does not by itself authorize a high-to-low reclassification; document the absence/presence of legal interpretation, personal advice, current terms, numeric eligibility claims and unsupported promises. Hold genuinely high-risk new content for the required review.
7. Prepare a draft release package with source hash, claim brief, independent review, owned query/service, intended release date and actual risk. Keep a six-brief reserve. Across four weeks target six purchase/refinance and six bridging/equity releases. Existing-page improvements do not count as new articles.

## Publication

New articles: exactly one new article, one matching WebP, one approved policy-linked proposal, one new registry record and deterministic programme-index timestamp only. Branch `ai/daily-content-YYYY-MM-DD`; preserve the existing five-file contract and policy checks. Select only a due, distinct, eligible low-risk article. Never publish a future-dated package early or catch up missed slots in a bulk release.

Repairs: branch `ai/content-repair-<batch>` with one exact manifest; 1–2 URLs for substantive edits, up to 20 for one fixed mechanical transform. High-risk pages can receive only permitted exact nonfinancial mechanical changes without renewed financial sign-off. Active protection holds remain enforced. Source/risk/reviewer changes, financial rewrites, service components and routing go through the separately authorized reviewed-change path, not a widened automatic exception.

The initial site/programme implementation is explicitly user-authorized. Record its actual automated editorial and technical review; preserve any outstanding human financial-review status. Do not pretend that generic permission is a professional financial review.

Run article QA, scope checks, repository CI and the affected browser checks before release. Push with git and use the existing GitHub PR client. Apply automated-release labels only when OpenClaw has selected the batch, preventing draft work from becoming another publisher. Require checks for the exact current PR revision, rebase after preceding releases, merge serially, and verify the exact deployed revision plus changed pages. Keep deterministic rollback limited to proven deployed defects; absent or delayed deployment is indeterminate, not permission to revert.

## Measurements and reporting

The weekly report includes publication/repair/review counts, unresolved holds, valid Australian GSC comparisons, relevant service traffic and available private lead outcomes. Show enquiry acceptance separately from qualified lead, lender submission and settlement. Phone/email clicks do not prove enquiries. Do not send names, contact details, amounts, security details, query strings or arbitrary URL paths to GA4.

Record each exact deployment once with `record-release`; include kind `new`, `substantive`, `mechanical` or `infrastructure` in its receipt. Weekly counts use verified release URLs, not draft output. The command persists due dates; the daily editor checks `performanceReviewsDue` and records source-backed observations using `record-performance-review --evidence OBSERVATION.json`. The observation names releaseSha, days28/56/90, checkedAt, evidenceStatusavailable/unavailable, note and an existing reportPath; due observations are never silently cleared. Review materially changed cohorts at 28, 56 and 90 days after actual deployment. Preserve observations between reviews; do not repeatedly refresh successful content or reset publication dates for freshness. Notify the user about meaningful completed work, actual failures or required exceptions; avoid repeated unchanged alerts. Use the configured reporting delivery only; no unsolicited external email or outreach.

Completion: all registered routes reviewed; every agreed repair has a passed exact-source and live verification receipt, or a documented retain decision with equivalent review. Outstanding holds remain unfinished and visible.
