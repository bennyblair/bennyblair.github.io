import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinancePerth() {
  return (
    <BridgingFinanceCityPage
      city="Perth"
      state="WA"
      canonical="/services/bridging-finance/cities/perth"
      title="Bridging Finance Perth | WA Commercial Finance | Emet Capital"
      description="Fast bridging finance in Perth for commercial property, refinance deadlines, acquisition timing gaps, and time-sensitive business-backed transactions."
      localIntro="Bridging finance for Perth property transactions, refinance deadlines, acquisition timing gaps, and short-term commercial scenarios across key industrial, coastal, and inner-metro markets."
      localFocus="That may include industrial and logistics property, mixed-use acquisitions, refinance pressure, development timing gaps, and short-term opportunities where the exit is visible but not yet complete."
      scenarios={[
        {
          title: 'Kewdale industrial settlement gap',
          scenario: 'A borrower needed to settle on a Perth industrial asset before the refinance of another property had completed.',
          solution: 'A short-term bridging structure kept the acquisition moving while the refinance remained the planned exit path.',
          outcomes: [
            { label: 'Asset type', value: 'Industrial property' },
            { label: 'Facility purpose', value: 'Settlement timing bridge' },
            { label: 'Exit path', value: 'Refinance' }
          ]
        },
        {
          title: 'Inner-metro mixed-use acquisition',
          scenario: 'A borrower needed temporary finance to secure a mixed-use Perth opportunity while final credit approval on the long-term facility was still in progress.',
          solution: 'Bridging finance created continuity so the borrower could complete the purchase and then transition to the intended longer-term structure.',
          outcomes: [
            { label: 'Security', value: 'Mixed-use property' },
            { label: 'Facility purpose', value: 'Acquisition bridge' },
            { label: 'Exit path', value: 'Long-term refinance' }
          ]
        }
      ]}
    />
  );
}
