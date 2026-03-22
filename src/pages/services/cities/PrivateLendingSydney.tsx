import React from 'react';
import PrivateLendingCityPage from '@/components/PrivateLendingCityPage';

export default function PrivateLendingSydney() {
  return (
    <PrivateLendingCityPage
      city="Sydney"
      state="NSW"
      canonical="/services/private-lending/cities/sydney"
      title="Private Lending Sydney | Commercial Private Credit | Emet Capital"
      description="Private lending in Sydney for commercial acquisitions, urgent refinance gaps, development timing pressure, and bespoke property-backed transactions where mainstream credit can move too slowly or fit the file poorly."
      localIntro="Private lending for Sydney borrowers who need commercial property-backed capital when timing, complexity, or lender fit makes a standard bank path too rigid."
      localFocus="Sydney private lending files often involve premium-value assets, short settlement windows, layered existing debt, and borrowers who are not short of strategy but are short of time. The right structure usually depends on security quality, leverage discipline, and a credible exit rather than generic consumer-style scoring."
      marketOverview="Sydney remains the deepest private-credit market in Australia for commercial property-backed transactions. That depth helps when borrowers need a lender who understands industrial acquisitions in the west, mixed-use stock in the inner ring, premium assets in the east or north shore, or short-term timing gaps around refinance, sale, or project milestones."
      timingPressures="In Sydney, private lending usually appears when auction and contract deadlines beat bank turnaround times, when a current lender wants repayment before a takeout refinance is ready, or when a business owner needs a bespoke structure around a commercial asset without losing control of the transaction."
      suburbCoverage={[
        {
          title: 'CBD, South Sydney, and city fringe',
          text: 'Sydney CBD, Alexandria, Mascot, Zetland, Waterloo, and Surry Hills often produce private lending scenarios tied to offices, mixed-use buildings, hospitality sites, and fast-moving commercial settlements.'
        },
        {
          title: 'Lower North Shore, eastern suburbs, and premium stock',
          text: 'North Sydney, Crows Nest, Mosman, Double Bay, Rose Bay, and Bondi Junction frequently involve higher-value transactions where equity is strong but speed, lender appetite, or structure is the constraint.'
        },
        {
          title: 'Parramatta and western industrial corridors',
          text: 'Parramatta, Silverwater, Smithfield, Wetherill Park, Liverpool, and Penrith regularly generate warehouse, trade, and owner-occupied commercial files where an urgent lender decision can protect settlement control.'
        }
      ]}
      localUseCases={[
        {
          title: 'Short-term acquisition funding',
          text: 'Private lenders may suit Sydney acquisitions where a borrower has strong security and a clear exit, but not enough time for a full mainstream credit process before settlement.'
        },
        {
          title: 'Refinance rescue and maturity exits',
          text: 'When an existing lender has reached maturity before the next refinance can settle, private debt can be used as a transitional structure rather than a permanent home for the loan.'
        },
        {
          title: 'Development and residual stock transitions',
          text: 'Developers may need private capital while DA conditions, titles, pre-sales, or takeout debt are still catching up to the transaction timeline.'
        },
        {
          title: 'Business-purpose liquidity against property',
          text: 'Some Sydney borrowers use private lending against commercial or investment property to support restructures, partner exits, acquisitions, or other time-sensitive business events.'
        }
      ]}
      scenarios={[
        {
          title: 'North Sydney office refinance gap',
          scenario: 'A professional services group owned a North Sydney office suite valued at $3.4 million and needed to repay an expiring facility before its replacement lender finished valuation and legal sign-off.',
          solution: 'A short-term private first mortgage of $2.05 million created enough room to meet the maturity deadline and refinance later into a more conventional facility once documents were complete.',
          outcomes: [
            { label: 'Security value', value: '$3.4M office suite' },
            { label: 'Private facility', value: '$2.05M' },
            { label: 'Indicative leverage', value: '60% LVR' },
            { label: 'Expected exit', value: 'Refinance within 4 months' }
          ]
        },
        {
          title: 'Marrickville mixed-use short settlement',
          scenario: 'An investor exchanged on a $2.62 million Marrickville mixed-use asset with a tight settlement date while their preferred lender was still reviewing tenancy and entity structure details.',
          solution: 'A private acquisition facility of $1.58 million allowed settlement on time and preserved the purchase while the longer-term refinance path stayed in motion.',
          outcomes: [
            { label: 'Purchase price', value: '$2.62M mixed-use asset' },
            { label: 'Private facility', value: '$1.58M' },
            { label: 'Contract pressure', value: 'Short settlement window' },
            { label: 'Expected exit', value: 'Takeout refinance' }
          ]
        },
        {
          title: 'Silverwater industrial liquidity event',
          scenario: 'A transport operator needed commercial liquidity against a Silverwater warehouse while finalising a shareholder restructure and could not wait for a slower mainstream approval path.',
          solution: 'A private property-backed loan of $2.4 million gave the business time to complete the restructure and move to a longer-term debt solution on a cleaner footing.',
          outcomes: [
            { label: 'Security value', value: '$4.1M warehouse asset' },
            { label: 'Private facility', value: '$2.4M' },
            { label: 'Commercial purpose', value: 'Shareholder restructure' },
            { label: 'Planned term', value: '3 to 6 months' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Private Lending service page',
          href: '/services/private-lending',
          description: 'Overview of commercial private lending, lender types, and structuring considerations.'
        },
        {
          title: 'What Is Private Lending in Australia?',
          href: '/resources/guides/what-is-private-lending-australia',
          description: 'Long-form guide to how private lending works and where it fits.'
        },
        {
          title: 'Bridging Finance in Australia',
          href: '/resources/guides/bridging-finance-australia-complete-property-guide',
          description: 'Useful if the Sydney scenario is really a short-term timing problem around property.'
        }
      ]}
      faqs={[
        {
          question: 'When does private lending usually come up in Sydney?',
          answer: 'Usually when a Sydney commercial borrower has a genuine timing, policy-fit, or structuring problem rather than a lack of asset quality. Common examples include short settlements, refinance maturities, development transitions, and business-purpose liquidity needs.'
        },
        {
          question: 'Can private lending work for Sydney commercial property?',
          answer: 'Potentially, yes. Offices, warehouses, mixed-use assets, and some development or investment properties may suit private lending if leverage is sensible and the exit is clear.'
        },
        {
          question: 'Is private lending only for distressed borrowers?',
          answer: 'No. Many private lending files involve strong assets and commercially capable borrowers who simply need a faster or more flexible structure than a mainstream lender can offer on the required timeline.'
        },
        {
          question: 'What matters most to a Sydney private lender?',
          answer: 'Security quality, leverage, documentation readiness, and exit strategy usually matter most. The stronger those four areas are, the more workable the file tends to be.'
        },
        {
          question: 'Can private lending be used before a later refinance?',
          answer: 'Potentially, yes. That is a common use case, provided the refinance path is credible and the private debt is genuinely solving a timing gap rather than delaying a bigger structural problem.'
        }
      ]}
    />
  );
}
