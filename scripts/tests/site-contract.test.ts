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

test("retired caveat loan product pages permanently redirect in one hop", () => {
  const redirects = new Map(redirectRules.map((rule) => [rule.from, rule]));
  const sources = [
    "/services/caveat-loans",
    "/services/caveat-loans/cities/sydney",
    "/services/caveat-loans/cities/melbourne",
    "/services/caveat-loans/cities/brisbane",
    "/services/caveat-loans/cities/perth",
    "/services/caveat-loans/cities/adelaide",
    "/services/caveat-loans/cities/gold-coast",
    "/services/caveat-loans/sydney",
    "/services/caveat-loans/melbourne",
    "/services/caveat-loans/brisbane",
    "/services/caveat-loans/perth",
    "/services/caveat-loans/adelaide",
    "/services/caveat-loans/gold-coast",
  ];
  for (const from of sources) {
    assert.deepEqual(redirects.get(from), {
      from,
      to: "/services/first-second-mortgages",
      status: 301,
    });
    assert.equal(isRedirectSource("/services/first-second-mortgages"), false);
    assert.equal(isRedirectSource(from), true);
  }
});

test("the legacy terms-and-conditions route redirects directly to the canonical terms page", () => {
  const redirect = redirectRules.find((rule) => rule.from === "/terms-and-conditions");
  assert.deepEqual(redirect, { from: "/terms-and-conditions", to: "/terms", status: 301 });
});

