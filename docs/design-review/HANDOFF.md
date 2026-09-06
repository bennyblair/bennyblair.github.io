# Emet Capital private design review

This is a separate review copy. The production domain, hosting, main branch, content automation and lead delivery are unchanged.

The updated homepage follows the owner's request for a closer Old Tom Capital feel: immersive property photography, confident scale, generous spacing, mineral-white reading areas and restrained eucalyptus-green sections. It keeps the Emet identity and uses licensed photographs of real Australian buildings. Stock photography is identified as representative, not as client property.

## Design changes

- A cinematic architectural homepage opening with a docked enquiry panel and readable text. The main scroll prioritises three property services, two scenarios, a cylinder-led process and three insights. Native disclosures retain the remaining services, stories, summaries, broker expertise and nationwide coverage in HTML.
- Distinct service, location, article, guide-directory, case-study and utility layouts. Articles gain a readable column and contents rail; contact and calculator controls appear early.
- Named layouts replace the old 2,665-line positional theme. React, Vite, prerendering and production dependencies remain.
- Missing images are restored at existing URLs. Explicit image assignments are shared by article rendering and metadata; eight unrelated crops are replaced with licensed property photographs. Case-study and calculator schema image defects are repaired.
- Contents anchors work across Windows and Unix line endings. FAQ headings use the same anchor as their contents entry. Case-study FAQ text previously stripped by the shared renderer is shown.
- Native navigation retains open state and keyboard focus when JavaScript arrives. React text-node boundaries are preserved during prerendering, avoiding a homepage hydration repaint.
- The homepage receives only the article metadata it displays. Compressed responsive photographs and thumbnails reduce transfer size.

## Cinematic homepage revision

The opening now uses a slow camera move, scroll-linked architectural linework, three deliberate headline lines and a docked enquiry panel. Property services sit beside a tall building photograph; scenario images are larger and staggered; the process now pairs a dimensional wireframe cylinder with four clear HTML steps. Native scrolling is preserved. The global pause control cancels hero and entrance effects and freezes the cylinder at its current position. Reduced-motion preferences suppress automatic motion initially and when changed. Text is immediately visible in the saved HTML; animation does not gate content or navigation.

All 11 motion acceptance checks passed, including ordinary/reduced motion, pause/resume, delayed JavaScript, clean hydration and 200% enlarged control layout. See `motion-acceptance.json`. The revision retains the same metadata, substantive copy and destinations, and adds no dependencies.

## Staged cylinder refinement

How It Works now plays one finite, 7.8-second journey when the cylinder enters view: four 1.2-second rests connected by three one-second eased descents. Each arrival lights the corresponding ring and HTML step. Desktop ring heights align with the four stage markers. The original sphere, translucent cylinder, fine rear lines and soft ground lighting remain; a restrained ring halo and moving sphere shadow add depth.

Scroll speed does not control the ball. The clock freezes while the graphic is largely offscreen or the document is hidden, and resumes when visible. Both the local and global pause controls preserve the exact current position. Replay starts at Enquiry; keyboard-accessible stage markers let a reader inspect a particular stop. Explicit selection outside the graphic's viewport, or with reduced motion enabled, is immediate. Normal visible selection follows the same staged timeline and holds at the requested stage. Play always resumes forward. On mobile, player controls sit directly below the cylinder.

All four original stage headings and descriptions remain visible HTML. The diagram has a static initial pose without JavaScript, and its controls do not introduce a hydration attribute mismatch. Reduced motion suppresses autoplay while retaining explicit stage selection. The sequence does not loop or intercept scrolling. No new dependencies, image downloads, page URLs or editorial changes were introduced.

The cylinder acceptance now checks real timed rests, corresponding ring and text emphasis, local/global pause, replay, manual selection in both directions, fast-scroll behaviour, offscreen resume, reduced motion, responsive layout and original prerendered nodes. Document-hidden handling is source-reviewed; the browser suite explicitly tests the offscreen lifecycle. All 14 checks pass on the final prerendered preview, alongside the 11 motion checks and 89 design checks. See `cylinder-acceptance.json`.

## SEO comparison and intentional exceptions

