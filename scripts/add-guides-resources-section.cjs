#!/usr/bin/env node
/**
 * Script to add "Guides & Resources" sections to service pages
 * Links service pages to relevant pillar and supporting guides for authority routing
 */

const fs = require('fs');
const path = require('path');

const SERVICES_DIR = 'src/pages/services';

// Service to Guide mappings - pillar first, then 3-6 supporting guides
const serviceGuideMap = {
  'BridgingFinance.tsx': {
    pillar: {
      slug: 'bridging-finance-australia-complete-property-guide',
      title: 'Complete Bridging Finance Guide',
      description: 'Our comprehensive guide covers everything from fundamentals to advanced bridging strategies, exit planning, and cost management.'
    },
    supporting: [
      {
        slug: 'best-bridging-loan-lenders-companies-2025',
        title: 'Best Bridging Loan Lenders 2025',
        description: 'Compare rates, LVRs, and approval speeds across Australia\'s top bridging finance providers.'
      },
      {
        slug: 'commercial-bridging-finance-auction-purchases',
        title: 'Commercial Bridging for Auctions',
        description: 'Strategies for unconditional bidding at commercial property auctions.'
      },
      {
        slug: 'bridging-finance-developers-project-funding-solutions',
        title: 'Bridging Finance for Developers',
        description: 'Project funding solutions between development phases and construction draws.'
      },
      {
        slug: 'short-term-property-loans-when-you-need-fast-finance',
        title: 'Short-Term Property Loans',
        description: 'When you need finance in days rather than weeks—fast approval pathways explained.'
      }
    ]
  },
  'CaveatLoans.tsx': {
    pillar: {
      slug: 'caveat-loans-australia-complete-guide',
      title: 'Complete Caveat Loans Guide',
      description: 'Everything you need to know about caveat finance—mechanics, costs, risks, and when it\'s the right choice.'
    },
    supporting: [
      {
        slug: 'caveat-lenders-australia-directory-comparison',
        title: 'Caveat Lenders Directory 2025',
        description: 'Compare Australia\'s caveat finance providers by rates, speed, and LVR.'
      },
      {
        slug: 'caveat-loan-emergency-business-funding',
        title: 'Emergency Business Funding',
        description: 'Caveat loans for tax debt, cash flow crises, and urgent business needs.'
      },
      {
        slug: 'urgent-caveat-loans',
        title: 'Urgent Caveat Loans',
        description: 'Same-day and next-day approval options for time-critical funding.'
      },
      {
        slug: 'caveat-loans-vs-bank-loans-speed-comparison',
        title: 'Caveat vs Bank Loans',
        description: 'Speed and cost comparison to help you choose the right option.'
      }
    ]
  },
  'FirstSecondMortgages.tsx': {
    pillar: {
      slug: 'first-and-second-mortgages-for-business',
      title: 'Definitive Guide to 1st & 2nd Mortgages',
      description: 'Complete guide to first and second mortgage financing for business purposes—structures, costs, and strategic uses.'
    },
    supporting: [
      {
        slug: 'second-mortgage-lenders-australia-directory',
        title: 'Second Mortgage Lenders Directory',
        description: 'Compare Australian second mortgage providers with rates and criteria.'
      },
      {
        slug: 'second-mortgages-for-business-guide',
        title: 'Second Mortgages for Business',
        description: 'Is a second mortgage right for your company? Decision framework included.'
      },
      {
        slug: 'second-mortgage-bad-credit-qualify',
        title: 'Bad Credit Second Mortgages',
        description: 'Qualifying options when credit history may limit your choices.'
      },
      {
        slug: 'second-mortgage-loan-equity-access-strategies',
        title: 'Equity Access Strategies',
        description: 'Advanced strategies for unlocking your property\'s hidden value.'
      }
    ]
  },
  'CommercialPropertyDevelopment.tsx': {
    pillar: {
      slug: 'construction-finance-australia-complete-guide',
      title: 'Complete Construction Finance Guide',
      description: 'Comprehensive guide to construction and development finance—from land acquisition to project completion.'
    },
    supporting: [
      {
        slug: 'building-development-loans-funding-guide',
        title: 'Building Development Loans',
        description: 'Complete funding guide for property developers covering all project phases.'
      },
      {
        slug: 'commercial-property-development-finance',
        title: 'Commercial Development Finance',
        description: 'Specialist funding for commercial and mixed-use development projects.'
      },
      {
        slug: 'commercial-land-loans-financing-property-development',
        title: 'Commercial Land Loans',
        description: 'Financing land acquisition ahead of development commencement.'
      },
      {
        slug: 'mezzanine-finance-australia-complete-guide',
        title: 'Mezzanine Finance Guide',
        description: 'Gap funding for larger developments when senior debt isn\'t enough.'
      }
    ]
  },
  'AssetBackedLending.tsx': {
    pillar: {
      slug: 'asset-backed-lending-and-asset-finance',
      title: 'Complete Asset Finance Guide',
      description: 'Comprehensive guide to asset-backed lending—using equipment, vehicles, and property as security for business funding.'
    },
    supporting: [
      {
        slug: 'equipment-finance-and-leasing-australia',
        title: 'Equipment Finance & Leasing',
        description: 'Financing business equipment, vehicles, and machinery purchases.'
      },
      {
        slug: 'first-and-second-mortgages-for-business',
        title: 'First & Second Mortgages',
        description: 'Property-secured business funding through first and second mortgages.'
      },
      {
        slug: 'caveat-loans-australia-complete-guide',
        title: 'Caveat Loans Guide',
        description: 'Fast property-secured finance using caveat arrangements.'
      }
    ]
  },
  'AssetFinance.tsx': {
    pillar: {
      slug: 'asset-backed-lending-and-asset-finance',
      title: 'Complete Asset Finance Guide',
      description: 'Everything you need to know about asset-backed lending for business equipment, vehicles, and machinery.'
    },
    supporting: [
      {
        slug: 'equipment-finance-and-leasing-australia',
        title: 'Equipment Finance & Leasing',
        description: 'Detailed guide to chattel mortgages, leases, and novated leases.'
      },
      {
        slug: 'working-capital-loans-for-smes',
        title: 'Working Capital Loans',
        description: 'Funding options to maintain cash flow while acquiring assets.'
      },
      {
        slug: 'business-debt-consolidation-australia',
        title: 'Business Debt Consolidation',
        description: 'Restructuring multiple equipment facilities into one manageable loan.'
      }
    ]
  },
  'EquipmentFinance.tsx': {
    pillar: {
      slug: 'asset-backed-lending-and-asset-finance',
      title: 'Complete Asset Finance Guide',
      description: 'Comprehensive guide covering all forms of asset-backed business lending including equipment finance.'
    },
    supporting: [
      {
        slug: 'equipment-finance-and-leasing-australia',
        title: 'Equipment Finance & Leasing',
        description: 'In-depth guide to financing equipment, vehicles, and machinery.'
      },
      {
        slug: 'working-capital-loans-for-smes',
        title: 'Working Capital Loans',
        description: 'Maintain operational cash flow while funding equipment purchases.'
      },
      {
        slug: 'business-acquisition-finance-australia',
        title: 'Business Acquisition Finance',
        description: 'Financing equipment as part of buying an existing business.'
      }
    ]
  },
  'PrivateLending.tsx': {
    pillar: {
      slug: 'what-is-private-lending-australia',
      title: 'What is Private Lending?',
      description: 'Complete guide to private lending in Australia—how it works, costs, risks, and when it\'s the right choice.'
    },
    supporting: [
      {
        slug: 'finding-best-private-lenders-for-your-business',
        title: 'Finding the Best Private Lenders',
        description: 'How to evaluate and select private lenders for your business needs.'
      },
      {
        slug: 'finding-comparing-private-lenders-loans-2025-guide',
        title: 'Comparing Private Lenders 2025',
        description: 'Current market comparison of private lending rates and terms.'
      },
      {
        slug: 'private-lenders-small-business-fast-approval-guide',
        title: 'Private Lenders for Small Business',
        description: 'Fast approval options for SMEs needing quick funding decisions.'
      },
      {
        slug: 'private-commercial-real-estate-lenders-cre-directory',
        title: 'Private CRE Lenders Directory',
        description: 'Specialist lenders for commercial real estate outside bank criteria.'
      }
    ]
  },
  'WorkingCapital.tsx': {
    pillar: {
      slug: 'working-capital-loans-for-smes',
      title: 'Working Capital Loans Guide',
      description: 'Complete guide to working capital finance for SMEs—options, costs, and how to choose the right facility.'
    },
    supporting: [
      {
        slug: 'invoice-finance-australia-complete-guide',
        title: 'Invoice Finance Guide',
        description: 'Unlock cash tied up in unpaid invoices through factoring and discounting.'
      },
      {
        slug: 'debtor-finance-supply-chain-finance-australia',
        title: 'Debtor & Supply Chain Finance',
        description: 'Comprehensive receivables and supply chain funding solutions.'
      },
      {
        slug: 'business-debt-consolidation-australia',
        title: 'Business Debt Consolidation',
        description: 'Restructure multiple debts into manageable facilities.'
      }
    ]
  },
  'TradeFinance.tsx': {
    pillar: {
      slug: 'working-capital-loans-for-smes',
      title: 'Working Capital Loans Guide',
      description: 'Comprehensive working capital guide covering trade finance as part of overall business funding strategy.'
    },
    supporting: [
      {
        slug: 'trade-finance-in-australia-how-it-helps-businesses-manage-imports',
        title: 'Trade Finance Guide',
        description: 'Managing imports, exports, and international trade with trade finance facilities.'
      },
      {
        slug: 'invoice-finance-australia-complete-guide',
        title: 'Invoice Finance Guide',
        description: 'Fund export receivables and import stock through invoice finance.'
      },
      {
        slug: 'debtor-finance-supply-chain-finance-australia',
        title: 'Debtor & Supply Chain Finance',
        description: 'Supply chain funding to manage international supplier payments.'
      }
    ]
  },
  'DebtConsolidation.tsx': {
    pillar: {
      slug: 'working-capital-loans-for-smes',
      title: 'Working Capital Loans Guide',
      description: 'Understanding working capital finance including debt restructuring and consolidation strategies.'
    },
    supporting: [
      {
        slug: 'business-debt-consolidation-australia',
        title: 'Business Debt Consolidation',
        description: 'Detailed guide to restructuring multiple debts into single manageable facilities.'
      },
      {
        slug: 'commercial-property-refinancing-solutions',
        title: 'Commercial Refinancing Solutions',
        description: 'Restructuring property debt as part of overall consolidation.'
      },
      {
        slug: 'first-and-second-mortgages-for-business',
        title: 'First & Second Mortgages',
        description: 'Using property equity to consolidate business debts.'
      }
    ]
  },
  'RefinancingSolutions.tsx': {
    pillar: {
      slug: 'working-capital-loans-for-smes',
      title: 'Working Capital Loans Guide',
      description: 'Comprehensive guide to business funding including refinancing strategies and debt restructuring.'
    },
    supporting: [
      {
        slug: 'commercial-property-refinancing-solutions',
        title: 'Commercial Refinancing Solutions',
        description: 'Restructuring existing commercial property debt for better terms.'
      },
      {
        slug: 'business-debt-consolidation-australia',
        title: 'Business Debt Consolidation',
        description: 'Consolidating multiple facilities into single manageable loans.'
      },
      {
        slug: 'second-mortgage-lenders-australia-directory',
        title: 'Second Mortgage Lenders',
        description: 'Refinancing options through second mortgage providers.'
      }
    ]
  },
  'BusinessAcquisition.tsx': {
    pillar: {
      slug: 'working-capital-loans-for-smes',
      title: 'Working Capital Loans Guide',
      description: 'Business funding guide covering acquisition finance as part of growth strategies.'
    },
    supporting: [
      {
        slug: 'business-acquisition-finance-australia',
        title: 'Business Acquisition Finance',
        description: 'Complete guide to funding business purchases and acquisitions.'
      },
      {
        slug: 'second-mortgage-partnership-buyout-financing-transitions',
        title: 'Partnership Buyout Financing',
        description: 'Using property equity to fund partner buyouts and ownership transitions.'
      },
      {
        slug: 'first-and-second-mortgages-for-business',
        title: 'First & Second Mortgages',
        description: 'Property-secured funding for business acquisition.'
      },
      {
        slug: 'mezzanine-finance-australia-complete-guide',
        title: 'Mezzanine Finance Guide',
        description: 'Gap funding for larger acquisition transactions.'
      }
    ]
  },
  'SMSFLending.tsx': {
    pillar: {
      slug: 'construction-finance-australia-complete-guide',
      title: 'Complete Construction Finance Guide',
      description: 'Comprehensive property finance guide including SMSF lending for commercial property.'
    },
    supporting: [
      {
        slug: 'smsf-loans-for-commercial-property',
        title: 'SMSF Commercial Property Loans',
        description: 'Complete guide to buying commercial property through your SMSF.'
      },
      {
        slug: 'commercial-property-loans-australia-complete-guide',
        title: 'Commercial Property Loans Guide',
        description: 'Understanding commercial lending options for SMSF purchases.'
      },
      {
        slug: 'commercial-property-loan-eligibility-what-you-need-to-qualify',
        title: 'Loan Eligibility Guide',
        description: 'Qualification requirements for SMSF commercial property lending.'
      }
    ]
  }
};

