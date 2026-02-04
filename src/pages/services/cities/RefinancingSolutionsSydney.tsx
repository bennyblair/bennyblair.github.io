import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Building2, Shield, MapPin, Briefcase, TrendingUp, DollarSign, RefreshCw } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const RefinancingSolutionsSydney: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Commercial Refinancing Sydney | Business Loan Refinance NSW | Emet Capital"
        description="Refinance commercial property and business loans in Sydney. Access better rates, improved terms, and unlock equity. $250K to $100M+ facilities across NSW."
        canonical="/services/refinancing-solutions/sydney"
        keywords="commercial refinancing Sydney, business loan refinance NSW, property refinancing Sydney, debt refinancing Sydney, loan restructure Sydney"
        schemas={[generateServiceSchema(
          "Commercial Refinancing Sydney",
          "Refinance commercial property and business loans in Sydney. Access better rates, improved terms, and unlock equity. $250K to $100M+ facilities across NSW.",
          "https://emetcapital.com.au/services/refinancing-solutions/sydney"
        )]}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/services/refinancing-solutions" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Refinancing Solutions
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <MapPin className="mr-3" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">Commercial Refinancing Sydney</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Optimise your Sydney commercial finance with better rates, improved terms, and access to equity. Refinance property loans, business debt, and equipment finance from $250K to $100M+.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">$250K-$100M+</div>
                <div className="text-blue-200 text-sm">Facility Range</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">Up to 80%</div>
                <div className="text-blue-200 text-sm">LVR Available</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">1-30 Years</div>
                <div className="text-blue-200 text-sm">Flexible Terms</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">3-6 Weeks</div>
                <div className="text-blue-200 text-sm">Typical Settlement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sydney Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Sydney Commercial Refinancing Market</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Opportunities</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Premium Values:</strong> Sydney property appreciation creates significant equity access opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Competitive Lending:</strong> Strong lender competition enables better rate negotiations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Diverse Options:</strong> Bank and non-bank lenders active across all property types</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Growth Capital:</strong> Unlock equity for expansion, acquisitions, or working capital</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Business Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Sydney CBD:</strong> Premium office and retail property refinancing</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>North Sydney:</strong> Commercial and mixed-use property debt restructure</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Western Sydney:</strong> Industrial and logistics property refinancing</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner West:</strong> Mixed commercial and development site refinance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refinancing Types */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Refinancing Solutions in Sydney</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Rate & Term Refinance */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <TrendingUp className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Rate & Term Refinance</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Replace existing loans with better rates and improved terms without changing loan amounts.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Lower interest rates
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Extended loan terms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Reduced monthly payments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Remove restrictive covenants
                  </li>
                </ul>
              </div>

              {/* Cash-Out Refinance */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Cash-Out Refinance</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Access equity in your Sydney property for business expansion, acquisitions, or working capital.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Unlock property equity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Fund business growth
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Acquire additional assets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Up to 80% LVR available
                  </li>
                </ul>
              </div>

              {/* Debt Consolidation */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <RefreshCw className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-xl font-semibold">Debt Consolidation</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Combine multiple business debts into a single facility with streamlined management.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Single monthly payment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Simplified administration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Potentially lower costs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    Improved cash flow
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
            <h2 className="text-3xl font-bold mb-12 text-center">Common Refinancing Scenarios in Sydney</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Bank to Non-Bank Transition</h3>
                <p className="text-gray-600">Move from restrictive bank facilities to flexible non-bank lenders with faster decisions and fewer covenants.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Portfolio Optimisation</h3>
                <p className="text-gray-600">Restructure multiple Sydney investment properties under improved lending arrangements and rates.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Equity Release</h3>
                <p className="text-gray-600">Access capital growth in Sydney commercial property to fund acquisitions, fit-outs, or business expansion.</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-semibold mb-3">Maturity Refinance</h3>
                <p className="text-gray-600">Replace expiring facilities before maturity with improved terms and competitive rates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sydney Industries */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Industries We Serve in Sydney</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Property Investment",
                "Professional Services",
                "Healthcare & Medical",
                "Retail & Hospitality",
                "Manufacturing",
                "Transport & Logistics",
                "Construction",
                "Technology"
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
            <h2 className="text-3xl font-bold mb-12 text-center">How Refinancing Works</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Loan Review</h3>
                <p className="text-gray-600 text-sm">We analyse your existing facilities and identify refinancing opportunities</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Lender Search</h3>
                <p className="text-gray-600 text-sm">We compare options across 50+ lenders to find optimal rates and terms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Application</h3>
                <p className="text-gray-600 text-sm">We prepare and submit applications with supporting documentation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                <h3 className="font-semibold mb-2">Settlement</h3>
                <p className="text-gray-600 text-sm">New facility settles, existing loans discharged, savings begin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Optimise Your Sydney Commercial Finance</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free assessment of your refinancing options. Our Sydney commercial finance specialists will identify potential savings and equity access opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Get Refinance Assessment
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
              <Link to="/services/first-second-mortgages/sydney" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">1st & 2nd Mortgages Sydney</h3>
                <p className="text-gray-600 text-sm">Property-secured lending for Sydney businesses</p>
              </Link>
              <Link to="/services/bridging-finance/cities/sydney" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Bridging Finance Sydney</h3>
                <p className="text-gray-600 text-sm">Short-term funding while refinancing settles</p>
              </Link>
              <Link to="/services/debt-consolidation" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <h3 className="font-semibold mb-2">Debt Consolidation</h3>
                <p className="text-gray-600 text-sm">Combine multiple debts into one facility</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefinancingSolutionsSydney;
