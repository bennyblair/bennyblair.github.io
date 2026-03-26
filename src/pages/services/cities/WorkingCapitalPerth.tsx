import React from 'react';
import WorkingCapitalCityPage from '@/components/WorkingCapitalCityPage';

export default function WorkingCapitalPerth() {
  return (
    <WorkingCapitalCityPage
      city="Perth"
      state="WA"
      canonical="/services/working-capital/cities/perth"
      title="Working Capital Perth | Business Cash Flow Finance WA | Emet Capital"
      description="Working capital in Perth for businesses managing payroll, stock cycles, contract timing, receivables gaps, and operating cash-flow pressure."
      localIntro="Working capital for Perth businesses that need flexible commercial funding to support operations, growth, and short-term cash-flow pressure without locking into the wrong facility."
      localFocus="Perth working-capital scenarios often reflect contract timing, project mobilisation, trade cycles, stock purchases, and delayed receivables where the business needs a smarter short-term structure rather than a one-size-fits-all loan."
      marketOverview="Perth businesses often operate with more project and contract-driven cash-flow patterns than neat monthly cycles. That makes working-capital fit especially important, because the right facility can support operations while the revenue cycle catches up."
      timingPressures="In Perth, timing pressure commonly appears around payroll, supplier terms, mobilisation costs, BAS and tax obligations, and the gap between work being delivered and cash being received."
      suburbCoverage={[{ title: 'CBD and central business precincts', text: 'Perth CBD and central commercial areas often generate payroll, debtor-timing, and operational-liquidity needs for service businesses.' },
        { title: 'Welshpool, Kewdale, and industrial corridors', text: 'Industrial and logistics businesses in these areas often face stock, fleet, payroll, and contract-mobilisation funding pressure.' },
        { title: 'Canning Vale, Malaga, and outer industrial belts', text: 'Trade and industrial operators commonly need funding aligned to supplier timing, job cycles, and uneven receivables.' }]}
      localUseCases={[{ title: 'Payroll and operating-liquidity support', text: 'Working capital may help Perth businesses bridge short-term timing gaps without disrupting day-to-day operations.' },
        { title: 'Stock and supplier-cycle funding', text: 'Businesses may use short-term funding to support inventory and supplier commitments before cash comes back through trading.' },
        { title: 'Contract and project mobilisation', text: 'Where work starts before revenue lands, working-capital funding can help avoid growth becoming a cash-flow problem.' },
        { title: 'Tax and short-term pressure management', text: 'Facilities may also support businesses through temporary tax or debt timing issues while a more stable solution is arranged.' }]}
      scenarios={[{ title: 'Kewdale mobilisation gap', scenario: 'A transport operator needed payroll and supplier support before contract revenue caught up.', solution: 'Working capital helped bridge mobilisation pressure without overextending internal cash reserves.', outcomes: [{ label: 'Facility size', value: '$540K' }, { label: 'Primary need', value: 'Payroll + supplier support' }, { label: 'Industry', value: 'Transport' }, { label: 'Expected exit', value: 'Contract revenue cycle' }] }, { title: 'Canning Vale stock support', scenario: 'A wholesaler needed capital to hold more stock while waiting for customer payments to normalise.', solution: 'A facility supported stock timing and preserved enough liquidity for the rest of the business.', outcomes: [{ label: 'Facility size', value: '$480K' }, { label: 'Primary need', value: 'Inventory support' }, { label: 'Industry', value: 'Wholesale' }, { label: 'Expected exit', value: 'Stock turn + receipts' }] }, { title: 'Perth receivables timing reset', scenario: 'A service business had strong invoicing but cash was landing too slowly to comfortably support wages and operations.', solution: 'Working-capital funding smoothed the receivables gap and bought time for collections.', outcomes: [{ label: 'Facility size', value: '$310K' }, { label: 'Primary need', value: 'Receivables timing' }, { label: 'Industry', value: 'Services' }, { label: 'Expected exit', value: 'Debtor collections' }] }]}
      relatedLinks={[{ title: 'Working Capital service page', href: '/services/working-capital', description: 'National overview of working-capital facility types.' },
        { title: 'Working Capital Loans for SMEs', href: '/resources/guides/working-capital-loans-for-smes', description: 'Guide to business cash-flow support and lender fit.' },
        { title: 'Debtor Finance & Supply Chain Finance', href: '/resources/guides/debtor-finance-supply-chain-finance-australia', description: 'Useful if the Perth issue is tied more directly to receivables and supply timing.' }]}
      faqs={[{ question: 'When might a Perth business use working-capital finance?', answer: 'Usually when the business is commercially sound but under temporary pressure from payroll, stock, receivables, or contract timing.' },
        { question: 'Can working-capital facilities help with project mobilisation?', answer: 'Potentially, yes. Some businesses use them specifically to support labour, suppliers, and setup costs before revenue from the project begins to flow back.' },
        { question: 'Is security always required?', answer: 'Not always. The structure depends on the lender, the request size, the industry, and the business profile.' },
        { question: 'Do lenders care what the money is being used for?', answer: 'Yes. A clear commercial purpose usually helps, especially where the facility is meant to solve a defined timing problem.' },
        { question: 'How quickly can Perth working-capital finance move?', answer: 'Timing depends on the facility type and the lender, but cleaner files with ready financial information can move more efficiently.' }]}
    />
  );
}
