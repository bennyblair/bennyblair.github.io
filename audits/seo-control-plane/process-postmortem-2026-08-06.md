# SEO and LLM operating-process postmortem — 2026-08-06

## Executive summary

The primary failure was not a single technical SEO defect. It was the absence of a shared operating system for deciding what each URL owns, what evidence is sufficient, who may approve a change, and whether an automated job is allowed to execute it. The website, Search Console exports, OpenClaw jobs, AI-prompt files and authority data each carried part of the truth, but no durable control plane joined them.

That fragmentation produced four recurring symptoms:

1. page age could be mistaken for evidence that a rewrite was warranted;
2. partial or missing measurement could be treated ambiguously instead of explicitly unavailable;
3. legacy pages could be changed before query ownership, risk and protection state were verified; and
4. scheduler prompts and environment defaults carried more authority than versioned policy and tests.

The remediation establishes a fail-closed SEO control plane. It does not claim that all 489 records have been editorially improved. It makes the estate measurable and reviewable, prevents unsafe automatic changes, and creates a ranked evidence-led backlog for content and LLM work.

## What the evidence says now

- The canonical estate contains 489 records: 369 indexable URLs, 109 redirect sources and 11 noindex URLs.
- 316 legacy records still require metadata and query-ownership review. Until reviewed, their automation ceiling is R0: observation only.
- 111 routes are protected from material action without an explicit emergency override. This includes the noindex-pending-evidence cohort.
- Search Console recorded 32 clicks and 12,836 impressions from 6 July to 2 August 2026, versus 27 clicks and 21,238 impressions in the preceding equal window. Clicks increased 18.5%, impressions fell 39.6%, and aggregate CTR rose from 0.13% to 0.25%. This comparison is directional, not causal.
- The segmented query export contained 1,999 rows. Because Search Console suppresses some queries, the 2 observed non-brand clicks are a lower bound rather than the true total.
- Eleven exact registered target queries were observed: three ranked in the top 10 and five in the top 20.
- The evidence-led recovery queue found ten review candidates and excluded 19 protected observed pages. It authorised no edits.
- The initial AI canary covered one of 30 fixed prompts. Emet received zero mentions and zero linked citations; the sampled Google AI Overview was only partly accurate.
- Qualified organic leads are unavailable because no validated aggregate GA4/CRM snapshot has been connected. They are not reported as zero.

## Root causes

### 1. There was no canonical page identity or lifecycle record

Routes, content files, redirects, protected-page lists, tracking plans and bot state were maintained in separate places. A job could see a URL without reliably knowing its stable page ID, canonical owner, indexability, lifecycle state, review status or protection state.

**Why it mattered:** duplicate intent, redirect mistakes, accidental work on protected pages and inconsistent reporting were all structurally possible.

**Remediation:** a versioned registry now covers the complete route estate, supplies stable page IDs and records indexability, query ownership, lifecycle, protection, evidence and automation ceiling. Registry validation must pass in CI and during runtime source sync.

### 2. Elapsed time was used as a decision proxy

The former Day-45 process treated page age as if it were a performance diagnosis. Age is useful for opening a review window, but it cannot establish low demand, poor answer fit, cannibalisation, a weak snippet or business value.

**Why it mattered:** a page could be rewritten simply because enough days had passed, including pages with too little data or pages in a protected recovery cohort.

**Remediation:** age can now create a review-due event only. Recommendations require evidence and material execution requires the applicable approval. The Day-45 job has been replaced by an evidence-led, proposal-only recovery selector.

### 3. Measurement was partial and availability semantics were weak

The previous export was page-only, query cohorts were unavailable, host variants could fragment a canonical page, and downstream business outcomes were not connected. There was no strict distinction between a measured zero and a missing source.

**Why it mattered:** the bot could optimise toward impressions or arbitrary content age without knowing query ownership, branded/non-branded demand or qualified lead impact.

**Remediation:** the collector now preserves page, query, device, country and brand/non-brand dimensions; canonicalises paths; labels privacy-limited evidence; and stores unavailable sources explicitly. Weekly scorecards expose source coverage and cannot zero-fill GA4/CRM gaps.

