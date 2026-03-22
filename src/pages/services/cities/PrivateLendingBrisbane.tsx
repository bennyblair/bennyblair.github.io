import React from 'react';
import PrivateLendingCityPage from '@/components/PrivateLendingCityPage';

export default function PrivateLendingBrisbane() {
  return (
    <PrivateLendingCityPage
      city="Brisbane"
      state="QLD"
      canonical="/services/private-lending/cities/brisbane"
      title="Private Lending Brisbane | Commercial Private Credit | Emet Capital"
      description="Private lending in Brisbane for commercial acquisitions, refinance timing gaps, development transitions, and business-purpose property-backed transactions where growth-market timing can outrun mainstream credit."
      localIntro="Private lending for Brisbane borrowers who need commercial capital quickly and cleanly when bank policy or turnaround time does not fit the transaction."
      localFocus="Brisbane private lending commonly appears around mixed-use and owner-occupied commercial assets, warehouse and trade property, growth-corridor acquisitions, and transition funding where the borrower has a visible exit but needs capital before the next event lands."
      marketOverview="Brisbane's growth, infrastructure pipeline, and active industrial market create real opportunity, but they also compress decision windows. That makes lender fit particularly important when a borrower is trying to secure a site, refinance a maturing loan, or hold momentum through a commercial transition."
      timingPressures="In Brisbane, private lending usually comes up when a vendor deadline is tight, a refinance is close but not ready, or a business owner needs short-term property-backed liquidity while a broader restructure, sale, or refinance is still progressing."
      suburbCoverage={[
        {
          title: 'CBD and inner-ring mixed-use precincts',
          text: 'Brisbane CBD, South Brisbane, Fortitude Valley, Newstead, Teneriffe, and Woolloongabba often produce office, hospitality, and mixed-use files where flexibility matters.'
        },
        {
          title: 'Southside and western trade corridors',
          text: 'Rocklea, Acacia Ridge, Coopers Plains, Darra, Richlands, and Wacol regularly generate warehouse and owner-occupied commercial transactions needing faster execution.'
        },
        {
          title: 'Northern and outer growth markets',
          text: 'North Lakes, Chermside, Eagle Farm, Pinkenba, Logan, and airport-linked precincts can produce acquisition and refinance files where growth conditions create urgency.'
        }
      ]}
      localUseCases={[
        {
          title: 'Acquisition funding in active growth markets',
          text: 'Private lending may help secure a strategic Brisbane commercial asset when the transaction window is shorter than a standard credit process.'
        },
        {
          title: 'Refinance gap funding',
          text: 'Where an outgoing lender needs repayment before the incoming facility is ready, a short-term private solution may stabilise the transition.'
        },
        {
          title: 'Development and repositioning transitions',
          text: 'Developers and active investors may use private capital while planning, valuation, lease-up, or takeout milestones are still catching up.'
        },
        {
          title: 'Business liquidity against property',
          text: 'Some Brisbane borrowers use private lending for commercial restructuring, shareholder events, or urgent working-capital needs supported by real property security.'
        }
      ]}
      scenarios={[
        {
          title: 'Rocklea warehouse refinance bridge',
          scenario: 'A transport operator owned a Rocklea warehouse valued at $4 million and needed to repay an outgoing lender before the replacement refinance completed contract and legal review.',
          solution: 'A private first mortgage of $2.35 million bought enough time to complete the refinance properly without losing control of the asset.',
          outcomes: [
            { label: 'Security value', value: '$4.0M warehouse' },
            { label: 'Private facility', value: '$2.35M' },
            { label: 'Indicative leverage', value: '59% LVR' },
            { label: 'Expected exit', value: 'Refinance within 4 months' }
          ]
        },
        {
          title: 'South Brisbane mixed-use acquisition',
          scenario: 'An investor exchanged on a $2.2 million South Brisbane mixed-use property with a short settlement while their long-term lender was still completing due diligence.',
          solution: 'A $1.32 million private facility allowed settlement first and refinance later once the permanent facility was ready to draw.',
          outcomes: [
            { label: 'Purchase price', value: '$2.2M mixed-use asset' },
            { label: 'Private facility', value: '$1.32M' },
            { label: 'Settlement issue', value: 'Vendor timeline pressure' },
            { label: 'Expected exit', value: 'Takeout refinance' }
          ]
        },
        {
          title: 'North Lakes business expansion event',
          scenario: 'A business owner needed short-term capital against a North Lakes commercial property to complete an expansion and equity reshuffle before bank debt could be reset.',
          solution: 'A private property-backed facility of $1.85 million created the required liquidity and kept the expansion timetable on track.',
          outcomes: [
            { label: 'Security value', value: '$3.1M commercial property' },
            { label: 'Private facility', value: '$1.85M' },
            { label: 'Commercial purpose', value: 'Expansion and equity reshuffle' },
            { label: 'Planned term', value: '3 to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Private Lending service page',
          href: '/services/private-lending',
          description: 'National private lending overview with lender types and use cases.'
        },
        {
          title: 'Bridging Finance in Australia',
          href: '/resources/guides/bridging-finance-australia-complete-property-guide',
          description: 'Relevant when the Brisbane transaction is driven by timing pressure around property.'
        },
        {
          title: 'What Is Private Lending in Australia?',
          href: '/resources/guides/what-is-private-lending-australia',
          description: 'Foundational guide to how private debt works in the Australian market.'
        }
      ]}
      faqs={[
        {
          question: 'When might private lending be used in Brisbane?',
          answer: 'Usually when a Brisbane borrower has a real commercial timing problem such as a short settlement, expiring facility, development-stage transition, or urgent property-backed liquidity need.'
        },
        {
          question: 'Can private lending work for Brisbane warehouse or mixed-use property?',
          answer: 'Potentially, yes. Warehouses, offices, mixed-use assets, and some owner-occupied commercial properties may suit private credit if the leverage and exit are sensible.'
        },
        {
          question: 'Why do Brisbane borrowers use private lenders if banks are available?',
          answer: 'Because the issue is not always bank availability. Sometimes the bank process is simply too slow or too rigid for the actual transaction timeline.'
        },
        {
          question: 'Does private lending require a clear exit?',
          answer: 'Yes, in most cases. The lender will usually want to see how the facility is expected to be repaid, whether by sale, refinance, project milestone, or another defined event.'
        },
        {
          question: 'Is private lending only for distressed borrowers?',
          answer: 'No. Strong borrowers also use private lending where they need a bespoke structure or a faster decision than conventional credit can provide.'
        }
      ]}
    />
  );
}
