import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  buildProtectedRouteMap,
  findActiveProtectedChanges,
  routeFromSource,
} from "../lib/protected-cohort-policy.mjs";

const registry = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "data", "indexing-recovery-protected-pages.json"), "utf8"),
);

test("tracked OpenClaw recovery cohort has the expected immutable snapshot", () => {
  assert.equal(registry.remediations.length, 97);
  assert.equal(buildProtectedRouteMap(registry).size, 111);
  assert.equal(registry.sourceGeneratedAt, "2026-08-05T10:09:08+10:00");
});
test("resolves content and page-component canonicals to public routes", () => {
  assert.equal(
    routeFromSource("src/content/guides/example.md", ""),
    "/resources/guides/example",
  );
  assert.equal(
    routeFromSource("src/pages/services/Example.tsx", '<SEO canonical="/services/example" />'),
    "/services/example",
  );
  assert.equal(
    routeFromSource(
      "src/pages/services/Example.tsx",
      '<link rel="canonical" href="https://emetcapital.com.au/services/example" />',
    ),
    "/services/example",
  );
});

test("blocks active cohort edits but allows eligible and post-review changes", () => {
  const protectedRoute = registry.remediations[0].url;
  const slug = new URL(protectedRoute).pathname.split("/").at(-1);
  const change = [{ relativePath: `src/content/guides/${slug}.md`, source: "" }];

  assert.equal(findActiveProtectedChanges(change, registry, new Date("2026-08-06T00:00:00Z")).length, 1);
  assert.equal(findActiveProtectedChanges(change, registry, new Date("2026-09-03T00:00:00Z")).length, 0);
  assert.equal(
    findActiveProtectedChanges(
      [{ relativePath: "src/content/guides/eligible-page.md", source: "" }],
      registry,
      new Date("2026-08-06T00:00:00Z"),
    ).length,
    0,
  );
});
