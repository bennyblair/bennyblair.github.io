import React from 'react';
import WorkingCapitalCityPage from '@/components/WorkingCapitalCityPage';

export default function WorkingCapitalAdelaide() {
  return (
    <WorkingCapitalCityPage
      city="Adelaide"
      state="SA"
      canonical="/services/working-capital/cities/adelaide"
      title="Working Capital Adelaide | Business Cash Flow Finance SA | Emet Capital"
      description="Working capital in Adelaide for businesses dealing with payroll, supplier timing, stock cycles, tax obligations, and debtor gaps."
      localIntro="Working capital for Adelaide businesses that need flexible commercial funding to support operations, stock, payroll, and growth without leaning on the wrong long-term structure."
      localFocus="Adelaide working-capital pressure often comes from payroll, supplier timing, stock purchases, debtor delays, and tax obligations across trade, industrial, healthcare, and service businesses."
      marketOverview="Adelaide businesses often run with leaner balance sheets and tighter operating cycles, so a short-term timing gap can become meaningful quickly. The right working-capital facility can support continuity without forcing long-term debt onto a short-term problem."
      timingPressures="In Adelaide, timing pressure commonly appears around wages, stock, BAS and ATO obligations, debtor delays, and growth opportunities where expenses arrive before the matching cash receipts."
      suburbCoverage={[{ title: 'CBD and inner commercial precincts', text: 'Adelaide CBD and surrounding commercial precincts often generate payroll and receivable-gap needs for service, professional, and mixed commercial businesses.' },
        { title: 'Wingfield, Regency Park, and industrial corridors', text: 'Industrial and wholesale businesses in these areas commonly need support for stock, supplier terms, and short-term operating pressure.' },
        { title: 'Southern and outer growth markets', text: 'Lonsdale, Edinburgh, and nearby trade corridors often produce mobilisation, payroll, and inventory-led working-capital needs.' }]}
      localUseCases={[{ title: 'Payroll and operating expenses', text: 'Working-capital funding may help smooth the timing between outgoing business costs and incoming revenue.' },
        { title: 'Stock and supplier support', text: 'Adelaide wholesalers and distributors may need funding to secure inventory without choking the rest of the business.' },
        { title: 'Growth and mobilisation funding', text: 'A facility can help businesses take on more work where costs arrive earlier than project income.' },
        { title: 'Temporary tax and cash-flow pressure', text: 'Some businesses use short-term commercial funding to stabilise tax timing or urgent liquidity pressure.' }]}
      scenarios={[{ title: 'Regency Park stock funding', scenario: 'A distribution business needed more inventory to support sales growth but could not comfortably absorb the full upfront supplier cost.', solution: 'Working capital supported the stock cycle and left room for payroll and general operations.', outcomes: [{ label: 'Facility size', value: '$410K' }, { label: 'Primary need', value: 'Inventory + supplier support' }, { label: 'Industry', value: 'Distribution' }, { label: 'Expected exit', value: 'Inventory turn' }] }, { title: 'CBD receivables gap', scenario: 'A service business had good invoice flow but slower-than-expected collections created payroll pressure.', solution: 'A working-capital line helped bridge the timing gap while collections improved.', outcomes: [{ label: 'Facility size', value: '$240K' }, { label: 'Primary need', value: 'Payroll support' }, { label: 'Industry', value: 'Services' }, { label: 'Expected exit', value: 'Receivables collection' }] }, { title: 'Lonsdale mobilisation support', scenario: 'A trade operator needed upfront capital to take on a larger piece of work before progress payments commenced.', solution: 'The facility helped fund labour and setup costs without forcing the business to decline the job.', outcomes: [{ label: 'Facility size', value: '$330K' }, { label: 'Primary need', value: 'Mobilisation' }, { label: 'Industry', value: 'Trade' }, { label: 'Expected exit', value: 'Project cash flow' }] }]}
      relatedLinks={[{ title: 'Working Capital service page', href: '/services/working-capital', description: 'National overview of flexible business cash-flow funding.' },
        { title: 'Working Capital Loans for SMEs', href: '/resources/guides/working-capital-loans-for-smes', description: 'Guide to short-term commercial funding fit.' },
        { title: 'Business Debt Consolidation Australia', href: '/resources/guides/business-debt-consolidation-australia', description: 'Useful if the Adelaide issue is tied to multiple short-term debts rather than one pure cash-flow gap.' }]}
      faqs={[{ question: 'When might an Adelaide business use working-capital finance?', answer: 'Usually when a viable business is under short-term pressure from payroll, stock, receivables, or tax timing rather than from a deeper structural problem.' },
        { question: 'Can working-capital funding help with growth?', answer: 'Yes. Many businesses use it to support larger jobs, inventory build-ups, and contract mobilisation.' },
        { question: 'Does the facility have to be secured?', answer: 'Not always. Some facilities are unsecured, while others use debtors, stock, property, or other supporting assets depending on the lender.' },
        { question: 'What do lenders usually want to understand?', answer: 'They usually want to know what the facility is for, how the business trades, and why the cash-flow gap is sensible and manageable.' },
        { question: 'How quickly can Adelaide working-capital finance move?', answer: 'Timing varies by structure and lender, but simpler well-documented files can move faster than more complex or poorly prepared requests.' }]}
    />
  );
}
