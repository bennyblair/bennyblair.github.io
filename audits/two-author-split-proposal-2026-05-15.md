# Two-Author Split Proposal, 2026-05-15

Status: approved and applied in PR #84. Mass author frontmatter has been applied to the existing guides and case studies using this split.

## Decision Summary

- Total existing guide/case-study pages reviewed: 170
- Proposed Ben pages: 118 (69.4%)
- Proposed Daniel pages: 52 (30.6%)
- Public names: first names only, everywhere. No surnames in bylines, schema names, internal links, author pages, or sitemap URLs.
- Daniel years number: 10 years.

## Split Criteria For Approval

### Ben Default

Ben owns operational content by default:

- Guides, how-tos, checklists, calculators, document explainers, settlement explainers, scenario walkthroughs, and case studies.
- Borrower-problem pages where the page explains the process, documents, exits, risks, or common use cases.
- Proof-led assets and anonymised deal stories unless the angle is explicitly a Director market note.

### Daniel Exception

Daniel owns Director-flavoured content where the page is primarily commentary, market interpretation, lender behaviour, or strategic comparison:

- Market notes and location market insights.
- Lender directories, lender comparison, broker selection, bank vs non-bank positioning, and private credit commentary.
- Rates or interest-rate explainers where the value is broker interpretation rather than a process walkthrough.
- Strategic comparison pages such as loan type vs loan type, caveat vs bank, private lending vs bank lending, and bridging vs development finance.
- Pages about lender appetite signals: serviceability, eligibility, covenants, valuation, intercreditor, priority, subordination, and what lenders look for.

Default rule for future content: Ben unless the article clearly matches the Daniel exception.

## Automation Proposal

Daily content generation should set author fields automatically:

- `author_name`: `Ben` or `Daniel`
- `author_title`
- `author_bio`
- `author_url`
- `author_links`
- `reviewed_date`

Routing rule:

- Default to Ben.
- Route to Daniel only when content type or topic is `market_note`, `director_commentary`, `broker_take`, `lender_behaviour`, lender comparison, broker selection, market insight, rates/interest-rate interpretation, bank vs non-bank positioning, or strategic loan comparison.
- Case studies, how-tos, checklists, settlement explainers, and operational borrower scenario pages stay with Ben unless explicitly marked as Director commentary.

Article QA should fail loudly when:

- A new article is missing an author field.
- Author is not exactly `Ben` or `Daniel`.
- A byline or schema name contains a surname.
- Article schema is missing a Person author matching the byline.

## Compliance Notes

- Daniel lender commentary must follow the lender-naming rule: factual/educational mentions only, no unsupported current-rate, current-criteria, or approval-likelihood claims, and no disparagement.
- Both author bios are framed as general information. No author page provides financial, legal, tax, or credit advice.

## Daniel Pages Proposed

