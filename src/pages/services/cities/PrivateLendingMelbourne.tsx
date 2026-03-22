import React from 'react';
import PrivateLendingCityPage from '@/components/PrivateLendingCityPage';

export default function PrivateLendingMelbourne() {
  return (
    <PrivateLendingCityPage
      city="Melbourne"
      state="VIC"
      canonical="/services/private-lending/cities/melbourne"
      title="Private Lending Melbourne | Commercial Private Credit | Emet Capital"
      description="Private lending in Melbourne for commercial acquisitions, refinance transitions, industrial and mixed-use property deals, and business-purpose transactions where lender flexibility matters as much as raw speed."
      localIntro="Private lending for Melbourne borrowers who need commercial property-backed capital when the file is viable but too complex, too urgent, or too bespoke for a straightforward bank pathway."
      localFocus="Melbourne private lending often revolves around city-fringe mixed-use stock, southeast and western industrial property, premium owner-investor assets, and transitional commercial situations where the borrower has a plan but mainstream credit timing does not align with the deal."
      marketOverview="Melbourne's commercial market spans CBD and fringe office stock, active industrial corridors, and dense mixed-use precincts where lender appetite can vary sharply by asset type and suburb. That creates room for private credit when a transaction needs nuance or compressed execution."
      timingPressures="Private lending in Melbourne commonly surfaces when a maturing lender needs repayment before takeout debt is ready, when an industrial acquisition cannot wait for a full bank process, or when a restructure needs interim liquidity against property-backed security."
      suburbCoverage={[
        {
          title: 'CBD, city fringe, and inner north',
          text: 'Melbourne CBD, Southbank, Docklands, Collingwood, Brunswick, Richmond, and Carlton regularly produce private lending files tied to offices, mixed-use assets, hospitality sites, and repositioning plays.'
        },
        {
          title: 'Inner east and Bayside premium markets',
          text: 'South Yarra, Hawthorn, Camberwell, Kew, Toorak, and Brighton often involve higher-value commercial or mixed-use assets where timing and structure become more important than simple product comparison.'
        },
        {
          title: 'Western, northern, and southeast industrial corridors',
          text: 'Laverton North, Truganina, Sunshine, Epping, Thomastown, Moorabbin, and Dandenong South are active warehouse and logistics precincts where fast lender execution can be decisive.'
        }
      ]}
      localUseCases={[
        {
          title: 'Industrial acquisitions under time pressure',
          text: 'Private debt may help Melbourne buyers settle on industrial or trade property before a slower long-term lender is ready.'
        },
        {
          title: 'Refinance transition between lender types',
          text: 'A borrower may use private lending to bridge the gap between an expiring facility and a better-structured refinance that simply needs more time.'
        },
        {
          title: 'Mixed-use and policy-edge transactions',
          text: 'Some city-fringe or mixed-use assets fall into grey areas for banks but remain workable for specialist or private lenders prepared to assess the actual downside risk.'
        },
        {
          title: 'Property-backed restructuring liquidity',
          text: 'Private lending can support business restructures, partner exits, or urgent corporate transactions where a commercial property offers sufficient security.'
        }
      ]}
      scenarios={[
        {
          title: 'Dandenong South warehouse maturity',
          scenario: 'A manufacturing business owned a Dandenong South warehouse valued at $4.8 million and faced lender maturity before the replacement refinance cleared final credit and legal conditions.',
          solution: 'A private first mortgage of $2.95 million created breathing room to complete the takeout refinance without a distressed rollover.',
          outcomes: [
            { label: 'Security value', value: '$4.8M industrial asset' },
            { label: 'Private facility', value: '$2.95M' },
            { label: 'Indicative leverage', value: '61% LVR' },
            { label: 'Expected exit', value: 'Refinance within 3 months' }
          ]
        },
        {
          title: 'Collingwood mixed-use acquisition',
          scenario: 'An investor secured a $2.85 million Collingwood mixed-use property on a short settlement while their preferred lender was still reviewing leases and trust documents.',
          solution: 'A $1.72 million private facility preserved the purchase and allowed the borrower to refinance later once the long-form process was complete.',
          outcomes: [
            { label: 'Purchase price', value: '$2.85M mixed-use property' },
            { label: 'Private facility', value: '$1.72M' },
            { label: 'Pressure point', value: 'Short settlement deadline' },
            { label: 'Expected exit', value: 'Takeout refinance' }
          ]
        },
        {
          title: 'Brighton property-backed restructure',
          scenario: 'A business owner needed interim capital against a Brighton commercial asset while finalising a shareholder separation and broader debt cleanup.',
          solution: 'A private property-backed loan of $2.15 million created controlled liquidity so the restructure could complete before the borrower moved to a more conventional facility.',
          outcomes: [
            { label: 'Security value', value: '$3.7M commercial asset' },
            { label: 'Private facility', value: '$2.15M' },
            { label: 'Commercial purpose', value: 'Shareholder separation' },
            { label: 'Planned term', value: 'Up to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Private Lending service page',
          href: '/services/private-lending',
          description: 'National overview of private lending structures and lender-fit considerations.'
        },
        {
          title: 'Commercial Property Refinancing Solutions',
          href: '/resources/guides/commercial-property-refinancing-solutions',
          description: 'Helpful if your Melbourne file is really a refinance transition problem.'
        },
        {
          title: 'What Is Private Lending in Australia?',
          href: '/resources/guides/what-is-private-lending-australia',
          description: 'Background guide to how private credit differs from mainstream debt.'
        }
      ]}
      faqs={[
        {
          question: 'When might a Melbourne borrower use private lending?',
          answer: 'Often when the transaction is commercially sensible but the timeline, property type, or structure does not fit standard bank credit. Common triggers include refinance maturities, industrial acquisitions, mixed-use property, and business-purpose liquidity events.'
        },
        {
          question: 'Can private lending work for industrial property in Melbourne?',
          answer: 'Potentially, yes. Melbourne industrial corridors are active and can suit private credit when the asset is strong, leverage is controlled, and the exit is defined.'
        },
        {
          question: 'Does private lending replace a long-term commercial mortgage?',
          answer: 'Not always. In many cases it is an interim tool used to solve a timing or structure problem before a longer-term refinance or sale.'
        },
        {
          question: 'What makes a Melbourne private lending file easier to place?',
          answer: 'Clear title, sensible leverage, a strong explanation of commercial purpose, and a realistic exit usually make the biggest difference. Good preparation matters.'
        },
        {
          question: 'Is private lending only for distressed situations?',
          answer: 'No. Many borrowers use it because they need flexibility or speed, not because the asset is distressed. The stronger the asset and the cleaner the exit, the more workable private debt can be.'
        }
      ]}
    />
  );
}
