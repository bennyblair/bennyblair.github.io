# Caveat retirement structural sweep receipt

Branch: `cursor/retire-caveat-loans-7710`.
Scope: FAIL 91 independent re-review of `c3415043`.
Rule: Emet Capital is a commercial finance broker, never a lender. Educational caveat guides may stay. Emet must not compare, frame, suggest, fall back to, or invite caveat loans, caveat finance, caveat structures, caveat-backed or caveat-led funding as a current option. Current options Emet may discuss: first and second mortgages, bridging finance, private lending, commercial property finance, refinance.

## Method

1. List every markdown heading in `src/content` whose title matches Emet Capital, `we`, `our`, `us`, how we help, triage, frames, or broker (acting for the reader). Result: **221 headings**. Every paragraph in those sections was read.
2. List every paragraph anywhere in `src/content` that contains `caveat` in the same paragraph as Emet, we, our, us, broker, or compare. Result on `origin/main`: **166 paragraphs**. After this pass: **109 remaining**, all classified KEEP.
3. Rewrite a hit only where Emet (or broker voice representing Emet) invites caveat as a current option. Neutral market education stays.
4. Leave the 11 protected-cohort files' `author_bio` fields unchanged. Report any body issue rather than break the gate.
5. No em dashes in new copy. Existing related-guide list delimiters (`—`) were kept.
6. Remaps are finite exact strings in `RETIRED_CAVEAT_PRODUCT_REPLACEMENTS` plus the `Our [caveat` possessive remap, then `applyRetiredCaveatProductCopy` from `origin/main`. Protected-cohort files were restored from HEAD after apply.

## Counts

| Measure | Count |
|---|---|
| Actor headings scanned | 221 |
| Actor headings whose body mentioned caveat on origin/main | 40 |
| Actor headings rewritten this pass | 11 |
| Actor headings already rewritten earlier in this PR (FAIL 86) | 17 |
| Actor headings kept (educational / title-fact) | 12 |
| Actor headings with no caveat in the body | 181 |
| Caveat+actor paragraphs on origin/main | 166 |
| Sentence / blurb hits rewritten this pass | 20 |
| Remaining caveat+actor paragraphs after this pass | 109 |
| Protected-cohort files left unchanged | 11 |
| Content files changed vs HEAD (`c3415043`) | 18 |

The 20 rewrites are the 9 FAIL 91 listed sentences plus 11 additional structural hits (same-section follow-on, heading bodies, related-guide blurbs, and `our` / `Our` caveat-guide possessives).

## Rewritten hits (before / after)

Decision for every row below: **REWRITE**. Emet or the broker voice representing Emet compared, framed, suggested, fell back to, or invited caveat funding.

### FAIL91-1: `src/content/guides/short-term-caveat-loans-australia.md:108`

Heading / location: How Emet Capital Frames the Decision

- Before: If those answers are clear, a short-term caveat loan may be worth comparing.
- After: If those answers are clear, a second mortgage, bridging finance, or private lending facility may be worth comparing.

### FAIL91-1b: `src/content/guides/short-term-caveat-loans-australia.md:112`

Heading / location: How Emet Capital Frames the Decision

- Before: A good broker also tests alternatives. Sometimes the better structure is a [second mortgage](...), [private lending](...), asset-backed facility, or negotiated extension rather than a caveat loan.
- After: A good broker also tests alternatives. Sometimes the better structure is a [second mortgage](...), [private lending](...), asset-backed facility, or negotiated extension.

### FAIL91-2: `src/content/guides/loss-carry-back-business-finance-australia-2026.md:126`

Heading / location: How Emet Capital Would Frame the Scenario

- Before: If the business owns property and the deadline is compressed, a caveat loan, second mortgage, or short-term private lending structure may be considered.
- After: If the business owns property and the deadline is compressed, a second mortgage, bridging finance, or short-term private lending structure may be considered.

### FAIL91-3: `src/content/guides/first-mortgagee-consent-delay-caveat-loan-vs-second-mortgage.md:197`

Heading / location: How Emet Capital Frames the Comparison

- Before: Third, check whether a caveat fallback is legally and commercially possible.
- After: Third, check whether refinance, a different security property, or private lending is workable.

### FAIL91-4: `src/content/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you.md:168`

Heading / location: How Emet Capital Helps Borrowers Compare the Options

- Before: In some cases, that may be [urgent caveat finance](/resources/guides/urgent-caveat-loans). In others, it may be [second mortgage finance]... [bridging finance]... [private lending]... or [commercial property finance]...
- After: That may be [second mortgage finance](/services/first-second-mortgages), [bridging finance](/services/bridging-finance), [private lending](/services/private-lending), or [commercial property finance](/services/commercial-property-finance).

### FAIL91-5: `src/content/guides/caveat-loans-for-property-settlement-bridge-your-purchase.md:160`

Heading / location: How Emet Capital Helps

- Before: The goal is not to force every urgent file into a caveat loan.
- After: The goal is not to force every urgent file into one product label.

### FAIL91-6: `src/content/guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md:110`

Heading / location: How Emet Capital Triage Works

- Before: A borrower with strong equity and a two-week deadline may suit a caveat-led approach.
- After: A borrower with strong equity and a two-week deadline may need a short-term property-secured facility such as bridging finance or a second mortgage.

### FAIL91-7: `src/content/guides/private-lending-mortgage.md:149`

Heading / location: Related Guides (editorial blurb)

- Before: **[Caveat Loans Australia Complete Guide]** — compare a caveat structure where timing is urgent.
- After: **[Caveat Loans Australia Complete Guide]** — educational guide to how caveat lending works in the Australian market.

### FAIL91-8: `src/content/guides/private-mortgage-loans-for-commercial-borrowers.md:164`

Heading / location: Related Guides (editorial blurb)

- Before: **[Caveat Loans Australia]** — compare faster caveat-backed funding where urgency is high.
- After: **[Caveat Loans Australia]** — educational guide to how caveat lending works in the Australian market.

### FAIL91-9: `src/content/guides/second-mortgage-lender-document-checklist-from-broker-files.md:31`

Heading / location: Related Guides (editorial blurb)

- Before: **[Caveat Loan vs Second Mortgage]** — compare urgent caveat finance with a registered second mortgage.
- After: **[Caveat Loan vs Second Mortgage]** — educational comparison of caveat security and registered second mortgages.

### STRUCT-1: `src/content/guides/commercial-mortgage-broker-regional-property-finance.md:89`

Heading / location: When To Use a Commercial Mortgage Broker

- Before: a [second mortgage], [caveat loan], or [bridging finance] may need to be compared against a full refinance.
- After: a [second mortgage] or [bridging finance] may need to be compared against a full refinance.

### STRUCT-2: `src/content/guides/private-credit-broker-vs-direct-private-credit-fund-australia.md:76`

Heading / location: When a Private Credit Broker Adds Value

- Before: comparing [private lending], a [second mortgage], a caveat-backed facility, or a short-term commercial property refinance.
- After: comparing [private lending], a [second mortgage], or a short-term commercial property refinance.

### STRUCT-3: `src/content/guides/private-credit-broker-vs-direct-private-credit-fund-australia.md:132`

Heading / location: When Not to Use a Broker (paragraph still broker-voice)

- Before: If the borrower is comparing [commercial property refinancing], [caveat loans], and second mortgages at the same time
- After: If the borrower is comparing [commercial property refinancing] and second mortgages at the same time

### STRUCT-4: `src/content/guides/private-mortgage-lending.md:121`

Heading / location: How Emet Capital Frames the Decision

- Before: A first mortgage, second mortgage, caveat, commercial property refinance, or asset-backed facility can all sit in different risk positions.
- After: A first mortgage, second mortgage, commercial property refinance, or asset-backed facility can all sit in different risk positions.

### STRUCT-5: `src/content/guides/caveat-loan-broker-take-on-valuation-delays.md:115`

Heading / location: How Emet Capital Frames The Decision

- Before: A strong caveat file does not rely on urgency alone.
- After: A strong short-term property-secured file does not rely on urgency alone.

### STRUCT-6: `src/content/guides/ato-gic-is-no-longer-deductible-should-businesses-refinance-tax-debt.md:115`

Heading / location: paragraph uses Our + caveat guide

- Before: Our [caveat loans guide](...) explains the mechanics.
- After: The [caveat loans guide](...) explains the mechanics.

### STRUCT-7: `src/content/guides/how-to-remove-a-caveat-from-property-title-step-by-step.md:60`

Heading / location: paragraph uses our guide to caveat loans

- Before: start with our guide to [caveat loans in Australia](...).
- After: start with the [caveat loans in Australia](...) guide.

