import React from 'react';
import CommercialDevelopmentCityPage from '@/components/CommercialDevelopmentCityPage';

export default function CommercialDevelopmentBrisbane() {
  return (
    <CommercialDevelopmentCityPage
      city="Brisbane"
      state="QLD"
      canonical="/services/commercial-property-development/cities/brisbane"
      title="Commercial Development Finance Brisbane | Property Development Loans Brisbane | Emet Capital"
      description="Secure development finance for Brisbane projects including infill apartments, industrial assets, mixed-use sites, and subdivision stages across southeast Queensland's fast-moving market."
      localIntro="Brisbane development finance is increasingly tied to migration, infrastructure timing, and the need to move on well-bought sites before construction costs or opportunity costs drift too far."
      localFocus="Brisbane has become a city where transport upgrades, Olympic-related investment, and steady population inflows are changing how developers assess timing. Demand spans inner-city unit projects, medium-density infill around rail and bus corridors, industrial facilities in the south and north, and subdivisions stretching into Ipswich, Moreton Bay, and Logan. Funding needs vary materially depending on whether the real pressure is presales, civil works staging, contractor capacity, or getting a site settled while the next approval step is underway."
      marketOverview="Compared with Sydney and Melbourne, Brisbane can still offer a more workable entry price for developers, but the market is no longer simple. Cross River Rail, Brisbane Metro, Woolloongabba renewal, Hamilton Northshore activity, and broader 2032 Olympics-related upgrades are creating precinct-level shifts rather than one uniform citywide trend. Inner-ring projects often rely on transport-led density and owner-occupier demand, while outer-corridor deals are driven by lot supply, family migration, and infrastructure rollout. Development finance works best here when it is structured around the actual precinct story and not just a generic southeast Queensland narrative."
      timingPressures="Timing pressure in Brisbane often comes from settling sites before infrastructure momentum is fully priced in, keeping builders locked in during a busy pipeline, and matching funding milestones to DA conditions, civil works, or staged vertical construction. Delays can be expensive, but so can moving too early with the wrong debt structure when presales, service works, or subcontractor pricing are still shifting."
      suburbCoverage={[
        {
          title: 'CBD, fringe, and inner-south / inner-north precincts',
          text: 'The CBD, South Brisbane, Woolloongabba, Bowen Hills, Albion, Newstead, and West End suit apartment, mixed-use, hotel, medical, and commercial projects where transport investment and urban renewal materially influence site values.'
        },
        {
          title: 'Middle-ring infill and transport-linked suburbs',
          text: 'Chermside, Carindale, Indooroopilly, Nundah, Coorparoo, and Toowong support townhouse, apartment, retail, and mixed-use infill where local buyer demand and access to major centres drive redevelopment feasibility.'
        },
        {
          title: 'Logan, Ipswich, Moreton Bay, and industrial corridors',
          text: 'Springfield, Ripley, North Lakes, Logan Reserve, Berrinba, Acacia Ridge, and Brendale produce subdivision, industrial, warehouse, and business-park projects tied to family migration, freight routes, and employment growth.'
        }
      ]}
      localUseCases={[
        {
          title: 'Inner-ring apartment and mixed-use projects',
          text: 'Projects near major transport or renewal nodes where timing around DA, builder engagement, and buyer campaigns can materially change the lender universe available to the borrower.'
        },
        {
          title: 'Industrial and last-mile logistics development',
          text: 'Warehouse and trade-unit projects in strategic freight belts where occupier demand is strong, but funding still depends on credible local evidence, realistic leasing assumptions, and construction simplicity.'
        },
        {
          title: 'Subdivision and townhouse delivery in growth markets',
          text: 'Projects across Logan, Ipswich, and Moreton Bay where staged civil works, lot release timing, and council servicing conditions need to line up with the debt structure.'
        },
        {
          title: 'Olympic and infrastructure-adjacent redevelopment',
          text: 'Sites benefiting from Woolloongabba, Northshore, or broader transport-linked renewal where developers want to secure and reposition land before the next uplift phase is fully priced in.'
        }
      ]}
      scenarios={[
        {
          title: 'Woolloongabba Mid-Rise Apartment Project',
          scenario: 'A borrower secured a site near the future Woolloongabba transport and stadium precinct for a 28-unit apartment project aimed at professionals and downsizers wanting inner-city access without CBD pricing. Total project costs were forecast at $12.9 million with projected gross realisation of $17.8 million, but the sponsor needed a lender comfortable with a partially established presale campaign rather than a fully banked one.',
          solution: 'A $9.4 million development facility was arranged with milestone-based drawdowns, interest capitalisation during construction, and reporting linked to presale progress and QS-certified cost-to-complete. The structure let the project move while still giving the lender visibility around sales traction.',
          outcomes: [
            { label: 'Apartments', value: '28 units' },
            { label: 'Development cost', value: '$12.9M' },
            { label: 'Development finance', value: '$9.4M' },
            { label: 'Projected realisation', value: '$17.8M' }
          ]
        },
        {
          title: 'Berrinba Industrial Warehouse Stage',
          scenario: 'An experienced sponsor acquired an industrial parcel in Berrinba to develop four freestanding warehouses targeting trade users and logistics operators servicing Brisbane and the Gold Coast. Total costs were $10.6 million with a forecast end value of $14.4 million on completion and lease-up.',
          solution: 'Funding of $7.8 million was structured with staged drawdowns across civil works, slab, structure, and completion. The lender was selected based on practical industrial experience so the assessment focused on access, bay sizing, local demand, and leaseability rather than generic metro apartment metrics.',
          outcomes: [
            { label: 'Warehouse buildings', value: '4 assets' },
            { label: 'Development cost', value: '$10.6M' },
            { label: 'Development finance', value: '$7.8M' },
            { label: 'Projected end value', value: '$14.4M' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Property Development service page',
          href: '/services/commercial-property-development',
          description: 'Overview of commercial property development finance structures, requirements, and processes across Australia.'
        },
        {
          title: 'Property Development Loans Guide',
          href: '/resources/guides/property-development-loans-complete-funding-guide',
          description: 'Comprehensive guide to development finance including how it works, who qualifies, and what lenders assess.'
        },
        {
          title: 'Commercial Property Development Finance',
          href: '/resources/guides/commercial-property-development-finance',
          description: 'Detailed information on financing commercial development projects including offices, retail, and industrial assets.'
        }
      ]}
      faqs={[
        {
          question: 'What Brisbane precincts are creating the strongest demand for development finance?',
          answer: 'Inner-city renewal precincts such as Woolloongabba, South Brisbane, Bowen Hills, and Newstead remain active, while growth and industrial demand is also strong across Logan, Ipswich, Moreton Bay, Berrinba, Acacia Ridge, and Brendale.'
        },
        {
          question: 'Are Brisbane development loans mainly for apartments?',
          answer: 'No. Apartments are only one part of the market. Lenders also regularly assess townhouses, subdivisions, industrial warehouses, mixed-use schemes, medical projects, and selected commercial developments depending on location and sponsor quality.'
        },
        {
          question: 'How do Olympic and transport projects affect Brisbane funding decisions?',
          answer: 'They can materially improve the local story around accessibility, population growth, and end demand, but lenders still want to see sensible pricing, realistic build costs, and a clear exit. Infrastructure hype alone is not enough.'
        },
        {
          question: 'Can Brisbane development finance be structured around staged delivery?',
          answer: 'Yes. Many Brisbane projects are funded in stages, especially subdivisions, industrial estates, and larger mixed-use sites where infrastructure works, pre-commitments, or civil packages need to occur before later stages are drawn.'
        },
        {
          question: 'Do lenders require full presales for Brisbane residential projects?',
          answer: 'Not always. Major banks often want stronger presales, but specialist lenders may accept lower coverage if the suburb, product mix, sponsor experience, and end-value evidence support the risk.'
        },
        {
          question: 'Can a Brisbane facility include land and soft costs as well as construction?',
          answer: 'Potentially, yes. Depending on the lender, the facility may include acquisition or site refinance, consultant and approval costs, civil works, hard construction costs, capitalised interest, and contingency amounts supported by the feasibility.'
        }
      ]}
    />
  );
}
