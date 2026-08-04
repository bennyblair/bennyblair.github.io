export type PageType =
  | "home"
  | "company"
  | "service"
  | "location"
  | "resource"
  | "guide"
  | "case-study"
  | "tool"
  | "legal"
  | "system";

export interface SiteRouteDefinition {
  path: string;
  component: string;
  pageType: PageType;
  canonical?: string;
  indexable: boolean;
  source: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
}

export interface RedirectRule {
  from: string;
  to: string;
  status: 301 | 302 | 404;
  force?: boolean;
}

export const DOMAIN = "https://emetcapital.com.au";

export const cities = [
  { slug: "sydney", suffix: "Sydney" },
  { slug: "melbourne", suffix: "Melbourne" },
  { slug: "brisbane", suffix: "Brisbane" },
  { slug: "perth", suffix: "Perth" },
  { slug: "adelaide", suffix: "Adelaide" },
  { slug: "gold-coast", suffix: "GoldCoast" },
] as const;

const cityFamilies = [
  { slug: "smsf-lending", component: "SMSFLending", sourcePrefix: "SMSFLending", usesCitiesPath: true },
  { slug: "private-lending", component: "PrivateLending", sourcePrefix: "PrivateLending", usesCitiesPath: true },
  {
    slug: "first-second-mortgages",
    component: "FirstSecondMortgages",
    sourcePrefix: "FirstSecondMortgages",
    usesCitiesPath: true,
  },
  {
    slug: "commercial-property-development",
    component: "CommercialDevelopment",
    sourcePrefix: "CommercialDevelopment",
    usesCitiesPath: true,
  },
  { slug: "bridging-finance", component: "BridgingFinance", sourcePrefix: "BridgingFinance", usesCitiesPath: true },
  { slug: "asset-finance", component: "AssetFinance", sourcePrefix: "AssetFinance", usesCitiesPath: true },
  {
    slug: "asset-backed-lending",
    component: "AssetBackedLending",
    sourcePrefix: "AssetBackedLending",
    usesCitiesPath: false,
  },
  {
    slug: "refinancing-solutions",
    component: "RefinancingSolutions",
    sourcePrefix: "RefinancingSolutions",
    usesCitiesPath: true,
  },
  {
    slug: "business-acquisition",
    component: "BusinessAcquisition",
    sourcePrefix: "BusinessAcquisition",
    usesCitiesPath: true,
  },
  {
    slug: "debt-consolidation",
    component: "DebtConsolidation",
    sourcePrefix: "DebtConsolidation",
    usesCitiesPath: true,
  },
  {
    slug: "equipment-finance",
    component: "EquipmentFinance",
    sourcePrefix: "EquipmentFinance",
    usesCitiesPath: true,
  },
  { slug: "working-capital", component: "WorkingCapital", sourcePrefix: "WorkingCapital", usesCitiesPath: true },
  { slug: "trade-finance", component: "TradeFinance", sourcePrefix: "TradeFinance", usesCitiesPath: true },
  { slug: "caveat-loans", component: "CaveatLoans", sourcePrefix: "CaveatLoans", usesCitiesPath: true },
] as const;

const cityRoutes: SiteRouteDefinition[] = cityFamilies.flatMap((family) =>
  cities.map((city) => ({
    path: `/services/${family.slug}/${family.usesCitiesPath ? "cities/" : ""}${city.slug}`,
    component: `${family.component}${city.suffix}`,
    pageType: "location",
    indexable: true,
    source: `src/pages/services/cities/${family.sourcePrefix}${city.suffix}.tsx`,
    changefreq: "monthly",
    priority: 0.7,
  })),
);

const toolRoutes: SiteRouteDefinition[] = [
  ["commercial-property-loan-calculator", "CommercialPropertyLoanCalculator"],
  ["second-mortgage-calculator", "SecondMortgageCalculator"],
  ["commercial-real-estate-calculator", "CommercialRealEstateCalculator"],
  ["asset-finance-roi-calculator", "AssetFinanceROICalculator"],
  ["working-capital-calculator", "WorkingCapitalCalculator"],
  ["loan-comparison-tool", "LoanComparisonTool"],
  ["bridging-loan-calculator", "BridgingLoanCalculator"],
].map(([slug, component]) => ({
  path: `/resources/tools/${slug}`,
  component,
  pageType: "tool",
  indexable: true,
  source: `src/pages/tools/${component}.tsx`,
  changefreq: "monthly",
  priority: 0.7,
}));

