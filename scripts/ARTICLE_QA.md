# Article QA

Run this before calling any guide or case-study change review-ready.

```bash
npm run qa:article -- src/content/guides/article-slug.md --fail-on-warnings
```

Use `--preview-base https://preview-host.example` after a deploy preview is available. The preview check requires both an HTTP success response and the expected article heading; a generic SPA fallback or “Article Not Found” page fails.

The command enforces:

- public-copy hygiene, including a block on internal QA, prompt, and AI-production labels;
- authored metadata lengths without persisted ellipses;
- a real PNG, JPEG, or WebP featured image that exists in `public/`;
- 1,500-2,500 words, 5-7 FAQs, the standard disclaimer, and required related-guide sections;
- at least 10 valid internal links, with no target repeated more than twice;
- heading, repetition, author, and review-field checks;
- existence of every linked guide slug; and
- exact preview rendering when `--preview-base` is supplied.

`npm run qa:content` applies the same publishing contract to every materially changed content file in CI. `npm run build` then prerenders and crawls the whole site, including raw FAQ-answer, metadata, placeholder-media, canonical, schema, and link checks.
