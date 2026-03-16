## Summary
- 

## Verification
- [ ] `npm run build`

## Content / route checklist
If this PR touches content loading, routing, article widgets, sitemap/static HTML generation, redirect logic, or canonical URL handling, complete the checklist in `docs/content-route-checklist.md` before merge.

Required when touching:
- `src/lib/content.ts`
- `src/App.tsx`
- homepage latest-article widgets / recent-article components
- guides / case studies / article detail loaders
- sitemap or static route generation
- `netlify.toml`
- URL structure / canonical logic

### Route verification evidence
- [ ] Homepage latest article links verified
- [ ] `/resources/guides` links verified
- [ ] `/resources/case-studies` links verified
- [ ] 2 guide detail URLs verified
- [ ] 2 case study detail URLs verified
- [ ] 2 newest published guide URLs verified
- [ ] No `Article Not Found` / `Case Study Not Found` / Netlify `Site not found` regressions

### URLs tested
- 
- 
- 
- 

## Notes
- 
