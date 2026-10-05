# SEO and AI visibility measurement runbook

## Purpose

Measure whether the August 2026 changes produce qualified organic demand, not merely more indexed pages. The immutable baseline and target registry is `data/seo-outstanding-program.json`.

## Primary scorecard

1. **Accepted organic enquiries:** GA4 `generate_lead` events emitted after backend acceptance from Organic Search sessions. Qualification requires actual CRM evidence; when unavailable, qualified enquiries remain unknown. Clicks are interactions, never accepted enquiries.
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

`generate_lead` also carries `ai_source`, `ai_landing_path`, `ai_detection_method` and `ai_attribution_scope`. Both registered Netlify forms persist matching allowlisted fields. `session` identifies AI detected in this browser session; `return_visit` means a prior AI touch within 30 days, not a new AI referral or proven causal attribution. `not_detected` is unknown attribution, not proof that AI had no influence. No prompt text, full query/referrer URL, visitor identifier or personal form data is stored in these attribution fields. Persistent AI-touch storage expires after 30 days; blocked storage never prevents an enquiry.

GA4 key-event registration began on 3 October 2026; historical key-event zeros must not be treated as absence of enquiries. Count backend-accepted enquiries once and keep qualified enquiries and settlements separate.

Build a GA4 exploration with rows for source and landing path, and metrics for landings, engaged sessions and qualified leads. The event deliberately excludes prompt text, full referrer URLs and personal data.

## AI citation observation

Use the immutable prompts in `data/ai-citation-prompt-set.json` and validate observations against `data/ai-citation-result.schema.json`. Record engine, prompt ID, run date, brand mention, linked citation, cited URL and answer accuracy. A plain brand mention is not a citation.

Keep the v1 30-prompt history intact. Use `data/ai-citation-prompt-set-v2.json` for the weekly 15-question Australian property-secured buyer panel across ChatGPT and Perplexity; its 30 planned prompt/surface slots are the coverage denominator even when neither surface is available. Record the actual product, mode and authentication context. API observations are explicitly labelled API samples and never represented as consumer ChatGPT or Perplexity rankings. AI answers are non-deterministic, so report coverage as an observed sample, not a population estimate. Store evidence only where the engine terms and access controls allow it. No paid API sweeps or new services are authorized.

The shared `seo.ai_growth` runner validates observations and emits `reports/seo-control-plane/ai-growth-latest.json` and an editorial feedback queue. Missing or inaccessible surfaces remain unavailable; retry temporary failures at most twice in the same weekly window. The existing Codex editor consumes this evidence, not a second publisher. Improve existing intent owners first, with substantiated reader benefits and existing financial gates. Reserve roughly one quarter of existing-page improvement capacity for evidence-backed AI usefulness opportunities without increasing publication ceilings. Inspect defects after seven days and evaluate commercial/search results at 28 and 56 days. Do not automatically rewrite pages from one fluctuating AI answer.

## Indexing-recovery guardrail

`npm run qa:protected-cohort` blocks edits to the 97-page OpenClaw recovery cohort until each route's review date. At the scheduled review, inspect page indexing, canonical selection, impressions and clicks before deciding to keep, revert or amend the remediation. Do not “freshen” those pages merely because 28 days have elapsed.

## Decision rules

- **Keep:** rankings/visibility improve or stay stable and qualified organic leads do not deteriorate.
- **Iterate:** impressions rise but CTR remains weak; test the title/description only when the query-page match is sound.
- **Reassess ownership:** supporting guides receive impressions while the designated service page remains absent for commercial queries.
- **Rollback/investigate:** a page or cluster loses qualified organic traffic or ranking coverage across two comparable reviews and no external demand shift explains it.
- **No conclusion:** sample is too small, tracking is incomplete, or a material confounder is present. State that explicitly.
