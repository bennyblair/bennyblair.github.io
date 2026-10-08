import assert from "node:assert/strict";
import fs from "node:fs";
import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv2020 from "ajv/dist/2020.js";

const base = (process.env.AGENT_AUDIT_BASE || "https://emetcapital.com.au").replace(/\/$/, "");
const checks: { path: string; accept: string; method: string; status: number; type: string; finalUrl: string }[] = [];
async function check(route: string, accept: string, expectedStatus: number, type: string, method = "GET") {
  const response = await fetch(`${base}${route}`, { method, headers: { Accept: accept }, signal: AbortSignal.timeout(30_000) });
  const body = await response.text();
  const actualType = response.headers.get("Content-Type") || "";
  checks.push({ path: route, accept, method, status: response.status, type: actualType, finalUrl: response.url });
  assert.equal(response.status, expectedStatus, `${method} ${route}: status`);
  assert.ok(actualType.toLowerCase().startsWith(type), `${route}: expected ${type}, got ${actualType}`);
  if (route === "/api" || route.startsWith("/api/")) {
    assert.equal(response.headers.get("Link"), '<https://emetcapital.com.au/docs#api-versioning>; rel="deprecation"; type="text/html"');
    assert.equal(response.headers.get("Deprecation"), null);
    assert.equal(response.headers.get("Sunset"), null);
  }
  if (method === "HEAD") assert.equal(body, "");
  else assert.ok(body.length > 0, `${route}: empty body`);
  return { response, body };
}

try {
  const specResult = await check("/openapi.json", "application/json", 200, "application/json");
  const spec = JSON.parse(specResult.body);
  await SwaggerParser.validate(spec);
  assert.deepEqual(Object.keys(spec.paths).sort(), ["/api/v1/services", "/api/v1/services/{slug}"]);
  assert.deepEqual(spec.paths["/api/v1/services"].get.parameters, []);
  const ajv = new Ajv2020({ strict: false, validateFormats: false });
  ajv.addSchema({ $id: "public-api", components: spec.components });
  const validate = (name: string, value: unknown) => assert.ok(ajv.validate({ $ref: `public-api#/components/schemas/${name}` }, value), JSON.stringify(ajv.errors));
  // Alternate representations on the exact URL, without cache-busting parameters.
  for (const accept of ["text/markdown", "text/html", "text/markdown", "text/html"]) {
    const result = await check("/", accept, 200, accept);
    assert.ok(result.response.headers.get("Vary")?.toLowerCase().split(",").map((part) => part.trim()).includes("accept"), "Homepage must Vary on Accept");
    if (accept === "text/markdown") {
      assert.ok(result.body.length > 100);
      assert.match(result.body, /^# /m);
      assert.ok(result.body.includes("https://emetcapital.com.au/docs"));
      assert.ok(!/<(?:html|script)\b/i.test(result.body));
    } else assert.match(result.body, /<html\b/i);
  }
  const missing = await check("/__ora-agent-readiness-verification-20261008", "text/markdown", 404, "text/markdown");
  assert.ok(missing.body.length >= 20 && /\]\(https:\/\/emetcapital.com.au\/(docs|sitemap.xml|llms.txt)\)/.test(missing.body));
  assert.ok(missing.response.headers.get("Vary")?.toLowerCase().includes("accept"));
  await check("/__ora-agent-readiness-verification-20261008", "text/html", 404, "text/html");
  const docs = await check("/docs", "text/html", 200, "text/html");
  assert.ok(docs.body.includes("/openapi.json") && docs.body.includes("/api/services"));
  assert.ok(docs.body.includes('id="api-versioning"') && docs.body.includes("90 days") && docs.body.includes("Sunset"));
  const markdownDocs = await check("/docs", "text/markdown", 200, "text/markdown");
  assert.ok(markdownDocs.body.includes("/api/v1/services") && markdownDocs.body.includes("90 days"));
  const llms = await check("/llms.txt", "text/plain", 200, "text/plain");
  assert.match(llms.body, /^# Emet Capital/m);
  assert.match(llms.body, /## When to use this/);
  assert.ok(llms.body.includes("/openapi.json") && llms.body.includes("/api/v1/services"));
  const robots = await check("/robots.txt", "text/plain", 200, "text/plain");
  assert.match(robots.body, /Sitemap:/i);
  const sitemap = await check("/sitemap.xml", "application/xml", 200, "application/xml");
  assert.ok(sitemap.body.includes("https://emetcapital.com.au/docs"));
  const directory = await check("/api/services", "application/json", 200, "application/json");
  const versionedDirectory = await check("/api/v1/services", "application/json", 200, "application/json");
  assert.equal(versionedDirectory.body, directory.body);
  const trailing = await check("/api/v1/services/", "application/json", 200, "application/json");
  assert.equal(trailing.body, directory.body);
  const { services } = JSON.parse(directory.body);
  validate("ServiceDirectory", { services });
  assert.equal(new Set(services.map((service: { slug: string }) => service.slug)).size, services.length);
  for (const service of services) {
    const detail = await check(`/api/services/${service.slug}`, "application/json", 200, "application/json");
    const versionedDetail = await check(`/api/v1/services/${service.slug}`, "application/json", 200, "application/json");
    assert.equal(versionedDetail.body, detail.body);
    validate("Service", JSON.parse(detail.body));
    assert.deepEqual(JSON.parse(detail.body), service);
    const serviceUrl = new URL(service.url);
    assert.equal(serviceUrl.origin, "https://emetcapital.com.au");
    await check(serviceUrl.pathname, "text/html", 200, "text/html");
  }
  for (const [route, method, accept, status] of [
    ["/api/v1/services/not-a-service", "GET", "application/json", 404],
    ["/api/v2/services", "GET", "application/json", 404],
    ["/api/v1/unknown-endpoint", "GET", "application/json", 404],
    ["/api/v1/services", "POST", "application/json", 405],
    ["/api/v1/services", "GET", "text/html", 406],
    ["/api/services/not-a-service", "GET", "application/json", 404],
    ["/api/unknown-endpoint", "GET", "application/json", 404],
    ["/api", "GET", "application/json", 404],
    ["/api/services", "POST", "application/json", 405],
    ["/api/services", "GET", "text/html", 406],
  ] as const) {
    const result = await check(route, accept, status, "application/json", method);
    validate("ApiError", JSON.parse(result.body));
    if (status === 405) assert.equal(result.response.headers.get("Allow"), "GET, HEAD");
  }
  await check("/", "text/markdown", 200, "text/markdown", "HEAD");
  await check("/api/services", "application/json", 200, "application/json", "HEAD");
  await check("/api/services/not-a-service", "application/json", 404, "application/json", "HEAD");
  await check("/api/v1/services", "application/json", 200, "application/json", "HEAD");
  await check("/api/v1/services/not-a-service", "application/json", 404, "application/json", "HEAD");
  console.log(`Agent HTTP audit passed: ${checks.length} checks, ${services.length} services, OpenAPI and all machine-readable files at ${base}.`);
} finally {
  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync("output/agent-readiness-audit.json", `${JSON.stringify({ base, checkedAt: new Date().toISOString(), checks }, null, 2)}\n`);
}
