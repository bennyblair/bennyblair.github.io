import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinanceSydney() {
  return (
    <BridgingFinanceCityPage
      city="Sydney"
      state="NSW"
      canonical="/services/bridging-finance/cities/sydney"
      title="Bridging Finance Sydney | NSW Commercial Finance | Emet Capital"
      description="Fast bridging finance in Sydney for commercial property, refinance deadlines, auction purchases, and time-sensitive business-backed transactions."
      localIntro="Bridging finance for Sydney property transactions, refinance deadlines, auction settlements, and time-sensitive commercial scenarios across Greater Sydney."
      localFocus="That may include premium residential-backed business scenarios, commercial acquisitions, development site timing gaps, and refinance events where the next funding step is clear but not ready yet."
      scenarios={[
        {
          title: 'Eastern Suburbs Upgrade Window',
          scenario: 'A borrower needed to secure a premium Sydney property position before another sale completed.',
          solution: 'A bridging structure protected the purchase timing while the planned exit stayed tied to the sale of the current property.',
          outcomes: [
            { label: 'Security', value: 'Premium Sydney property' },
            { label: 'Facility purpose', value: 'Upgrade timing bridge' },
            { label: 'Exit path', value: 'Sale of existing property' }
          ]
        },
        {
          title: 'Inner-West Mixed-Use Opportunity',
          scenario: 'A borrower needed short-term funding to secure a mixed-use opportunity while refinance planning was still being finalised.',
          solution: 'Bridging finance created room for the acquisition to complete while the borrower moved toward the intended longer-term funding solution.',
          outcomes: [
            { label: 'Asset type', value: 'Mixed-use property' },
            { label: 'Facility purpose', value: 'Acquisition bridge' },
            { label: 'Exit path', value: 'Refinance' }
          ]
        }
      ]}
    />
  );
}
