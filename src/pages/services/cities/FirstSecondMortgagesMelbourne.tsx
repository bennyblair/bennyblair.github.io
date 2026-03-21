import React from 'react';
import FirstSecondMortgagesCityPage from '@/components/FirstSecondMortgagesCityPage';

export default function FirstSecondMortgagesMelbourne() {
  return (
    <FirstSecondMortgagesCityPage
      city="Melbourne"
      state="VIC"
      canonical="/services/first-second-mortgages/cities/melbourne"
      title="1st & 2nd Mortgages Melbourne | Commercial Property Finance | Emet Capital"
      description="Commercial first and second mortgages in Melbourne for acquisitions, refinance timing gaps, equity release, and business-purpose property deals where structure and execution both matter."
      localIntro="Commercial first and second mortgages for Melbourne borrowers navigating a broad but fragmented market where asset type, precinct selection, and lender confidence can vary sharply between the CBD, city fringe, and industrial growth belts."
      localFocus="In Melbourne that can include owner-occupied industrial purchases in Dandenong South or Truganina, refinancing city-fringe mixed-use assets before maturity, adding a second mortgage behind senior debt on a Bayside or inner-east property, or funding a repositioning strategy where leasing and capex are still in motion."
      marketOverview="Melbourne offers one of the country’s widest mixes of office, industrial, retail, and mixed-use commercial security. That creates options, but also more filtering by lenders. CBD office exposure may be assessed differently from southeast industrial stock, and inner-suburban mixed-use assets may need stronger tenancy explanation than a plain warehouse. For mortgage borrowers, the advantage is breadth; the challenge is matching the deal to a lender whose appetite actually fits the asset and the borrower’s timing."
      timingPressures="Timing pressure in Melbourne often shows up when an expiring facility collides with leasing works, a business wants to buy premises before another party secures the site, or an investor needs interim capital while stabilising tenancy. Second mortgage requests also appear when a borrower has equity but does not want to unwind a senior facility that still prices well."
      suburbCoverage={[
        {
          title: 'CBD, city fringe, and inner north',
          text: 'Melbourne CBD, Southbank, Richmond, Collingwood, Brunswick, and Carlton often produce office, showroom, and mixed-use mortgage files where tenant retention, strata detail, and broader office sentiment can shape lender appetite.'
        },
        {
          title: 'Bayside and the inner east',
          text: 'Brighton, Hawthorn, Kew, Camberwell, and South Yarra can generate larger-value first and second mortgage scenarios supported by strong equity positions, but lenders still expect a disciplined commercial reason for the debt rather than generic liquidity.'
        },
        {
          title: 'West and southeast industrial belts',
          text: 'Dandenong South, Keysborough, Laverton North, Truganina, Sunshine West, and Epping remain core warehouse and trade corridors where owner-occupied demand, logistics use, and refinance timing frequently drive transactions.'
        }
      ]}
      localUseCases={[
        {
          title: 'Industrial owner-occupied purchases',
          text: 'Melbourne businesses regularly use first mortgages to acquire warehouses, factories, and trade premises so they can lock in operating control instead of relying on a tight leasing market.'
        },
        {
          title: 'Second mortgages for capex and expansion',
          text: 'A second mortgage may fit a borrower who wants to fund equipment, a production line, tenancy works, or acquisition support while preserving a first mortgage that already suits the broader debt stack.'
        },
        {
          title: 'Refinance management during asset transition',
          text: 'Some Melbourne files need a new first mortgage because the property is still stabilising, lease renewals are underway, or the outgoing lender wants repayment before the borrower’s next phase is complete.'
        },
        {
          title: 'Investor repositioning across mixed-use stock',
          text: 'Investors may also use first or second mortgage capital while re-tenanting a city-fringe asset, improving presentation, or holding through a short repositioning window before a later refinance or sale.'
        }
      ]}
      scenarios={[
        {
          title: 'Dandenong South Warehouse Expansion',
          scenario: 'A manufacturing business owned a Dandenong South warehouse valued at $5.25 million with a senior mortgage balance of $2.9 million. The business needed capital for a new production line and warehouse upgrades but did not want to refinance the whole facility during a strong trading period.',
          solution: 'A second mortgage of $900,000 was structured behind the existing senior loan. The file worked because the warehouse security was well understood, leverage remained controlled, and the use of funds was clearly tied to business growth rather than a vague equity release request.',
          outcomes: [
            { label: 'Security value', value: '$5.25M warehouse' },
            { label: 'Existing first mortgage', value: '$2.9M' },
            { label: 'Second mortgage', value: '$900K' },
            { label: 'Combined leverage', value: '72% LVR' }
          ]
        },
        {
          title: 'Richmond Mixed-Use Refinance',
          scenario: 'An investor held a Richmond mixed-use asset valued at $3.6 million with an expiring facility and lease renewals underway. A standard bank refinance was possible, but not before the existing lender required discharge.',
          solution: 'A first mortgage refinance of $2.2 million stabilised the position and gave the borrower time to complete the leasing strategy before revisiting the long-term debt market. The deal was underwritten around asset quality, tenant mix, and a realistic next-step plan.',
          outcomes: [
            { label: 'Security value', value: '$3.6M mixed-use asset' },
            { label: 'Refinance facility', value: '$2.2M' },
            { label: 'Indicative leverage', value: '61% LVR' },
            { label: 'Expected review', value: 'After lease-up program' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: '1st & 2nd Mortgages service page',
          href: '/services/first-second-mortgages',
          description: 'National overview of first mortgage and second mortgage options for business borrowers.'
        },
        {
          title: 'Second Mortgages for Business Guide',
          href: '/resources/guides/second-mortgages-for-business-guide',
          description: 'Helpful if you are assessing whether layered debt is cleaner than a full refinance.'
        },
        {
          title: 'Commercial Property Loans Australia',
          href: '/resources/guides/commercial-property-loans-australia-complete-guide',
          description: 'Broader guide for borrowers comparing mainstream and specialist property finance structures.'
        }
      ]}
      faqs={[
        {
          question: 'Do Melbourne lenders look differently at office and industrial assets?',
          answer: 'Yes. Industrial property in established corridors may attract a different level of comfort from lenders than CBD or city-fringe office stock, especially where vacancy, strata complexity, or shorter lease terms affect refinanceability.'
        },
        {
          question: 'Can a second mortgage help fund capex on a Melbourne warehouse?',
          answer: 'Potentially, yes, where the property has sufficient equity, the first mortgage remains workable, and the capital is clearly tied to a commercial improvement or business growth plan.'
        },
        {
          question: 'Why do some Melbourne borrowers refinance before a loan actually matures?',
          answer: 'Because waiting can reduce options. If lease renewals, valuation issues, or lender appetite changes are on the horizon, moving earlier can preserve more flexibility and reduce settlement pressure.'
        },
        {
          question: 'Are mixed-use assets harder to finance in Melbourne?',
          answer: 'They can be. Much depends on tenancy mix, marketability, title position, and whether the lender sees a stable refinance path after the current facility term.'
        },
        {
          question: 'Is this informational content the same as financial advice?',
          answer: 'No. It is general information only and should not be treated as personal or financial advice.'
        }
      ]}
    />
  );
}
