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
      localIntro="Commercial first and second mortgages for Brisbane borrowers working in a market that still feels comparatively value-driven, but increasingly rewards speed, clean documentation, and lender alignment as competition for good commercial assets intensifies."
      localFocus="In Brisbane that may include warehouse acquisitions through Rocklea and Acacia Ridge, office and mixed-use funding across inner-city precincts, a second mortgage behind existing debt on a Newstead or Fortitude Valley asset, or refinance support for a business expanding through the wider southeast Queensland corridor."
      marketOverview="Brisbane continues to draw businesses and investors looking for relative value, population growth, and strong industrial demand. That helps lender appetite for well-located commercial property, but not every asset is treated equally. Inner-ring office, trade-oriented industrial, airport-linked logistics, and mixed-use stock all sit in different credit buckets. First and second mortgage borrowers usually perform best when the asset story, business rationale, and timeline are explained in a way that matches the local market rather than a generic national template."
      timingPressures="Timing pressure in Brisbane often comes from shorter contract deadlines, maturing debt that no longer suits the borrower, lease rollover around owner-occupied purchases, or business expansion plans that need capital before a longer refinance is practical. Second mortgage requests are also common where a first mortgage is still workable but additional funds are needed quickly for a defined commercial step."
      suburbCoverage={[
        {
          title: 'CBD, Fortitude Valley, and inner-ring precincts',
          text: 'Brisbane CBD, Fortitude Valley, Newstead, South Brisbane, and Woolloongabba regularly produce office and mixed-use mortgage files where tenancy quality, strata detail, and forward leasing strength influence lender appetite.'
        },
        {
          title: 'South and west industrial corridors',
          text: 'Rocklea, Acacia Ridge, Richlands, Darra, Wacol, and nearby trade precincts are common locations for owner-occupied warehouse purchases, refinance work, and industrial equity release tied to operating businesses.'
        },
        {
          title: 'Northside and gateway logistics markets',
          text: 'Eagle Farm, Hendra, Pinkenba, North Lakes, and Chermside can generate mortgage demand linked to logistics property, business premises upgrades, and commercial acquisitions connected to broader southeast Queensland growth.'
        }
      ]}
      localUseCases={[
        {
          title: 'First mortgages for growth-market acquisitions',
          text: 'Brisbane borrowers often use first mortgages to secure commercial premises or investment property while market conditions and pricing still support their medium-term strategy.'
        },
        {
          title: 'Second mortgages against embedded equity',
          text: 'A second mortgage may help where the borrower has a meaningful equity buffer in Brisbane property and needs capital for expansion, deposits, fit-out, or acquisition support without replacing senior debt.'
        },
        {
          title: 'Refinance pressure on maturing facilities',
          text: 'Some Brisbane files require a new first mortgage because the current lender is exiting, repricing, or no longer aligned with the borrower’s time frame, documentation profile, or asset plan.'
        },
        {
          title: 'Business-led funding tied to property',
          text: 'Mortgage-backed capital may also support shareholder changes, operational upgrades, and strategic growth initiatives where commercial property security is central to the transaction.'
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
          question: 'Why do Brisbane borrowers often use first mortgages for owner-occupied warehouses?',
          answer: 'Because southeast Queensland industrial markets remain strategically important for many operating businesses, and owning the premises can provide more long-term control than staying exposed to lease renewals in a tightening corridor.'
        },
        {
          question: 'Can a Brisbane second mortgage be used for a deposit on another commercial purchase?',
          answer: 'Potentially, yes, if the existing property has sufficient equity, the purpose of funds is clearly commercial, and the total debt position remains sensible for the security offered.'
        },
        {
          question: 'What tends to move fastest in Brisbane mortgage transactions?',
          answer: 'Well-located industrial and practical mixed commercial assets often move quickly, which means borrowers usually benefit from preparing valuations, company documents, and legal information early rather than waiting for a formal approval stage.'
        },
        {
          question: 'Is a second mortgage only a short-term fix?',
          answer: 'Not always. Some second mortgages are transitional, but others are deliberately structured as part of a wider capital stack where the first mortgage remains attractive and the additional debt solves a separate business need.'
        },
        {
          question: 'Does Emet Capital provide consumer lending?',
          answer: 'No. These pages relate to commercial lending solutions for eligible business borrowers only.'
        }
      ]}
    />
  );
}
