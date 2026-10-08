import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv2020 from "ajv/dist/2020.js";
import { createAgentHandler, representation, type AgentContent } from "../../netlify/lib/agent-protocol";
import { extractPublicPage, generateAgentContent } from "../lib/agent-assets.mjs";
import { createOpenApi } from "../lib/agent-openapi.mjs";

const service = { slug: "commercial-property-finance", title: "Commercial Property Finance", description: "Published service description", url: "https://emetcapital.com.au/services/commercial-property-finance" };
const content: AgentContent = { markdown: { "/": "# Emet Capital\n\nPublic commercial finance information.\n", "/docs": "# API documentation\n" }, services: [service] };
const handler = createAgentHandler(content);
const origin = "https://emetcapital.com.au";
function downstream(status = 200, body = "<!doctype html><h1>Emet Capital</h1>") {
  return { next: async () => new Response(body, { status, headers: { "Content-Type": "text/html", Vary: "Accept-Encoding", ETag: '"html-tag"', "Content-Length": String(body.length), "Content-Security-Policy": "default-src 'self'" } }) };
}
const request = (route: string, accept = "text/markdown", method = "GET") => new Request(`${origin}${route}`, { method, headers: { Accept: accept } });

test("media negotiation respects defaults, quality, specificity, explicit exclusions and ordered ties", () => {
  const cases: [string | null, string][] = [
    [null, "html"], ["*/*", "html"], ["text/*", "html"], ["text/markdown", "markdown"],
    ["TEXT/MARKDOWN; charset=utf-8", "markdown"], ["text/html", "html"],
    ["text/markdown;q=0, */*;q=1", "html"], ["text/markdown;q=0.5, text/html;q=0.9", "html"],
    ["text/html;q=0.5, text/markdown;q=0.9", "markdown"], ["text/markdown, text/html", "markdown"],
    ["text/html, text/markdown", "html"], ["text/markdown, text/*", "markdown"],
    ["text/markdown;q=garbage, text/html", "html"], ["text/markdown;q=0, text/html;q=0", "unacceptable"],
    ["application/json", "unacceptable"],
  ];
  for (const [accept, expected] of cases) assert.equal(representation(accept), expected, accept ?? "absent");
});

test("homepage and docs serve actual Markdown, preserve security and discard stale HTML metadata", async () => {
  for (const route of ["/", "/docs"]) {
    const response = (await handler(request(route), downstream()))!;
    assert.equal(response.status, 200);
    assert.match(response.headers.get("Content-Type")!, /^text\/markdown/);
    assert.match(response.headers.get("Vary")!, /Accept-Encoding, Accept/);
    assert.equal(await response.text(), content.markdown[route]);
    assert.equal(response.headers.get("ETag"), null);
    assert.equal(response.headers.get("Content-Length"), null);
    assert.equal(response.headers.get("Cache-Control"), "no-store");
    assert.equal(response.headers.get("Netlify-CDN-Cache-Control"), "no-store");
    assert.equal(response.headers.get("Content-Security-Policy"), "default-src 'self'");
  }
});

test("browser HTML remains intact and varies on Accept", async () => {
  const response = (await handler(request("/", "text/html"), downstream()))!;
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/html");
  assert.match(response.headers.get("Vary")!, /Accept/);
  assert.match(await response.text(), /<!doctype html>/);
});

test("unknown page is still 404 with useful Markdown links and noindex", async () => {
  const response = (await handler(request("/missing"), downstream(404)))!;
  assert.equal(response.status, 404);
  assert.match(response.headers.get("Content-Type")!, /^text\/markdown/);
  assert.equal(response.headers.get("X-Robots-Tag"), "noindex");
  const body = await response.text();
  assert.ok(body.length > 20);
  for (const link of ["/docs", "/sitemap.xml", "/llms.txt"]) assert.ok(body.includes(link));
  const html = (await handler(request("/missing", "text/html"), downstream(404)))!;
  assert.equal(html.status, 404);
  assert.equal(html.headers.get("Content-Type"), "text/html");
  assert.match(html.headers.get("Vary")!, /Accept-Encoding, Accept/);
});

test("canonical redirects, existing pages, assets and form POSTs are preserved", async () => {
  const redirect = new Response(null, { status: 301, headers: { Location: "/services" } });
  assert.equal(await handler(request("/old"), { next: async () => redirect }), redirect);
  const html = new Response("service page", { headers: { "Content-Type": "text/html" } });
  assert.equal(await handler(request("/services"), { next: async () => html }), html);
  for (const route of ["/assets/app.js", "/.netlify/functions/existing", "/.well-known/site-revision.json"]) assert.equal(await handler(request(route), { next: async () => { throw Error("must bypass"); } }), undefined);
  assert.equal(await handler(request("/", "text/markdown", "POST"), { next: async () => { throw Error("must bypass"); } }), undefined);
});