### 4. Import and scheduler state lacked strong transactional guarantees

Jobs depended on long prompt bodies and overlapping schedules. The first repair pass also exposed the class of failure directly: a bad import could leave partial rows unless the full operation was transactional.

**Why it mattered:** retries could duplicate work, partial failures could pollute the evidence base, and policy changes were difficult to audit.

**Remediation:** migrations enforce foreign keys, WAL mode and append-only audit logs; imports are atomic and idempotent; jobs use locks and unique windows; source definitions are checksummed; and scheduler payloads call narrow, versioned commands.

### 5. Automation authority was implicit and too broad

The former system did not consistently separate observation, recommendation, approval and execution. Environment defaults could also be permissive if a safety variable was missing.

**Why it mattered:** a content bot, outreach process or merge workflow could acquire more practical authority than intended.

**Remediation:** the risk model now limits automatic merging to R1 internal-link-destination-only edits. Metadata, copy, structured data, canonical, redirect, noindex and new-page changes require higher controls. Outbound email fails closed, remains draft-only, and has zero daily and global send capacity by default.

### 6. Content production was not sufficiently constrained by query ownership

The estate has 236 guides and 84 location pages, but 316 legacy records lack completed metadata/query-owner review. Volume made it harder to distinguish a useful supporting article from a competing near-duplicate or low-evidence location variant.

**Why it mattered:** publishing more pages could dilute internal authority, create cannibalisation and add maintenance cost without increasing qualified visibility.

**Remediation:** every new URL must pass a business-case gate covering unique intent, designated service owner, evidence, differentiation, conversion role and measurement plan. The default growth motion is now to improve an existing eligible page with demonstrated impressions before creating another URL.

### 7. AI visibility and authority work were disconnected from page quality

Prompt sets, AI observations and outreach targets did not share immutable source provenance. A brand mention could be confused with a linked citation, and outreach work could be prepared without a common audit trail.

**Why it mattered:** superficial mention counts could look like progress even when assistants did not cite Emet, answers were inaccurate or outreach had no measurable relationship to priority entities.

**Remediation:** fixed prompt sets are checksummed, results distinguish mention from linked citation, answer accuracy is reviewed, and cited URLs are stored. Authority work orders are source-backed and deduplicated; canaries create drafts only, with no email or form submission authority.

## Recommended operating model

### Weekly: measure, diagnose and propose

1. Import a final, equal-window segmented GSC snapshot and the validated aggregate GA4/CRM outcome snapshot.
2. Publish the scorecard with clicks, impressions, CTR, registered-query coverage, non-brand visibility, qualified leads and source-availability flags.
3. Run the recovery selector on eligible, indexable, unprotected pages only.
4. Review the highest-opportunity proposals using the actual query set, SERP intent, page role, conversion path and competing Emet URLs.
5. Approve a bounded hypothesis and measurement window; do not approve a generic rewrite.

### Monthly: manage the portfolio and AI surface

1. Complete one controlled legacy-review batch of at most 50 records, prioritising business-critical pages and observed opportunity pages.
2. Review query ownership and cannibalisation before any consolidation, redirect, noindex or new URL proposal.
3. Run all 30 fixed AI prompts across the supported engines, recording linked citations separately from mentions and grading factual accuracy.
4. Convert recurring AI answer gaps into entity, evidence and answer-structure proposals on existing owner pages.
5. Audit authority drafts, duplicate domains, unsafe claims and send history; keep sending disabled until a separately approved outreach program exists.

### Per change: use a risk and evidence contract

- **R0 — observation only:** unreviewed, protected, incomplete or unavailable evidence.
- **R1 — automatic merge permitted:** internal-link destination changes only, with no anchor-text, prose, metadata, frontmatter or external-link change, after the full CI suite passes.
- **R2–R4 — human approval required:** copy, metadata, schema, new pages, canonicals, redirects, noindex/retirement, financial claims and outbound actions.
- Every proposal must state the stable page ID, hypothesis, evidence window, baseline, owner, expected benefit, downside risk, rollback and review date.

