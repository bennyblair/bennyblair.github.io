# Independent review: commercial property loans Australia guide

Content verdict: **PASS** (score 90.5, no blocking content findings).

Release readiness: **NOT ELIGIBLE**. Do not merge, mark ready, add release labels, or treat this as owner approval.

Reviewed read-only by Grok 4.7. Writer was Grok 4.6. No model substitution. No repository edits, push, merge, labels, or enquiry.

## Identity

| Item | Value |
|---|---|
| PR | https://github.com/bennyblair/bennyblair.github.io/pull/255 |
| State | Open draft. Labels: none. |
| Branch | `ai/content-repair-commercial-property-complete-guide-review-20261109` |
| Base | `fa421ca4dffdfe9fb3030455f92ad26b7718a9b5` (parent of HEAD; matches PR base) |
| Head | `6ad0483f4847c8f85aea100ae81349d6e610ae1e` |
| Head subject | Content repair: commercial property loans complete-guide review |
| Target | `/resources/guides/commercial-property-loans-australia-complete-guide` only |
| File | `src/content/guides/commercial-property-loans-australia-complete-guide.md` |
| Diff | 1 file, 12 insertions, 12 deletions |
| Before sha256 | `023d08dc5a6641f99190d069797dfa62d04212991e76a9aeaf7aaf4c9a952805` (11538 bytes) |
| After sha256 | `29126036fb202a486261f8c448c5b233414169761c7826a0bc12e3ce97f6cc2f` (11917 bytes) |
| Review instant used below | `2026-11-08T21:10:07.000Z` |

Both hashes were recomputed from the git blob at the base and from the working-tree file at HEAD. They match the writer report. HEAD is that full SHA, not a shortened prefix. Working tree had no source edits at review time.

## What the 12 lines do

National title, description, keywords, meta title, meta description, and image alt. Intro now says this is the Australia-wide eligibility, structure and assessment guide and still points at the rates guide and the development finance guide. The plain rates mention becomes a Markdown link to the same rates URL. The ATO citation moves from the API content URL to the public HTML URL. The next step says "speak with a broker". The closing disclaimer says Emet Capital is a commercial finance broker, not a lender.

Review metadata was left unchanged, as the writer stated.

## Content verdict

PASS. Score 90.5. Blocking content findings: none.

Dimensions (0-100, equal weight, one decimal): intentCoverage 94, informationGain 90, specificity 88, evidence 84, readability 92, repetition 90, compliance 94, aiAnswerUsefulness 92. Evidence is the low score because the publisher-style GET of the ATO URL returns 403. The sentence is still supported by a separate fetch, recorded below. That is not a false claim and is not a content blocker. It is a release-gate failure.

This is a keep/refresh of the national pillar plus a broker-identity correction. It is not a rewrite. Primary query stays `commercial property loans Australia`.

### National intent and overlap

Rendered title is `Commercial Property Loans Australia: How They Work` (50 characters). Rendered H1 is the frontmatter title, one H1 only:

`Commercial Property Loans in Australia: Eligibility, Structure and Assessment`

Intro, line 37:

> This is the Australia-wide eligibility, structure and assessment guide for commercial property loans. It explains how these facilities work for business-purpose property across Australia: eligibility considerations, loan structure, lender assessment, documents and risks. It is distinct from the [commercial mortgage rates guide](/resources/guides/commercial-mortgage-rates-australia-complete-guide), which explains pricing, and the [development finance guide](/resources/guides/commercial-property-development-finance), which covers construction and project risk.

Checked against siblings and the service:

- Rates guide owns `commercial mortgage rates Australia` and links back here for eligibility. This page does not state a rate or a percentage.
- Development guide owns `commercial property development finance Australia`. The purposes table sends development to that guide. This page does not restate construction stages.
- Brisbane guide owns `commercial property loan brisbane`. This file has no Brisbane, Queensland, or suburb copy. The Brisbane file was not edited.
- Deposits, valuation, and serviceability stay on their own URLs and are linked from Related Guides. Deposit FAQ: "There is no single percentage that applies to every property."
- Eligibility sibling `commercial-property-loan-eligibility-what-you-need-to-qualify` still owns the qualify checklist. This H1 uses the word Eligibility. The body does not publish a checklist, credit-score rule, or numeric qualify test. The rendered related module links that sibling. Not a blocker on a keep/refresh.
- Service `/services/commercial-property-finance` H1 is "Commercial Property Finance for Australian Borrowers" and is the arrangement page. This guide links it as the next step. That is the designated service, not a second national explainer.

