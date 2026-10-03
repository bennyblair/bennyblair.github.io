# Property content programme — operating runbook

## Focused growth programme (27 September 2026)

Daniel authorised the Emet Capital focused SEO growth programme. The primary outcome is qualified Australian enquiries for business-purpose finance secured by property. Work is balanced across bridging, equity release, purchases and refinancing. Existing pages, site defects and the enquiry path receive about 80% of attention; new content receives about 20%.

OpenSEO project f8f8b5cd-f435-4bd0-9bd4-5b9b08a8bc34 is the current research context. Use Australia (2036), English, final Search Console windows and verified GA4 outcomes. A GSC average position is not a live ranking. Historical Semrush or Ahrefs exports are dated inputs, not current evidence. If OpenSEO is unavailable, continue from validated local sources and report the material gap.

Prioritise a small queue by business fit, observed Australian demand, distinct intent, available evidence, attainable search results and conversion benefit. Current investigation candidates are the short-term property loans guide, the secured versus unsecured business loans guide and the bridging lender comparison guide. Investigate before editing; preserve successful pages. Verify reported legacy 404s and redirect only where a true equivalent destination exists.

Prepare up to two useful existing-page improvements each weekday, enforced across both release windows by shared atomic reservations. Up to two new articles may be released weekly, only for distinct gaps. Keep three genuinely eligible reviewed drafts in reserve. These are bounds and aims, not forced production quotas. A day with no safe, useful candidate is healthy_noop; two consecutive working days without an eligible package require a diagnosis and a new selection strategy.

## Owners and daily sequence

- 05:00–06:00 Sydney: OpenClaw source collection and receipt reconciliation.
- 07:00 weekdays: Codex is the sole research and editorial preparation owner. It writes exact-source packages and OpenSEO observation snapshots to the shared workspace. Claim the URL before editing. The overlapping OpenClaw preparation job is disabled only after a successful handover.
- 08:00 and 13:00 weekdays: independent OpenClaw reviewer checks the actual package and source hash. An automated review is never professional financial sign-off.
- 10:00 Monday/Friday: OpenClaw sole publisher may release one eligible new article. The 09:00 and 14:00 weekday repair lane releases reviewed packages serially. Both share the existing deployment lock and stop after failed or uncertain live verification.
- 17:15 daily: reporting collector composes a report from verified receipts and fresh data.
- 18:00 daily: one Telegram SEO message, approximately 150–200 words, linking the private OpenSEO report. Friday's weekly analysis is in that message. Other routine SEO notices are suppressed; only a site outage, broken enquiry path or failed release can alert immediately.

Codex prepares in a clean worktree and hands off to the existing review/publishing contract. A claim-safe exact mechanical change can be investigated on a page held for a separate financial rewrite. The exact before/after transformation must pass the trusted repair manifest validator; an R0 label is never treated as broad permission. Active protection and indexability holds remain binding. Use the explicitly authorized `general-information-v1` substantive path for useful whole-page general-information rewrites, metadata, images and links, including historical R0/high-risk pages. Remove unsupported rates, promises, eligibility assertions and legal or tax conclusions. Recheck the complete page; select another topic if it cannot be handled appropriately. Never request routine approval or relabel a body rewrite as mechanical.

