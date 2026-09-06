# Homepage enquiry and footer refinement

The homepage now ends on one full-width charcoal canvas. The enquiry section has a centred 1600px inner container aligned with the footer, a tighter column gap, and reduced bottom spacing. A single inset divider separates the form area from the footer links. The enquiry columns stack at 900px. Footer styling changes are scoped to the homepage.

All copy, form controls, validation, honeypot, preview submission isolation, event contracts, footer links and disclosures remain unchanged. There are no new SEO/content exceptions.

Validation on 6 September 2026:
- Private review build completed: 391 canonical routes prerendered; 380 sitemap routes verified; review protections applied to 394 HTML documents.
- All 380 routes compared with the preceding photography preview: zero canonical, title, description, H1, robots, structured data, substantive text or internal destination changes; no missing routes, orphan pages, broken anchors or missing content images.
- Enquiry/footer geometry passed at 320, 390, 768, 1024, 1280, 1440, 1920 and 2560px with both normal and 200% text. Full-width backgrounds meet exactly; content edges align; no horizontal overflow. Contact and footer WCAG A/AA checks passed at 390 and 1440px. Desktop composition and mobile field layout inspected visually.
- JavaScript-disabled closing content and footer links remain visible. Preview form submission displayed the simulation confirmation and produced no network writes or analytics calls.
- Typecheck passed. Lint completed with the same nine pre-existing Fast Refresh warnings.

The prior performance measurements remain the latest laboratory measurements; performance was not remeasured for this below-the-fold spacing change. The inherited claim gate issue remains documented in release-review.md. Production hosting is unchanged.