Retail route `commercial-property-loan-retail-spaces-guide` redirects here in `src/config/site-route-manifest.ts`. Line 91 says the retail material now sits on this page because retail is a property-type assessment, not a separate product. The page has one retail bullet. It does not carry the legacy retail file's 60-70% LVR or 6.5% to 9.5% rate claims. Non-blocking.

### Broker identity and claims registry

Closing disclaimer, line 159:

> This article is for informational purposes only and does not constitute financial advice. Emet Capital is a commercial finance broker, not a lender. It arranges commercial-purpose finance and does not lend, fund or approve loans.

Replaces: "Emet Capital provides commercial lending solutions to eligible business borrowers."

Next step, line 150, starts: "To speak with a broker about a live purchase or refinance".

No ACL, AFSL, credit licence, MFAA, FBAA, membership, consumer loan, home loan, dollar volume, approval rate, or named lender. No registered claim from `src/content/claims.json` is used. Expired claims, including `$1B+ funds facilitated` and `15+ years industry experience`, are absent. Verified `lender-network-50` is not used. No rate, fee, or LVR percentage. "guarantees" at line 127 is about security guarantees exposing parties, not an approval guarantee. The hypothetical warehouse example is labelled "not a client outcome" and "does not state an approval, rate, leverage or settlement time."

"Please consult a licensed financial adviser" tells the reader to get advice. It does not say Emet holds a licence.

Rendered JSON-LD author is the shared Ben profile: job title "Commercial Finance Broker, Emet Capital" and description "Ben is a commercial finance broker at Emet Capital with 10 years' experience in private lending." That string is `src/data/article-authors.json`, not one of the 12 lines. It is not a funds-volume claim and not a licence or membership. `/about/ben` repeats the same broker profile. Out of scope for this repair.

Site footer, `src/components/Footer.tsx` line 17, still says "Specialised commercial lending solutions for Australian businesses and property investors." That is site chrome on this URL. This repair cannot change components. The article disclaimer is the broker statement. Non-blocking for this draft.

### Em dashes

Changed lines add none. The file still has five U+2014 characters, all pre-existing:

- Line 21 source label `ATO — Property used in running a business`
- Line 23 source label `business.gov.au — Apply for a business loan`
- Line 25 source label `APRA — APG 113 capital adequacy and specialised lending guidance`
- Line 35 reader text: "a repayment plan—not on property value alone."
- Line 115 heading: `## Illustrative scenario — not a client outcome`

Rendered HTML shows the line 35 dash, the line 115 heading, and the same heading in the contents list. Source-label dashes are not in the body. Not a content blocker on a 12-line keep/refresh. The page is not em-dash-free.

### Metadata on the page now

Unchanged and stale:

- `reviewedBy: "OpenClaw SEO source audit"` (retireable automated label)
- `reviewedAt: "2026-08-05"`
- `reviewed_date: "2026-06-20"` (alias; must be removed on renewal)
- `reviewStatus: "automated-editorial-review"` (protected; do not change)
- `humanReviewRequired: true` (protected; do not change; this review is not a human review)
- `expiresAt: "2026-11-05"` (in the past on 2026-11-08)
- `contentRisk: "high"` (must stay high)
- `author: "Ben"`, `date: "2025-10-08"` (must stay)

Rendered `dateModified` and the visible "Reviewed 5 August 2026" follow `reviewedAt`, which wins over `reviewed_date`. No "Updated" line, because the visible update label requires reviewer `OpenClaw independent reviewer`. That is correct for this head.

`protectedUntil: "2026-10-19T00:00:00+11:00"` is in the past. It is not an active hold.

Registry row `pg_1eadcbf19fb84e9f94c862642b20ee3f` still has `contentRisk` high, `maxAutomatedChangeRisk` R0, `reviewEveryDays` 90, `reviewOwner` `financial-review` (a queue, not a named human), and the same expired review fields. This repair must not edit `data/seo-page-registry.json`.

