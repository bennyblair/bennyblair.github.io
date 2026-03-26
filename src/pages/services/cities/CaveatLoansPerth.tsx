import React from 'react';
import CaveatLoansCityPage from '@/components/CaveatLoansCityPage';

export default function CaveatLoansPerth() {
  return (
    <CaveatLoansCityPage
      city="Perth"
      state="WA"
      canonical="/services/caveat-loans/cities/perth"
      title="Caveat Loans Perth | Urgent Property-Secured Business Finance | Emet Capital"
      description="Caveat loans in Perth for urgent business-purpose funding secured against property where timing is critical and a slower lending process will not get the deal done."
      localIntro="Caveat loans for Perth borrowers who need short-term property-backed capital quickly when the security is workable and the commercial issue cannot wait for a normal bank process."
      localFocus="Perth caveat-lending situations often involve refinance pressure, tax debt, project timing, urgent settlements, and business-purpose liquidity needs where the borrower has equity but needs fast execution more than a perfect long-form structure."
      marketOverview="Perth borrowers often hold meaningful equity in residential, industrial, and commercial property, which can make caveat finance workable when time is the real issue. But even in urgent deals, lenders still want comfort around title, leverage, and the intended exit event."
      timingPressures="In Perth, caveat finance commonly shows up when project timing, business urgency, or an expiring lender creates a short-term problem that needs immediate property-backed support before a longer-term refinance or sale can occur."
      suburbCoverage={[
        { title: 'CBD and central commercial precincts', text: 'Perth CBD and nearby central areas can produce office, mixed-use, and business-purpose caveat scenarios where timing rather than asset quality is the main issue.' },
        { title: 'Welshpool, Kewdale, and industrial corridors', text: 'These industrial and logistics precincts often generate refinance-gap and urgent liquidity caveat files backed by industrial or business-linked property.' },
        { title: 'Canning Vale, Malaga, and outer business markets', text: 'Owner-occupied industrial and mixed residential-commercial property in these areas can support caveat lending where the borrower needs fast settlement or short-term breathing room.' }
      ]}
      localUseCases={[
        { title: 'Short-term refinance protection', text: 'A caveat loan may help where the borrower needs to clear an existing facility before the replacement debt has fully landed.' },
        { title: 'Urgent tax or creditor pressure', text: 'Perth business owners sometimes use caveat lending to solve immediate tax or creditor issues while preparing a more stable debt plan.' },
        { title: 'Settlement and transaction urgency', text: 'Caveat finance may support urgent business-purpose or commercial settlements where the borrower cannot wait for a longer approval cycle.' },
        { title: 'Project or business cash-flow emergencies', text: 'Where there is real property equity and a short-term commercial funding need, caveat lending may provide a workable interim tool.' }
      ]}
      scenarios={[
        { title: 'Kewdale lender maturity bridge', scenario: 'A borrower with industrial security in Kewdale needed to repay an expiring facility before replacement finance was ready to settle.', solution: 'A short-term caveat loan created enough runway to avoid distressed action and complete the refinance more cleanly.', outcomes: [
          { label: 'Security value', value: '$2.75M industrial property' },
          { label: 'Caveat facility', value: '$1.48M' },
          { label: 'Pressure point', value: 'Maturing facility' },
          { label: 'Expected exit', value: 'Refinance in 3 months' }
        ]},
        { title: 'ATO pressure backed by property equity', scenario: 'A Perth business owner needed urgent capital to resolve tax debt while arranging a broader debt restructure using available property security.', solution: 'Caveat finance dealt with the immediate ATO problem and bought time for the borrower to transition into a cleaner medium-term outcome.', outcomes: [
          { label: 'Security type', value: 'Investment property equity' },
          { label: 'Caveat facility', value: '$395K' },
          { label: 'Commercial purpose', value: 'Tax debt resolution' },
          { label: 'Planned exit', value: 'Refinance / restructure' }
        ]},
        { title: 'Perth urgent acquisition support', scenario: 'An investor needed short-term capital to preserve a commercial purchase while permanent debt was still being assessed.', solution: 'A caveat-backed facility against separate property security preserved the transaction and allowed more time for the takeout debt to be completed.', outcomes: [
          { label: 'Purpose', value: 'Urgent acquisition support' },
          { label: 'Caveat facility', value: '$840K' },
          { label: 'Pressure point', value: 'Settlement timing' },
          { label: 'Expected exit', value: 'Takeout refinance / sale' }
        ]}
      ]}
      relatedLinks={[
        { title: 'Caveat Loans service page', href: '/services/caveat-loans', description: 'National overview of caveat lending and urgent property-backed funding use cases.' },
        { title: 'Urgent Caveat Loans', href: '/resources/guides/urgent-caveat-loans', description: 'Helpful if the Perth issue is mainly about speed and emergency settlement.' },
        { title: 'Caveat Loans Australia: Complete Guide', href: '/resources/guides/caveat-loans-australia-complete-guide', description: 'Long-form guide covering caveat lending risks, costs, and mechanics.' }
      ]}
      faqs={[
        { question: 'When might a Perth borrower use a caveat loan?', answer: 'Usually when funding is needed urgently, the borrower has usable property security, and a mainstream lender cannot move fast enough. Refinance gaps, tax pressure, and urgent settlements are common triggers.' },
        { question: 'Can caveat loans help with tax debt in Perth?', answer: 'Potentially, yes. If the debt issue is business-related and the borrower has suitable security plus a clear exit strategy, caveat finance may be one short-term option.' },
        { question: 'How quickly can a Perth caveat loan move?', answer: 'Some straightforward files can settle quickly, but actual speed still depends on title, legal readiness, and how cleanly the security can be documented.' },
        { question: 'Do caveat lenders focus mainly on the property?', answer: 'The security is central, but lenders also care about leverage, title position, the commercial purpose, and the expected repayment path.' },
        { question: 'Is caveat finance designed for long-term borrowing?', answer: 'No. It is generally a short-term tool used to solve urgent commercial funding problems while a longer-term exit is being executed.' }
      ]}
    />
  );
}