OpenSEO paid research uses the existing included balance only: 8,000 routine credits per billing cycle, 2,000 reserved. Category ceilings are 3,000 keyword/SERP, 1,500 rank, 2,000 competitor/backlink, 500 local and 1,000 investigation. Use scripts/openseo_budget.py against the shared seo/control-plane.sqlite before each paid request, reserve by idempotency key, then settle the actual balance. A rising balance halts paid research until the new billing cycle is verified. The rank tracker is manual, 30 Australian mobile terms at depth 40, with a 300-credit per-run ceiling. Reuse research within 30 days unless the current decision requires fresh data. Never buy credits, links or send outreach.

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
npm run content:programme -- next --purpose review --limit 10
npm run content:programme -- next --purpose repair --limit 3
npm run content:programme -- next --purpose verify --limit 10
npm run content:programme -- record-release --receipt ../reports/content-programme/RELEASE.json
npm run content:programme -- report --output ../reports/content-programme/weekly-progress.json
```

`next` defaults to `--purpose review` and returns only queued routes, preserving inventory priority order. Completed reader reviews therefore leave the daily review queue. `--purpose repair` returns reviewed routes with a repair or rewrite decision; `--purpose verify` returns reviewed retain decisions awaiting completion evidence. Held, draft-ready and verified routes are excluded from these selections. Consolidation investigations follow their existing review path. Selecting work never grants release approval.

A rescan requeues a changed source and invalidates its previous completion, including a previously verified page. An unresolved held page stays held after a source edit: preserve its decision, original review time, reviewer, reason and evidence until an explicit evidence-backed review resolves the hold. `reviewedSourceHash` identifies the bytes covered by that earlier review; it may differ from the current `sourceHash` while a hold remains unresolved. A permitted heading cleanup cannot erase a financial-review hold.

Select the latest complete, valid GSC report by its actual observation window, not filesystem modification time. The May Semrush pack is historical Australian research, not a current ranking or traffic forecast. Verify present search results and source facts for new briefs.

Record every completed reader review using `record-review`, with `--path`, `--decision`, `--stage`, `--reviewer`, `--note` and an existing `--evidence` file. Decisions: retain, repair, rewrite, investigate_consolidation. Stages: reviewed, draft_ready, held, verified. A verified receipt must name the exact URL/current source hash, checked time, passed checks and passed live rendering. Record an automated review as automated. Never manufacture approval, sources, review dates, settlement outcomes or receipts.

## Shared worker leases

Run from the OpenClaw workspace (the SQLite file is shared by host and container):

```sh
python3 -m seo.content_coordinator claim --owner RUN_ID --path /resources/guides/SLUG
python3 -m seo.content_coordinator publish --lane repair --owner RUN_ID --sha EXPECTED_RELEASE_SHA --path /resources/guides/SLUG
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
6. Obtain an independent eight-dimension editorial review, revise blockers, and require the existing quality threshold. Classify risk from actual content. Broad financial subject matter does not by itself authorize a high-to-low reclassification; document the absence/presence of legal interpretation, personal advice, current terms, numeric eligibility claims and unsupported promises. Rewrite or remove substantive unsupported claims before independent review; if that cannot produce an appropriate general-information article, choose another topic without requesting approval.
7. Prepare a draft release package with source hash, claim brief, independent review, owned query/service, intended release date and actual risk. Keep three eligible reviewed packages in reserve when distinct demand supports them; balance opportunities across purchases/refinancing and bridging/equity release. Existing-page improvements do not count as new articles.

## Publication

New articles: exactly one new article, one matching WebP, one approved policy-linked proposal, one new registry record and deterministic programme-index timestamp only. Branch `ai/daily-content-YYYY-MM-DD`; preserve the existing five-file contract and policy checks. Select only a due, distinct, eligible low-risk article. Never publish a future-dated package early or catch up missed slots in a bulk release.

Repairs: branch `ai/content-repair-<batch>` with one exact manifest; 1–2 URLs for substantive edits, up to 20 for one fixed mechanical transform. Historical high-risk/R0 pages may use `reviewMode: general-information-v1` with independent exact-source whole-page review and checked source-to-claim evidence. Body rewrites, metadata, images and links are allowed. Unsupported claims must be corrected; no human/professional approval is asserted. Active protection holds remain enforced. Routing and service components retain their tested technical-change path.

The initial site/programme implementation is explicitly user-authorized. Record its actual automated editorial and technical review; preserve any outstanding human financial-review status. Do not pretend that generic permission is a professional financial review.

Run article QA, scope checks, repository CI and the affected browser checks before release. Push with git and use the existing GitHub PR client. Apply automated-release labels only when OpenClaw has selected the batch, preventing draft work from becoming another publisher. Require checks for the exact current PR revision, rebase after preceding releases, merge serially, and verify the exact deployed revision plus changed pages. Keep deterministic rollback limited to proven deployed defects; absent or delayed deployment is indeterminate, not permission to revert.

## Measurements and reporting

The weekly report includes publication/repair/review counts, unresolved holds, valid Australian GSC comparisons, relevant service traffic and available private lead outcomes. Show enquiry acceptance separately from qualified lead, lender submission and settlement. Phone/email clicks do not prove enquiries. Do not send names, contact details, amounts, security details, query strings or arbitrary URL paths to GA4.

Record each exact deployment once with `record-release`; include kind `new`, `substantive`, `mechanical` or `infrastructure` in its receipt. Weekly counts use verified release URLs, not draft output. Release credit is scoped to the receipt: a mechanical heading repair counts as one mechanical repair, without changing the page review stage, satisfying a substantive repair, or completing its outstanding financial review. Portfolio completion still requires the separate exact-source review and verification decision. The command persists due dates; the daily editor checks `performanceReviewsDue` and records source-backed observations using `record-performance-review --evidence OBSERVATION.json`. The observation names releaseSha, days28/56/90, checkedAt, evidenceStatusavailable/unavailable, note and an existing reportPath; due observations are never silently cleared. Review materially changed cohorts at 28, 56 and 90 days after actual deployment. Preserve observations between reviews; do not repeatedly refresh successful content or reset publication dates for freshness. Notify the user about meaningful completed work, actual failures or required exceptions; avoid repeated unchanged alerts. Use the configured reporting delivery only; no unsolicited external email or outreach.

Completion: all registered routes reviewed; every agreed repair has a passed exact-source and live verification receipt, or a documented retain decision with equivalent review. Outstanding holds remain unfinished and visible.