Frontmatter `featuredImageAlt` was changed to "Australia-wide commercial property loans eligibility and assessment guide". The renderer prefers `src/config/article-images.json`, so the public alt is still "Commercial property loans Australia complete business borrower guide" on the image and `og:image:alt`. That alt is still national and accurate. Do not edit `src/config` in this repair. That path classifies as R3.

Rendered geo tags are still `AU-NSW` / Sydney because `GuideArticle` does not opt out. National wording is in the title, description, and H1. Fixing geo tags would be a component change, which this repair path does not allow. Non-blocking.

### Rendered page

`npx vite build`, then prerender of this route and the internal destinations. Preview `http://127.0.0.1:4173` on 2026-11-08.

| Check | Result |
|---|---|
| HTTP | 200, 57144 bytes |
| `<title>` and og:title | Commercial Property Loans Australia: How They Work |
| Canonical and og:url | `https://emetcapital.com.au/resources/guides/commercial-property-loans-australia-complete-guide` |
| Meta description | How commercial property loans work across Australia, covering eligibility, structure, lender assessment, documents and risks. General information only. |
| Robots | `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1` |
| H1 count | 1, the eligibility/structure/assessment title |
| Keywords meta | commercial property loans, commercial property finance, commercial property lending, business property loans, commercial mortgage, property finance Australia |
| Raw `](` in HTML or JSON-LD | none |
| FAQ schema | 4 questions, plain answers, no percentage |
| Article schema | headline is the H1; datePublished 2025-10-08; dateModified 2026-08-05 |
| Image | `https://emetcapital.com.au/images/articles/commercial-property-loans-australia-complete-guide.webp` HTTP 200, 18122 bytes; img width 1200 height 630 |

Article QA on this file: 1 error, 0 warnings. Metrics: 1180 words, 4 FAQs, 8 internal links, 5 unique guide links, paragraph similarity 0.086. The only error is `expiresAt is in the past`. Six content links resolve. Author fields complete.

### Internal links

Source and rendered article links. Preview HTTP 200 and self-canonical confirmed for each destination that was prerendered.

| Anchor | Path | HTTP | Canonical |
|---|---|---|---|
| commercial mortgage rates guide; commercial mortgage rates in Australia | `/resources/guides/commercial-mortgage-rates-australia-complete-guide` | 200 | self |
| development finance guide | `/resources/guides/commercial-property-development-finance` | 200 | self |
| Commercial Property Loan Deposits | `/resources/guides/commercial-property-loan-deposits-how-much-do-you-need` | 200 | self |
| Commercial Property Valuation | `/resources/guides/commercial-property-valuation-for-finance-lender-requirements` | 200 | self |
| Commercial Loan Serviceability | `/resources/guides/commercial-property-loan-serviceability-how-much-can-you-borrow` | 200 | self |
| commercial property finance service; Commercial Property Finance | `/services/commercial-property-finance` | 200 | `https://emetcapital.com.au/services/commercial-property-finance` |
| Ben bio | `/about/ben` | 200 after prerender | `https://emetcapital.com.au/about/ben`, H1 Ben |

The rates URL appears twice in the article, both intentional. The service URL appears twice in the markdown. The rendered page also has template and footer links to the same service. No broken internal target.

External links on the page: business.gov.au, the APRA PDF, and the ATO HTML URL. Statuses are in the source section.

## Sources

Checked 2026-11-08. Node `fetch` GET, redirect follow, 25s timeout, default UA and a browser UA. Curl with a browser UA for the ATO URL. WebFetch used only as a second channel for the ATO page. WebFetch returns markdown and does not report an HTTP status. It is not a 200 for the repair gate.

### ATO public HTML (the new citation)

URL: `https://www.ato.gov.au/businesses-and-organisations/assets-and-property/property/property-used-in-running-a-business`

Node default and browser UA, and curl: **HTTP 403**. Final URL unchanged. `server: AkamaiGHost`. `content-type: text/html`. 513 bytes. `<title>Access Denied</title>`. Body: "You don't have permission to access" that URL. Bare `https://ato.gov.au/...` 302s to www and then 403s. Trailing slash also 403.

