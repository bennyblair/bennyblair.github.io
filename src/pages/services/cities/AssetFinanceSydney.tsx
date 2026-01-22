import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CityHero from '../../../components/cities/CityHero';
import CityStats from '../../../components/cities/CityStats';
import LocalExpertise from '../../../components/cities/LocalExpertise';
import ServiceExamples from '../../../components/cities/ServiceExamples';
import ProcessSteps from '../../../components/cities/ProcessSteps';
import CityFAQ from '../../../components/cities/CityFAQ';
import CTASection from '../../../components/CTASection';

const AssetFinanceSydney: React.FC = () => {
  const cityStats = [
    { label: 'Asset Finance Deals', value: '450+', description: 'Completed in Sydney metro' },
    { label: 'Average Deal Size', value: '$285K', description: 'Equipment and vehicle finance' },
    { label: 'Approval Rate', value: '94%', description: 'For established businesses' },
    { label: 'Settlement Speed', value: '5-7 days', description: 'From approval to funding' }
  ];

  const expertisePoints = [
    {
      title: 'Sydney Business Equipment Specialists',
      description: 'Deep understanding of Sydney\'s diverse business sectors, from Parramatta manufacturing to North Sydney professional services. We finance equipment across all industries with structures tailored to Sydney\'s competitive market.'
    },
    {
      title: 'Major Industry Coverage',
      description: 'Extensive experience financing equipment for Sydney\'s key sectors: construction and trades (Western Sydney growth corridor), medical and healthcare (private practice equipment), hospitality (CBD and beach suburbs), manufacturing (South and Western Sydney), transport and logistics (major freight hub).'
    },
    {
      title: 'Fast Sydney Approvals',
      description: 'Local decision-making enables rapid approvals for time-sensitive equipment purchases. We understand Sydney suppliers, pricing dynamics, and seasonal business cycles to provide responsive funding solutions.'
    },
    {
      title: 'Flexible Asset Types',
      description: 'We finance new and used equipment, vehicles, machinery, medical equipment, hospitality fit-outs, technology and IT hardware, manufacturing equipment, and specialized industry assets. Structures include chattel mortgage, finance lease, hire purchase, and novated leases.'
    }
  ];

  const serviceExamples = [
    {
      title: 'Construction Equipment Finance',
      location: 'Parramatta & Western Sydney',
      description: 'Financing excavators, bobcats, concrete equipment, scaffolding, vehicles, and tools for Sydney construction businesses. Supporting residential development boom across Western Sydney growth corridor.',
      loanRange: '$50K - $2M',
      term: '3-7 years',
      features: ['New and used equipment', 'Seasonal payment options', 'Trade-in structures', 'GST optimization']
    },
    {
      title: 'Medical Equipment Finance',
      location: 'North Shore & Eastern Suburbs',
      description: 'Funding MRI machines, ultrasound equipment, dental chairs, practice fit-outs, and medical technology for Sydney healthcare professionals. Preserving working capital for private practice operations.',
      loanRange: '$100K - $3M',
      term: '5-7 years',
      features: ['Technology upgrades', 'Practice expansion', 'Tax-effective structures', 'Deferred payments']
    },
    {
      title: 'Hospitality Equipment Finance',
      location: 'Sydney CBD, Surry Hills, Darlinghurst',
      description: 'Financing commercial kitchens, coffee machines, refrigeration, bar equipment, and restaurant fit-outs for Sydney\'s vibrant dining scene. Fast approvals for time-sensitive venue openings.',
      loanRange: '$30K - $800K',
      term: '2-5 years',
      features: ['Rapid settlement', 'Seasonal structures', 'Equipment packages', 'Working capital preserved']
    },
    {
      title: 'Manufacturing Equipment',
      location: 'South Sydney, Bankstown, Smithfield',
      description: 'Funding production machinery, CNC equipment, robotics, conveyors, and industrial assets for Sydney manufacturers. Supporting advanced manufacturing and import replacement strategies.',
      loanRange: '$200K - $5M',
      term: '5-10 years',
      features: ['Technology upgrades', 'Automation funding', 'Balloon payments', 'Export finance links']
    },
    {
      title: 'Transport & Logistics',
      location: 'Western Sydney Freight Hub',
      description: 'Financing trucks, vans, forklifts, trailers, and logistics equipment for Sydney transport operators. Supporting Australia\'s largest freight and distribution network.',
      loanRange: '$40K - $1.5M',
      term: '3-5 years',
      features: ['Fleet financing', 'Lease structures', 'Residual values', 'Trade-in options']
    },
    {
      title: 'Technology & IT Equipment',
      location: 'Sydney CBD, North Sydney, Macquarie Park',
      description: 'Funding servers, software, telecommunications equipment, cybersecurity infrastructure, and technology upgrades for Sydney businesses. Keeping pace with rapid technology evolution.',
      loanRange: '$20K - $500K',
      term: '2-4 years',
      features: ['Short terms (technology refresh)', 'Software licensing', 'Cloud migration', 'Managed services']
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Equipment Selection',
      description: 'Identify the equipment or assets your Sydney business needs. Obtain quotes from suppliers and specifications for new or used assets.',
      timeframe: 'Day 1'
    },
    {
      step: 2,
      title: 'Application & Assessment',
      description: 'Submit application with equipment quotes, business financials (2 years), and asset details. We assess equipment value, business cash flow, and structure options.',
      timeframe: 'Days 1-2'
    },
    {
      step: 3,
      title: 'Credit Approval',
      description: 'Receive formal approval with finance structure (chattel mortgage, lease, hire purchase), rate, term, and repayment schedule. Equipment valuation completed.',
      timeframe: 'Days 3-5'
    },
    {
      step: 4,
      title: 'Documentation',
      description: 'Execute finance documents, including security agreements and PPSR registration. Coordinate directly with equipment supplier for delivery timing.',
      timeframe: 'Days 5-6'
    },
    {
      step: 5,
      title: 'Settlement & Delivery',
      description: 'Funds paid directly to supplier. Equipment delivered to your Sydney location. You take possession and commence using assets immediately.',
      timeframe: 'Day 7'
    }
  ];

  const faqs = [
    {
      question: 'What types of assets can be financed in Sydney?',
      answer: 'We finance virtually any business equipment or assets including: vehicles (cars, trucks, vans, commercial vehicles), construction equipment (excavators, bobcats, scaffolding), manufacturing machinery (CNC machines, production lines, robotics), medical equipment (MRI, ultrasound, dental, practice fit-outs), hospitality equipment (commercial kitchens, coffee machines, refrigeration), IT and technology (servers, software, telecommunications), and specialized industry equipment. Both new and quality used assets are eligible.'
    },
    {
      question: 'How much can I borrow for equipment finance in Sydney?',
      answer: 'Asset finance facilities typically range from $20,000 to $5,000,000 depending on equipment type, business capacity, and asset value. Most Sydney businesses finance 100% of equipment cost including delivery and installation. Larger facilities ($5M+) available for established businesses with strong financials. We structure loans based on cash flow capacity and equipment useful life.'
    },
    {
      question: 'What\'s the difference between chattel mortgage, finance lease, and hire purchase?',
      answer: 'Chattel mortgage: You own the equipment from day 1, claim GST immediately, and depreciate the asset. Best for profitable businesses wanting tax benefits. Finance lease: Lender owns equipment during term, you lease it. Flexible end-of-term options (purchase, return, upgrade). Good for technology and evolving assets. Hire purchase: Progressive ownership, you own after final payment. No balloon payment option. Good for businesses wanting simple ownership structure. We recommend the optimal structure based on your tax position and business needs.'
    },
    {
      question: 'How quickly can asset finance be approved in Sydney?',
      answer: 'Most straightforward asset finance applications are approved within 3-5 business days. For urgent equipment purchases, we can provide conditional approval within 24-48 hours. Settlement typically occurs 5-7 days from application, with funds paid directly to the Sydney supplier. We prioritize speed for time-sensitive purchases, especially construction, hospitality, and medical equipment where delays impact revenue.'
    },
    {
      question: 'What security is required for asset finance?',
      answer: 'Primary security is the equipment being financed, registered via PPSR (Personal Property Securities Register). No property security typically required for standard equipment finance under $500K. For larger facilities, additional security may include business assets or property. Personal guarantees from directors are standard for most asset finance facilities.'
    },
    {
      question: 'Can I finance used equipment or vehicles?',
      answer: 'Yes, we finance quality used equipment and vehicles up to certain ages depending on asset type. Typically: vehicles up to 10 years old, construction equipment up to 15 years, machinery up to 20 years (depending on condition), and specialized equipment assessed individually. Used equipment generally requires higher deposits (20-30%) and shorter terms. We arrange valuations to confirm asset condition and residual value.'
    },
    {
      question: 'What are the tax benefits of asset finance?',
      answer: 'Asset finance provides significant tax benefits: Interest is 100% tax-deductible as a business expense. Under chattel mortgage, you claim depreciation deductions (reducing taxable income). GST can be claimed immediately on purchase. Balloon payments defer capital cost (improving cash flow). Lease payments are fully tax-deductible. Instant asset write-off may apply for eligible assets under threshold. We work with your accountant to optimize tax outcomes for your specific situation.'
    },
    {
      question: 'Do you finance equipment for startups or new Sydney businesses?',
      answer: 'Yes, we finance equipment for startups and new businesses (trading less than 2 years) provided there is strong business plan, industry experience, and adequate equity contribution. Startup requirements typically include: larger deposit (30-40%), personal guarantees from directors, evidence of contracts or revenue pipeline, industry experience and qualifications, and clear business plan. We support new Sydney businesses across all sectors, particularly where equipment is essential to commence operations (construction, healthcare, hospitality).'
    },
    {
      question: 'Can asset finance include installation, freight, and training costs?',
      answer: 'Yes, asset finance can cover the full cost of equipment including delivery, freight, installation, commissioning, and initial training. This is particularly relevant for: large machinery requiring installation (manufacturing equipment), medical equipment requiring fit-out (practice equipment), imported equipment (freight and customs), and specialized equipment (training and commissioning). We provide 100% finance for the complete project cost, preserving your working capital.'
    },
    {
      question: 'What suburbs and regions of Sydney do you service for asset finance?',
      answer: 'We provide asset finance across all Sydney regions: CBD and Inner City (Sydney, Surry Hills, Redfern), North Sydney and Lower North Shore (North Sydney, Chatswood, St Leonards), Northern Beaches (Manly, Brookvale, Mona Vale), Eastern Suburbs (Bondi, Randwick, Maroubra), Inner West (Newtown, Marrickville, Leichhardt), South Sydney (Botany, Mascot, Alexandria), Western Sydney (Parramatta, Penrith, Blacktown, Campbelltown), Hills District (Rouse Hill, Castle Hill, Baulkham Hills), and Sutherland Shire (Miranda, Cronulla, Caringbah). Local knowledge of Sydney business precincts enables faster approvals and better equipment understanding.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asset Finance Sydney | Equipment & Vehicle Finance | Emet Capital</title>
        <meta name="description" content="Asset finance for Sydney businesses. Fast equipment and vehicle finance from $20K to $5M. Construction, medical, hospitality, manufacturing, and transport equipment. 5-7 day settlement." />
        <meta name="keywords" content="asset finance Sydney, equipment finance Sydney, vehicle finance Sydney, construction equipment finance, medical equipment finance, Sydney business equipment loans" />
        <link rel="canonical" href="https://emetcapital.com.au/services/asset-finance/sydney" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Asset Finance Sydney - Emet Capital",
            "description": "Specialized asset finance for Sydney businesses covering equipment, vehicles, machinery, and business assets across all industries.",
            "provider": {
              "@type": "FinancialService",
              "name": "Emet Capital"
            },
            "areaServed": {
              "@type": "City",
              "name": "Sydney",
              "containedIn": {
                "@type": "State",
                "name": "New South Wales"
              }
            },
            "offers": {
              "@type": "Offer",
              "description": "Asset finance from $20K to $5M for equipment, vehicles, machinery, and business assets"
            }
          })}
        </script>
      </Helmet>

      <CityHero
        city="Sydney"
        state="NSW"
        service="Asset Finance"
        description="Fast equipment and vehicle finance for Sydney businesses across all industries. From construction equipment in Western Sydney to medical fit-outs on the North Shore, we provide flexible asset finance structures that preserve working capital and support growth."
      />

      <CityStats stats={cityStats} />

      <LocalExpertise
        city="Sydney"
        service="Asset Finance"
        points={expertisePoints}
      />

      <ServiceExamples
        city="Sydney"
        service="Asset Finance"
        examples={serviceExamples}
      />

      <ProcessSteps
        city="Sydney"
        service="Asset Finance"
        steps={processSteps}
      />

      <CityFAQ
        city="Sydney"
        service="Asset Finance"
        faqs={faqs}
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Sydney Business Equipment Sectors</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Construction & Trades</h3>
              <p className="text-gray-600 mb-4">
                Western Sydney's residential development boom drives strong demand for construction equipment finance. 
                We fund excavators, bobcats, trucks, scaffolding, concrete equipment, and tools for builders, 
                earthmoving contractors, and trade businesses across Parramatta, Penrith, Campbelltown, and growth corridors.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Excavators and earthmoving equipment ($100K-$800K)</li>
                <li>• Commercial vehicles and trucks ($50K-$200K)</li>
                <li>• Concrete and civil equipment ($80K-$500K)</li>
                <li>• Scaffolding and access equipment ($30K-$150K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Medical & Healthcare</h3>
              <p className="text-gray-600 mb-4">
                Sydney's North Shore and Eastern Suburbs host high concentrations of private medical practices requiring 
                equipment finance. We fund MRI machines, ultrasound equipment, dental practices, specialist fit-outs, 
                and medical technology while preserving working capital for operations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Imaging equipment (MRI, CT, ultrasound) ($500K-$3M)</li>
                <li>• Dental practices and equipment ($100K-$500K)</li>
                <li>• Specialist consulting fit-outs ($80K-$400K)</li>
                <li>• Medical technology and devices ($50K-$300K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Hospitality & Food Service</h3>
              <p className="text-gray-600 mb-4">
                Sydney's world-class dining scene requires significant equipment investment. We provide fast finance for 
                commercial kitchens, coffee machines, refrigeration, and restaurant fit-outs across CBD, Surry Hills, 
                Darlinghurst, and beach suburbs. Rapid approvals support time-sensitive venue openings.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Commercial kitchens and cooking equipment ($50K-$300K)</li>
                <li>• Coffee machines and café fit-outs ($30K-$150K)</li>
                <li>• Refrigeration and cold room ($40K-$200K)</li>
                <li>• Bar equipment and POS systems ($20K-$100K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Manufacturing & Production</h3>
              <p className="text-gray-600 mb-4">
                South and Western Sydney remain major manufacturing hubs requiring capital equipment investment. 
                We finance CNC machinery, production lines, robotics, and automation equipment supporting advanced 
                manufacturing, import replacement, and export strategies.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• CNC machines and metal fabrication ($200K-$2M)</li>
                <li>• Production lines and automation ($300K-$5M)</li>
                <li>• Food processing equipment ($150K-$1.5M)</li>
                <li>• Packaging and materials handling ($80K-$500K)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Asset Finance Structures Explained</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Chattel Mortgage (Most Popular)</h3>
              <p className="text-gray-600 mb-4">
                You own the equipment from day 1. Claim GST immediately in your BAS, depreciate the asset, 
                and deduct interest as a business expense. Best for profitable businesses wanting tax benefits 
                and asset ownership.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Profitable businesses (utilizing depreciation)</li>
                    <li>• Long-term equipment retention</li>
                    <li>• Tax-effective structures</li>
                    <li>• Maximum asset ownership</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Immediate GST claim ($85K on $850K asset)</li>
                    <li>• Depreciation deductions (15-40% p.a.)</li>
                    <li>• Balloon payment options (reduce monthly cost)</li>
                    <li>• Full ownership from commencement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Finance Lease</h3>
              <p className="text-gray-600 mb-4">
                Lender owns equipment, you lease it for the term. Lease payments are fully tax-deductible as an 
                operating expense. Flexible end-of-term options: purchase at residual value, return equipment, 
                or upgrade to new assets.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Technology and IT equipment (short lifecycles)</li>
                    <li>• Businesses wanting flexibility</li>
                    <li>• Off-balance-sheet financing preferred</li>
                    <li>• Regular equipment upgrades</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Lease payments 100% tax-deductible</li>
                    <li>• End-of-term flexibility (buy/return/upgrade)</li>
                    <li>• Technology refresh capability</li>
                    <li>• Potential off-balance-sheet treatment</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Hire Purchase</h3>
              <p className="text-gray-600 mb-4">
                Progressive ownership structure. You don't own equipment until final payment, but use it throughout 
                the term. Simple structure with no balloon payment. Good for businesses wanting straightforward 
                ownership without complex residual values.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Simple ownership structure desired</li>
                    <li>• No balloon payment preference</li>
                    <li>• Long-term asset retention</li>
                    <li>• Predictable equal payments</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Equal monthly payments (no balloon)</li>
                    <li>• Full ownership at term end</li>
                    <li>• Interest tax-deductible</li>
                    <li>• Simpler than chattel mortgage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Sydney Businesses Choose Asset Finance</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold mb-2">Preserve Working Capital</h3>
              <p className="text-gray-600">
                100% finance available means no large upfront payment. Keep your cash reserves for operations, 
                inventory, marketing, and growth opportunities instead of depleting funds for equipment purchases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Tax Benefits</h3>
              <p className="text-gray-600">
                Claim depreciation, deduct interest, and recover GST immediately. Tax-effective structures can 
                reduce the after-tax cost of equipment by 25-40% depending on your business tax rate and asset type.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Fast Approval</h3>
              <p className="text-gray-600">
                Most applications approved in 3-5 days with settlement within a week. Don't miss time-sensitive 
                equipment deals or opportunities due to slow bank processes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold mb-2">Flexible Structures</h3>
              <p className="text-gray-600">
                Choose from chattel mortgage, finance lease, or hire purchase. Balloon payments, seasonal variations, 
                and deferred commencements available to match your business cash flow cycle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">No Property Security</h3>
              <p className="text-gray-600">
                Equipment security only for most facilities under $500K. No need to encumber your home or commercial 
                property for standard equipment purchases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold mb-2">Support Growth</h3>
              <p className="text-gray-600">
                Acquire the equipment you need to win new contracts, increase capacity, and scale operations. 
                Finance facilitates growth that wouldn't be possible with cash-only purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Finance Your Sydney Business Equipment?"
        description="Get competitive asset finance for your equipment, vehicles, or machinery. Fast approvals and flexible structures for Sydney businesses across all sectors."
      />
    </>
  );
};

export default AssetFinanceSydney;