| # | URL | Title | Source file |
|---:|---|---|---|
| 1 | `/resources/guides/asset-backed-lending-vs-unsecured-business-loans` | Asset-Backed Lending vs Unsecured Business Loans | `src/content/guides/asset-backed-lending-vs-unsecured-business-loans.md` |
| 2 | `/resources/guides/bank-vs-non-bank-commercial-lending-in-australia-which-borrowers-get-approved` | Bank vs Non-Bank Commercial Lending in Australia: Which Borrowers Get Approved? | `src/content/guides/bank-vs-non-bank-commercial-lending-in-australia-which-borrowers-get-approved.md` |
| 3 | `/resources/guides/best-bridging-loan-lenders-companies-2025` | The Best Bridging Loan Lenders & Finance Companies [2025] | `src/content/guides/best-bridging-loan-lenders-companies-2025.md` |
| 4 | `/resources/guides/caveat-lenders-australia-directory-comparison` | Caveat Lenders in Australia: 2025 Directory & Comparison | `src/content/guides/caveat-lenders-australia-directory-comparison.md` |
| 5 | `/resources/guides/caveat-loan-interest-rates-what-you-ll-really-pay-2025` | Caveat Loan Interest Rates: What Business Borrowers Are Really Paying Attention To | `src/content/guides/caveat-loan-interest-rates-what-you-ll-really-pay-2025.md` |
| 6 | `/resources/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you` | Caveat Loan vs Second Mortgage: Which Is Right for You? | `src/content/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you.md` |
| 7 | `/resources/guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval` | Caveat Loans Online in Australia: Fast Enquiry vs Real Approval | `src/content/guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` |
| 8 | `/resources/guides/caveat-loans-vs-bank-loans-speed-comparison` | Caveat Loans vs Bank Loans: Which is Faster for Your Business? | `src/content/guides/caveat-loans-vs-bank-loans-speed-comparison.md` |
| 9 | `/resources/guides/commercial-bridging-loan-rates-2025-update` | Commercial Bridging Loan Rates in Australia: What Borrowers Should Compare Instead of Chasing a Headline Number | `src/content/guides/commercial-bridging-loan-rates-2025-update.md` |
| 10 | `/resources/guides/commercial-loan-interest-rates-australia-2025-comparison` | Commercial Loan Interest Rates Australia: How Business Borrowers Should Compare Pricing | `src/content/guides/commercial-loan-interest-rates-australia-2025-comparison.md` |
| 11 | `/resources/guides/commercial-loan-rates-banks-vs-private-lenders-compared` | Commercial Loan Rates in Australia: Banks vs Private Lenders Compared | `src/content/guides/commercial-loan-rates-banks-vs-private-lenders-compared.md` |
| 12 | `/resources/guides/commercial-mortgage-rates-australia-complete-guide` | Commercial Mortgage Rates Australia: Complete Guide | `src/content/guides/commercial-mortgage-rates-australia-complete-guide.md` |
| 13 | `/resources/guides/commercial-mortgages-vs-residential-key-differences-explained` | Commercial Mortgages vs Residential: Key Differences Explained | `src/content/guides/commercial-mortgages-vs-residential-key-differences-explained.md` |
| 14 | `/resources/guides/commercial-property-finance-perth-wa-market-insights` | Commercial Property Finance Perth: WA Market Insights | `src/content/guides/commercial-property-finance-perth-wa-market-insights.md` |
| 15 | `/resources/guides/commercial-property-finance-rates-2025-comparison` | Commercial Property Finance Rates: 2025 Comparison | `src/content/guides/commercial-property-finance-rates-2025-comparison.md` |
| 16 | `/resources/guides/commercial-property-lenders-in-australia-complete-directory` | Commercial Property Lenders in Australia: How to Compare the Market | `src/content/guides/commercial-property-lenders-in-australia-complete-directory.md` |
| 17 | `/resources/guides/commercial-property-loan-covenants-what-happens-when-a-business-breaches-them` | Commercial Property Loan Covenants: What Happens When a Business Breaches Them? | `src/content/guides/commercial-property-loan-covenants-what-happens-when-a-business-breaches-them.md` |
| 18 | `/resources/guides/commercial-property-loan-eligibility-what-you-need-to-qualify` | Commercial Property Loan Eligibility: What You Need to Qualify | `src/content/guides/commercial-property-loan-eligibility-what-you-need-to-qualify.md` |
| 19 | `/resources/guides/commercial-property-loan-serviceability-how-much-can-you-borrow` | Commercial Property Loan Serviceability: How Much Can You Borrow? | `src/content/guides/commercial-property-loan-serviceability-how-much-can-you-borrow.md` |
| 20 | `/resources/guides/commercial-property-loans-brisbane-queensland-market-guide` | Commercial Property Loans Brisbane: Queensland Market Guide | `src/content/guides/commercial-property-loans-brisbane-queensland-market-guide.md` |
| 21 | `/resources/guides/commercial-property-refinance-after-a-bank-decline-in-australia` | Commercial Property Refinance After a Bank Decline in Australia | `src/content/guides/commercial-property-refinance-after-a-bank-decline-in-australia.md` |
| 22 | `/resources/guides/commercial-property-valuation-for-finance-lender-requirements` | Commercial Property Valuation for Finance: Lender Requirements | `src/content/guides/commercial-property-valuation-for-finance-lender-requirements.md` |
| 23 | `/resources/guides/commercial-real-estate-lenders-australia-directory` | Commercial Real Estate Lenders in Australia [Directory] | `src/content/guides/commercial-real-estate-lenders-australia-directory.md` |
| 24 | `/resources/guides/debtor-finance-vs-trade-finance-in-australia` | Debtor Finance vs Trade Finance in Australia | `src/content/guides/debtor-finance-vs-trade-finance-in-australia.md` |
| 25 | `/resources/guides/find-caveat-loan-brokers-australia` | How to Find Caveat Loan Brokers in Australia [2025] | `src/content/guides/find-caveat-loan-brokers-australia.md` |
| 26 | `/resources/guides/finding-comparing-private-lenders-loans-2025-guide` | How to Compare Private Lenders for Business Funding | `src/content/guides/finding-comparing-private-lenders-loans-2025-guide.md` |
| 27 | `/resources/guides/first-mortgage-vs-second-mortgage-key-differences` | First Mortgage vs Second Mortgage: Key Differences | `src/content/guides/first-mortgage-vs-second-mortgage-key-differences.md` |
| 28 | `/resources/guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide` | How to Choose a Bridging Loan Broker [Expert Selection Guide] | `src/content/guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` |
| 29 | `/resources/guides/how-to-find-second-mortgage-brokers-australia` | How to Find Second Mortgage Brokers in Australia | `src/content/guides/how-to-find-second-mortgage-brokers-australia.md` |
| 30 | `/resources/guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide` | How to Find the Best Commercial Mortgage Broker [Complete Guide] | `src/content/guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` |
| 31 | `/resources/guides/intercreditor-agreements-second-mortgage-complexity` | Intercreditor Agreements: Second Mortgage Complexity | `src/content/guides/intercreditor-agreements-second-mortgage-complexity.md` |
| 32 | `/resources/guides/low-doc-no-doc-commercial-loans-complete-alternative-guide` | Low Doc & No Doc Commercial Loans: Complete Alternative Guide | `src/content/guides/low-doc-no-doc-commercial-loans-complete-alternative-guide.md` |
| 33 | `/resources/guides/mezzanine-finance-australia-complete-guide` | Mezzanine Finance in Australia: The Complete Guide for Business Growth | `src/content/guides/mezzanine-finance-australia-complete-guide.md` |
| 34 | `/resources/guides/no-credit-check-caveat-loans-in-australia-what-business-borrowers-should-know` | No Credit Check Caveat Loans in Australia: What Business Borrowers Should Know | `src/content/guides/no-credit-check-caveat-loans-in-australia-what-business-borrowers-should-know.md` |
| 35 | `/resources/guides/open-vs-closed-bridging-loan-complete-comparison` | Open vs Closed Bridging Loans in Australia: A Complete Comparison for Commercial Borrowers | `src/content/guides/open-vs-closed-bridging-loan-complete-comparison.md` |
| 36 | `/resources/guides/priority-agreements-in-second-mortgages-what-they-mean` | Priority Agreements in Second Mortgages: What They Mean for Commercial Borrowers | `src/content/guides/priority-agreements-in-second-mortgages-what-they-mean.md` |
| 37 | `/resources/guides/private-commercial-real-estate-lenders-cre-directory` | Private Commercial Real Estate Lenders: CRE Directory | `src/content/guides/private-commercial-real-estate-lenders-cre-directory.md` |
| 38 | `/resources/guides/private-credit-for-sme-borrowers-in-australia-when-it-replaces-bank-finance` | Private Credit for SME Borrowers in Australia: When It Replaces Bank Finance | `src/content/guides/private-credit-for-sme-borrowers-in-australia-when-it-replaces-bank-finance.md` |
| 39 | `/resources/guides/private-lending-vs-bank-lending-which-is-better` | Private Lending vs Bank Lending: Which Is Better? | `src/content/guides/private-lending-vs-bank-lending-which-is-better.md` |
| 40 | `/resources/guides/private-mortgage-lenders-australia-directory-2026` | Private Mortgage Lenders: Complete Australia Directory [2026] | `src/content/guides/private-mortgage-lenders-australia-directory-2026.md` |
| 41 | `/resources/guides/purchase-order-finance-vs-trade-finance-in-australia` | Purchase Order Finance vs Trade Finance in Australia | `src/content/guides/purchase-order-finance-vs-trade-finance-in-australia.md` |
| 42 | `/resources/guides/refinancing-commercial-property-with-a-short-lease-remaining` | Refinancing Commercial Property with a Short Lease Remaining | `src/content/guides/refinancing-commercial-property-with-a-short-lease-remaining.md` |
| 43 | `/resources/guides/second-mortgage-for-a-business-partner-buyout-in-australia` | Second Mortgage for a Business Partner Buyout in Australia | `src/content/guides/second-mortgage-for-a-business-partner-buyout-in-australia.md` |
| 44 | `/resources/guides/second-mortgage-interest-rates-current-market-analysis` | Second Mortgage Interest Rates: Current Market Analysis | `src/content/guides/second-mortgage-interest-rates-current-market-analysis.md` |
| 45 | `/resources/guides/second-mortgage-lenders-australia-directory` | Second Mortgage Lenders in Australia: Complete Directory | `src/content/guides/second-mortgage-lenders-australia-directory.md` |
| 46 | `/resources/guides/second-mortgage-vs-line-of-credit` | Second Mortgage vs Line of Credit: Which to Choose? | `src/content/guides/second-mortgage-vs-line-of-credit.md` |
| 47 | `/resources/guides/subordination-agreement-second-mortgage` | Subordination Agreements in Second Mortgages: What They Mean | `src/content/guides/subordination-agreement-second-mortgage.md` |
| 48 | `/resources/guides/trade-finance-for-businesses-with-bad-credit-in-australia` | Trade Finance for Businesses with Bad Credit in Australia | `src/content/guides/trade-finance-for-businesses-with-bad-credit-in-australia.md` |
| 49 | `/resources/guides/understanding-secondary-mortgage-markets-australia` | Understanding Secondary Mortgage Markets in Australia | `src/content/guides/understanding-secondary-mortgage-markets-australia.md` |
| 50 | `/resources/guides/vacant-commercial-property-refinance-in-australia-what-lenders-look-for` | Vacant Commercial Property Refinance in Australia: What Lenders Look For | `src/content/guides/vacant-commercial-property-refinance-in-australia-what-lenders-look-for.md` |
| 51 | `/resources/guides/vendor-finance-vs-business-acquisition-loan-in-australia` | Vendor Finance vs Business Acquisition Loan in Australia | `src/content/guides/vendor-finance-vs-business-acquisition-loan-in-australia.md` |
| 52 | `/resources/guides/when-commercial-bridging-finance-makes-sense-in-australia-and-when-it-does-not` | When Commercial Bridging Finance Makes Sense in Australia — and When It Does Not | `src/content/guides/when-commercial-bridging-finance-makes-sense-in-australia-and-when-it-does-not.md` |

