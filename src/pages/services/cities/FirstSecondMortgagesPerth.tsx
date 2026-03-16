import React from 'react';
import FirstSecondMortgagesCityPage from '@/components/FirstSecondMortgagesCityPage';

export default function FirstSecondMortgagesPerth() {
  return (
    <FirstSecondMortgagesCityPage
      city="Perth"
      state="WA"
      canonical="/services/first-second-mortgages/cities/perth"
      title="1st & 2nd Mortgages Perth | Commercial Property Finance | Emet Capital"
      description="Commercial first and second mortgages in Perth for acquisitions, refinance pressure, equity release, and business-purpose property transactions across metro and WA-linked industrial corridors."
      localIntro="Commercial first and second mortgages for Perth borrowers who need a property-backed structure that respects local market cycles, asset quality, and transaction speed."
      localFocus="In Perth that may include industrial owner-occupied property near freight and trade corridors, investor deals tied to metro commercial assets, second mortgage funding against established equity, and refinance work where a resource-linked or industrial borrower needs flexibility rather than a rigid bank template."
      marketOverview="Perth can reward lenders who understand the asset and punish those who rely on generic assumptions. Industrial, logistics, trade-linked, and mixed commercial assets can all work well, but underwriting usually turns on lease profile, market depth, and how exposed the borrower is to timing or sector concentration."
      timingPressures="Timing pressure in Perth often appears around business expansion, debt maturities, and acquisition windows where the property is solid but the borrower cannot wait for a long mainstream process. Second mortgage scenarios also show up when equity exists and the first mortgage is worth preserving."
      suburbCoverage={[
        {
          title: 'CBD and inner-metro commercial precincts',
          text: 'Perth CBD, West Perth, East Perth, and Subiaco can produce office and mixed-use mortgage files where lease quality, vacancy profile, and valuation evidence matter heavily.'
        },
        {
          title: 'Industrial and port-linked corridors',
          text: 'Welshpool, Kewdale, Canning Vale, Bibra Lake, and Fremantle-linked precincts often support warehouse and industrial mortgage scenarios tied to transport, trade, and light manufacturing.'
        },
        {
          title: 'Northern and southern growth markets',
          text: 'Osborne Park, Wangara, Malaga, and Cockburn corridors can generate owner-occupied and investor demand where business-purpose property finance helps expansion and consolidation.'
        }
      ]}
      localUseCases={[
        {
          title: 'Owner-occupied industrial purchases',
          text: 'Perth businesses often use first mortgages to secure warehouses, yards, and operating premises so they can control their footprint rather than rely on leased stock.'
        },
        {
          title: 'Second mortgages for business liquidity',
          text: 'A second mortgage may suit borrowers who have property equity but need additional capital for stock, acquisition support, or operational upgrades without disturbing senior debt.'
        },
        {
          title: 'Refinance stabilisation',
          text: 'When an existing lender reaches maturity or changes appetite, a new first mortgage can reset the structure around the property and the borrower’s current commercial plan.'
        },
        {
          title: 'Investor repositioning',
          text: 'Investors may also use first or second mortgage debt to complete improvements, hold an asset through lease-up, or support a later refinance once the property story strengthens.'
        }
      ]}
      scenarios={[
        {
          title: 'Welshpool Industrial Refinance',
          scenario: 'A logistics business owned a Welshpool warehouse valued at $4.4 million with debt nearing maturity and capex upgrades underway. The business needed a lender that would look through the temporary disruption and focus on the longer-term operational position.',
          solution: 'A first mortgage refinance of $2.75 million gave the borrower time to complete upgrades and stabilise the site. The lender focused on asset quality, tenant-equivalent usability, and the broader business rationale rather than treating the temporary capex period as a fatal flaw.',
          outcomes: [
            { label: 'Security value', value: '$4.4M warehouse' },
            { label: 'Refinance facility', value: '$2.75M' },
            { label: 'Indicative leverage', value: '63% LVR' },
            { label: 'Planned next step', value: 'Review post-upgrade' }
          ]
        },
        {
          title: 'Subiaco Equity Release for Acquisition',
          scenario: 'An investor held a Subiaco commercial asset valued at $2.95 million with an existing first mortgage balance of $1.45 million and wanted capital for a business acquisition opportunity with a tight timetable.',
          solution: 'A second mortgage of $550,000 was structured behind the senior debt so the borrower could act quickly without refinancing the full property stack. The file relied on moderate leverage, clear property value, and a defined business-purpose use of funds.',
          outcomes: [
            { label: 'Security value', value: '$2.95M commercial asset' },
            { label: 'Existing first mortgage', value: '$1.45M' },
            { label: 'Second mortgage', value: '$550K' },
            { label: 'Combined leverage', value: '68% LVR' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: '1st & 2nd Mortgages service page',
          href: '/services/first-second-mortgages',
          description: 'National overview of commercial mortgage structures and lender-fit considerations.'
        },
        {
          title: 'How to Find Second Mortgage Brokers in Australia',
          href: '/resources/guides/how-to-find-second-mortgage-brokers-australia',
          description: 'Useful if your Perth scenario is specifically about layered debt and lender access.'
        },
        {
          title: 'Commercial Property Refinancing Solutions',
          href: '/resources/guides/commercial-property-refinancing-solutions',
          description: 'Helpful for borrowers dealing with maturing facilities or lender transition pressure.'
        }
      ]}
      faqs={[
        {
          question: 'Can Perth industrial property support a first mortgage?',
          answer: 'Yes, if the warehouse or industrial asset is marketable, appropriately valued, and the borrower’s business purpose fits lender policy.'
        },
        {
          question: 'When might a second mortgage be used in Perth?',
          answer: 'Common examples include business expansion, acquisition support, or liquidity against property equity where refinancing the whole first mortgage is not the preferred move.'
        },
        {
          question: 'Do lenders treat Perth differently from east-coast markets?',
          answer: 'They often look more closely at asset liquidity, local demand, and sector exposure, especially for specialised or trade-linked property.'
        },
        {
          question: 'Can a first mortgage help with an expiring private facility?',
          answer: 'Potentially, yes. A refinance can stabilise the position if the property and broader structure support a new lender taking over.'
        },
        {
          question: 'Is this page financial advice?',
          answer: 'No. It is informational only and should not be treated as personal or financial advice.'
        }
      ]}
    />
  );
}
