# Rendered SEO Hygiene Audit - 2026-06-03

## Scope

- Branch: `ai/seo-hygiene-2026-06-03`
- Production target: `https://emetcapital.com.au` (read-only)
- Audited URLs: 42 production URLs across homepage, static pages, service pages, city pages, guide pages, case studies, and tool pages.
- Browser audit mode: Chrome DevTools MCP throwaway client against public prod, headless and isolated. No logged-in profile, no OpenClaw browser sidecar, no prod writes.
- Screenshots: `audits/seo-hygiene-2026-06-03-screenshots/`
- POC reference reviewed: `audits/chrome-devtools-mcp-poc-2026-06-02.md`

## Baseline Confirm

Preflight started from a dirty worktree on `ai/daily-content-2026-06-02`; untracked user content was stashed before touching `main`:

- `stash@{0}: On ai/daily-content-2026-06-02: pre-seo-hygiene-2026-06-03-dirty-worktree`

Then `main` was checked out, `git pull --ff-only` was run, and branch `ai/seo-hygiene-2026-06-03` was created from clean `main`.

Baseline checks on clean branch:

| Check | Result | Notes |
| --- | --- | --- |
| `npm run build` | PASS | 323 static route HTML files generated; sitemap generated with 321 canonical URLs. |
| `npm run qa:geo-static` | PASS | Existing GEO static HTML QA passed. |
| `npm run audit:chrome` | PASS | Existing Chrome link audit passed. Generated audit JSON was restored to keep the baseline clean. |
| `node scripts/audit_links.js` | PASS | No broken internal links found. |

Build warnings observed but not changed: missing `src/content/insights` directory warning, stale Browserslist data warning, gray-matter eval warning, and large chunk warning. These are out of scope for this hygiene PR.

## Audited URLs

1. `/`
2. `/about`
3. `/about/ben`
4. `/contact`
5. `/privacy-policy`
6. `/editorial-standards`
7. `/resources`
8. `/resources/guides`
9. `/resources/case-studies`
10. `/resources/tools`
11. `/resources/faqs`
12. `/resources/glossary`
13. `/services`
14. `/services/commercial-property-finance`
15. `/services/bridging-finance`
16. `/services/private-lending`
17. `/services/first-second-mortgages`
18. `/services/caveat-loans`
19. `/services/asset-backed-lending`
20. `/services/working-capital`
21. `/services/trade-finance`
22. `/services/bridging-finance/cities/sydney`
23. `/services/private-lending/cities/melbourne`
24. `/services/caveat-loans/cities/brisbane`
25. `/services/asset-backed-lending/perth`
26. `/resources/guides/caveat-loans-australia-complete-guide`
27. `/resources/guides/what-is-private-lending-australia`
28. `/resources/guides/second-mortgages-for-business-guide`
29. `/resources/guides/bridging-finance-australia-complete-property-guide`
30. `/resources/guides/commercial-property-valuation-delay-case-study`
31. `/resources/guides/private-lending-bank-decline-case-study`
32. `/resources/guides/how-to-buy-commercial-property-step-by-step-guide`
33. `/resources/guides/working-capital-loans-for-smes`
34. `/resources/case-studies/case-study-second-mortgage-saved-this-business-50k`
35. `/resources/case-studies/case-study-bridging-loan-won-the-property-auction`
36. `/resources/case-studies/adelaide-cbd-asset-backed-lending`
37. `/resources/case-studies/surry-hills-commercial-acquisition`
38. `/resources/tools/commercial-property-loan-calculator`
39. `/resources/tools/bridging-loan-calculator`
40. `/resources/tools/second-mortgage-calculator`
41. `/resources/tools/loan-comparison-tool`
42. `/resources/tools/working-capital-calculator`

## Summary

Critical rendered SEO failures were not found in the sampled production set:

- No live-but-empty SPA pages.
- No missing rendered title, meta description, canonical, robots, lang, or viewport in the sample.
- No malformed JSON-LD syntax found in rendered JSON-LD blocks.
- No missing image alt text found in the sample.
- No broken rendered internal links found in the sampled link graph.
- All sampled URLs returned final HTTP 200 status.

