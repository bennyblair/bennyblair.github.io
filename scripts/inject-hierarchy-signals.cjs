#!/usr/bin/env node
/**
 * Script to inject hierarchy and intent signals into guide markdown files
 * Based on pillar/supporting structure defined in src/pages/Guides.tsx
 */

const fs = require('fs');
const path = require('path');

const GUIDES_DIR = 'src/content/guides';

// Guide cluster definitions with pillar and supporting relationships
const clusters = {
  bridging: {
    title: "Bridging Finance",
    pillar: "bridging-finance-australia-complete-property-guide",
    pillarTitle: "Complete Bridging Finance Guide",
    supporting: [
      {
        slug: "best-bridging-loan-lenders-companies-2025",
        descriptor: "Compare rates, LVRs and approval speeds across Australia's top providers",
        who: "Borrowers who have decided bridging finance is right for them and need to compare specific lenders",
        what: "Comparing rates, LVRs, approval speeds, and serviceability requirements across providers",
        when: "When you have a clear bridging scenario and need the best lender match",
        whenNot: "If you're still deciding whether bridging finance suits your situation"
      },
      {
        slug: "bridging-finance-developers-project-funding-solutions",
        descriptor: "Project funding between development phases and construction draws",
        who: "Property developers needing interim funding between project phases",
        what: "Bridging gaps between land settlement, DA approval, and construction finance",
        when: "When development timelines create funding gaps that banks can't accommodate",
        whenNot: "For standard property purchases without development components"
      },
      {
        slug: "commercial-bridging-finance-auction-purchases",
        descriptor: "Unconditional bidding strategies for commercial property auctions",
        who: "Business buyers targeting commercial properties at auction",
        what: "Unconditional bidding, pre-approval strategies, and rapid settlement for commercial auctions",
        when: "When purchasing commercial property at auction requiring unconditional finance",
        whenNot: "For residential auctions or off-market commercial purchases with flexible settlement"
      },
      {
        slug: "commercial-bridging-loans-for-property-auctions-expert-guide",
        descriptor: "Expert tactics for auction day financing",
        who: "Experienced investors seeking expert-level auction finance strategies",
        what: "Advanced due diligence, deposit structuring, and competitive bidding tactics",
        when: "When bidding on high-value commercial properties in competitive auctions",
        whenNot: "For first-time auction buyers or residential property auctions"
      },
      {
        slug: "commercial-bridging-loans-property-auctions-expert-guide",
        descriptor: "Due diligence and settlement timelines for auction purchases",
        who: "Property investors preparing for auction day financing",
        what: "Settlement timelines, title searches, and lender requirements for auction purchases",
        when: "When you need detailed preparation checklists for auction bidding",
        whenNot: "If you're comparing bridging to other finance types"
      },
      {
        slug: "short-term-property-loans-when-you-need-fast-finance",
        descriptor: "When you need finance in days, not weeks",
        who: "Business owners needing property-secured finance within days",
        what: "Fastest approval pathways, documentation shortcuts, and urgent settlement options",
        when: "When timing is critical and you need funding in 7-14 days or less",
        whenNot: "When you have 4+ weeks and can access lower-cost traditional lending"
      }
    ]
  },
  caveat: {
    title: "Caveat Loans",
    pillar: "caveat-loans-australia-complete-guide",
    pillarTitle: "Complete Caveat Loans Guide",
    supporting: [
      {
        slug: "caveat-lenders-australia-directory-comparison",
        descriptor: "Compare Australia's caveat finance providers by rates, speed, and LVR",
        who: "Borrowers ready to compare specific caveat lenders",
        what: "Rates, LVRs, approval speeds, and terms across major caveat providers",
        when: "When you've decided caveat finance suits your needs and want to compare options",
        whenNot: "If you're still evaluating whether caveat loans are right for your situation"
      },
      {
        slug: "caveat-loan-emergency-business-funding",
        descriptor: "Caveat loans for tax debt, cash flow crises, and urgent needs",
        who: "Business owners facing urgent cash flow crises or ATO debt",
        what: "Emergency funding for tax debt, payroll shortfalls, and supplier payments",
        when: "When you need funds within 24-72 hours to address a business emergency",
        whenNot: "For planned capital expenditure or growth funding with flexible timelines"
      },
      {
        slug: "caveat-loans-for-property-settlement-bridge-your-purchase",
        descriptor: "Bridging property purchases when timing is critical",
        who: "Property buyers with imminent settlement deadlines",
        what: "Using caveat finance to bridge settlement gaps when other funding falls through",
        when: "When facing settlement default and needing emergency bridging within days",
        whenNot: "When you have 2+ weeks and can arrange standard bridging finance"
      },
      {
        slug: "caveat-loans-vs-bank-loans-speed-comparison",
        descriptor: "Speed and cost comparison to help you choose",
        who: "Business owners weighing caveat finance against bank alternatives",
        what: "Direct comparison of speed, cost, documentation, and approval requirements",
        when: "When you have time to consider options and want to make an informed choice",
        whenNot: "In genuine emergencies where speed is the only priority"
      },
      {
        slug: "find-caveat-loan-brokers-australia",
        descriptor: "How to find and evaluate caveat loan specialists",
        who: "Borrowers seeking specialist brokers to navigate the caveat market",
        what: "Finding, evaluating, and working with caveat loan brokers effectively",
        when: "When you want expert guidance on structuring and placing caveat finance",
        whenNot: "If you prefer dealing directly with lenders"
      },
      {
        slug: "quick-caveat-loans-48-hour-settlement-possible",
        descriptor: "Is 48-hour settlement really achievable?",
        who: "Borrowers needing the fastest possible caveat settlement",
        what: "Realistic timelines, documentation requirements, and what enables 48-hour funding",
        when: "When you need to understand what's achievable for ultra-urgent funding",
        whenNot: "For standard caveat applications with 5-7 day timelines"
      },
      {
        slug: "urgent-caveat-loans",
        descriptor: "Same-day and next-day approval options",
        who: "Business owners needing same-day or next-day approval",
        what: "24-48 hour approval processes, required documentation, and urgent settlement pathways",
        when: "When a business emergency requires immediate funding action",
        whenNot: "For planned funding needs where you can shop for better rates"
      }
    ]
  },
  mortgages: {
    title: "First & Second Mortgages",
    pillar: "first-and-second-mortgages-for-business",
    pillarTitle: "Definitive Guide to 1st & 2nd Mortgages for Business",
    supporting: [
      {
        slug: "first-mortgage-loans-primary-property-finance",
        descriptor: "Understanding primary property finance for business",
        who: "Business owners seeking primary property-secured lending",
        what: "First mortgage structures, LVRs, and qualification requirements for business purposes",
        when: "When purchasing property or refinancing with no existing mortgage debt",
        whenNot: "When there's an existing first mortgage you need to work around"
      },
      {
        slug: "second-mortgage-for-business",
        descriptor: "Mechanics of business funding through second mortgages",
        who: "Business owners with existing mortgages seeking additional funding",
        what: "How second mortgages work mechanically, including subordination and security",
        when: "When you need to understand second mortgage fundamentals before applying",
        whenNot: "If you're ready to compare specific lenders"
      },
      {
        slug: "second-mortgages-for-business-guide",
        descriptor: "Is a second mortgage right for your company?",
        who: "Company directors evaluating second mortgages for business funding",
        what: "Suitability analysis, pros/cons, and decision framework for businesses",
        when: "When deciding if a second mortgage is the right funding choice for your company",
        whenNot: "If you've already decided and need lender comparisons"
      },
      {
        slug: "2nd-loan-mortgage-business-capital",
        descriptor: "Accessing business capital through property equity",
        who: "Business owners needing to access property equity for capital",
        what: "Strategies for releasing business capital through 2nd mortgages",
        when: "When you have substantial property equity and need growth capital",
        whenNot: "For property purchases rather than equity release"
      },
      {
        slug: "second-mortgage-bad-credit-qualify",
        descriptor: "Qualifying options when credit is impaired",
        who: "Borrowers with credit issues seeking second mortgage options",
        what: "Qualification pathways, specialist lenders, and realistic expectations with bad credit",
        when: "When credit history may disqualify you from mainstream lenders",
        whenNot: "If you have clean credit and can access standard products"
      },
      {
        slug: "second-mortgage-lenders-australia-directory",
        descriptor: "Directory of Australian second mortgage providers",
        who: "Borrowers ready to compare specific second mortgage providers",
        what: "Directory of Australian second mortgage lenders with rates and criteria",
        when: "When you've decided on a second mortgage and need to find the right lender",
        whenNot: "If you're still evaluating whether a second mortgage suits your needs"
      },
      {
        slug: "second-mortgage-loan-equity-access-strategies",
        descriptor: "Unlocking your property's hidden value",
        who: "Property owners wanting to maximise equity extraction",
        what: "Advanced strategies for unlocking hidden property value",
        when: "When you want to optimise the amount you can access against your property",
        whenNot: "For basic second mortgage applications"
      },
      {
        slug: "second-mortgage-partnership-buyout-financing-transitions",
        descriptor: "Financing business ownership transitions",
        who: "Business partners planning ownership changes",
        what: "Using second mortgages to fund partner buyouts and business transitions",
        when: "When buying out a partner or restructuring business ownership",
        whenNot: "For general working capital or non-transition funding needs"
      },
      {
        slug: "how-to-find-second-mortgage-brokers-australia",
        descriptor: "Selecting specialist second mortgage brokers",
        who: "Borrowers seeking specialist broker assistance",
        what: "Finding, evaluating, and working with second mortgage specialists",
        when: "When you want expert guidance navigating the second mortgage market",
        whenNot: "If you prefer dealing directly with lenders"
      },
      {
        slug: "when-second-mortgages-make-financial-sense-smes",
        descriptor: "Financial analysis for SME decision-making",
        who: "SME owners analysing the financial viability of second mortgages",
        what: "Financial analysis framework for deciding if second mortgages are worthwhile",
        when: "When you need to justify second mortgage costs against business returns",
        whenNot: "For urgent funding where detailed analysis isn't possible"
      },
      {
        slug: "understanding-secondary-mortgage-markets-australia",
        descriptor: "How the wholesale market affects your options",
        who: "Sophisticated borrowers interested in wholesale mortgage markets",
        what: "How secondary markets work and affect retail second mortgage availability",
        when: "When you want deeper understanding of market dynamics affecting your options",
        whenNot: "For straightforward second mortgage applications"
      }
    ]
  },
  construction: {
    title: "Construction & Development Finance",
    pillar: "construction-finance-australia-complete-guide",
    pillarTitle: "Complete Construction Finance Guide",
    supporting: [
      {
        slug: "building-development-loans-funding-guide",
        descriptor: "Complete funding guide for developers",
        who: "Developers seeking comprehensive funding guidance",
        what: "End-to-end development loan structures and draw-down schedules",
        when: "When planning a development project from acquisition to completion",
        whenNot: "For simple property purchases without development components"
      },
      {
        slug: "commercial-property-development-finance",
        descriptor: "Comprehensive commercial development funding",
        who: "Developers undertaking commercial projects",
        what: "Commercial-specific development funding structures and requirements",
        when: "When developing office, retail, or mixed-use commercial projects",
        whenNot: "For residential-only developments"
      },
      {
        slug: "commercial-land-loans-financing-property-development",
        descriptor: "Financing land acquisition for development",
        who: "Developers acquiring sites for future development",
        what: "Land acquisition finance before DA or construction",
        when: "When purchasing development sites ahead of project commencement",
        whenNot: "For developed property purchases"
      },
      {
        slug: "commercial-property-loans-australia-complete-guide",
        descriptor: "Complete guide to commercial property lending",
        who: "Business owners buying commercial property",
        what: "Comprehensive overview of commercial property lending options",
        when: "When you need full understanding of the commercial property finance landscape",
        whenNot: "If you've already decided on a specific loan type"
      },
      {
        slug: "commercial-property-loans-for-startups-first-time-buyers",
        descriptor: "First-time commercial buyers guide",
        who: "First-time commercial property buyers",
        what: "Entry strategies, deposit requirements, and beginner pathways",
        when: "When purchasing your first commercial property",
        whenNot: "For experienced investors with established portfolios"
      },
      {
        slug: "commercial-property-loans-for-immigrants-expats-australia",
        descriptor: "Options for non-residents",
        who: "Non-residents and expats seeking Australian commercial property",
        what: "Visa requirements, foreign ownership rules, and specialist lenders",
        when: "When you're a non-citizen purchasing Australian commercial property",
        whenNot: "For Australian citizens and permanent residents"
      },
      {
        slug: "commercial-property-loan-eligibility-what-you-need-to-qualify",
        descriptor: "Qualification requirements explained",
        who: "Borrowers assessing their qualification chances",
        what: "Eligibility criteria, documentation requirements, and pre-approval processes",
        when: "When preparing a commercial loan application",
        whenNot: "If you're comparing final loan offers"
      },
      {
        slug: "commercial-property-loan-retail-spaces-guide",
        descriptor: "Financing retail and shop fronts",
        who: "Investors or owner-occupiers acquiring retail property",
        what: "Retail-specific lending considerations and valuation factors",
        when: "When purchasing shops, shopping centres, or retail strips",
        whenNot: "For office or industrial property purchases"
      },
      {
        slug: "commercial-property-finance-rates-2025-comparison",
        descriptor: "Current rate comparison",
        who: "Borrowers comparing current market rates",
        what: "2025 rate comparison across lender types and loan products",
        when: "When rate shopping or benchmarking your current loan",
        whenNot: "For understanding loan structures rather than rates"
      },
      {
        slug: "commercial-property-refinancing-solutions",
        descriptor: "Restructuring existing development debt",
        who: "Property owners with existing commercial debt",
        what: "Refinancing strategies, break costs, and restructuring options",
        when: "When seeking better rates or restructuring existing loans",
        whenNot: "For new property acquisitions"
      },
      {
        slug: "commercial-mortgages-vs-residential-key-differences-explained",
        descriptor: "Key differences explained",
        who: "Borrowers new to commercial lending",
        what: "Key differences between residential and commercial loan requirements",
        when: "When transitioning from residential to commercial property investment",
        whenNot: "For experienced commercial investors"
      },
      {
        slug: "how-to-buy-commercial-property-step-by-step-guide",
        descriptor: "Step-by-step acquisition guide",
        who: "First-time commercial property buyers",
        what: "Complete acquisition process from search to settlement",
        when: "When planning your first commercial property purchase",
        whenNot: "For investors adding to existing portfolios"
      },
      {
        slug: "owner-occupier-commercial-loans-buy-your-business-premises",
        descriptor: "Buying your business premises",
        who: "Business owners buying their operating premises",
        what: "Owner-occupier lending options and self-use requirements",
        when: "When purchasing property your business will occupy",
        whenNot: "For investment property without self-occupation"
      },
      {
        slug: "office-property-loans-financing-commercial-workspace",
        descriptor: "Commercial office financing",
        who: "Investors or occupiers acquiring office space",
        what: "Office-specific lending criteria and valuation approaches",
        when: "When financing office buildings, suites, or co-working spaces",
        whenNot: "For retail or industrial property"
      },
      {
        slug: "industrial-property-finance-warehouses-manufacturing",
        descriptor: "Warehouses and manufacturing facilities",
        who: "Industrial property investors and owner-occupiers",
        what: "Warehouse and manufacturing facility financing specifics",
        when: "When acquiring industrial, logistics, or manufacturing facilities",
        whenNot: "For office or retail property"
      },
      {
        slug: "hospitality-property-finance-restaurants-hotels-venues",
        descriptor: "Restaurants, hotels, and venues",
        who: "Hospitality business owners and investors",
        what: "Hotel, restaurant, and venue financing specialist requirements",
        when: "When acquiring or developing hospitality properties",
        whenNot: "For standard commercial property without hospitality use"
      },
      {
        slug: "mezzanine-finance-australia-complete-guide",
        descriptor: "Gap funding for larger developments",
        who: "Developers needing gap funding for larger projects",
        what: "Mezzanine structures, pricing, and appropriate project scales",
        when: "When senior debt alone doesn't cover your development funding gap",
        whenNot: "For smaller projects that don't require layered funding"
      },
      {
        slug: "smsf-loans-for-commercial-property",
        descriptor: "Buying commercial property through super",
        who: "SMSF trustees considering commercial property",
        what: "Limited recourse borrowing arrangements for super funds",
        when: "When purchasing commercial property through your SMSF",
        whenNot: "For personal or company purchases outside super"
      }
    ]
  },
  asset: {
    title: "Asset Finance",
    pillar: "asset-backed-lending-and-asset-finance",
    pillarTitle: "Complete Asset Finance Guide",
    supporting: [
      {
        slug: "equipment-finance-and-leasing-australia",
        descriptor: "Financing business equipment, vehicles, and machinery purchases",
        who: "Business owners acquiring equipment, vehicles, or machinery",
        what: "Equipment loans, chattel mortgages, leasing structures, and novated leases",
        when: "When financing specific equipment purchases or vehicle acquisitions",
        whenNot: "For property-based lending or general working capital needs"
      }
    ]
  },
  workingCapital: {
    title: "Working Capital & Refinancing",
    pillar: "working-capital-loans-for-smes",
    pillarTitle: "Working Capital Loans Guide for SMEs",
    supporting: [
      {
        slug: "invoice-finance-australia-complete-guide",
        descriptor: "Unlock cash tied up in unpaid invoices",
        who: "Businesses with outstanding invoices seeking cash flow",
        what: "Invoice factoring, discounting, and receivables financing options",
        when: "When you have quality debtors and need to accelerate cash collection",
        whenNot: "For businesses with few invoices or poor debtor quality"
      },
      {
        slug: "debtor-finance-supply-chain-finance-australia",
        descriptor: "Comprehensive receivables and supply chain funding",
        who: "Businesses managing complex receivables and supply chains",
        what: "Comprehensive debtor finance and supply chain funding structures",
        when: "When managing supplier payments, inventory, and debtor collections together",
        whenNot: "For simple invoice discounting needs"
      },
      {
        slug: "trade-finance-in-australia-how-it-helps-businesses-manage-imports",
        descriptor: "Managing imports, exports, and international trade",
        who: "Importers and exporters managing international trade",
        what: "Letters of credit, trade guarantees, and import/export financing",
        when: "When conducting international trade requiring payment security",
        whenNot: "For domestic-only business operations"
      },
      {
        slug: "business-debt-consolidation-australia",
        descriptor: "Restructuring multiple debts into manageable facilities",
        who: "Business owners with multiple debts seeking simplification",
        what: "Consolidating business debts into single, manageable facilities",
        when: "When juggling multiple loans and seeking lower overall repayments",
        whenNot: "When individual debts have better terms than consolidation options"
      },
      {
        slug: "business-acquisition-finance-australia",
        descriptor: "Funding business purchases and acquisitions",
        who: "Entrepreneurs acquiring existing businesses",
        what: "Funding strategies for buying businesses, goodwill, and trading stock",
        when: "When purchasing an existing business as a going concern",
        whenNot: "For starting new businesses from scratch"
      }
    ]
  },
  privateLending: {
    title: "Private Lending",
    pillar: "what-is-private-lending-australia",
    pillarTitle: "What is Private Lending? Guide",
    supporting: [
      {
        slug: "finding-best-private-lenders-for-your-business",
        descriptor: "How to evaluate and select private lenders",
        who: "Business owners ready to engage private lenders",
        what: "Evaluation criteria, red flags, and selection strategies",
        when: "When you've decided private lending suits your needs and want to find the right provider",
        whenNot: "If you're still evaluating whether private lending is appropriate"
      },
      {
        slug: "finding-comparing-private-lenders-loans-2025-guide",
        descriptor: "Current market comparison and rates",
        who: "Borrowers comparing current private lending options",
        what: "2025 market overview, rates, and lender comparisons",
        when: "When actively comparing private lender offers",
        whenNot: "For understanding private lending fundamentals"
      },
      {
        slug: "private-lenders-for-mortgages",
        descriptor: "When banks say no to mortgage applications",
        who: "Borrowers declined by banks seeking mortgage alternatives",
        what: "Private mortgage options when traditional lenders say no",
        when: "When bank mortgage applications have been declined or are unsuitable",
        whenNot: "For borrowers who qualify for mainstream bank mortgages"
      },
      {
        slug: "private-lenders-small-business-fast-approval-guide",
        descriptor: "Fast approval options for SMEs",
        who: "Small business owners needing quick funding decisions",
        what: "Fast-track approval processes and documentation shortcuts",
        when: "When approval speed is as important as the funding itself",
        whenNot: "When you have time to pursue lower-cost bank options"
      },
      {
        slug: "private-lenders-for-land-loans-alternative-financing",
        descriptor: "Alternative financing for land purchases",
        who: "Land buyers unable to access bank land finance",
        what: "Private financing options for raw land and development sites",
        when: "When purchasing land that banks won't finance due to zoning or location",
        whenNot: "For developed property with standard bank eligibility"
      },
      {
        slug: "private-commercial-real-estate-lenders-cre-directory",
        descriptor: "Commercial real estate specialist lenders",
        who: "Commercial property investors seeking specialist lenders",
        what: "Directory of private lenders specialising in CRE",
        when: "When financing commercial property outside bank criteria",
        whenNot: "For standard commercial property eligible for bank funding"
      },
      {
        slug: "private-real-estate-investment-lenders-guide",
        descriptor: "Lenders for property investors",
        who: "Property investors building portfolios with private finance",
        what: "Lenders specialising in investor scenarios and portfolio lending",
        when: "When bank serviceability limits prevent further borrowing",
        whenNot: "For owner-occupier purchases with bank eligibility"
      },
      {
        slug: "short-term-private-lenders-fast-business-finance-solutions",
        descriptor: "Fast business finance when time is critical",
        who: "Businesses needing funds within days",
        what: "Ultra-fast private lending options for urgent business needs",
        when: "When timing is critical and you need funding in 3-14 days",
        whenNot: "When you have 4+ weeks and can pursue lower-cost options"
      }
    ]
  }
};