// Generate the Guides & Resources section JSX
function generateGuidesSection(mapping) {
  const pillarCard = `
              {/* Pillar Guide - Featured */}
              <div className="md:col-span-2 lg:col-span-3">
                <a 
                  href="/resources/guides/${mapping.pillar.slug}"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">${mapping.pillar.title}</h3>
                      <p className="text-muted-foreground mb-3">${mapping.pillar.description}</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>`;

  const supportingCards = mapping.supporting.map(guide => `
              <a 
                href="/resources/guides/${guide.slug}"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">${guide.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">${guide.description}</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>`).join('');

  return `
            {/* Guides & Resources Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Guides & Resources
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore our in-depth guides to learn more about this financing option before you apply.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
${pillarCard}
${supportingCards}
              </div>
            </section>
`;
}

// Process each service file
function processServiceFile(filename) {
  const mapping = serviceGuideMap[filename];
  if (!mapping) {
    console.log(`  ⚠️ No mapping for ${filename}`);
    return false;
  }

  const filePath = path.join(SERVICES_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has Guides & Resources section
  if (content.includes('Guides & Resources')) {
    console.log(`  ⏭️ Already has Guides & Resources: ${filename}`);
    return false;
  }

  // Find the FAQSection line and insert before it
  const faqMatch = content.match(/(\s*){\/\* FAQs \*\/}\s*\n\s*<FAQSection/);
  if (!faqMatch) {
    // Try alternate pattern
    const altMatch = content.match(/(\s*)<FAQSection faqs={faqs}/);
    if (!altMatch) {
      console.log(`  ⚠️ Could not find FAQSection in ${filename}`);
      return false;
    }
    
    const guidesSection = generateGuidesSection(mapping);
    const insertPosition = altMatch.index;
    content = content.slice(0, insertPosition) + guidesSection + '\n' + content.slice(insertPosition);
  } else {
    const guidesSection = generateGuidesSection(mapping);
    const insertPosition = faqMatch.index;
    content = content.slice(0, insertPosition) + '\n' + guidesSection + content.slice(insertPosition);
  }

  // Ensure BookOpen is imported (check if it's in the import line)
  if (!content.includes('BookOpen')) {
    // Add BookOpen to lucide-react import
    content = content.replace(
      /import \{([^}]+)\} from "lucide-react";/,
      (match, imports) => {
        const importList = imports.split(',').map(i => i.trim());
        if (!importList.includes('BookOpen')) {
          importList.push('BookOpen');
        }
        return `import { ${importList.join(', ')} } from "lucide-react";`;
      }
    );
  }

  fs.writeFileSync(filePath, content);
  return true;
}

