import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Wrench, Building2, Truck, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const AssetFinanceSydney: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Asset Finance Sydney | NSW Commercial Finance | Emet Capital"
        description="Asset finance for Sydney businesses. Fund vehicles, equipment, and machinery with flexible terms. Fast approvals from $30K to $5M+."
        canonical="/asset-finance-sydney"
        keywords="asset finance Sydney, asset finance NSW, commercial loans Sydney, business finance Sydney, sydney property finance"
        schemas={[generateServiceSchema(
          "Asset Finance Sydney",
          "Asset finance for Sydney businesses. Fund vehicles, equipment, and machinery with flexible terms. Fast approvals from $30K to $5M+.",
          "https://emetcapital.com.au/asset-finance-sydney"
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
              <h1 className="text-4xl md:text-5xl font-bold">Asset Finance Sydney</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Equipment and asset finance for Sydney businesses. From construction equipment to medical technology, manufacturing machinery to transport fleets - flexible funding for growth.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">450+ Deals</div>
                <div className="text-blue-200 text-sm">Sydney Asset Finance</div>
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

      {/* Sydney Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Sydney Business Equipment Finance</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Largest Business Hub:</strong> Australia's biggest equipment finance market by volume</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Diverse Industries:</strong> Construction, healthcare, hospitality, manufacturing, transport</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Infrastructure Boom:</strong> Major projects driving equipment demand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Local Suppliers:</strong> Strong relationships with Sydney equipment vendors</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Parramatta & Western Sydney:</strong> Construction & industrial equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>North Shore:</strong> Medical equipment & healthcare technology</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>South Sydney:</strong> Manufacturing machinery & production equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>CBD & Inner City:</strong> Hospitality fit-outs & technology</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Asset Finance Solutions for Sydney</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Construction Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Wrench className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Construction Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Excavators, bobcats, scaffolding, concrete equipment for Sydney's building boom.
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
                    New & used equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Seasonal payment options
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
                  MRI machines, ultrasound, dental chairs, practice fit-outs for healthcare professionals.
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
                    Tax-effective structures
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
                  Trucks, vans, forklifts, trailers for Sydney's freight and distribution network.
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
                    Fleet financing available
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Residual value options
                  </li>
                </ul>
              </div>

              {/* Manufacturing Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Wrench className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Manufacturing Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  CNC machinery, robotics, conveyors, production lines for Sydney manufacturers.
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
                    Automation funding
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Balloon payment options
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
                  Commercial kitchens, coffee machines, bar equipment, restaurant fit-outs.
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
                    Rapid settlement
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Seasonal structures
                  </li>
                </ul>
              </div>

              {/* Technology & IT */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Technology & IT</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Servers, software, telecommunications, cybersecurity infrastructure for businesses.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $20K-$500K typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    2-4 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Technology refresh cycles
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Software licensing options
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
                    Choose your equipment and obtain quotes from suppliers. We can work with any reputable supplier across Sydney.
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
                <h3 className="text-lg font-semibold mb-2">What equipment can be financed in Sydney?</h3>
                <p className="text-gray-600">
                  Almost any business equipment: construction machinery, medical equipment, vehicles, manufacturing equipment, hospitality fit-outs, IT hardware, and more. Both new and used assets can be financed.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">What are typical asset finance rates in Sydney?</h3>
                <p className="text-gray-600">
                  Rates typically range from 6-12% depending on equipment type, credit profile, term length, and structure. Newer equipment and stronger credit profiles attract better rates.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Can I finance used equipment?</h3>
                <p className="text-gray-600">
                  Yes. Used equipment can be financed, typically up to 7-10 years old depending on asset type. Newer used equipment (2-3 years) attracts the best terms.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Do you work with Sydney equipment suppliers?</h3>
                <p className="text-gray-600">
                  Yes. We have established relationships with equipment suppliers across Sydney and can work with any reputable vendor. We can also finance equipment purchased from interstate or imported.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">What's the difference between chattel mortgage and finance lease?</h3>
                <p className="text-gray-600">
                  Chattel mortgage: you own the asset, claim GST upfront, and depreciate. Finance lease: rental payments fully deductible, asset stays off balance sheet. Your accountant can advise which suits your tax position.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-2">How quickly can I get equipment financed?</h3>
                <p className="text-gray-600">
                  Conditional approval within 48-72 hours. Full settlement within 5-7 days for straightforward applications. We understand Sydney businesses need equipment quickly.
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
            Ready to Finance Your Sydney Business Equipment?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get expert asset finance advice and competitive rates for your Sydney business.
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

export default AssetFinanceSydney;