export const siteRoutes: SiteRouteDefinition[] = [
  {
    path: "/",
    component: "Homepage",
    pageType: "home",
    indexable: true,
    source: "src/pages/Homepage.tsx",
    changefreq: "weekly",
    priority: 1,
  },
  { path: "/about", component: "About", pageType: "company", indexable: true, source: "src/pages/About.tsx" },
  {
    path: "/about/ben",
    component: "AboutBen",
    pageType: "company",
    indexable: true,
    source: "src/pages/AboutBen.tsx",
  },
  {
    path: "/about/daniel",
    component: "AboutDaniel",
    pageType: "company",
    indexable: true,
    source: "src/pages/AboutDaniel.tsx",
  },
  {
    path: "/contact",
    component: "Contact",
    pageType: "company",
    indexable: true,
    source: "src/pages/Contact.tsx",
    priority: 0.8,
  },
  {
    path: "/services",
    component: "Services",
    pageType: "service",
    indexable: true,
    source: "src/pages/Services.tsx",
    priority: 0.9,
  },
  {
    path: "/resources",
    component: "ResourcesHub",
    pageType: "resource",
    indexable: true,
    source: "src/pages/ResourcesHub.tsx",
    priority: 0.8,
  },
  {
    path: "/resources/guides",
    component: "Guides",
    pageType: "resource",
    indexable: true,
    source: "src/pages/Guides.tsx",
    changefreq: "daily",
    priority: 0.8,
  },
  {
    path: "/resources/guides/:slug",
    component: "GuideArticle",
    pageType: "guide",
    indexable: false,
    source: "src/pages/GuideArticle.tsx",
  },
  {
    path: "/resources/case-studies",
    component: "CaseStudies",
    pageType: "resource",
    indexable: true,
    source: "src/pages/CaseStudies.tsx",
    changefreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/resources/case-studies/:slug",
    component: "CaseStudyArticle",
    pageType: "case-study",
    indexable: false,
    source: "src/pages/CaseStudyArticle.tsx",
  },
  {
    path: "/locations/:city",
    component: "CityLandingPage",
    pageType: "location",
    indexable: false,
    source: "src/pages/CityLandingPage.tsx",
  },
  {
    path: "/resources/tools",
    component: "Tools",
    pageType: "resource",
    indexable: true,
    source: "src/pages/Tools.tsx",
  },
  {
    path: "/resources/glossary",
    component: "Glossary",
    pageType: "resource",
    indexable: true,
    source: "src/pages/Glossary.tsx",
  },
  {
    path: "/resources/faqs",
    component: "FAQs",
    pageType: "resource",
    indexable: true,
    source: "src/pages/FAQs.tsx",
  },
  {
    path: "/resources/insights",
    component: "MarketInsights",
    pageType: "resource",
    indexable: true,
    source: "src/pages/MarketInsights.tsx",
  },
  {
    path: "/privacy-policy",
    component: "PrivacyPolicy",
    pageType: "legal",
    indexable: true,
    source: "src/pages/PrivacyPolicy.tsx",
  },
  { path: "/terms", component: "Terms", pageType: "legal", indexable: true, source: "src/pages/Terms.tsx" },
  {
    path: "/editorial-standards",
    component: "EditorialStandards",
    pageType: "legal",
    indexable: true,
    source: "src/pages/EditorialStandards.tsx",
  },
  {
    path: "/complaints-process",
    component: "ComplaintsProcess",
    pageType: "legal",
    indexable: true,
    source: "src/pages/ComplaintsProcess.tsx",
  },
  ...[
    ["first-second-mortgages", "FirstSecondMortgages"],
    ["commercial-property-development", "CommercialPropertyDevelopment"],
    ["business-finance", "BusinessFinance"],
    ["working-capital", "WorkingCapital"],
    ["bridging-finance", "BridgingFinance"],
    ["commercial-property-finance", "CommercialPropertyFinance"],
    ["refinancing-solutions", "RefinancingSolutions"],
    ["equipment-finance", "EquipmentFinance"],
    ["business-acquisition", "BusinessAcquisition"],
    ["trade-finance", "TradeFinance"],
    ["asset-backed-lending", "AssetBackedLending"],
    ["private-lending", "PrivateLending"],
    ["smsf-lending", "SMSFLending"],
    ["debt-consolidation", "DebtConsolidation"],
    ["caveat-loans", "CaveatLoans"],
    ["asset-finance", "AssetFinance"],
  ].map(([slug, component]) => ({
    path: `/services/${slug}`,
    component,
    pageType: "service" as const,
    indexable: true,
    source: `src/pages/services/${component}.tsx`,
    changefreq: "monthly" as const,
    priority: slug === "commercial-property-finance" ? 0.9 : 0.8,
  })),
  ...toolRoutes,
  ...cityRoutes,
  { path: "*", component: "NotFound", pageType: "system", indexable: false, source: "src/pages/NotFound.tsx" },
];

