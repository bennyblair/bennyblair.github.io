import React from 'react';
import BridgingFinanceCityPage from '@/components/BridgingFinanceCityPage';

export default function BridgingFinancePerth() {
  return (
    <BridgingFinanceCityPage
      city="Perth"
      state="WA"
      canonical="/services/bridging-finance/cities/perth"
      title="Bridging Finance Perth | WA Commercial Finance | Emet Capital"
      description="Bridging finance in Perth for commercial property acquisitions, refinance deadlines, development timing gaps, and time-sensitive business transactions across WA's key industrial and metro markets." 
      localIntro="Bridging finance for Perth transactions where purchase, refinance, or project timelines require short-term funding before permanent finance or exit events complete."
      localFocus="In Perth this includes industrial and logistics assets across Kewdale, Welshpool, and Malaga corridors, mixed-use acquisitions in inner-metro precincts, refinance pressure on investment and commercial property, development site timing gaps, and resource sector-linked business scenarios where exits are visible but settlement timing doesn't align with standard bank processes."
      marketOverview="Perth's property market moves differently from the east coast. Resource sector cycles, interstate migration patterns, and WA-specific lending appetite create timing gaps that bridging finance can fill. Transactions often involve industrial assets serving mining and logistics sectors, commercial property tied to resource-linked businesses, and development projects where funding milestones don't align neatly with project stages."
      timingPressures="Timing pressure in Perth commonly comes from refinance deadlines on investment property, acquisition opportunities requiring fast settlement, sale-and-purchase timing mismatches, and development funding transitions. The WA market can move quickly when conditions align, and bridging facilities help borrowers execute transactions without forcing rushed permanent structures or losing deals to timing constraints."
      suburbCoverage={[
        {
          title: 'Kewdale, Welshpool, and southern industrial corridor',
          text: "Perth's established industrial precincts produce regular bridging scenarios involving warehouses, logistics facilities, trade distribution centers, and commercial property serving resource-sector businesses. These are often refinance or acquisition bridges where settlement timing matters more than long-term rate optimization."
        },
        {
          title: 'Malaga, Wangara, and northern industrial growth',
          text: 'Northern industrial corridors generate timing-driven deals around manufacturing sites, commercial workshops, warehousing expansion, and mixed-use development opportunities. Bridging finance may support acquisition timing or development funding transitions in these growth precincts.'
        },
        {
          title: 'CBD, Northbridge, and inner-metro mixed-use',
          text: 'Perth CBD and inner-metro areas including Northbridge, Mount Lawley, and Leederville can produce commercial settlement bridges, mixed-use acquisition timing gaps, and refinance events tied to office suites, hospitality property, and owner-occupied business premises.'
        },
        {
          title: 'Fremantle, South Perth, and premium precincts',
          text: 'Established suburbs with higher-value commercial and investment property may require bridging finance where equity is strong but transactions need short-term funding to align sale and purchase timing, or to bridge refinance deadlines while permanent structures are finalized.'
        }
      ]}
      localUseCases={[
        {
          title: 'Industrial acquisition and settlement timing',
          text: 'Perth industrial buyers often compete for well-located logistics and warehouse assets. Short settlement windows or auction conditions may require bridging finance to secure the deal before long-term funding completes documentation and valuation processes.'
        },
        {
          title: 'Refinance deadlines on commercial and investment assets',
          text: 'Where existing lenders are expiring, repricing, or no longer suitable, short-term bridging may buy time to complete valuation, legal work, and credit approval for a more stable refinance outcome without forcing rushed decisions.'
        },
        {
          title: 'Development site acquisition and funding transitions',
          text: "Developers purchasing sites or managing transitions between acquisition finance, construction facilities, and takeout refinancing may use bridging to cover timing gaps. This is common in Perth where project funding milestones don't always align neatly with development stages."
        },
        {
          title: 'Resource sector business transactions',
          text: 'Perth businesses tied to mining, oil and gas, or related services sometimes need property-backed bridging finance for acquisitions, partner buyouts, or urgent capital requirements while longer-term funding solutions or asset sales complete.'
        }
      ]}
      scenarios={[
        {
          title: 'Kewdale Warehouse Acquisition Bridge',
          scenario: 'A logistics operator identified a $1.85 million warehouse in Kewdale with strong tenant demand and immediate operational value. The buyer had another property sale in Joondalup scheduled to settle in seven weeks, but the warehouse vendor required settlement within 30 days to avoid the property going back to market.',
          solution: 'A short-term first-ranking bridge of $1.15 million allowed the warehouse purchase to settle on time while the Joondalup sale progressed. The structure preserved deal control without forcing the borrower into rushed disposal or unnecessary long-term refinance before the intended exit completed.',
          outcomes: [
            { label: 'Purchase price', value: '$1.85M warehouse asset' },
            { label: 'Bridge facility', value: '$1.15M' },
            { label: 'Indicative leverage', value: '62% LVR' },
            { label: 'Support sale proceeds', value: '$950K expected from Joondalup property' },
            { label: 'Planned term', value: '2 to 3 months to sale settlement' }
          ]
        },
        {
          title: 'Malaga Commercial Refinance Deadline',
          scenario: 'A manufacturing business had a $2.65 million commercial property in Malaga with an existing senior facility maturing before the incoming refinance could complete. Valuation and tenant review for the replacement lender were still in progress, but the current lender required discharge on a fixed date to avoid penalty rates and potential enforcement.',
          solution: 'A short-term first-ranking bridge of $1.62 million gave the borrower time to complete valuation, legal documentation, and refinance credit approval without risking a distressed rollover or forced asset sale. The exit remained a refinance into a longer-term commercial facility once lender conditions were satisfied.',
          outcomes: [
            { label: 'Security value', value: '$2.65M commercial property' },
            { label: 'Bridge facility', value: '$1.62M' },
            { label: 'Indicative leverage', value: '61% LVR' },
            { label: 'Expected exit', value: 'Refinance within 4 to 5 months' }
          ]
        },
        {
          title: 'South Perth Mixed-Use Development Timing',
          scenario: 'A developer secured a $3.1 million mixed-use site in South Perth with approval for residential and commercial use. Construction finance was approved but required the existing debt to be discharged before drawdown could commence. The gap between site acquisition settlement and construction facility availability created a 6-week funding window.',
          solution: 'A short-term development bridge of $1.95 million covered the existing debt discharge and holding costs while construction finance documentation finalized and first drawdown conditions were met. This kept the project on schedule without forcing the developer to delay site settlement or risk losing the approved construction facility.',
          outcomes: [
            { label: 'Site value', value: '$3.1M with development approval' },
            { label: 'Bridge facility', value: '$1.95M' },
            { label: 'Support funding', value: 'Construction finance approved' },
            { label: 'Planned term', value: '6 to 8 weeks to construction drawdown' }
          ]
        }
      ]}
      relatedLinks={[
        {
          title: 'Bridging Finance service page',
          href: '/services/bridging-finance',
          description: 'Overview of commercial bridging finance structures, timing, and use cases across Australia.'
        },
        {
          title: 'Bridging Finance in Australia guide',
          href: '/resources/guides/bridging-finance-australia-complete-property-guide',
          description: 'Long-form guide covering how bridging finance works, who uses it, and what lenders assess.'
        },
        {
          title: 'Commercial Bridging Finance for Auction Purchases',
          href: '/resources/guides/commercial-bridging-finance-auction-purchases',
          description: 'Useful if your Perth transaction is tied to auction timing or short contractual deadlines.'
        },
        {
          title: 'Bridging Finance for Developers',
          href: '/resources/guides/bridging-finance-developers-project-funding-solutions',
          description: 'Project funding strategies for Perth developers managing acquisition and construction timing gaps.'
        }
      ]}
      faqs={[
        {
          question: 'When might bridging finance make sense in Perth?',
          answer: "It may make sense when a Perth borrower has a clear transaction and exit strategy, but timing doesn't align with standard bank processes. Common examples include industrial acquisitions, refinance deadlines, development funding transitions, and sale-and-purchase timing gaps."
        },
        {
          question: 'Can bridging finance work for industrial property in Perth?',
          answer: 'Yes. Perth bridging deals frequently involve warehouses, logistics facilities, manufacturing sites, and commercial property in key industrial corridors like Kewdale, Welshpool, Malaga, and Wangara where timing and execution matter.'
        },
        {
          question: 'What do Perth lenders focus on most?',
          answer: "They usually focus on security quality, combined leverage across all debt positions, legal readiness, and the credibility of the exit strategy. Industrial and resource-sector property requires careful valuation and market assessment given Perth's cyclical market dynamics."
        },
        {
          question: 'Can I use bridging finance while waiting for a sale in Perth to settle?',
          answer: "Potentially, yes, if the sale is sufficiently advanced and the wider structure remains sensible. Lenders will want to understand the expected settlement timing, debt position, and fallback options if the sale drifts or doesn't complete as planned."
        },
        {
          question: 'Is bridging finance only for property investors in Perth?',
          answer: 'No. Perth bridging finance may also be used by business owners, developers, manufacturing operators, and companies with genuine commercial purposes and defined short-term funding needs tied to property transactions.'
        },
        {
          question: 'How long does bridging finance approval take in Perth?',
          answer: 'Private lenders can assess and approve bridging finance within 24-72 hours for straightforward scenarios with quality security and clear exit strategies. Settlement timing depends on legal readiness, valuation completion, and documentation complexity.'
        },
        {
          question: 'What are typical costs for Perth bridging finance?',
          answer: 'Costs include interest rates typically ranging from 10-16% p.a., establishment fees of 1-3% of the facility amount, valuation costs, and legal fees. The total cost depends on facility size, term length, security complexity, and urgency of settlement required.'
        }
      ]}
    />
  );
}
