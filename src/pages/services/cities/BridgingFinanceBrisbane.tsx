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
          title: 'Inner-City Settlement Gap',
          scenario: 'A borrower needed to complete an inner-Brisbane purchase before another sale or refinance had fully settled.',
          solution: 'A short-term bridge allowed the transaction to keep moving while the borrower worked toward the planned exit event.',
          outcomes: [
            { label: 'Security', value: 'Inner-city property' },
            { label: 'Facility purpose', value: 'Settlement timing bridge' },
            { label: 'Exit path', value: 'Sale / refinance' }
          ]
        },
        {
          title: 'Growth-Corridor Commercial Transition',
          scenario: 'A borrower needed temporary funding for a commercial acquisition while finalising the next-stage funding structure.',
          solution: 'Bridging finance kept the acquisition on track and preserved flexibility while the refinance or project finance path was completed.',
          outcomes: [
            { label: 'Asset type', value: 'Commercial property' },
            { label: 'Facility purpose', value: 'Acquisition bridge' },
            { label: 'Exit path', value: 'Refinance / project funding' }
          ]
        }
      ]}
    />
  );
}