// Main execution
console.log('=== Adding Guides & Resources Sections to Service Pages ===\n');

let successCount = 0;
const results = {};

for (const filename of Object.keys(serviceGuideMap)) {
  console.log(`Processing ${filename}...`);
  if (processServiceFile(filename)) {
    console.log(`  ✓ Added Guides & Resources section`);
    successCount++;
    results[filename] = serviceGuideMap[filename];
  }
}

console.log('\n============================================');
console.log(`✅ COMPLETE: ${successCount} service pages updated`);
console.log('============================================\n');

// Generate authority routing report
console.log('=== AUTHORITY ROUTING REPORT ===\n');

// Collect inbound links per pillar
const pillarInboundLinks = {};

for (const [service, mapping] of Object.entries(serviceGuideMap)) {
  const pillarSlug = mapping.pillar.slug;
  if (!pillarInboundLinks[pillarSlug]) {
    pillarInboundLinks[pillarSlug] = {
      title: mapping.pillar.title,
      services: []
    };
  }
  pillarInboundLinks[pillarSlug].services.push(service.replace('.tsx', ''));
}

console.log('Pillar Guide Inbound Links from Service Pages:\n');
for (const [slug, data] of Object.entries(pillarInboundLinks)) {
  console.log(`📚 ${data.title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Service pages linking to it (${data.services.length}):`);
  for (const service of data.services) {
    console.log(`     • /services/${service.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')}`);
  }
  console.log('');
}

// Summary
console.log('--- SUMMARY ---');
console.log(`Total pillar guides receiving service page authority: ${Object.keys(pillarInboundLinks).length}`);
let totalLinks = 0;
for (const data of Object.values(pillarInboundLinks)) {
  totalLinks += data.services.length;
}
console.log(`Total service→pillar links created: ${totalLinks}`);

// Count supporting guide links
let supportingLinks = 0;
for (const mapping of Object.values(serviceGuideMap)) {
  supportingLinks += mapping.supporting.length;
}
console.log(`Total service→supporting guide links created: ${supportingLinks}`);
console.log(`Total new internal links: ${totalLinks + supportingLinks}`);
