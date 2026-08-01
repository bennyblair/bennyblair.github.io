import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { buildContentIndex } from "../lib/content-index.mjs";
import {
  getIndexableStaticRoutes,
  isRedirectSource,
  redirectRules,
  siteRoutes,
} from "../../src/config/site-route-manifest";
import claims from "../../src/content/claims.json";
import {
  findIntentOverlaps,
  isLocationVariant,
  resolveDesignatedService,
  tokenSimilarity,
} from "../lib/seo-policy.mjs";

const repoRoot = process.cwd();

test("route manifest has unique paths and real component sources", () => {
  const paths = siteRoutes.map((route) => route.path);
  assert.equal(new Set(paths).size, paths.length, "route paths must be unique");

  for (const route of siteRoutes) {
    assert.ok(fs.existsSync(path.join(repoRoot, route.source)), `${route.path} source is missing: ${route.source}`);
  }
});

test("indexable static routes are canonical and not redirect sources", () => {
  for (const route of getIndexableStaticRoutes()) {
    assert.equal(route.path.includes(":"), false);
    assert.equal(route.path.includes("*"), false);
    assert.equal(isRedirectSource(route.path), false, `${route.path} cannot be indexable and redirect`);
  }
});

test("redirect contract contains no self redirects or conflicting duplicate sources", () => {
  const seen = new Map<string, string>();
  for (const rule of redirectRules) {
    assert.notEqual(rule.from, rule.to, `self redirect: ${rule.from}`);
    const signature = `${rule.to}|${rule.status}`;
    const previous = seen.get(rule.from);
    if (previous) assert.equal(previous, signature, `conflicting redirect source: ${rule.from}`);
    seen.set(rule.from, signature);
  }
  assert.equal(redirectRules.at(-1)?.status, 404);
  assert.equal(redirectRules.at(-1)?.from, "/*");
});

test("content index contains metadata only and unique canonical routes", () => {
  const index = buildContentIndex(repoRoot);
  const routes: string[] = [];
  for (const articles of Object.values(index)) {
    for (const article of articles) {
      assert.equal("content" in article, false, `${article.route} leaked its body into the metadata index`);
      assert.ok(article.title);
      assert.ok(article.description);
      routes.push(article.route);
    }
  }
  assert.equal(new Set(routes).size, routes.length, "content routes must be unique");
});

test("claim register records verification or explicit legacy risk acceptance", () => {
  for (const [id, claim] of Object.entries(claims)) {
    assert.ok(claim.statement, `${id} statement is missing`);
    assert.ok(claim.definition, `${id} definition is missing`);
    if (claim.status === "legacy-retained") {
      assert.ok(claim.riskAcceptedAt, `${id} legacy risk acceptance is missing`);
    }
    if (claim.status === "verified") {
      assert.ok(claim.source, `${id} source is missing`);
      assert.ok(claim.verifiedAt, `${id} verification date is missing`);
      assert.ok(claim.expiresAt, `${id} expiry is missing`);
    }
  }
});

test("new location-led finance variants are blocked while national topics remain eligible", () => {
  assert.equal(
    isLocationVariant({ title: "Construction Loans Perth", primaryQuery: "construction loans perth" }),
    true,
  );
  assert.equal(
    isLocationVariant({ title: "Business Finance Melbourne", primaryQuery: "business finance melbourne" }),
    true,
  );
  assert.equal(
    isLocationVariant({ title: "Business Turnaround Finance in Australia", primaryQuery: "business turnaround finance" }),
    false,
  );
});

test("commercial topics resolve to one valid designated service page", () => {
  const cases = [
    ["urgent caveat loans", "/services/caveat-loans"],
    ["commercial property refinancing", "/services/refinancing-solutions"],
    ["equipment loans for small business", "/services/equipment-finance"],
    ["business turnaround finance", "/services/working-capital"],
  ];
  const validServiceRoutes = new Set(
    siteRoutes.filter((route) => route.pageType === "service" && route.indexable).map((route) => route.path),
  );

  for (const [primaryQuery, expected] of cases) {
    const service = resolveDesignatedService({ primaryQuery, title: primaryQuery });
    assert.equal(service?.path, expected);
    assert.equal(validServiceRoutes.has(service?.path), true, `${service?.path} must be an indexable service route`);
  }
});

test("intent overlap catches near-duplicate ideas within the same service cluster", () => {
  assert.ok(tokenSimilarity("urgent caveat loans Australia", "fast urgent caveat loan guide") >= 0.72);
  const candidate = {
    file: "new.md",
    primaryQuery: "urgent caveat loans Australia",
    title: "Urgent Caveat Loans Australia",
  };
  const existing = {
    file: "existing.md",
    primaryQuery: "fast urgent caveat loan guide",
    title: "Fast Urgent Caveat Loan Guide",
  };
  const overlaps = findIntentOverlaps(candidate, [existing]);
  assert.equal(overlaps.length, 1);
  assert.equal(overlaps[0].candidate.file, "existing.md");
});
