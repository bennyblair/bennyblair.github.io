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
  discoveryGuidesByService,
  discoveryGuideUrls,
} from "../../src/config/discovery-guides";
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

test("legacy GSC 404 URLs permanently redirect to current guide equivalents", () => {
  const redirects = new Map(redirectRules.map((rule) => [rule.from, rule]));
  assert.deepEqual(redirects.get("/resources/guides/second-mortgage-for-poor-credit"), {
    from: "/resources/guides/second-mortgage-for-poor-credit",
    to: "/resources/guides/second-mortgage-bad-credit-qualify",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/understanding-lvr-priority-deeds-commercial-lending"), {
    from: "/resources/guides/understanding-lvr-priority-deeds-commercial-lending",
    to: "/resources/guides/priority-agreements-in-second-mortgages-what-they-mean",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/commercial-property-finance-sydney"), {
    from: "/resources/guides/commercial-property-finance-sydney",
    to: "/resources/guides/commercial-property-finance-sydney-local-expert-hub",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/bridging-finance-borrower-mistakes-broker-take"), {
    from: "/resources/guides/bridging-finance-borrower-mistakes-broker-take",
    to: "/resources/guides/bridging-loan-exit-strategy-broker-take",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/instant-asset-write-off-finance-before-eofy-2026"), {
    from: "/resources/guides/instant-asset-write-off-finance-before-eofy-2026",
    to: "/resources/guides/eofy-working-capital-loans-before-30-june",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/private-debt-australia-explainer-with-broker-commentary"), {
    from: "/resources/guides/private-debt-australia-explainer-with-broker-commentary",
    to: "/resources/guides/private-debt-australia",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/subcontractor-cash-flow-finance-after-builder-insolvency"), {
    from: "/resources/guides/subcontractor-cash-flow-finance-after-builder-insolvency",
    to: "/resources/guides/debtor-concentration-working-capital-finance-australia",
    status: 301,
  });
});

