import React from 'react';
import DebtConsolidationCityPage from '@/components/DebtConsolidationCityPage';

export default function DebtConsolidationPerth() {
  return (
    <DebtConsolidationCityPage
      city="Perth"
      state="WA"
      canonical="/services/debt-consolidation/cities/perth"
      title="Business Debt Consolidation Perth | Emet Capital"
      description="Business debt consolidation in Perth for companies combining multiple facilities into a cleaner refinance structure where lender fit, timing, and structure all matter."
      localIntro="Business debt consolidation for Perth businesses that need a commercial structure aligned to the transaction rather than a generic lending template."
      localFocus="Perth business debt consolidation files often involve resource-linked commercial market across trade, industrial, logistics, healthcare, and service operators where commercial timing, supporting information, and lender fit can materially affect the outcome."
      marketOverview="Perth supports a resource-linked commercial market across trade, industrial, logistics, healthcare, and service operators. That creates opportunity, but the strongest result usually comes from matching the transaction to the right lender and structure rather than focusing on rate alone."
      timingPressures="In Perth, timing pressure often appears around diligence, settlement, supplier deadlines, asset delivery, refinancing maturity, or the need to preserve working capital while still moving decisively."
      suburbCoverage={[
        { title: 'CBD and central commercial precincts', text: 'Perth CBD and nearby business districts often generate business debt consolidation scenarios for established commercial borrowers.' },
        { title: 'Industrial and resource-linked corridors', text: 'Key industrial and resource-linked corridors in and around Perth regularly produce files tied to trade, logistics, and business growth.' },
        { title: 'Broader metro growth hubs', text: 'Outer-metro and suburban commercial hubs around Perth often support owner-operator, service-business, and mid-market finance needs.' },
      ]}
      localUseCases={[
        { title: 'Structured commercial transactions', text: 'Perth borrowers often need a facility shaped to the actual commercial purpose rather than a one-size-fits-all loan.' },
        { title: 'Protecting working capital', text: 'The right structure can leave more liquidity available for operations, staff, stock, or integration after settlement.' },
        { title: 'Moving faster on good opportunities', text: 'Well-prepared borrowers can often improve outcomes by aligning documentation and lender fit early.' },
        { title: 'Cleaning up or scaling the business', text: 'These facilities are often used where a business is growing, restructuring, or making a strategically important move.' },
      ]}
      scenarios={[
        {
          title: 'Perth metro commercial transaction',
          scenario: 'A Perth borrower needed a better-structured facility to move on a time-sensitive commercial opportunity without overextending cash flow.',
          solution: 'The file was matched to a lender path that reflected the underlying commercial purpose and timing rather than forcing a generic structure.',
          outcomes: [
            { label: 'Facility size', value: '$1.2M' },
            { label: 'Primary focus', value: 'Commercial execution' },
            { label: 'Market', value: 'Metro business' },
            { label: 'Indicative term', value: 'Case-by-case' },
          ]
        },
        {
          title: 'Growth-led Perth funding need',
          scenario: 'A business in Perth needed funding support tied to expansion, replacement, or restructuring but wanted to avoid an inflexible facility.',
          solution: 'The structure was aligned to the business purpose, lender appetite, and practical timing of the transaction.',
          outcomes: [
            { label: 'Facility size', value: '$850K' },
            { label: 'Primary focus', value: 'Growth support' },
            { label: 'Market', value: 'Established business' },
            { label: 'Indicative term', value: 'Case-by-case' },
          ]
        },
        {
          title: 'Perth lender-fit refinance or purchase',
          scenario: 'The borrower needed a cleaner pathway for finance in Perth where speed and clarity mattered.',
          solution: 'A lender with a better fit for the asset, business profile, and timing was selected to keep the transaction moving.',
          outcomes: [
            { label: 'Facility size', value: '$2.1M' },
            { label: 'Primary focus', value: 'Structure reset' },
            { label: 'Market', value: 'Commercial borrower' },
            { label: 'Indicative term', value: 'Case-by-case' },
          ]
        },
      ]}
      relatedLinks={[
        { title: 'Debt Consolidation service page', href: '/services/debt-consolidation', description: 'National overview of consolidation and business-refinance structures.' },
        { title: 'Business Debt Consolidation Australia', href: '/resources/guides/business-debt-consolidation-australia', description: 'Guide to consolidating multiple business debts into cleaner structures.' },
        { title: 'Refinancing Solutions', href: '/services/refinancing-solutions', description: 'Useful if the city scenario includes broader commercial refinance or property restructuring.' }
      ]}
      faqs={[
        { question: 'Can Perth businesses use this facility for different industries?', answer: 'Yes. Industry fit still matters, but many Perth borrowers across services, trade, healthcare, logistics, and other sectors use these structures where the commercial purpose is clear.' },
        { question: 'How quickly can this move in Perth?', answer: 'Timing depends on the lender, transaction complexity, and how ready the information is, but good preparation usually improves speed materially.' },
        { question: 'Does structure matter as much as rate?', answer: 'Usually, yes. A well-matched structure can improve cash flow, timing, and execution even when headline pricing is not the only consideration.' },
        { question: 'Will the lender look closely at the business purpose?', answer: 'Yes. Clear commercial purpose and a sensible repayment or performance story are usually central to lender confidence.' },
        { question: 'Can this be part of a broader business plan?', answer: 'Often, yes. Many transactions work best when considered alongside working capital, refinance, or post-settlement operating needs.' },
      ]}
    />
  );
}
