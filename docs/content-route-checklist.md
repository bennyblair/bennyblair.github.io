# Content Route Checklist

Use this checklist for any PR that touches content loading, article feeds, route generation, route definitions, sitemap generation, or link generation.

## When this checklist is required
Run this checklist if the PR changes any of the following:
- `src/lib/content.ts`
- `src/App.tsx`
- homepage latest-article widgets or recent-article components
- guides, case studies, or article detail page loaders
- sitemap / static HTML generation
- redirect logic / `netlify.toml`
- anything that changes URL structure, canonical paths, or route composition

## Pre-merge checks

### 1) Verify only routable content is surfaced in article widgets
- Homepage latest articles must only link to content types with real detail routes
- Recent article widgets must not generate links for content types without a matching route
- If `/resources/<type>/:slug` does not exist, do not surface that type as an article card link

### 2) Verify article detail routes load correctly
Manually open and test at least:
- 2 guide article URLs
- 2 case study URLs
- the 2 newest published guide URLs
- any new content added in the PR

Confirm each page:
- renders real article content
- does not show `Article Not Found`
- does not show `Case Study Not Found`
- does not show Netlify `Site not found`

### 3) Verify hub pages only link to working destinations
Test:
- `/`
- `/resources`
- `/resources/guides`
- `/resources/case-studies`
- `/tools`

Click or inspect sampled links and confirm they land on working pages.

### 4) Verify async content-loading changes end-to-end
If any content loader changed from sync to async:
- confirm all callers `await` it correctly
- confirm list pages still render
- confirm detail pages still render
- confirm related-article sections still render
- confirm no Promise is being treated like an array or object

### 5) Verify routing consistency
- Every surfaced URL must have a matching React Router route or server-level redirect
- No UI link should point to a path that only exists conceptually
- Canonicals must point to the live routed URL, not a short alias

### 6) Verify generated SEO artifacts still match live routes
- run build
- confirm static route HTML generation succeeds
- confirm sitemap generation succeeds
- confirm newly published guides/case studies are included when expected
- confirm redirect aliases are not emitted as canonical sitemap URLs

## Required evidence in the PR description
For PRs touching content loading or routing, include:
- the exact URLs manually tested
- the result of those checks
- whether homepage latest articles were verified
- whether newest published article URLs were verified

## Merge rule
If this checklist applies and the route/content checks were not completed, the PR should not be merged.
