import React from 'react';
import FirstSecondMortgagesCityPage from '@/components/FirstSecondMortgagesCityPage';

export default function FirstSecondMortgagesMelbourne() {
  return (
    <FirstSecondMortgagesCityPage
      city="Melbourne"
      state="VIC"
      canonical="/services/first-second-mortgages/cities/melbourne"
      title="1st & 2nd Mortgages Melbourne | Commercial Property Finance | Emet Capital"
      description="Commercial first and second mortgages in Melbourne for acquisitions, refinance timing gaps, equity release, and business-purpose property deals where structure and execution both matter."
      localIntro="Commercial first and second mortgages for Melbourne borrowers who need property-backed funding that matches the asset, the purpose, and the pace of the deal."
      localFocus="In Melbourne that can include owner-occupied industrial purchases in the southeast, investment property refinancing across the inner city, second mortgage capital against premium assets in Bayside and the inner east, and logistics or warehouse transactions in western growth corridors."
      marketOverview="Melbourne offers scale, diversity, and a broad lender base, but it also rewards well-structured files. Office, industrial, mixed-use, and owner-occupied assets can all be financeable, yet lender appetite changes quickly depending on vacancy, lease quality, title complexity, and whether the borrower needs a first mortgage, a second mortgage, or a staged solution."
      timingPressures="Timing pressure in Melbourne often appears when an outgoing lender is nearing maturity, a buyer wants to settle before another asset sale completes, or a business needs capital without refinancing a senior facility that still works. The structure matters because not every timing problem should be solved with the same product."
      suburbCoverage={[
        {
          title: 'CBD, city fringe, and inner north',
          text: 'Melbourne CBD, Southbank, Richmond, Collingwood, and Carlton often produce office, hospitality, and mixed-use mortgage scenarios where documentation quality and tenancy profile influence lender confidence.'
        },
        {
          title: 'Bayside and the inner east',
          text: 'Brighton, Hawthorn, Kew, Camberwell, and South Yarra can generate larger-value first and second mortgage opportunities supported by stronger equity positions but still needing a commercially sensible use of funds.'
        },
        {
          title: 'West, southeast, and industrial corridors',
          text: 'Dandenong South, Laverton North, Truganina, Sunshine, and Epping regularly see warehouse, industrial, and owner-occupied scenarios where lenders focus on marketability and business durability.'
        }
      ]}
      localUseCases={[
        {
          title: 'Industrial owner-occupied purchases',
          text: 'Melbourne businesses often use first mortgages to acquire warehouses, factories, and trade premises where occupancy supports long-term operational control.'
        },
        {
          title: 'Second mortgages for expansion capital',
          text: 'A second mortgage may suit a borrower who wants additional capital for growth, equipment, fit-out, or acquisition support while preserving an existing first mortgage that still offers acceptable terms.'
        },
        {
          title: 'Refinance and maturity management',
          text: 'When a lender is expiring or repricing, a new first mortgage or an interim second mortgage structure may buy time and flexibility while a longer-term refinance is completed more cleanly.'
        },
        {
          title: 'Investor repositioning and value-add work',
          text: 'Investors may use first or second mortgage debt to reposition an asset, complete leasing works, or support a transition before a later refinance or disposal event.'
        }
      ]}
      scenarios={[
        {
          title: 'Dandenong South Warehouse Expansion',
          scenario: 'A manufacturing business owned a Dandenong South warehouse valued at $5.25 million with a senior mortgage balance of $2.9 million. The business needed capital for a new production line and warehouse upgrades but did not want to refinance the whole facility during a strong trading period.',
          solution: 'A second mortgage of $900,000 was structured behind the existing senior loan. The file worked because the warehouse security was well understood, leverage remained controlled, and the use of funds was clearly tied to business growth rather than a vague equity release request.',
          outcomes: [
            { label: 'Security value', value: '$5.25M warehouse' },
            { label: 'Existing first mortgage', value: '$2.9M' },
            { label: 'Second mortgage', value: '$900K' },
            { label: 'Combined leverage', value: '72% LVR' }
          ]
        },
        {
          title: 'Richmond Mixed-Use Refinance',
          scenario: 'An investor held a Richmond mixed-use asset valued at $3.6 million with an expiring facility and lease renewals underway. A standard bank refinance was possible, but not before the existing lender required discharge.',
          solution: 'A first mortgage refinance of $2.2 million stabilised the position and gave the borrower time to complete the leasing strategy before revisiting the long-term debt market. The deal was underwritten around asset quality, tenant mix, and a realistic next-step plan.',
          outcomes: [
            { label: 'Security value', value: '$3.6M mixed-use asset' },
            { label: 'Refinance facility', value: '$2.2M' },
            { label: 'Indicative leverage', value: '61% LVR' },
            { label: 'Expected review', value: 'After lease-up program' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: '1st & 2nd Mortgages service page',
          href: '/services/first-second-mortgages',
          description: 'National overview of first mortgage and second mortgage options for business borrowers.'
        },
        {
          title: 'Second Mortgages for Business Guide',
          href: '/resources/guides/second-mortgages-for-business-guide',
          description: 'Helpful if you are assessing whether layered debt is cleaner than a full refinance.'
        },
        {
          title: 'Commercial Property Loans Australia',
          href: '/resources/guides/commercial-property-loans-australia-complete-guide',
          description: 'Broader guide for borrowers comparing mainstream and specialist property finance structures.'
        }
      ]}
      faqs={[
        {
          question: 'What is the difference between a first mortgage and a second mortgage in Melbourne?',
          answer: 'A first mortgage sits in primary security position. A second mortgage sits behind that first lender and usually relies more heavily on remaining equity and the overall structure making commercial sense.'
        },
        {
          question: 'Can a Melbourne business use a second mortgage for expansion?',
          answer: 'Potentially, yes, where the property has sufficient equity, the existing senior debt remains workable, and the use of funds is clearly for a business purpose.'
        },
        {
          question: 'Do lenders only fund industrial assets in Melbourne?',
          answer: 'No. Offices, mixed-use property, retail assets, and other commercial securities may also be considered, depending on marketability, leverage, and tenant profile.'
        },
        {
          question: 'Why do some borrowers avoid refinancing the first mortgage?',
          answer: 'Because the existing senior debt may already have acceptable pricing or structure. In those cases, a second mortgage can sometimes be cleaner than replacing the entire capital stack.'
        },
        {
          question: 'Is this informational content the same as financial advice?',
          answer: 'No. It is general information only and should not be treated as personal or financial advice.'
        }
      ]}
    />
  );
}
