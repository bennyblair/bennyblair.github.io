# On-Page SEO Standard

Use this standard for production pages, generated static HTML, and new guide or case-study content. The goal is boring, durable hygiene: every page should be indexable, understandable, internally connected, and easy for search and answer engines to summarize.

## Metadata

### Title

- Every routable page must render exactly one `<title>`.
- Titles should be unique across the site.
- Target length: 30 to 60 characters before SERP rewriting.
- Include the primary topic near the start.
- Include `Emet Capital` when space allows, especially for service, city, tool, and evergreen resource pages.
- Do not stuff near-duplicate keyword variants.

### Meta Description

- Every indexable page must render one `meta[name="description"]`.
- Descriptions should be unique across the site.
- Target length: 70 to 160 characters.
- Start with a plain-language summary of the page answer or offer.
- Mention Australia or the relevant city/market when that is part of the page intent.
- Avoid generic descriptions that could apply to several pages.

### Robots, Lang, And Viewport

- Every page must render `<html lang="en">`.
- Every page must render one responsive viewport tag.
- Indexable pages should use indexable robots metadata.
- `noindex`, `nofollow`, or restrictive robots changes require human sign-off and must not be introduced as an automatic hygiene fix.

## Canonicals

- Every indexable route must render exactly one canonical URL.
- Canonicals must be absolute `https://emetcapital.com.au/...` URLs.
- Canonicals should be self-referential for unambiguous production routes.
- Redirect aliases, tracking URLs, query URLs, and duplicate route variants must not be emitted as canonical sitemap URLs.
- Canonical choices that require business or routing judgment must be documented as a human decision, not auto-fixed.

## Headings

- Each rendered page must have exactly one visible `h1`.
- The page template owns the `h1`; guide and case-study Markdown body content should normally begin at `##`.
- Heading levels must not skip downward. For example, `h1` to `h3` and `h2` to `h4` are violations.
- Use headings to describe sections, not visual styling.
- Calculator/tool card titles may use lower-level headings only when an enclosing `h2` or equivalent section heading exists.
- Question headings are encouraged for answer-engine sections, but they must still follow the page hierarchy.

## Structured Data

### Site-Wide Rules

- Every JSON-LD block must parse as valid JSON.
- Use absolute URLs in JSON-LD.
- Keep `@id`, `url`, canonical URL, and breadcrumb URLs aligned.
- Do not emit duplicate conflicting entities for the same page topic.
- Schema changes that alter the canonical entity relationship, organization identity, or page type require human review.

### Required By Page Type

- Homepage and major service pages: `Organization` or `FinancialService` as appropriate.
- Guide articles: `Article` or a more specific article-like type, plus `BreadcrumbList`.
- Case studies: article-like structured data plus `BreadcrumbList`.
- Service and city service pages: service-oriented structured data where supported by the existing schema utilities, plus `BreadcrumbList`.
- FAQ pages or pages with substantial FAQ sections: `FAQPage` only when the visible page content contains the same questions and answers.
- Tool pages: `BreadcrumbList`; add tool-specific schema only when the visible tool purpose and metadata are stable.

## Internal Linking

- Every internal link must resolve to a live route, generated static route, asset, or approved anchor.
- Links in rendered production pages must not point to conceptual or unpublished paths.
- New guides should link to at least one relevant service page and at least one relevant guide/case-study page when natural.
- New case studies should link to the relevant service page and at least one related guide or tool when natural.
- Anchor text should describe the destination. Avoid repeated generic anchors such as "learn more" when there is a more specific option.
- Broken internal links are safe to fix automatically only when the intended target is obvious.

## Image Alt Text

- Informative images must have meaningful alt text that describes the image in context.
- Decorative images should use empty alt text.
- Alt text should be concise, normally under 125 characters.
- Do not repeat the page title as every alt value.
- Missing alt text is safe to auto-fix only when the filename, caption, or surrounding content makes the intended description mechanically inferable.

## GEO And Answer-Engine Hygiene

- Lead important sections with the answer before the nuance.
- Use question headings for explicit borrower or broker questions when that matches the content.
- Put the direct answer in the first paragraph after a question heading.
- Prefer short explanatory paragraphs before long lists.
- Keep definitions, eligibility criteria, timelines, risk notes, and examples in clearly labelled sections.
- Use FAQ structured data only for visible FAQ content.
- Avoid vague intros that delay the answer with brand language or generic market setup.

## Content Frontmatter

Guide and case-study Markdown must include the fields required by the existing article pipeline and QA scripts. At minimum, publishable content should provide:

- `title`
- `description`
- `date`
- `author`
- `category`
- `tags`
- `featuredImage` when the page template expects one

The rendered route must preserve the content title, description, canonical path, article body, and structured data after `npm run build`.

## Check Before Publish

Run the relevant checks before publishing or opening a content PR:

- `npm run build`
- `npm run qa:geo-static`
- `node scripts/audit_links.js`
- `npm run qa:seo-page -- --file src/content/guides/<slug>.md`
- `npm run qa:seo-page -- --route /resources/guides/<slug>`

For case studies, use the `src/content/case-studies/<slug>.md` file path and `/resources/case-studies/<slug>` route.

## Non-Automatic Decisions

The following must be flagged for review instead of auto-fixed:

- Canonical policy where more than one live route could be valid.
- Redirects, rewrites, robots/noindex, sitemap structure, and production tracking setup.
- SERP title rewrites that require brand or keyword strategy.
- Major content rewrites, new claims, rates, timelines, lender criteria, or regulated advice.
- Structured-data type changes that alter the page entity model.
