import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Home, Building2, Hammer, MapPin } from 'lucide-react';

const BridgingFinanceMelbourne: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              <h1 className="text-4xl md:text-5xl font-bold">Bridging Finance Melbourne</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Fast bridging loans for Melbourne's vibrant property market. From Bayside to inner suburbs, we fund property transitions, developments, and time-sensitive opportunities across Greater Melbourne.
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
                <div className="text-2xl font-bold mb-1">$100K-$15M</div>
                <div className="text-blue-200 text-sm">Loan Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melbourne Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Melbourne's Property Market Dynamics</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Auction Culture:</strong> 70% of properties sold via auction requiring unconditional offers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner Suburbs Premium:</strong> Median house prices $1.2M+ in desirable suburbs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Upgrader Market:</strong> Strong family migration from apartments to houses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Development Activity:</strong> Major projects in Fishermans Bend, Docklands, Arden</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Suburbs & Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Bayside:</strong> Brighton, Sandringham, Black Rock - premium coastal living</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner North:</strong> Carlton, Fitzroy, Brunswick - strong investor demand</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Eastern Suburbs:</strong> Kew, Camberwell, Glen Iris - family upgrader hotspots</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner West:</strong> Yarraville, Footscray, Williamstown - growth corridor</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Melbourne Bridging Finance Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Home className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Auction Purchases</h3>
                <p className="text-gray-700 mb-4">
                  Compete confidently at Melbourne's ubiquitous property auctions with pre-approved bridging finance, buying unconditionally without finance clauses.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Inner suburb auctions</li>
                  <li>• Bayside Saturday auctions</li>
                  <li>• No cooling-off period stress</li>
                  <li>• Finance certainty at auction</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Property Upgraders</h3>
                <p className="text-gray-700 mb-4">
                  Secure your new family home in Kew, Camberwell, or Brighton before selling your existing apartment or house, moving once not twice.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Apartment to house upgrades</li>
                  <li>• School zone relocations</li>
                  <li>• Family size transitions</li>
                  <li>• Market timing optimization</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Hammer className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Finance</h3>
                <p className="text-gray-700 mb-4">
                  Fast site acquisition in growth precincts like Fishermans Bend, Arden, or Footscray while arranging development approval and construction finance.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Site acquisition speed</li>
                  <li>• Planning permit periods</li>
                  <li>• Townhouse developments</li>
                  <li>• Medium-density projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melbourne-Specific Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Melbourne Bridging Finance Examples</h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Brighton Family Home Upgrade</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Family upgrading from Middle Park apartment ($950K value) to Brighton house ($2.4M purchase). Wanted to secure Brighton property at auction before listing apartment for sale in slower winter market.
                    </p>
                    <h4 className="font-semibold mb-2 text-blue-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $1.7M (12 months)</li>
                      <li>• Secured against both properties</li>
                      <li>• Won Brighton auction unconditionally</li>
                      <li>• Apartment sold after 7 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">New Property Value:</span>
                        <span className="font-semibold">$2,400,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$1,700,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Term:</span>
                        <span className="font-semibold">7 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Cost:</span>
                        <span className="font-semibold">$89,250</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Benefit:</span>
                        <span className="font-semibold text-green-600">Secured Bayside lifestyle</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <Building2 className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Footscray Townhouse Development</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Developer identified 650sqm site in Footscray for 6-townhouse development. Needed fast settlement before competing developers, with 10-month planning permit timeframe ahead.
                    </p>
                    <h4 className="font-semibold mb-2 text-green-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $1.85M (12 months)</li>
                      <li>• Site secured in 3 weeks</li>
                      <li>• Planning permit approved after 9 months</li>
                      <li>• Transitioned to construction loan</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Purchase:</span>
                        <span className="font-semibold">$1,850,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Term:</span>
                        <span className="font-semibold">11 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest + Fees:</span>
                        <span className="font-semibold">$196,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project GRV:</span>
                        <span className="font-semibold">$4,200,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Expected Profit:</span>
                        <span className="font-semibold text-green-600">$680K (16% margin)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-purple-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Fitzroy Auction Win</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      First-time investor wanted to secure Fitzroy warehouse conversion at auction. Needed unconditional finance with no bank delays, in hot inner-north market with multiple bidders expected.
                    </p>
                    <h4 className="font-semibold mb-2 text-purple-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Pre-approved bridging: $850K</li>
                      <li>• Unconditional bid confidence</li>
                      <li>• 4-week settlement completed</li>
                      <li>• Refinanced to investment loan after 3 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-semibold">$850,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rental Yield:</span>
                        <span className="font-semibold">$32,000 p.a. (3.8%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Interest (3mo):</span>
                        <span className="font-semibold">$19,125</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital Growth (12mo):</span>
                        <span className="font-semibold text-green-600">$68,000 (8%)</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Net Position:</span>
                        <span className="font-semibold text-green-600">Strong equity gain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Emet Capital for Melbourne */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Melbourne Clients Choose Emet Capital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Clock className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Auction Expertise</h3>
                <p className="text-blue-100">
                  We understand Melbourne's auction-dominated market. Pre-approvals in 24 hours give you unconditional bidding confidence every Saturday across all Melbourne suburbs.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <DollarSign className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Local Valuer Network</h3>
                <p className="text-blue-100">
                  Strong relationships with Melbourne's leading property valuers enabling 3-5 day turnaround on valuations across metro Melbourne, from Bayside to growth corridors.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Building2 className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Knowledge</h3>
                <p className="text-blue-100">
                  Deep experience with Melbourne's planning system and development precincts. We bridge to construction finance for townhouse and medium-density projects seamlessly.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <TrendingUp className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Upgrader Specialists</h3>
                <p className="text-blue-100">
                  Extensive experience helping Melbourne families upgrade from apartments to houses, particularly in family-friendly Eastern suburbs and Bayside locations.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Melbourne Bridging Finance Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Initial Enquiry</h3>
                <p className="text-gray-600 text-sm">Contact us with your Melbourne property scenario - auction, upgrade, or development</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate property values, equity, and exit strategy within 4-6 hours for time-sensitive auctions</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600 text-sm">Formal approval in 24-48 hours with Melbourne valuers for quick turnaround before auctions</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Rapid Settlement</h3>
                <p className="text-gray-600 text-sm">Settlement in 3-4 weeks with Melbourne conveyancers for standard auction contracts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Melbourne FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Melbourne Bridging Finance FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can I use bridging finance for a Saturday auction in Melbourne?</h3>
                <p className="text-gray-700">
                  Absolutely. Melbourne's auction market is our specialty. We provide pre-approved bridging finance specifically for auction purchases, allowing you to bid unconditionally with confidence. Contact us by Wednesday for Saturday auction pre-approval, though we've approved deals faster when needed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What LVR can I get for Bayside properties like Brighton or Sandringham?</h3>
                <p className="text-gray-700">
                  For premium Bayside suburbs (Brighton, Black Rock, Sandringham, Beaumaris), we typically lend up to 70-75% LVR due to strong market fundamentals and high liquidity. For upgraders with substantial equity in their current property, we can structure security across both properties up to 80% combined LVR.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How long does bridging finance approval take for Melbourne properties?</h3>
                <p className="text-gray-700">
                  We provide indicative approval within 4-6 hours and formal approval within 24-48 hours for Melbourne properties. This includes engaging our network of Melbourne valuers who typically complete valuations within 3-5 business days. For urgent auction scenarios, we can fast-track the entire process.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can you help with bridging finance for townhouse developments in growth suburbs?</h3>
                <p className="text-gray-700">
                  Yes, we regularly facilitate bridging finance for townhouse and medium-density development sites in growth corridors like Footscray, Coburg, Preston, and outer suburbs. We bridge during planning permit approval (typically 6-12 months) then transition to construction finance once permits are secured.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What happens if I can't sell my existing Melbourne property within the bridge term?</h3>
                <p className="text-gray-700">
                  We build flexibility into our bridging loans with extension options if market conditions or property marketing takes longer than anticipated. Most Melbourne bridges are structured for 9-12 months with the ability to extend for an additional 6 months. We also provide guidance on pricing and agent selection to optimize sale outcomes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Do you provide bridging finance for apartments in inner Melbourne?</h3>
                <p className="text-gray-700">
                  Yes, we provide bridging finance for quality apartments in inner Melbourne suburbs (Carlton, Fitzroy, South Yarra, Richmond). However, we're selective about oversupplied precincts and focus on established, well-located properties with strong rental demand and capital growth history. We typically lend 65-70% LVR for apartments versus 70-80% for houses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Win Your Melbourne Auction?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get pre-approved bridging finance for Melbourne's competitive auction market. Fast decisions, unconditional offers, settlement certainty.
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

export default BridgingFinanceMelbourne;
