# Search and directory structure

The Services and Guides directories now put choosing a destination before supporting reading. This release does not cut substantive explanations or change route destinations, metadata, article text or structured data.

## Implemented

- Guides has immediate search across titles, descriptions, topics, tags and keywords. Multiple search words may match across these fields; case and punctuation are normalized. Title matches rank first, with existing date order breaking ties.
- Search combines with the existing topic filter and has a visible result count, clear control, empty state and reset action. Featured guides become ordinary results during filtering, so they cannot disappear from matching searches.
- Every one of the 245 indexable guides remains linked in the initial prerendered HTML. There is no pagination, new query URL or content fetch required for indexing. With JavaScript disabled the complete directory remains available; typed text and the selected topic survive delayed JavaScript startup.
- Services initially opens Property Finance. Its other groups use native disclosures while retaining all 16 service links and descriptions in the HTML.
- Six supporting Services sections expand on demand. The benefits, service choices, process, FAQs and enquiry remain prominent. Disclosures work with keyboard input and with JavaScript disabled.
- Both directories retain the homepage's charcoal, mineral-white and stone palette.

## Content recommendations for a separate editorial pass

The existing material is not all necessary in its current form. Additional word count alone is not an SEO objective; each section should answer a distinct visitor question.

| Existing issue | Proposed correction | Status in this release |
| --- | --- | --- |
| Repeated explanations of how to choose finance | Consolidate into one concise comparison introduction, retaining distinct assessment and risk details | Reorganized into disclosure; text retained |
| "services below" after the service directory | Change to "services on this page" | Proposed copy edit; not applied |
| Hub minimum of $50K while Equipment Finance starts at $25K | Confirm product ranges and reconcile the summary | Evidence required |
| Asset Finance and Equipment Finance overlap | Explain intended borrower/product distinction in their directory descriptions | Editorial review required |
| "Real Australian businesses" stories link to service pages | Verify transaction evidence or make the narrative clearly hypothetical | Evidence required; do not imply photographs depict clients |
| Bank/private lender rates and approval ranges lack visible verification dates | Verify and date the comparison, or replace brittle numbers with qualified explanations | Evidence required |
| Broad promises such as "All business types" | Replace with precise eligibility language after review | Proposed; not applied |

Google's guidance does not prescribe a preferred word count. Its mobile-first indexing guidance allows content to be organized in accordions or tabs when equivalent substantive content is present and does not require interaction to load.

Sources: https://developers.google.com/search/docs/fundamentals/creating-helpful-content and https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing

## Validation

The targeted browser checks exercise search, combined filters, empty/reset states, keyboard focus, all six supporting disclosures, the full no-JavaScript link set, and delayed-startup state preservation. The route comparison additionally checks the complete 380-URL sitemap, metadata, headings, content blocks, HTML links, structured data and image availability.
