import assert from "node:assert/strict";
import fs from "node:fs";
import SwaggerParser from "@apidevtools/swagger-parser";
import content from "../netlify/generated/agent-content";
import { getIndexableStaticRoutes, DOMAIN } from "../src/config/site-route-manifest";
import { extractPublicPage } from "./lib/agent-assets.mjs";

await SwaggerParser.validate(JSON.parse(fs.readFileSync("dist/openapi.json", "utf8")));
const routes = getIndexableStaticRoutes().filter((route) => route.pageType === "service" && /^\/services\/[^/]+$/.test(route.path));
assert.equal(content.services.length, routes.length);
for (const service of content.services) {
  const route = `/services/${service.slug}`;
  const page = extractPublicPage(fs.readFileSync(`dist${route}/index.html`, "utf8"), `${DOMAIN}${route}`);
  assert.deepEqual(service, { slug: service.slug, title: page.title, description: page.description, url: `${DOMAIN}${route}` });
}
for (const [route, markdown] of Object.entries(content.markdown)) {
  assert.ok(markdown.length > 100, `${route}: Markdown must be nonempty`);
  assert.match(markdown, /^# /m);
  assert.ok(markdown.includes(`${DOMAIN}/docs`));
}
assert.match(fs.readFileSync("dist/llms.txt", "utf8"), /## When to use this/);
const llmsSections = fs.readFileSync("dist/llms.txt", "utf8").split(/^## .+$/m).slice(1);
for (const section of llmsSections) {
  const lines = section.split("\n").map((line) => line.trim()).filter(Boolean);
  assert.ok(lines.length > 0);
  for (const line of lines) assert.match(line, /^- \[[^\]]+\]\(https:\/\/[^)]+\)(?:: .+)?$/, "Each llms.txt H2 section must contain a file list");
}
assert.match(fs.readFileSync("dist/index.html", "utf8"), /href="\/docs"/);
assert.match(fs.readFileSync("dist/docs/index.html", "utf8"), /href="\/openapi.json"/);
console.log(`Agent build verified: OpenAPI, docs, llms.txt, homepage Markdown and ${content.services.length} canonical services.`);
