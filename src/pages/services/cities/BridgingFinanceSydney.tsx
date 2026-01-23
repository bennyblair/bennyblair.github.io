import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, DollarSign, TrendingUp, Home, Building2, Hammer, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import { generateServiceSchema } from '@/lib/schema-utils';

const BridgingFinanceSydney: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Bridging Finance Sydney | NSW Commercial Finance | Emet Capital"
        description="Fast bridging loans in Sydney NSW. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates."
        canonical="/bridging-finance-sydney"
        keywords="bridging finance Sydney, bridging finance NSW, commercial loans Sydney, business finance Sydney, sydney property finance"
        schemas={[generateServiceSchema(
          "Bridging Finance Sydney",
          "Fast bridging loans in Sydney NSW. 24-48 hour approvals for property purchases, auctions, and time-sensitive opportunities. Local expertise, competitive rates.",
          "https://emetcapital.com.au/bridging-finance-sydney"
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
              <h1 className="text-4xl md:text-5xl font-bold">Bridging Finance Sydney</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Fast bridging loans for Sydney's dynamic property market. From Eastern Suburbs to Western Sydney, we fund property transitions, developments, and time-sensitive opportunities across Greater Sydney.
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
                <div className="text-2xl font-bold mb-1">$100K-$20M</div>
                <div className="text-blue-200 text-sm">Loan Range</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sydney Market Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Sydney's Property Market Dynamics</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Market Characteristics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>High Property Values:</strong> Median house prices $1.4M+ requiring substantial bridging capital</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Competitive Market:</strong> Fast-moving auctions demand quick settlement capability</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Upgrader Activity:</strong> Strong demand for bridge loans in premium suburbs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Development Pipeline:</strong> Major projects in Parramatta, Green Square, Barangaroo</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">Key Suburbs & Precincts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Eastern Suburbs:</strong> Bondi, Double Bay, Vaucluse - premium residential bridging</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>North Shore:</strong> Mosman, Neutral Bay, Chatswood - family upgrader market</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Inner West:</strong> Newtown, Marrickville, Leichhardt - strong investor activity</span>
                  </li>
                  <li className="flex items-start">
                    <Building2 className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={20} />
                    <span><strong>Parramatta:</strong> Second CBD with major development and commercial opportunities</span>
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
            <h2 className="text-3xl font-bold mb-12 text-center">Sydney Bridging Finance Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Home className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Auction Purchases</h3>
                <p className="text-gray-700 mb-4">
                  Secure properties at Sydney's competitive auctions with unconditional finance, then arrange permanent funding post-settlement.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Eastern Suburbs auctions</li>
                  <li>• Premium suburb competition</li>
                  <li>• 6-12 month bridge periods</li>
                  <li>• No finance clause required</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <TrendingUp className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Property Upgraders</h3>
                <p className="text-gray-700 mb-4">
                  Buy your new home before selling the existing property, avoiding rental costs and multiple moves with family.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Bridge between properties</li>
                  <li>• Move once, not twice</li>
                  <li>• Secure ideal property first</li>
                  <li>• Market existing home properly</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <Hammer className="text-blue-600 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Finance</h3>
                <p className="text-gray-700 mb-4">
                  Fast site acquisition for development projects, especially in high-growth precincts like Parramatta and Green Square.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Site acquisition speed</li>
                  <li>• DA approval periods</li>
                  <li>• Rezoning opportunities</li>
                  <li>• Construction finance transition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sydney-Specific Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Sydney Bridging Finance Examples</h2>
            
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-8 rounded-lg border border-blue-200">
                <div className="flex items-center mb-4">
                  <Home className="text-blue-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Mosman Family Home Upgrade</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Family wanted to upgrade from their Cremorne apartment ($1.8M value) to a Mosman house ($3.2M purchase price). Needed to secure new property before selling apartment in competitive market.
                    </p>
                    <h4 className="font-semibold mb-2 text-blue-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $1.8M (9 months)</li>
                      <li>• Secured against both properties</li>
                      <li>• Apartment sold after 6 months</li>
                      <li>• Bridge repaid, permanent loan on house</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">New Property Value:</span>
                        <span className="font-semibold">$3,200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Loan:</span>
                        <span className="font-semibold">$1,800,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Term:</span>
                        <span className="font-semibold">6 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Cost:</span>
                        <span className="font-semibold">$81,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Benefit:</span>
                        <span className="font-semibold text-green-600">Secured dream home</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center mb-4">
                  <Building2 className="text-green-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Parramatta Development Site</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Developer identified rezoned site in Parramatta for 80-apartment project. Needed fast settlement to secure site before competitors, with 8-month DA approval process ahead.
                    </p>
                    <h4 className="font-semibold mb-2 text-green-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Bridging loan: $4.5M (12 months)</li>
                      <li>• Site acquisition secured in 3 weeks</li>
                      <li>• DA approved after 8 months</li>
                      <li>• Refinanced to construction facility</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-green-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Purchase:</span>
                        <span className="font-semibold">$4,500,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridging Term:</span>
                        <span className="font-semibold">10 months (actual)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest + Fees:</span>
                        <span className="font-semibold">$412,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project GRV:</span>
                        <span className="font-semibold">$48,000,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Expected Profit:</span>
                        <span className="font-semibold text-green-600">$8.2M (17% margin)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-purple-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold">Bondi Auction Success</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-purple-900">Scenario:</h4>
                    <p className="text-gray-700 mb-4">
                      Investor wanted to secure off-market Bondi apartment before auction. Required unconditional offer with no finance clause to convince vendor to sell pre-auction.
                    </p>
                    <h4 className="font-semibold mb-2 text-purple-900">Solution:</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Pre-approved bridging: $2.1M</li>
                      <li>• Unconditional offer accepted</li>
                      <li>• 3-week settlement completed</li>
                      <li>• Refinanced to investment loan after 4 months</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-purple-900">Financial Outcome:</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-semibold">$2,100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Value (auction est.):</span>
                        <span className="font-semibold">$2,350,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Instant Equity:</span>
                        <span className="font-semibold text-green-600">$250,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bridge Interest (4mo):</span>
                        <span className="font-semibold">$63,000</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-gray-600 font-semibold">Net Benefit:</span>
                        <span className="font-semibold text-green-600">$187,000 equity gain</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Emet Capital for Sydney */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Sydney Clients Choose Emet Capital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Clock className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Sydney Market Speed</h3>
                <p className="text-blue-100">
                  We understand Sydney's fast-moving property market. Pre-approvals in 24 hours, settlements in 2-3 weeks, giving you the competitive edge at auctions and in negotiation.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <DollarSign className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">High-Value Expertise</h3>
                <p className="text-blue-100">
                  Experienced with Sydney's premium property values. Regular loans from $2-5M+ in Eastern Suburbs, North Shore, and Inner West. We understand luxury market valuations.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <Building2 className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Development Knowledge</h3>
                <p className="text-blue-100">
                  Deep experience with Sydney's development precincts - Parramatta, Green Square, Barangaroo, Rhodes. We bridge to construction finance seamlessly.
                </p>
              </div>
              <div className="bg-blue-800/50 p-6 rounded-lg">
                <TrendingUp className="mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-3">Local Partnerships</h3>
                <p className="text-blue-100">
                  Strong relationships with Sydney valuers, conveyancers, and solicitors. We expedite approvals and settlements through established local networks.
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
            <h2 className="text-3xl font-bold mb-12 text-center">Sydney Bridging Finance Application Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Initial Enquiry</h3>
                <p className="text-gray-600 text-sm">Contact us with your Sydney property scenario - purchase, upgrade, or development</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Quick Assessment</h3>
                <p className="text-gray-600 text-sm">We evaluate property values, equity position, and exit strategy within 4-8 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600 text-sm">Formal approval in 24-48 hours with Sydney valuers for quick turnaround</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold mb-2">Rapid Settlement</h3>
                <p className="text-gray-600 text-sm">Settlement in 2-3 weeks with Sydney legal teams for time-sensitive deals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sydney FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Sydney Bridging Finance FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can I get bridging finance for a Sydney auction purchase?</h3>
                <p className="text-gray-700">
                  Yes, absolutely. We provide pre-approved bridging finance specifically for auction purchases across Sydney. This allows you to bid unconditionally with confidence, knowing your finance is secured. We work with 24-hour turnaround for auction scenarios and can settle within 3 weeks for typical auction contracts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What LVR can I get for Eastern Suburbs properties?</h3>
                <p className="text-gray-700">
                  For prime Eastern Suburbs locations (Bondi, Double Bay, Vaucluse, Bellevue Hill), we typically lend up to 70-75% LVR due to the strong market fundamentals and liquidity. For premium property upgraders with substantial equity in their existing property, we can structure combined security arrangements up to 80% LVR across both properties.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">How quickly can you settle for a Parramatta development site?</h3>
                <p className="text-gray-700">
                  For development site acquisitions in growth precincts like Parramatta, Rhodes, or Green Square, we can typically achieve settlement within 3-4 weeks from approval. This includes valuation, due diligence, and legal documentation. For time-critical opportunities, we've completed settlements in as little as 10 business days with all parties coordinated.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Do you bridge for properties over $5 million in Sydney?</h3>
                <p className="text-gray-700">
                  Yes, we regularly facilitate bridging finance for high-value Sydney properties from $5M to $20M+. We have extensive experience with premium suburbs (Point Piper, Mosman, Woollahra) and understand luxury market valuations. These deals require careful structuring but we have established processes and valuer networks for high-value properties.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">What if my existing Sydney property hasn't sold within the bridge term?</h3>
                <p className="text-gray-700">
                  We build flexibility into our bridge loans with extension options if your property marketing takes longer than anticipated. Most of our Sydney bridges are structured for 9-12 months with the ability to extend for an additional 6 months if needed. We work with you on pricing strategy and agent selection to optimize sale outcomes.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Can you help with bridging finance for SMSF property purchases in Sydney?</h3>
                <p className="text-gray-700">
                  Yes, we facilitate bridging finance for SMSF trustees purchasing commercial or industrial properties across Sydney. Common scenarios include warehouse facilities in Western Sydney, office spaces in Parramatta or North Sydney, and retail properties. We understand SMSF compliance requirements and structure loans to meet superannuation law requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Sydney Property?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get pre-approved bridging finance for your Sydney property purchase, upgrade, or development. Fast decisions for Sydney's competitive market.
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

export default BridgingFinanceSydney;
