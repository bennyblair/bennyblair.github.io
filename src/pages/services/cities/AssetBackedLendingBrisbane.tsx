import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Building2, Shield, MapPin, Briefcase, FileText, Ship } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const AssetBackedLendingBrisbane: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Asset Backed Lending Brisbane | Secured Business Finance QLD | Emet Capital"
        description="Asset backed lending for Brisbane businesses. Unlock capital using property, equipment, inventory or receivables as security. $100K to $20M+ facilities."
        canonical="/services/asset-backed-lending/brisbane"
        keywords="asset backed lending Brisbane, secured business finance QLD, property backed loans Brisbane, commercial lending Brisbane, asset secured finance Queensland"
        schemas={[generateServiceSchema(
          "Asset Backed Lending Brisbane",
          "Asset backed lending for Brisbane businesses. Unlock capital using property, equipment, inventory or receivables as security. $100K to $20M+ facilities.",
          "https://emetcapital.com.au/services/asset-backed-lending/brisbane"
        )]}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/services/asset-backed-lending" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Asset Backed Lending
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <MapPin className="mr-3" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">Asset Backed Lending Brisbane</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Unlock the value in your Brisbane business assets. Commercial property, mining equipment, agricultural assets, and trade receivables can secure flexible funding from $100K to $20M+.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">$100K-$20M+</div>
                <div className="text-blue-200 text-sm">Facility Range</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">65-80%</div>
                <div className="text-blue-200 text-sm">Typical LVR</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">1-5 Years</div>
                <div className="text-blue-200 text-sm">Flexible Terms</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">5-14 Days</div>
                <div className="text-blue-200 text-sm">Approval Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Brisbane Asset Backed Finance Market</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Resources Gateway:</strong> Mining services equipment and contractor receivables</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Agricultural Hub:</strong> Farm equipment, livestock, and crop-backed lending</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Growth Market:</strong> Rising commercial property values, strong industrial sector</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Trade Finance:</strong> Strong Port of Brisbane export receivables</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Brisbane CBD:</strong> Commercial property, professional services receivables</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Tradezone & Eagle Farm:</strong> Industrial equipment, logistics assets</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>South West Corridor:</strong> Mining services equipment, transport fleets</span>
                  </li>
                  <li className="flex items-start">
                    <Ship className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Port of Brisbane:</strong> Trade receivables, bonded goods, export finance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Types */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Assets We Finance in Brisbane</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Commercial Property */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Commercial Property</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Industrial, warehouse, office, retail, and rural commercial property across Queensland.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 70% LVR (first mortgage)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Regional Queensland accepted
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Development sites considered
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Rural & semi-rural included
                  </li>
                </ul>
              </div>

              {/* Mining & Agricultural Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Shield className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Heavy Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mining equipment, earthmoving machinery, agricultural assets, and transport fleets.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 80% of equipment value
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Yellow goods specialists
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Farm machinery accepted
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Fleet financing available
                  </li>
                </ul>
              </div>

              {/* Trade Receivables & Inventory */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FileText className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Trade & Inventory</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Mining contractor receivables, export trade, and wholesale inventory financing.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Mining contractor receivables
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Export trade finance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Agricultural commodities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Bonded warehouse stock
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Common Uses in Brisbane</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Mining Services Growth</h3>
                <p className="text-gray-600">Leverage existing equipment and contractor receivables to fund fleet expansion, new project mobilisation, or working capital during scale-up.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Agricultural Expansion</h3>
                <p className="text-gray-600">Use farm property, equipment, and crop pre-sales to fund land acquisition, infrastructure improvements, or seasonal working capital.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Export Trade Finance</h3>
                <p className="text-gray-600">Unlock capital against confirmed export orders and quality receivables from international buyers through Port of Brisbane.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Construction Growth</h3>
                <p className="text-gray-600">Use equipment equity and progress claims to fund new project mobilisation during Brisbane's Olympic infrastructure boom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane Industries */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Industries We Serve in Brisbane</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Mining Services",
                "Agriculture",
                "Construction",
                "Transport & Logistics",
                "Manufacturing",
                "Wholesale Trade",
                "Export/Import",
                "Professional Services"
              ].map((industry, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                  <Briefcase className="text-blue-600 mx-auto mb-2" size={24} />
                  <span className="text-sm font-medium">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Olympic Growth */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Brisbane 2032 Olympics Opportunity</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6">
                Brisbane's selection as 2032 Olympic host city is driving unprecedented infrastructure investment. Businesses with assets in construction, transport, hospitality, and property are positioned to benefit from:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$5B+</div>
                  <div className="text-gray-600 text-sm">Infrastructure spend to 2032</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Rising</div>
                  <div className="text-gray-600 text-sm">Commercial property values</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Strong</div>
                  <div className="text-gray-600 text-sm">Contractor demand</div>
                </div>
              </div>
              <p className="text-gray-700 mt-6">
                Asset backed lending allows Brisbane businesses to leverage current assets to fund growth and capture Olympic-related opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Asset Assessment</h3>
                <p className="text-gray-600 text-sm">We review your assets, their values, and lending potential</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Lender Matching</h3>
                <p className="text-gray-600 text-sm">We match your profile to lenders who specialise in your asset type</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Valuation & Approval</h3>
                <p className="text-gray-600 text-sm">Independent valuations arranged, credit approval obtained</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Settlement</h3>
                <p className="text-gray-600 text-sm">Funds released upon security registration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Unlock Your Brisbane Asset Value</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a confidential assessment of your borrowing capacity based on your business assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Asset Assessment
              </Link>
              <a
                href="tel:1300123456"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Call 1300 123 456
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/services/first-second-mortgages/brisbane" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">1st & 2nd Mortgages Brisbane</h3>
                <p className="text-gray-600 text-sm">Property-secured lending for Brisbane businesses</p>
              </Link>
              <Link to="/services/bridging-finance/brisbane" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Bridging Finance Brisbane</h3>
                <p className="text-gray-600 text-sm">Short-term funding secured by property</p>
              </Link>
              <Link to="/services/asset-finance/brisbane" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Asset Finance Brisbane</h3>
                <p className="text-gray-600 text-sm">Equipment and vehicle finance solutions</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetBackedLendingBrisbane;