## Content and LLM growth recommendations

### First content wave: improve existing demand capture

Review the ten recovery candidates in score order. The first wave should focus on pages already close enough to win with a better snippet or clearer answer, including second-mortgage consent refusal, no-credit-check caveat loans, GST settlement finance, letters of credit versus trade finance and franchise fit-out finance. Test title/description alignment, a concise opening answer, decision criteria, qualification boundaries and one clear next step.

The second wave should address pages with high impressions but weaker positions, including bridging-loan lenders, equipment finance and leasing, the caveat-loans guide and caveat-lenders directory. These need intent and cannibalisation review before expansion. Likely fixes include stronger comparison methodology, lender-selection criteria, evidence-backed tables, original scenarios, named sources and internal links from the appropriate service hub.

### Build citation-worthy answer units, not “AI SEO” filler

- Put a direct, qualified answer near the top of each owner page.
- Define the entity and Australian context unambiguously.
- Use concise comparison tables, checklists, eligibility boundaries and worked examples that can be cited independently.
- Attach sources and review dates to time-sensitive claims; avoid universal claims about approval or settlement speed.
- Keep organisation, service, author/reviewer and breadcrumb structured data consistent with visible content.
- Strengthen entity consistency across service pages, author/reviewer profiles, relevant directories and earned third-party coverage.
- Measure success as linked citations, accurate representation and qualified visits/leads—not the presence of AI-oriented wording.

### Do not scale location or long-tail page creation yet

New location-led variants remain blocked until a unique local need, evidence, differentiated content and a valid service-owner relationship are demonstrated. The current estate is large enough that systematic improvement and consolidation analysis should precede further page production.

## Owners, service levels and guardrails

| Control | Owner | Service level | Guardrail |
|---|---|---|---|
| GSC import and scorecard | SEO bot | Weekly, after final data | Partial/unavailable sources labelled |
| GA4/CRM aggregate outcomes | Analytics/business owner | Connect and validate before optimisation use | No PII; missing is unavailable |
| Recovery proposal triage | SEO lead | Top ten weekly | No protected or unreviewed execution |
| Legacy review | SEO/content owner | Up to 50 records monthly | Review is not approval |
| Material page changes | Human approver | Per proposal | Hypothesis, rollback and review date required |
| AI visibility canary | SEO/LLM owner | Monthly fixed prompt set | Mention is not citation; accuracy graded |
| Authority drafts | Human relationship owner | Monthly audit | Draft-only; no forms or sends |
| Automation release | Engineering/SEO owner | Per release | Full CI, canary, backup and rollback evidence |

## Success criteria for the next 90 days

- 100% of business-critical legacy records reviewed, then at least two additional batches completed without bypassing the risk gate.
- 100% weekly GSC scorecard cadence with no duplicate windows and explicit source coverage.
- Validated aggregate qualified-organic-lead reporting connected; until then the metric remains unavailable.
- At least 80% coverage of the fixed AI prompt set per monthly run, with citation rate and accuracy reported separately.
- Every material content change traceable to one approved proposal and one stable page ID.
- Zero unauthorised content executions, emails, forms, noindex actions, redirects or indexing requests.
- Growth evaluated against equal-window baselines and qualified outcomes, with no fixed ranking or traffic guarantee.

## Remaining decisions and evidence gaps

- Connect and validate the aggregate GA4/CRM conversion source and agree the definition of a qualified organic lead.
- Complete human metadata/query-ownership reviews for the 316 legacy records. Automation has prepared eight bounded batches but cannot truthfully complete editorial judgment on its own.
- Expand the AI canary from 1 of 30 prompts only after confirming the approved observation engines and cadence.
- Decide whether authority outreach should ever move beyond draft-only. That would be a separate approval and policy change, not an SEO optimisation default.

## Conclusion

The process needed repair because it optimised tasks instead of governing decisions. The enhanced system now makes page identity, evidence quality, protection, risk, approval, execution and measurement explicit. The recommended next move is disciplined optimisation of existing demand-bearing pages, paired with qualified-lead measurement and citation-quality monitoring—not another uncontrolled publishing cycle.
