import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Wrench, Building2, Truck, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const AssetFinanceMelbourne: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Asset Finance Melbourne | VIC Commercial Finance | Emet Capital"
        description="Asset finance for Melbourne businesses. Fund vehicles, equipment, and machinery with flexible terms. Fast approvals from $30K to $5M+."
        canonical="/asset-finance-melbourne"
        keywords="asset finance Melbourne, asset finance VIC, commercial loans Melbourne, business finance Melbourne, melbourne property finance"
        schemas={[generateServiceSchema(
          "Asset Finance Melbourne",
          "Asset finance for Melbourne businesses. Fund vehicles, equipment, and machinery with flexible terms. Fast approvals from $30K to $5M+.",
          "https://emetcapital.com.au/asset-finance-melbourne"
        )]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/services/asset-finance" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Asset Finance
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <MapPin className="mr-3" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">Asset Finance Melbourne</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Equipment and asset finance for Melbourne's diverse business landscape. From manufacturing in Dandenong to medical equipment in East Melbourne - flexible funding solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">380+ Deals</div>
                <div className="text-blue-200 text-sm">Melbourne Asset Finance</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">$30K-$5M</div>
                <div className="text-blue-200 text-sm">Typical Range</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">2-7 Years</div>
                <div className="text-blue-200 text-sm">Flexible Terms</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">48-72hrs</div>
                <div className="text-blue-200 text-sm">Approval Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melbourne Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Melbourne Business Equipment Finance</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Manufacturing Hub:</strong> Australia's largest manufacturing center requiring diverse equipment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Food Processing:</strong> Major food manufacturing requiring specialized equipment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Healthcare Leader:</strong> Strong medical equipment and technology demand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Transport Hub:</strong> Distribution center for southeastern Australia</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Dandenong South:</strong> Manufacturing & industrial equipment hub</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Richmond/Collingwood:</strong> Food manufacturing & processing equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>East Melbourne:</strong> Medical equipment & healthcare technology</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>CBD & Docklands:</strong> Hospitality equipment & technology</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Asset Types */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Asset Finance Solutions for Melbourne</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Manufacturing Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Wrench className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Manufacturing Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  CNC machinery, production lines, robotics, conveyors for Melbourne's advanced manufacturing.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $200K-$5M typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    5-10 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    New & imported equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Automation solutions
                  </li>
                </ul>
              </div>

              {/* Food Processing */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Food Processing</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Commercial kitchens, packaging lines, refrigeration, processing equipment for food manufacturers.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $100K-$3M typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    3-7 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    HACCP compliant equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Cold storage solutions
                  </li>
                </ul>
              </div>

              {/* Medical Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Medical Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Diagnostic equipment, imaging technology, dental equipment, practice fit-outs.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $100K-$3M typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    5-7 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Technology upgrades
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Practice expansion funding
                  </li>
                </ul>
              </div>

              {/* Transport & Logistics */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Truck className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Transport & Logistics</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Trucks, vans, forklifts, warehouse equipment for distribution operations.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $40K-$1.5M typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    3-5 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Fleet solutions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Novated lease options
                  </li>
                </ul>
              </div>

              {/* Construction Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Wrench className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Construction Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Excavators, earthmoving, scaffolding, concrete equipment for construction projects.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $50K-$2M typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    3-7 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Used equipment financing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Seasonal payments
                  </li>
                </ul>
              </div>

              {/* Hospitality Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Hospitality Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Restaurant fit-outs, commercial kitchens, bar equipment for Melbourne's cafe culture.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $30K-$800K typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    2-5 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Fast venue openings
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Complete fit-out packages
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Structures */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Asset Finance Structures</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Chattel Mortgage</h3>
                <p className="text-gray-600 mb-4">
                  Own the asset from day one. Claim GST input credit and depreciation. Interest deductible.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Asset ownership immediate
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    GST claimable upfront
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Balloon payment options
                  </li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Finance Lease</h3>
                <p className="text-gray-600 mb-4">
                  Off-balance sheet financing. Regular payments 100% deductible. Purchase option at term end.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Payments fully deductible
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Asset not on balance sheet
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Purchase option at end
                  </li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Hire Purchase</h3>
                <p className="text-gray-600 mb-4">
                  Fixed payment structure with ownership transfer at completion. Simple and predictable.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Fixed monthly payments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    No residual at end
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Ownership on completion
                  </li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Operating Lease</h3>
                <p className="text-gray-600 mb-4">
                  Use asset without ownership. Regular payments. Return or upgrade at term end.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Lower monthly payments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Upgrade flexibility
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    No residual risk
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Asset Finance Process</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Equipment Selection</h3>
                  <p className="text-gray-600">
                    Choose your equipment and obtain quotes from suppliers. We work with all Melbourne equipment vendors.
                  </p>
                  <div className="mt-2 text-sm text-blue-600 font-medium">Timeframe: Day 1</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Application & Assessment</h3>
                  <p className="text-gray-600">
                    Submit application with equipment quote, business financials, and asset details. Quick credit assessment.
                  </p>
                  <div className="mt-2 text-sm text-blue-600 font-medium">Timeframe: Days 1-2</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Approval & Documentation</h3>
                  <p className="text-gray-600">
                    Receive conditional approval within 48-72 hours. Complete documentation and structure selection.
                  </p>
                  <div className="mt-2 text-sm text-blue-600 font-medium">Timeframe: Days 2-3</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Settlement & Delivery</h3>
                  <p className="text-gray-600">
                    Funds paid directly to supplier. Take delivery of your equipment and start using it immediately.
                  </p>
                  <div className="mt-2 text-sm text-blue-600 font-medium">Timeframe: Days 4-7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">What equipment can be financed in Melbourne?</h3>
                <p className="text-gray-600">
                  Manufacturing equipment, food processing machinery, medical equipment, vehicles, construction equipment, hospitality fit-outs, IT hardware, and more. Both new and used assets can be financed.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Do you finance imported equipment?</h3>
                <p className="text-gray-600">
                  Yes. We can finance equipment imported from overseas. We work with customs procedures and can structure payments to align with equipment arrival and commissioning.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Can manufacturing equipment be financed?</h3>
                <p className="text-gray-600">
                  Absolutely. We specialize in manufacturing equipment finance including CNC machinery, robotics, production lines, and specialized industrial equipment. Terms up to 10 years available.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">What's the process for food processing equipment?</h3>
                <p className="text-gray-600">
                  Same as standard equipment finance but we understand HACCP requirements, cold storage needs, and packaging line specifications. We work with food industry suppliers regularly.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Are there tax benefits for equipment finance?</h3>
                <p className="text-gray-600">
                  Yes. Depending on structure: chattel mortgage allows depreciation and GST claims; finance lease offers 100% deductible payments. Your accountant can advise the best structure for your tax position.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-2">How quickly can equipment be financed?</h3>
                <p className="text-gray-600">
                  Conditional approval within 48-72 hours. Full settlement within 5-7 days for standard applications. We understand Melbourne manufacturers need quick access to equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Finance Your Melbourne Business Equipment?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get expert asset finance advice and competitive rates for your Melbourne business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
            >
              Get Started Today
            </Link>
            <Link
              to="/services/asset-finance"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Learn More About Asset Finance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetFinanceMelbourne;