test("HEAD has matching headers/status without a body; unsupported homepage representation is 406", async () => {
  for (const route of ["/", "/api/services", "/api/services/missing"]) {
    const response = (await handler(request(route, route.startsWith("/api") ? "application/json" : "text/markdown", "HEAD"), downstream()))!;
    assert.equal(await response.text(), "");
    assert.ok(response.headers.get("Content-Type"));
  }
  const response = (await handler(request("/", "application/xml"), downstream()))!;
  assert.equal(response.status, 406);
});

test("public service API implements the directory and detail schemas, errors and method contract", async () => {
  const spec = createOpenApi(origin);
  await SwaggerParser.validate(spec);
  const ajv = new Ajv2020({ strict: false, validateFormats: false });
  ajv.addSchema({ $id: "directory", components: spec.components });
  const validate = (name: string, value: unknown) => assert.ok(ajv.validate({ $ref: `directory#/components/schemas/${name}` }, value), JSON.stringify(ajv.errors));
  const directory = (await handler(request("/api/services", "application/json"), downstream()))!;
  assert.equal(directory.status, 200);
  const body = await directory.json();
  assert.deepEqual(body, { services: [service] });
  validate("ServiceDirectory", body);
  const detail = (await handler(request(`/api/services/${service.slug}`, "application/json"), downstream()))!;
  assert.equal(detail.status, 200);
  validate("Service", await detail.json());
  for (const [route, method, accept, status, code] of [
    ["/api/services/unknown", "GET", "application/json", 404, "SERVICE_NOT_FOUND"],
    ["/api/no-such-endpoint", "GET", "application/json", 404, "NOT_FOUND"],
    ["/api/services/%2e%2e%2fprivate", "GET", "application/json", 404, "NOT_FOUND"],
    ["/api/services", "POST", "application/json", 405, "METHOD_NOT_ALLOWED"],
    ["/api/services", "GET", "text/html", 406, "NOT_ACCEPTABLE"],
  ] as const) {
    const response = (await handler(request(route, accept, method), downstream()))!;
    assert.equal(response.status, status);
    assert.match(response.headers.get("Content-Type")!, /^application\/json/);
    const error = await response.json();
    validate("ApiError", error);
    assert.equal(error.error.code, code);
    if (status === 405) assert.equal(response.headers.get("Allow"), "GET, HEAD");
  }
  const broken = createAgentHandler({ ...content, get services(): never { throw Error("private diagnostic"); } });
  const failure = (await broken(request("/api/services", "application/json"), downstream()))!;
  assert.equal(failure.status, 500);
  const error = await failure.json();
  validate("ApiError", error);
  assert.ok(!JSON.stringify(error).includes("private diagnostic"));
  const operations = Object.values(spec.paths).flatMap((item) => Object.values(item));
  assert.equal(new Set(operations.map((operation) => operation.operationId)).size, operations.length);
  assert.ok(operations.every((operation) => operation.description && operation.responses["200"].content["application/json"].schema));
});

function fixture(url: string, title = "Published heading") {
  return `<html><head><link rel="canonical" href="${url}"><meta name="description" content="Published description &amp; detail."></head><body><nav>Navigation noise</nav><main><h1>${title}</h1><p>Public information about commercial finance with enough useful context to produce a complete Markdown response for agents.</p><h2>Next steps</h2><p><a href="/contact">Contact us</a> for a human assessment.</p><form>Confidential form fields</form><script>privateCode()</script></main><footer>Footer noise</footer></body></html>`;
}

