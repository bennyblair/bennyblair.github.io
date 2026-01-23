import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Home, Building2, Hammer, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const BridgingFinanceAdelaide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Bridging Finance Adelaide | SA Commercial Finance | Emet Capital"
        description="Fast bridging loans in Adelaide SA. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates."
        canonical="/bridging-finance-adelaide"
        keywords="bridging finance Adelaide, bridging finance SA, commercial loans Adelaide, business finance Adelaide, adelaide property finance"
        schemas={[generateServiceSchema(
          "Bridging Finance Adelaide",
          "Fast bridging loans in Adelaide SA. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates.",
          "https://emetcapital.com.au/bridging-finance-adelaide"
        )]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <Link to="/services/bridging-finance" className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="mr-2" size={20} />
            Back to Bridging Finance
          </Link>
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <MapPin className="mr-3" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold">Bridging Finance Adelaide</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Fast bridging loans for Adelaide's growing property market. From coastal living to Hills lifestyle, we fund property transitions, developments, and defense sector opportunities across Greater Adelaide.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">24-48hrs</div>
                <div className="text-blue-200 text-sm">Approval Time</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">Up to 80%</div>
                <div className="text-blue-200 text-sm">LVR Available</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">1-24 months</div>
                <div className="text-blue-200 text-sm">Flexible Terms</div>
              </div>
              <div className="bg-blue-800/50 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">$100K-$6M</div>
                <div className="text-blue-200 text-sm">Loan Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adelaide Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Adelaide's Property Market Dynamics</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Affordability Leader:</strong> Most affordable capital city with strong lifestyle appeal</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Defense Hub:</strong> Growing defense sector creating professional market demand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Interstate Migration:</strong> Increasing relocations from Sydney/Melbourne for lifestyle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Development Activity:</strong> Urban infill and CBD revitalization projects</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Suburbs & Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Coastal Suburbs:</strong> Glenelg, Brighton, Henley Beach - beachside lifestyle</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Eastern Suburbs:</strong> Burnside, Magill, Norwood - heritage and prestige</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Adelaide Hills:</strong> Stirling, Aldgate, Hahndorf - lifestyle tree change</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Growth Corridors:</strong> Mawson Lakes, Golden Grove, Mount Barker - family market</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Adelaide Bridging Finance Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Home className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Interstate Relocations</h3>
                <p className="text-gray-700 mb-4">
                  Sydney and Melbourne buyers securing Adelaide properties before selling interstate, capitalizing on Adelaide's affordability and lifestyle.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Interstate to Adelaide moves</li>
                  <li>• Affordability arbitrage</li>
                  <li>• Lifestyle upgrades</li>
                  <li>• Cross-state coordination</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Coastal Lifestyle</h3>
                <p className="text-gray-700 mb-4">
                  Upgrading to beachside suburbs (Glenelg, Brighton, Henley Beach) or Adelaide Hills properties before selling existing homes.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Beach suburb upgrades</li>
                  <li>• Hills lifestyle properties</li>
                  <li>• Prestige eastern suburbs</li>
                  <li>• Market timing advantage</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Hammer className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Infill Development</h3>
                <p className="text-gray-700 mb-4">
                  Fast acquisition of infill development sites in established suburbs while arranging planning approvals and construction finance.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Urban infill sites</li>
                  <li>• Townhouse developments</li>
                  <li>• Planning approval periods</li>
                  <li>• Code-compliant developments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adelaide-Specific Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Adelaide Bridging Finance Examples</h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Glenelg Beachside Upgrade</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Melbourne couple relocating to Adelaide, upgrading from Hawthorn apartment ($1.2M) to Glenelg beachfront house ($950K). Wanted to secure Adelaide property before listing Melbourne apartment for sale.
                    </p>
                    <h4 className="font-semibold mb-2 text-blue-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $680K (9 months)</li>
                      <li>• Secured against both properties</li>
                      <li>• Glenelg house settled first</li>
                      <li>• Melbourne apartment sold after 6 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Glenelg Property:</span>
                        <span className="font-semibold">$950,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$680,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Term:</span>
                        <span className="font-semibold">6 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Cost:</span>
                        <span className="font-semibold">$30,600</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Benefit:</span>
                        <span className="font-semibold text-green-600">$250K cash remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <Building2 className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Norwood Townhouse Development</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Developer identified 850sqm site in Norwood for 4-townhouse development. Needed fast acquisition before competing offers, with 8-month planning approval process ahead under new code.
                    </p>
                    <h4 className="font-semibold mb-2 text-green-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $1.2M (12 months)</li>
                      <li>• Site secured in 2 weeks</li>
                      <li>• Planning approved after 7 months</li>
                      <li>• Presales achieved, construction commenced</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Purchase:</span>
                        <span className="font-semibold">$1,200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Term:</span>
                        <span className="font-semibold">9 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest + Fees:</span>
                        <span className="font-semibold">$99,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project GRV (4 townhouses):</span>
                        <span className="font-semibold">$2,800,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Expected Profit:</span>
                        <span className="font-semibold text-green-600">$480K (17% margin)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-purple-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Adelaide Hills Lifestyle Property</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Professional couple upgrading from Prospect house ($620K value) to Stirling Hills property ($840K purchase). Wanted to secure Hills lifestyle before listing existing property.
                    </p>
                    <h4 className="font-semibold mb-2 text-purple-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $480K (10 months)</li>
                      <li>• Secured both properties</li>
                      <li>• Stirling property settled first</li>
                      <li>• Prospect house sold after 7 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stirling Property:</span>
                        <span className="font-semibold">$840,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$480,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Interest (7mo):</span>
                        <span className="font-semibold">$25,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prospect Sale Price:</span>
                        <span className="font-semibold">$635,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Net Position:</span>
                        <span className="font-semibold text-green-600">Hills lifestyle secured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Emet Capital for Adelaide */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Adelaide Clients Choose Emet Capital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Clock className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Interstate Relocation Experts</h3>
                <p className="text-blue-100">
                  Extensive experience helping Sydney and Melbourne buyers relocate to Adelaide. We coordinate interstate settlements and understand the logistics of cross-state property transactions.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <DollarSign className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Adelaide Market Knowledge</h3>
                <p className="text-blue-100">
                  Deep understanding of Adelaide's unique suburbs - from coastal Glenelg to Hills properties to eastern suburbs prestige. Local valuer networks enable fast turnaround and accurate valuations.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Building2 className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Experience</h3>
                <p className="text-blue-100">
                  Strong track record with Adelaide's planning system and infill developments. We bridge during planning approval periods (6-9 months) then transition to construction finance seamlessly.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <TrendingUp className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Affordability Advantage</h3>
                <p className="text-blue-100">
                  We understand how Adelaide's affordability creates opportunities for interstate buyers. Many clients have substantial equity from east coast sales, enabling favorable bridge loan structures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Adelaide Bridging Finance Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Initial Enquiry</h3>
                <p className="text-gray-600 text-sm">Contact us with your Adelaide scenario - interstate move, upgrade, or development</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate properties, equity position, and exit strategy within 4-8 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600 text-sm">Formal approval in 24-48 hours with Adelaide valuers for quick turnaround</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Rapid Settlement</h3>
                <p className="text-gray-600 text-sm">Settlement in 2-3 weeks with SA conveyancers for interstate coordination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adelaide FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Adelaide Bridging Finance FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can I get bridging finance to move from Sydney or Melbourne to Adelaide?</h3>
                <p className="text-gray-700">
                  Absolutely. We regularly help interstate buyers relocate to Adelaide, capitalizing on Adelaide's more affordable property prices. This allows you to secure your Adelaide home before selling in Sydney or Melbourne. We coordinate with interstate conveyancers and understand cross-state settlement logistics and timing.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What LVR can I get for coastal suburbs like Glenelg or Brighton?</h3>
                <p className="text-gray-700">
                  For established coastal suburbs (Glenelg, Brighton, Henley Beach, Semaphore), we typically lend 70-75% LVR due to strong market demand and lifestyle appeal. For beachfront properties or prestige eastern suburbs (Burnside, Norwood), we can offer up to 75-80% LVR depending on the property and your equity position.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How quickly can you approve bridging finance for Adelaide properties?</h3>
                <p className="text-gray-700">
                  We provide indicative approval within 4-6 hours and formal approval within 24-48 hours for Adelaide properties. Our network of Adelaide valuers typically complete valuations within 3-5 business days. Adelaide's generally efficient market enables faster turnaround than some other capital cities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Do you provide bridging finance for Adelaide Hills lifestyle properties?</h3>
                <p className="text-gray-700">
                  Yes, we regularly facilitate bridging finance for Adelaide Hills properties in suburbs like Stirling, Aldgate, Crafers, and Hahndorf. We understand the unique appeal of Hills lifestyle properties and work with valuers experienced in this market. These tree-change properties are increasingly popular with professionals seeking lifestyle balance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can you help with bridging finance for infill development sites?</h3>
                <p className="text-gray-700">
                  Yes, we regularly fund infill development sites in established Adelaide suburbs. With SA's code-compliant pathway, many townhouse and unit developments have streamlined approval processes. We bridge during planning approval (typically 6-9 months) then transition to construction finance once approvals are secured and presales achieved.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What's the advantage of using bridging finance in Adelaide's market?</h3>
                <p className="text-gray-700">
                  Adelaide's affordability means many interstate buyers have substantial equity from east coast property sales. Bridging finance allows you to secure your ideal Adelaide property immediately rather than renting while you sell interstate. This is particularly valuable given Adelaide's growing popularity and increasing competition from interstate buyers seeking lifestyle and affordability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Adelaide Property?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get pre-approved bridging finance for Adelaide's lifestyle-focused property market. Interstate relocation specialists, coastal expertise, Hills properties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Pre-Approved Now
            </Link>
            <Link to="/services/bridging-finance" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Learn More About Bridging Finance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BridgingFinanceAdelaide;