### STRUCT-8: `src/content/guides/capital-stack-commercial-property-finance-case-example.md:111`

Heading / location: Broker View: What Lenders Want To See

- Before: Is any second mortgage, caveat, or mezzanine layer proposed?
- After: Is any second mortgage or mezzanine layer proposed?

### STRUCT-9: `src/content/guides/second-mortgages-for-business-guide.md:244`

Heading / location: Related Guides (editorial blurb)

- Before: **[Caveat Loan vs Second Mortgage]** — compare urgent caveat funding with structured second mortgage finance.
- After: **[Caveat Loan vs Second Mortgage]** — educational comparison of caveat security and registered second mortgages.

### STRUCT-10: `src/content/guides/second-mortgage-application-checklist-australia.md:36`

Heading / location: Related Guides (editorial blurb)

- Before: **[Caveat Loan vs Second Mortgage]** — when a caveat loan may be considered instead.
- After: **[Caveat Loan vs Second Mortgage]** — educational comparison of caveat security and registered second mortgages.

## Actor headings whose body mentioned caveat (40 on origin/main)

These are the only actor-headed sections that mentioned caveat. The other 181 actor headings had no caveat in the section body and are KEEP.

| File | Line | Heading | Decision |
|---|---|---|---|
| `guides/bridging-finance-auction-settlement-case-study.md` | 120 | How Emet Capital Frames Auction Settlement Files | REWRITE earlier in PR |
| `guides/bridging-finance-melbourne-fast-property-solutions.md` | 113 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/business-loans-secured-by-residential-property-in-australia.md` | 148 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/capital-stack-commercial-property-finance-case-example.md` | 102 | Broker View: What Lenders Want To See | REWRITE this pass |
| `guides/caveat-lenders-australia-directory-comparison.md` | 76 | Comparing written terms, not a broker pitch | KEEP educational / title-fact |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 71 | What A Broker Should Check Before Submission | KEEP educational / title-fact |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 111 | How Emet Capital Frames The Decision | REWRITE this pass |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 145 | What is the main broker lesson on valuation delays? | KEEP educational / title-fact |
| `guides/caveat-loan-vs-second-mortgage-which-is-right-for-you.md` | 164 | How Emet Capital Helps Borrowers Compare the Options | REWRITE this pass |
| `guides/caveat-loans-for-property-settlement-bridge-your-purchase.md` | 156 | How Emet Capital Helps | REWRITE this pass |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 106 | How Emet Capital Triage Works | REWRITE this pass |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 85 | When To Use a Commercial Mortgage Broker | REWRITE this pass |
| `guides/commercial-real-estate-lenders-australia-directory.md` | 119 | Emet Capital | REWRITE earlier in PR |
| `guides/fast-commercial-property-loans-for-urgent-settlement-in-australia.md` | 178 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/fast-commercial-property-loans-for-urgent-settlement-in-australia.md` | 210 | Can Emet Capital help after a bank decline? | REWRITE earlier in PR |
| `guides/find-caveat-loan-brokers-australia.md` | 43 | What a caveat loan broker actually does | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 51 | How a broker works a caveat file | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 65 | Broker-selection scorecard | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 87 | Questions to ask before appointing a broker | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 100 | What the broker should request from you | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 130 | How Emet Capital works as a broker | KEEP educational / title-fact |
| `guides/first-mortgagee-consent-delay-caveat-loan-vs-second-mortgage.md` | 193 | How Emet Capital Frames the Comparison | REWRITE this pass |
| `guides/getting-a-second-mortgage.md` | 125 | How Emet Capital Helps Compare Options | REWRITE earlier in PR |
| `guides/land-tax-debt-finance-in-australia-options-before-caveats-or-enforcement.md` | 154 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/loss-carry-back-business-finance-australia-2026.md` | 122 | How Emet Capital Would Frame the Scenario | REWRITE this pass |
| `guides/private-commercial-loans-after-bank-decline.md` | 95 | How Emet Capital Frames the Options | REWRITE earlier in PR |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 72 | When a Private Credit Broker Adds Value | REWRITE this pass |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 181 | Can Emet Capital help compare broker-led and direct private credit options? | REWRITE earlier in PR |
| `guides/private-debt-australia.md` | 160 | How Emet Capital Helps Compare Private Debt Options | REWRITE earlier in PR |
| `guides/private-lending-bank-decline-case-study.md` | 189 | How does Emet Capital help bank-declined borrowers? | REWRITE earlier in PR |
| `guides/private-mortgage-lending.md` | 117 | How Emet Capital Frames the Decision | REWRITE this pass |
| `guides/private-mortgage-loans-for-commercial-borrowers.md` | 114 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/property-development-mortgage-australia.md` | 114 | How Emet Capital Frames the Decision | KEEP educational / title-fact |
| `guides/second-mortgage-application-checklist-australia.md` | 128 | Broker Preparation Checklist | KEEP educational / title-fact |
| `guides/second-mortgage-lender-document-checklist-from-broker-files.md` | 201 | How does Emet Capital help with second mortgage documents? | REWRITE earlier in PR |
| `guides/second-mortgage-without-refinancing-your-first-mortgage-in-australia.md` | 201 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/settlement-shortfall-finance-in-australia-what-to-do-when-funds-are-short-before-settlement.md` | 160 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/short-term-caveat-loans-australia.md` | 106 | How Emet Capital Frames the Decision | REWRITE this pass |
| `guides/urgent-caveat-loan-settlement-shortfall-case-study.md` | 98 | Broker Takeaway: The File Needed a Decision Map | KEEP educational / title-fact |
| `guides/what-is-a-second-mortgage.md` | 162 | How Emet Capital Helps | REWRITE earlier in PR |

### KEEP educational / title-fact notes

- `find-caveat-loan-brokers-australia.md` How Emet Capital works as a broker: states Emet is a broker, not a lender, and **does not fund caveat loans**. KEEP.
- `property-development-mortgage-australia.md` How Emet Capital Frames the Decision: existing mortgages and caveats as title facts in a capital stack, not a product invitation. KEEP.
- `second-mortgage-application-checklist-australia.md` Broker Preparation Checklist: existing caveats on title as a document fact. KEEP.
- `urgent-caveat-loan-settlement-shortfall-case-study.md` Broker Takeaway: educational case-study page describing how a decision map applies across market structures including caveat loans. Emet is not the actor inviting a caveat product. KEEP.
- Remaining find-caveat / caveat-broker / caveat-lenders headings: how-to education about caveat brokers and term sheets, not Emet selling caveat loans. KEEP.

## Full actor-heading inventory (221)

| File | Line | Heading | Decision |
|---|---|---|---|
| `guides/asset-backed-business-loans-using-equipment-and-receivables-in-australia.md` | 150 | How Emet Capital Helps | KEEP no caveat |
| `guides/asset-backed-business-loans-using-equipment-and-receivables-in-australia.md` | 182 | Can Emet Capital compare asset-backed and private lending options? | KEEP no caveat |
| `guides/asset-backed-lending-vs-unsecured-business-loans.md` | 151 | Can Emet Capital help compare both options? | KEEP no caveat |
| `guides/ato-debt-eofy-cash-flow-finance-gic-deductibility-change-australia.md` | 129 | How Emet Capital Would Compare the Options | KEEP no caveat |
| `guides/ato-payment-plan-refused-business-finance-options-australia.md` | 150 | Practical Broker View | KEEP no caveat |
| `guides/ato-payment-plan-vs-business-finance-australia.md` | 136 | How Emet Capital Looks at These Scenarios | KEEP no caveat |
| `guides/bad-credit-business-loans-for-commercial-borrowers.md` | 131 | Broker Checklist Before Applying | KEEP no caveat |
| `guides/bad-credit-business-loans-for-commercial-borrowers.md` | 170 | How does Emet Capital help commercial borrowers with credit issues? | KEEP no caveat |
| `guides/bank-vs-non-bank-commercial-lending-in-australia-which-borrowers-get-approved.md` | 192 | Does a broker matter more in bank vs non-bank deals? | KEEP no caveat |
| `guides/bas-debt-finance-for-australian-businesses.md` | 146 | Broker Checklist Before Applying | KEEP no caveat |
| `guides/bas-debt-finance-for-australian-businesses.md` | 173 | Can Emet Capital give BAS or tax advice? | KEEP no caveat |
| `guides/bas-debt-finance-for-australian-businesses.md` | 188 | How does Emet Capital help with BAS debt finance? | KEEP no caveat |
| `guides/best-bridging-loan-lenders-companies-2025.md` | 132 | What a bridging finance broker should add | KEEP no caveat |
| `guides/best-bridging-loan-lenders-companies-2025.md` | 164 | Should I apply directly or use a broker? | KEEP no caveat |
| `guides/bridging-finance-auction-settlement-case-study.md` | 112 | The Broker Lessons | KEEP no caveat |
| `guides/bridging-finance-auction-settlement-case-study.md` | 120 | How Emet Capital Frames Auction Settlement Files | REWRITE earlier in PR |
| `guides/bridging-finance-melbourne-fast-property-solutions.md` | 113 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/bridging-finance-subdivision-registration-delay-australia.md` | 153 | How Emet Capital Would Package the File | KEEP no caveat |
| `guides/bridging-loan-bank-delay-australia.md` | 130 | Can Emet Capital guarantee fast approval? | KEEP no caveat |
| `guides/bridging-loan-exit-strategy-broker-take.md` | 77 | The Broker Take: Exit Quality Beats Storytelling | KEEP no caveat |
| `guides/business-acquisition-finance-australia.md` | 256 | How Emet Capital Helps | KEEP no caveat |
| `guides/business-acquisition-finance-retiring-owner-succession.md` | 133 | How Emet Capital Helps Structure the File | KEEP no caveat |
| `guides/business-lenders-australia-comparison-broker-commentary.md` | 68 | Broker Commentary: The Six Questions That Decide Fit | KEEP no caveat |
| `guides/business-lenders-australia-comparison-broker-commentary.md` | 144 | Can a broker compare business lenders for me? | KEEP no caveat |
| `guides/business-lenders-australia-comparison-broker-commentary.md` | 150 | How does Emet Capital compare lender options? | KEEP no caveat |
| `guides/business-line-of-credit-australia.md` | 150 | Broker Checklist Before Applying | KEEP no caveat |
| `guides/business-line-of-credit-australia.md` | 189 | How does Emet Capital help with business line of credit options? | KEEP no caveat |
| `guides/business-loan-line-of-credit-australia.md` | 129 | Emet Capital's Practical View | KEEP no caveat |
| `guides/business-loan-terms-explained-australia.md` | 130 | How Emet Capital Reviews Loan Terms | KEEP no caveat |
| `guides/business-loans-for-startups-australia.md` | 157 | How Emet Capital Frames Startup Finance | KEEP no caveat |
| `guides/business-loans-for-startups-australia.md` | 185 | How can a broker help with startup business finance? | KEEP no caveat |
| `guides/business-loans-secured-by-residential-property-in-australia.md` | 148 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/business-overdraft-alternatives-australia.md` | 140 | How Emet Capital Frames the Decision | KEEP no caveat |
| `guides/business-overdraft-alternatives-australia.md` | 180 | Does Emet Capital provide financial advice? | KEEP no caveat |
| `guides/can-i-use-a-second-mortgage-to-buy-investment-property.md` | 203 | How Emet Capital Helps | KEEP no caveat |
| `guides/can-i-use-a-second-mortgage-to-buy-investment-property.md` | 239 | Can Emet Capital arrange second mortgage options? | KEEP no caveat |
| `guides/capital-stack-commercial-property-finance-case-example.md` | 102 | Broker View: What Lenders Want To See | REWRITE this pass |
| `guides/capital-stack-commercial-property-finance-case-example.md` | 153 | How does Emet Capital help with capital stack finance? | KEEP no caveat |
| `guides/case-study-developers-first-project-funding-success.md` | 219 | Can Emet Capital help prepare a development funding request? | KEEP no caveat |
| `guides/cashflow-facility-stack-in-australia-line-of-credit-vs-working-capital-loan-vs-invoice-finance.md` | 123 | How Emet Capital Helps | KEEP no caveat |
| `guides/cashflow-facility-stack-in-australia-line-of-credit-vs-working-capital-loan-vs-invoice-finance.md` | 155 | Can Emet Capital compare business cashflow facilities? | KEEP no caveat |
| `guides/caveat-lenders-australia-directory-comparison.md` | 76 | Comparing written terms, not a broker pitch | KEEP educational / title-fact |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 71 | What A Broker Should Check Before Submission | KEEP educational / title-fact |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 111 | How Emet Capital Frames The Decision | REWRITE this pass |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 145 | What is the main broker lesson on valuation delays? | KEEP educational / title-fact |
| `guides/caveat-loan-emergency-business-funding.md` | 37 | The emergency funding triage | KEEP no caveat |
| `guides/caveat-loan-eofy-tax-bill-unsold-development-stock-australia.md` | 158 | How Emet Capital Frames the File | KEEP no caveat |
| `guides/caveat-loan-exit-plan-after-bank-delay-case-study.md` | 116 | Broker Lessons From the Scenario | KEEP no caveat |
| `guides/caveat-loan-vs-second-mortgage-which-is-right-for-you.md` | 164 | How Emet Capital Helps Borrowers Compare the Options | REWRITE this pass |
| `guides/caveat-loans-for-property-settlement-bridge-your-purchase.md` | 156 | How Emet Capital Helps | REWRITE this pass |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 106 | How Emet Capital Triage Works | REWRITE this pass |
| `guides/childcare-centre-acquisition-finance-australia.md` | 168 | How Emet Capital Frames the Decision | KEEP no caveat |
| `guides/commercial-interest-only-period-ending-refinance-australia.md` | 129 | Discuss the upcoming change with Emet Capital | KEEP no caveat |
| `guides/commercial-interest-only-period-ending-refinance-australia.md` | 149 | What should I send a broker first? | KEEP no caveat |
| `guides/commercial-loan-maturity-refinance-australia.md` | 118 | How Emet Capital Assesses a Maturity Refinance File | KEEP no caveat |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 51 | What Does a Commercial Mortgage Broker Do for Regional Property Finance? | KEEP no caveat |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 77 | When a Broker Adds the Most Value | KEEP no caveat |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 85 | When To Use a Commercial Mortgage Broker | REWRITE this pass |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 91 | When Not To Use a Broker-Led Specialist Structure | KEEP no caveat |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 118 | Broker Selection Questions | KEEP no caveat |
| `guides/commercial-mortgage-broker-regional-property-finance.md` | 159 | What does a broker need before approaching lenders? | KEEP no caveat |
| `guides/commercial-mortgage-rates-australia-complete-guide.md` | 140 | Can a broker guarantee the final rate? | KEEP no caveat |
| `guides/commercial-property-equity-release-when-leases-have-expired-australia.md` | 126 | Practical Broker View | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 56 | Why Broker Selection Matters in Commercial Property Finance | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 120 | Red Flags When Choosing a Broker | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 134 | How do I choose a commercial property finance broker in Australia? | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 137 | What should a commercial property finance broker understand? | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 140 | Is a commercial property finance broker different from a home loan broker? | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 143 | Should a broker submit my file to many lenders at once? | KEEP no caveat |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 146 | What documents should I prepare before speaking with a broker? | KEEP no caveat |
| `guides/commercial-property-finance-rates-2025-comparison.md` | 103 | Do I need a broker to get the best rate? | KEEP no caveat |
| `guides/commercial-property-finance-short-wale-assets-australia.md` | 138 | Broker Checklist Before Applying | KEEP no caveat |
| `guides/commercial-property-finance-short-wale-assets-australia.md` | 177 | How does Emet Capital help with short-WALE commercial property finance? | KEEP no caveat |
| `guides/commercial-property-loan-after-bank-decline-non-bank-options-australia.md` | 142 | Broker Triage Checklist | KEEP no caveat |
| `guides/commercial-property-loan-after-bank-decline-non-bank-options-australia.md` | 182 | Does Emet Capital give financial advice after a declined loan? | KEEP no caveat |
| `guides/commercial-property-loan-deposit-shortfall-case-study.md` | 159 | How does Emet Capital help with deposit shortfalls? | KEEP no caveat |
| `guides/commercial-property-loan-eligibility-what-you-need-to-qualify.md` | 177 | How Emet Capital Helps | KEEP no caveat |
| `guides/commercial-property-lvr-explained-maximise-your-borrowing.md` | 161 | How Emet Capital Helps | KEEP no caveat |
| `guides/commercial-property-refinancing-solutions.md` | 163 | How Emet Capital Helps With Commercial Property Refinancing | KEEP no caveat |
| `guides/commercial-property-valuation-delay-case-study.md` | 92 | The Broker File That Helped | KEEP no caveat |
| `guides/commercial-property-valuation-delay-case-study.md` | 187 | How does Emet Capital help when valuation timing is tight? | KEEP no caveat |
| `guides/commercial-property-valuation-dispute-finance-options-australia.md` | 188 | Can Emet Capital help with valuation-related finance options? | KEEP no caveat |
| `guides/commercial-real-estate-lenders-australia-directory.md` | 119 | Emet Capital | REWRITE earlier in PR |
| `guides/commercial-rent-arrears-finance-australia.md` | 146 | How Emet Capital Reviews These Files | KEEP no caveat |
| `guides/construction-completion-finance-in-australia-funding-a-project-that-has-stalled.md` | 196 | How Emet Capital Looks at These Scenarios | KEEP no caveat |
| `guides/construction-retention-finance-for-builders-australia.md` | 132 | Broker Checklist Before Applying | KEEP no caveat |
| `guides/construction-retention-finance-for-builders-australia.md` | 171 | How does Emet Capital help with construction retention finance? | KEEP no caveat |
| `guides/container-demurrage-finance-australian-importers.md` | 162 | How Emet Capital Would Frame the File | KEEP no caveat |
| `guides/debtor-concentration-working-capital-finance-australia.md` | 140 | How Emet Capital Reviews These Files | KEEP no caveat |
| `guides/director-penalty-notice-finance-in-australia-funding-options-before-the-21-day-deadline.md` | 109 | How Emet Capital Frames the Funding Decision | KEEP no caveat |
| `guides/division-7a-loan-secured-by-real-property-business-finance.md` | 120 | Broker Checklist Before Applying For Finance | KEEP no caveat |
| `guides/division-7a-loan-secured-by-real-property-business-finance.md` | 147 | Can Emet Capital give Division 7A tax advice? | KEEP no caveat |
| `guides/eofy-working-capital-loans-before-30-june.md` | 108 | Broker File Example: EOFY Cash-Flow Gap | KEEP no caveat |
| `guides/eofy-working-capital-loans-before-30-june.md` | 161 | How can Emet Capital help with EOFY working capital finance? | KEEP no caveat |
| `guides/equipment-finance-balloon-payment-refinance-australia.md` | 114 | Broker Checklist Before the Balloon Is Due | KEEP no caveat |
| `guides/equipment-finance-balloon-payment-refinance-australia.md` | 154 | Does Emet Capital provide financial advice on residual payments? | KEEP no caveat |
| `guides/equipment-sale-and-leaseback-finance-australia.md` | 128 | How Emet Capital Packages Sale and Leaseback Files | KEEP no caveat |
| `guides/fast-commercial-property-loans-for-urgent-settlement-in-australia.md` | 178 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/fast-commercial-property-loans-for-urgent-settlement-in-australia.md` | 210 | Can Emet Capital help after a bank decline? | REWRITE earlier in PR |
| `guides/find-caveat-loan-brokers-australia.md` | 43 | What a caveat loan broker actually does | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 51 | How a broker works a caveat file | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 65 | Broker-selection scorecard | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 87 | Questions to ask before appointing a broker | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 100 | What the broker should request from you | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 115 | Compare the broker process, not just one term | KEEP no caveat |
| `guides/find-caveat-loan-brokers-australia.md` | 130 | How Emet Capital works as a broker | KEEP educational / title-fact |
| `guides/find-caveat-loan-brokers-australia.md` | 161 | What does a caveat loan broker do that a lender does not? | KEEP no caveat |
| `guides/find-caveat-loan-brokers-australia.md` | 165 | Does a specialist broker produce a better rate? | KEEP no caveat |
| `guides/find-caveat-loan-brokers-australia.md` | 173 | Can a broker confirm timing before valuation? | KEEP no caveat |
| `guides/find-caveat-loan-brokers-australia.md` | 177 | How do I start with a broker? | KEEP no caveat |
| `guides/first-mortgagee-consent-delay-caveat-loan-vs-second-mortgage.md` | 193 | How Emet Capital Frames the Comparison | REWRITE this pass |
| `guides/fitout-finance-landlord-contribution-delay-australia.md` | 163 | How Emet Capital Would Frame the Scenario | KEEP no caveat |
| `guides/foreign-exchange-timing-trade-finance-importers-australia.md` | 125 | Broker View: Match the Facility to the Cash Event | KEEP no caveat |
| `guides/franchise-fit-out-finance-australia.md` | 163 | How Emet Capital Would Compare the Options | KEEP no caveat |
| `guides/getting-a-second-mortgage.md` | 125 | How Emet Capital Helps Compare Options | REWRITE earlier in PR |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 48 | What a bridging loan broker should actually do | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 66 | Why broker fit matters in bridging finance | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 88 | Questions to ask a bridging loan broker before you commit | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 116 | Signs a bridging loan broker may be a good fit | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 172 | When a specialist bridging broker may matter most | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 188 | Mistakes borrowers make when choosing a bridging broker | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 196 | Not testing the broker’s understanding of the exit | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 214 | What does a bridging loan broker do? | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 218 | Do I need a broker for bridging finance? | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 222 | How do I know if a broker understands bridging finance? | KEEP no caveat |
| `guides/how-to-choose-a-bridging-loan-broker-expert-selection-guide.md` | 234 | What is the biggest mistake when choosing a broker? | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 119 | Understanding Second Mortgage Broker Specialisation | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 135 | Broker Experience and Track Record | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 141 | Evaluating Second Mortgage Broker Services | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 153 | Understanding Broker Fee Structures | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 243 | Checking Broker Reputation | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 251 | Working With Your Chosen Second Mortgage Broker | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 287 | How long does it take to arrange a second mortgage through a broker? | KEEP no caveat |
| `guides/how-to-find-second-mortgage-brokers-australia.md` | 295 | Should I use a broker or approach second mortgage lenders directly? | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 43 | What a commercial mortgage broker actually does | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 59 | Why broker fit matters in commercial property finance | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 67 | How to find the best commercial mortgage broker | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 69 | 1. Start with the deal, not the broker branding | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 206 | Questions to ask a commercial mortgage broker | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 238 | What the best broker looks like for different borrowers | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 262 | What does a commercial mortgage broker do? | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 266 | How do I know if a broker understands commercial property finance? | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 270 | Should I choose a broker based only on the cheapest option? | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 274 | Can one broker suit every type of commercial deal? | KEEP no caveat |
| `guides/how-to-find-the-best-commercial-mortgage-broker-complete-guide.md` | 278 | What should I prepare before speaking with a broker? | KEEP no caveat |
| `guides/how-to-get-a-business-loan-australia.md` | 160 | How Emet Capital Helps | KEEP no caveat |
| `guides/import-gst-and-customs-duty-finance-for-australian-businesses.md` | 161 | How Emet Capital Looks at These Requests | KEEP no caveat |
| `guides/insurance-premium-funding-alternatives-australian-businesses.md` | 129 | How Emet Capital Would Compare the Structures | KEEP no caveat |
| `guides/land-tax-debt-finance-in-australia-options-before-caveats-or-enforcement.md` | 154 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/letters-of-credit-vs-trade-finance-australian-importers.md` | 138 | Broker View: How To Choose the Right Structure | KEEP no caveat |
| `guides/loss-carry-back-business-finance-australia-2026.md` | 122 | How Emet Capital Would Frame the Scenario | REWRITE this pass |
| `guides/loss-carry-back-business-finance-australia-2026.md` | 162 | Does Emet Capital provide tax advice? | KEEP no caveat |
| `guides/low-doc-business-finance.md` | 116 | How Emet Capital packages a low-doc commercial file | KEEP no caveat |
| `guides/merchant-cash-advance-alternatives-australia.md` | 158 | How Emet Capital Helps | KEEP no caveat |
| `guides/merchant-cash-advance-alternatives-australia.md` | 192 | Does Emet Capital provide financial advice on which option to choose? | KEEP no caveat |
| `guides/merchant-cash-advance-refinance-australia.md` | 105 | How Emet Capital Thinks About These Scenarios | KEEP no caveat |
| `guides/motel-acquisition-finance-private-credit-australia.md` | 164 | How Emet Capital Helps | KEEP no caveat |
| `guides/motel-acquisition-finance-private-credit-australia.md` | 200 | Can Emet Capital advise whether I should buy a motel? | KEEP no caveat |
| `guides/negative-gearing-commercial-property-tax-strategies.md` | 120 | How Emet Capital Helps | KEEP no caveat |
| `guides/obtaining-a-business-loan-australia.md` | 152 | How Emet Capital Helps Borrowers Prepare | KEEP no caveat |
| `guides/obtaining-a-business-loan-australia.md` | 198 | Should I use a broker to obtain a business loan? | KEEP no caveat |
| `guides/partial-discharge-bridging-finance-australia.md` | 147 | How Emet Capital Would Compare the Options | KEEP no caveat |
| `guides/payroll-tax-debt-finance-australia.md` | 104 | Broker View: What Makes A File Stronger | KEEP no caveat |
| `guides/personal-guarantee-business-loan-australia.md` | 135 | How Emet Capital Approaches Guarantee Discussions | KEEP no caveat |
| `guides/pharmacy-acquisition-finance-in-australia-buying-or-expanding-a-pharmacy.md` | 148 | How Emet Capital Helps | KEEP no caveat |
| `guides/ppsr-security-for-business-loans-what-borrowers-need-to-know.md` | 178 | Can Emet Capital help compare PPSR-backed funding options? | KEEP no caveat |
| `guides/pre-settlement-finance-commercial-property-purchases-australia.md` | 272 | Does Emet Capital provide financial advice? | KEEP no caveat |
| `guides/private-commercial-loans-after-bank-decline.md` | 95 | How Emet Capital Frames the Options | REWRITE earlier in PR |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 53 | Broker vs Direct Private Credit Fund | KEEP no caveat |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 72 | When a Private Credit Broker Adds Value | REWRITE this pass |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 80 | Comparison Table: Broker vs Direct Fund | KEEP no caveat |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 122 | When Not to Use a Broker | KEEP no caveat |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 157 | Is a private credit broker the same as a private lender? | KEEP no caveat |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 165 | When is a broker better for SME private credit? | KEEP no caveat |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 173 | What should I ask a broker before appointing them? | KEEP no caveat |
| `guides/private-credit-broker-vs-direct-private-credit-fund-australia.md` | 181 | Can Emet Capital help compare broker-led and direct private credit options? | REWRITE earlier in PR |
| `guides/private-credit-for-sme-borrowers-in-australia-when-it-replaces-bank-finance.md` | 185 | How Emet Capital Helps SME Borrowers | KEEP no caveat |
| `guides/private-credit-refinance-commercial-property-australia.md` | 136 | Practical Broker File Example | KEEP no caveat |
| `guides/private-credit-refinance-commercial-property-australia.md` | 161 | Does Emet Capital provide financial advice? | KEEP no caveat |
| `guides/private-debt-australia.md` | 160 | How Emet Capital Helps Compare Private Debt Options | REWRITE earlier in PR |
| `guides/private-debt-for-sme-borrowers.md` | 107 | How Emet Capital Reviews an SME Private Debt Request | KEEP no caveat |
| `guides/private-lender-document-pack-broker-take.md` | 84 | Broker Take: The Exit Memo Is Often The Weakest Link | KEEP no caveat |
| `guides/private-lender-document-pack-broker-take.md` | 151 | How does Emet Capital help with document packs? | KEEP no caveat |
| `guides/private-lending-bank-decline-case-study.md` | 121 | How The Broker Reframed The Scenario | KEEP no caveat |
| `guides/private-lending-bank-decline-case-study.md` | 189 | How does Emet Capital help bank-declined borrowers? | REWRITE earlier in PR |
| `guides/private-lending-mortgage.md` | 109 | How Emet Capital Frames the Decision | KEEP no caveat |
| `guides/private-lending-mortgage.md` | 143 | Can Emet Capital promise an approval or a rate? | KEEP no caveat |
| `guides/private-mortgage-lending-commercial-borrowers.md` | 167 | How Emet Capital Frames The Decision | KEEP no caveat |
| `guides/private-mortgage-lending.md` | 117 | How Emet Capital Frames the Decision | REWRITE this pass |
| `guides/private-mortgage-loans-for-commercial-borrowers.md` | 114 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/private-mortgage-loans-for-commercial-borrowers.md` | 154 | Does Emet Capital lend the money directly? | KEEP no caveat |
| `guides/progress-claim-finance-for-stalled-fitouts-and-construction-projects-in-australia.md` | 156 | How Emet Capital Helps | KEEP no caveat |
| `guides/progress-claim-finance-unapproved-variations-australia.md` | 164 | Broker View: The Claim Must Be Explainable | KEEP no caveat |
| `guides/property-development-mortgage-australia.md` | 114 | How Emet Capital Frames the Decision | KEEP educational / title-fact |
| `guides/re-tenant-then-refinance-commercial-property-finance.md` | 158 | How Emet Capital Helps Frame the Scenario | KEEP no caveat |
| `guides/seasonal-stock-finance-in-australia-funding-inventory-before-peak-trading-periods.md` | 189 | Can Emet Capital help arrange seasonal stock finance? | KEEP no caveat |
| `guides/second-mortgage-application-checklist-australia.md` | 128 | Broker Preparation Checklist | KEEP educational / title-fact |
| `guides/second-mortgage-consent-refused-australia.md` | 105 | Broker View: The Refusal Is Data | KEEP no caveat |
| `guides/second-mortgage-for-construction-finance-australia.md` | 164 | Practical Broker View | KEEP no caveat |
| `guides/second-mortgage-lender-document-checklist-from-broker-files.md` | 146 | Broker File Example: Strong vs Weak Second Mortgage Submission | KEEP no caveat |
| `guides/second-mortgage-lender-document-checklist-from-broker-files.md` | 201 | How does Emet Capital help with second mortgage documents? | REWRITE earlier in PR |
| `guides/second-mortgage-lenders-australia-directory.md` | 125 | Can a broker access every second-mortgage lender? | KEEP no caveat |
| `guides/second-mortgage-without-refinancing-your-first-mortgage-in-australia.md` | 201 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/secured-business-loans-australia.md` | 126 | How Emet Capital Frames the Decision | KEEP no caveat |
| `guides/secured-business-loans-australia.md` | 154 | How does a broker help with secured business loans? | KEEP no caveat |
| `guides/settlement-shortfall-finance-in-australia-what-to-do-when-funds-are-short-before-settlement.md` | 160 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/short-term-business-finance-australia.md` | 186 | How Emet Capital Reviews Short-Term Finance Scenarios | KEEP no caveat |
| `guides/short-term-caveat-loans-australia.md` | 106 | How Emet Capital Frames the Decision | REWRITE this pass |
| `guides/smsf-commercial-property-loan-refinance-options-australia.md` | 175 | How Emet Capital Helps Frame the Refinance | KEEP no caveat |
| `guides/statutory-demand-business-finance-options-australia.md` | 108 | Documents To Prepare Before Speaking With A Broker | KEEP no caveat |
| `guides/supplier-deposit-finance-for-large-orders-australia.md` | 112 | Broker View: What Makes A File Stronger | KEEP no caveat |
| `guides/supplier-deposit-finance-high-value-import-orders-australia.md` | 174 | Broker View: Fund the Whole Import Cycle, Not Just the Deposit | KEEP no caveat |
| `guides/tradex-scheme-import-gst-trade-finance-australian-importers.md` | 142 | How Emet Capital Would Assess the Fit | KEEP no caveat |
| `guides/unsecured-business-loan-lenders-australia.md` | 129 | Broker-Side Warning Signs | KEEP no caveat |
| `guides/unsecured-business-loan-lenders-australia.md` | 190 | Can a broker help compare unsecured business loan lenders? | KEEP no caveat |
| `guides/urgent-caveat-loan-settlement-shortfall-case-study.md` | 98 | Broker Takeaway: The File Needed a Decision Map | KEEP educational / title-fact |
| `guides/urgent-caveat-loan-settlement-shortfall-case-study.md` | 126 | Can Emet Capital guarantee same-day approval? | KEEP no caveat |
| `guides/urgent-caveat-loans.md` | 85 | Triage the commercial deadline | KEEP no caveat |
| `guides/used-equipment-finance-second-hand-machinery-private-sales-australia.md` | 151 | How Emet Capital Frames the Decision | KEEP no caveat |
| `guides/what-is-a-second-mortgage.md` | 162 | How Emet Capital Helps | REWRITE earlier in PR |
| `guides/what-is-bridging-finance.md` | 122 | Practical Broker View | KEEP no caveat |

