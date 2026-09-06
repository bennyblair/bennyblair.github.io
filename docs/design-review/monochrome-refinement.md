# Inner-page monochrome refinement

This revision removes the green brand surfaces from inner pages while leaving the approved homepage composition and animation intact. The inner palette is charcoal, off-white and stone. The shared navigation remains Services, Guides, Calculators and About.

## Design changes

- Services: replace the nested tinted benefits box with a charcoal typographic panel; set the six original benefits in numbered rows. Separate the existing finance overview, hub guidance and borrower comparison into a clear editorial grid. Give industries, stories, lender comparisons, transaction fit, city coverage and process their own spacing and layouts.
- Service detail pages: use the shared `ServiceChapter` component for a heading column beside a readable content column. It forwards the original section attributes, preserves heading elements and content order, and stacks at smaller widths.
- Guides and case studies: neutral editorial features, larger reading titles, clearer row states and monochrome supporting surfaces. Existing filters, counts and prerendered links are retained.
- Articles: stone takeaway summaries, charcoal enquiry rails, ruled reading sections and monochrome photography that returns to colour on hover. Touch devices display the colour source. No asset URLs, captions, alt text or metadata change.
- About: turn the original mission into a charcoal statement panel; replace the broker comparison and advantages' nested card treatment with open editorial columns and ruled lists. Broker profiles share one charcoal information rail.
- Calculators, contact and reference pages: stone input surfaces, charcoal results, tabular result numerals, neutral form controls, clearer reading divisions and consistent focus treatment. Calculation and submission logic is unchanged. The working-capital industry field uses a native select with the same six values and state handler, avoiding the previous detached green popup and its focus-hiding issue.

## Preservation and release scope

No substantive copy, service ranges, claims, routes, title/description/H1 text, canonicals, author/review details, schema, form contracts or calculation formulas are intentionally changed. Numbers added to the Services benefit and comparison rows are decorative CSS counters. The before/after route comparison is recorded in `monochrome-validation.json`.

The existing private Sites preview remains the review destination. Production hosting and the GitHub origin are untouched. Preview noindex, simulated enquiries and analytics isolation remain active. The inherited lender-count claim gate and private-preview SEO/analytics test differences documented in `release-review.md` still apply; this visual revision does not resolve or validate those claims.
