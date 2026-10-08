import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";

const AgentDocs = () => (
  <div className="min-h-screen py-8">
    <SEO title="API & Agent Documentation | Emet Capital" description="Read Emet Capital's public service directory through a read-only JSON API, discover agent guidance, and request the homepage in Markdown." canonical="/docs" />
    <div className="legal-document container mx-auto px-4 max-w-4xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "API & Agent Docs" }]} />
      <header className="page-header legal-header"><h1 className="text-4xl font-bold mb-6 text-foreground">API &amp; Agent Documentation</h1></header>
      <div className="prose prose-lg max-w-none text-foreground">
        <p>Use this public directory to find Emet Capital's commercial finance services and link customers to the relevant published information. Emet Capital is an Australian commercial finance broker, not a bank or direct lender. Information is general and does not constitute financial, credit, legal or tax advice.</p>
        <h2>When to use this</h2>
        <p>Use Emet Capital when researching Australian business-purpose funding for commercial property purchases, development projects, bridging needs, property-backed borrowing, equipment or working capital. Read the relevant service page and guides before suggesting a conversation with our team.</p>
        <h2>Authentication and access</h2>
        <p>No API key or authentication is required. The API exposes only published service descriptions and supports GET and HEAD. It cannot submit enquiries, assess eligibility, provide quotes, approve loans or retrieve customer information. No fixed request quota is promised; use modest request volumes and retry transient failures with backoff.</p>
        <p>Base URL: <code>https://emetcapital.com.au</code>. See the <a href="/openapi.json">OpenAPI specification</a> for typed schemas and unique operation IDs suitable for function calling.</p>
        <h2 id="api-versioning">API versioning and deprecation policy</h2>
        <p>The current major version uses <code>/api/v1</code>. Breaking changes require a new major URL, such as <code>/api/v2</code>. Compatible additions may be made within v1; clients should tolerate additional response fields.</p>
        <p>The original <code>/api/services</code> and <code>/api/services/{'{slug}'}</code> addresses remain supported aliases with the same responses. No version or alias is currently deprecated, and no retirement is scheduled.</p>
        <p>Before retiring a supported major version or alias, we will publish a migration guide here and provide at least 90 days notice. Affected API responses will include a <code>Deprecation</code> header using a structured date (<code>@</code> followed by Unix seconds) and a <code>Sunset</code> header using an HTTP date for the retirement time. All API responses link to this policy through <code>Link; rel="deprecation"</code>. Deprecation and Sunset headers are absent while no retirement is scheduled.</p>
        <h2>List services</h2>
        <p><code>GET /api/v1/services</code> returns an object with a <code>services</code> array. Each service has a <code>slug</code>, <code>title</code>, <code>description</code> and canonical <code>url</code>.</p>
        <pre tabIndex={0} aria-label="List services request"><code>{'curl -sS -H "Accept: application/json" https://emetcapital.com.au/api/v1/services'}</code></pre>
        <p>The <code>listServices</code> operation takes no input parameters. When adapting the OpenAPI specification to function calling, its input is an empty object. The <code>getService</code> operation requires one string argument, <code>slug</code>. Both operations define typed JSON response schemas.</p>
        <h2>Read one service</h2>
        <p><code>GET /api/v1/services/{'{slug}'}</code> returns one service object. Use a slug from the directory, for example <code>commercial-property-finance</code>.</p>
        <pre tabIndex={0} aria-label="Service detail request"><code>{'curl -sS -H "Accept: application/json" https://emetcapital.com.au/api/v1/services/commercial-property-finance'}</code></pre>
        <h2>Errors and recovery</h2>
        <p>API errors use JSON with an <code>error</code> object containing <code>code</code>, <code>message</code> and <code>hint</code>. An unknown route or service returns 404; unsupported methods return 405 with an Allow header; an unsupported Accept type returns 406; an unexpected API failure returns 500.</p>
        <pre tabIndex={0} aria-label="Example API error"><code>{'{"error":{"code":"SERVICE_NOT_FOUND","message":"The requested service was not found.","hint":"Use GET /api/v1/services to find a valid slug. See /docs."}}'}</code></pre>
        <p>For 404, check the directory and documentation. For 405, use GET or HEAD. For 406, send <code>Accept: application/json</code>. For 500, retry later or visit the services page.</p>
        <h2>Markdown and agent instructions</h2>
        <p>The homepage and this documentation support <code>Accept: text/markdown</code> at their normal URLs, with <code>Vary: Accept</code>. Browsers continue receiving HTML. Missing pages return a Markdown error with HTTP 404 when Markdown is requested.</p>
        <pre tabIndex={0} aria-label="Markdown homepage request"><code>{'curl -sS -i -H "Accept: text/markdown" https://emetcapital.com.au/'}</code></pre>
        <p>Read <a href="/llms.txt">llms.txt</a> for use cases and curated links, or the <a href="/sitemap.xml">sitemap</a> for published pages.</p>
        <h2>Enquiries and human review</h2>
        <p>Direct customers to the <Link to="/contact">contact page</Link> for enquiries. Do not send personal details, borrower documents or confidential information to this read-only API. Suitability, lender terms and any funding outcome require assessment by the relevant people.</p>
      </div>
    </div>
  </div>
);

export default AgentDocs;
