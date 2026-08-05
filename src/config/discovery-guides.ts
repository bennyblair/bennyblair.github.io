export const discoveryGuidesByService = {
  "first-second-mortgages": [
    {
      title: "Second mortgage for a business partner buyout",
      href: "/resources/guides/second-mortgage-for-a-business-partner-buyout-in-australia",
      description: "Assess equity, consent, valuation and exit issues when one owner buys out another.",
    },
    {
      title: "Using a second mortgage to buy investment property",
      href: "/resources/guides/can-i-use-a-second-mortgage-to-buy-investment-property",
      description: "Understand combined leverage, purpose and repayment questions before comparing structures.",
    },
  ],
  "bridging-finance": [
    {
      title: "Bridging loan exit strategy: broker take",
      href: "/resources/guides/bridging-loan-exit-strategy-broker-take",
      description: "A broker-led checklist for avoiding weak exits, timing assumptions and incomplete files.",
    },
  ],
  "business-acquisition": [
    {
      title: "Franchise acquisition finance",
      href: "/resources/guides/franchise-acquisition-finance-in-australia-buying-an-existing-franchise-business",
      description: "Compare transaction, security and cash-flow evidence when buying an existing franchise.",
    },
    {
      title: "Pharmacy acquisition finance",
      href: "/resources/guides/pharmacy-acquisition-finance-in-australia-buying-or-expanding-a-pharmacy",
      description: "Review goodwill, stock, premises and serviceability issues for a pharmacy purchase or expansion.",
    },
  ],
  "business-finance": [
    {
      title: "EOFY working capital loans before 30 June",
      href: "/resources/guides/eofy-working-capital-loans-before-30-june",
      description: "Separate tax-sensitive timing from the finance decision before acquiring assets or funding obligations.",
    },
  ],
  "caveat-loans": [
    {
      title: "Caveat loans online: enquiry versus approval",
      href: "/resources/guides/caveat-loans-online-in-australia-fast-enquiry-vs-real-approval",
      description: "What an online enquiry can establish, and what a lender still needs to assess.",
    },
  ],
  "commercial-property-finance": [
    {
      title: "Commercial property loan serviceability",
      href: "/resources/guides/commercial-property-loan-serviceability-how-much-can-you-borrow",
      description: "See how income, expenses, debt and lender policy shape borrowing capacity.",
    },
    {
      title: "How to buy commercial property",
      href: "/resources/guides/how-to-buy-commercial-property-step-by-step-guide",
      description: "A step-by-step path from strategy and due diligence through finance and settlement.",
    },
    {
      title: "Owner-occupier commercial loans",
      href: "/resources/guides/owner-occupier-commercial-loans-buy-your-business-premises",
      description: "Evaluate deposit, serviceability and ownership structure when buying business premises.",
    },
  ],
  "private-lending": [
    {
      title: "Private debt in Australia",
      href: "/resources/guides/private-debt-australia",
      description: "A broker explainer covering participants, structures, risks and suitable use cases.",
    },
  ],
  "trade-finance": [
    {
      title: "Purchase order finance versus trade finance",
      href: "/resources/guides/purchase-order-finance-vs-trade-finance-in-australia",
      description: "Compare what each facility funds and where it sits in the order-to-cash cycle.",
    },
    {
      title: "Supplier deposit finance for large orders",
      href: "/resources/guides/supplier-deposit-finance-for-large-orders-australia",
      description: "Plan the deposit, shipping and repayment pathway for a large supplier order.",
    },
  ],
  "working-capital": [
    {
      title: "Debtor concentration working capital finance",
      href: "/resources/guides/debtor-concentration-working-capital-finance-australia",
      description: "Assess receivables, continuity and fallback evidence when cash flow depends on a major debtor.",
    },
    {
      title: "ATO tax-debt disclosure and credit reporting",
      href: "/resources/guides/ato-tax-debt-disclosure-credit-reporting-finance-australia",
      description: "Understand the disclosure framework and the evidence lenders may review.",
    },
  ],
  "commercial-property-development": [
    {
      title: "Construction cost-overrun finance",
      href: "/resources/guides/construction-cost-overrun-finance-property-developers-australia",
      description: "Diagnose the funding gap, remaining works and completion strategy before seeking capital.",
    },
  ],
  "refinancing-solutions": [
    {
      title: "Commercial loan maturity refinance",
      href: "/resources/guides/commercial-loan-maturity-refinance-australia",
      description: "Prepare for an approaching maturity with a realistic valuation, serviceability and exit plan.",
    },
    {
      title: "Commercial property finance after a bank decline",
      href: "/resources/guides/commercial-property-loan-after-bank-decline-non-bank-options-australia",
      description: "Identify the cause of decline before comparing a non-bank or private-credit pathway.",
    },
  ],
  "equipment-finance": [
    {
      title: "Used equipment finance",
      href: "/resources/guides/used-equipment-finance-second-hand-machinery-private-sales-australia",
      description: "Review valuation, condition, seller and security requirements for second-hand assets.",
    },
  ],
} as const;

export type DiscoveryService = keyof typeof discoveryGuidesByService;

export const discoveryGuideUrls = Object.values(discoveryGuidesByService)
  .flat()
  .map((guide) => guide.href);
