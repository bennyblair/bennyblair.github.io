import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Wrench, Building2, Truck, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const AssetFinanceGoldCoast: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Asset Finance Gold Coast | QLD Commercial Finance | Emet Capital"
        description="Asset finance for Gold Coast businesses. Fund vehicles, equipment, and machinery with flexible terms. Fast approvals from $30K to $5M+ across the Gold Coast region."
        canonical="/asset-finance-gold-coast"
        keywords="asset finance Gold Coast, asset finance QLD, commercial loans Gold Coast, business finance Gold Coast, equipment finance Queensland"
        schemas={[generateServiceSchema(
          "Asset Finance Gold Coast",
          "Asset finance for Gold Coast businesses. Fund vehicles, equipment, and machinery with flexible terms. Fast approvals from $30K to $5M+ across the Gold Coast region.",
          "https://emetcapital.com.au/asset-finance-gold-coast"
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
              <h1 className="text-4xl md:text-5xl font-bold">Asset Finance Gold Coast</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Equipment and asset finance for Gold Coast businesses. From construction equipment to marine vessels, hospitality fit-outs to medical equipment - flexible funding for one of Australia's fastest-growing regions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">150+ Deals</div>
                <div className="text-blue-200 text-sm">Gold Coast Asset Finance</div>
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

      {/* Gold Coast Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Gold Coast Business Equipment Finance</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Construction Boom:</strong> Rapid residential and commercial development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Tourism & Hospitality:</strong> Major visitor destination with year-round activity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Marine Industry:</strong> Boat building, charter operations, and marine services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Healthcare Growth:</strong> Expanding medical and wellness sector</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Southport & Bundall:</strong> Commercial services & medical equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Arundel & Molendinar:</strong> Industrial & manufacturing equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Surfers Paradise & Broadbeach:</strong> Hospitality & tourism equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Coomera & Helensvale:</strong> Marine, transport & logistics</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Asset Finance Solutions for Gold Coast</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Construction Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Wrench className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Construction Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Excavators, cranes, concrete equipment, scaffolding for the Gold Coast's building boom.
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
                    Project-based finance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    New & used equipment
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
                  Commercial kitchens, bar fit-outs, coffee machines, restaurant equipment.
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
                    Fit-out packages
                  </li>
                </ul>
              </div>

              {/* Marine & Boats */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Marine & Boats</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Charter vessels, commercial boats, marine equipment for the Gold Coast's waterways.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $100K-$3M typical range
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    5-10 year terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Seasonal structures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    New & used vessels
                  </li>
                </ul>
              </div>

              {/* Tourism & Recreation */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Tourism & Recreation</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Theme park equipment, adventure tourism gear, recreational vehicles for operators.
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
                    Peak season structures
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Specialised equipment
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
                  Trucks, vans, forklifts, delivery vehicles for the Gold Coast's growing population.
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

              {/* Medical & Healthcare */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Medical & Healthcare</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Diagnostic equipment, dental chairs, cosmetic surgery equipment, practice fit-outs.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    $50K-$2M typical range
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
                    Choose your equipment and obtain quotes from suppliers. We can work with any reputable supplier across the Gold Coast region.
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
                <h3 className="text-lg font-semibold mb-2">What equipment can be financed on the Gold Coast?</h3>
                <p className="text-gray-600">
                  Construction equipment, hospitality fit-outs, marine vessels, tourism equipment, commercial vehicles, medical equipment, and more. Both new and used assets can be financed.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Can you finance equipment for hospitality businesses?</h3>
                <p className="text-gray-600">
                  Yes. We understand the Gold Coast's tourism-driven economy. Commercial kitchens, bar fit-outs, coffee machines, and restaurant equipment can all be financed with flexible structures.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">What are typical asset finance rates on the Gold Coast?</h3>
                <p className="text-gray-600">
                  Rates typically range from 6-12% depending on equipment type, credit profile, term length, and structure. Hospitality and tourism equipment may have specific considerations.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Do you finance boats and marine equipment?</h3>
                <p className="text-gray-600">
                  Yes. The Gold Coast is a major marine industry hub. Charter vessels, commercial boats, and marine equipment can be financed with terms up to 10 years.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">Do you work with Gold Coast equipment suppliers?</h3>
                <p className="text-gray-600">
                  Yes. We have established relationships with equipment suppliers across the Gold Coast and can work with any reputable vendor. We can also finance equipment from Brisbane suppliers.
                </p>
              </div>

              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-2">How quickly can I get equipment financed?</h3>
                <p className="text-gray-600">
                  Conditional approval within 48-72 hours. Full settlement within 5-7 days for straightforward applications. We understand Gold Coast businesses need equipment quickly.
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
            Ready to Finance Your Gold Coast Business Equipment?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get expert asset finance advice and competitive rates for your Gold Coast business.
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

export default AssetFinanceGoldCoast;