const oldCityPathRedirects: RedirectRule[] = [
  "bridging-finance",
  "asset-finance",
  "first-second-mortgages",
  "refinancing-solutions",
].flatMap((service) =>
  cities.map((city) => ({
    from: `/services/${service}/${city.slug}`,
    to: `/services/${service}/cities/${city.slug}`,
    status: 301 as const,
  })),
);

const simpleAliases: Record<string, string> = {
  "/about-us": "/about",
  "/apply-now": "/contact",
  "/contact-6": "/contact",
  "/commercial-property-development": "/services/commercial-property-development",
  "/business-investment-expansion": "/services/business-acquisition",
  "/first-second-mortgages": "/services/first-second-mortgages",
  "/construction": "/services/commercial-property-development",
  "/asset-based-lending": "/services/asset-backed-lending",
  "/services/second-mortgage": "/services/first-second-mortgages",
  "/strata-finance": "/services/commercial-property-development",
  "/refinance": "/services/refinancing-solutions",
  "/working-capital": "/services/working-capital",
  "/guides": "/resources/guides",
  "/case-studies": "/resources/case-studies",
  "/glossary": "/resources/glossary",
  "/faqs": "/resources/faqs",
  "/insights": "/resources/insights",
  "/market-insights": "/resources/insights",
  "/tools": "/resources/tools",
  "/private-mortgage-lenders-australia-directory-2026":
    "/resources/guides/private-mortgage-lenders-australia-directory-2026",
  "/subordination-agreement-second-mortgage": "/resources/guides/subordination-agreement-second-mortgage",
  "/copy-of-commercial-property-development": "/services/commercial-property-development",
  "/copy-of-working-capital": "/services/working-capital",
};

const guideAliases: Record<string, string> = {
  "2nd-mortgages-with-bad-credit": "second-mortgage-bad-credit-qualify",
  "second-mortgage-for-poor-credit": "second-mortgage-bad-credit-qualify",
  "caveat-loans-australia": "caveat-loans-australia-complete-guide",
  "caveat-loans-australia-guide": "caveat-loans-australia-complete-guide",
  "caveat-loans-australia-complete-property-guide": "caveat-loans-australia-complete-guide",
  "bridging-loans-australia": "bridging-finance-australia-complete-property-guide",
  "bridging-finance-commercial-property-australia": "bridging-finance-australia-complete-property-guide",
  "commercial-bridging-loan": "bridging-finance-australia-complete-property-guide",
  "commercial-bridge-loan": "bridging-finance-australia-complete-property-guide",
  "fast-bridging-finance": "bridging-finance-australia-complete-property-guide",
  "construction-bridge-loans": "../",
  "commercial-loan-repayment-calculator": "../tools/commercial-property-loan-calculator",
  "short-term-property-loan": "short-term-property-loans-when-you-need-fast-finance",
  "short-term-property-loans": "short-term-property-loans-when-you-need-fast-finance",
  "short-term-property-funding": "short-term-property-loans-when-you-need-fast-finance",
  "caveat-loans-vs-second-mortgages": "caveat-loans-vs-bank-loans-speed-comparison",
  "private-lending-sydney-business-guide": "../../services/private-lending/cities/sydney",
  "second-mortgage-australia": "what-is-a-second-mortgage",
  "caveat-loans-sydney-same-day-approval-available": "../../services/caveat-loans/cities/sydney",
  "caveat-loans-melbourne-quick-business-finance": "../../services/caveat-loans/cities/melbourne",
  "caveat-loans-perth-business-property-finance": "../../services/caveat-loans/cities/perth",
  "second-mortgage-for-business": "second-mortgages-for-business-guide",
  "first-and-second-mortgages-for-business": "second-mortgages-for-business-guide",
  "2nd-loan-mortgage-business-capital": "second-mortgages-for-business-guide",
  "second-mortgage-vs-line-of-credit-which-to-choose": "second-mortgage-vs-line-of-credit",
  "understanding-lvr-priority-deeds-commercial-lending":
    "priority-agreements-in-second-mortgages-what-they-mean",
  "private-mortgage-lenders-australia-directory": "private-mortgage-lenders-australia-directory-2026",
  "private-lenders-for-mortgages": "private-mortgage-lenders-australia-directory-2026",
  "commercial-bridging-finance-auction-purchases":
    "commercial-bridging-loans-for-property-auctions-expert-guide",
  "commercial-bridging-loans-property-auctions-expert-guide":
    "commercial-bridging-loans-for-property-auctions-expert-guide",
  "finding-best-private-lenders-for-your-business": "finding-comparing-private-lenders-loans-2025-guide",
  "private-lenders-small-business-fast-approval-guide": "what-is-private-lending-australia",
};

