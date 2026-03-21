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
      localIntro="Commercial first and second mortgages for Perth borrowers who need structures that make sense in a market shaped by industrial demand, trade exposure, and a lender preference for assets with clear local depth rather than generic east-coast assumptions."
      localFocus="In Perth that may include a first mortgage on a Welshpool or Canning Vale industrial site, a second mortgage behind existing debt on a Subiaco or West Perth commercial asset, refinance work for businesses tied to freight and logistics corridors, or funding that supports operational expansion without forcing a full capital-stack reset."
      marketOverview="Perth can be extremely workable for commercial mortgage borrowers when the asset is well located and the purpose of funds is coherent. Industrial and trade-linked property often receives stronger attention than more specialised stock, while office and mixed-use assets may need tighter explanation around leasing, vacancy, and marketability. Borrowers with WA exposure also tend to be assessed through the lens of cash-flow resilience, sector concentration, and how practical the property would be to refinance or sell if conditions changed."
      timingPressures="Timing pressure in Perth often shows up around debt maturities, equipment or stock expansion tied to property security, acquisitions in established industrial precincts, or situations where a borrower wants to move before a mainstream lender completes a slower review. Second mortgages are also used when there is usable equity but a worthwhile first mortgage should be left in place."
      suburbCoverage={[
        {
          title: 'CBD and inner-metro commercial precincts',
          text: 'Perth CBD, West Perth, East Perth, and Subiaco can produce office and mixed-use mortgage files where lease profile, vacancy settings, and valuation evidence are central to lender confidence.'
        },
        {
          title: 'Industrial and freight-linked corridors',
          text: 'Welshpool, Kewdale, Canning Vale, Bibra Lake, and Fremantle-linked precincts often support warehouse and industrial mortgage scenarios tied to logistics, light manufacturing, trade businesses, and transport operators.'
        },
        {
          title: 'Northern and southern operating hubs',
          text: 'Osborne Park, Wangara, Malaga, Cockburn, and other operating corridors can generate owner-occupied and investor demand where business-purpose property finance supports expansion, consolidation, or refinancing.'
        }
      ]}
      localUseCases={[
        {
          title: 'Owner-occupied industrial purchases',
          text: 'Perth businesses often use first mortgages to secure warehouses, yards, and operating premises so they can control their footprint rather than remain exposed to shifting lease conditions.'
        },
        {
          title: 'Second mortgages for growth liquidity',
          text: 'A second mortgage may suit borrowers who have equity in a Perth commercial asset and need additional capital for stock, equipment, acquisition support, or operational upgrades without disturbing senior debt.'
        },
        {
          title: 'Refinance stabilisation for maturing debt',
          text: 'When an existing lender reaches maturity or changes appetite, a new first mortgage can reset the structure around the property and the borrower’s current commercial plan.'
        },
        {
          title: 'Investor repositioning through lease-up or capex',
          text: 'Investors may also use first or second mortgage debt to complete improvements, hold an asset through leasing works, or support a later refinance once the property story strengthens.'
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
          question: 'Do Perth lenders usually prefer industrial property over specialised commercial assets?',
          answer: 'Often yes. Standard industrial property in established operating corridors can be easier for lenders to assess than niche or thinly traded assets, although each deal still depends on leverage, cash flow, and property quality.'
        },
        {
          question: 'When might a Perth borrower use a second mortgage instead of refinancing?',
          answer: 'Usually when the first mortgage remains commercially worthwhile and the borrower only needs additional capital for a defined business purpose such as acquisition support, stock, equipment, or expansion.'
        },
        {
          question: 'What documentation tends to matter most in WA mortgage files?',
          answer: 'Clear financials, a sensible explanation of sector exposure, property details, valuation support, and a practical exit or refinance path usually matter most, especially where the borrower operates in trade-linked industries.'
        },
        {
          question: 'Can Perth refinancing work while capex or site upgrades are still underway?',
          answer: 'Potentially, yes. Some lenders will consider that scenario if the underlying asset remains strong and the borrower can clearly show what the works are achieving and how the position improves afterward.'
        },
        {
          question: 'Is this page financial advice?',
          answer: 'No. It is informational only and should not be treated as personal or financial advice.'
        }
      ]}
    />
  );
}
