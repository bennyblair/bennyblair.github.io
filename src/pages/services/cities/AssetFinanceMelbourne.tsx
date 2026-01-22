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

const AssetFinanceMelbourne: React.FC = () => {
  const cityStats = [
    { label: 'Asset Finance Deals', value: '380+', description: 'Completed across Melbourne' },
    { label: 'Average Deal Size', value: '$265K', description: 'Equipment and machinery finance' },
    { label: 'Approval Rate', value: '92%', description: 'For established businesses' },
    { label: 'Settlement Speed', value: '5-8 days', description: 'From approval to equipment delivery' }
  ];

  const expertisePoints = [
    {
      title: 'Melbourne Manufacturing Hub Expertise',
      description: 'Deep understanding of Melbourne\'s manufacturing strengths, from food production in Richmond to advanced manufacturing in Dandenong. We finance equipment across all sectors with structures tailored to Melbourne\'s innovation-driven economy.'
    },
    {
      title: 'Diverse Industry Coverage',
      description: 'Extensive experience financing equipment for Melbourne\'s key sectors: food and beverage manufacturing (Preston, Collingwood, Richmond), advanced manufacturing (South East corridor), healthcare and medical (private practices), hospitality (CBD and inner suburbs), professional services (CBD and suburban hubs), and creative industries (Collingwood, Fitzroy).'
    },
    {
      title: 'Local Decision Making',
      description: 'Melbourne-based assessment enables rapid approvals for time-sensitive equipment purchases. We understand local suppliers, seasonal business patterns, and industry dynamics specific to Victoria\'s capital.'
    },
    {
      title: 'Comprehensive Asset Types',
      description: 'We finance new and used equipment across all asset classes: manufacturing machinery, medical equipment, hospitality fit-outs, vehicles and transport, IT and technology, construction equipment, and specialized industry assets. Multiple structure options including chattel mortgage, finance lease, and hire purchase.'
    }
  ];

  const serviceExamples = [
    {
      title: 'Food Manufacturing Equipment',
      location: 'Richmond, Collingwood, Preston',
      description: 'Financing production equipment, commercial kitchens, packaging machinery, and refrigeration for Melbourne\'s thriving artisan food sector. Supporting growth from local production to national supermarket supply.',
      loanRange: '$80K - $2M',
      term: '5-7 years',
      features: ['Italian and European equipment', '100% finance available', 'Seasonal payment options', 'Fast approvals for growth']
    },
    {
      title: 'Medical Practice Equipment',
      location: 'East Melbourne, South Yarra, Toorak',
      description: 'Funding specialist medical equipment, imaging technology, dental practices, and clinic fit-outs for Melbourne healthcare professionals. Preserving working capital while upgrading technology.',
      loanRange: '$120K - $3.5M',
      term: '5-7 years',
      features: ['Latest technology', 'Tax-effective structures', 'Practice expansion support', 'Technology refresh cycles']
    },
    {
      title: 'Hospitality Equipment Finance',
      location: 'Melbourne CBD, Fitzroy, St Kilda',
      description: 'Fast finance for commercial kitchens, coffee equipment, refrigeration, and restaurant fit-outs supporting Melbourne\'s world-renowned dining scene. Rapid approvals for time-sensitive openings.',
      loanRange: '$40K - $900K',
      term: '3-5 years',
      features: ['Quick settlement', 'Working capital preserved', 'Equipment packages', 'Seasonal flexibility']
    },
    {
      title: 'Advanced Manufacturing',
      location: 'Dandenong, Braeside, Laverton',
      description: 'Funding CNC machinery, robotics, production lines, and automation equipment for Melbourne\'s South East manufacturing corridor. Supporting high-tech manufacturing and export businesses.',
      loanRange: '$250K - $5M',
      term: '5-10 years',
      features: ['Technology upgrades', 'Automation funding', 'Export finance links', 'Balloon structures']
    },
    {
      title: 'Construction Equipment',
      location: 'Western Melbourne Growth Corridor',
      description: 'Financing excavators, trucks, concrete equipment, and construction machinery for Melbourne builders and civil contractors. Supporting residential and infrastructure development boom.',
      loanRange: '$60K - $1.8M',
      term: '3-7 years',
      features: ['New and used equipment', 'Trade-in structures', 'Fleet financing', 'GST optimization']
    },
    {
      title: 'Technology & IT Equipment',
      location: 'Melbourne CBD, Docklands, Richmond',
      description: 'Funding servers, software, cybersecurity infrastructure, and telecommunications equipment for Melbourne tech businesses. Keeping pace with rapid technology evolution.',
      loanRange: '$25K - $600K',
      term: '2-4 years',
      features: ['Short-term structures', 'Software licensing', 'Cloud migration', 'Technology refresh']
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Equipment Selection',
      description: 'Identify the equipment or assets your Melbourne business needs. Obtain quotes from suppliers and specifications for new or used assets.',
      timeframe: 'Day 1'
    },
    {
      step: 2,
      title: 'Application & Assessment',
      description: 'Submit application with equipment quotes, business financials (2 years), and asset details. We assess equipment value, business capacity, and structure options.',
      timeframe: 'Days 1-2'
    },
    {
      step: 3,
      title: 'Credit Approval',
      description: 'Receive formal approval with finance structure (chattel mortgage, lease, hire purchase), interest rate, term, and repayment schedule. Equipment valuation arranged.',
      timeframe: 'Days 3-5'
    },
    {
      step: 4,
      title: 'Documentation',
      description: 'Execute finance documents, security agreements, and PPSR registration. Coordinate with equipment supplier for delivery and installation timing.',
      timeframe: 'Days 5-7'
    },
    {
      step: 5,
      title: 'Settlement & Delivery',
      description: 'Funds paid directly to supplier. Equipment delivered and installed at your Melbourne location. You commence using assets immediately.',
      timeframe: 'Day 8'
    }
  ];

  const faqs = [
    {
      question: 'What equipment types can be financed in Melbourne?',
      answer: 'We finance virtually all business equipment and assets including: manufacturing machinery (CNC, production lines, robotics, food processing), medical equipment (imaging, dental, practice fit-outs, specialist equipment), hospitality equipment (commercial kitchens, coffee machines, refrigeration, bar equipment), vehicles (cars, trucks, vans, commercial fleet), construction equipment (excavators, concrete equipment, scaffolding), IT and technology (servers, software, telecommunications), and specialized industry equipment. Both new and quality used assets are eligible for finance.'
    },
    {
      question: 'How much can I borrow for asset finance in Melbourne?',
      answer: 'Asset finance facilities typically range from $25,000 to $5,000,000 depending on equipment type, business cash flow capacity, and asset value. Most Melbourne businesses can finance 100% of equipment cost including delivery, installation, and commissioning. Larger facilities ($5M+) available for established businesses with strong financials. We structure loans based on equipment useful life and your business cash flow capacity.'
    },
    {
      question: 'What are the tax benefits of asset finance?',
      answer: 'Asset finance provides significant tax advantages: All interest is 100% tax-deductible as a business expense. Under chattel mortgage, you claim depreciation deductions (typically 15-40% annually depending on asset class). GST can be claimed immediately on purchase in your next BAS. Balloon payments defer capital cost while maintaining tax benefits. Lease payments under finance lease are fully tax-deductible. Instant asset write-off may apply for eligible assets under threshold ($20K for small businesses). We recommend consulting your accountant to optimize tax outcomes for your specific situation.'
    },
    {
      question: 'How fast can asset finance be approved in Melbourne?',
      answer: 'Most straightforward asset finance applications are approved within 3-5 business days. For urgent equipment purchases (time-sensitive supplier deals, contract requirements), we can provide conditional approval within 24-48 hours. Settlement typically occurs 5-8 days from application, with funds paid directly to the Melbourne supplier. We prioritize speed for industries where equipment delays impact revenue, including hospitality, construction, healthcare, and manufacturing.'
    },
    {
      question: 'What\'s the difference between chattel mortgage and finance lease?',
      answer: 'Chattel mortgage: You own equipment from day 1, claim GST immediately, depreciate the asset, and deduct interest. Best for profitable businesses wanting tax benefits and ownership. You can sell or upgrade equipment at any time. Finance lease: Lender owns equipment during term, you lease it. Lease payments are fully tax-deductible as operating expense. Flexible end-of-term options (purchase at residual, return equipment, or upgrade). Good for technology and assets with short lifecycles. May provide off-balance-sheet treatment. We recommend the optimal structure based on your tax position, asset type, and business objectives.'
    },
    {
      question: 'Can I finance used equipment or second-hand machinery?',
      answer: 'Yes, we finance quality used equipment and machinery up to certain ages depending on asset type. General guidelines: vehicles up to 10 years old, construction equipment up to 15 years (depending on condition and hours), manufacturing machinery up to 20 years (subject to inspection), medical equipment assessed individually (technology dependent), and specialized equipment evaluated case-by-case. Used equipment typically requires larger deposits (20-40%) and shorter loan terms. We arrange independent valuations to confirm condition and residual value for used asset finance.'
    },
    {
      question: 'What security is required for equipment finance?',
      answer: 'Primary security is the equipment being financed, registered via PPSR (Personal Property Securities Register). For standard equipment finance under $500K, no additional property security is typically required. For larger facilities or higher-risk assets, additional security may include other business assets, commercial property, or director guarantees. Personal guarantees from directors are standard for most asset finance facilities. We assess security requirements based on equipment value, residual value, and business strength.'
    },
    {
      question: 'Do you finance equipment for startups and new Melbourne businesses?',
      answer: 'Yes, we provide asset finance for startups and new businesses (trading less than 2 years) provided there is strong business plan, relevant industry experience, and adequate equity contribution. Startup requirements typically include: larger deposit (30-50% of equipment cost), personal guarantees from directors with strong credit history, evidence of contracts or revenue pipeline, relevant industry experience and qualifications, and comprehensive business plan. We actively support new Melbourne businesses across all sectors, particularly where equipment is essential to commence operations (manufacturing, construction, healthcare, hospitality, professional services).'
    },
    {
      question: 'Can asset finance cover installation, training, and freight costs?',
      answer: 'Yes, asset finance can cover the complete cost of equipment including: equipment purchase price, delivery and freight (including international shipments), installation and commissioning, initial operator training, and related project costs (foundations, electrical, fit-out). This is particularly relevant for large machinery, imported equipment (European manufacturing equipment), medical equipment requiring fit-out, and complex installations. We provide 100% finance for the total project cost, preserving your working capital for operations.'
    },
    {
      question: 'Which Melbourne suburbs and regions do you service for asset finance?',
      answer: 'We provide asset finance across all Melbourne regions: CBD and Docklands, Inner North (Carlton, Fitzroy, Collingwood, Richmond, Preston), Inner East (South Yarra, Hawthorn, Kew, Camberwell), South East Manufacturing Corridor (Dandenong, Braeside, Clayton, Springvale), Bayside (Brighton, Sandringham, Moorabbin), Inner West (Footscray, Yarraville, Maribyrnong), Western Growth Corridor (Werribee, Point Cook, Melton), Northern Suburbs (Coburg, Reservoir, Epping, Craigieburn), Eastern Suburbs (Box Hill, Ringwood, Knox, Maroondah), and Mornington Peninsula (business equipment and vehicles). Local knowledge of Melbourne business precincts and industry clusters enables faster approvals.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asset Finance Melbourne | Equipment & Machinery Finance | Emet Capital</title>
        <meta name="description" content="Asset finance for Melbourne businesses. Equipment and machinery finance from $25K to $5M. Manufacturing, medical, hospitality, construction equipment. Fast 5-8 day approval and settlement." />
        <meta name="keywords" content="asset finance Melbourne, equipment finance Melbourne, machinery finance Melbourne, manufacturing equipment finance, medical equipment finance Melbourne, Melbourne business equipment loans" />
        <link rel="canonical" href="https://emetcapital.com.au/services/asset-finance/melbourne" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Asset Finance Melbourne - Emet Capital",
            "description": "Specialized asset finance for Melbourne businesses covering equipment, machinery, vehicles, and business assets across all industries.",
            "provider": {
              "@type": "FinancialService",
              "name": "Emet Capital"
            },
            "areaServed": {
              "@type": "City",
              "name": "Melbourne",
              "containedIn": {
                "@type": "State",
                "name": "Victoria"
              }
            },
            "offers": {
              "@type": "Offer",
              "description": "Asset finance from $25K to $5M for equipment, machinery, vehicles, and business assets"
            }
          })}
        </script>
      </Helmet>

      <CityHero
        city="Melbourne"
        state="VIC"
        service="Asset Finance"
        description="Fast equipment and machinery finance for Melbourne businesses across all sectors. From food manufacturing in Richmond to medical practices in East Melbourne, we provide flexible asset finance structures that preserve working capital and enable growth."
      />

      <CityStats stats={cityStats} />

      <LocalExpertise
        city="Melbourne"
        service="Asset Finance"
        points={expertisePoints}
      />

      <ServiceExamples
        city="Melbourne"
        service="Asset Finance"
        examples={serviceExamples}
      />

      <ProcessSteps
        city="Melbourne"
        service="Asset Finance"
        steps={processSteps}
      />

      <CityFAQ
        city="Melbourne"
        service="Asset Finance"
        faqs={faqs}
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Melbourne Business Equipment Sectors</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Food & Beverage Manufacturing</h3>
              <p className="text-gray-600 mb-4">
                Melbourne's renowned food culture drives significant equipment demand. Richmond, Collingwood, and Preston 
                host artisan food manufacturers requiring Italian and European production equipment, commercial kitchens, 
                packaging machinery, and refrigeration. We finance equipment supporting growth from local production to 
                national supermarket supply chains.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Production equipment (pasta, bakery, brewing) ($150K-$1.5M)</li>
                <li>• Commercial kitchen and food processing ($80K-$800K)</li>
                <li>• Packaging and labeling machinery ($60K-$400K)</li>
                <li>• Refrigeration and cold storage ($40K-$300K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Medical & Healthcare Equipment</h3>
              <p className="text-gray-600 mb-4">
                Melbourne's private healthcare sector concentrated in East Melbourne, South Yarra, and Toorak requires 
                significant medical equipment investment. We fund specialist equipment, imaging technology, dental practices, 
                and clinic fit-outs while preserving working capital for operations and enabling technology upgrades.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Imaging equipment (MRI, CT, ultrasound) ($600K-$3.5M)</li>
                <li>• Dental practices and equipment ($120K-$600K)</li>
                <li>• Specialist consulting rooms and fit-outs ($90K-$450K)</li>
                <li>• Medical technology and devices ($50K-$350K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Advanced Manufacturing</h3>
              <p className="text-gray-600 mb-4">
                Melbourne's South East corridor (Dandenong, Braeside, Clayton) remains Australia's largest manufacturing hub. 
                We finance CNC machinery, robotics, production lines, and automation equipment supporting advanced manufacturing, 
                aerospace, automotive, and export-oriented businesses.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• CNC machines and metal fabrication ($200K-$2.5M)</li>
                <li>• Robotics and automation systems ($300K-$5M)</li>
                <li>• Production lines and assembly ($250K-$3M)</li>
                <li>• Materials handling and logistics ($100K-$800K)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Hospitality & Café Equipment</h3>
              <p className="text-gray-600 mb-4">
                Melbourne's world-renowned coffee and dining culture creates strong demand for hospitality equipment finance. 
                CBD, Fitzroy, St Kilda, and suburban hubs require commercial kitchens, coffee equipment, and restaurant fit-outs. 
                Fast approvals support time-sensitive venue openings.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Commercial kitchens and cooking equipment ($60K-$350K)</li>
                <li>• Coffee machines and café fit-outs ($40K-$180K)</li>
                <li>• Refrigeration and storage ($35K-$200K)</li>
                <li>• Bar equipment and wine storage ($25K-$120K)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Asset Finance Structure Comparison</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Chattel Mortgage (Most Popular)</h3>
              <p className="text-gray-600 mb-4">
                You own the equipment from day 1. Claim GST immediately in your BAS, depreciate the asset for tax purposes, 
                and deduct interest as a business expense. Ideal for profitable businesses wanting maximum tax benefits 
                and full asset ownership.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Best For:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Profitable businesses (utilizing depreciation)</li>
                    <li>• Long-term equipment ownership</li>
                    <li>• Maximum tax efficiency</li>
                    <li>• Equipment with strong residual value</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Features:</p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Immediate GST claim (e.g., $85K on $850K asset)</li>
                    <li>• Depreciation deductions (15-40% annually)</li>
                    <li>• Balloon payment options (lower monthly cost)</li>
                    <li>• Ownership from commencement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-3">Finance Lease</h3>
              <p className="text-gray-600 mb-4">
                Lender owns equipment during the lease term, you lease it and use it in your business. Lease payments 
                are fully tax-deductible as an operating expense. Flexible end-of-term options: purchase at residual value, 
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
                Progressive ownership structure where you don't own equipment until the final payment, but use it 
                throughout the term. Simple structure with no balloon payment, making budgeting straightforward. 
                Good for businesses wanting simple ownership without complex residual calculations.
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
          <h2 className="text-3xl font-bold text-center mb-8">Why Melbourne Businesses Choose Asset Finance</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-lg font-semibold mb-2">Preserve Working Capital</h3>
              <p className="text-gray-600">
                100% finance available means no large upfront equipment payment. Keep your cash reserves for operations, 
                inventory, staff, marketing, and growth opportunities instead of depleting funds for capital purchases.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Significant Tax Benefits</h3>
              <p className="text-gray-600">
                Claim depreciation deductions, deduct interest expenses, and recover GST immediately. Tax-effective 
                structures can reduce the after-tax cost of equipment by 25-40% depending on your business tax rate.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Fast Approval Process</h3>
              <p className="text-gray-600">
                Most applications approved in 3-5 days with settlement within a week. Don't miss time-sensitive 
                supplier deals or opportunities due to slow traditional bank processes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold mb-2">Flexible Finance Structures</h3>
              <p className="text-gray-600">
                Choose from chattel mortgage, finance lease, or hire purchase. Balloon payments, seasonal payment 
                variations, and deferred commencements available to match your business cash flow cycles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">No Property Security Required</h3>
              <p className="text-gray-600">
                Equipment security only for most facilities under $500K. No need to encumber your home or commercial 
                property for standard equipment purchases. PPSR registration protects lender interest.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="text-lg font-semibold mb-2">Enable Business Growth</h3>
              <p className="text-gray-600">
                Acquire the equipment you need to win new contracts, increase production capacity, upgrade technology, 
                and scale operations. Finance facilitates growth that wouldn't be possible with cash-only purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Finance Your Melbourne Business Equipment?"
        description="Get competitive asset finance for your equipment, machinery, or vehicles. Fast approvals and flexible structures for Melbourne businesses across all industries."
      />
    </>
  );
};

export default AssetFinanceMelbourne;