## Ben Pages Proposed

| # | URL | Title | Source file |
|---:|---|---|---|
| 1 | `/resources/case-studies/adelaide-cbd-asset-backed-lending` | Adelaide CBD Property Portfolio: $3.8M Asset Backed Lending Facility | `src/content/case-studies/adelaide-cbd-asset-backed-lending.md` |
| 2 | `/resources/case-studies/adelaide-cbd-office-complex` | Adelaide CBD Office Complex: $2.1M Commercial Refurbishment Success | `src/content/case-studies/adelaide-cbd-office-complex.md` |
| 3 | `/resources/case-studies/brisbane-fortitude-valley-trade-finance` | Fortitude Valley Import Co: $1.2M Trade Finance for Asian Homeware | `src/content/case-studies/brisbane-fortitude-valley-trade-finance.md` |
| 4 | `/resources/case-studies/case-study-bridging-loan-won-the-property-auction` | Case Study: How a Bridging Loan Helped Secure a Commercial Property at Auction | `src/content/case-studies/case-study-bridging-loan-won-the-property-auction.md` |
| 5 | `/resources/case-studies/case-study-second-mortgage-saved-this-business-50k` | Case Study: How a Second Mortgage Helped an Australian Business Consolidate Expensive Debt | `src/content/case-studies/case-study-second-mortgage-saved-this-business-50k.md` |
| 6 | `/resources/case-studies/fortitude-valley-hotel-project` | Fortitude Valley Boutique Hotel: $6.2M Development Finance Success | `src/content/case-studies/fortitude-valley-hotel-project.md` |
| 7 | `/resources/case-studies/gold-coast-surfers-second-mortgage` | Gold Coast Surfers Paradise: $650K Second Mortgage for Beachfront Apartment Development Deposit | `src/content/case-studies/gold-coast-surfers-second-mortgage.md` |
| 8 | `/resources/case-studies/melbourne-collingwood-refinancing` | Collingwood Hospitality Group: $2.1M Refinancing Saves $185K Annually | `src/content/case-studies/melbourne-collingwood-refinancing.md` |
| 9 | `/resources/case-studies/melbourne-richmond-asset-finance` | Richmond Manufacturing: $850K Asset Finance for Production Equipment | `src/content/case-studies/melbourne-richmond-asset-finance.md` |
| 10 | `/resources/case-studies/newcastle-hamilton-working-capital` | Hamilton Hospitality Group: $850K Working Capital for Multi-Venue Expansion | `src/content/case-studies/newcastle-hamilton-working-capital.md` |
| 11 | `/resources/case-studies/newcastle-junction-smsf-lending` | The Junction Medical Centre: $2.4M SMSF Property Purchase | `src/content/case-studies/newcastle-junction-smsf-lending.md` |
| 12 | `/resources/case-studies/newcastle-merewether-equipment-finance` | Merewether Medical Clinic: $850K Equipment Finance Success | `src/content/case-studies/newcastle-merewether-equipment-finance.md` |
| 13 | `/resources/case-studies/newcastle-wickham-business-acquisition` | Wickham Engineering Firm: $1.9M Business Acquisition Finance | `src/content/case-studies/newcastle-wickham-business-acquisition.md` |
| 14 | `/resources/case-studies/parramatta-mixed-use-development` | Parramatta Mixed-Use Development: $5.8M Bridging Finance Success | `src/content/case-studies/parramatta-mixed-use-development.md` |
| 15 | `/resources/case-studies/perth-business-group-debt-consolidation` | Perth Business Group: $4.2M Debt Consolidation Saves $195K Annually | `src/content/case-studies/perth-business-group-debt-consolidation.md` |
| 16 | `/resources/case-studies/perth-fremantle-first-mortgage` | Perth Fremantle Investment: $1.8M First Mortgage for Heritage Commercial Acquisition | `src/content/case-studies/perth-fremantle-first-mortgage.md` |
| 17 | `/resources/case-studies/rose-bay-property-development-bridging-loan` | Rose Bay Property Development Bridging Loan | `src/content/case-studies/rose-bay-property-development-bridging-loan.md` |
| 18 | `/resources/case-studies/south-yarra-apartment-development` | South Yarra Luxury Apartments: $4.1M Development Finance Success | `src/content/case-studies/south-yarra-apartment-development.md` |
| 19 | `/resources/case-studies/surry-hills-commercial-acquisition` | Surry Hills Restaurant Acquisition: $3.2M Caveat Loan Success | `src/content/case-studies/surry-hills-commercial-acquisition.md` |
| 20 | `/resources/guides/asset-backed-business-loans-using-equipment-and-receivables-in-australia` | Asset-Backed Business Loans Using Equipment and Receivables in Australia | `src/content/guides/asset-backed-business-loans-using-equipment-and-receivables-in-australia.md` |
| 21 | `/resources/guides/asset-backed-lending-and-asset-finance` | Asset-Backed Lending & Asset Finance: A Guide | `src/content/guides/asset-backed-lending-and-asset-finance.md` |
| 22 | `/resources/guides/ato-garnishee-notice-finance-for-australian-businesses` | ATO Garnishee Notice Finance for Australian Businesses | `src/content/guides/ato-garnishee-notice-finance-for-australian-businesses.md` |
| 23 | `/resources/guides/ato-gic-is-no-longer-deductible-should-businesses-refinance-tax-debt` | ATO GIC Is No Longer Deductible: Should Businesses Refinance Tax Debt? | `src/content/guides/ato-gic-is-no-longer-deductible-should-businesses-refinance-tax-debt.md` |
| 24 | `/resources/guides/ato-tax-debt-finance-for-australian-business-owners` | ATO Tax Debt Finance for Australian Business Owners | `src/content/guides/ato-tax-debt-finance-for-australian-business-owners.md` |
| 25 | `/resources/guides/balloon-payment-refinance-for-equipment-and-asset-finance` | Balloon Payment Refinance for Equipment and Asset Finance | `src/content/guides/balloon-payment-refinance-for-equipment-and-asset-finance.md` |
| 26 | `/resources/guides/bridging-finance-australia-complete-property-guide` | Bridging Loans and Bridging Finance Australia Guide | `src/content/guides/bridging-finance-australia-complete-property-guide.md` |
| 27 | `/resources/guides/bridging-finance-developers-project-funding-solutions` | Bridging Finance for Developers: Project Funding Solutions | `src/content/guides/bridging-finance-developers-project-funding-solutions.md` |
| 28 | `/resources/guides/bridging-finance-melbourne-fast-property-solutions` | Bridging Finance Melbourne: Fast Property Solutions | `src/content/guides/bridging-finance-melbourne-fast-property-solutions.md` |
| 29 | `/resources/guides/bridging-finance-sydney-48-hour-settlement-possible` | Bridging Finance Sydney: Is 48-Hour Settlement Really Possible for Commercial Borrowers? | `src/content/guides/bridging-finance-sydney-48-hour-settlement-possible.md` |
| 30 | `/resources/guides/bridging-loan-exit-strategies-plan-your-repayment-path` | Bridging Loan Exit Strategies: Plan Your Repayment Path | `src/content/guides/bridging-loan-exit-strategies-plan-your-repayment-path.md` |
| 31 | `/resources/guides/bridging-loan-repayment-calculator` | Bridging Loan Repayment Calculator | `src/content/guides/bridging-loan-repayment-calculator.md` |
| 32 | `/resources/guides/building-development-loans-funding-guide` | Building Development Loans: Complete Funding Guide for Developers | `src/content/guides/building-development-loans-funding-guide.md` |
| 33 | `/resources/guides/business-acquisition-finance-australia` | A Guide to Business Acquisition Finance in Australia | `src/content/guides/business-acquisition-finance-australia.md` |
| 34 | `/resources/guides/business-debt-consolidation-australia` | A Guide to Business Debt Consolidation in Australia | `src/content/guides/business-debt-consolidation-australia.md` |
| 35 | `/resources/guides/business-loans-secured-by-residential-property-in-australia` | Business Loans Secured by Residential Property in Australia | `src/content/guides/business-loans-secured-by-residential-property-in-australia.md` |
| 36 | `/resources/guides/can-a-caveat-loan-stop-a-mortgagee-sale-in-australia` | Can a Caveat Loan Stop a Mortgagee Sale in Australia? | `src/content/guides/can-a-caveat-loan-stop-a-mortgagee-sale-in-australia.md` |
| 37 | `/resources/guides/can-i-use-a-second-mortgage-to-buy-investment-property` | Can I Use a Second Mortgage to Buy Investment Property? | `src/content/guides/can-i-use-a-second-mortgage-to-buy-investment-property.md` |
| 38 | `/resources/guides/case-study-developers-first-project-funding-success` | Case Study: Developer's First Project Funding Success | `src/content/guides/case-study-developers-first-project-funding-success.md` |
| 39 | `/resources/guides/caveat-loan-application-rejected-what-to-do-next` | Caveat Loan Application Rejected? What to Do Next | `src/content/guides/caveat-loan-application-rejected-what-to-do-next.md` |
| 40 | `/resources/guides/caveat-loan-emergency-business-funding` | Caveat Loans for Business Emergencies: Tax Debt & Cash Flow | `src/content/guides/caveat-loan-emergency-business-funding.md` |
| 41 | `/resources/guides/caveat-loan-exit-strategies-how-to-repay-or-refinance` | Caveat Loan Exit Strategies: How to Repay or Refinance | `src/content/guides/caveat-loan-exit-strategies-how-to-repay-or-refinance.md` |
| 42 | `/resources/guides/caveat-loan-prevented-business-closure-tax-debt-case-study` | Case Study: Caveat Loan Prevented Business Closure After Tax Debt Pressure | `src/content/guides/caveat-loan-prevented-business-closure-tax-debt-case-study.md` |
| 43 | `/resources/guides/caveat-loan-rejected-heres-what-to-do-next` | Caveat Loan Application Rejected? Here's What to Do Next | `src/content/guides/caveat-loan-rejected-heres-what-to-do-next.md` |
| 44 | `/resources/guides/caveat-loans-australia-complete-guide` | Caveat Loans Australia: Business Funding Guide | `src/content/guides/caveat-loans-australia-complete-guide.md` |
| 45 | `/resources/guides/caveat-loans-for-property-settlement-bridge-your-purchase` | Caveat Loans for Property Settlement: Bridge Your Purchase | `src/content/guides/caveat-loans-for-property-settlement-bridge-your-purchase.md` |
| 46 | `/resources/guides/commercial-bridging-loans-for-property-auctions-expert-guide` | Commercial Bridging Loans for Property Auctions in Australia | `src/content/guides/commercial-bridging-loans-for-property-auctions-expert-guide.md` |
| 47 | `/resources/guides/commercial-land-loans-financing-property-development` | Commercial Land Loans: Finance Your Property Development | `src/content/guides/commercial-land-loans-financing-property-development.md` |
| 48 | `/resources/guides/commercial-loan-refinance` | Commercial Loan Refinance: When Business Borrowers Should Rework Existing Debt | `src/content/guides/commercial-loan-refinance.md` |
| 49 | `/resources/guides/commercial-property-development-finance` | Commercial Property Development Finance: A Complete Guide | `src/content/guides/commercial-property-development-finance.md` |
| 50 | `/resources/guides/commercial-property-due-diligence-finance-checklist` | Commercial Property Due Diligence: Finance Checklist | `src/content/guides/commercial-property-due-diligence-finance-checklist.md` |
| 51 | `/resources/guides/commercial-property-finance-melbourne-local-expert-hub` | Commercial Property Finance Melbourne: Local Expert Hub | `src/content/guides/commercial-property-finance-melbourne-local-expert-hub.md` |
| 52 | `/resources/guides/commercial-property-finance-sydney` | Commercial Property Finance Sydney: What Business Borrowers Need to Know | `src/content/guides/commercial-property-finance-sydney.md` |
| 53 | `/resources/guides/commercial-property-finance-sydney-local-expert-hub` | Commercial Property Finance Sydney: Local Expert Hub | `src/content/guides/commercial-property-finance-sydney-local-expert-hub.md` |
| 54 | `/resources/guides/commercial-property-loan-deposits-how-much-do-you-need` | Commercial Property Loan Deposits in Australia: How Much Do You Need? | `src/content/guides/commercial-property-loan-deposits-how-much-do-you-need.md` |
| 55 | `/resources/guides/commercial-property-loan-retail-spaces-guide` | Commercial Property Loans for Retail Spaces: 2025 Guide | `src/content/guides/commercial-property-loan-retail-spaces-guide.md` |
| 56 | `/resources/guides/commercial-property-loans-australia-complete-guide` | Commercial Property Loans in Australia: The Complete Guide | `src/content/guides/commercial-property-loans-australia-complete-guide.md` |
| 57 | `/resources/guides/commercial-property-loans-for-immigrants-expats-australia` | Commercial Property Loans for Immigrants & Expats in Australia | `src/content/guides/commercial-property-loans-for-immigrants-expats-australia.md` |
| 58 | `/resources/guides/commercial-property-loans-for-startups-first-time-buyers` | Commercial Property Loans for Startups: First-Time Buyers | `src/content/guides/commercial-property-loans-for-startups-first-time-buyers.md` |
| 59 | `/resources/guides/commercial-property-lvr-explained-maximise-your-borrowing` | Commercial Property LVR Explained: Maximise Your Borrowing | `src/content/guides/commercial-property-lvr-explained-maximise-your-borrowing.md` |
| 60 | `/resources/guides/commercial-property-refinancing-solutions` | Commercial Property Refinancing Solutions in Australia | `src/content/guides/commercial-property-refinancing-solutions.md` |
| 61 | `/resources/guides/commercial-property-settlement-process-finance-timeline` | Commercial Property Settlement Process: Finance Timeline | `src/content/guides/commercial-property-settlement-process-finance-timeline.md` |
| 62 | `/resources/guides/construction-completion-finance-in-australia-funding-a-project-that-has-stalled` | Construction Completion Finance in Australia: Funding a Project That Has Stalled | `src/content/guides/construction-completion-finance-in-australia-funding-a-project-that-has-stalled.md` |
| 63 | `/resources/guides/construction-finance-australia-complete-guide` | Construction Finance in Australia: The Complete Guide for Commercial Builds | `src/content/guides/construction-finance-australia-complete-guide.md` |
| 64 | `/resources/guides/debtor-finance-supply-chain-finance-australia` | Debtor Finance & Supply Chain Finance in Australia: The Complete Guide | `src/content/guides/debtor-finance-supply-chain-finance-australia.md` |
| 65 | `/resources/guides/director-penalty-notice-finance-in-australia-funding-options-before-the-21-day-deadline` | Director Penalty Notice Finance in Australia: Funding Options Before the 21-Day Deadline | `src/content/guides/director-penalty-notice-finance-in-australia-funding-options-before-the-21-day-deadline.md` |
| 66 | `/resources/guides/equipment-finance-and-leasing-australia` | Equipment Finance and Leasing for Australian Businesses | `src/content/guides/equipment-finance-and-leasing-australia.md` |
| 67 | `/resources/guides/fast-commercial-property-loans-for-urgent-settlement-in-australia` | Fast Commercial Property Loans for Urgent Settlement in Australia | `src/content/guides/fast-commercial-property-loans-for-urgent-settlement-in-australia.md` |
| 68 | `/resources/guides/first-mortgage-loans-primary-property-finance` | First Mortgage Loans: Understanding Primary Property Finance | `src/content/guides/first-mortgage-loans-primary-property-finance.md` |
| 69 | `/resources/guides/franchise-acquisition-finance-in-australia-buying-an-existing-franchise-business` | Franchise Acquisition Finance in Australia: Buying an Existing Franchise Business | `src/content/guides/franchise-acquisition-finance-in-australia-buying-an-existing-franchise-business.md` |
| 70 | `/resources/guides/gst-loan-for-commercial-property-settlement-in-australia` | GST Loan for Commercial Property Settlement in Australia | `src/content/guides/gst-loan-for-commercial-property-settlement-in-australia.md` |
| 71 | `/resources/guides/guarantor-requirements-for-commercial-property-loans` | Guarantor Requirements for Commercial Property Loans in Australia | `src/content/guides/guarantor-requirements-for-commercial-property-loans.md` |
| 72 | `/resources/guides/hospitality-fitout-finance-in-australia-funding-cafes-restaurants-and-venues` | Hospitality Fitout Finance in Australia: Funding Cafes, Restaurants and Venues | `src/content/guides/hospitality-fitout-finance-in-australia-funding-cafes-restaurants-and-venues.md` |
| 73 | `/resources/guides/hospitality-property-finance-restaurants-hotels-venues` | Hospitality Property Finance: Restaurants, Hotels & Venues | `src/content/guides/hospitality-property-finance-restaurants-hotels-venues.md` |
| 74 | `/resources/guides/how-to-buy-commercial-property-step-by-step-guide` | How to Buy Commercial Property: Step-by-Step Guide [2025] | `src/content/guides/how-to-buy-commercial-property-step-by-step-guide.md` |
| 75 | `/resources/guides/how-to-remove-a-caveat-from-property-title-step-by-step` | How to Remove a Caveat from Property Title in Australia: A Step-by-Step Guide for Commercial Borrowers | `src/content/guides/how-to-remove-a-caveat-from-property-title-step-by-step.md` |
| 76 | `/resources/guides/import-gst-and-customs-duty-finance-for-australian-businesses` | Import GST and Customs Duty Finance for Australian Businesses | `src/content/guides/import-gst-and-customs-duty-finance-for-australian-businesses.md` |
| 77 | `/resources/guides/industrial-property-finance-warehouses-manufacturing` | Industrial Property Finance: Warehouses & Manufacturing | `src/content/guides/industrial-property-finance-warehouses-manufacturing.md` |
| 78 | `/resources/guides/inventory-finance-in-australia-funding-stock-without-killing-cash-flow` | Inventory Finance in Australia: Funding Stock Without Killing Cash Flow | `src/content/guides/inventory-finance-in-australia-funding-stock-without-killing-cash-flow.md` |
| 79 | `/resources/guides/invoice-finance-australia-complete-guide` | Invoice Finance in Australia: The Complete Guide for Business Cash Flow | `src/content/guides/invoice-finance-australia-complete-guide.md` |
| 80 | `/resources/guides/land-tax-debt-finance-in-australia-options-before-caveats-or-enforcement` | Land Tax Debt Finance in Australia: Options Before Caveats or Enforcement | `src/content/guides/land-tax-debt-finance-in-australia-options-before-caveats-or-enforcement.md` |
| 81 | `/resources/guides/line-of-credit-equity` | Line of Credit Equity: How Business Borrowers Use Property Equity | `src/content/guides/line-of-credit-equity.md` |
| 82 | `/resources/guides/low-doc-business-finance` | Low Doc Business Finance in Australia | `src/content/guides/low-doc-business-finance.md` |
| 83 | `/resources/guides/medical-fitout-finance-in-australia-funding-clinics-dental-practices-and-specialist-rooms` | Medical Fitout Finance in Australia: Funding Clinics, Dental Practices and Specialist Rooms | `src/content/guides/medical-fitout-finance-in-australia-funding-clinics-dental-practices-and-specialist-rooms.md` |
| 84 | `/resources/guides/negative-gearing-commercial-property-tax-strategies` | Negative Gearing Commercial Property: Tax Strategies | `src/content/guides/negative-gearing-commercial-property-tax-strategies.md` |
| 85 | `/resources/guides/no-doc-abn-loans` | No Doc ABN Loans in Australia | `src/content/guides/no-doc-abn-loans.md` |
| 86 | `/resources/guides/office-property-loans-financing-commercial-workspace` | Office Property Loans: Financing Your Commercial Workspace | `src/content/guides/office-property-loans-financing-commercial-workspace.md` |
| 87 | `/resources/guides/owner-occupier-commercial-loans-buy-your-business-premises` | Owner-Occupier Commercial Loans: Buy Your Business Premises | `src/content/guides/owner-occupier-commercial-loans-buy-your-business-premises.md` |
| 88 | `/resources/guides/pharmacy-acquisition-finance-in-australia-buying-or-expanding-a-pharmacy` | Pharmacy Acquisition Finance in Australia: Buying or Expanding a Pharmacy | `src/content/guides/pharmacy-acquisition-finance-in-australia-buying-or-expanding-a-pharmacy.md` |
| 89 | `/resources/guides/ppsr-security-for-business-loans-what-borrowers-need-to-know` | PPSR Security for Business Loans: What Borrowers Need to Know | `src/content/guides/ppsr-security-for-business-loans-what-borrowers-need-to-know.md` |
| 90 | `/resources/guides/private-lenders-for-land-loans-alternative-financing` | Private Lenders for Land Loans: Alternative Finance Options | `src/content/guides/private-lenders-for-land-loans-alternative-financing.md` |
| 91 | `/resources/guides/private-real-estate-investment-lenders-guide` | Private Real Estate Investment Lenders: Investor Guide 2025 | `src/content/guides/private-real-estate-investment-lenders-guide.md` |
| 92 | `/resources/guides/progress-claim-finance-for-stalled-fitouts-and-construction-projects-in-australia` | Progress Claim Finance for Stalled Fitouts and Construction Projects in Australia | `src/content/guides/progress-claim-finance-for-stalled-fitouts-and-construction-projects-in-australia.md` |
| 93 | `/resources/guides/property-development-loans-complete-funding-guide` | Property Development Loans: Complete Funding Guide | `src/content/guides/property-development-loans-complete-funding-guide.md` |
| 94 | `/resources/guides/quick-caveat-loans-48-hour-settlement-possible` | Quick Caveat Loans: What Affects Fast Settlement? | `src/content/guides/quick-caveat-loans-48-hour-settlement-possible.md` |
| 95 | `/resources/guides/rent-roll-finance-in-australia-funding-real-estate-agency-acquisitions` | Rent Roll Finance in Australia: Funding Real Estate Agency Acquisitions | `src/content/guides/rent-roll-finance-in-australia-funding-real-estate-agency-acquisitions.md` |
| 96 | `/resources/guides/residual-stock-loans-in-australia-how-developers-can-unlock-capital-from-unsold-stock` | Residual Stock Loans in Australia: How Developers Can Unlock Capital from Unsold Stock | `src/content/guides/residual-stock-loans-in-australia-how-developers-can-unlock-capital-from-unsold-stock.md` |
| 97 | `/resources/guides/restaurant-expansion-second-mortgage-case-study` | Case Study: Restaurant Expansion with a Second Mortgage | `src/content/guides/restaurant-expansion-second-mortgage-case-study.md` |
| 98 | `/resources/guides/seasonal-stock-finance-in-australia-funding-inventory-before-peak-trading-periods` | Seasonal Stock Finance in Australia: Funding Inventory Before Peak Trading Periods | `src/content/guides/seasonal-stock-finance-in-australia-funding-inventory-before-peak-trading-periods.md` |
| 99 | `/resources/guides/second-mortgage-bad-credit-qualify` | Second Mortgage with Bad Credit: Can You Still Qualify? | `src/content/guides/second-mortgage-bad-credit-qualify.md` |
| 100 | `/resources/guides/second-mortgage-for-divorce-settlement-property-division` | Second Mortgage for Divorce Settlement: How Business Owners Handle Property Division | `src/content/guides/second-mortgage-for-divorce-settlement-property-division.md` |
| 101 | `/resources/guides/second-mortgage-loan-equity-access-strategies` | Second Mortgage Loans: Unlock Your Property's Hidden Equity | `src/content/guides/second-mortgage-loan-equity-access-strategies.md` |
| 102 | `/resources/guides/second-mortgage-partnership-buyout-financing-transitions` | Second Mortgage for Partnership Buyout: Financing Transitions | `src/content/guides/second-mortgage-partnership-buyout-financing-transitions.md` |
| 103 | `/resources/guides/second-mortgage-without-refinancing-your-first-mortgage-in-australia` | Second Mortgage Without Refinancing Your First Mortgage in Australia | `src/content/guides/second-mortgage-without-refinancing-your-first-mortgage-in-australia.md` |
| 104 | `/resources/guides/second-mortgages-for-business-guide` | Second Mortgages for Business in Australia: Complete Guide | `src/content/guides/second-mortgages-for-business-guide.md` |
| 105 | `/resources/guides/second-mortgages-in-sydney-fast-local-approval` | Second Mortgages in Sydney: Fast Commercial Property Finance for Business Borrowers | `src/content/guides/second-mortgages-in-sydney-fast-local-approval.md` |
| 106 | `/resources/guides/settlement-shortfall-finance-in-australia-what-to-do-when-funds-are-short-before-settlement` | Settlement Shortfall Finance in Australia: What to Do When Funds Are Short Before Settlement | `src/content/guides/settlement-shortfall-finance-in-australia-what-to-do-when-funds-are-short-before-settlement.md` |
| 107 | `/resources/guides/short-term-private-lenders-fast-business-finance-solutions` | Short-Term Private Lenders: Fast Business Finance Solutions | `src/content/guides/short-term-private-lenders-fast-business-finance-solutions.md` |
| 108 | `/resources/guides/short-term-property-loans-when-you-need-fast-finance` | Short-Term Property Loans: When You Need Fast Finance | `src/content/guides/short-term-property-loans-when-you-need-fast-finance.md` |
| 109 | `/resources/guides/smsf-loans-for-commercial-property` | SMSF Loans for Commercial Property: The Complete Guide | `src/content/guides/smsf-loans-for-commercial-property.md` |
| 110 | `/resources/guides/swing-loans-explained-seamless-property-transitions` | Swing Loans Explained: Seamless Property Transitions | `src/content/guides/swing-loans-explained-seamless-property-transitions.md` |
| 111 | `/resources/guides/trade-finance-in-australia-how-it-helps-businesses-manage-imports` | Trade Finance in Australia: The Complete Guide for Business Imports and Exports | `src/content/guides/trade-finance-in-australia-how-it-helps-businesses-manage-imports.md` |
| 112 | `/resources/guides/unsecured-private-lenders-for-business-growth` | Unsecured Private Lenders for Business Growth | `src/content/guides/unsecured-private-lenders-for-business-growth.md` |
| 113 | `/resources/guides/urgent-caveat-loans` | Urgent Caveat Loans Australia Guide | `src/content/guides/urgent-caveat-loans.md` |
| 114 | `/resources/guides/what-is-a-caveatable-interest` | What Is a Caveatable Interest? Legal Guide for Business Borrowers | `src/content/guides/what-is-a-caveatable-interest.md` |
| 115 | `/resources/guides/what-is-asset-backed-lending-australia` | What Is Asset-Backed Lending in Australia? | `src/content/guides/what-is-asset-backed-lending-australia.md` |
| 116 | `/resources/guides/what-is-private-lending-australia` | What is Private Lending? A Guide for Australian Businesses | `src/content/guides/what-is-private-lending-australia.md` |
| 117 | `/resources/guides/when-second-mortgages-make-financial-sense-smes` | When Second Mortgages Make Financial Sense for SMEs | `src/content/guides/when-second-mortgages-make-financial-sense-smes.md` |
| 118 | `/resources/guides/working-capital-loans-for-smes` | Working Capital Loans: A Guide for Australian SMEs | `src/content/guides/working-capital-loans-for-smes.md` |
