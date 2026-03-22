import React from 'react';
import PrivateLendingCityPage from '@/components/PrivateLendingCityPage';

export default function PrivateLendingAdelaide() {
  return (
    <PrivateLendingCityPage
      city="Adelaide"
      state="SA"
      canonical="/services/private-lending/cities/adelaide"
      title="Private Lending Adelaide | Commercial Private Credit | Emet Capital"
      description="Private lending in Adelaide for commercial acquisitions, refinance pressure, owner-occupied business property, and bespoke property-backed funding where lender fit and execution speed can shape the outcome."
      localIntro="Private lending for Adelaide borrowers who need commercial property-backed capital when the file is viable but the timeline or structure does not suit a conventional lender."
      localFocus="Adelaide private lending files often involve owner-occupied commercial assets, warehousing and trade property, mixed-use holdings, and business restructures where a clear exit exists but a standard loan process is not moving fast enough."
      marketOverview="Adelaide's commercial market can reward borrowers who move decisively, particularly in owner-occupied and industrial segments. Private lending becomes relevant where the asset is sound but the transaction needs flexibility, speed, or a more tailored approach to credit."
      timingPressures="In Adelaide, private lending commonly appears when a settlement date is fixed, an existing lender wants repayment before a refinance is complete, or a business owner needs temporary liquidity against commercial property to finish a broader strategic move."
      suburbCoverage={[
        {
          title: 'CBD and inner commercial ring',
          text: 'Adelaide CBD, North Adelaide, Kent Town, Norwood, and Mile End can produce office, mixed-use, and business-premises transactions where execution quality matters.'
        },
        {
          title: 'Western and northern industrial precincts',
          text: 'Thebarton, Wingfield, Regency Park, Gepps Cross, and nearby industrial precincts often generate warehouse and trade-property finance scenarios.'
        },
        {
          title: 'Southern commercial corridors',
          text: 'Edwardstown, Lonsdale, and surrounding areas can involve owner-occupied commercial assets and industrial property where a flexible lender fit is useful.'
        }
      ]}
      localUseCases={[
        {
          title: 'Owner-occupied business property funding',
          text: 'Private lending may help Adelaide business owners secure or refinance premises when timing matters more than a fully standardised process.'
        },
        {
          title: 'Refinance gap solutions',
          text: 'A short-term private structure can buy time when a current lender matures before a replacement facility is fully ready.'
        },
        {
          title: 'Mixed-use and specialist property files',
          text: 'Some assets are commercially workable but sit outside easy bank appetite, especially where tenancy mix or property use adds complexity.'
        },
        {
          title: 'Property-backed liquidity events',
          text: 'Borrowers may use private lending during shareholder exits, restructures, or urgent business events supported by commercial property security.'
        }
      ]}
      scenarios={[
        {
          title: 'Wingfield warehouse refinance gap',
          scenario: 'A logistics operator owned a Wingfield warehouse valued at $3.3 million and needed to repay a maturing facility before its incoming refinance could finish due diligence.',
          solution: 'A private first mortgage of $1.95 million stabilised the position and gave the borrower time to complete the longer-term refinance properly.',
          outcomes: [
            { label: 'Security value', value: '$3.3M warehouse' },
            { label: 'Private facility', value: '$1.95M' },
            { label: 'Indicative leverage', value: '59% LVR' },
            { label: 'Expected exit', value: 'Refinance within 4 months' }
          ]
        },
        {
          title: 'Mile End owner-occupied acquisition',
          scenario: 'A business owner secured a $2.05 million Mile End commercial property but faced a tighter settlement date than their preferred lender could accommodate.',
          solution: 'A $1.22 million private facility allowed settlement first and refinance later once the long-term lender was ready to proceed.',
          outcomes: [
            { label: 'Purchase price', value: '$2.05M commercial premises' },
            { label: 'Private facility', value: '$1.22M' },
            { label: 'Pressure point', value: 'Short settlement' },
            { label: 'Expected exit', value: 'Takeout refinance' }
          ]
        },
        {
          title: 'Norwood mixed-use restructure',
          scenario: 'A borrower needed temporary property-backed liquidity against a Norwood mixed-use asset while finalising a partner separation and broader debt restructure.',
          solution: 'A private facility of $1.48 million created time to complete the restructure before moving into a cleaner long-term debt arrangement.',
          outcomes: [
            { label: 'Security value', value: '$2.6M mixed-use asset' },
            { label: 'Private facility', value: '$1.48M' },
            { label: 'Commercial purpose', value: 'Partner separation' },
            { label: 'Planned term', value: '3 to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Private Lending service page',
          href: '/services/private-lending',
          description: 'National overview of private lending for commercial borrowers.'
        },
        {
          title: 'What Is Private Lending in Australia?',
          href: '/resources/guides/what-is-private-lending-australia',
          description: 'Background guide to how private debt works and where it fits.'
        },
        {
          title: 'Commercial Property Refinancing Solutions',
          href: '/resources/guides/commercial-property-refinancing-solutions',
          description: 'Useful if the Adelaide scenario centres on refinance timing.'
        }
      ]}
      faqs={[
        {
          question: 'When might a borrower use private lending in Adelaide?',
          answer: 'Usually when there is a commercial timing or structure issue such as a short settlement, refinance maturity, mixed-use complexity, or urgent property-backed liquidity need.'
        },
        {
          question: 'Can private lending suit owner-occupied commercial property in Adelaide?',
          answer: 'Potentially, yes. Owner-occupied commercial premises can suit private lending when the security is sound and the borrower has a clear repayment pathway.'
        },
        {
          question: 'Is private lending only relevant for distressed files?',
          answer: 'No. Many files are viable commercial transactions that simply need a faster or more flexible lender than the mainstream market can provide at that moment.'
        },
        {
          question: 'What will an Adelaide private lender usually care about most?',
          answer: 'Security quality, leverage, document readiness, and exit strategy are usually central. If those are clear, the file is easier to assess and place.'
        },
        {
          question: 'Can private debt be transitional rather than permanent?',
          answer: 'Yes, potentially. It is often used as interim capital before refinance, sale, or another defined commercial event.'
        }
      ]}
    />
  );
}
