import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Home, Building2, Hammer, MapPin } from 'lucide-react';

const BridgingFinancePerth: React.FC = () => {
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
              <h1 className="text-4xl md:text-5xl font-bold">Bridging Finance Perth</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Fast bridging loans for Perth's unique property market. From coastal suburbs to mining belt opportunities, we fund property transitions, developments, and FIFO-driven investment opportunities across Greater Perth.
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
                <div className="text-2xl font-bold mb-1">$100K-$8M</div>
                <div className="text-blue-200 text-sm">Loan Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perth Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Perth's Property Market Dynamics</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Resource Sector:</strong> Strong FIFO workforce driving property investment demand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Affordable Capital:</strong> Lower property prices than east coast with strong yields</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Coastal Premium:</strong> Beach suburbs commanding premium prices and demand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Development Activity:</strong> Major projects in CBD, Elizabeth Quay, Yagan Square</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Suburbs & Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Coastal Suburbs:</strong> Cottesloe, Scarborough, City Beach - premium beachside living</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner City:</strong> Subiaco, Mount Lawley, Leederville - professional market</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Riverside Precincts:</strong> South Perth, Applecross, Como - Swan River lifestyle</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Growth Corridors:</strong> Joondalup, Ellenbrook, Baldivis - family market</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Perth Bridging Finance Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Home className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">FIFO Investment</h3>
                <p className="text-gray-700 mb-4">
                  Mining and resource workers securing investment properties or upgrading homes between roster cycles, requiring fast settlements.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Quick settlement timeframes</li>
                  <li>• FIFO income assessment</li>
                  <li>• Investment property bridging</li>
                  <li>• Between roster transactions</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Coastal Upgraders</h3>
                <p className="text-gray-700 mb-4">
                  Families upgrading to coastal suburbs (Cottesloe, Scarborough, City Beach) before selling existing properties in metro areas.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Coastal lifestyle upgrades</li>
                  <li>• Beach suburb competition</li>
                  <li>• Market timing advantage</li>
                  <li>• Single move convenience</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Hammer className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Sites</h3>
                <p className="text-gray-700 mb-4">
                  Fast acquisition of development sites in growth corridors or infill locations while arranging planning approvals and construction finance.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Site acquisition speed</li>
                  <li>• Planning approval periods</li>
                  <li>• Infill development sites</li>
                  <li>• Subdivision opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perth-Specific Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Perth Bridging Finance Examples</h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Cottesloe Coastal Upgrade</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      FIFO engineer upgrading from Mount Lawley house ($850K value) to Cottesloe beachfront property ($1.6M purchase). Between rosters with limited time to coordinate simultaneous settlements.
                    </p>
                    <h4 className="font-semibold mb-2 text-blue-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $1.1M (10 months)</li>
                      <li>• Secured against both properties</li>
                      <li>• Fast settlement during roster break</li>
                      <li>• Mount Lawley sold after 7 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cottesloe Property:</span>
                        <span className="font-semibold">$1,600,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$1,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Term:</span>
                        <span className="font-semibold">7 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Cost:</span>
                        <span className="font-semibold">$57,750</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Benefit:</span>
                        <span className="font-semibold text-green-600">Secured coastal lifestyle</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <Building2 className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Joondalup Subdivision</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Developer identified 2,400sqm site in Joondalup for 6-lot subdivision. Needed fast acquisition before competing developers, with 9-month subdivision approval process ahead.
                    </p>
                    <h4 className="font-semibold mb-2 text-green-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $950K (12 months)</li>
                      <li>• Site secured in 3 weeks</li>
                      <li>• Subdivision approved after 8 months</li>
                      <li>• Lots presold, construction finance arranged</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Purchase:</span>
                        <span className="font-semibold">$950,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Term:</span>
                        <span className="font-semibold">10 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest + Fees:</span>
                        <span className="font-semibold">$87,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subdivided Lots GRV:</span>
                        <span className="font-semibold">$2,100,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Expected Profit:</span>
                        <span className="font-semibold text-green-600">$420K (20% margin)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-purple-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Subiaco Investment Property</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Mining executive wanted to secure Subiaco investment property before next 3-week roster. Needed unconditional purchase with no bank delays for fast settlement.
                    </p>
                    <h4 className="font-semibold mb-2 text-purple-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Pre-approved bridging: $620K</li>
                      <li>• Unconditional offer accepted</li>
                      <li>• 2-week settlement before roster</li>
                      <li>• Refinanced to investment loan after 4 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-semibold">$620,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rental Yield:</span>
                        <span className="font-semibold">$28,600 p.a. (4.6%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Interest (4mo):</span>
                        <span className="font-semibold">$18,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital Growth (12mo):</span>
                        <span className="font-semibold text-green-600">$43,400 (7%)</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Net Position:</span>
                        <span className="font-semibold text-green-600">Strong yield + growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Emet Capital for Perth */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Perth Clients Choose Emet Capital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Clock className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">FIFO-Friendly Process</h3>
                <p className="text-blue-100">
                  We understand FIFO workers' unique challenges - roster cycles, income assessment, and time-sensitive settlements. Fast approvals coordinated around your roster schedule.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <DollarSign className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Perth Market Knowledge</h3>
                <p className="text-blue-100">
                  Deep understanding of Perth's unique market dynamics - resource sector impacts, coastal premiums, and growth corridor opportunities. Local valuer networks enable fast turnaround.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Building2 className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Experience</h3>
                <p className="text-blue-100">
                  Extensive experience with Perth subdivisions and infill developments. We bridge during planning and subdivision approval periods (6-12 months) then transition to construction finance.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <TrendingUp className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Coastal Suburbs Expertise</h3>
                <p className="text-blue-100">
                  Strong track record with premium coastal suburbs - Cottesloe, Scarborough, City Beach. We understand beachside property valuations and market dynamics.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Perth Bridging Finance Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Initial Enquiry</h3>
                <p className="text-gray-600 text-sm">Contact us with your Perth property scenario - FIFO purchase, coastal upgrade, or development</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate property values, income (including FIFO), and exit strategy within 4-8 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600 text-sm">Formal approval in 24-48 hours with Perth valuers for quick turnaround</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Rapid Settlement</h3>
                <p className="text-gray-600 text-sm">Settlement in 2-3 weeks with Perth conveyancers, coordinated around your roster</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perth FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Perth Bridging Finance FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can I get bridging finance as a FIFO worker?</h3>
                <p className="text-gray-700">
                  Absolutely. We regularly work with FIFO workers from mining and resource sectors. We understand roster-based income assessment and can coordinate fast approvals and settlements around your roster schedule. Many FIFO workers use bridging finance to secure properties between rosters when time is limited.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What LVR can I get for coastal suburbs like Cottesloe or Scarborough?</h3>
                <p className="text-gray-700">
                  For established coastal suburbs (Cottesloe, Scarborough, City Beach, Swanbourne), we typically lend 70-75% LVR due to strong market demand and property liquidity. For premium beachfront properties, we can offer up to 75-80% LVR depending on the specific property and equity position in your existing property.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How quickly can you approve bridging finance for Perth properties?</h3>
                <p className="text-gray-700">
                  We provide indicative approval within 4-6 hours and formal approval within 24-48 hours for Perth properties. Our network of Perth valuers typically complete valuations within 3-5 business days. For urgent scenarios (FIFO roster timing, competitive purchases), we can fast-track the entire process.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Do you provide bridging finance for subdivision projects in growth areas?</h3>
                <p className="text-gray-700">
                  Yes, we regularly facilitate bridging finance for subdivision projects in growth corridors like Joondalup, Ellenbrook, Baldivis, and Mandurah. We bridge during subdivision approval periods (typically 8-12 months in WA) then transition to development finance once approvals are secured and lots can be presold.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What if I need to extend my bridging loan due to Perth's slower sales market?</h3>
                <p className="text-gray-700">
                  We understand Perth's market can be slower than east coast cities. Most of our Perth bridges are structured for 10-12 months with the ability to extend for an additional 6 months if your property takes longer to sell. We work with you on pricing strategy and agent selection to optimize sale outcomes in Perth's market conditions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can you help with bridging finance for investment properties in inner suburbs?</h3>
                <p className="text-gray-700">
                  Yes, we provide bridging finance for investment properties in sought-after inner suburbs like Subiaco, Mount Lawley, Leederville, and Northbridge. These areas have strong rental demand from professionals and students, making them attractive for investors. We typically lend 70-75% LVR for established investment properties in these precincts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Perth Property?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get pre-approved bridging finance for Perth's property market. FIFO-friendly process, coastal expertise, fast settlements coordinated around your schedule.
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

export default BridgingFinancePerth;
