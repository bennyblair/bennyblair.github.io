import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinanceAdelaide() {
  return (
    <BridgingFinanceCityPage
      city="Adelaide"
      state="SA"
      canonical="/services/bridging-finance/cities/adelaide"
      title="Bridging Finance Adelaide | SA Commercial Finance | Emet Capital"
      description="Fast bridging finance in Adelaide for commercial property, refinance deadlines, acquisition timing gaps, and time-sensitive business-backed transactions."
      localIntro="Bridging finance for Adelaide property transactions, refinance deadlines, purchase-before-sale scenarios, and short-term commercial situations across established and growth-market suburbs."
      localFocus="That may include mixed-use acquisitions, owner-occupied commercial premises, infill development timing gaps, refinance pressure, and short-term opportunities where the repayment path is clear but not yet complete."
      scenarios={[
        {
          title: 'Norwood office refinance transition',
          scenario: 'A borrower needed short-term funding to bridge an Adelaide office refinance while the replacement lender completed its final conditions.',
          solution: 'A temporary bridge allowed the existing debt to be repaid on time while the borrower worked toward the planned refinance exit.',
          outcomes: [
            { label: 'Asset type', value: 'Office property' },
            { label: 'Facility purpose', value: 'Refinance timing bridge' },
            { label: 'Exit path', value: 'Incoming refinance' }
          ]
        },
        {
          title: 'Glenelg purchase-before-sale window',
          scenario: 'A borrower wanted to secure an Adelaide coastal property before the sale of another asset had settled.',
          solution: 'Bridging finance created room for the purchase to proceed first while the sale remained the intended repayment event.',
          outcomes: [
            { label: 'Security', value: 'Premium Adelaide property' },
            { label: 'Facility purpose', value: 'Purchase timing bridge' },
            { label: 'Exit path', value: 'Sale of existing property' }
          ]
        }
      ]}
    />
  );
}
