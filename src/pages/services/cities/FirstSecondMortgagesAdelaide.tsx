import React from 'react';
import FirstSecondMortgagesCityPage from '@/components/FirstSecondMortgagesCityPage';

export default function FirstSecondMortgagesAdelaide() {
  return (
    <FirstSecondMortgagesCityPage
      city="Adelaide"
      state="SA"
      canonical="/services/first-second-mortgages/cities/adelaide"
      title="1st & 2nd Mortgages Adelaide | Commercial Property Finance | Emet Capital"
      description="Commercial first and second mortgages in Adelaide for acquisitions, refinance timing, equity release, and business-purpose property transactions across metro and key industrial precincts."
      localIntro="Commercial first and second mortgages for Adelaide borrowers who need property-backed funding matched to the asset, the purpose, and the actual pace of the transaction."
      localFocus="In Adelaide that may include owner-occupied commercial purchases in the inner metro, warehouse and industrial transactions in trade corridors, second mortgage funding against established equity, and refinance scenarios where the borrower wants execution certainty without rebuilding the entire debt stack."
      marketOverview="Adelaide is usually a calmer market than Sydney or Melbourne, but calm does not mean simple. Lenders still care about property liquidity, lease profile, legal readiness, and whether the requested debt fits the commercial objective. Borrowers often do well when the structure is practical and the purpose is easy to explain."
      timingPressures="Timing pressure in Adelaide tends to come from contract deadlines, expiring facilities, and growth plans where the property is strong but the borrower needs more flexibility than a standard bank process offers. Second mortgage scenarios also arise when an existing senior facility is worth keeping in place."
      suburbCoverage={[
        {
          title: 'CBD and inner-metro commercial assets',
          text: 'Adelaide CBD, Kent Town, Mile End, Norwood, and Unley can generate office and mixed-use mortgage scenarios where valuation evidence and tenant stability are central to lender appetite.'
        },
        {
          title: 'Northern and western industrial corridors',
          text: 'Wingfield, Regency Park, Gepps Cross, and Dry Creek often suit warehouse, logistics, and trade-related first mortgage transactions for owner-occupiers and investors.'
        },
        {
          title: 'Southern and growth-market precincts',
          text: 'Tonsley, Lonsdale, and surrounding industrial-commercial zones can produce refinance, equity release, and small-scale acquisition demand linked to operating businesses.'
        }
      ]}
      localUseCases={[
        {
          title: 'First mortgages for commercial premises acquisition',
          text: 'Adelaide businesses regularly use first mortgages to buy office, warehouse, and mixed commercial property rather than continue leasing long term.'
        },
        {
          title: 'Second mortgages behind workable senior debt',
          text: 'A second mortgage can suit borrowers who have equity in Adelaide property and need capital for fit-out, acquisition support, or business expansion while preserving the first mortgage already in place.'
        },
        {
          title: 'Refinance and restructuring',
          text: 'When an outgoing lender no longer suits the borrower, a new first mortgage may provide a cleaner long-term structure than trying to patch over the issue.'
        },
        {
          title: 'Investor and SME capital access',
          text: 'Property-backed mortgages may also support investors and SME owners who need commercially justified capital tied to a property asset with a sensible leverage profile.'
        }
      ]}
      scenarios={[
        {
          title: 'Wingfield Warehouse Acquisition',
          scenario: 'A transport and storage operator wanted to buy a Wingfield warehouse for $2.4 million to bring a leased site into owner-occupation. Timing mattered because the vendor wanted a firm settlement and the borrower needed a lender comfortable with industrial security.',
          solution: 'A first mortgage of $1.58 million was used to complete the purchase, supported by the warehouse quality, owner-occupied rationale, and a clear view of the business cash flow behind the transaction.',
          outcomes: [
            { label: 'Purchase price', value: '$2.4M' },
            { label: 'First mortgage', value: '$1.58M' },
            { label: 'Indicative leverage', value: '66% LVR' },
            { label: 'Property use', value: 'Owner-occupied warehouse' }
          ]
        },
        {
          title: 'Norwood Commercial Equity Release',
          scenario: 'A borrower owned a Norwood commercial property valued at $2.7 million with existing senior debt of $1.3 million and needed capital for a related business acquisition and fit-out program.',
          solution: 'A second mortgage of $450,000 was structured behind the first mortgage so the borrower could access equity without disturbing the original senior facility. The lender focused on total leverage, property liquidity, and a clearly commercial use of funds.',
          outcomes: [
            { label: 'Security value', value: '$2.7M commercial asset' },
            { label: 'Existing first mortgage', value: '$1.3M' },
            { label: 'Second mortgage', value: '$450K' },
            { label: 'Combined leverage', value: '65% LVR' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: '1st & 2nd Mortgages service page',
          href: '/services/first-second-mortgages',
          description: 'Main service overview for commercial first mortgages and second mortgages.'
        },
        {
          title: 'Second Mortgage for Business',
          href: '/resources/guides/second-mortgage-for-business',
          description: 'Useful if your Adelaide scenario is mostly about unlocking equity for business use.'
        },
        {
          title: 'Commercial Property Loans Australia',
          href: '/resources/guides/commercial-property-loans-australia-complete-guide',
          description: 'Broader guide for borrowers comparing lender types and property-backed structures.'
        }
      ]}
      faqs={[
        {
          question: 'Can Adelaide owner-occupied property support a first mortgage?',
          answer: 'Yes, where the premises are commercially suitable, the borrower’s business purpose is clear, and the overall structure fits lender policy.'
        },
        {
          question: 'Why would a borrower use a second mortgage instead of refinancing?',
          answer: 'Because the existing senior debt may still be attractive. A second mortgage can add capital while leaving that first mortgage in place if combined leverage remains sensible.'
        },
        {
          question: 'Do lenders fund Adelaide industrial property?',
          answer: 'They can, particularly for warehouse and industrial assets in established corridors with acceptable valuation support and marketability.'
        },
        {
          question: 'What do lenders want to understand most clearly?',
          answer: 'Usually the property, the current debt position, the reason the borrower needs funds, and whether the structure still makes sense if conditions shift.'
        },
        {
          question: 'Are these products for residential owner-occupier borrowers?',
          answer: 'No. These pages relate to commercial lending solutions for eligible business borrowers only.'
        }
      ]}
    />
  );
}
