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

const AssetFinanceBrisbane: React.FC = () => {
  const cityStats = [
    { label: 'Asset Finance Deals', value: '290+', description: 'Completed across Brisbane' },
    { label: 'Average Deal Size', value: '$245K', description: 'Equipment and vehicle finance' },
    { label: 'Approval Rate', value: '93%', description: 'For established businesses' },
    { label: 'Settlement Speed', value: '5-7 days', description: 'From approval to funding' }
  ];

  const expertisePoints = [
    {
      title: 'Brisbane Growth Market Specialists',
      description: 'Deep understanding of Brisbane\'s rapidly growing business environment, from construction equipment for South East Queensland development to medical equipment for expanding healthcare services. We finance equipment across all sectors with structures tailored to Queensland\'s economic growth trajectory.'
    },
    {
      title: 'Key Industry Expertise',
      description: 'Extensive experience financing equipment for Brisbane\'s major sectors: construction and civil works (Olympic infrastructure and residential development), mining and resources support (equipment and vehicles), healthcare and medical (growing private sector), hospitality and tourism (strong recovery post-pandemic), transport and logistics (major distribution hub), and professional services (CBD expansion).'
    },
    {
      title: 'Local Brisbane Knowledge',
      description: 'Queensland-based decision-making enables rapid approvals for time-sensitive equipment purchases. We understand Brisbane suppliers, seasonal business patterns, and the unique requirements of Queensland businesses operating in subtropical climate and resource-driven economy.'
    },
    {
      title: 'All Asset Classes',
      description: 'We finance new and used equipment across all asset types: construction equipment and earthmoving, mining support equipment and vehicles, medical equipment and practice fit-outs, hospitality equipment and fit-outs, commercial vehicles and fleet, technology and IT infrastructure, and specialized industry machinery. Multiple financing structures available.'
    }
  ];

  const serviceExamples = [
    {
      title: 'Construction Equipment Finance',
      location: 'Greater Brisbane & Gold Coast Corridor',
      description: 'Financing excavators, bobcats, concrete equipment, trucks, and construction machinery for Brisbane builders and civil contractors. Supporting residential development boom and Olympic infrastructure projects.',
      loanRange: '$60K - $2M',
      term: '3-7 years',
      features: ['New and used equipment', 'Olympic project support', 'Fleet financing', 'Seasonal payments']
    },
    {
      title: 'Medical Equipment Finance',
      location: 'Brisbane CBD, Southside, Northside',
      description: 'Funding specialist medical equipment, imaging technology, dental practices, and clinic fit-outs for Queensland healthcare professionals. Supporting rapid growth in private healthcare sector.',
      loanRange: '$100K - $3M',
      term: '5-7 years',
      features: ['Latest medical technology', 'Practice expansion', 'Tax-effective structures', 'Fast approvals']
    },
    {
      title: 'Hospitality Equipment',
      location: 'Fortitude Valley, South Bank, Eagle Street',
      description: 'Fast finance for commercial kitchens, refrigeration, bar equipment, and restaurant fit-outs supporting Brisbane\'s growing dining and entertainment precincts. Rapid approvals for venue openings.',
      loanRange: '$35K - $700K',
      term: '3-5 years',
      features: ['Quick settlement', 'Subtropical equipment specs', 'Working capital preserved', 'Seasonal flexibility']
    },
    {
      title: 'Mining Support Equipment',
      location: 'Brisbane (Serving QLD Resources Sector)',
      description: 'Financing heavy vehicles, machinery, and equipment for businesses supporting Queensland mining and resources sector. From Bowen Basin coal to Central Queensland gas projects.',
      loanRange: '$150K - $3M',
      term: '5-7 years',
      features: ['Mining-grade equipment', 'DIDO/FIFO operations', 'Harsh environment specs', 'Flexible structures']
    },
    {
      title: 'Transport & Logistics',
      location: 'Brisbane Freight Hub',
      description: 'Financing trucks, vans, trailers, forklifts, and logistics equipment for Brisbane transport operators. Supporting Queensland\'s major freight and distribution network.',
      loanRange: '$50K - $1.5M',
      term: '3-5 years',
      features: ['Fleet financing', 'Trade-in options', 'Lease structures', 'Regional coverage']
    },
    {
      title: 'Technology & IT Equipment',
      location: 'Brisbane CBD, South Bank, Fortitude Valley',
      description: 'Funding servers, software, telecommunications equipment, and IT infrastructure for Brisbane tech businesses. Keeping pace with Queensland\'s growing technology sector.',
      loanRange: '$25K - $500K',
      term: '2-4 years',
      features: ['Technology refresh', 'Software licensing', 'Cloud migration', 'Short-term structures']
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Equipment Selection',
      description: 'Identify the equipment or assets your Brisbane business needs. Obtain quotes from Queensland suppliers and specifications for new or used assets.',
      timeframe: 'Day 1'
    },
    {
      step: 2,
      title: 'Application & Assessment',
      description: 'Submit application with equipment quotes, business financials (2 years), and asset details. We assess equipment value, business cash flow, and optimal finance structure.',
      timeframe: 'Days 1-2'
    },
    {
      step: 3,
      title: 'Credit Approval',
      description: 'Receive formal approval with finance structure (chattel mortgage, lease, hire purchase), interest rate, term, and repayment schedule. Equipment valuation completed.',
      timeframe: 'Days 3-5'
    },
    {
      step: 4,
      title: 'Documentation',
      description: 'Execute finance documents, security agreements, and PPSR registration. Coordinate with equipment supplier for delivery timing to your Brisbane location.',
      timeframe: 'Days 5-6'
    },
    {
      step: 5,
      title: 'Settlement & Delivery',
      description: 'Funds paid directly to supplier. Equipment delivered and commissioned at your Brisbane location. You commence using assets immediately.',
      timeframe: 'Day 7'
    }
  ];

  const faqs = [
    {
      question: 'What types of equipment can be financed in Brisbane?',
      answer: 'We finance virtually all business equipment and assets including: construction equipment (excavators, bobcats, concrete equipment, scaffolding), commercial vehicles (trucks, vans, utes, trailers), mining support equipment (heavy machinery, transport, maintenance equipment), medical equipment (imaging, dental, practice fit-outs, specialist equipment), hospitality equipment (commercial kitchens, refrigeration, bar equipment, coffee machines), manufacturing machinery (production equipment, processing, packaging), IT and technology (servers, software, telecommunications), and specialized industry equipment. Both new and quality used assets are eligible for finance.'
    },
    {
      question: 'How much can I borrow for asset finance in Brisbane?',
      answer: 'Asset finance facilities typically range from $25,000 to $3,000,000 depending on equipment type, business capacity, and asset value. Most Brisbane businesses can finance 100% of equipment cost including delivery, installation, and commissioning. Larger facilities ($3M+) available for established businesses with strong financials. We structure loans based on equipment useful life and your business cash flow capacity, with terms from 2-10 years depending on asset class.'
    },
    {
      question: 'What are the tax benefits of equipment finance?',
      answer: 'Equipment finance provides significant tax advantages for Queensland businesses: All interest is 100% tax-deductible as a business expense. Under chattel mortgage, you claim depreciation deductions (typically 15-40% annually depending on asset type). GST can be claimed immediately on purchase in your next BAS. Balloon payments defer capital cost while maintaining tax benefits. Under finance lease, lease payments are fully tax-deductible as operating expense. Instant asset write-off may apply for eligible small businesses. Consult your accountant to optimize tax outcomes for your specific situation.'
    },
    {
      question: 'How quickly can asset finance be approved in Brisbane?',
      answer: 'Most straightforward asset finance applications are approved within 3-5 business days. For urgent equipment purchases (construction project requirements, contract deadlines, supplier deals), we can provide conditional approval within 24-48 hours. Settlement typically occurs 5-7 days from application, with funds paid directly to the Brisbane or Queensland supplier. We prioritize speed for time-sensitive industries including construction (Olympic projects), mining support, healthcare, and hospitality where equipment delays impact revenue.'
    },
    {
      question: 'What\'s the difference between chattel mortgage and finance lease for Brisbane businesses?',
      answer: 'Chattel mortgage: You own equipment from day 1, claim GST immediately, depreciate the asset, and deduct interest. Best for profitable businesses wanting maximum tax benefits and full ownership. You control the asset and can sell or upgrade anytime. Finance lease: Lender owns equipment during term, you lease it for business use. Lease payments are fully tax-deductible as operating expense. Flexible end-of-term options (purchase at residual, return equipment, or upgrade to newer technology). Good for technology and equipment with short lifecycles or rapid obsolescence. May provide off-balance-sheet treatment. We recommend the optimal structure based on your tax position, asset type, and business objectives.'
    },
    {
      question: 'Can I finance used equipment or second-hand machinery in Brisbane?',
      answer: 'Yes, we finance quality used equipment and machinery up to certain ages depending on asset type and condition. General guidelines: construction equipment up to 15 years (depending on hours and condition), commercial vehicles up to 10 years old, mining support equipment assessed individually (maintenance history critical), medical equipment up to 10 years (technology dependent), hospitality equipment up to 12 years (commercial grade), and manufacturing machinery up to 20 years (subject to inspection). Used equipment typically requires larger deposits (20-40%) and shorter loan terms. We arrange independent valuations to confirm condition, remaining useful life, and residual value for used asset finance.'
    },
    {
      question: 'What security is required for equipment finance?',
      answer: 'Primary security is the equipment being financed, registered via PPSR (Personal Property Securities Register). For standard equipment finance under $500K, no additional property security is typically required—the equipment itself provides adequate security. For larger facilities or higher-risk assets, additional security may include other business assets, commercial property, or residential property. Personal guarantees from directors are standard for most asset finance facilities. We assess security requirements based on equipment value, expected residual value, business strength, and overall risk profile.'
    },
    {
      question: 'Do you finance equipment for startups and new Brisbane businesses?',
      answer: 'Yes, we provide asset finance for startups and new businesses (trading less than 2 years) provided there is strong business plan, relevant industry experience, and adequate equity contribution. Startup requirements typically include: larger deposit (30-50% of equipment cost), personal guarantees from directors with strong credit history, evidence of contracts or revenue pipeline (particularly relevant for construction and mining support), relevant industry experience and trade qualifications, and comprehensive business plan showing equipment necessity. We actively support new Brisbane businesses across all sectors, particularly where equipment is essential to commence operations (construction, healthcare, hospitality, transport, professional services).'
    },
    {
      question: 'Can asset finance cover installation, freight, and training costs?',
      answer: 'Yes, asset finance can cover the complete project cost including: equipment purchase price, interstate or international freight (particularly relevant for imported European or American equipment), delivery within Queensland and regional areas, installation and commissioning (foundations, electrical, structural), initial operator training and certification, and related project costs (site preparation, fit-out, integration). This is particularly relevant for large machinery, mining equipment, medical equipment requiring fit-out, and complex installations. We provide 100% finance for the total project cost, preserving your working capital for ongoing operations.'
    },
    {
      question: 'Which Brisbane regions and Queensland areas do you service?',
      answer: 'We provide asset finance across all Brisbane regions and South East Queensland: Brisbane CBD and Inner City, Fortitude Valley and Newstead, South Brisbane and South Bank, West End and Milton, Southside (Moorooka, Sunnybank, Logan), Northside (Chermside, Aspley, Strathpine), Westside (Ipswich, Springfield, Redbank), Bayside (Wynnum, Manly, Redcliffe), Brisbane Airport precinct, Greater Brisbane (Caboolture, Beenleigh, Redland Bay), Gold Coast and Northern NSW, Sunshine Coast, and Queensland regional centers (Toowoomba, Bundaberg, Rockhampton, Mackay, Townsville for mining support equipment). Local knowledge of Queensland business conditions, climate requirements, and industry sectors enables faster approvals and better equipment understanding.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asset Finance Brisbane | Equipment & Vehicle Finance QLD | Emet Capital</title>
        <meta name="description" content="Asset finance for Brisbane businesses. Fast equipment and vehicle finance from $25K to $3M. Construction, mining support, medical, hospitality, and transport equipment. 5-7 day settlement." />
        <meta name="keywords" content="asset finance Brisbane, equipment finance Brisbane, vehicle finance Brisbane, construction equipment finance Queensland, mining equipment finance, Brisbane business equipment loans" />
        <link rel="canonical" href="https://emetcapital.com.au/services/asset-finance/brisbane" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Asset Finance Brisbane - Emet Capital",
            "description": "Specialized asset finance for Brisbane businesses covering equipment, vehicles, machinery, and business assets across all Queensland industries.",
            "provider": {
              "@type": "FinancialService",
              "name": "Emet Capital"
            },
            "areaServed": {
              "@type": "City",
              "name": "Brisbane",
              "containedIn": {
                "@type": "State",
                "name": "Queensland"
              }
            },
            "offers": {
              "@type": "Offer",
              "description": "Asset finance from $25K to $3M for equipment, vehicles, machinery, and business assets"
            }
          })}
        </script>
      </Helmet>

      <CityHero
        city="Brisbane"
        state="QLD"
        service="Asset Finance"
        description="Fast equipment and vehicle finance for Brisbane businesses across all industries. From construction equipment supporting Olympic infrastructure to mining support vehicles and medical practice fit-outs, we provide flexible asset finance structures that preserve working capital and enable growth."
      />

      <CityStats stats={cityStats} />

      <LocalExpertise
        city="Brisbane"
        service="Asset Finance"
        points={expertisePoints}
      />

      <ServiceExamples
        city="Brisbane"
        service="Asset Finance"
        examples={serviceExamples}
      />

      <ProcessSteps
        city="Brisbane"
        service="Asset Finance"
        steps={processSteps}
      />

      <CityFAQ
        city="Brisbane"
        service="Asset Finance"
        faqs={faqs}
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Brisbane Business Equipment Sectors</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Construction & Civil Works</h3>
              <p className="text-gray-600 mb-4">
                Brisbane's residential development boom and Olympic infrastructure projects drive exceptional demand for 
                construction equipment finance. We fund excavators, concrete equipment, trucks, scaffolding, and civil 
                machinery for builders and contractors across South East Queensland's growth corridor.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Excavators and earthmoving equipment ($80K-$1.2M)</li>
                <li>• Concrete and civil machinery ($60K-$800K)</li>
                <li>• Commercial trucks and transport ($50K-$250K)</li>
                <li>• Scaffolding and access equipment ($30K-$180K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Mining Support Equipment</h3>
              <p className="text-gray-600 mb-4">
                Brisbane serves as the service hub for Queensland's resource sector. We finance heavy vehicles, maintenance 
                equipment, and specialized machinery for businesses supporting Bowen Basin coal, Central Queensland gas, 
                and mineral resources operations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Heavy transport and mining vehicles ($200K-$2M)</li>
                <li>• Maintenance and workshop equipment ($100K-$800K)</li>
                <li>• Specialized mining support machinery ($150K-$3M)</li>
                <li>• DIDO/FIFO accommodation and transport ($80K-$600K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Medical & Healthcare</h3>
              <p className="text-gray-600 mb-4">
                Brisbane's rapidly growing private healthcare sector creates strong demand for medical equipment finance. 
                CBD, Southside, and Northside clinics require imaging technology, dental equipment, specialist fit-outs, 
                and practice equipment while preserving working capital.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Imaging equipment (MRI, CT, ultrasound) ($500K-$3M)</li>
                <li>• Dental practices and equipment ($100K-$500K)</li>
                <li>• Specialist consulting rooms and fit-outs ($80K-$400K)</li>
                <li>• Medical technology and devices ($50K-$300K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Hospitality & Tourism</h3>
              <p className="text-gray-600 mb-4">
                Brisbane's strong tourism recovery and growing dining scene drives hospitality equipment demand. 
                Fortitude Valley, South Bank, and CBD venues require commercial kitchens, refrigeration, and bar 
                equipment with fast approvals for time-sensitive openings.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Commercial kitchens and cooking equipment ($50K-$300K)</li>
                <li>• Refrigeration and cold room (subtropical specs) ($40K-$220K)</li>
                <li>• Bar equipment and beverage systems ($25K-$150K)</li>
                <li>• Coffee machines and café fit-outs ($35K-$160K)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Asset Finance Structure Options</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Chattel Mortgage (Most Popular)</h3>
              <p className="text-gray-600 mb-4">
                You own the equipment from day 1. Claim GST immediately in your BAS, depreciate the asset for tax purposes, 
                and deduct interest as a business expense. Ideal for profitable Queensland businesses wanting maximum 
                tax benefits and full asset ownership.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Profitable businesses (utilizing depreciation)</li>
                    <li>• Long-term equipment ownership plans</li>
                    <li>• Maximum tax efficiency objectives</li>
                    <li>• Equipment with strong residual value</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Immediate GST claim (e.g., $77K on $770K asset)</li>
                    <li>• Depreciation deductions (15-40% annually)</li>
                    <li>• Balloon payment options (lower monthly cost)</li>
                    <li>• Full ownership from commencement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Finance Lease</h3>
              <p className="text-gray-600 mb-4">
                Lender owns equipment during the lease term, you lease it for business use. Lease payments are fully 
                tax-deductible as an operating expense. Flexible end-of-term options: purchase at residual value, 
                return equipment, or upgrade to newer technology.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Technology and IT equipment (short lifecycles)</li>
                    <li>• Businesses wanting upgrade flexibility</li>
                    <li>• Off-balance-sheet financing preferred</li>
                    <li>• Regular equipment refresh cycles</li>
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
                Progressive ownership structure where you don't own equipment until final payment, but use it throughout 
                the term. Simple structure with no balloon payment, making budgeting straightforward. Good for businesses 
                wanting simple ownership without complex residual calculations.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Simple ownership structure desired</li>
                    <li>• No balloon payment preference</li>
                    <li>• Long-term asset retention planned</li>
                    <li>• Predictable equal monthly payments</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Equal monthly payments (no balloon)</li>
                    <li>• Full ownership at term end</li>
                    <li>• Interest fully tax-deductible</li>
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
          <h2 className="text-3xl font-bold text-center mb-8">Why Brisbane Businesses Choose Asset Finance</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold mb-2">Preserve Working Capital</h3>
              <p className="text-gray-600">
                100% finance available means no large upfront equipment payment. Keep your cash reserves for operations, 
                inventory, staff wages, marketing, and growth opportunities instead of depleting funds for capital purchases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Significant Tax Benefits</h3>
              <p className="text-gray-600">
                Claim depreciation deductions, deduct interest expenses, and recover GST immediately. Tax-effective 
                structures can reduce the after-tax cost of equipment by 25-40% depending on your business tax rate and asset class.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Fast Approval Process</h3>
              <p className="text-gray-600">
                Most applications approved in 3-5 days with settlement within a week. Don't miss time-sensitive 
                construction contracts, mining opportunities, or equipment deals due to slow bank processes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold mb-2">Flexible Finance Structures</h3>
              <p className="text-gray-600">
                Choose from chattel mortgage, finance lease, or hire purchase. Balloon payments, seasonal payment 
                variations, and deferred commencements available to match Queensland business cash flow cycles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">Equipment Security Only</h3>
              <p className="text-gray-600">
                For most facilities under $500K, only the equipment itself is required as security. No need to encumber 
                your home or commercial property for standard equipment purchases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold mb-2">Enable Business Growth</h3>
              <p className="text-gray-600">
                Acquire the equipment you need to win Olympic infrastructure contracts, support mining operations, 
                expand medical practices, and scale operations. Finance facilitates growth impossible with cash-only purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Finance Your Brisbane Business Equipment?"
        description="Get competitive asset finance for your equipment, vehicles, or machinery. Fast approvals and flexible structures for Brisbane and Queensland businesses across all industries."
      />
    </>
  );
};

export default AssetFinanceBrisbane;
