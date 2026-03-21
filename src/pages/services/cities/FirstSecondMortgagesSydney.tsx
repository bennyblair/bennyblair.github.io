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
      localIntro="Commercial first and second mortgages for Sydney borrowers dealing with premium asset values, faster contract pressure, and lender scrutiny that tends to intensify as deal size and complexity increase across the metro market."
      localFocus="In Sydney that may mean a first mortgage for an Alexandria warehouse purchase, a second mortgage behind an existing facility on a North Sydney office asset, a refinance of western Sydney industrial debt nearing maturity, or a structured solution for a mixed-use property where timing matters as much as headline leverage."
      marketOverview="Sydney remains Australia’s deepest commercial property debt market, but depth does not remove execution risk. CBD and city-fringe office stock, inner-west mixed-use assets, and western industrial properties can all attract lender interest, yet the gap between a bankable file and a fundable file often comes down to documentation readiness, lease clarity, title simplicity, and whether the borrower can explain the next step after settlement. High values also mean even a modest top-up can be a large second mortgage, so credit discipline matters."
      timingPressures="Timing pressure in Sydney often comes from 21- to 42-day settlements, expiring private facilities, linked asset sales that have not settled yet, or business acquisitions that need capital before a full refinance can be completed. Borrowers also use second mortgages when an existing first mortgage still has acceptable pricing, but the opportunity window is too short to replace the whole debt stack."
      suburbCoverage={[
        {
          title: 'CBD, city fringe, and south Sydney',
          text: 'Sydney CBD, Alexandria, Mascot, Waterloo, and Zetland regularly produce office, mixed-use, and warehouse-style mortgage files where lender appetite depends on tenant quality, strata or title complexity, and how quickly the borrower can get valuation and legal work moving.'
        },
        {
          title: 'Lower North Shore and eastern premium markets',
          text: 'North Sydney, St Leonards, Neutral Bay, Double Bay, and Bondi Junction can generate higher-value first and second mortgage scenarios where equity is strong on paper, but lenders still want a precise commercial purpose and a sensible exit if the facility is transitional.'
        },
        {
          title: 'Parramatta and western Sydney industrial corridors',
          text: 'Parramatta, Silverwater, Lidcombe, Smithfield, Wetherill Park, Liverpool, and Penrith remain important for warehouse, logistics, trade, and mixed commercial transactions where owner-occupied demand and refinancing deadlines often overlap.'
        }
      ]}
      localUseCases={[
        {
          title: 'Acquisition funding for scarce commercial stock',
          text: 'Sydney buyers often use first mortgages to secure owner-occupied offices, warehouses, and mixed-use assets when a realistic settlement timeframe matters as much as rate or headline terms.'
        },
        {
          title: 'Second mortgages behind valuable existing assets',
          text: 'A second mortgage may suit a borrower with substantial embedded equity in a Sydney property who needs funds for a business purchase, fit-out, tax debt resolution, or a time-sensitive deposit without disturbing the first-ranking lender.'
        },
        {
          title: 'Refinancing before maturity pressure escalates',
          text: 'Where a current lender is nearing review, reducing appetite, or requiring repayment before a wider restructure is complete, a new first mortgage can stabilise the position and protect the borrower’s timetable.'
        },
        {
          title: 'Partner exits and strategic restructures',
          text: 'Mortgage-backed capital is also used in Sydney for shareholder buyouts, intercompany restructures, and portfolio rebalancing where selling a strategic property would be commercially disruptive.'
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
          question: 'Why are Sydney second mortgages often larger in dollar terms?',
          answer: 'Because Sydney commercial property values are higher, even a relatively conservative top-up against available equity can translate into a sizeable facility. Lenders still assess the combined leverage, purpose of funds, and how the first mortgage sits ahead of the new debt.'
        },
        {
          question: 'Can western Sydney industrial property work well for a first mortgage?',
          answer: 'Often yes, particularly where the asset is marketable, the borrower can show a clear commercial purpose, and the warehouse or industrial site is in an established corridor with strong demand.'
        },
        {
          question: 'What usually slows Sydney mortgage deals down?',
          answer: 'Valuation timing, incomplete company and trust documents, unclear lease information, and legal complexity around title or existing debt commonly create delays. The stronger files are usually the ones prepared properly before the deadline becomes critical.'
        },
        {
          question: 'Is a second mortgage in Sydney mainly for distressed borrowers?',
          answer: 'No. Some second mortgage borrowers are under time pressure, but many are using layered debt strategically to preserve an existing first mortgage while accessing capital for a defined business use.'
        },
        {
          question: 'Are these mortgages available for consumer home loans?',
          answer: 'No. Emet Capital focuses on commercial lending solutions for eligible business borrowers, not owner-occupier residential home lending.'
        }
      ]}
    />
  );
}
