# SEO retention comparison

Compared all **380 live sitemap URLs** with the complete prerendered private review output. The production baseline was captured on 6 September 2026 (Australia/Sydney), starting from source commit `37f446f156a572f1cec300aa031f16db8aa15293`.

| Check | Result |
| --- | --- |
| Sitemap routes present | 380 of 380 |
| Removed or added sitemap routes | 0 |
| New orphan pages or pages unreachable from the homepage | 0 |
| Changed canonical targets, titles, descriptions or H1s | 0 |
| Lost internal link destinations | 0 |
| Missing substantive baseline text blocks | 0 |
| Broken local content/social/schema images | 0 |
| Broken contents fragments | 0 |
| Changed structured data | 3 repaired Article image URLs |
| Preview indexing directives | All 380 protected by noindex |

The baseline had broken image references on 73 pages and broken fragments across 223 guides. Missing legacy image URLs are restored where possible; the explicit image manifest controls the remaining corrections. Case-study FAQs present in the source but previously stripped by the shared renderer are restored.

Two short homepage labels are proposed corrections: “Success Stories” and “Real deals, real results, real growth” become explicit illustrative-scenario wording. All underlying scenario details remain. Exact additions and exceptions are in `proposed-exceptions.json`. Source markdown, article topics, authors, dates, FAQs, disclosures and related resources remain.

`seo-comparison.json` records every checked route and the field-level counts. `seo-differences.json` records the raw differences, including intentional review-only robots changes. The comparison normalises whitespace and React text-node separators without ignoring changed numbers or punctuation.

Normal production builds retain production indexing settings; the review mode alone excludes analytics, simulates enquiries and applies indexing restrictions. Owner-only access is verified separately during private publication. This audit establishes technical preservation, not a guarantee of future rankings. Search Console and organic-conversion baselines and a rollback deployment are still required before any production release.
