# SEO Consolidation PR Evidence - 2026-05-15

## GSC Impression Gate

Evidence sources:

- `audit-evidence/openclaw/seo-recovery-queue-2026-05-14.csv`
- `audit-evidence/openclaw/gsc-top-pages-2026-05-11.csv`
- `audit-evidence/openclaw/page-query-rows-2026-05-10.csv`

| Page | Action | GSC impressions found | Decision |
|---|---:|---:|---|
| `/resources/guides/caveat-loans-australia` | already redirected to hub | 296 | Existing redirect retained; user explicitly selected this canonical hub. |
| `/resources/guides/bridging-loans-australia` | already redirected to bridging hub | 268 | Existing redirect retained; no live source file. |
| `/resources/guides/caveat-loans-sydney-same-day-approval-available` | redirect to `/services/caveat-loans/cities/sydney` | 18 | Under 100; service city page has richer local proof/scenarios. |
| `/resources/guides/caveat-loans-melbourne-quick-business-finance` | redirect to `/services/caveat-loans/cities/melbourne` | 34 | Under 100; service city page has richer local proof/scenarios. |
| `/resources/guides/caveat-loans-perth-business-property-finance` | redirect to `/services/caveat-loans/cities/perth` | 51 | Under 100; service city page has richer local proof/scenarios. |
| `/resources/guides/second-mortgage-for-business` | redirect to `/resources/guides/second-mortgages-for-business-guide` | 2 | Under 100; explainer intent consolidated. |
| `/resources/guides/first-and-second-mortgages-for-business` | redirect to `/resources/guides/second-mortgages-for-business-guide` | 0 found | Under 100; explainer intent consolidated. |
| `/resources/guides/2nd-loan-mortgage-business-capital` | redirect to `/resources/guides/second-mortgages-for-business-guide` | 0 found | Under 100; duplicate second-mortgage explainer. |
| `/resources/guides/second-mortgage-vs-line-of-credit-which-to-choose` | redirect to `/resources/guides/second-mortgage-vs-line-of-credit` | 0 found | Under 100; duplicate comparison page. |
| `/resources/guides/private-mortgage-lenders-australia-directory` | redirect to 2026 directory | 5 | Under 100; 2026 page is newer and better structured. |
| `/resources/guides/private-lenders-for-mortgages` | redirect to 2026 directory | 7 | Under 100; directory/search intent consolidated. |
| Auction duplicate pages | redirect to `/resources/guides/commercial-bridging-loans-for-property-auctions-expert-guide` | 0 found | Under 100; one auction-settlement guide survives. |
| Private lending generic explainers | redirect into comparison guide or private-lending hub | 0 found | Under 100; generic overlap reduced. |

## City Page Decision

- Survive: `/services/caveat-loans/cities/*` and `/services/private-lending/cities/*`.
- Consolidate: the three caveat guide-city articles for Sydney, Melbourne, and Perth. They had low impressions and weaker local proof than the service-city pages.
- No private-lending guide-city duplicates were found, so no private-lending city redirects were added.

## Language Decision

GSC query evidence favoured `bridging loan(s)` over `bridging finance` in the available page-query sample, so the surviving hub now uses both: `Bridging Loans and Bridging Finance Australia Guide`. Existing `/services/bridging-finance` remains the enquiry-intent service page.

## Compliance Pass

Removed or softened unsupported current-rate, approval-speed, eligibility/criteria, and fixed-timing wording on the pages touched by this PR. The surviving pages now frame timing, pricing, leverage, and lender appetite as file-specific and general information only.