// Generate pillar block content
function generatePillarBlock(cluster) {
  const supportingLinks = cluster.supporting
    .map(s => `- **[${getGuideTitle(s.slug)}](/resources/guides/${s.slug})** — ${s.descriptor}`)
    .join('\n');

  return `---

> **📚 Complete Guide**: This is Emet Capital's comprehensive guide to ${cluster.title.toLowerCase()} in Australia. Whether you're exploring this financing option for the first time or comparing solutions for a specific transaction, this guide covers everything from fundamentals to advanced strategies.

### Related In-Depth Guides

Explore our specialist ${cluster.title.toLowerCase()} guides for specific scenarios:

${supportingLinks}

---`;
}

// Generate supporting block content
function generateSupportingBlock(cluster, guide) {
  return `---

> **📖 Series Context**: This guide is part of our **${cluster.title}** series. For a complete overview, see our [${cluster.pillarTitle}](/resources/guides/${cluster.pillar}).

### At a Glance

| | |
|---|---|
| **Who this guide is for** | ${guide.who} |
| **What it addresses** | ${guide.what} |
| **When this is appropriate** | ${guide.when} |
| **When it's NOT appropriate** | ${guide.whenNot} |

---`;
}

// Get guide title from slug (simplified)
function getGuideTitle(slug) {
  const titles = {
    "best-bridging-loan-lenders-companies-2025": "Best Bridging Loan Lenders 2025",
    "bridging-finance-developers-project-funding-solutions": "Bridging Finance for Developers",
    "commercial-bridging-finance-auction-purchases": "Commercial Bridging for Auctions",
    "commercial-bridging-loans-for-property-auctions-expert-guide": "Property Auction Bridging Loans",
    "commercial-bridging-loans-property-auctions-expert-guide": "Auction Finance Expert Guide",
    "short-term-property-loans-when-you-need-fast-finance": "Short-Term Property Loans",
    "caveat-lenders-australia-directory-comparison": "Caveat Lenders Directory 2025",
    "caveat-loan-emergency-business-funding": "Emergency Business Funding",
    "caveat-loans-for-property-settlement-bridge-your-purchase": "Caveat Loans for Settlement",
    "caveat-loans-vs-bank-loans-speed-comparison": "Caveat vs Bank Loans",
    "find-caveat-loan-brokers-australia": "Finding Caveat Brokers",
    "quick-caveat-loans-48-hour-settlement-possible": "Quick Caveat Loans",
    "urgent-caveat-loans": "Urgent Caveat Loans",
    "first-mortgage-loans-primary-property-finance": "First Mortgage Fundamentals",
    "second-mortgage-for-business": "How Second Mortgages Work",
    "second-mortgages-for-business-guide": "Second Mortgages for Business",
    "2nd-loan-mortgage-business-capital": "2nd Mortgages for Capital",
    "second-mortgage-bad-credit-qualify": "Bad Credit Second Mortgages",
    "second-mortgage-lenders-australia-directory": "Second Mortgage Lenders",
    "second-mortgage-loan-equity-access-strategies": "Equity Access Strategies",
    "second-mortgage-partnership-buyout-financing-transitions": "Partnership Buyouts",
    "how-to-find-second-mortgage-brokers-australia": "Finding Mortgage Brokers",
    "when-second-mortgages-make-financial-sense-smes": "When Second Mortgages Make Sense",
    "understanding-secondary-mortgage-markets-australia": "Secondary Mortgage Markets",
    "building-development-loans-funding-guide": "Building Development Loans",
    "commercial-property-development-finance": "Commercial Development Finance",
    "commercial-land-loans-financing-property-development": "Commercial Land Loans",
    "commercial-property-loans-australia-complete-guide": "Commercial Property Loans",
    "commercial-property-loans-for-startups-first-time-buyers": "Loans for Startups",
    "commercial-property-loans-for-immigrants-expats-australia": "Loans for Immigrants/Expats",
    "commercial-property-loan-eligibility-what-you-need-to-qualify": "Loan Eligibility Guide",
    "commercial-property-loan-retail-spaces-guide": "Retail Property Loans",
    "commercial-property-finance-rates-2025-comparison": "Finance Rates 2025",
    "commercial-property-refinancing-solutions": "Refinancing Solutions",
    "commercial-mortgages-vs-residential-key-differences-explained": "Commercial vs Residential",
    "how-to-buy-commercial-property-step-by-step-guide": "How to Buy Commercial Property",
    "owner-occupier-commercial-loans-buy-your-business-premises": "Owner-Occupier Loans",
    "office-property-loans-financing-commercial-workspace": "Office Property Loans",
    "industrial-property-finance-warehouses-manufacturing": "Industrial Finance",
    "hospitality-property-finance-restaurants-hotels-venues": "Hospitality Finance",
    "mezzanine-finance-australia-complete-guide": "Mezzanine Finance",
    "smsf-loans-for-commercial-property": "SMSF Commercial Loans",
    "equipment-finance-and-leasing-australia": "Equipment Finance & Leasing",
    "invoice-finance-australia-complete-guide": "Invoice Finance Guide",
    "debtor-finance-supply-chain-finance-australia": "Debtor & Supply Chain Finance",
    "trade-finance-in-australia-how-it-helps-businesses-manage-imports": "Trade Finance Guide",
    "business-debt-consolidation-australia": "Business Debt Consolidation",
    "business-acquisition-finance-australia": "Business Acquisition Finance",
    "finding-best-private-lenders-for-your-business": "Finding the Best Private Lenders",
    "finding-comparing-private-lenders-loans-2025-guide": "Comparing Private Lenders 2025",
    "private-lenders-for-mortgages": "Private Mortgage Lenders",
    "private-lenders-small-business-fast-approval-guide": "Private Lenders for Small Business",
    "private-lenders-for-land-loans-alternative-financing": "Private Land Loans",
    "private-commercial-real-estate-lenders-cre-directory": "Private CRE Lenders Directory",
    "private-real-estate-investment-lenders-guide": "Private Investment Lenders",
    "short-term-private-lenders-fast-business-finance-solutions": "Short-Term Private Finance"
  };
  return titles[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Insert block after frontmatter and intro paragraphs, before first ## heading
function insertBlock(filePath, block) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find the position of the first ## heading
  const h2Match = content.match(/\n## /);
  if (!h2Match) {
    console.log(`  ⚠️ No ## heading found in ${path.basename(filePath)}`);
    return false;
  }
  
  const insertPosition = h2Match.index;
  
  // Check if block already exists
  if (content.includes('📚 Complete Guide') || content.includes('📖 Series Context')) {
    console.log(`  ⏭️ Already has hierarchy block: ${path.basename(filePath)}`);
    return false;
  }
  
  const newContent = content.slice(0, insertPosition) + '\n' + block + '\n' + content.slice(insertPosition);
  fs.writeFileSync(filePath, newContent);
  return true;
}

// Main execution
console.log('=== Injecting Hierarchy Signals into Guide Files ===\n');

let pillarCount = 0;
let supportingCount = 0;

for (const [key, cluster] of Object.entries(clusters)) {
  console.log(`Processing ${cluster.title} cluster...`);
  
  // Process pillar
  const pillarPath = path.join(GUIDES_DIR, `${cluster.pillar}.md`);
  if (fs.existsSync(pillarPath)) {
    const pillarBlock = generatePillarBlock(cluster);
    if (insertBlock(pillarPath, pillarBlock)) {
      console.log(`  ✓ ${cluster.pillar} (PILLAR)`);
      pillarCount++;
    }
  } else {
    console.log(`  ⚠️ Pillar not found: ${cluster.pillar}`);
  }
  
  // Process supporting guides
  for (const guide of cluster.supporting) {
    const guidePath = path.join(GUIDES_DIR, `${guide.slug}.md`);
    if (fs.existsSync(guidePath)) {
      const supportingBlock = generateSupportingBlock(cluster, guide);
      if (insertBlock(guidePath, supportingBlock)) {
        console.log(`  ✓ ${guide.slug}`);
        supportingCount++;
      }
    } else {
      console.log(`  ⚠️ Supporting guide not found: ${guide.slug}`);
    }
  }
  
  console.log('');
}

console.log('============================================');
console.log('✅ COMPLETE: All hierarchy signals injected');
console.log('============================================');
console.log('');
console.log('Summary:');
console.log(`  • ${pillarCount} pillar guides updated with declaration + supporting links`);
console.log(`  • ${supportingCount} supporting guides updated with series context + At a Glance blocks`);
console.log('  • All pillar↔supporting relationships now bidirectionally linked');
console.log('');
console.log("Run 'git diff --stat' to verify changes");
