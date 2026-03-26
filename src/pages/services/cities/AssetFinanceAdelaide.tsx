import React from 'react';
import AssetFinanceCityPage from '@/components/AssetFinanceCityPage';

export default function AssetFinanceAdelaide() {
  return (
    <AssetFinanceCityPage
      city="Adelaide"
      state="SA"
      canonical="/services/asset-finance/cities/adelaide"
      title="Asset Finance Adelaide | SA Commercial Equipment Finance | Emet Capital"
      description="Asset finance in Adelaide for vehicles, machinery, specialist equipment, healthcare assets, and business technology where structure and timing both matter."
      localIntro="Asset finance for Adelaide businesses funding vehicles, machinery, equipment, and technology while keeping commercial cash flow more flexible."
      localFocus="Adelaide asset finance often supports trade businesses, industrial operators, healthcare providers, hospitality groups, and other businesses that need equipment in place without taking the full capital hit upfront."
      marketOverview="Adelaide may be a smaller market than Sydney or Melbourne, but it still creates strong commercial asset-finance demand because many businesses rely on revenue-producing equipment, vehicles, and operational assets. The right structure can make expansion and replacement cycles much easier to manage."
      timingPressures="In Adelaide, businesses often need asset finance when equipment is mission-critical, supplier timing is tight, or cash flow needs to be preserved for staffing, stock, and broader commercial obligations."
      suburbCoverage={[
        {
          title: 'CBD and inner commercial precincts',
          text: 'Adelaide CBD and nearby commercial areas often suit hospitality, service-business, and technology-related asset finance needs.'
        },
        {
          title: 'Wingfield, Regency Park, and industrial corridors',
          text: 'These industrial precincts regularly generate vehicle, machinery, and business-equipment finance scenarios.'
        },
        {
          title: 'Southern and outer growth markets',
          text: 'Lonsdale, Edinburgh, and surrounding business precincts commonly involve trade, industrial, and specialist equipment funding needs.'
        }
      ]}
      localUseCases={[
        {
          title: 'Vehicle and fleet funding',
          text: 'Adelaide businesses often use asset finance to fund cars, vans, trucks, and work vehicles while preserving capital for day-to-day business use.'
        },
        {
          title: 'Machinery and specialist equipment',
          text: 'Trade, industrial, and healthcare operators commonly finance equipment to support productivity and business expansion.'
        },
        {
          title: 'Technology and fitout support',
          text: 'Asset finance can also support business technology, fitout-related assets, and specialist operational equipment.'
        },
        {
          title: 'Replacement and upgrade cycles',
          text: 'Where ageing equipment needs replacing, asset finance can reduce upfront strain and spread the cost more sensibly over time.'
        }
      ]}
      scenarios={[
        {
          title: 'Wingfield vehicle and equipment rollout',
          scenario: 'An Adelaide trade operator needed new vehicles and supporting equipment to expand service capacity but wanted to avoid a heavy upfront capital hit.',
          solution: 'A structured asset-finance facility funded the rollout and let the business preserve liquidity for staffing and operating costs.',
          outcomes: [
            { label: 'Asset type', value: 'Vehicles + business equipment' },
            { label: 'Facility size', value: '$310K' },
            { label: 'Commercial purpose', value: 'Growth and rollout' },
            { label: 'Indicative term', value: '4 to 5 years' }
          ]
        },
        {
          title: 'Healthcare equipment installation',
          scenario: 'A healthcare business needed specialist equipment delivered and installed quickly without using all of its available growth capital.',
          solution: 'An equipment-finance structure spread the cost over time and supported a cleaner expansion path.',
          outcomes: [
            { label: 'Asset type', value: 'Healthcare equipment' },
            { label: 'Facility size', value: '$470K' },
            { label: 'Commercial purpose', value: 'Capacity expansion' },
            { label: 'Indicative term', value: '5 to 7 years' }
          ]
        },
        {
          title: 'Hospitality equipment before opening',
          scenario: 'A venue operator needed core hospitality equipment settled before launch while still managing fitout and opening costs.',
          solution: 'Asset finance reduced the upfront burden and helped the business preserve cash for launch-stage execution.',
          outcomes: [
            { label: 'Asset type', value: 'Hospitality equipment' },
            { label: 'Facility size', value: '$185K' },
            { label: 'Commercial pressure', value: 'Opening timeline' },
            { label: 'Indicative term', value: '3 to 5 years' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Asset Finance service page',
          href: '/services/asset-finance',
          description: 'Overview of commercial asset finance structures and lender options across Australia.'
        },
        {
          title: 'Asset-Backed Lending & Asset Finance guide',
          href: '/resources/guides/asset-backed-lending-and-asset-finance',
          description: 'Long-form guide covering asset finance and related lending structures.'
        },
        {
          title: 'Asset Backed Lending Adelaide',
          href: '/services/asset-backed-lending/adelaide',
          description: 'Useful if the Adelaide funding need is broader than pure equipment finance.'
        }
      ]}
      faqs={[
        {
          question: 'What can be financed in Adelaide?',
          answer: 'Vehicles, machinery, healthcare equipment, hospitality equipment, technology assets, and other business-use equipment are all common examples.'
        },
        {
          question: 'Can smaller Adelaide businesses use asset finance?',
          answer: 'Yes. Asset finance is often useful for small and mid-sized businesses, especially where a new asset will support revenue, efficiency, or growth.'
        },
        {
          question: 'How quickly can Adelaide asset finance settle?',
          answer: 'Straightforward files can move quickly if supplier quotes and business documents are ready. Timing depends on the lender, the asset, and the structure.'
        },
        {
          question: 'Can used assets be financed?',
          answer: 'Potentially, yes. Used assets can be workable if the age, condition, and likely resale profile remain acceptable to the lender.'
        },
        {
          question: 'Why not just pay cash?',
          answer: 'Because many businesses prefer to preserve capital for operations, stock, and growth rather than tie too much of it up in one equipment purchase.'
        }
      ]}
    />
  );
}