test("approved consolidation sources use one-hop permanent redirects to canonical keepers", () => {
  const expected = new Map<string, string>([
    ["caveat-loans-melbourne-quick-business-finance", "/services/caveat-loans/cities/melbourne"],
    ["line-of-credit-equity", "/resources/guides/second-mortgage-vs-line-of-credit"],
    ["private-mortgage-lenders-australia-directory-2026", "/resources/guides/private-mortgage-lenders-australia-directory"],
    ["negative-gearing-commercial-property-tax-strategies", "/resources/guides/commercial-property-loans-australia-complete-guide"],
    ["commercial-land-loans-financing-property-development", "/resources/guides/commercial-property-development-finance"],
    ["commercial-property-finance-rates-2025-comparison", "/resources/guides/commercial-mortgage-rates-australia-complete-guide"],
    ["bridging-finance-sydney-48-hour-settlement-possible", "/services/bridging-finance/cities/sydney"],
    ["private-commercial-real-estate-lenders-cre-directory", "/resources/guides/commercial-property-lenders-in-australia-complete-directory"],
    ["finding-best-private-lenders-for-your-business", "/resources/guides/private-mortgage-lenders-australia-directory"],
    ["bridging-finance-developers-project-funding-solutions", "/resources/guides/commercial-property-development-finance"],
    ["commercial-property-refinancing-solutions", "/services/refinancing-solutions"],
    ["when-second-mortgages-make-financial-sense-smes", "/resources/guides/second-mortgage-loan-equity-access-strategies"],
    ["2nd-loan-mortgage-business-capital", "/resources/guides/second-mortgages-for-business-guide"],
    ["commercial-property-loan-retail-spaces-guide", "/resources/guides/commercial-property-loans-australia-complete-guide"],
    ["private-lenders-small-business-fast-approval-guide", "/resources/guides/short-term-private-lenders-fast-business-finance-solutions"],
    ["low-doc-no-doc-commercial-loans-complete-alternative-guide", "/resources/guides/no-doc-abn-loans"],
    ["subordination-agreement-second-mortgage", "/resources/guides/priority-agreements-in-second-mortgages-what-they-mean"],
    ["commercial-bridging-finance-auction-purchases", "/resources/guides/commercial-bridging-loans-for-property-auctions-expert-guide"],
    ["second-mortgage-australia", "/resources/guides/second-mortgages-for-business-guide"],
    ["commercial-real-estate-lenders-australia-directory", "/resources/guides/commercial-property-lenders-in-australia-complete-directory"],
    ["first-and-second-mortgages-for-business", "/resources/guides/second-mortgages-for-business-guide"],
    ["secured-business-loans-australia", "/resources/guides/secured-vs-unsecured-business-loans-australia"],
    ["caveat-loan-application-rejected-what-to-do-next", "/resources/guides/caveat-loan-rejected-heres-what-to-do-next"],
    ["second-mortgage-partnership-buyout-financing-transitions", "/resources/guides/second-mortgage-for-a-business-partner-buyout-in-australia"],
  ]);
  const redirects = new Map(redirectRules.map((rule) => [rule.from, rule]));
  const canonicalRoutes = new Set([
    ...siteRoutes.map((route) => route.path),
    ...Object.values(buildContentIndex(repoRoot)).flat().map((article) => article.route),
  ]);

  assert.equal(expected.size, 24);
  for (const [slug, target] of expected) {
    const source = `/resources/guides/${slug}`;
    assert.deepEqual(redirects.get(source), { from: source, to: target, status: 301 });
    assert.equal(isRedirectSource(target), false, `${source} must not redirect through ${target}`);
    assert.equal(canonicalRoutes.has(target), true, `${target} must exist before redirecting ${source}`);
  }
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

test("discovery guides are indexable, linked from their service hub and have two supporting content paths", () => {
  const expectedServiceComponents = new Map([
    ["first-second-mortgages", "FirstSecondMortgages.tsx"],
    ["bridging-finance", "BridgingFinance.tsx"],
    ["business-acquisition", "BusinessAcquisition.tsx"],
    ["business-finance", "BusinessFinance.tsx"],
    ["caveat-loans", "CaveatLoans.tsx"],
    ["commercial-property-finance", "CommercialPropertyFinance.tsx"],
    ["private-lending", "PrivateLending.tsx"],
    ["trade-finance", "TradeFinance.tsx"],
    ["working-capital", "WorkingCapital.tsx"],
    ["commercial-property-development", "CommercialPropertyDevelopment.tsx"],
    ["refinancing-solutions", "RefinancingSolutions.tsx"],
    ["equipment-finance", "EquipmentFinance.tsx"],
  ]);
  const index = Object.values(buildContentIndex(repoRoot)).flat();
  const articlesByRoute = new Map(index.map((article) => [article.route, article]));
  const guideFiles = fs.readdirSync(path.join(repoRoot, "src/content/guides"))
    .filter((file) => file.endsWith(".md"));

  assert.equal(discoveryGuideUrls.length, 19);
  assert.equal(new Set(discoveryGuideUrls).size, 19, "discovery targets must be unique");
  assert.deepEqual(new Set(Object.keys(discoveryGuidesByService)), new Set(expectedServiceComponents.keys()));

  for (const [service, componentFile] of expectedServiceComponents) {
    const source = fs.readFileSync(path.join(repoRoot, "src/pages/services", componentFile), "utf8");
    assert.match(source, new RegExp(`<DiscoveryGuides service=["']${service}["']`));
  }

  for (const route of discoveryGuideUrls) {
    const article = articlesByRoute.get(route);
    assert.ok(article, `${route} must resolve to a content article`);
    assert.notEqual(article.noindex, true, `${route} must remain indexable`);

    const supportingFiles = guideFiles.filter((file) => {
      const slug = path.basename(file, ".md");
      if (route.endsWith(`/${slug}`)) return false;
      return fs.readFileSync(path.join(repoRoot, "src/content/guides", file), "utf8").includes(route);
    });
    assert.ok(
      supportingFiles.length >= 2,
      `${route} needs at least two contextual links from supporting guides; found ${supportingFiles.length}`,
    );
  }
});

test("content articles do not link to their own canonical route", () => {
  for (const section of ["guides", "case-studies"]) {
    const directory = path.join(repoRoot, "src/content", section);
    for (const file of fs.readdirSync(directory).filter((item) => item.endsWith(".md"))) {
      const content = fs.readFileSync(path.join(directory, file), "utf8");
      const declaredSlug = content.match(/^slug:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1]?.trim();
      const slug = declaredSlug || path.basename(file, ".md");
      const route = `/resources/${section}/${slug}`;
      const inlineRoutes = [...content.matchAll(/(?:\]\(\s*|href=["'])(\/resources\/(?:guides|case-studies)\/[a-z0-9-]+)/g)]
        .map((match) => match[1]);
      const referenceRoutes = [...content.matchAll(/^\[[^\]]+\]:\s*(\/resources\/(?:guides|case-studies)\/[a-z0-9-]+)/gm)]
        .map((match) => match[1]);
      const internalRoutes = [...inlineRoutes, ...referenceRoutes].map((internalRoute) => internalRoute.replace(/\/$/, ""));
      assert.equal(
        internalRoutes.includes(route),
        false,
        `${section}/${file} links to its own canonical route ${route}`,
      );
    }
  }
});

test("illustrative scenarios pending transaction evidence are explicitly noindex", () => {
  const expectedNoindex = new Set([
    "/resources/case-studies/adelaide-cbd-asset-backed-lending",
    "/resources/case-studies/adelaide-cbd-office-complex",
    "/resources/case-studies/melbourne-richmond-asset-finance",
    "/resources/case-studies/newcastle-merewether-equipment-finance",
    "/resources/case-studies/newcastle-wickham-business-acquisition",
    "/resources/case-studies/perth-business-group-debt-consolidation",
    "/resources/case-studies/perth-fremantle-first-mortgage",
    "/resources/case-studies/rose-bay-property-development-bridging-loan",
    "/resources/case-studies/south-yarra-apartment-development",
    "/resources/guides/case-study-developers-first-project-funding-success",
    "/resources/guides/caveat-loan-prevented-business-closure-tax-debt-case-study",
  ]);
  const index = buildContentIndex(repoRoot);
  const actualNoindex = new Set(
    Object.values(index)
      .flat()
      .filter((article) => article.noindex)
      .map((article) => article.route),
  );

  assert.deepEqual(actualNoindex, expectedNoindex);
  for (const article of Object.values(index).flat().filter((item) => item.noindex)) {
    assert.equal(article.indexingReason, "pending-transaction-evidence");
  }
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
