import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Building2, Shield, MapPin, Briefcase, FileText } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const AssetBackedLendingAdelaide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Asset Backed Lending Adelaide | Secured Business Finance SA | Emet Capital"
        description="Asset backed lending for Adelaide businesses. Unlock capital using property, equipment, inventory or receivables as security. $100K to $20M+ facilities for SA enterprises."
        canonical="/services/asset-backed-lending/adelaide"
        keywords="asset backed lending Adelaide, secured business finance SA, property backed loans Adelaide, commercial lending Adelaide, asset secured finance South Australia"
        schemas={[generateServiceSchema(
          "Asset Backed Lending Adelaide",
          "Asset backed lending for Adelaide businesses. Unlock capital using property, equipment, inventory or receivables as security. $100K to $20M+ facilities for SA enterprises.",
          "https://emetcapital.com.au/services/asset-backed-lending/adelaide"
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
              <h1 className="text-4xl md:text-5xl font-bold">Asset Backed Lending Adelaide</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Unlock the value in your Adelaide business assets. Commercial property, manufacturing equipment, inventory, and receivables can secure flexible funding from $100K to $20M+ across South Australia.
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

      {/* Adelaide Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Adelaide Asset Backed Finance Market</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Manufacturing Hub:</strong> Strong defence, automotive and food processing equipment base</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Wine & Agriculture:</strong> Barossa, McLaren Vale and regional farming assets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Healthcare Growth:</strong> Medical equipment and practice assets increasing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Competitive Rates:</strong> Lower property costs enable better LVRs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Adelaide CBD:</strong> Commercial offices, professional services receivables</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Edinburgh/Salisbury:</strong> Defence manufacturing, industrial equipment</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Barossa/Clare:</strong> Winery equipment, agricultural machinery</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Osborne:</strong> Naval shipbuilding, marine industrial assets</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Assets We Finance in Adelaide</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Commercial Property */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Building2 className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Commercial Property</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Offices, retail, industrial, and warehouse properties across Greater Adelaide and regional SA.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 70% LVR (first mortgage)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Second mortgages available
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Regional property considered
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Winery & rural commercial
                  </li>
                </ul>
              </div>

              {/* Equipment & Machinery */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <Shield className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Equipment & Machinery</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Manufacturing, agricultural, defence, and specialist equipment as security.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 80% of equipment value
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Wine production equipment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Defence manufacturing assets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Food processing machinery
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
                  Stock financing and invoice-backed facilities for wholesalers and manufacturers.
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
                    Wine stock financing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Defence contractor invoices
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
            <h2 className="text-3xl font-bold mb-12 text-center">Common Uses in Adelaide</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Manufacturing Expansion</h3>
                <p className="text-gray-600">Leverage production equipment and facility equity to fund capacity expansion or modernisation.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Vintage Financing</h3>
                <p className="text-gray-600">Wine industry funding using stock, equipment and vineyard property as combined security.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Defence Contract Support</h3>
                <p className="text-gray-600">Working capital and equipment funding secured against defence contract receivables.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Business Acquisition</h3>
                <p className="text-gray-600">Use existing business assets as security for acquisitions of complementary SA businesses.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adelaide Industries */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Industries We Serve in Adelaide</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Wine & Viticulture",
                "Defence Manufacturing",
                "Food Processing",
                "Healthcare & Medical",
                "Agriculture",
                "Professional Services",
                "Wholesale & Distribution",
                "Construction"
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
            <h2 className="text-3xl font-bold mb-6">Unlock Your Adelaide Asset Value</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a confidential assessment of your borrowing capacity based on your business assets across South Australia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Asset Assessment
              </Link>
              <a
                href="tel:0485952651"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Call 0485 952 651
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
              <Link to="/services/first-second-mortgages/adelaide" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">1st & 2nd Mortgages Adelaide</h3>
                <p className="text-gray-600 text-sm">Property-secured lending for Adelaide businesses</p>
              </Link>
              <Link to="/services/bridging-finance/adelaide" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Bridging Finance Adelaide</h3>
                <p className="text-gray-600 text-sm">Short-term funding secured by property</p>
              </Link>
              <Link to="/services/asset-finance/adelaide" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Asset Finance Adelaide</h3>
                <p className="text-gray-600 text-sm">Equipment and vehicle finance solutions</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetBackedLendingAdelaide;