One safe mechanical issue type was found and fixed in this PR:

- Heading hierarchy jumps from rendered page `h1` to immediate `h3`.

Two issue types need human decision and were not changed:

- Title length tuning on eight sampled pages.
- Third-party console/network failures involving Zyro tracking and Google Tag Manager in the MCP environment.

## Findings By Severity

### Medium - Mechanical Heading Hierarchy

Production rendered audit found 12 heading jumps in the sampled URLs. A follow-up generated-HTML check across all built `dist/**/index.html` routes found the same issue more broadly, with 46 additional content pages whose first body heading rendered too deep.

Sampled prod findings:

| URL | Jump | Heading text |
| --- | --- | --- |
| `/resources/glossary` | `h1` to `h3` | Categories |
| `/resources/guides/caveat-loans-australia-complete-guide` | `h1` to `h3` | Related In-Depth Guides |
| `/resources/guides/what-is-private-lending-australia` | `h1` to `h3` | Related In-Depth Guides |
| `/resources/guides/second-mortgages-for-business-guide` | `h1` to `h3` | Related Second Mortgage And Exit Guides |
| `/resources/guides/commercial-property-valuation-delay-case-study` | `h1` to `h3` | Related In-Depth Guides |
| `/resources/guides/private-lending-bank-decline-case-study` | `h1` to `h3` | Related In-Depth Guides |
| `/resources/guides/working-capital-loans-for-smes` | `h1` to `h3` | Related In-Depth Guides |
| `/resources/case-studies/case-study-second-mortgage-saved-this-business-50k` | `h1` to `h3` | At a Glance |
| `/resources/case-studies/case-study-bridging-loan-won-the-property-auction` | `h1` to `h3` | At a Glance |
| `/resources/tools/bridging-loan-calculator` | `h1` to `h3` | Calculate Your Bridging Loan |
| `/resources/tools/loan-comparison-tool` | `h1` to `h3` | Loan 1 |
| `/resources/tools/working-capital-calculator` | `h1` to `h3` | Working Capital Analysis |

PR action:

- Promoted standalone component headings to `h2` where the page template already owns the `h1`.
- Added screen-reader-only `h2` grouping labels before calculator card grids where visible card headings begin at `h3`.
- Promoted generated/content body headings that skipped from the template `h1` to `h3`.
- Updated `scripts/inject-hierarchy-signals.cjs` so future injected "Related In-Depth Guides" sections render as `h2`.
- Regenerated `src/lib/precompiled-content.ts`.

Post-fix verification:

- `npm run build`: PASS
- `npm run qa:geo-static`: PASS
- `node scripts/audit_links.js`: PASS
- Generated heading hierarchy check across all `dist/**/index.html`: PASS

### Low - Title Length Tuning

Eight sampled pages have title lengths outside the target range. These are copy and SERP-snippet choices, not missing or duplicate title failures, so they were not auto-fixed.

| URL | Length | Title |
| --- | ---: | --- |
| `/privacy-policy` | 29 | `Privacy Policy | Emet Capital` |
| `/services/private-lending` | 68 | `Private Lending | Non-Bank Commercial Loans Australia | Emet Capital` |
| `/services/caveat-loans` | 70 | `Caveat Finance for Property Developers & Business Loans | Emet Capital` |
| `/services/asset-backed-lending` | 70 | `Asset-Backed Lending Australia | Business Asset Finance | Emet Capital` |
| `/services/trade-finance` | 72 | `Trade Finance Solutions Australia | Import Export Funding | Emet Capital` |
| `/resources/tools/commercial-property-loan-calculator` | 76 | `Commercial Property Loan Calculator: Estimate Your Repayments | Emet Capital` |
| `/resources/tools/bridging-loan-calculator` | 61 | `Bridging Loan Calculator Australia: Calculate Costs Instantly` |
| `/resources/tools/working-capital-calculator` | 66 | `Working Capital Calculator | Business Liquidity Analysis Australia` |

Recommendation: tune these as a separate copy decision if desired. Do not bundle with mechanical SEO hygiene.

