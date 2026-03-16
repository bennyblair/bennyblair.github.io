import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinanceGoldCoast() {
  return (
    <BridgingFinanceCityPage
      city="Gold Coast"
      state="QLD"
      canonical="/services/bridging-finance/cities/gold-coast"
      title="Bridging Finance Gold Coast | QLD Commercial Finance | Emet Capital"
      description="Fast bridging finance on the Gold Coast for commercial property, refinance deadlines, acquisition timing gaps, and time-sensitive business-backed transactions."
      localIntro="Bridging finance for Gold Coast property transactions, refinance deadlines, acquisition timing gaps, and short-term commercial scenarios across coastal, canal-front, and growth-market locations."
      localFocus="That may include mixed-use acquisitions, commercial refinance pressure, development timing gaps, premium property-backed commercial scenarios, and short-term opportunities where the exit is visible but not yet complete."
      scenarios={[
        {
          title: 'Broadbeach mixed-use acquisition',
          scenario: 'A borrower needed temporary finance to secure a Gold Coast mixed-use property while a refinance on another asset was still being completed.',
          solution: 'A bridging structure protected the acquisition timing and gave the borrower time to complete the intended refinance exit.',
          outcomes: [
            { label: 'Asset type', value: 'Mixed-use property' },
            { label: 'Facility purpose', value: 'Acquisition bridge' },
            { label: 'Exit path', value: 'Refinance' }
          ]
        },
        {
          title: 'Southport settlement deadline',
          scenario: 'A borrower needed short-term funding to complete a Gold Coast commercial settlement before another sale or liquidity event had finalised.',
          solution: 'Bridging finance kept the transaction on track while the borrower worked toward the planned repayment event.',
          outcomes: [
            { label: 'Security', value: 'Commercial property' },
            { label: 'Facility purpose', value: 'Settlement timing bridge' },
            { label: 'Exit path', value: 'Sale / refinance' }
          ]
        }
      ]}
    />
  );
}
