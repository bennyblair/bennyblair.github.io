import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinanceBrisbane() {
  return (
    <BridgingFinanceCityPage
      city="Brisbane"
      state="QLD"
      canonical="/services/bridging-finance/cities/brisbane"
      title="Bridging Finance Brisbane | QLD Commercial Finance | Emet Capital"
      description="Fast bridging finance in Brisbane for commercial property, refinance deadlines, auction purchases, and time-sensitive business-backed transactions."
      localIntro="Bridging finance for Brisbane property transactions, refinance deadlines, auction settlements, and time-sensitive commercial scenarios across key growth corridors and commercial precincts."
      localFocus="That may include acquisition timing gaps, project-related transitions, commercial refinance deadlines, and short-term opportunities where the exit is visible but not yet complete."
      scenarios={[
        {
          title: 'Inner-city settlement timing gap',
          text: 'A borrower securing a Brisbane asset before another sale or refinance completed may use bridging finance to keep the transaction moving.'
        },
        {
          title: 'Growth-corridor commercial transition',
          text: 'A short-term facility may suit a commercial or mixed-use opportunity where there is a clear repositioning, sale, or refinance path after acquisition.'
        }
      ]}
    />
  );
}
