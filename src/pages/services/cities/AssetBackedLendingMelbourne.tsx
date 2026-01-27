import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Building2, Shield, MapPin, Briefcase, FileText } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const AssetBackedLendingMelbourne: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Asset Backed Lending Melbourne | Secured Business Finance VIC | Emet Capital"
        description="Asset backed lending for Melbourne businesses. Unlock capital using property, equipment, inventory or receivables as security. $100K to $20M+ facilities."
        canonical="/services/asset-backed-lending/melbourne"
        keywords="asset backed lending Melbourne, secured business finance VIC, property backed loans Melbourne, commercial lending Melbourne, asset secured finance Victoria"
        schemas={[generateServiceSchema(
          "Asset Backed Lending Melbourne",
          "Asset backed lending for Melbourne businesses. Unlock capital using property, equipment, inventory or receivables as security. $100K to $20M+ facilities.",
          "https://emetcapital.com.au/services/asset-backed-lending/melbourne"
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
              <h1 className="text-4xl md:text-5xl font-bold">Asset Backed Lending Melbourne</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Leverage your Melbourne business assets for growth capital. Commercial property, manufacturing equipment, inventory, and receivables all accepted as security.
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

      {/* Melbourne Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Melbourne Asset Backed Finance Market</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Manufacturing Hub:</strong> Australia's largest manufacturing base with substantial equipment assets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Industrial Property:</strong> Strong values across western and southeastern corridors</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Food & Beverage:</strong> Major inventory and receivables from processing sector</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Active Lender Market:</strong> 55+ private lenders operating in Victoria</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Melbourne CBD:</strong> Commercial offices, professional services receivables</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Western Suburbs:</strong> Manufacturing equipment, industrial property, logistics</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>South East Corridor:</strong> Automotive, food processing, warehousing</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Port of Melbourne:</strong> Import/export receivables, bonded inventory</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Assets We Finance in Melbourne</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Commercial Property */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Commercial Property</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Industrial, warehouse, office, and retail properties across Greater Melbourne.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 70% LVR (first mortgage)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Second mortgages to 80% combined
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Industrial & manufacturing sites
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Leased or owner-occupied
                  </li>
                </ul>
              </div>

              {/* Manufacturing Equipment */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Shield className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Manufacturing Equipment</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  CNC machines, production lines, packaging equipment, and specialist machinery.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 80% of equipment value
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Production line financing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Food processing equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Specialist valuers available
                  </li>
                </ul>
              </div>

              {/* Inventory & Receivables */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FileText className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Inventory & Receivables</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Finished goods, raw materials, and trade receivables from quality debtors.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 60% of inventory value
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 85% of receivables
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    FMCG & wholesale specialists
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Seasonal facilities available
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
            <h2 className="text-3xl font-bold mb-12 text-center">Common Uses in Melbourne</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Manufacturing Expansion</h3>
                <p className="text-gray-600">Use equity in existing equipment and property to fund new production lines, facility upgrades, or automation.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Supply Chain Finance</h3>
                <p className="text-gray-600">Leverage inventory and receivables to improve supplier terms, bulk purchasing, or seasonal stock building.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Property Development</h3>
                <p className="text-gray-600">Use existing commercial property equity to fund site acquisition, DA costs, or pre-construction works.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Business Acquisition</h3>
                <p className="text-gray-600">Leverage combined assets (yours plus target) to fund strategic acquisitions and consolidation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melbourne Industries */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Industries We Serve in Melbourne</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Manufacturing",
                "Food & Beverage",
                "Automotive",
                "Logistics & Transport",
                "Wholesale Distribution",
                "Construction",
                "Healthcare",
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
            <h2 className="text-3xl font-bold mb-6">Unlock Your Melbourne Asset Value</h2>
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
              <Link to="/services/first-second-mortgages/melbourne" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">1st & 2nd Mortgages Melbourne</h3>
                <p className="text-gray-600 text-sm">Property-secured lending for Melbourne businesses</p>
              </Link>
              <Link to="/services/bridging-finance/melbourne" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Bridging Finance Melbourne</h3>
                <p className="text-gray-600 text-sm">Short-term funding secured by property</p>
              </Link>
              <Link to="/services/asset-finance/melbourne" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Asset Finance Melbourne</h3>
                <p className="text-gray-600 text-sm">Equipment and vehicle finance solutions</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetBackedLendingMelbourne;