Old API URL `https://www.ato.gov.au/api/public/content/0-184b2878-2f88-4d62-b42c-c1bb1b5f08a0` is also **403** Access Denied (461 bytes). The URL change does not produce a verifier 200.

WebFetch of the public URL returned page text, including:

> Work out your GST, capital gains tax, and tax return obligations when you own property used for business purposes.

> must include any rental income in your tax return

> can claim deductions for some property expenses

> will be liable for capital gains tax on any capital gain if you sell the property

> may have GST obligations and entitlements

Page sentence, line 113:

> The ATO’s property-used-in-business guidance notes that property can involve income tax, GST and capital-gains consequences.

GST and capital gains are on the page. "Income tax" is a paraphrase of tax-return income and deductions, not a verbatim heading. The guide does not say interest is tax-deductible. It says treatment may differ and to obtain tax advice. That attribution is supported by the WebFetch text.

Limitation: do not record status 200. `fetchLiveSourceStatuses` uses the same style of GET that returned 403 here. A manifest that claims 200 would be false for this environment. Wayback has older 200 snapshots (latest listed capture in the small timemap pull was 2024-07-18). Those are not a current 200.

### business.gov.au

URL: `https://business.gov.au/finance/funding/apply-for-a-business-loan`

Node GET **200**. Final URL unchanged. `text/html; charset=utf-8`. 357421 bytes. Title: Apply for a business loan | business.gov.au.

Visible text includes: "4. Shop around It’s a good idea to compare loan products from multiple lenders before applying." and "6. Get your paperwork ready" with identification, business plan, financial reports, forecasts, and lease agreements.

Supports line 109: the guide "provides a useful baseline for documentation and offer comparison." It is a general business-loan page, not a commercial-property credit policy. The word "baseline" fits.

### APRA APG 113

Declared URL: `https://www.apra.gov.au/sites/default/files/2024-06/Final%20Prudential%20Practice%20Guide%20APG%20113%20Capital%20Adequacy%20Internal%20Ratings-based%20Approach%20to%20Credit%20Risk%20-%20Clean_0.pdf`

Node GET **200** after redirect to `https://www.apra.gov.au/system/files/2024-06/Final%20Prudential%20Practice%20Guide%20APG%20113%20Capital%20Adequacy%20Internal%20Ratings-based%20Approach%20to%20Credit%20Risk%20-%20Clean_0.pdf`. `application/pdf`. 888553 bytes. June 2024 APG 113.

Extracted text supports the bank-risk sentence on line 109:

- Glossary: "ADC" is "Land acquisition, development and construction as defined in APS 112."
- Paragraph 12: income-producing real estate is funding "where the prospects for repayment depend primarily on the cash flows generated by the asset or other real estate owned by the borrower."
- Attachment B maps commercial real estate collateral under specialised lending IPRE to "Commercial property – dependent on property cash flows", and maps "land acquisition for development and construction purposes, or the development and construction of real estate" to ADC.

Limitation: this is ADI capital classification, not a borrower rate or eligibility rule. Paragraph 14 also says a borrower whose primary business is real estate investment or development is usually still IPRE. The guide's phrase "treated differently within bank risk frameworks" matches the cash-flow versus ADC mapping. It does not say every development loan sits outside IPRE.

## Release readiness

NOT ELIGIBLE. These are release blockers. They are not hidden and they do not flip the content verdict to REVISE.

1. `expiresAt: "2026-11-05"` is in the past. `npm run qa:content` equivalent (`node scripts/content-quality-gate.mjs` with `CONTENT_QA_BASE` at the base SHA) fails with `expiresAt is in the past`, reported twice (publication contract and the high-risk check). Article QA fails on the same error only.
2. No `data/seo-repairs/repair_*.json`. `node scripts/verify-content-repair-scope.mjs` throws `Repair release requires exactly one added manifest`.
3. Review metadata is the old automated audit, not the canonical independent reviewer, instant, and 90-day expiry. `reviewed_date` is still present.
4. The ATO declared URL is HTTP 403 to Node and curl GET. A general-information manifest cannot honestly set that source's `status` to 200 from this network. `validateGeneralInformationReview` requires status 200, and the live check requires 2xx.

