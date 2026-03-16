import React from 'react';
import FirstSecondMortgagesCityPage from '@/components/FirstSecondMortgagesCityPage';

export default function FirstSecondMortgagesBrisbane() {
  return (
    <FirstSecondMortgagesCityPage
      city="Brisbane"
      state="QLD"
      canonical="/services/first-second-mortgages/cities/brisbane"
      title="1st & 2nd Mortgages Brisbane | Commercial Property Finance | Emet Capital"
      description="Commercial first and second mortgages in Brisbane for acquisitions, refinance deadlines, equity release, and business-purpose property transactions across the city and southeast Queensland corridors."
      localIntro="Commercial first and second mortgages for Brisbane borrowers who need property-backed capital without forcing a one-size-fits-all bank process onto a time-sensitive deal."
      localFocus="In Brisbane that may include warehouse purchases in the south, owner-occupied office acquisitions in middle-ring suburbs, second mortgage top-ups against investment property, and refinance situations tied to growth-market assets where the next step is clear but not yet finished."
      marketOverview="Brisbane keeps attracting borrowers because the market still offers relative value, active development corridors, and strong industrial demand. That can help lender appetite, but it also means good assets move quickly. For first and second mortgage borrowers, the challenge is usually less about whether a property has value and more about whether the structure, timing, and business purpose are properly aligned."
      timingPressures="Timing pressure in Brisbane often comes from short acquisition windows, maturing debt, lease rollover, and business expansion tied to property security. Second mortgage requests also show up when a borrower wants capital to move on an opportunity before a full refinance is worthwhile."
      suburbCoverage={[
        {
          title: 'CBD, Fortitude Valley, and inner-ring mixed-use precincts',
          text: 'Brisbane CBD, Fortitude Valley, South Brisbane, Newstead, and Woolloongabba regularly produce office and mixed-use mortgage files where tenancy quality and future refinanceability matter.'
        },
        {
          title: 'South and west industrial corridors',
          text: 'Rocklea, Acacia Ridge, Richlands, Darra, and Wacol often suit owner-occupied and investor warehouse transactions where security value and lease profile are easier for lenders to get comfortable with.'
        },
        {
          title: 'Northside and growth corridors',
          text: 'Chermside, North Lakes, Eagle Farm, and airport-linked precincts can generate acquisition, refinance, and equity-release demand tied to commercial premises, logistics assets, and business expansion.'
        }
      ]}
      localUseCases={[
        {
          title: 'First mortgages for growth-market acquisitions',
          text: 'Brisbane buyers often use first mortgages to secure commercial premises or investment property while market conditions and pricing still suit their strategy.'
        },
        {
          title: 'Second mortgages against established equity',
          text: 'A second mortgage may help where the borrower has a strong equity buffer in Brisbane property and needs capital for expansion, a deposit, or a linked commercial transaction without replacing the senior debt.'
        },
        {
          title: 'Refinance pressure on maturing facilities',
          text: 'Some Brisbane files need a new first mortgage because the current lender is exiting, repricing, or no longer aligned with the borrower’s time frame or asset plan.'
        },
        {
          title: 'Business-led property funding',
          text: 'Mortgages can also support shareholder changes, fit-outs, operational upgrades, and strategic business moves where the property is central to the deal and the purpose remains commercial.'
        }
      ]}
      scenarios={[
        {
          title: 'Rocklea Warehouse Purchase',
          scenario: 'A transport operator wanted to acquire a Rocklea warehouse for $2.9 million to consolidate leased depots into one owner-occupied site. The business needed a lender comfortable with the property, the operational story, and a shorter settlement period than a mainstream bank would accept.',
          solution: 'A first mortgage of $1.95 million was structured around the warehouse security, trading history, and owner-occupied use. That gave the borrower control of the site while preserving working capital for the operating business.',
          outcomes: [
            { label: 'Purchase price', value: '$2.9M' },
            { label: 'First mortgage', value: '$1.95M' },
            { label: 'Indicative leverage', value: '67% LVR' },
            { label: 'Property use', value: 'Owner-occupied industrial' }
          ]
        },
        {
          title: 'Fortitude Valley Equity Release',
          scenario: 'An investor held a Fortitude Valley mixed-use property valued at $3.35 million with a senior debt balance of $1.8 million. They needed additional capital for a business acquisition deposit but wanted to keep the existing first mortgage in place.',
          solution: 'A second mortgage of $500,000 was arranged behind the current senior lender, with emphasis on the property value, moderate combined leverage, and a clean business-purpose rationale for the funds.',
          outcomes: [
            { label: 'Security value', value: '$3.35M mixed-use asset' },
            { label: 'Existing first mortgage', value: '$1.8M' },
            { label: 'Second mortgage', value: '$500K' },
            { label: 'Combined leverage', value: '69% LVR' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: '1st & 2nd Mortgages service page',
          href: '/services/first-second-mortgages',
          description: 'Service overview covering common structures, lender fit, and commercial use cases.'
        },
        {
          title: 'First and Second Mortgages for Business',
          href: '/resources/guides/first-and-second-mortgages-for-business',
          description: 'Useful if you are comparing first-position debt with a second mortgage top-up.'
        },
        {
          title: 'Commercial Property Loan Eligibility',
          href: '/resources/guides/commercial-property-loan-eligibility-what-you-need-to-qualify',
          description: 'Helpful for understanding how lenders review commercial property borrowers before approval.'
        }
      ]}
      faqs={[
        {
          question: 'Can Brisbane borrowers use a second mortgage instead of a full refinance?',
          answer: 'Potentially, yes. That can make sense when the first mortgage still works and the borrower only needs additional capital for a clear business purpose.'
        },
        {
          question: 'Are first mortgages available for owner-occupied commercial property in Brisbane?',
          answer: 'Yes. Warehouses, offices, and other business premises may be suitable where the asset and borrower fit commercial lender policy.'
        },
        {
          question: 'What matters most in a Brisbane mortgage file?',
          answer: 'Lenders usually focus on the property, leverage, business purpose, document readiness, and how practical the overall structure is.'
        },
        {
          question: 'Can investors use first and second mortgages on Brisbane mixed-use assets?',
          answer: 'They may be able to, depending on the tenancy mix, valuation support, title profile, and how the requested debt sits against the property value.'
        },
        {
          question: 'Does Emet Capital provide consumer lending?',
          answer: 'No. These pages relate to commercial lending solutions for eligible business borrowers only.'
        }
      ]}
    />
  );
}
