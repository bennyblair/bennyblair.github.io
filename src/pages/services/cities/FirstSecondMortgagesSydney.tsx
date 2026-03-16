import React from 'react';
import FirstSecondMortgagesCityPage from '@/components/FirstSecondMortgagesCityPage';

export default function FirstSecondMortgagesSydney() {
  return (
    <FirstSecondMortgagesCityPage
      city="Sydney"
      state="NSW"
      canonical="/services/first-second-mortgages/cities/sydney"
      title="1st & 2nd Mortgages Sydney | Commercial Property Finance | Emet Capital"
      description="Commercial first and second mortgages in Sydney for acquisitions, refinance pressure, equity release, and business-purpose property transactions that need a lender fit beyond a standard retail bank path."
      localIntro="Commercial first and second mortgages for Sydney borrowers who need a clean property-backed structure for acquisition, refinance, or equity release without drifting into generic bank territory."
      localFocus="In Sydney that may include owner-occupied commercial purchases in the CBD and city fringe, second mortgage top-ups against high-value assets in the Eastern Suburbs and Lower North Shore, refinance deadlines on industrial sites in the west, and mixed-use transactions where timing matters as much as leverage."
      marketOverview="Sydney is deep, liquid, and expensive. That combination creates strong security value, but it also creates bigger facility sizes, faster contract pressure, and more scrutiny around documentation quality. For many borrowers, the question is not whether there is equity. It is whether the structure can be executed cleanly before the opportunity or deadline moves on."
      timingPressures="Timing pressure in Sydney often comes from short settlements, maturing facilities, linked asset sales, and business events that do not line up with major-bank pace. Second mortgage scenarios also appear when a borrower wants more capital without disturbing an existing first mortgage that still works."
      suburbCoverage={[
        {
          title: 'CBD, South Sydney, and city fringe assets',
          text: 'Sydney CBD, Alexandria, Mascot, Waterloo, and Zetland regularly produce owner-occupied and investment transactions involving offices, mixed-use stock, and warehouse-style assets where lender appetite depends on tenancy quality, title simplicity, and timing.'
        },
        {
          title: 'Eastern Suburbs and Lower North Shore',
          text: 'Bondi Junction, Double Bay, Rose Bay, Mosman, Neutral Bay, and North Sydney often generate higher-value mortgage scenarios where existing equity is strong but the borrower still needs a first or second mortgage structure matched to a specific business purpose.'
        },
        {
          title: 'Parramatta and Western Sydney growth corridors',
          text: 'Parramatta, Lidcombe, Smithfield, Wetherill Park, Penrith, and Liverpool can produce acquisition, refinance, and equity-release demand tied to industrial, logistics, mixed-use, and commercial owner-occupied property.'
        }
      ]}
      localUseCases={[
        {
          title: 'First mortgages for acquisition and refinance',
          text: 'Sydney borrowers often use first mortgages to acquire owner-occupied commercial premises, refinance an outgoing lender, or move an asset into a more stable long-term structure once timing pressure is under control.'
        },
        {
          title: 'Second mortgages for equity release',
          text: 'A second mortgage may suit a borrower who has usable equity in a Sydney asset but does not want to disturb an existing first mortgage. Common reasons include business growth, urgent working capital, or acquisition support tied to another transaction.'
        },
        {
          title: 'Bridge-like transactions with real property backing',
          text: 'Some Sydney deals sit between a classic bridge and a standard commercial mortgage. The security is strong, the time frame is compressed, and the lender needs to understand how the borrower exits or refinances once the short-term event is over.'
        },
        {
          title: 'Partner buyouts and restructures',
          text: 'Property-backed mortgage structures are also used when shareholders or partners need capital to complete a buyout, settle a restructure, or rebalance debt without liquidating a strategic asset.'
        }
      ]}
      scenarios={[
        {
          title: 'Parramatta Office Equity Release',
          scenario: 'A professional services group owned a Parramatta office asset valued at $4.8 million with an existing first mortgage balance of $2.35 million. The directors wanted to fund a bolt-on acquisition and fit-out without refinancing the original facility, which still had favourable terms.',
          solution: 'A second mortgage of $850,000 was structured behind the existing first mortgage so the acquisition could complete while the original debt remained in place. The lender focused on total leverage, the quality of the office asset, and the business-purpose use of funds rather than pushing the borrower into a full refinance.',
          outcomes: [
            { label: 'Security value', value: '$4.8M office asset' },
            { label: 'Existing first mortgage', value: '$2.35M' },
            { label: 'Second mortgage', value: '$850K' },
            { label: 'Combined leverage', value: '67% LVR' }
          ]
        },
        {
          title: 'Marrickville Mixed-Use Acquisition',
          scenario: 'An investor secured a $3.1 million mixed-use property in Marrickville with strong lease coverage, but needed certainty around settlement while restructuring debt on another asset. A mainstream lender could not complete in time.',
          solution: 'A first mortgage facility of $2.05 million was used to settle the acquisition quickly, with documentation framed around the property cash flow, borrower experience, and a later refinance path once the wider portfolio restructure was completed.',
          outcomes: [
            { label: 'Purchase price', value: '$3.1M' },
            { label: 'First mortgage', value: '$2.05M' },
            { label: 'Indicative leverage', value: '66% LVR' },
            { label: 'Expected next step', value: 'Refinance after portfolio restructure' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: '1st & 2nd Mortgages service page',
          href: '/services/first-second-mortgages',
          description: 'Overview of first-position and second-position commercial mortgage options across Australia.'
        },
        {
          title: 'First and Second Mortgages for Business',
          href: '/resources/guides/first-and-second-mortgages-for-business',
          description: 'Core guide explaining how mortgage priority works and when each structure may fit.'
        },
        {
          title: 'Commercial Property Finance Sydney',
          href: '/resources/guides/commercial-property-finance-sydney',
          description: 'Useful for Sydney borrowers comparing local market conditions, documents, and lender expectations.'
        }
      ]}
      faqs={[
        {
          question: 'When does a second mortgage make sense in Sydney?',
          answer: 'Usually when a borrower has usable equity in a Sydney property, a clear business purpose for the funds, and a reason not to disturb the first mortgage already in place.'
        },
        {
          question: 'Can first mortgages be used for owner-occupied commercial property in Sydney?',
          answer: 'Yes. Owner-occupied offices, warehouses, mixed-use buildings, and other commercial premises can be funded where the asset, borrower, and business purpose fit lender policy.'
        },
        {
          question: 'What do lenders focus on in Sydney mortgage transactions?',
          answer: 'Security quality, leverage, legal readiness, and the commercial logic of the deal tend to matter most. In second mortgage files, the position of the existing first mortgage is also critical.'
        },
        {
          question: 'Is a second mortgage the same as refinancing?',
          answer: 'No. A second mortgage adds another facility behind the first mortgage rather than replacing the original debt. That can preserve favourable senior debt terms if the overall structure still makes sense.'
        },
        {
          question: 'Are these mortgages available for consumer home loans?',
          answer: 'No. Emet Capital focuses on commercial lending solutions for eligible business borrowers, not owner-occupier residential home lending.'
        }
      ]}
    />
  );
}
