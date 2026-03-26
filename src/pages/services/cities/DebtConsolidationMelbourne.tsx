import React from 'react';
import DebtConsolidationCityPage from '@/components/DebtConsolidationCityPage';

export default function DebtConsolidationMelbourne() {
  return (
    <DebtConsolidationCityPage
      city="Melbourne"
      state="VIC"
      canonical="/services/debt-consolidation/cities/melbourne"
      title="Business Debt Consolidation Melbourne | Emet Capital"
      description="Business debt consolidation in Melbourne for companies and property-backed borrowers combining scattered facilities into a cleaner, more manageable finance structure."
      localIntro="Business debt consolidation for Melbourne operators wanting fewer facilities, better repayment control, and a more workable structure for cash flow and growth."
      localFocus="Melbourne consolidation scenarios often involve business loans, equipment finance, private debt, and property-backed facilities that have become mismatched to the current business stage."
      marketOverview="Melbourne businesses often accumulate debt across different lenders as they expand, pivot, or refinance. A cleaner consolidation structure can reduce friction, but the best result usually comes from rethinking the debt mix rather than just extending everything."
      timingPressures="Timing pressure in Melbourne often appears when short-term debt is maturing, repayment complexity is hurting cash flow, or the business wants to reset before its next growth step."
      suburbCoverage={[
        { title: 'CBD and inner-city commercial markets', text: 'Melbourne CBD, Southbank, and surrounding precincts often generate multi-facility refinance files for service and property-backed borrowers.' },
        { title: 'Inner north business corridors', text: 'Richmond, Collingwood, Brunswick, and nearby suburbs commonly involve growing businesses carrying multiple lender relationships.' },
        { title: 'South-east and west industrial areas', text: 'Dandenong, Laverton, Sunshine, and broader industrial belts regularly produce consolidation and restructure scenarios.' },
      ]}
      localUseCases={[
        { title: 'Refinancing multiple business facilities', text: 'Melbourne businesses sometimes outgrow the original mix of term loans, cards, and short-term debt.' },
        { title: 'Replacing expensive short-term funding', text: 'Private or short-dated facilities can make sense temporarily, but often need to be refinanced into cleaner structures.' },
        { title: 'Simplifying director and entity debt', text: 'Some files involve inter-entity debt, related-party exposure, or layered guarantees that need to be tidied up.' },
        { title: 'Resetting before growth or succession', text: 'A cleaner debt position can make expansion, sale, or ownership transition easier to manage.' },
      ]}
      scenarios={[
        {
          title: 'Inner-city multi-facility refinance',
          scenario: 'A professional-services business had built up multiple facilities across different lenders that had become inefficient to manage.',
          solution: 'The refinance grouped the debts into a cleaner structure with a more visible repayment path and simpler administration.',
          outcomes: [
            { label: 'Consolidated debt', value: '$1.6M' },
            { label: 'Facility type', value: 'Business refinance' },
            { label: 'Commercial purpose', value: 'Debt simplification' },
            { label: 'Indicative term', value: '5 to 10 years' },
          ]
        },
        {
          title: 'South-east property-backed consolidation',
          scenario: 'An industrial borrower wanted to refinance short-term debt and equipment exposures into a more stable facility supported by available property equity.',
          solution: 'The new structure reduced pressure from mismatched repayments and created a clearer long-term finance profile.',
          outcomes: [
            { label: 'Consolidated debt', value: '$3.1M' },
            { label: 'Facility type', value: 'Property-backed refinance' },
            { label: 'Commercial purpose', value: 'Cash-flow improvement' },
            { label: 'Indicative term', value: '7 to 15 years' },
          ]
        },
        {
          title: 'Inner-north business restructure',
          scenario: 'A Melbourne operator needed to clean up several private and unsecured facilities before pursuing growth capital.',
          solution: 'The consolidation replaced the fragmented debt stack with a more usable and better-sequenced business facility.',
          outcomes: [
            { label: 'Consolidated debt', value: '$940K' },
            { label: 'Facility type', value: 'Business-secured consolidation' },
            { label: 'Commercial pressure', value: 'Short-term debt stack' },
            { label: 'Indicative term', value: '3 to 7 years' },
          ]
        },
      ]}
      relatedLinks={[
        { title: 'Debt Consolidation service page', href: '/services/debt-consolidation', description: 'National overview of consolidation and business-refinance structures.' },
        { title: 'Business Debt Consolidation Australia', href: '/resources/guides/business-debt-consolidation-australia', description: 'Guide to consolidating multiple business debts into cleaner structures.' },
        { title: 'Refinancing Solutions', href: '/services/refinancing-solutions', description: 'Useful if the city scenario includes broader commercial refinance or property restructuring.' }
      ]}
      faqs={[
        { question: 'Can business debt consolidation include equipment finance?', answer: 'Often, yes. It depends on the lender path and whether the overall restructure makes commercial sense.' },
        { question: 'Is property always required?', answer: 'No, but property support can broaden options and improve structure in many cases. Some consolidations are still possible using business assets or a different security approach.' },
        { question: 'Will the lender need payout letters from all current facilities?', answer: 'Usually, yes. Accurate payout figures are a normal part of building a clean consolidation structure.' },
        { question: 'How complex do multi-lender files get?', answer: 'They can get quite involved, especially where multiple securities, entities, or private lenders are involved. Good coordination matters.' },
        { question: 'Can consolidation help before a sale or succession?', answer: 'Yes. A cleaner debt profile can make a business easier to run, present, and transition.' },
      ]}
    />
  );
}
