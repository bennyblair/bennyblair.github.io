# Article QA

Run this before calling any guide or case-study change review-ready.

```bash
npm run qa:article -- src/content/guides/article-slug.md --fail-on-warnings
```

For a genuinely new article, also pass `--new-article`. This rejects legacy author-profile fields and requires the canonical `author: Ben` or `author: Daniel` interface.

Use `--preview-base https://preview-host.example` after a deploy preview is available. The preview check requires both an HTTP success response and the expected article heading; a generic SPA fallback or “Article Not Found” page fails.

The command enforces:

- public-copy hygiene, including a block on internal QA, prompt, and AI-production labels;
- complete authored metadata without persisted ellipses; preferred lengths warn while missing, truncated, or extreme values fail;
- a real PNG, JPEG, or WebP featured image that exists in `public/`, is at least 1200x630, and is no larger than 250 KB;
- 700-2,800 substantive words with a 900-2,200 reader-first warning range, optional 3-6 question FAQs, the standard disclaimer, and one related-content section;
- the designated service link and at least two relevant guides, with warnings for thin linking or link stuffing;
- heading, paragraph-similarity, canonical-author, evidence, review-date, and expiry checks;
- existence of every linked guide, case study, and insight route; and
- exact preview rendering when `--preview-base` is supplied.

`npm run qa:content` applies the same publishing contract to every materially changed content file in CI. `npm run build` then prerenders and crawls the whole site, including raw FAQ-answer, metadata, placeholder-media, canonical, schema, and link checks.