test("build conversion uses published content, keeps headings/links and excludes scripts/forms", () => {
  const page = extractPublicPage(fixture(`${origin}/`), `${origin}/`);
  assert.equal(page.title, "Published heading");
  assert.equal(page.description, "Published description & detail.");
  assert.match(page.markdown, /^# Published heading/);
  assert.ok(page.markdown.includes(`[Contact us](${origin}/contact)`));
  for (const noise of ["Navigation noise", "Footer noise", "Confidential form fields", "privateCode"]) assert.ok(!page.markdown.includes(noise));
  assert.throws(() => extractPublicPage("<main>Loading</main>", origin), /prerendered/);
  const card = extractPublicPage(fixture(`${origin}/`).replace("</main>", '<a href="/services"><h2>Service directory</h2><p>Explore published services</p></a></main>'), `${origin}/`);
  assert.match(card.markdown, /^## Service directory$/m);
  assert.ok(card.markdown.includes(`[Service directory](${origin}/services)`));
  assert.ok(!card.markdown.includes("[\n\n##"));
});

test("build generation includes only canonical top-level services and bundles current homepage/docs", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "emet-agent-assets-"));
  try {
    for (const route of ["/", "/docs", "/services/commercial-property-finance"]) {
      const file = path.join(root, "dist", route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, fixture(`${origin}${route}`));
    }
    const generated = generateAgentContent(root, [
      { path: "/services", pageType: "service" },
      { path: "/services/commercial-property-finance", pageType: "service" },
      { path: "/services/commercial-property-finance/cities/sydney", pageType: "location" },
    ], origin);
    assert.equal(generated.services.length, 1);
    assert.equal(generated.services[0].slug, service.slug);
    assert.ok(generated.markdown["/docs"].includes("OpenAPI specification"));
    assert.ok(fs.readFileSync(path.join(root, "netlify/generated/agent-content.ts"), "utf8").includes("export default"));
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test("public docs, homepage discovery and edge declaration are wired into the existing site", () => {
  assert.match(fs.readFileSync("src/components/Footer.tsx", "utf8"), /to="\/docs"/);
  assert.match(fs.readFileSync("src/config/site-route-manifest.ts", "utf8"), /path: "\/docs"/);
  const docs = fs.readFileSync("src/pages/AgentDocs.tsx", "utf8");
  for (const text of ["Authentication", "/api/services", "/openapi.json", "/llms.txt", "Errors", "When to use"]) assert.ok(docs.includes(text));
  const generator = fs.readFileSync("scripts/generate-site-files.ts", "utf8");
  assert.ok(generator.includes("## When to use this"));
  assert.match(fs.readFileSync("netlify.toml", "utf8"), /function = "agent-readiness"/);
});


test("v1 and legacy aliases preserve bodies, methods, errors and lifecycle headers", async () => {
  for (const suffix of ["", "/", `/${service.slug}`, `/${service.slug}/`, "/unknown"]) {
    for (const [method, accept] of [["GET", "application/json"], ["HEAD", "application/json"], ["POST", "application/json"], ["GET", "text/html"]]) {
      const legacy = (await handler(request(`/api/services${suffix}`, accept, method), downstream()))!;
      const versioned = (await handler(request(`/api/v1/services${suffix}`, accept, method), downstream()))!;
      assert.equal(versioned.status, legacy.status);
      assert.deepEqual([...versioned.headers], [...legacy.headers]);
      assert.equal(await versioned.text(), await legacy.text());
      assert.equal(versioned.headers.get("Link"), '<https://emetcapital.com.au/docs#api-versioning>; rel="deprecation"; type="text/html"');
      assert.equal(versioned.headers.get("Deprecation"), null);
      assert.equal(versioned.headers.get("Sunset"), null);
    }
  }
  for (const route of ["/api/v2/services", "/api/v10/services", "/api/v1services", "/api/v1", "/api/v1/unknown"]) {
    const response = (await handler(request(route, "application/json"), downstream()))!;
    assert.equal(response.status, 404);
    assert.equal((await response.json()).error.code, "NOT_FOUND");
    assert.ok(response.headers.get("Link")?.includes('rel="deprecation"'));
  }
  const broken = createAgentHandler({ ...content, get services(): never { throw Error("private diagnostic"); } });
  const failure = (await broken(request("/api/v1/services", "application/json"), downstream()))!;
  assert.equal(failure.status, 500);
  assert.ok(failure.headers.get("Link")?.includes("#api-versioning"));
});

test("versioned OpenAPI describes valid zero-argument and required-slug function inputs", async () => {
  const spec = createOpenApi(origin);
  const resolved = await SwaggerParser.dereference(structuredClone(spec));
  assert.deepEqual(Object.keys(spec.paths).sort(), ["/api/v1/services", "/api/v1/services/{slug}"]);
  const ajv = new Ajv2020({ strict: false, validateFormats: false });
  for (const [route, item] of Object.entries(spec.paths)) {
    const operation = item.get;
    const parameters = operation.parameters ?? [];
    const input = { type: "object", additionalProperties: false, properties: Object.fromEntries(parameters.map((parameter) => [parameter.name, parameter.schema])), required: parameters.filter((parameter) => parameter.required).map((parameter) => parameter.name) };
    const validate = ajv.compile(input);
    const args = operation.operationId === "listServices" ? {} : { slug: service.slug };
    assert.ok(validate(args), JSON.stringify(validate.errors));
    assert.equal(validate({ unexpected: "input" }), false);
    if (operation.operationId === "getService") {
      assert.equal(validate({}), false);
      assert.equal(validate({ slug: 42 }), false);
      assert.equal(validate({ slug: "../private" }), false);
    } else assert.deepEqual(parameters, []);
    const response = (await handler(request(route.replace("{slug}", service.slug), "application/json"), downstream()))!;
    const schema = resolved.paths[route].get.responses["200"].content["application/json"].schema;
    assert.equal(schema.type, "object");
    assert.ok(ajv.validate(schema, await response.json()), JSON.stringify(ajv.errors));
    for (const entry of Object.values(operation.responses)) assert.ok(entry.headers.Link.schema.type === "string");
  }
  const docs = fs.readFileSync("src/pages/AgentDocs.tsx", "utf8");
  for (const text of ['id="api-versioning"', "90 days", "Deprecation", "Sunset", "empty object", "/api/services"]) assert.ok(docs.includes(text));
});