`node scripts/seo-change-risk.mjs` against the base SHA: `R2 M src/content/guides/commercial-property-loans-australia-complete-guide.md: material content or targeting change`. Computed risk R2.

Not re-run here: typecheck, lint, the full 162 tests, production audit, the 384-route production build, smoke, and Lighthouse. The writer reports those passed. This review independently built with Vite, prerendered the target and its link destinations, and ran the risk, content, article, and repair-scope checks.

## R2 policy, without inventing owner approval

- This edit's change class is R2, "material content or targeting change".
- The page registry ceiling stays `maxAutomatedChangeRisk: R0` and `contentRisk: high`. R2 does not raise that ceiling. Do not edit the registry in this repair.
- Daily-content policy `allowedRisk: R2` is for one new low-risk article on `ai/daily-content-*`. It does not authorise this high-risk repair.
- Repair releases use branch prefix `ai/content-repair-` (this branch matches), and the policy text calls for labels `seo-risk:R2` and `automation-policy:content-repair-v1`. This PR has neither label. This review did not add them.
- A substantive high-risk edit without `reviewMode: general-information-v1` "requires genuine financial review outside routine automation". This review does not supply that, and it does not record Ben or anyone else as approving these bytes.
- The active repair policy `property-content-repair` version `2026-10-03.1`, checksum `f0eed6f990499b778fb59ec9dc16bae21e0aca53995fad4d6ca111fb47cb1c86`, authorization reference `automatic-general-information-programme-2026-10-03`, is an existing programme authority from Daniel Shelest dated 2026-10-03 for general-information body work after independent automated review. It says no professional-review attestation is granted. It is not an approval of this head.
- `reviewedBy: "OpenClaw SEO source audit"` is on the retireable automated list, and registry `reviewOwner` `financial-review` is a queue, so a later general-information metadata update is allowed to replace reviewer, review instant, and expiry. `humanReviewRequired: true` on the page must stay. It is not registry `governance.humanReviewRequired`, so it does not block that supersession.

## Metadata the writer may apply after this PASS

Only if the public prose stays the prose at sha256 `29126036fb202a486261f8c448c5b233414169761c7826a0bc12e3ce97f6cc2f`. A metadata-only follow-up changes the file hash. The manifest `afterSha256` and `generalInformationReview.reviewedSourceSha256` must be the new file. This PASS does not cover any other prose edit. Replacing the ATO URL, or rewriting the tax sentence, is a new head and needs another check of that claim.

If this review instant is adopted:

- `reviewedBy`: `OpenClaw independent reviewer`
- `reviewedAt`: `2026-11-08T21:10:07.000Z`
- `expiresAt`: `2027-02-06T21:10:07.000Z` (that instant plus 90 times 86400000 ms, the high-risk `reviewEveryDays` of 90)
- Remove `reviewed_date`. Do not add `reviewed_by`, `reviewed_at`, `expires_at`, `content_risk`, or another review alias.
- Leave `reviewStatus` as `automated-editorial-review`.
- Leave `humanReviewRequired` true. Leave `contentRisk` high. Leave author Ben and date `2025-10-08`.
- Manifest reviewer string is `OpenClaw independent reviewer`, not a human name and not "Grok 4.7". `human: false`. `professionalFinancialReview: false`. `automated: true`. Score 90.5. `blockingFindings` empty. `claimCoverage: complete`.
- `kind: substantive`, `reviewMode: general-information-v1`.
- Policy id, version, checksum, and authorization reference as copied above. `baseSha` must be exact current main at release time. If main is no longer `fa421ca4dffdfe9fb3030455f92ad26b7718a9b5`, rebase and refresh the base field.
- Editor and reviewer must differ.
- Evidence reference must be an `https://cursor.com/agents/...` run URL for this review, not a made-up approval.
- Source rows: business.gov.au status 200 and APRA status 200 are justified for a GET on this date, with the APRA final URL noted. ATO status must be the status the release GET actually returns. It was 403 here. Do not write 200 from the WebFetch text.

Until an ATO GET returns 2xx, or the declared ATO URL is removed or replaced and re-reviewed, the repair scope check with live sources cannot pass. That is why this PASS is not release eligibility.
