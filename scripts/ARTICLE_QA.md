# Article QA

Use this before calling any guide/article PR review-ready.

## Command

```bash
npm run qa:article -- <article1.md> <article2.md> --preview-base <preview-base-url> --fail-on-warnings
```

## What it checks

- Every `/resources/guides/...` slug in the article resolves to a real file in `src/content/guides/`
- `Related In-Depth Guides` and `Related Guides` both exist
- Top and bottom related-guide lists are not identical
- Preview URLs for the provided articles return HTTP 200 when `--preview-base` is supplied

## Example

```bash
npm run qa:article -- \
  src/content/guides/commercial-property-valuation-for-finance-lender-requirements.md \
  src/content/guides/intercreditor-agreements-second-mortgage-complexity.md \
  --preview-base https://deploy-preview-34--meek-rugelach-0cdf8b.netlify.app \
  --fail-on-warnings
```

If this does not pass, the task is not review-ready.
