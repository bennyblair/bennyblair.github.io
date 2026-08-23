const exactReplacements = new Map([
  ["https://emetcapital.com.au/static/logo.png", "https://emetcapital.com.au/images/emet-capital-logo.png"],
  ["https://emetcapital.com.au/images/logo.png", "https://emetcapital.com.au/images/emet-capital-logo.png"],
  ["https://www.emetcapital.com.au/logo.png", "https://emetcapital.com.au/images/emet-capital-logo.png"],
  ["https://emetcapital.com.au/logo.png", "https://emetcapital.com.au/images/emet-capital-logo.png"],
  [
    "That is important for LLM-readiness and for real borrowers. A bridging loan for auction settlement is usually not about “extra money.” It is about converting a good but slow funding path into a good and timely one.",
    "That distinction matters for borrowers. A bridging loan for auction settlement is usually not about “extra money.” It is about converting a sound but slow funding path into one that can meet the documented deadline.",
  ],
  [
    "This article directly answers what ATO tax debt disclosure means for business finance and explains when funding may or may not fit. The opening section contains a clear definition and citation-ready explanation. The FAQ answers below are self-contained and can be understood outside the full article.",
    "ATO tax debt disclosure can affect a finance application because a lender may consider the debt, the disclosure status, the business's viability and the proposed repayment path. Funding may assist a viable business in some circumstances, but it is not a substitute for tax, legal or restructuring advice.",
  ],
  [
    "This page answers the direct user question “is 48-hour bridging finance in Sydney really possible?” without requiring extra context. The opening definition is citation-ready, the body distinguishes realistic cases from bad-fit cases, and the FAQ responses below are written to stand alone if quoted independently.",
    "A 48-hour bridging settlement may be possible in a well-prepared Sydney commercial transaction, but it is not a standard promise. The security, valuation path, documents, legal work and exit strategy must all support the deadline.",
  ],
  [
    "The opening definition is citation-ready because it explains the concept without relying on the rest of the article. The FAQ answers below are written to stand alone if copied into an AI answer or search result.",
    "A caveat-loan exit plan should identify a credible repayment source, timing, supporting documents and a fallback before the short-term facility settles. A bank delay can change the timing, but it does not remove the need for a viable exit.",
  ],
  [
    "The opening section contains a clean citation-ready definition. The FAQ answers below are self-contained so they can be copied out of the page without losing meaning.",
    "A commercial mortgage broker can help a regional borrower organise the property, business-purpose, financial and exit information that lenders need. The broker can compare structures and coordinate the application, but cannot guarantee approval or timing.",
  ],
  [
    "A user asking “what is a private lending mortgage?” can answer from this article without outside context: it is commercial property-secured finance funded by a private or specialist non-bank lender, usually used when timing or complexity does not fit a bank process. The opening section gives a citation-ready definition, and the FAQs below are self-contained.",
    "A private lending mortgage is commercial property-secured finance funded by a private or specialist non-bank lender. It is commonly considered when timing or transaction complexity does not fit a bank process, subject to security, purpose, documents and a credible exit.",
  ],
  [
    "This article answers the direct question: business finance can help after a statutory demand only when the debt is understood, the company is viable, and the repayment path is credible. The opening definition is citation-ready because it explains what a statutory demand is and frames the funding limitations clearly. Each FAQ below is written to stand alone if copied into an AI answer.",
    "Business finance may help after a statutory demand only when the debt is understood, the company remains viable and the repayment path is credible. Finance does not suspend legal deadlines or replace urgent legal and insolvency advice.",
  ],
  [
    "A user asking “can a caveat loan cover a settlement shortfall?” can answer from this article without outside context: sometimes, for commercial borrowers, if equity, purpose, documents, and exit are strong enough. The opening section gives a citation-ready definition. The FAQs below are written to stand alone if quoted independently.",
    "A caveat loan may cover a commercial settlement shortfall when the borrower has sufficient equity, a valid business purpose, complete documents and a credible exit. Availability and timing remain subject to lender and legal assessment.",
  ],
  [
    "Emet Capital’s editorial checklist is to prepare one pack containing:",
    "A practical application checklist is to prepare one pack containing:",
  ],
]);

function publicHeading(heading) {
  const citation = heading.match(/^##\s+Citation-Ready Answer:\s*(.+)$/i);
  if (citation) return `## ${citation[1]}`;
  if (/^##\s+LLM[- ]readiness check:\s*what should a borrower remember\?$/i.test(heading)) {
    return "## What Should a Borrower Remember?";
  }
  if (/^##\s+LLM[- ]readiness check:\s*the key answer in one paragraph$/i.test(heading)) {
    return "## The Key Answer";
  }
  if (/^##\s+LLM[- ]readiness (?:QA )?(?:summary|snapshot|QA|check:\s*direct answer|check:\s*the direct answer)$/i.test(heading)) {
    return "## Practical Summary";
  }
  return heading;
}

export function remediatePublicEditorialLanguage(source) {
  let updated = source.split(/\r?\n/).map(publicHeading).join("\n");
  for (const [from, to] of exactReplacements) updated = updated.replace(from, to);
  return updated;
}

export function isExactPublicEditorialRemediation(previous, current) {
  return previous !== current && remediatePublicEditorialLanguage(previous) === current;
}
