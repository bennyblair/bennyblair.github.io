import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinanceMelbourne() {
  return (
    <BridgingFinanceCityPage
      city="Melbourne"
      state="VIC"
      canonical="/services/bridging-finance/cities/melbourne"
      title="Bridging Finance Melbourne | VIC Commercial Finance | Emet Capital"
      description="Fast bridging finance in Melbourne for commercial property, refinance deadlines, auction purchases, and time-sensitive business-backed transactions."
      localIntro="Bridging finance for Melbourne property transactions, refinance deadlines, auction settlements, and time-sensitive commercial scenarios across inner, middle, and growth-market suburbs."
      localFocus="That may include premium residential-backed business scenarios, commercial acquisitions, development-related timing gaps, and refinance events where the next funding step is clear but not ready yet."
      scenarios={[
        {
          title: 'Brighton Family Home Upgrade',
          scenario: 'A borrower needed to secure a premium Melbourne property upgrade before the sale of their existing home had settled.',
          solution: 'A short-term bridging structure created room for the purchase to proceed first while the planned exit remained tied to the sale of the current property.',
          outcomes: [
            { label: 'Security', value: 'Premium residential property' },
            { label: 'Facility purpose', value: 'Upgrade timing bridge' },
            { label: 'Exit path', value: 'Sale of existing property' }
          ]
        },
        {
          title: 'Footscray Townhouse Development',
          scenario: 'A borrower needed short-term finance to hold a development position while the next funding stage was being finalised.',
          solution: 'Bridging finance provided transaction continuity so the borrower could protect the opportunity while completing the next refinance or project funding step.',
          outcomes: [
            { label: 'Asset type', value: 'Townhouse development site' },
            { label: 'Facility purpose', value: 'Development timing bridge' },
            { label: 'Exit path', value: 'Refinance / next-stage funding' }
          ]
        }
      ]}
    />
  );
}
