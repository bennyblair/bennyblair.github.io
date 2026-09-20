# GSC excluded-URL action register — 2026-09-20

Evidence captured gsc-indexing-examples.json; performance context from gsc-6-months.json; registry checksum `136c2a92375bf30c00b8d5151664004766a2c55be6a611f2eebb199c04c3ca57`.

## Coverage

- 155 unique URLs reviewed: 89 crawled-not-indexed and 66 discovered-not-indexed.
- Actions: retain 98, retain with noindex 9, improve 25, merge 23.
- Every row records the current sitemap state, registry decision, page type, observation dates, internal-link evidence, available six-month GSC page evidence, rationale and next review date.

## Decision boundary

- An excluded status alone does not authorise deletion, consolidation or noindex.
- `merge` appears only where the current registry already records an approved consolidation and a named one-hop destination.
- `retain with noindex` appears only where the registry already records noindex; this audit creates no new noindex decisions.
- City pages remain indexable and are retained or improved; none are blanket-deindexed.
- Missing GSC page rows are recorded as unavailable, never as zero.

## File

The complete URL-level register is in `indexation-action-register-2026-09-20.csv`.

New consolidation releases must also carry a dated `consolidation-map-2026-09-20.csv` with one-hop destinations and a rollback baseline.
