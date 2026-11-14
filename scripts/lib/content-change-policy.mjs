const internalRoute = String.raw`(?:https?:\/\/(?:www\.)?emetcapital\.com\.au)?\/(?:resources\/(?:guides|case-studies|insights)|services)\/[a-z0-9][a-z0-9\-/]*(?:[?#][^\s<>'"\)\]]*)?`;

const markdownDestination = new RegExp(String.raw`(\]\(\s*)${internalRoute}(\s*(?:["'][^"']*["'])?\))`, "gi");
const htmlDestination = new RegExp(String.raw`(\bhref\s*=\s*["'])${internalRoute}(["'])`, "gi");
const referenceDestination = new RegExp(
  String.raw`^(\s*\[[^\]]+\]:\s*)${internalRoute}(\s*(?:["'][^"']*["'])?\s*)$`,
  "gim",
);

export function normalizeInternalLinkDestinations(value) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(markdownDestination, "$1<internal-route>$2")
    .replace(htmlDestination, "$1<internal-route>$2")
    .replace(referenceDestination, "$1<internal-route>$2");
}

export function isInternalLinkOnlyChange(before, after) {
  if (before === after) return false;
  return normalizeInternalLinkDestinations(before) === normalizeInternalLinkDestinations(after);
}

// Finite, exact copy remaps used when caveat loans were retired as an Emet
// product. Educational caveat guides may remain; these strings only stop the
// firm from selling caveat loans as a current service.
export const RETIRED_CAVEAT_PRODUCT_REPLACEMENTS = Object.freeze([
  [
    'designatedServicePage: "/services/caveat-loans"',
    'designatedServicePage: "/services/first-second-mortgages"',
  ],
  [
    "Emet Capital's [caveat loan service](/services/first-second-mortgages) can help prepare a business-purpose file and compare whether it is ready to take to lenders.",
    "If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages). Emet Capital can help prepare a business-purpose file and compare whether it is ready to take to lenders.",
  ],
  [
    "Borrowers seeking a transaction assessment can review Emet Capital's [caveat loan service](/services/first-second-mortgages); this guide provides general information, not legal, tax or financial advice.",
    "If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages). This guide provides general information, not legal, tax or financial advice.",
  ],
  [
    "For the product pathway, see [caveat loans](/services/first-second-mortgages).",
    "If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages).",
  ],
  [
    "Use the [caveat loans service](/services/first-second-mortgages) with the notice, amount, deadline, property, current debt and exit evidence. General information only; not financial, legal, insolvency or tax advice.",
    "If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages). Bring the notice, amount, deadline, property, current debt and exit evidence. General information only; not financial, legal, insolvency or tax advice.",
  ],
  [
    "Emet Capital provides [caveat loan solutions](/services/first-second-mortgages) for businesses requiring fast property-secured funding.",
    "If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages).",
  ],
  [
    "Emet Capital arranges commercial and business-purpose caveat loans and does not arrange consumer finance.",
    "Emet Capital arranges commercial and business-purpose finance and does not arrange consumer finance.",
  ],
  [
    "On a caveat or other short-term property-secured commercial file, the firm assesses the purpose, title position, property support, required date and exit before approaching specialist lenders that may be able to assess the file.",
    "On a short-term property-secured commercial file, the firm assesses the purpose, title position, property support, required date and exit before approaching specialist lenders that may be able to assess the file.",
  ],
  [
    "For a business-purpose caveat-file discussion, use the [caveat loans service](/services/first-second-mortgages). This is commercial work only; consumer finance is not offered. Emet Capital can assess business-purpose enquiries from across Australia. Actual availability depends on the property jurisdiction, title position, lender coverage and the complete transaction.",
    "If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages). This is commercial work only; consumer finance is not offered. Emet Capital can assess business-purpose enquiries from across Australia. Actual availability depends on the property jurisdiction, title position, lender coverage and the complete transaction.",
  ],
  [
    "Consider using experienced mortgage brokers specialising in [caveat loans](/services/first-second-mortgages) rather than approaching lenders directly. Specialist brokers know which lenders genuinely deliver speed versus those with more marketing than capability. They can pre-qualify your scenario, submit to appropriate lenders, and chase documentation processing—services that often accelerate settlement versus self-managed applications. Discuss their fee structure upfront—brokers may receive commission from lenders, charge fees directly to clients, or use a combination of both models.",
    "Consider using an experienced commercial mortgage broker rather than approaching lenders directly. Specialist brokers know which lenders genuinely deliver speed versus those with more marketing than capability. They can pre-qualify your scenario, submit to appropriate lenders, and chase documentation processing, services that often accelerate settlement versus self-managed applications. Discuss their fee structure upfront: brokers may receive commission from lenders, charge fees directly to clients, or use a combination of both models. If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages).",
  ],
  [
    "Alternatives include a negotiated settlement extension, [commercial property refinance](/services/refinancing-solutions), [caveat finance](/services/first-second-mortgages), a registered second mortgage, vendor finance or restructuring the transaction.",
    "Alternatives include a negotiated settlement extension, [commercial property refinance](/services/refinancing-solutions), a registered [first or second mortgage](/services/first-second-mortgages), vendor finance or restructuring the transaction.",
  ],
  [
    "- [Caveat Loans](/services/first-second-mortgages) - Fast property-secured funding",
    "- [first and second mortgages page](/services/first-second-mortgages) - Property-secured business funding",
  ],
  [
    'title: "Surry Hills Restaurant Acquisition: $3.2M Caveat Loan Success"',
    'title: "Surry Hills Restaurant Acquisition: $3.2M Short-Term Property-Secured Facility"',
  ],
  [
    'description: "How Emet Capital secured a $3.2M caveat loan in 48 hours for a prime Surry Hills restaurant acquisition in Sydney\'s competitive hospitality market."',
    'description: "An illustrative $3.2 million short-term property-secured facility for a Surry Hills restaurant acquisition, arranged through a commercial finance broker under compressed timing."',
  ],
  [
    'loanType: "Caveat Loan"',
    'loanType: "Short-term property-secured facility"',
  ],
  [
    "# Surry Hills Restaurant Acquisition: $3.2M Caveat Loan Success",
    "# Surry Hills Restaurant Acquisition: $3.2M Short-Term Property-Secured Facility",
  ],
  [
    "# Surry Hills Restaurant Acquisition: $3.2M Short-Term Property-Secured Facility\n\n*Example scenario — illustrative of the commercial finance situations Emet Capital is positioned to support. Not based on a specific client matter.*",
    "# Surry Hills Restaurant Acquisition: $3.2M Short-Term Property-Secured Facility\n\n*Example scenario: illustrative of the commercial finance situations Emet Capital is positioned to support. Not based on a specific client matter.*",
  ],
  [
    "For Emet Capital borrowers, the practical question is simple: can the land tax pressure be resolved with a clean payment plan, refinance, sale proceeds, commercial property loan, caveat-style short-term facility or second mortgage before enforcement makes the file harder?",
    "For a commercial borrower, the practical question is simple: can the land tax pressure be resolved with a clean payment plan, refinance, sale proceeds, commercial property loan or second mortgage before enforcement makes the file harder?",
  ],
  [
    "Emet Capital helps eligible commercial borrowers work out whether land tax arrears are best handled through refinance, second mortgage, caveat-style funding, private lending, sale timing or a negotiated non-loan option.",
    "Emet Capital helps eligible commercial borrowers work out whether land tax arrears are best handled through refinance, a second mortgage, private lending, sale timing or a negotiated non-loan option. If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages).",
  ],
  [
    "Emet Capital helps borrowers compare whether caveat loans, [private lending](/resources/guides/what-is-private-lending-australia), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide) or [commercial refinancing](/services/refinancing-solutions) is the cleaner pathway.",
    "Emet Capital helps borrowers compare [private lending](/resources/guides/what-is-private-lending-australia), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide) or [commercial refinancing](/services/refinancing-solutions). If you need property-secured business funding, see our [first and second mortgages page](/services/first-second-mortgages).",
  ],
  [
    "At Emet Capital, we treat caveat pricing as a timing-and-exit question first.",
    "Treat caveat pricing as a timing-and-exit question first.",
  ],
  [
    "At Emet Capital, we see this as a timing and structure question, not just a funding question.",
    "This is a timing and structure question, not just a funding question.",
  ],
  [
    "The goal is not to force every urgent enquiry into a caveat loan.",
    "The goal is not to force every urgent enquiry into one product label.",
  ],
  [
    "Emet Capital helps eligible business borrowers compare commercial property, bridging, caveat, second mortgage, refinance, and private lending pathways.",
    "Emet Capital helps eligible business borrowers compare commercial property, bridging, second mortgage, refinance, and private lending pathways.",
  ],
  [
    "Yes. Emet Capital can help eligible commercial borrowers compare private, non-bank, bridging, caveat, second mortgage, and refinance options after a bank decline, subject to security, purpose, and lender assessment.",
    "Yes. Emet Capital can help eligible commercial borrowers compare private, non-bank, bridging, second mortgage, and refinance options after a bank decline, subject to security, purpose, and lender assessment.",
  ],
  [
    "Emet Capital helps eligible commercial borrowers compare caveat loans, bridging finance, private lending, second mortgages, and property-backed refinance options for settlement pressure.",
    "Emet Capital helps eligible commercial borrowers compare bridging finance, private lending, second mortgages, and property-backed refinance options for settlement pressure.",
  ],
  [
    "That helps identify whether the transaction needs urgent caveat finance or a more stable commercial facility.",
    "That helps identify whether the transaction needs a short-term property-secured facility or a more stable commercial facility.",
  ],
  [
    "Emet Capital helps borrowers compare structure, timing, and risk across caveat lending, [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), and private lending options.",
    "Emet Capital helps borrowers compare structure, timing, and risk across [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), first and second mortgages, and private lending options.",
  ],
  [
    "Emet Capital helps business borrowers compare [caveat loans](/resources/guides/caveat-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), and [private lending](/resources/guides/what-is-private-lending-australia) when timing is tight.",
    "This guide explains how valuation delays affect caveat files. For market structure, see the [caveat loans Australia guide](/resources/guides/caveat-loans-australia-complete-guide). If you need property-secured business funding, Emet Capital can help you compare [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), and [private lending](/resources/guides/what-is-private-lending-australia).",
  ],
  [
    "Emet Capital helps commercial borrowers compare caveat finance with second mortgages, bridging loans, private lending, and refinance options.",
    "Emet Capital helps commercial borrowers compare second mortgages, bridging loans, private lending, and refinance options.",
  ],
  [
    "Emet Capital helps borrowers compare [caveat loans](/resources/guides/caveat-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [private lending](/resources/guides/what-is-private-lending-australia), and [commercial property finance](/resources/guides/commercial-property-loans-australia-complete-guide) options based on the actual file, not a generic product label.",
    "Borrowers can compare the [caveat loans Australia guide](/resources/guides/caveat-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [private lending](/resources/guides/what-is-private-lending-australia), and [commercial property finance](/resources/guides/commercial-property-loans-australia-complete-guide) based on the actual file, not a generic product label.",
  ],
  [
    "Emet Capital helps business borrowers compare whether an [urgent caveat loan](/resources/guides/urgent-caveat-loans), [settlement shortfall finance](/resources/guides/settlement-shortfall-finance-in-australia-what-to-do-when-funds-are-short-before-settlement), bridging finance, a second mortgage, or another private lending structure is more suitable for the file.",
    "This case study compares whether an [urgent caveat loan](/resources/guides/urgent-caveat-loans), [settlement shortfall finance](/resources/guides/settlement-shortfall-finance-in-australia-what-to-do-when-funds-are-short-before-settlement), bridging finance, a second mortgage, or another private lending structure is more suitable for the file.",
  ],
  [
    "Emet Capital helps eligible business borrowers compare second mortgages, refinances, caveat loans, private lending, working capital finance and asset-backed options.",
    "Emet Capital helps eligible business borrowers compare second mortgages, refinances, private lending, working capital finance and asset-backed options.",
  ],
  [
    "Emet Capital helps eligible business borrowers compare second mortgages, full refinance, caveat loans, private lending, working capital facilities and asset-backed options.",
    "Emet Capital helps eligible business borrowers compare second mortgages, full refinance, private lending, working capital facilities and asset-backed options.",
  ],
  [
    "Emet Capital helps borrowers compare second mortgage options against refinancing, caveat loans, bridging finance, private lending, and unsecured business finance.",
    "Emet Capital helps borrowers compare second mortgage options against refinancing, bridging finance, private lending, and unsecured business finance.",
  ],
  [
    "Emet Capital helps borrowers compare short-term caveat loans with [caveat loans](/resources/guides/caveat-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), and [commercial property refinancing](/services/refinancing-solutions).",
    "This guide explains how short-term caveat loans work in the market. Compare it with the [caveat loans Australia guide](/resources/guides/caveat-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), and [commercial property refinancing](/services/refinancing-solutions).",
  ],
  [
    "Emet Capital helps eligible business borrowers compare private lending, commercial property finance, second mortgages, caveat loans, and refinancing options.",
    "Emet Capital helps eligible business borrowers compare private lending, commercial property finance, second mortgages, and refinancing options.",
  ],
  [
    "Emet Capital helps business borrowers prepare second mortgage files and compare second mortgages with refinancing, caveat loans, commercial property finance, and private lending.",
    "Emet Capital helps business borrowers prepare second mortgage files and compare second mortgages with refinancing, commercial property finance, and private lending.",
  ],
  [
    "Emet Capital helps commercial borrowers compare whether a private mortgage loan, second mortgage, caveat loan, commercial refinance, or working-capital structure is the cleaner fit.",
    "Emet Capital helps commercial borrowers compare whether a private mortgage loan, second mortgage, commercial refinance, or working-capital structure is the cleaner fit.",
  ],
  [
    "Emet Capital can help eligible commercial borrowers assess private lending pathways, prepare a lender-ready file, and compare structures across private credit, second mortgages, caveat loans, bridging finance, and commercial property refinance.",
    "Emet Capital can help eligible commercial borrowers assess private lending pathways, prepare a lender-ready file, and compare structures across private credit, second mortgages, bridging finance, and commercial property refinance.",
  ],
  [
    "Emet Capital helps eligible business borrowers compare options from lenders across structures such as private debt, private lending, second mortgages, caveat loans, and commercial refinance.",
    "Emet Capital helps eligible business borrowers compare options from lenders across structures such as private debt, private lending, second mortgages, and commercial refinance.",
  ],
  [
    "Emet Capital helps commercial borrowers package the file, identify the likely lender appetite, compare structures, and understand whether private debt, bank refinance, second mortgage, caveat loan, or another commercial facility is the better fit.",
    "Emet Capital helps commercial borrowers package the file, identify the likely lender appetite, compare structures, and understand whether private debt, bank refinance, second mortgage, or another commercial facility is the better fit.",
  ],
  [
    "Emet Capital helps eligible commercial borrowers diagnose the decline reason, package the file, compare lender pathways, and assess whether private lending, second mortgage finance, caveat finance, bridging finance, or commercial refinancing may be relevant.",
    "Emet Capital helps eligible commercial borrowers diagnose the decline reason, package the file, compare lender pathways, and assess whether private lending, second mortgage finance, bridging finance, or commercial refinancing may be relevant.",
  ],
  [
    "Emet Capital helps commercial borrowers compare second mortgages against the wider funding market. That can include [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), private lending, caveat loans, bridging finance, asset finance, invoice finance, and commercial refinance.",
    "Emet Capital helps commercial borrowers compare second mortgages against the wider funding market. That can include [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), private lending, bridging finance, asset finance, invoice finance, and commercial refinance.",
  ],
  [
    "Emet Capital provides commercial property finance including first and second mortgages, bridging finance, and caveat loans.",
    "Emet Capital is a commercial finance broker that can help eligible borrowers compare first and second mortgages and bridging finance.",
  ],
  [
    "Emet Capital helps eligible business borrowers compare residential-property-backed business finance against second mortgages, private lending, caveat finance, unsecured finance, equipment finance and refinance options.",
    "Emet Capital helps eligible business borrowers compare residential-property-backed business finance against second mortgages, private lending, unsecured finance, equipment finance and refinance options.",
  ],
  [
    "That may mean testing a caveat-loan pathway, a second mortgage pathway, or another private lending structure.",
    "That may mean testing a second mortgage pathway or another private lending structure.",
  ],
  [
    "we can compare whether a bridge, second mortgage, caveat loan, private mortgage facility, or longer-term commercial property loan is the cleaner option.",
    "we can compare whether a bridge, second mortgage, private mortgage facility, or longer-term commercial property loan is the cleaner option.",
  ],
  [
    "The goal is to identify whether a bridge, refinance, second mortgage, caveat loan, or standard commercial loan is the most practical fit for the transaction.",
    "The goal is to identify whether a bridge, refinance, second mortgage, or standard commercial loan is the most practical fit for the transaction.",
  ],
  [
    "Emet Capital helps Australian business owners compare urgent business lender options against [private lending](/resources/guides/what-is-private-lending-australia), [business finance](/resources/guides/working-capital-loans-for-smes), [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), and [caveat loans](/resources/guides/caveat-loans-australia-complete-guide).",
    "Emet Capital helps Australian business owners compare urgent business lender options against [private lending](/resources/guides/what-is-private-lending-australia), [business finance](/resources/guides/working-capital-loans-for-smes), [commercial property loans](/resources/guides/commercial-property-loans-australia-complete-guide), [second mortgages](/resources/guides/second-mortgages-for-business-guide), and [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide).",
  ],
  [
    "It helps commercial borrowers identify whether the shortfall is a refinance issue, bridging issue, caveat issue, second mortgage issue or negotiation issue.",
    "It helps commercial borrowers identify whether the shortfall is a refinance issue, bridging issue, second mortgage issue or negotiation issue.",
  ],
  [
    "Emet Capital helps eligible business borrowers identify the documents lenders are likely to need, package the file around purpose and exit, and compare second mortgage options against refinancing, caveat loans, commercial property finance, and private lending.",
    "Emet Capital helps eligible business borrowers identify the documents lenders are likely to need, package the file around purpose and exit, and compare second mortgage options against refinancing, commercial property finance, and private lending.",
  ],
  [
    "then compare whether a [caveat loan](/resources/guides/caveat-loans-australia-complete-guide), [second mortgage](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), or refinance pathway was the cleaner structure.",
    "then compare whether a [second mortgage](/resources/guides/second-mortgages-for-business-guide), [bridging finance](/resources/guides/bridging-finance-australia-complete-property-guide), or refinance pathway was the cleaner structure.",
  ],
  [
    "Sometimes it is a [second mortgage](/resources/guides/second-mortgages-for-business-guide), [caveat loan](/resources/guides/caveat-loans-australia-complete-guide), bridging facility, invoice finance, asset finance, or a reworked bank submission.",
    "Sometimes it is a [second mortgage](/resources/guides/second-mortgages-for-business-guide), bridging facility, invoice finance, asset finance, or a reworked bank submission.",
  ],
]);

export function applyRetiredCaveatProductCopy(source) {
  let updated = source.replaceAll(
    'designatedServicePage: "/services/caveat-loans"',
    'designatedServicePage: "/services/first-second-mortgages"',
  );
  updated = updated.replace(/\]\(\/services\/caveat-loans(?:\/[^)]*)?\)/g, "](/services/first-second-mortgages)");
  for (const [from, to] of RETIRED_CAVEAT_PRODUCT_REPLACEMENTS) {
    updated = updated.replaceAll(from, to);
  }
  return updated.replace(
    /\[[^\]]*caveat[^\]]*\]\(\/services\/first-second-mortgages\)/gi,
    "[first and second mortgages page](/services/first-second-mortgages)",
  );
}

export function isRetiredProductCopyChange(before, after) {
  if (before === after) return false;
  return applyRetiredCaveatProductCopy(before) === after;
}
