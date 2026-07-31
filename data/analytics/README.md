# Organic-search baseline inputs

This directory is the handoff point for the evidence-led URL classification. Raw
exports and derived results are ignored by Git because they can contain sensitive
analytics data.

## Required exports

Place these files in `data/analytics/raw/`:

- `search-console-pages.csv`: 16 complete months with `page`, `clicks`,
  `impressions`, `ctr`, and `position`.
- `search-console-queries.csv`: the same period with `query`, `clicks`,
  `impressions`, `ctr`, and `position`.
- `ga4-landing-pages.csv`: 12 complete months with `landingPage`, `sessions`,
  `engagedSessions`, and `conversions`. A GA4 export headed
  `Landing page + query string` is also accepted.
- `search-console-indexing.csv`: the current URL-indexing export or API result
  with `url` and `status`.
- `core-web-vitals.csv`: the current field-data export with `url`, `device`,
  `lcpMs`, `cls`, `inpMs`, and `status`.

Aggregate each export over the full period before downloading it. Keep the
property at `https://emetcapital.com.au/`, use organic search for the GA4
acquisition filter, and use the site's agreed lead event as `conversions`.
Copy the templates from `data/analytics/templates/` if column naming needs to be
normalised.

The classifier can run without the indexing and Core Web Vitals files, but
records those baseline fields as unavailable rather than fabricating values.

## Classification

Run:

```bash
npm run analytics:classify
```

The command writes:

- `data/analytics/derived/url-classification.csv`
- `data/analytics/derived/baseline.json`

The classification is intentionally conservative. A URL is:

- **Protect** when it has a conversion, at least five organic clicks, or an
  established top-20 position with at least 100 impressions.
- **Improve** when it has at least 50 impressions but weak click-through,
  ranking, or conversion evidence.
- **Consolidate candidate** only when it has zero clicks, fewer than 50
  impressions, zero conversions, the same search intent, at least 75% content
  similarity, and a stronger observed page.
- **Retain for testing** in every other case.

`Consolidate candidate` is not an automatic redirect instruction. A reviewer
must confirm that the two pages satisfy the same search intent and that the
suggested destination is the closest useful answer before editing the route
manifest.
