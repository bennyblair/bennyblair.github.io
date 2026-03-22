import React from 'react';
import PrivateLendingCityPage from '@/components/PrivateLendingCityPage';

export default function PrivateLendingPerth() {
  return (
    <PrivateLendingCityPage
      city="Perth"
      state="WA"
      canonical="/services/private-lending/cities/perth"
      title="Private Lending Perth | Commercial Private Credit | Emet Capital"
      description="Private lending in Perth for commercial acquisitions, refinance deadlines, industrial property transactions, and business-purpose real estate funding where asset quality is strong but mainstream fit or timing is limited."
      localIntro="Private lending for Perth borrowers who need commercial property-backed capital when speed, structure, or lender appetite matters more than fitting a standard bank template."
      localFocus="Perth private lending often centres on industrial and logistics assets, owner-occupied trade property, mixed-use holdings, and business-backed transactions where the borrower needs flexibility while a sale, refinance, or operating milestone catches up."
      marketOverview="Perth's commercial market can be highly opportunity-driven, especially across industrial, logistics, and trade-linked property. That creates scenarios where timing matters and lender appetite varies more by asset class and local market depth than many borrowers expect."
      timingPressures="Private lending in Perth commonly appears when an acquisition window is short, an existing facility is maturing before the replacement loan is ready, or a business owner needs temporary liquidity against commercial property during a restructuring event."
      suburbCoverage={[
        {
          title: 'CBD and inner commercial precincts',
          text: 'Perth CBD, West Perth, East Perth, Subiaco, Osborne Park, and Leederville regularly produce office, mixed-use, and business-property lending scenarios.'
        },
        {
          title: 'Southern and port-linked industrial markets',
          text: 'Welshpool, Kewdale, Canning Vale, Bibra Lake, and Fremantle often involve warehouses, trade property, and logistics-linked assets where execution speed matters.'
        },
        {
          title: 'Northern growth and owner-occupier corridors',
          text: 'Joondalup, Wangara, Malaga, and nearby precincts can produce owner-occupied and industrial transactions where flexible structuring is useful.'
        }
      ]}
      localUseCases={[
        {
          title: 'Industrial acquisition funding',
          text: 'Private capital may suit Perth industrial or trade-property acquisitions where a buyer needs to settle ahead of a slower mainstream approval process.'
        },
        {
          title: 'Refinance transition on commercial assets',
          text: 'A short-term private structure can help where an existing loan matures before a longer-term replacement facility is ready.'
        },
        {
          title: 'Liquidity for business restructuring',
          text: 'Some Perth borrowers use property-backed private lending to support shareholder changes, expansion events, or urgent working-capital requirements.'
        },
        {
          title: 'Mixed-use and non-standard commercial files',
          text: 'Where a property or borrower profile sits outside straightforward bank policy, private lending may provide a workable interim path.'
        }
      ]}
      scenarios={[
        {
          title: 'Welshpool warehouse refinance deadline',
          scenario: 'A transport-linked business owned a Welshpool warehouse valued at $3.9 million and needed to repay its current lender before the replacement refinance could settle.',
          solution: 'A private first mortgage of $2.25 million created enough runway for the borrower to complete valuation, legal, and takeout documentation.',
          outcomes: [
            { label: 'Security value', value: '$3.9M warehouse' },
            { label: 'Private facility', value: '$2.25M' },
            { label: 'Indicative leverage', value: '58% LVR' },
            { label: 'Expected exit', value: 'Refinance within 3 to 5 months' }
          ]
        },
        {
          title: 'West Perth office acquisition',
          scenario: 'An investor secured a $2.45 million West Perth office asset on a compressed settlement timetable while mainstream finance was still moving through due diligence.',
          solution: 'A $1.46 million private facility preserved the purchase and allowed the borrower to refinance later into a longer-term office loan.',
          outcomes: [
            { label: 'Purchase price', value: '$2.45M office asset' },
            { label: 'Private facility', value: '$1.46M' },
            { label: 'Pressure point', value: 'Compressed settlement' },
            { label: 'Expected exit', value: 'Takeout refinance' }
          ]
        },
        {
          title: 'Fremantle mixed-use restructure',
          scenario: 'A business owner needed temporary liquidity against a Fremantle mixed-use property while completing a corporate restructure and debt cleanup.',
          solution: 'A private property-backed facility of $1.7 million gave the borrower enough time to complete the restructure before moving to a cleaner long-term facility.',
          outcomes: [
            { label: 'Security value', value: '$2.95M mixed-use property' },
            { label: 'Private facility', value: '$1.7M' },
            { label: 'Commercial purpose', value: 'Corporate restructure' },
            { label: 'Planned term', value: 'Up to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Private Lending service page',
          href: '/services/private-lending',
          description: 'National private lending overview for commercial borrowers.'
        },
        {
          title: 'What Is Private Lending in Australia?',
          href: '/resources/guides/what-is-private-lending-australia',
          description: 'Foundational guide to private credit structures and borrower fit.'
        },
        {
          title: 'Commercial Property Loans in Australia',
          href: '/resources/guides/commercial-property-loans-australia-complete-guide',
          description: 'Useful if the Perth transaction may still suit a longer-term commercial mortgage.'
        }
      ]}
      faqs={[
        {
          question: 'When might a Perth borrower use private lending?',
          answer: 'Often when there is a genuine timing or structuring issue such as an industrial acquisition, refinance maturity, mixed-use asset, or short-term business liquidity need supported by property.'
        },
        {
          question: 'Can private lending suit Perth industrial property?',
          answer: 'Potentially, yes. Warehouses, trade premises, and logistics assets can suit private lending where the security is strong and the repayment path is clear.'
        },
        {
          question: 'Is private lending only for borrowers who cannot get bank finance?',
          answer: 'No. Some borrowers use it because they need a faster or more bespoke structure, not because the asset would never suit a bank later.'
        },
        {
          question: 'What is the main underwriting focus for Perth private lenders?',
          answer: 'Security quality, leverage, legal clarity, and exit strategy usually sit at the centre of the credit view.'
        },
        {
          question: 'Can private lending be used before a later refinance?',
          answer: 'Potentially, yes. That is common when the lender and borrower both understand the private debt is solving a timing gap rather than replacing long-term strategy.'
        }
      ]}
    />
  );
}