function guideTarget(target: string) {
  if (target === "../") return "/resources/guides";
  if (target.startsWith("../../")) return `/${target.slice(6)}`;
  if (target.startsWith("../tools/")) return `/resources/${target.slice(3)}`;
  return `/resources/guides/${target}`;
}

const legacyToolAliases = [
  "2nd-mortgage-loan-rates",
  "2nd-mortgage-rates",
  "mortgage-rates-for-second-mortgage",
  "second-mortgage-rates",
].map((slug) => ({
  from: `/resources/tools/${slug}`,
  to: "/resources/tools/second-mortgage-calculator",
  status: 301 as const,
}));

const commercialToolAliases = [
  "commercial-property-loan-repayment-calculator",
  "commercial-real-estate-loans-calculator",
  "loan-calculator-commercial-loan",
  "loan-for-commercial-property-calculator",
  "repayment-calculator-commercial-property",
].map((slug) => ({
  from: `/resources/tools/${slug}`,
  to: "/resources/tools/commercial-property-loan-calculator",
  status: 301 as const,
}));

export const redirectRules: RedirectRule[] = [
  { from: "http://emetcapital.com.au/*", to: `${DOMAIN}/:splat`, status: 301, force: true },
  { from: "https://www.emetcapital.com.au/*", to: `${DOMAIN}/:splat`, status: 301, force: true },
  ...Object.entries(simpleAliases).map(([from, to]) => ({ from, to, status: 301 as const })),
  ...oldCityPathRedirects,
  ...Object.entries(guideAliases).map(([slug, target]) => ({
    from: `/resources/guides/${slug}`,
    to: guideTarget(target),
    status: 301 as const,
  })),
  ...legacyToolAliases,
  ...commercialToolAliases,
  { from: "/guides/*", to: "/resources/guides/:splat", status: 301 },
  { from: "/case-studies/:slug", to: "/resources/case-studies/:slug", status: 301 },
  { from: "/tools/:slug", to: "/resources/tools/:slug", status: 301 },
  { from: "/*", to: "/404.html", status: 404 },
];

export const clientRedirects = redirectRules.filter(
  (rule) =>
    rule.status === 301 &&
    rule.from.startsWith("/") &&
    rule.to.startsWith("/") &&
    !rule.from.includes("*") &&
    !rule.from.includes(":"),
);

export function canonicalUrl(pathname: string) {
  return pathname === "/" ? `${DOMAIN}/` : `${DOMAIN}${pathname}`;
}

export function isRedirectSource(pathname: string) {
  return redirectRules.some((rule) => rule.status === 301 && rule.from === pathname);
}

export function getIndexableStaticRoutes() {
  return siteRoutes.filter(
    (route) => route.indexable && !route.path.includes(":") && route.path !== "*" && !isRedirectSource(route.path),
  );
}
