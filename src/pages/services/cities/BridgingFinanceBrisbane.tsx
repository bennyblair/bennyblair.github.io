import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Home, Building2, Hammer, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const BridgingFinanceBrisbane: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Bridging Finance Brisbane | QLD Commercial Finance | Emet Capital"
        description="Fast bridging loans in Brisbane QLD. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates."
        canonical="/bridging-finance-brisbane"
        keywords="bridging finance Brisbane, bridging finance QLD, commercial loans Brisbane, business finance Brisbane, brisbane property finance"
        schemas={[generateServiceSchema(
          "Bridging Finance Brisbane",
          "Fast bridging loans in Brisbane QLD. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates.",
          "https://emetcapital.com.au/bridging-finance-brisbane"
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
              <h1 className="text-4xl md:text-5xl font-bold">Bridging Finance Brisbane</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Fast bridging loans for Brisbane's booming property market. From inner suburbs to growth corridors, we fund property transitions, developments, and Olympic-related opportunities across Greater Brisbane.
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
                <div className="text-2xl font-bold mb-1">$100K-$10M</div>
                <div className="text-blue-200 text-sm">Loan Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Brisbane's Property Market Dynamics</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Olympic Boom:</strong> 2032 Olympics driving major infrastructure and property growth</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Interstate Migration:</strong> Strong southerner migration from Sydney/Melbourne</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Affordable Capital:</strong> More accessible than Sydney/Melbourne for upgraders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Development Pipeline:</strong> Major projects in CBD, South Bank, Hamilton, Fortitude Valley</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Suburbs & Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner West:</strong> Paddington, Red Hill, Bardon - character home market</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Riverside Precincts:</strong> New Farm, Teneriffe, Hamilton - waterfront living</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Eastern Suburbs:</strong> Camp Hill, Coorparoo, Cannon Hill - family upgrader zones</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Growth Corridors:</strong> Springfield, Ripley, Yarrabilba - new house & land</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Brisbane Bridging Finance Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Home className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Auction Purchases</h3>
                <p className="text-gray-700 mb-4">
                  Secure character homes in inner suburbs or riverfront properties with unconditional finance, gaining competitive advantage in Brisbane's growing auction market.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Inner West character homes</li>
                  <li>• Riverside property competition</li>
                  <li>• No finance clause strength</li>
                  <li>• Quick settlement capability</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Interstate Upgraders</h3>
                <p className="text-gray-700 mb-4">
                  Buy your Brisbane home before selling in Sydney or Melbourne, capitalizing on lower prices and strong growth while managing interstate logistics.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Sydney/Melbourne to Brisbane moves</li>
                  <li>• Lifestyle upgrades</li>
                  <li>• Multiple state coordination</li>
                  <li>• Price arbitrage opportunities</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Hammer className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Olympic Infrastructure</h3>
                <p className="text-gray-700 mb-4">
                  Fast acquisition of development sites near Olympic precincts (Brisbane Arena, Gabba, Hamilton) before development approvals are secured.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Olympic precinct sites</li>
                  <li>• Infrastructure benefit zones</li>
                  <li>• DA approval periods</li>
                  <li>• Presale to construction transition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane-Specific Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Brisbane Bridging Finance Examples</h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">New Farm Riverside Upgrade</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Sydney couple relocating to Brisbane, upgrading from Woollahra apartment ($2.1M) to New Farm riverside house ($1.4M). Needed to secure Brisbane property before selling Sydney apartment to coordinate interstate move.
                    </p>
                    <h4 className="font-semibold mb-2 text-blue-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $1.1M (9 months)</li>
                      <li>• Secured against both properties</li>
                      <li>• Brisbane house settled first</li>
                      <li>• Sydney apartment sold after 5 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brisbane Property:</span>
                        <span className="font-semibold">$1,400,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$1,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Term:</span>
                        <span className="font-semibold">5 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Cost:</span>
                        <span className="font-semibold">$41,250</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Benefit:</span>
                        <span className="font-semibold text-green-600">$700K cash remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <Building2 className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Hamilton Olympic Precinct Development</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Developer identified 1,200sqm site in Hamilton, 800m from Brisbane Arena (2032 Olympic venue). Needed fast acquisition before DA approval, anticipating significant value uplift from Olympic infrastructure.
                    </p>
                    <h4 className="font-semibold mb-2 text-green-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $2.4M (15 months)</li>
                      <li>• Site secured in 3 weeks</li>
                      <li>• DA approved after 11 months</li>
                      <li>• Presale campaign commenced</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Purchase:</span>
                        <span className="font-semibold">$2,400,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Term:</span>
                        <span className="font-semibold">13 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest + Fees:</span>
                        <span className="font-semibold">$299,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project GRV (16 apartments):</span>
                        <span className="font-semibold">$14,400,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Expected Profit:</span>
                        <span className="font-semibold text-green-600">$2.8M (19% margin)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-purple-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Paddington Character Home</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Family upgrading from Annerley house ($720K value) to Paddington Queenslander ($1.1M purchase). Wanted to secure character home at auction before listing existing property for sale.
                    </p>
                    <h4 className="font-semibold mb-2 text-purple-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $650K (10 months)</li>
                      <li>• Won Paddington auction</li>
                      <li>• Annerley house sold after 6 months</li>
                      <li>• Refinanced to standard home loan</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">New Property Value:</span>
                        <span className="font-semibold">$1,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$650,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Interest (6mo):</span>
                        <span className="font-semibold">$29,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Old Property Sale:</span>
                        <span className="font-semibold">$735,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Net Position:</span>
                        <span className="font-semibold text-green-600">Upgraded lifestyle secured</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Emet Capital for Brisbane */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Brisbane Clients Choose Emet Capital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Clock className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Olympic Market Expertise</h3>
                <p className="text-blue-100">
                  Deep understanding of Brisbane's 2032 Olympic opportunity and infrastructure precincts. We fund Olympic-related development sites and upgraders capitalizing on growth.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <DollarSign className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Interstate Relocation Specialists</h3>
                <p className="text-blue-100">
                  Extensive experience helping Sydney and Melbourne buyers relocate to Brisbane. We coordinate interstate settlements and understand cross-state logistics.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Building2 className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Local Market Knowledge</h3>
                <p className="text-blue-100">
                  Strong understanding of Brisbane suburbs, character home markets, riverside precincts, and growth corridors. Local valuer networks enable fast turnaround.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <TrendingUp className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Pipeline</h3>
                <p className="text-blue-100">
                  Experience with Brisbane's development market from townhouses to medium-density projects. We bridge to construction finance seamlessly for Olympic-precinct developments.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Brisbane Bridging Finance Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Initial Enquiry</h3>
                <p className="text-gray-600 text-sm">Contact us with your Brisbane property scenario - purchase, interstate move, or development</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate property values, equity position, and exit strategy within 4-8 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600 text-sm">Formal approval in 24-48 hours with Brisbane valuers for quick turnaround</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Rapid Settlement</h3>
                <p className="text-gray-600 text-sm">Settlement in 2-3 weeks with Queensland conveyancers for time-sensitive deals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brisbane FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Brisbane Bridging Finance FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can I get bridging finance to move from Sydney/Melbourne to Brisbane?</h3>
                <p className="text-gray-700">
                  Absolutely. We regularly help interstate buyers relocate to Brisbane, allowing you to purchase your Brisbane home before selling in Sydney or Melbourne. This is particularly common given Brisbane's more affordable property prices. We coordinate with interstate conveyancers and understand cross-state settlement logistics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How does the 2032 Olympics affect Brisbane bridging finance?</h3>
                <p className="text-gray-700">
                  The 2032 Olympics are creating significant opportunities in Brisbane property, particularly near Olympic venues (Brisbane Arena in Hamilton, Gabba redevelopment, Olympic precincts). We provide bridging finance for development sites and upgraders in these areas, understanding the infrastructure benefits and growth potential driving property values.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What LVR can I get for Brisbane inner-city properties?</h3>
                <p className="text-gray-700">
                  For established inner-city Brisbane suburbs (New Farm, Paddington, Red Hill, Teneriffe), we typically lend 70-75% LVR. For premium riverside or character homes, we can offer up to 75-80% LVR depending on the specific property and market. Brisbane's lower property values compared to Sydney/Melbourne often mean buyers have more equity to work with.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How quickly can you approve bridging finance for a Brisbane auction?</h3>
                <p className="text-gray-700">
                  We provide pre-approval within 24-48 hours for Brisbane auction purchases, giving you unconditional bidding confidence. While Brisbane's auction market is less prevalent than Melbourne's, we understand the growing auction activity in premium suburbs and can fast-track approvals for Saturday auctions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Do you provide bridging finance for Queenslander character homes?</h3>
                <p className="text-gray-700">
                  Yes, we love Brisbane's iconic Queenslander homes. We provide bridging finance for character properties in suburbs like Paddington, Red Hill, Bardon, and Ashgrove. We understand their unique value proposition and work with valuers experienced in heritage and character home valuations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can you help with bridging finance for development sites near Olympic venues?</h3>
                <p className="text-gray-700">
                  Absolutely. We're actively funding development site acquisitions near Olympic precincts including Hamilton (Brisbane Arena), Woolloongabba (Gabba), and designated Olympic infrastructure zones. We bridge during DA approval periods (typically 8-12 months) then transition to construction finance once approvals and presales are secured.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Brisbane Property?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get pre-approved bridging finance for Brisbane's booming property market. Fast decisions for interstate relocations, auctions, and Olympic-precinct opportunities.
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

export default BridgingFinanceBrisbane;
