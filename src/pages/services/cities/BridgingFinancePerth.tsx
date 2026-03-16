import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinancePerth() {
  return (
    <BridgingFinanceCityPage
      city="Perth"
      state="WA"
      canonical="/services/bridging-finance/cities/perth"
      title="Bridging Finance Perth | WA Commercial Finance | Emet Capital"
      description="Bridging finance in Perth for commercial acquisitions, refinance timing gaps, development transitions, and business-backed property scenarios where timing matters more than a standard bank process."
      localIntro="Bridging finance for Perth borrowers dealing with short settlement windows, refinance deadlines, and property-backed commercial transactions that need to move before long-term funding is ready."
      localFocus="In Perth that can include industrial acquisitions in Welshpool and Kewdale, coastal and riverside property transitions in premium suburbs, owner-occupied commercial refinance pressure, and development site timing gaps across growth corridors where the exit is clear but not yet complete."
      marketOverview="Perth can move in a very different rhythm to the east coast. Resource-linked business cash flow, industrial demand, and periodic bursts of residential and mixed-use activity often create short funding gaps that mainstream lenders are too slow to accommodate. That is where bridging finance can become useful when the transaction is real and the exit is properly defined."
      timingPressures="Timing issues in Perth often show up when a borrower wants to secure a strategic asset before another sale settles, refinance away from an expiring private or non-bank facility, or hold a site while valuation, planning, or longer-term lender credit work catches up."
      suburbCoverage={[
        {
          title: 'CBD, West Perth, and inner commercial precincts',
          text: 'West Perth, the CBD, Subiaco, Leederville, and Osborne Park regularly produce owner-occupied commercial and investment scenarios where office, mixed-use, and small commercial assets need short-term timing support.'
        },
        {
          title: 'Industrial and logistics corridors',
          text: 'Welshpool, Kewdale, Malaga, Canning Vale, and Bibra Lake can generate bridging demand around warehouses, transport yards, industrial units, and trading-business refinance transitions.'
        },
        {
          title: 'Coastal, riverside, and growth-market locations',
          text: 'Cottesloe, Nedlands, Applecross, South Perth, Joondalup, and Baldivis can produce higher-value transitions where borrowers want to move on an opportunity before another property or funding event completes.'
        }
      ]}
      localUseCases={[
        {
          title: 'Industrial acquisitions and settlement deadlines',
          text: 'Perth borrowers sometimes need a bridge to secure a warehouse, yard, or mixed commercial asset before a refinance, sale, or capital release catches up.'
        },
        {
          title: 'Expiring lender and refinance transitions',
          text: 'Where an outgoing lender requires repayment before the incoming facility is ready, short-term finance may create enough breathing room to complete valuation, legal, and credit work properly.'
        },
        {
          title: 'Development and subdivision timing gaps',
          text: 'Developers may use bridging finance to secure a site, carry a project between milestones, or hold stock while next-stage funding or approvals are being completed.'
        },
        {
          title: 'Business-purpose funding supported by property',
          text: 'Some Perth transactions involve business acquisitions, shareholder restructures, or urgent liquidity events where commercial or residential property provides the short-term security support.'
        }
      ]}
      scenarios={[
        {
          title: 'Kewdale Warehouse Refinance Bridge',
          scenario: 'A transport business owned a Kewdale warehouse valued at $4.4 million and faced repayment pressure from an outgoing lender before the replacement facility could complete valuation and legal review.',
          solution: 'A $2.75 million short-term bridge allowed the existing lender to be repaid on time while the incoming refinance worked through final conditions. The facility was structured as a temporary transition tool rather than a long-term debt solution.',
          outcomes: [
            { label: 'Security value', value: '$4.4M warehouse asset' },
            { label: 'Bridge facility', value: '$2.75M' },
            { label: 'Indicative leverage', value: '63% LVR' },
            { label: 'Expected exit', value: 'Commercial refinance within 4 months' }
          ]
        },
        {
          title: 'West Perth Office Acquisition Timing Gap',
          scenario: 'An investor identified a $2.6 million office asset in West Perth, but the sale of another property in Mount Lawley was not due to settle for another eight weeks.',
          solution: 'A bridge of $1.62 million allowed the acquisition to settle immediately while the existing sale progressed, preserving the opportunity without forcing a rushed disposal or suboptimal long-term refinance.',
          outcomes: [
            { label: 'Purchase price', value: '$2.6M' },
            { label: 'Bridge facility', value: '$1.62M' },
            { label: 'Expected supporting sale', value: '$1.4M proceeds' },
            { label: 'Planned term', value: '3 to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Bridging Finance service page',
          href: '/services/bridging-finance',
          description: 'Overview of commercial bridging finance structures, timing, and lender-fit considerations.'
        },
        {
          title: 'Bridging Finance in Australia guide',
          href: '/resources/guides/bridging-finance-australia-complete-property-guide',
          description: 'A broader guide to how bridging finance works, common use cases, and what lenders assess.'
        },
        {
          title: 'Commercial Property Refinancing Solutions',
          href: '/resources/guides/commercial-property-refinancing-solutions',
          description: 'Useful if the Perth transaction is really a short-term step before a more stable refinance.'
        }
      ]}
      faqs={[
        {
          question: 'When might bridging finance make sense in Perth?',
          answer: 'It may make sense when a Perth borrower has a genuine short-term timing gap, such as a settlement deadline, a purchase before another sale completes, or an outgoing lender that needs repayment before replacement funding is ready.'
        },
        {
          question: 'Can bridging finance work for industrial property in Perth?',
          answer: 'Potentially, yes. Perth bridging transactions often involve warehouses, yards, industrial units, mixed-use assets, and owner-occupied commercial property where security quality and the exit strategy are clear.'
        },
        {
          question: 'What do lenders usually focus on most?',
          answer: 'They usually focus on the quality of the security, overall leverage, legal readiness, and how credible the exit is. In a bridge deal, the repayment event is normally central.'
        },
        {
          question: 'Can I use bridging finance while waiting for a Perth property sale to settle?',
          answer: 'Potentially, yes, if the sale is sufficiently advanced and the wider debt structure still makes sense. Lenders will usually want comfort around timing, fallback options, and total leverage.'
        },
        {
          question: 'Is bridging finance the same as a normal commercial term loan?',
          answer: 'No. Bridging finance is generally a short-term solution designed to solve a timing problem, with repayment expected from sale, refinance, or another defined commercial event.'
        }
      ]}
    />
  );
}