## Remaining caveat+actor paragraphs after this pass (109, all KEEP)

These still contain `caveat` plus Emet/we/our/us/broker/compare, but Emet is not inviting caveat as a current option. Typical KEEP reasons: educational caveat-series pages; borrowers-sometimes-compare market education; title caveats as facts; Emet does not fund caveat loans; related-guide links with educational blurbs.

| File | Line | Excerpt |
|---|---|---|
| `guides/ato-debt-eofy-cash-flow-finance-gic-deductibility-change-australia.md` | 106 | This can open lender appetite, but it increases risk. Using real property or business assets to clear tax debt should be supported by a clear exit, not a hope t |
| `guides/ato-gic-is-no-longer-deductible-should-businesses-refinance-tax-debt.md` | 111 | Australian businesses commonly compare secured private lending, commercial property refinance, working capital finance, caveat lending and asset-backed structur |
| `guides/ato-payment-plan-refused-business-finance-options-australia.md` | 34 | - **[ATO Tax Debt Finance for Australian Business Owners](/resources/guides/ato-tax-debt-finance-for-australian-business-owners)** — the broader tax debt financ |
| `guides/ato-payment-plan-refused-business-finance-options-australia.md` | 160 | - **[ATO Tax Debt Finance](/resources/guides/ato-tax-debt-finance-for-australian-business-owners)** — start here for the broader tax debt finance framework. - * |
| `guides/bank-exit-finance-commercial-borrowers-australia.md` | 132 | **Second mortgage or caveat loan structures** may be considered in limited business-purpose scenarios where the bank exit is part of a wider funding gap. These  |
| `guides/bridge-lending-australia-commercial-property.md` | 150 | - **[Open vs Closed Bridging Loan](/resources/guides/open-vs-closed-bridging-loan-complete-comparison)** — understand how certainty of exit changes bridge struc |
| `guides/bridging-loan-bank-delay-australia.md` | 28 | - **[Bridging Finance Complete Guide](/resources/guides/bridging-finance-australia-complete-property-guide)** — how short-term property bridging works in Austra |
| `guides/bridging-loan-repayment-calculator.md` | 135 | A bridging calculator is most useful when you are deciding whether bridging is the right structure in the first place. Borrowers often compare it with second mo |
| `guides/bridging-loan-repayment-calculator.md` | 171 | Yes. Depending on the property, timing, and security position, it may make sense to compare bridging with a refinance, second mortgage, or caveat-style solution |
| `guides/business-debt-consolidation-australia.md` | 102 | Private lending may be relevant where the business has strong security and a genuine commercial purpose but cannot wait for a standard process. It should still  |
| `guides/business-lenders-australia-urgent-settlement.md` | 108 | Compare the security structure as well. A caveat loan, second mortgage, commercial bridge, asset-backed facility, or invoice-linked facility can all solve diffe |
| `guides/business-lenders-australia-urgent-settlement.md` | 138 | - **[Private Lending vs Bank Lending](/resources/guides/private-lending-vs-bank-lending-which-is-better)** — compare flexible private assessment with mainstream |
| `guides/business-loan-requirements-australia-commercial-borrowers.md` | 110 | Property-backed business loans may involve a first mortgage, second mortgage, caveat, or other security structure. The right structure depends on urgency, prope |
| `guides/business-loans-secured-by-residential-property-in-australia.md` | 88 | Caveat-style lending should not be treated as guaranteed or casual. It involves legal documentation, title checks, consent, lender assessment and real consequen |
| `guides/business-turnaround-finance-australia.md` | 106 | **Property-backed finance** may be considered where the business or directors hold suitable commercial property, investment property, or other acceptable securi |
| `guides/caveat-lenders-australia-directory-comparison.md` | 35 | This page compares caveat lender types and their terms. It is not a guide to choosing a broker. A commercial finance broker can help package a scenario and comp |
| `guides/caveat-lending-australia.md` | 29 | For context, compare this guide with the [caveat loans Australia guide](/resources/guides/caveat-loans-australia-complete-guide), the guide to [short-term cavea |
| `guides/caveat-lending-australia.md` | 84 | For settlement pressure, read [caveat loans for property settlement](/resources/guides/caveat-loans-for-property-settlement-bridge-your-purchase) alongside [pre |
| `guides/caveat-lending-australia.md` | 189 | - **[Caveat Loan Exit Strategies](/resources/guides/caveat-loan-exit-strategies-how-to-repay-or-refinance)** — plan repayment before relying on short-term secur |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 24 | The practical broker take is simple: borrowers lose time when they treat valuation as something that happens after approval. In urgent caveat lending, valuation |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 37 | \| Question \| Broker take \| \|---\|---\| \| What causes valuation delays? \| Missing property evidence, unusual security, stale sales data, title complexity, lease ga |
| `guides/caveat-loan-broker-take-on-valuation-delays.md` | 97 | A valuation delay can mean the borrower should compare another structure. If there is time for a registered mortgage, a [second mortgage](/resources/guides/seco |
| `guides/caveat-loan-eofy-tax-bill-unsold-development-stock-australia.md` | 128 | For urgent files, compare this with [quick caveat loans](/resources/guides/quick-caveat-loans-48-hour-settlement-possible) and [urgent caveat loans](/resources/ |
| `guides/caveat-loan-eofy-tax-bill-unsold-development-stock-australia.md` | 198 | - **[Caveat Loan Exit Strategies](/resources/guides/caveat-loan-exit-strategies-how-to-repay-or-refinance)** — plan repayment before taking short-term caveat de |
| `guides/caveat-loan-exit-plan-after-bank-delay-case-study.md` | 53 | A caveat loan exit plan after a bank delay is a short-term repayment strategy showing how a borrower will clear caveat finance once a delayed bank refinance, sa |
| `guides/caveat-loan-exit-plan-after-bank-delay-case-study.md` | 124 | This page can answer the direct question: what should a borrower do when a bank delay creates a caveat loan exit planning problem? The short answer is to docume |
| `guides/caveat-loan-interest-rates-what-you-ll-really-pay-2025.md` | 37 | > **Direct answer:** There is no reliable universal caveat-loan rate. Pricing depends on the legal structure, property and security position, combined debt, pur |
| `guides/caveat-loan-interest-rates-what-you-ll-really-pay-2025.md` | 111 | The best way to compare caveat loan offers is to compare the full cost of solving the urgent problem. |
| `guides/caveat-loan-interest-rates-what-you-ll-really-pay-2025.md` | 168 | Caveat loan interest rates in Australia are priced according to urgency, equity position, title simplicity, and exit certainty rather than by a single mainstrea |
| `guides/caveat-loan-interest-rates-what-you-ll-really-pay-2025.md` | 182 | No. A borrower should compare the full facility, including fees, legal costs, term, default settings, extension risk, and the lender’s actual ability to settle  |
| `guides/caveat-loan-prevented-business-closure-tax-debt-case-study.md` | 124 | - **[Quick Caveat Loans](/resources/guides/quick-caveat-loans-48-hour-settlement-possible)** — What needs to line up for genuinely fast settlement. - **[Urgent  |
| `guides/caveat-loan-vs-second-mortgage-which-is-right-for-you.md` | 20 | For Australian business owners, property investors, and developers, the comparison is not simply “which one is cheaper?” It is “which structure solves the comme |
| `guides/caveat-loan-vs-second-mortgage-which-is-right-for-you.md` | 138 | A caveat loan may be considered as a short bridge. The borrower should compare it with [ATO tax debt finance](/resources/guides/ato-tax-debt-finance-for-austral |
| `guides/caveat-loans-australia-complete-guide.md` | 116 | Compare eligibility, security position, net proceeds, interest method, all fees, required payments, conditions, guarantees, extension and default terms, and the |
| `guides/caveat-loans-for-property-settlement-bridge-your-purchase.md` | 93 | If you are deciding between the two, compare urgency, property title position, existing lender requirements, loan size, legal timing, and the exit. The comparis |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 28 | - **[Caveat Loans Australia: Business Funding Guide](/resources/guides/caveat-loans-australia-complete-guide)** — the pillar guide for caveat finance structure  |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 70 | Online enquiry is useful for triage. A broker can quickly identify whether the request is a caveat loan, second mortgage, bridging loan, refinance or private le |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 88 | For settlement matters, compare [caveat loans for property settlement](/resources/guides/caveat-loans-for-property-settlement-bridge-your-purchase) with [bridgi |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 90 | Online enquiry is also useful when you are unsure which product fits. A broker can assess whether [private lending, a second mortgage or a refinance pathway is  |
| `guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval.md` | 96 | It may also be unsuitable where the borrower needs long-term funding. Caveat loans are usually short-term tools. If the business needs an ongoing cash-flow faci |
| `guides/caveat-loans-vs-bank-loans-speed-comparison.md` | 120 | This comprehensive caveat loan comparison examines approval speeds, cost structures, documentation requirements, and strategic use cases helping you determine w |
| `guides/caveat-loans-vs-bank-loans-speed-comparison.md` | 187 | Establishment fees for bank loans typically range from 0.5-2% of loan amounts, substantially lower than caveat establishment fees of 2-5%. On a $200,000 loan, b |
| `guides/caveat-loans-vs-bank-loans-speed-comparison.md` | 221 | Caveat lenders prioritize property security adequacy and exit strategy clarity, asking: "If this borrower defaults, can we sell this property quickly to recover |
| `guides/commercial-loan-maturity-refinance-australia.md` | 108 | A private credit bridge may suit a compressed maturity deadline where the borrower needs time to complete a sale, refinance, lease renewal, or debt restructure. |
| `guides/commercial-property-finance-broker-selection-checklist.md` | 102 | If the transaction involves a deposit, equity release, or refinance, compare the expected security position with [commercial property loan deposits](/resources/ |
| `guides/commercial-property-loan-after-bank-decline-non-bank-options-australia.md` | 54 | It is not for personal home loans, retail consumer credit, or owner-occupier residential mortgage advice. If the issue is a short settlement deadline rather tha |
| `guides/commercial-strata-special-levy-finance-australia.md` | 124 | Short-term property-secured finance may fit where the levy and deadline are documented, acceptable equity exists and the exit is realistic. Compare [private len |
| `guides/cross-collateralised-commercial-property-refinance-australia.md` | 105 | Before cross-collateralising a portfolio, compare the cleanest available structure. A single-property refinance may be simpler. A [second mortgage](/resources/g |
| `guides/find-caveat-loan-brokers-australia.md` | 37 | > **Direct answer:** A caveat loan broker in Australia packages a short-term, property-secured commercial file, identifies lender types that may fit, submits a  |
| `guides/find-caveat-loan-brokers-australia.md` | 39 | This page is a broker-selection guide. It does not rank brokers and does not claim that Emet Capital is the only broker, the best broker, or suitable for every  |
| `guides/find-caveat-loan-brokers-australia.md` | 49 | For a caveat or other short-term property-backed commercial file, broking also means identifying title issues, existing debts, the use of funds, legal dependenc |
| `guides/find-caveat-loan-brokers-australia.md` | 55 | 1. **Facts.** Confirm the legal borrowers, directors, trustees and guarantors; the exact amount needed; the required date; and who will sign. 2. **Title and sec |
| `guides/find-caveat-loan-brokers-australia.md` | 67 | \| Area to verify \| Strong evidence \| Red flag \| \|---\|---\|---\| \| Identity and business \| Legal entity, ABN, named contacts and written engagement \| Only a mobile |
| `guides/find-caveat-loan-brokers-australia.md` | 89 | 1. Who is the legal broking entity and who will handle the file? 2. What experience do you have with this security, purpose and deadline? 3. Which lender catego |
| `guides/find-caveat-loan-brokers-australia.md` | 132 | Emet Capital is a commercial finance broker, not a lender. It does not fund caveat loans or any other loan. |
| `guides/first-mortgagee-consent-delay-caveat-loan-vs-second-mortgage.md` | 103 | For urgent timing scenarios, compare [urgent caveat loans](/resources/guides/urgent-caveat-loans), [quick caveat loans](/resources/guides/quick-caveat-loans-48- |
| `guides/first-mortgagee-consent-delay-caveat-loan-vs-second-mortgage.md` | 191 | In that review, the broker would test the caveatable interest, first mortgage balance, property value, tax amount, exit evidence, and whether the extra cost is  |
| `guides/franchise-fit-out-finance-australia.md` | 116 | This can involve business assets, receivables, or real property depending on the borrower position. Property-backed finance may open lender appetite, but it inc |
| `guides/getting-a-second-mortgage.md` | 27 | This guide explains how getting a second mortgage works, who it may suit, what lenders assess, which documents matter, when not to use one, and how to compare i |
| `guides/how-to-remove-a-caveat-from-property-title-step-by-step.md` | 116 | That is one reason many borrowers compare [caveat loan vs second mortgage](/resources/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you) when plannin |
| `guides/insurance-premium-funding-alternatives-australian-businesses.md` | 102 | The benefit is that property security may open lender appetite where cash-flow-only options are limited. The risk is that property-backed facilities can carry s |
| `guides/land-tax-debt-finance-in-australia-options-before-caveats-or-enforcement.md` | 115 | For broader context, compare [caveat loans for business emergencies](/resources/guides/caveat-loan-emergency-business-funding) and [caveat loan exit strategies] |
| `guides/loss-carry-back-business-finance-australia-2026.md` | 102 | For property-backed scenarios, compare [second mortgages for business](/resources/guides/second-mortgages-for-business-guide), [caveat loans in Australia](/reso |
| `guides/merchant-cash-advance-alternatives-australia.md` | 105 | Property-secured funding can provide larger capacity than unsecured cash-flow products, but it also introduces asset risk. A short-term facility should have a c |
| `guides/no-credit-check-caveat-loans-in-australia-what-business-borrowers-should-know.md` | 39 | For business owners, developers and property investors, the phrase "no credit check" can be misleading. A caveat loan may be more flexible than a bank facility, |
| `guides/no-credit-check-caveat-loans-in-australia-what-business-borrowers-should-know.md` | 43 | - **[Caveat Loans Australia: Business Funding Guide](/resources/guides/caveat-loans-australia-complete-guide)** — the main caveat finance pillar for business bo |
| `guides/no-credit-check-caveat-loans-in-australia-what-business-borrowers-should-know.md` | 95 | If the issue is an existing bank decline, compare the reasons for that decline before assuming a caveat loan is the answer. The guide on [commercial property re |
| `guides/open-vs-closed-bridging-loan-complete-comparison.md` | 138 | That does not automatically mean there is no solution. It means the borrower may need a different structure and a more realistic conversation. Sometimes the bet |
| `guides/private-commercial-loans-for-smes.md` | 104 | Compare structure as well. A property-backed second mortgage, caveat loan, asset-backed facility, invoice finance arrangement, or short-term private loan may al |
| `guides/private-debt-australia.md` | 94 | Where the issue follows a bank decline, compare [private commercial loans after bank decline](/resources/guides/private-commercial-loans-after-bank-decline) wit |
| `guides/private-debt-australia.md` | 112 | A caveat loan may be considered for urgent business-purpose funding supported by property. It is usually short-term and should have a clear exit. Borrowers shou |
| `guides/private-lending-mortgage.md` | 149 | - **[Caveat Loans Australia Complete Guide](/resources/guides/caveat-loans-australia-complete-guide)** — educational guide to how caveat lending works in the Au |
| `guides/private-lending-vs-bank-lending-which-is-better.md` | 48 | > **📚 Complete Guide**: This guide compares private lending and bank lending at a decision-making level. It works best alongside our broader [What Is Private L |
| `guides/private-lending-vs-bank-lending-which-is-better.md` | 54 | - **[What Is Private Lending in Australia?](/resources/guides/what-is-private-lending-australia)** — Broader explanation of private credit, lender appetite, and |
| `guides/private-mortgage-loans-for-commercial-borrowers.md` | 62 | Borrowers often compare this option with [commercial property refinancing](/services/refinancing-solutions), [second mortgages for business](/resources/guides/s |
| `guides/private-mortgage-loans-for-commercial-borrowers.md` | 86 | If an existing first mortgage must stay in place, read [second mortgage vs line of credit](/resources/guides/second-mortgage-vs-line-of-credit) and [second mort |
| `guides/property-development-mortgage-australia.md` | 118 | We then map the security and capital stack. Existing mortgages, caveats, senior debt, equity contributions, presales, and mezzanine layers all affect lender app |
| `guides/quick-caveat-loans-48-hour-settlement-possible.md` | 99 | Understanding what determines actual settlement speed helps you assess whether quick caveat loans suit your timeframe, prepare appropriately to maximise speed,  |
| `guides/quick-caveat-loans-48-hour-settlement-possible.md` | 258 | Quick caveat loans typically carry comparable interest rates to standard caveat loans—generally lender-specific pricing (with pricing varying by lender and file |
| `guides/quick-caveat-loans-48-hour-settlement-possible.md` | 268 | Compare multiple caveat lenders focusing on actual delivery track records rather than marketing promises. Ask about their median settlement timeframes (not best |
| `guides/second-mortgage-application-checklist-australia.md` | 32 | - **[Second Mortgages for Business](/resources/guides/second-mortgages-for-business-guide)** — the main guide to business-purpose second mortgages in Australia. |
| `guides/second-mortgage-application-checklist-australia.md` | 62 | If the file is urgent, borrowers sometimes compare a second mortgage with [caveat loans](/resources/guides/caveat-loans-australia-complete-guide). The right str |
| `guides/second-mortgage-application-checklist-australia.md` | 116 | If the business needs broader funding after a bank decline, compare [private lending](/resources/guides/what-is-private-lending-australia), second mortgages, ca |
| `guides/second-mortgage-for-construction-finance-australia.md` | 136 | For urgent funding, compare [caveat lending in Australia](/resources/guides/caveat-lending-australia) and [caveat loan vs second mortgage](/resources/guides/cav |
| `guides/second-mortgage-for-divorce-settlement-property-division.md` | 35 | - **[1st & 2nd Mortgages for Business](/resources/guides/second-mortgages-for-business-guide)** — Core guide to how first and second mortgage structures work in |
| `guides/second-mortgage-for-divorce-settlement-property-division.md` | 68 | For example, a director who owns a warehouse through a company or trust may agree to buy out a former spouse's economic interest. If the first mortgage is still |
| `guides/second-mortgage-for-divorce-settlement-property-division.md` | 124 | One of the clearest use cases is where one party wants to retain a commercial premises or investment property and pay the other party a negotiated amount. A sec |
| `guides/second-mortgage-lender-document-checklist-from-broker-files.md` | 28 | - **[Second Mortgages for Business](/resources/guides/second-mortgages-for-business-guide)** — the main pillar guide for Australian business second mortgages. - |
| `guides/second-mortgage-loan-equity-access-strategies.md` | 43 | > **Direct answer:** Equity on paper is not automatically an available loan amount. Usable equity is narrower than total equity: it depends on the valuation a l |
| `guides/second-mortgage-partnership-buyout-financing-transitions.md` | 55 | - **[First and Second Mortgages for Business](/resources/guides/second-mortgages-for-business-guide)** — the foundation guide for ranking, security, and private |
| `guides/second-mortgage-without-refinancing-your-first-mortgage-in-australia.md` | 170 | Caveat-style lending may move quickly in urgent commercial scenarios, but it has different legal mechanics and risk considerations. Borrowers should compare [ca |
| `guides/second-mortgages-for-business-guide.md` | 35 | - **[Second Mortgage Partnership Buyout Financing](/resources/guides/second-mortgage-for-a-business-partner-buyout-in-australia)** — funding partner exits and o |
| `guides/second-mortgages-for-business-guide.md` | 244 | - **[Caveat Loan vs Second Mortgage](/resources/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you)** — educational comparison of caveat security and  |
| `guides/short-term-business-finance-australia.md` | 108 | For urgent property-backed files, compare [caveat loans](/resources/guides/caveat-loans-australia-complete-guide), [second mortgages for business](/resources/gu |
| `guides/short-term-caveat-loans-australia.md` | 26 | The key word is short-term. A caveat loan can be useful when timing is the main problem, but it is not a substitute for stable working capital or long-term refi |
| `guides/short-term-caveat-loans-australia.md` | 30 | - **[Caveat Loans Australia](/resources/guides/caveat-loans-australia-complete-guide)** — the core guide to caveat finance, security, costs, documents, and exit |
| `guides/short-term-caveat-loans-australia.md` | 68 | For settlement-driven files, borrowers should also compare [pre-settlement finance](/resources/guides/pre-settlement-finance-commercial-property-purchases-austr |
| `guides/short-term-property-loans-when-you-need-fast-finance.md` | 1 | --- title: "Short-Term Property Finance & Loans in Australia: Decision Guide" description: "Compare short-term property finance and loans for Australian busines |
| `guides/short-term-property-loans-when-you-need-fast-finance.md` | 56 | Where the discussion is about non-bank or private credit rather than a named bridging, caveat or second-mortgage structure, see [private lending arranged throug |
| `guides/short-term-property-loans-when-you-need-fast-finance.md` | 137 | They describe different aspects of a proposal, not one interchangeable product. Bridging-style questions concern a timing gap, such as a purchase before another |
| `guides/understanding-secondary-mortgage-markets-australia.md` | 97 | Finally, we expect to see the continued growth of the **private debt secondary market**. As private lending becomes more mainstream, the trading of private loan |
| `guides/unsecured-business-loan-lenders-australia.md` | 162 | - **[Unsecured Business Loans in Australia](/resources/guides/unsecured-business-loans-australia)** — borrower-focused guide to how unsecured facilities work. - |
| `guides/unsecured-business-loans-australia.md` | 163 | If the issue is urgent and property security is available, borrowers sometimes compare unsecured funding with [caveat loans](/resources/guides/caveat-loans-aust |
| `guides/urgent-caveat-loans.md` | 108 | For a broader product explanation, read the [complete caveat loans guide](/resources/guides/caveat-loans-australia-complete-guide). For a transaction whose defi |
| `guides/what-is-a-caveatable-interest.md` | 49 | That is why borrowers sometimes compare a caveat structure with a more formal security path like a **[second mortgage for business](/resources/guides/second-mor |
| `guides/what-is-a-caveatable-interest.md` | 63 | This is one reason borrowers under pressure often compare caveat structures with **[private lending in Australia](/resources/guides/what-is-private-lending-aust |
| `tools/second-mortgage-calculator.md` | 102 | <h2>Frequently asked questions</h2> <dl> <div> <dt><strong>Are second mortgages for business regulated under NCCP?</strong></dt> <dd>For business-purpose loans, |
| `tools/smsf-commercial-property-loan-interest-rates.md` | 11 | <h1>Smsf Commercial Property Loan Interest Rates — Commercial Property Lending in Australia</h1> <p><em>Speak with a broker about your options (no consumer cred |
| `tools/smsf-commercial-property-loan-interest-rates.md` | 23 | <h2>Industry‑specific scenarios</h2> <ul><li><strong>Construction & trades.</strong> Progress claims timing; Retention and variations; Subcontractor payments; P |

## Protected cohort (11 files, bios unchanged)

Left as-is so the protected-cohort gate does not fail (`reviewAfter` is missing and treated as still active).

| File | Bio | Body |
|---|---|---|
| `case-studies/adelaide-cbd-asset-backed-lending.md` | caveat in author_bio only | no body issue |
| `case-studies/adelaide-cbd-office-complex.md` | caveat in author_bio only | no body issue |
| `case-studies/melbourne-richmond-asset-finance.md` | caveat in author_bio only | no body issue |
| `case-studies/newcastle-merewether-equipment-finance.md` | caveat in author_bio only | no body issue |
| `case-studies/newcastle-wickham-business-acquisition.md` | caveat in author_bio only | no body issue |
| `case-studies/perth-business-group-debt-consolidation.md` | caveat in author_bio only | no body issue |
| `case-studies/perth-fremantle-first-mortgage.md` | caveat in author_bio only | no body issue |
| `case-studies/rose-bay-property-development-bridging-loan.md` | caveat in author_bio only | no body issue |
| `case-studies/south-yarra-apartment-development.md` | caveat in author_bio only | no body issue |
| `guides/case-study-developers-first-project-funding-success.md` | caveat in author_bio only | no body issue; Emet copy is development packaging, not caveat invitation |
| `guides/caveat-loan-prevented-business-closure-tax-debt-case-study.md` | caveat in author_bio | REPORT: entire page is an educational caveat-finance case study. Emet appears in author_title, one scene-setting sentence (`Emet Capital works with commercial lending scenarios for eligible business borrowers`), and the disclaimer. It does not say Emet currently arranges caveat loans. Not rewritten (would break the gate). |

## Pages (tsx) actor headings

| File | Heading | Decision |
|---|---|---|
| `src/pages/services/FirstSecondMortgages.tsx` | How Emet Capital Helps | KEEP. Guides card links the educational Caveat Loan vs Second Mortgage guide (`Compare the questions to ask about each proposed short-term structure`). Emet help copy does not invite caveat as a current product. |
| `src/pages/services/AssetBackedLending.tsx` | How Emet Capital Helps | KEEP. Educational caveat-guide card, not a product invitation in the Emet help section. |
| `src/pages/services/CommercialPropertyFinance.tsx` | How Emet Helps | KEEP. Existing caveats that reduce usable equity is a title fact. Educational caveat-style guide card. |
| Other service pages with How Emet Helps | various | KEEP. No caveat invitation in those help sections. |
| `src/pages/tools/BridgingLoanCalculator.tsx` | n/a | KEEP. Neutral market comparison of caveat vs bridging cost structures; calculator is not an Emet product offer of caveat loans. |
| `src/pages/ResourcesHub.tsx` / `Guides.tsx` | n/a | KEEP. Educational guide index links. |

## Policy / tests

- Added exact remaps to `RETIRED_CAVEAT_PRODUCT_REPLACEMENTS` in `scripts/lib/content-change-policy.mjs`.
- Extended leftover possessive remap to include `Our [caveat`.
- Added `rewrites Emet-framed sections that still invite caveat loans` in `scripts/tests/content-change-policy.test.ts`.
- `applyRetiredCaveatProductCopy(origin/main file) === working tree` for all non-protected content files.