### Low - Third-Party Console And Network Noise

Every sampled URL produced console/network noise in the isolated headless browser from the same third-party families:

- `www.zyro.world` CORS failures and failed API calls for experiments, goals, session, snapshot, and tracker endpoints.
- `www.googletagmanager.com/gtag/js?id=G-EWJCDYNTCG` reported as `net::ERR_BLOCKED_BY_ORB` in the MCP environment.

This was not auto-fixed because it may involve analytics/vendor setup, consent/tracking choices, or production third-party configuration. It is not a deterministic site-source SEO fix.

Recommendation: decide separately whether Zyro tracking is intentional and whether GTM loading behavior should be adjusted. If retained, keep these warnings out of strict article-level SEO gating to avoid noisy false positives.

## Rendered Metadata And Structured Data

Across the 42 sampled URLs:

- Final URL/status: all sampled pages resolved to expected canonical production URLs with HTTP 200.
- Titles/meta descriptions: present on all sampled pages.
- Canonicals: present and self-referential on all sampled pages.
- Robots: rendered as indexable on all sampled pages.
- Lang/viewport: present on all sampled pages.
- JSON-LD: rendered JSON-LD blocks parsed as valid JSON.
- H1: exactly one rendered H1 on sampled pages.
- Internal links: 278 rendered internal paths checked; no broken links and no sampled orphan paths.

## Lab Performance Traces

Lab-only traces were captured once per template type. CrUX field data was requested through the MCP trace path but returned no data for these exact pages. GSC/CrUX remain the field source of truth; no passive INP claim is made here.

| Template | URL | LCP | CLS | Field data |
| --- | --- | ---: | ---: | --- |
| Homepage | `/` | 313 ms | 0.00 | n/a in CrUX |
| Static | `/about` | 235 ms | 0.00 | n/a in CrUX |
| Service index | `/services` | 436 ms | 0.00 | n/a in CrUX |
| Service | `/services/commercial-property-finance` | 240 ms | 0.00 | n/a in CrUX |
| City service | `/services/bridging-finance/cities/sydney` | 208 ms | 0.00 | n/a in CrUX |
| Resources hub | `/resources` | 218 ms | 0.00 | n/a in CrUX |
| Guide index | `/resources/guides` | 555 ms | 0.00 | n/a in CrUX |
| Guide | `/resources/guides/caveat-loans-australia-complete-guide` | 492 ms | 0.00 | n/a in CrUX |
| Case study | `/resources/case-studies/case-study-second-mortgage-saved-this-business-50k` | 408 ms | 0.00 | n/a in CrUX |
| Tool | `/resources/tools/commercial-property-loan-calculator` | 207 ms | 0.00 | n/a in CrUX |

## Existing Tooling Comparison

Existing checks still matter and were reused:

- `qa:geo-static` is strong for static HTML render presence, canonical presence, H1 presence, and minimum content volume.
- `audit:chrome` and `scripts/audit_links.js` are strong for internal link breakage.
- The rendered MCP/browser pass is cleaner for inspecting post-JS metadata, console/network failures, rendered outline, screenshots, and template-level lab traces in one run.

What the rendered audit caught that baseline scripts did not flag:

- Rendered heading hierarchy jumps in component and content pages.
- Third-party console/network errors.
- Per-URL screenshots and template-labelled lab traces.

What existing scripts caught or confirmed better:

- Fast deterministic static HTML generation checks.
- Link graph breakage checks without the noise of third-party browser requests.
- Existing build-time sitemap/static route coverage.

## Needs Human Decision

Do not change these in this PR:

- Title length tuning on the eight sampled pages listed above.
- Any canonical choice beyond missing self-canonical on unambiguous routes.
- Redirects, rewrites, robots/noindex, sitemap structure, or production tracking/vendor setup.
- Zyro/GTM console and network behavior.
- Broader performance optimization beyond lab-only observations.

## Safe Fix Applied

One granular fix commit was created:

- `Fix mechanical SEO heading hierarchy`

No source changes were made for canonical policy, redirects, robots/noindex, sitemap structure, tracking setup, or content rewrite decisions.
