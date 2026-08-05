# SEO and AI visibility measurement runbook

## Purpose

Measure whether the August 2026 changes produce qualified organic demand, not merely more indexed pages. The immutable baseline and target registry is `data/seo-outstanding-program.json`.

## Primary scorecard

1. **Qualified organic leads:** GA4 `generate_lead` events from Organic Search sessions. Exclude test, spam, duplicate and non-finance contacts during CRM reconciliation.
2. **Non-brand organic clicks:** GSC Web clicks excluding queries containing `emet`, `emet capital`, obvious brand misspellings or staff names.
3. **Target queries in the top 20:** count registered target queries whose comparable-window average position is 20 or better.

Report impressions, CTR and average position as diagnostic drivers. Never use sitewide average position as the primary success metric; query mix can move it without a ranking change.

## Comparable reviews

- Day 28 performance window ends 2 September 2026; automated collection runs 4 September to allow for normal source latency. Compare the first 28 complete post-release days with the preceding 28 complete days. Add year-over-year context if GSC has a comparable window.
- Day 56 performance window ends 30 September 2026; automated collection runs 2 October. Compare days 29–56 with days 1–28 and the pre-release baseline.
- Segment every GSC result by page, query, device, country and brand/non-brand. Preserve zero-impression rows for registered pages so missing visibility is explicit.
- Annotate release dates, material site changes and known demand shocks. Do not credit the release based on raw before/after movement alone.

## AI referral measurement

The site emits one `ai_referral_landing` event on a genuine landing from a recognised AI referrer or explicit AI campaign parameter. Register these event-scoped custom dimensions in GA4:

- `ai_source`
- `landing_path`
- `detection_method`

Build a GA4 exploration with rows for source and landing path, and metrics for landings, engaged sessions and qualified leads. The event deliberately excludes prompt text, full referrer URLs and personal data.

## AI citation observation

Use the immutable prompts in `data/ai-citation-prompt-set.json` and validate observations against `data/ai-citation-result.schema.json`. Record engine, prompt ID, run date, brand mention, linked citation, cited URL and answer accuracy. A plain brand mention is not a citation.

Run one stable monthly sample on the same engines and logged-out/logged-in condition. AI answers are non-deterministic, so report coverage as an observed sample, not a population estimate. Store evidence only where the engine terms and access controls allow it.

## Indexing-recovery guardrail

`npm run qa:protected-cohort` blocks edits to the 97-page OpenClaw recovery cohort until each route's review date. At the scheduled review, inspect page indexing, canonical selection, impressions and clicks before deciding to keep, revert or amend the remediation. Do not “freshen” those pages merely because 28 days have elapsed.

## Decision rules

- **Keep:** rankings/visibility improve or stay stable and qualified organic leads do not deteriorate.
- **Iterate:** impressions rise but CTR remains weak; test the title/description only when the query-page match is sound.
- **Reassess ownership:** supporting guides receive impressions while the designated service page remains absent for commercial queries.
- **Rollback/investigate:** a page or cluster loses qualified organic traffic or ranking coverage across two comparable reviews and no external demand shift explains it.
- **No conclusion:** sample is too small, tracking is incomplete, or a material confounder is present. State that explicitly.
