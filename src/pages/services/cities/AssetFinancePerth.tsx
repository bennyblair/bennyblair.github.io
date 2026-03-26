import React from 'react';
import AssetFinanceCityPage from '@/components/AssetFinanceCityPage';

export default function AssetFinancePerth() {
  return (
    <AssetFinanceCityPage
      city="Perth"
      state="WA"
      canonical="/services/asset-finance/cities/perth"
      title="Asset Finance Perth | WA Commercial Equipment Finance | Emet Capital"
      description="Asset finance in Perth for commercial vehicles, machinery, specialist equipment, technology, and fitout assets where business timing and lender fit matter."
      localIntro="Asset finance for Perth businesses funding vehicles, machinery, specialist equipment, and technology while preserving capital for operations and growth."
      localFocus="Perth asset finance often supports fleets, industrial and project equipment, specialist machinery, and business assets tied to operational delivery in sectors where timing and asset utility matter more than a generic product label."
      marketOverview="Perth’s business market regularly generates demand for vehicle, plant, and equipment finance because many operators rely on revenue-generating assets to support projects, transport, trade, and specialist services. The most useful finance structures are the ones that fit how the business actually works."
      timingPressures="In Perth, equipment and vehicle funding often becomes urgent when contracts are won, projects are mobilised, or replacement cycles can no longer be delayed. If finance timing misses the operating window, the commercial cost can be bigger than the finance cost itself."
      suburbCoverage={[
        {
          title: 'CBD and central commercial precincts',
          text: 'Perth CBD and central commercial districts often suit service-business, technology, and healthcare equipment funding.'
        },
        {
          title: 'Welshpool, Kewdale, and industrial corridors',
          text: 'These industrial and logistics precincts regularly generate fleet, transport, machinery, and trade-equipment finance requirements.'
        },
        {
          title: 'Canning Vale, Malaga, and outer industrial markets',
          text: 'Industrial operators across these areas commonly use asset finance for machinery, vehicles, and specialist business equipment.'
        }
      ]}
      localUseCases={[
        {
          title: 'Fleet and vehicle funding',
          text: 'Perth businesses often finance utes, vans, trucks, and heavier transport assets so growth can happen without a major upfront cash hit.'
        },
        {
          title: 'Machinery and specialist equipment',
          text: 'Industrial, engineering, and trade operators use asset finance for equipment that supports project delivery or improves productivity.'
        },
        {
          title: 'Business technology and operations support',
          text: 'Technology, fitout, and specialist business equipment can also be financed where the structure makes commercial sense.'
        },
        {
          title: 'Replacement and upgrade cycles',
          text: 'Asset finance often helps when the business needs to replace or upgrade ageing revenue-producing assets without disrupting working capital.'
        }
      ]}
      scenarios={[
        {
          title: 'Kewdale fleet refresh',
          scenario: 'A Perth transport operator needed to refresh part of its fleet quickly to support a new contract while still managing broader operating costs.',
          solution: 'A vehicle-finance structure spread the acquisition cost over the useful period of the vehicles and preserved cash for staff and mobilisation.',
          outcomes: [
            { label: 'Asset type', value: 'Commercial fleet vehicles' },
            { label: 'Facility size', value: '$455K' },
            { label: 'Commercial purpose', value: 'Fleet refresh and growth' },
            { label: 'Indicative term', value: '4 to 5 years' }
          ]
        },
        {
          title: 'Canning Vale machinery upgrade',
          scenario: 'A trade and fabrication business needed new machinery installed on a tight operational timeline but wanted to avoid tying up too much working capital.',
          solution: 'An equipment-finance structure supported the machinery purchase while spreading the cost into manageable repayments.',
          outcomes: [
            { label: 'Asset type', value: 'Industrial machinery' },
            { label: 'Facility size', value: '$620K' },
            { label: 'Commercial purpose', value: 'Capacity and productivity upgrade' },
            { label: 'Indicative term', value: '5 to 7 years' }
          ]
        },
        {
          title: 'Specialist equipment for service expansion',
          scenario: 'A Perth service business needed specialist equipment delivered quickly to support an expansion into higher-value work.',
          solution: 'Asset finance reduced the upfront capital burden and let the business start using the equipment sooner while preserving operational liquidity.',
          outcomes: [
            { label: 'Asset type', value: 'Specialist business equipment' },
            { label: 'Facility size', value: '$240K' },
            { label: 'Commercial pressure', value: 'Expansion timeline' },
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
          title: 'Asset Backed Lending Perth',
          href: '/services/asset-backed-lending/perth',
          description: 'Useful if the Perth funding need is broader than pure equipment finance.'
        }
      ]}
      faqs={[
        {
          question: 'What kinds of assets can be financed in Perth?',
          answer: 'Vehicles, machinery, industrial equipment, technology, and specialist business assets are all common examples. The lender and structure depend on the asset profile and commercial purpose.'
        },
        {
          question: 'Can asset finance help with business growth?',
          answer: 'Potentially, yes. Many businesses use asset finance to bring in growth-supporting assets while keeping working capital available for operations and execution.'
        },
        {
          question: 'How quickly can Perth asset finance move?',
          answer: 'Straightforward files can move quickly if supplier quotes and supporting documents are ready. More specialised assets can involve more review.'
        },
        {
          question: 'Is used equipment finance possible?',
          answer: 'Potentially, yes. Used equipment is often workable if age, condition, and resale profile still fit the lender’s appetite.'
        },
        {
          question: 'Why structure the deal instead of just buying outright?',
          answer: 'Because preserving cash flow and aligning repayments to the useful life of the asset can often be smarter than taking the entire cost upfront.'
        }
      ]}
    />
  );
}
