# Website release and measurement runbook

## Release sequence

Promote four separate Netlify deploy previews. Record the production deploy ID
before each promotion so rollback is one atomic deploy:

1. Technical foundation: route manifest, redirects, rendered HTML, sitemap,
   `llms.txt`, real 404s, and shared CI.
2. Performance and accessibility: split content loading, poster-first video,
   tracking, form semantics, focus/contrast, and dependency hygiene.
3. Focused redesign: homepage and commercial-property-finance pillar.
4. Evidence-led consolidation: only redirects approved from the analytics
   classifier and a manual same-intent review.

Run `npm run ci` against each candidate source state. Crawl the deploy preview,
then test the actual Netlify form endpoint because local form submission is
simulated.

## Preview sign-off

- Every sitemap URL returns 200 and exposes one canonical and one H1.
- An unknown path returns a real 404 and `noindex`.
- Redirects are single-hop and resolve to the intended canonical route.
- Homepage, property pillar, service, guide, calculator, and contact are
  keyboard usable and have no automated WCAG violations.
- Submit both Netlify forms with a legitimate test, confirm spam handling, and
  verify exactly one `generate_lead` event per successful submission.
- Verify `phone_click`, `email_click`, `calculator_use`, property journey, and
  property CTA events in GA4 DebugView.
- Confirm the poster is the LCP element and the hero video is not requested
  until after the visitor's first interaction. Reduced-motion visitors retain
  the poster.

## Baseline and URL decisions

Follow `data/analytics/README.md`, then run:

```bash
npm run analytics:classify
```

Archive the resulting baseline outside Git before the first production
promotion. A `Consolidate candidate` row never authorises an automatic redirect;
confirm same intent, content overlap, destination quality, and conversion
impact, then add the approved redirect to the route manifest.

## Post-launch monitoring

For eight weeks, review weekly:

- 404s, redirect chains, sitemap and index coverage;
- mobile Core Web Vitals and representative Lighthouse results;
- property-finance query coverage, impressions, clicks, CTR, and average
  position;
- non-brand organic clicks;
- GA4 organic landing-page engagement and lead events;
- form delivery and spam rejection.

After launch, submit `https://emetcapital.com.au/sitemap.xml` and inspect the
homepage, property pillar, one location page, one guide, one calculator, and one
redirected URL in Search Console.

Success targets are no organic-click loss from redirected URLs after 30 days,
20% more property-finance impressions within 90 days, and 30% more non-brand
property-finance clicks within six months, all against the recorded baseline.

## Webflow checkpoint

Reassess after 90 days of clean data. Consider Webflow only if editor usability
is still the primary constraint. Any migration must preserve the route
manifest, permanent redirects, structured data, forms, analytics events,
rendered HTML, and GitHub content controls.

## Retained risk

The existing video and marketing claims were retained by direction. Claims in
the register marked `legacy-retained` are not internally represented as
verified and must not be expanded or modified without evidence and approval.
