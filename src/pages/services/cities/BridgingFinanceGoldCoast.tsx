import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Home, Building2, Hammer, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const BridgingFinanceGoldCoast: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Bridging Finance Gold Coast | QLD Commercial Finance | Emet Capital"
        description="Fast bridging loans in Gold Coast QLD. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates."
        canonical="/bridging-finance-gold-coast"
        keywords="bridging finance Gold Coast, bridging finance QLD, commercial loans Gold Coast, business finance Gold Coast, gold coast property finance"
        schemas={[generateServiceSchema(
          "Bridging Finance Gold Coast",
          "Fast bridging loans in Gold Coast QLD. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates.",
          "https://emetcapital.com.au/bridging-finance-gold-coast"
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
              <h1 className="text-4xl md:text-5xl font-bold">Bridging Finance Gold Coast</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Fast bridging loans for Gold Coast's dynamic property market. From beachfront living to Hinterland lifestyle, we fund property transitions, developments, and tourism-driven investment opportunities across Gold Coast.
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

      {/* Gold Coast Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Gold Coast's Property Market Dynamics</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Tourism Hub:</strong> Strong holiday rental market and lifestyle appeal driving demand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Interstate Migration:</strong> Sydney/Melbourne buyers seeking coastal lifestyle and value</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Development Activity:</strong> High-rise apartments, townhouse projects, canal estates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Price Growth:</strong> Strong capital growth driven by limited supply and high demand</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Suburbs & Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Beachfront:</strong> Surfers Paradise, Broadbeach, Main Beach - high-rise living</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Canal Estates:</strong> Sovereign Islands, Sorrento, Paradise Waters - waterfront luxury</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Family Suburbs:</strong> Burleigh Heads, Palm Beach, Currumbin - lifestyle market</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Hinterland:</strong> Mudgeeraba, Tallebudgera, Advancetown - tree change lifestyle</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Gold Coast Bridging Finance Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Home className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Interstate Sea Change</h3>
                <p className="text-gray-700 mb-4">
                  Sydney and Melbourne buyers securing Gold Coast lifestyle properties before selling interstate, driven by beachfront appeal and relative value.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Sydney/Melbourne to Gold Coast</li>
                  <li>• Beachfront lifestyle upgrades</li>
                  <li>• Coastal living appeal</li>
                  <li>• Price arbitrage opportunities</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Holiday Investment</h3>
                <p className="text-gray-700 mb-4">
                  Investors securing holiday rental properties or beachfront apartments while existing properties are marketed for sale to capitalize on tourism.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Holiday rental purchases</li>
                  <li>• Beachfront apartments</li>
                  <li>• Tourism-driven returns</li>
                  <li>• Short-term rental income</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Hammer className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Sites</h3>
                <p className="text-gray-700 mb-4">
                  Fast acquisition of development sites for townhouse projects or small apartment buildings while arranging planning approvals and construction finance.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Site acquisition speed</li>
                  <li>• Townhouse developments</li>
                  <li>• Planning approval periods</li>
                  <li>• Tourist accommodation projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Coast-Specific Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Gold Coast Bridging Finance Examples</h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Broadbeach Beachfront Apartment</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Sydney couple sea-changing to Gold Coast, upgrading from North Sydney apartment ($1.8M) to Broadbeach beachfront ($1.3M). Wanted to secure Gold Coast lifestyle before listing Sydney property.
                    </p>
                    <h4 className="font-semibold mb-2 text-blue-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $950K (8 months)</li>
                      <li>• Secured against both properties</li>
                      <li>• Broadbeach apartment settled first</li>
                      <li>• Sydney apartment sold after 5 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Broadbeach Property:</span>
                        <span className="font-semibold">$1,300,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$950,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Term:</span>
                        <span className="font-semibold">5 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Cost:</span>
                        <span className="font-semibold">$35,625</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Benefit:</span>
                        <span className="font-semibold text-green-600">$500K cash remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <Building2 className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Burleigh Heads Townhouse Development</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Developer identified 1,000sqm site in Burleigh Heads for 6-townhouse project. Needed fast acquisition before competing developers, with 10-month planning approval process ahead.
                    </p>
                    <h4 className="font-semibold mb-2 text-green-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $2.1M (12 months)</li>
                      <li>• Site secured in 3 weeks</li>
                      <li>• Planning approved after 9 months</li>
                      <li>• Strong presale interest, construction commenced</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Purchase:</span>
                        <span className="font-semibold">$2,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Term:</span>
                        <span className="font-semibold">11 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest + Fees:</span>
                        <span className="font-semibold">$212,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project GRV (6 townhouses):</span>
                        <span className="font-semibold">$5,400,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Expected Profit:</span>
                        <span className="font-semibold text-green-600">$920K (17% margin)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-purple-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Main Beach Holiday Investment</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Melbourne investor wanted to secure Main Beach holiday rental apartment ($750K) before selling Melbourne investment property. Needed fast unconditional purchase to beat other buyers.
                    </p>
                    <h4 className="font-semibold mb-2 text-purple-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Pre-approved bridging: $580K</li>
                      <li>• Unconditional offer accepted</li>
                      <li>• 3-week settlement completed</li>
                      <li>• Refinanced after Melbourne sale (4 months)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-semibold">$750,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Holiday Rental Income:</span>
                        <span className="font-semibold">$42,000 p.a. (5.6%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Interest (4mo):</span>
                        <span className="font-semibold">$17,400</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital Growth (12mo):</span>
                        <span className="font-semibold text-green-600">$60,000 (8%)</span>
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

      {/* Why Choose Emet Capital for Gold Coast */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Gold Coast Clients Choose Emet Capital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Clock className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Interstate Sea Change Experts</h3>
                <p className="text-blue-100">
                  Extensive experience helping Sydney and Melbourne buyers relocate to Gold Coast. We understand the appeal of coastal lifestyle and coordinate interstate settlements seamlessly.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <DollarSign className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Gold Coast Market Knowledge</h3>
                <p className="text-blue-100">
                  Deep understanding of Gold Coast's unique market - beachfront apartments, canal estates, holiday rentals, and hinterland properties. Local valuer networks enable fast turnaround.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Building2 className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Tourism Property Expertise</h3>
                <p className="text-blue-100">
                  Strong track record with holiday rental properties and tourist accommodation. We understand holiday letting returns, body corporate structures, and management rights opportunities.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <TrendingUp className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Experience</h3>
                <p className="text-blue-100">
                  Experience with Gold Coast townhouse and small apartment developments. We bridge during planning approval periods then transition to construction finance for presold projects.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Gold Coast Bridging Finance Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Initial Enquiry</h3>
                <p className="text-gray-600 text-sm">Contact us with your Gold Coast scenario - sea change, holiday investment, or development</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate properties, rental potential, and exit strategy within 4-8 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600 text-sm">Formal approval in 24-48 hours with Gold Coast valuers for quick turnaround</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Rapid Settlement</h3>
                <p className="text-gray-600 text-sm">Settlement in 2-3 weeks with Queensland conveyancers for interstate coordination</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Coast FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Gold Coast Bridging Finance FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can I get bridging finance for a sea change move to Gold Coast?</h3>
                <p className="text-gray-700">
                  Absolutely. We regularly help Sydney and Melbourne buyers relocate to Gold Coast, seeking beachfront lifestyle and relative value. Bridging finance allows you to secure your Gold Coast property before selling interstate. We coordinate with Queensland and interstate conveyancers for seamless settlements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What LVR can I get for beachfront apartments or canal estates?</h3>
                <p className="text-gray-700">
                  For established beachfront apartments (Surfers Paradise, Broadbeach, Main Beach), we typically lend 70-75% LVR. For premium canal estates (Sovereign Islands, Sorrento, Paradise Waters), we can offer up to 75-80% LVR depending on the property and market conditions. Holiday rental income can support serviceability.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How do you assess holiday rental properties for bridging finance?</h3>
                <p className="text-gray-700">
                  We assess holiday rental properties based on both the property's capital value and rental income potential. Gold Coast's strong tourism market supports holiday letting returns. We work with valuers who understand holiday rental income and can factor this into our assessment, particularly for properties in high-demand tourist precincts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can you help with bridging finance for townhouse developments?</h3>
                <p className="text-gray-700">
                  Yes, we regularly facilitate bridging finance for townhouse development sites on the Gold Coast. Popular areas include Burleigh Heads, Palm Beach, and Currumbin. We bridge during planning approval periods (typically 8-12 months) then transition to construction finance once approvals are secured and presales achieved.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What if the Gold Coast market changes while I have a bridging loan?</h3>
                <p className="text-gray-700">
                  Gold Coast's market is generally strong with consistent demand from interstate buyers and tourists. However, we build flexibility into our bridging loans with extension options if needed. Most loans are structured for 9-12 months with the ability to extend for an additional 6 months. We also help with exit strategy planning to ensure successful outcomes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Do you provide bridging finance for Gold Coast Hinterland properties?</h3>
                <p className="text-gray-700">
                  Yes, we provide bridging finance for Gold Coast Hinterland lifestyle properties in suburbs like Mudgeeraba, Tallebudgera Valley, and Advancetown. These tree-change properties appeal to buyers seeking tranquility while remaining close to beaches. We work with valuers experienced in hinterland acreage and lifestyle property valuations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Gold Coast Property?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get pre-approved bridging finance for Gold Coast's coastal lifestyle market. Interstate sea change specialists, beachfront expertise, holiday rental knowledge.
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

export default BridgingFinanceGoldCoast;
