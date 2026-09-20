# SEO and AI-discovery baseline — 20 September 2026

## Measurement status

Baseline captured in Australia/Sydney time on 20 September 2026.

- Production GA4 stream: `G-2FJ6VHKZ2Z` (stream ID `15809930442`).
- Retired stream retained for historical access: `G-EWJCDYNTCG` (stream ID `11256407376`).
- Google Ads destination retained: `AW-16887067533`, including the existing phone-click and lead conversion labels.
- Registered event-scoped custom dimensions: `ai_source` and `landing_path`.
- A production browser check observed `page_view` and `ai_referral_landing` requests to the new stream, with `ai_source=chatgpt` and `landing_path=/`.
- No test enquiry was submitted and no phone link was clicked. Accepted leads therefore remain verified by automated contract tests rather than synthetic production conversions.
- `generate_lead` is emitted only after an accepted Netlify response. Preview, honeypot, failed HTTP and network-error submissions are excluded. The payload is limited to allowlisted route, category, purpose and attribution fields; contact and financial form values are not sent to Analytics.
- `phone_click` measures an outbound click, not a completed call. Completed-call reporting is limited to existing call-provider or Google Ads call records; no paid call-tracking service is assumed.
- Historical GA traffic missing before this repair is unavailable, not zero.

The Google tag destinations were unified so the production tag owns both the new GA4 stream and the existing Ads destination. Final production network verification at `e63ae4b7d7803f643f36f4bacdcdc184bd96c8dd` observed only the replacement stream; the retired stream received no request. Confirm at the 48-hour checkpoint that the events and custom dimensions have completed processing in GA4 reporting.

## Search baseline

Google Search Console comparisons use complete like-for-like periods.

| Segment | Current period | Previous period | Change |
|---|---:|---:|---:|
| All queries, 7-day impressions | 9,224 | 9,060 | +1.8% |
| All queries, 7-day clicks | 12 | 12 | 0% |
| All queries, 28-day impressions | 32,900 | 12,100 | +172% |
| All queries, 28-day clicks | 48 | 30 | +60% |
| Australia, 7-day impressions | 8,374 | 8,399 | -0.3% |
| Australia, 7-day clicks | 12 | 9 | +33% |
| Australia, 28-day impressions | 29,556 | 11,199 | +164% |
| Australia, 28-day clicks | 43 | 26 | +65% |
| Desktop, 28-day impressions | 27,855 | 9,979 | +179% |
| Desktop, 28-day clicks | 29 | 15 | +93% |
| Mobile, 28-day impressions | 4,946 | 2,022 | +145% |
| Mobile, 28-day clicks | 19 | 15 | +27% |

The recent fall is a pullback from a short-term peak, not a broad period-over-period loss. The 28-day view remains materially higher, while the Australian 7-day view is effectively flat. Reassess after complete 7-, 28- and 56-day periods rather than comparing partial days.

Current index coverage is 259 indexed URLs and 183 excluded URLs. The reviewed exclusion export contains 155 actionable URLs: 89 crawled-not-indexed and 66 discovered-not-indexed. Every row has a recorded disposition in `indexation-action-register-2026-09-20.csv`: 98 retain, 25 improve, 9 retain/noindex and 23 merge. No city-page blanket deindexing was approved.

## Priority-page baseline and release status

Six-month query evidence is the pre-change baseline.

| Page | Impressions | Avg position | CTR | Status |
|---|---:|---:|---:|---|
| GST loan for commercial property settlement | 749 | 15.9 | 0.8% | Retain; substantive changes held for financial review |
| Commercial property development finance | 450 | 17.3 | 0.2% | Retain; substantive changes held for financial review |
| Bridging loan calculator | 208 | 14.7 | 0.0% | Retain; substantive changes held for financial review |
| Private mortgage lending for commercial borrowers | 208 | 15.8 | 0.0% | Improved in reviewed content batch |
| Second mortgage consent refused | 225 | 9.2 | 1.8% | Retain; substantive changes held for financial review |
| Guarantor requirements for commercial property loans | 213 | 16.3 | 1.9% | Improved in reviewed content batch |

The four held pages are registered as high-risk financial content. Their URLs, current copy and observation history are preserved until genuine financial review is available; automated editorial review is not represented as human financial approval.

## Reference-resource coverage

The existing inventory already covers all six requested reference needs, so no overlapping URL is required.

| Need | Existing owner |
|---|---|
| Document requirements | `/resources/guides/private-lender-document-pack-broker-take` and the private-mortgage guide |
| Settlement timelines | `/resources/guides/commercial-property-settlement-process-finance-timeline` |
| Total borrowing costs | Private-mortgage guide comparison and cost checklist |
| Funding-readiness checks | `/resources/guides/commercial-property-due-diligence-finance-checklist` |
| Finance-option comparisons | `/resources/guides/private-lending-vs-bank-lending-which-is-better` and the private-mortgage guide |
| Sourced Australian market context | Private-mortgage guide, using current Reserve Bank of Australia context |

New pages should be proposed only after the inventory and current query evidence show a distinct unmet intent.

## Technical and crawler verification

- `/terms-and-conditions` redirects directly to `/terms` with a permanent one-hop redirect.
- Every indexable built page has social image metadata; 19 previously missing pages were repaired.
- Three comparable mobile Lighthouse runs produced a median LCP of approximately 2.27 seconds, with negligible CLS and low blocking time.
- Build, route, canonical, sitemap, structured-data, accessibility and link checks passed for the released technical batches.
- Representative HTML, `robots.txt` and `llms.txt` returned `200` to Googlebot, OAI-SearchBot, ChatGPT-User, PerplexityBot and Perplexity-User test user agents. This verifies access policy and response behavior, not genuine crawler visits.
- Authenticated hosting-log evidence was unavailable, so no claim is made about real OpenAI or Perplexity crawl frequency.
- The live publication scheduler remains Monday, Wednesday and Friday at 10:00, Australia/Sydney: three articles weekly. No additional city-page batch was enabled.

## Released batches and rollback points

| Batch | Pull request | Production commit | Rollback |
|---|---:|---|---|
| Technical SEO and performance | #203 | `0f1eba825372b5cd090400d10ac4dfea7c82d12d` | Revert this merge commit |
| Measurement | #204 | `4ccf98369c21749b100355e3ebcfc8108c28cbb3` | Revert this merge commit; retain GA property history |
| Indexation register and consolidations | #205 | `40f51ff924cbb7e05470fac8786bbea3cc1f135b` | Revert this merge commit and use `consolidation-map-2026-09-20.csv` |
| Analytics event routing | #206 | `03fdb0d34cc6ec92b529acd5df92bf7796b7baca` | Revert this merge commit |
| Google tag destination isolation | #207 | `e63ae4b7d7803f643f36f4bacdcdc184bd96c8dd` | Revert this merge commit |

The consolidation map is the authoritative source-to-destination record. Released mappings are direct 301s, and internal route/redirect checks prevent chains and conflicts.

## Follow-up protocol

- 48 hours — 22 September 2026: confirm new-stream reporting, custom dimensions, event uniqueness, Ads destination continuity and retired-stream isolation.
- 7 days — 27 September 2026: compare affected pages and complete periods, segmented by branded/non-branded query, Australia and device.
- 28 days — 18 October 2026: review indexing, clicks, impressions, CTR, enquiries and AI referral landings for affected URLs.
- 56 days — 15 November 2026: make retain/improve/merge decisions using complete-period evidence; do not infer success from rankings or citations alone.

Notify only for a material measurement failure, technical regression, indexing loss, or decision requiring authority. Otherwise record the checkpoint without generating routine noise.
