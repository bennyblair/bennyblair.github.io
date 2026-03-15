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
          title: 'Brighton-style premium timing gap',
          text: 'A borrower needing to secure a premium Sydney property position before another sale completed may use bridging finance to avoid losing momentum while the exit catches up.'
        },
        {
          title: 'Inner-west value-add opportunity',
          text: 'A short-term facility may suit a commercial or mixed-use opportunity where the asset has a clear repositioning or refinance path after acquisition.'
        }
      ]}
    />
  );
}