The baseline is the live 380-URL sitemap captured on 6 September 2026 (Australia/Sydney). Source started from fresh remote main at `37f446f156a572f1cec300aa031f16db8aa15293`, on `codex/emet-design-preview`.

The comparison preserves all sitemap routes, titles, descriptions, H1s, production canonicals and internal link destinations. Every sitemap page remains reachable from the homepage. No markdown editorial content was rewritten. Substantive text, authors, review details, FAQs, disclosures, related resources, form fields and calculator logic are retained.

Intentional review exceptions:

1. Homepage “Success Stories” / “Real deals, real results, real growth” labels become explicit illustrative-scenario wording. This is a proposed claim correction for review; the underlying stories remain.
2. Broken and unsuitable photographs receive replacements, accurate alt text and captions. Three case-study Article schema image URLs replace nonexistent generated fallbacks. See the image configuration and provenance.
3. Broken FAQ fragments now resolve. The reserved `timeline` slug becomes `section-timeline`. Previously stripped case-study FAQs are restored.
4. Only the review build receives noindex, nofollow and noarchive. Normal production builds retain the existing indexing settings and canonical targets.

The JSON comparison records raw differences. Script ordering is not a semantic schema change. The comparison recognises exact rendered text across React text-node separators; it does not ignore changed numbers or punctuation.

The prerender command now requires its own server to start at the requested port and rejects an occupied port. This prevents a running review copy from being captured into a normal build. The occupied-port check confirmed rejection without modifying the homepage; a clean-port render passed. The final normal build preserves all 380 routes' production metadata and indexing settings.

## Private review behaviour

Sites access is restricted to the account owner, with no additional viewers or groups. Robots meta directives, robots.txt restrictions and an X-Robots-Tag header provide additional indexing protection.

Both forms retain their production fields and validation. Submitting them displays a preview confirmation and sends no lead. Production analytics scripts and event delivery are excluded; a preview-only form-action policy prevents native submissions. Navigation stays within the review copy. Production canonical and schema identity URLs remain unchanged. Content administration is unavailable in this review.

## Validation and release decision

Type checking, unit tests, lint, SEO control-plane checks, protected cohort, content quality, production dependency audit, prerender verification and browser smoke tests were run. Lint has nine existing Fast Refresh warnings. The full automated accessibility scan passed all 380 canonical routes. All 89 targeted acceptance checks passed at 320, 390, 768, 1024, 1280 and 1440px, including synthetic 200% text enlargement, delayed/disabled JavaScript and simulated forms. This tests doubled computed text sizes, not browser UI zoom. See `browser-acceptance.json` and `SEO-COMPARISON.md`. The 74 unit tests passed.

The recorded production-mode mobile Lighthouse run passed the existing budgets: **LCP 2,494 ms; CLS 0; TBT 66 ms; accessibility 100; SEO 100; initial JavaScript 108,031 bytes**. LCP is close to its 2,500-ms threshold, so rerun the production gate before release. These are laboratory measurements, not real-visitor Core Web Vitals.

**Full CI is not claimed green.** The claim gate rejects the unchanged phrase “access to over 50 lenders” in nine existing service pages when their presentation is edited. Every exact phrase exists in both the source baseline and live website. Neither the wording nor the gate was weakened to obtain a pass. The owner/colleague must verify the evidence and resolve this before production promotion. See `claim-gate-baseline.json` and `release-review.md`.

Production promotion is a separate decision. Before release, capture Search Console and organic-conversion baselines, resolve the inherited claim gate, rerun production CI and retain a rollback deployment. Technical preservation can be checked; search rankings cannot be guaranteed.

## Colleague handoff

- Review build: `npm run build:review`. Production build remains `npm run build`.
- Cylinder acceptance: `npm run qa:cylinder -- http://127.0.0.1:4173`.
- Motion acceptance: `npm run qa:motion -- http://127.0.0.1:4173`.
- Browser acceptance: `npm run qa:design -- http://127.0.0.1:4173 --screenshots`, after `npm run preview`.
- Apply the separate binary implementation patch to the matching baseline in an isolated branch for review. Do not publish the review build to the production domain.
- `.openai/hosting.json` belongs to the separate Sites review. Production `netlify.toml` and the route manifest are preserved.
