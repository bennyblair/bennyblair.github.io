# Public agent access

The production site is served by Netlify. `netlify/edge-functions/agent-readiness.ts`
uses the standard Request/Response API to provide a read-only service directory,
Markdown at `/` and `/docs`, and negotiated Markdown 404s. HTML pages, canonical
redirects, assets and form POSTs retain their existing routing.

`npm run build` prerenders the public pages, publishes OpenAPI 3.1 at
`/openapi.json`, and generates `netlify/generated/agent-content.ts` from the
homepage, documentation and canonical top-level service pages. This ignored
module is bundled with the edge function; it contains only published information.
The build fails if a source page is not prerendered or has an unexpected canonical.
`build:fast` remains a development-only static build and does not generate the
deployable edge content. Deploy through the full Netlify build command.

Both content representations use `Vary: Accept`. Transformed Markdown and JSON
responses disable browser and CDN caching initially. Existing HTML validators
and compression headers are removed when the body changes. Markdown errors keep
HTTP 404 and noindex. API errors expose only a code, message and recovery hint.
No enquiry, customer-record, document-upload or authentication endpoint is added.

## Verification and release

Run `npm test`, `npm run typecheck`, `npm run lint` and `npm run build`.
The build validates generated OpenAPI, service records and documentation links.
Verify actual hosting behaviour on a deploy preview with:

```powershell
$env:AGENT_AUDIT_BASE = 'https://DEPLOY-PREVIEW.netlify.app'
npm run qa:agents
```

Run the same command against `https://emetcapital.com.au` after promotion.
The audit checks status codes, content types, response bodies and JSON schemas;
it alternates homepage representations without cache-busting. It also checks
every service API URL and its canonical page, docs, OpenAPI, llms.txt, robots and
sitemap. Results are saved to `output/agent-readiness-audit.json`.
The unsupported-method probe POSTs an empty body only to the read-only directory,
which rejects writes. It never submits the existing enquiry form.

Retain the previous Netlify deploy before promotion. Restore that deploy if the
new API/Markdown contract fails or existing page/form behaviour regresses. After
production verification, rerun the external Ora readiness audit; its score is
controlled by the auditor and is not guaranteed by these changes.

References: [Netlify Edge Functions API](https://docs.netlify.com/build/edge-functions/api/),
[OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0.html),
[llms.txt format](https://llmstxt.org/),
[Markdown negotiation](https://acceptmarkdown.com/start).