test("excluded legacy guide URLs redirect directly to their current intent owners", () => {
  const redirects = new Map(redirectRules.map((rule) => [rule.from, rule]));
  assert.deepEqual(redirects.get("/resources/guides/director-guarantees-in-business-loans"), {
    from: "/resources/guides/director-guarantees-in-business-loans",
    to: "/resources/guides/personal-guarantee-business-loan-australia",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/invoice-finance-vs-property-loans"), {
    from: "/resources/guides/invoice-finance-vs-property-loans",
    to: "/resources/guides/invoice-finance-australia-complete-guide",
    status: 301,
  });
  assert.deepEqual(redirects.get("/resources/guides/second-mortgage-for-business-australia"), {
    from: "/resources/guides/second-mortgage-for-business-australia",
    to: "/resources/guides/second-mortgages-for-business-guide",
    status: 301,
  });
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
    ["caveat-loans-melbourne-quick-business-finance", "/services/first-second-mortgages"],
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
    ["caveat-loan-application-rejected-what-to-do-next", "/services/first-second-mortgages"],
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

  assert.equal(discoveryGuideUrls.length, 18);
  assert.equal(new Set(discoveryGuideUrls).size, 18, "discovery targets must be unique");
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
  const expectedReasons = new Map([
    ["/resources/case-studies/adelaide-cbd-asset-backed-lending", "pending-transaction-evidence"],
    ["/resources/case-studies/adelaide-cbd-office-complex", "pending-transaction-evidence"],
    ["/resources/case-studies/melbourne-richmond-asset-finance", "pending-transaction-evidence"],
    ["/resources/case-studies/newcastle-merewether-equipment-finance", "pending-transaction-evidence"],
    ["/resources/case-studies/newcastle-wickham-business-acquisition", "pending-transaction-evidence"],
    ["/resources/case-studies/perth-business-group-debt-consolidation", "pending-transaction-evidence"],
    ["/resources/case-studies/perth-fremantle-first-mortgage", "pending-transaction-evidence"],
    ["/resources/case-studies/rose-bay-property-development-bridging-loan", "pending-transaction-evidence"],
    ["/resources/case-studies/south-yarra-apartment-development", "pending-transaction-evidence"],
    ["/resources/guides/case-study-developers-first-project-funding-success", "pending-transaction-evidence"],
    ["/resources/guides/caveat-loan-prevented-business-closure-tax-debt-case-study", "pending-transaction-evidence"],
    ["/resources/guides/merchant-cash-advance-alternatives-australia", "pruned-low-value-20261124"],
    ["/resources/guides/ato-payment-plan-vs-business-finance-australia", "pruned-low-value-20261124"],
    ["/resources/guides/bad-credit-business-loans-for-commercial-borrowers", "pruned-low-value-20261124"],
    ["/resources/guides/letters-of-credit-vs-trade-finance-australian-importers", "pruned-low-value-20261124"],
    ["/resources/guides/unsecured-business-loan-lenders-australia", "pruned-low-value-20261124"],
    ["/resources/guides/second-mortgage-without-refinancing-your-first-mortgage-in-australia", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-property-valuation-delay-case-study", "pruned-low-value-20261124"],
    ["/resources/guides/motel-acquisition-finance-private-credit-australia", "pruned-low-value-20261124"],
    ["/resources/guides/pre-settlement-finance-commercial-property-purchases-australia", "pruned-low-value-20261124"],
    ["/resources/guides/bridging-loan-bank-delay-australia", "pruned-low-value-20261124"],
    ["/resources/guides/tradex-scheme-import-gst-trade-finance-australian-importers", "pruned-low-value-20261124"],
    ["/resources/guides/bridging-loan-repayment-calculator", "pruned-low-value-20261124"],
    ["/resources/guides/superannuation-guarantee-charge-business-finance-options-australia", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-property-finance-broker-selection-checklist", "pruned-low-value-20261124"],
    ["/resources/guides/seasonal-stock-finance-in-australia-funding-inventory-before-peak-trading-periods", "pruned-low-value-20261124"],
    ["/resources/guides/construction-completion-finance-in-australia-funding-a-project-that-has-stalled", "pruned-low-value-20261124"],
    ["/resources/guides/insurance-premium-funding-alternatives-australian-businesses", "pruned-low-value-20261124"],
    ["/resources/guides/bridging-finance-auction-settlement-case-study", "pruned-low-value-20261124"],
    ["/resources/guides/payroll-tax-debt-finance-australia", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-property-finance-melbourne-local-expert-hub", "pruned-low-value-20261124"],
    ["/resources/guides/division-7a-loan-secured-by-real-property-business-finance", "pruned-low-value-20261124"],
    ["/resources/guides/contract-mobilisation-finance-australia", "pruned-low-value-20261124"],
    ["/resources/guides/director-penalty-notice-finance-in-australia-funding-options-before-the-21-day-deadline", "pruned-low-value-20261124"],
    ["/resources/guides/restaurant-expansion-second-mortgage-case-study", "pruned-low-value-20261124"],
    ["/resources/guides/second-mortgages-in-sydney-fast-local-approval", "pruned-low-value-20261124"],
    ["/resources/guides/business-turnaround-finance-australia", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-property-loan-deposit-shortfall-case-study", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-rent-arrears-finance-australia", "pruned-low-value-20261124"],
    ["/resources/guides/unsecured-private-lenders-for-business-growth", "pruned-low-value-20261124"],
    ["/resources/guides/working-capital-finance-insurance-claim-delay-australia", "pruned-low-value-20261124"],
    ["/resources/guides/private-lender-document-pack-broker-take", "pruned-low-value-20261124"],
    ["/resources/guides/construction-funding-gap-private-credit-bank-shortfall-australia", "pruned-low-value-20261124"],
    ["/resources/guides/ato-gic-is-no-longer-deductible-should-businesses-refinance-tax-debt", "pruned-low-value-20261124"],
    ["/resources/guides/bridging-finance-melbourne-fast-property-solutions", "pruned-low-value-20261124"],
    ["/resources/guides/property-development-mortgage-australia", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-property-loan-covenants-what-happens-when-a-business-breaches-them", "pruned-low-value-20261124"],
    ["/resources/guides/capital-stack-commercial-property-finance-case-example", "pruned-low-value-20261124"],
    ["/resources/guides/private-finance-for-business-after-bank-delay", "pruned-low-value-20261124"],
    ["/resources/guides/commercial-property-loans-for-startups-first-time-buyers", "pruned-low-value-20261124"],
    ["/resources/guides/fitout-finance-landlord-contribution-delay-australia", "pruned-low-value-20261124"],
  ]);
  const index = buildContentIndex(repoRoot);
  const actualNoindex = Object.values(index)
    .flat()
    .filter((article) => article.noindex);

  assert.deepEqual(new Set(actualNoindex.map((article) => article.route)), new Set(expectedReasons.keys()));
  for (const article of actualNoindex) {
    assert.equal(
      article.indexingReason,
      expectedReasons.get(article.route),
      `${article.route} must keep its expected indexingReason`,
    );
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
    ["urgent caveat loans", "/services/first-second-mortgages"],
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
