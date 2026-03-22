import React from 'react';
import PrivateLendingCityPage from '@/components/PrivateLendingCityPage';

export default function PrivateLendingGoldCoast() {
  return (
    <PrivateLendingCityPage
      city="Gold Coast"
      state="QLD"
      canonical="/services/private-lending/cities/gold-coast"
      title="Private Lending Gold Coast | Commercial Private Credit | Emet Capital"
      description="Private lending on the Gold Coast for commercial acquisitions, mixed-use property deals, refinance pressure, and business-purpose real estate transactions where timing and asset-specific lender appetite are critical."
      localIntro="Private lending for Gold Coast borrowers who need commercial property-backed capital when the transaction is real but mainstream credit timing or policy fit is too restrictive."
      localFocus="Gold Coast private lending often involves mixed-use assets, hospitality-linked commercial property, trade and industrial premises, and time-sensitive investment or business-property transactions where the lender needs to understand both local market depth and exit realism."
      marketOverview="The Gold Coast market can move quickly across mixed-use, commercial, and investor-owned assets, particularly where local demand, redevelopment potential, or business use creates competition. That makes private lending relevant when a transaction needs flexibility and speed rather than a one-size-fits-all credit box."
      timingPressures="Private lending on the Gold Coast commonly shows up when an acquisition deadline is short, an existing lender wants repayment before the replacement facility is ready, or a borrower needs temporary liquidity against a commercial property during a restructure or transition."
      suburbCoverage={[
        {
          title: 'Southport, Surfers Paradise, and central mixed-use markets',
          text: 'Southport, Surfers Paradise, Bundall, and nearby precincts can produce mixed-use, office, and commercial investment files where lender appetite varies asset by asset.'
        },
        {
          title: 'Broadbeach, Mermaid, and hospitality-linked zones',
          text: 'Broadbeach, Mermaid Beach, and adjacent commercial zones often involve hospitality-linked or investor-held assets where flexibility around structure matters.'
        },
        {
          title: 'Molendinar, Burleigh, and trade corridors',
          text: 'Molendinar, Burleigh Heads, Arundel, and surrounding trade and industrial precincts regularly generate warehouse and owner-occupied commercial lending scenarios.'
        }
      ]}
      localUseCases={[
        {
          title: 'Short-settlement acquisitions',
          text: 'Private lending may help secure a Gold Coast commercial or mixed-use asset when bank turnaround time does not match the contract window.'
        },
        {
          title: 'Refinance pressure on commercial property',
          text: 'A short-term private loan can reduce pressure where a current lender matures before the next refinance is properly ready.'
        },
        {
          title: 'Mixed-use and hospitality-adjacent assets',
          text: 'Some Gold Coast assets need a lender willing to understand local use and resale depth rather than relying on a narrow policy view.'
        },
        {
          title: 'Property-backed business events',
          text: 'Borrowers may use private debt against commercial property for restructures, acquisitions, partner exits, or other urgent business-purpose needs.'
        }
      ]}
      scenarios={[
        {
          title: 'Southport mixed-use refinance transition',
          scenario: 'An investor owned a Southport mixed-use asset valued at $3.2 million and needed to repay a maturing lender before the replacement refinance had completed tenancy and legal review.',
          solution: 'A private first mortgage of $1.9 million created enough runway for the refinance to complete without forced pressure on the asset.',
          outcomes: [
            { label: 'Security value', value: '$3.2M mixed-use property' },
            { label: 'Private facility', value: '$1.9M' },
            { label: 'Indicative leverage', value: '59% LVR' },
            { label: 'Expected exit', value: 'Refinance within 4 months' }
          ]
        },
        {
          title: 'Burleigh commercial acquisition',
          scenario: 'A business owner exchanged on a $2.3 million Burleigh commercial asset with a settlement date too tight for the preferred mainstream lender to meet.',
          solution: 'A $1.36 million private facility allowed the purchase to settle on time while the longer-term debt solution continued in parallel.',
          outcomes: [
            { label: 'Purchase price', value: '$2.3M commercial asset' },
            { label: 'Private facility', value: '$1.36M' },
            { label: 'Pressure point', value: 'Tight settlement timeline' },
            { label: 'Expected exit', value: 'Takeout refinance' }
          ]
        },
        {
          title: 'Bundall property-backed restructure',
          scenario: 'A borrower needed temporary liquidity against a Bundall office asset while finalising a shareholder restructure and debt realignment.',
          solution: 'A private facility of $1.62 million created the required liquidity and gave the borrower time to move into a cleaner long-term facility afterward.',
          outcomes: [
            { label: 'Security value', value: '$2.85M office asset' },
            { label: 'Private facility', value: '$1.62M' },
            { label: 'Commercial purpose', value: 'Shareholder restructure' },
            { label: 'Planned term', value: 'Up to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Private Lending service page',
          href: '/services/private-lending',
          description: 'National private lending overview for commercial borrowers and investors.'
        },
        {
          title: 'What Is Private Lending in Australia?',
          href: '/resources/guides/what-is-private-lending-australia',
          description: 'Guide to how private credit works and how it differs from standard lending.'
        },
        {
          title: 'Bridging Finance in Australia',
          href: '/resources/guides/bridging-finance-australia-complete-property-guide',
          description: 'Useful when the Gold Coast scenario is mainly a short-term timing issue.'
        }
      ]}
      faqs={[
        {
          question: 'When might private lending be used on the Gold Coast?',
          answer: 'Usually when a borrower has a genuine timing, policy-fit, or structure problem around a commercial or mixed-use property transaction. Common triggers include short settlements, refinance pressure, and urgent business-purpose liquidity needs.'
        },
        {
          question: 'Can private lending work for mixed-use property on the Gold Coast?',
          answer: 'Potentially, yes. Mixed-use assets can suit private credit where the security, local resale depth, leverage, and exit strategy are all strong enough.'
        },
        {
          question: 'Is private lending only for distressed situations?',
          answer: 'No. It is often used by capable borrowers who simply need a faster decision or a lender more comfortable with the exact asset and timeline.'
        },
        {
          question: 'What matters most to a Gold Coast private lender?',
          answer: 'Security quality, leverage, documentation readiness, and a realistic exit usually matter most. Local market understanding also helps where the asset type is less generic.'
        },
        {
          question: 'Can private debt be refinanced later?',
          answer: 'Potentially, yes. Many private lending structures are transitional and are expected to exit through refinance, sale, or another defined commercial event.'
        }
      ]}
    />
  );
}
