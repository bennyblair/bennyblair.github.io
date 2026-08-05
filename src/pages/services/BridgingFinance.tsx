import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Building2, Phone, FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import FinanceDecisionSupport from "@/components/FinanceDecisionSupport";

const BridgingFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Commercial or residential property may be considered, depending on lender policy and the transaction. Security can include the property being purchased, existing holdings or a combination, subject to valuation, existing debt and title requirements."
    },
    {
      question: "How fast can approval take?",
      answer: "A complete file may be assessed more efficiently, but no responsible party can promise a fixed decision or settlement time. Timing depends on valuation, legal requirements, lender appetite, third parties and borrower readiness."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Emet Capital can assess commercial bridging enquiries from across Australia. Lender availability depends on property location and type, borrower circumstances, purpose, security and exit evidence."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, these are commercial lending products for business purposes only. Consumer bridging loans are not offered."
    }
  ];

  return (
    <>
      <SEO 
        title="Commercial Bridging Finance Australia | Emet Capital"
        description="Compare commercial bridging finance for property settlement and refinance gaps. Understand security, total cost, exit evidence, risks and lender assessment."
        canonical="/services/bridging-finance"
        keywords="bridging finance, bridging loans, short term property loans, auction finance, settlement bridge loans"
        schemas={[generateServiceSchema(
          "Bridging Finance",
          "Short-term finance for property purchases and time-sensitive opportunities",
          "https://emetcapital.com.au/services/bridging-finance"
        )]}
      />

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Bridging Finance" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Short-Term Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Commercial Bridging Finance Australia
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Get Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            {/* What this service is */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Bridging Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bridging finance is short-term property-backed funding used to cover a defined timing gap before an expected exit, such as a property sale or refinance. It can support commercial acquisitions, settlements and refinance transitions, but it does not remove timing risk: the proposed exit and a contingency plan should be tested before the facility is accepted.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The security may include the property being acquired, an existing property or both, depending on the lender and transaction. Interest may be paid or capitalised, but capitalisation increases the balance and can reduce the equity buffer. Compare net proceeds, total repayment, default and extension terms—not only the stated interest rate.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bridging finance may suit property investors, business owners and developers with a specific commercial transaction and a time-bounded exit. Common scenarios include purchasing before another property settles, a refinance that cannot complete by the current maturity date, or a temporary gap before a longer-term commercial facility is ready.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer bridging loans are provided. The borrower should be able to evidence the property position, peak debt, transaction purpose and a repayment exit such as sale, refinance or a documented business receipt. A bridge is a poor fit where the exit is only an aspiration or the downside cannot be absorbed.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we assess the transaction, security position, required date and exit evidence before approaching lenders able to consider that scenario. We compare indicative terms on the same assumptions so differences in net proceeds, interest treatment, fees and extension provisions are visible.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We help assemble the transaction and security pack, test exit assumptions and coordinate information requested by lenders, valuers and lawyers. Timing depends on the complete transaction and third parties, so the focus is a decision-ready file and a realistic timetable rather than a promised date.
              </p>
            </section>

            {/* Key decision factors */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Decision Factors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Building2 className="mr-2 h-5 w-5 text-accent" />
                      Loan Ranges & Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Facility size and term depend on security value, existing debt, property type, serviceability where required, purpose and the evidence supporting the exit.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                      Suitable Use Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Purchase-before-sale transactions, auction settlements, refinance transitions and other defined property timing gaps with an evidenced exit.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="mr-2 h-5 w-5 text-accent" />
                      Property-Based Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Secured by commercial or residential property. Security arrangements include property being purchased, existing holdings, or combined positions depending on loan-to-value requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Decision-ready process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A complete transaction, debt, security and exit pack can reduce avoidable questions. The lender and its advisers still control assessment, conditions and settlement.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <FinanceDecisionSupport
              heading="Bridging Finance Fit, Evidence and Exit Checks"
              summary="A bridge should connect a current obligation to a plausible, documented exit. The strongest files show both the primary exit and what happens if it is delayed."
              suitable={[
                "A commercial purchase or refinance has a fixed settlement or maturity date.",
                "The primary exit is a documented sale, refinance or other identifiable liquidity event.",
                "The property security and existing debt leave room for interest, fees and a delay buffer.",
                "The borrower has compared the cost of bridging with the commercial cost of missing the transaction.",
              ]}
              unsuitable={[
                "There is no defined repayment event within the proposed term.",
                "The sale exit assumes an unsupported price or an unrealistically short marketing period.",
                "The refinance exit has not been checked against serviceability, valuation and lender policy.",
                "The transaction is consumer-purpose or a conventional facility can meet the deadline at lower risk.",
              ]}
              evidence={[
                { label: "Transaction", detail: "Executed contract, settlement statement, current loan statement or maturity notice showing amount and deadline." },
                { label: "Security", detail: "Ownership and title information, existing debt, valuation evidence, leases and relevant property documents." },
                { label: "Sale exit", detail: "Agency agreement, campaign status, comparable evidence, sale contract if available and a realistic settlement allowance." },
                { label: "Refinance exit", detail: "Lender or broker progress, financial information, valuation assumptions and outstanding approval conditions." },
              ]}
              process={[
                "Map the current obligation, settlement date and exact funding shortfall.",
                "Calculate the peak balance including capitalised interest and known fees.",
                "Validate the primary exit and model a delayed-exit contingency.",
                "Compare eligible lenders using one written assumptions sheet.",
                "Review legal documents, control events, extensions and discharge mechanics before settlement.",
              ]}
              decisionRows={[
                { question: "Is the bridge open or closed?", whyItMatters: "A contracted exit differs materially from a property that still needs to be marketed or a refinance that is not approved." },
                { question: "What is the peak debt at the delayed-exit date?", whyItMatters: "Capitalised interest and fees can erode the equity buffer during a delay." },
                { question: "Which approval conditions are outside the borrower's control?", whyItMatters: "Valuation, consent, legal and incoming-lender conditions can prevent the planned timetable." },
                { question: "What are the extension and default mechanics?", whyItMatters: "A low initial rate can be outweighed by extension fees, default pricing or restrictive control rights." },
              ]}
            />

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A lender may require entity and authority documents, a contract or current facility statement, property and title information, valuation evidence, existing-debt details, financial information and support for the proposed sale or refinance exit. Requirements vary by transaction and lender; business purpose, security and an evidenced repayment path are core assessment inputs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To request an initial assessment, provide the exact funding shortfall, required date, transaction documents, security position and exit evidence. We can identify gaps and explain which lender pathways may fit, but indicative terms, approval and settlement remain subject to the complete file and third parties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact"><FileText className="mr-2 h-5 w-5" />Start Application</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651"><Phone className="mr-2 h-5 w-5" />Speak with Specialist</a>
                </Button>
              </div>
            </section>

            {/* Guides & Resources Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-accent" />
                Guides & Resources
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore our in-depth guides to learn more about this financing option before you apply.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Pillar Guide - Featured */}
              <div className="md:col-span-2 lg:col-span-3">
                <a 
                  href="/resources/guides/bridging-finance-australia-complete-property-guide"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Complete Bridging Finance Guide</h3>
                      <p className="text-muted-foreground mb-3">Model peak debt, compare exit evidence, understand total cost and test delayed-settlement risk.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/best-bridging-loan-lenders-companies-2025"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Bridging Loan Lenders Guide</h3>
                <p className="text-sm text-muted-foreground mb-2">Compare lender types, criteria, security, and timing considerations for bridging finance.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/commercial-bridging-loans-for-property-auctions-expert-guide"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Commercial Bridging for Auctions</h3>
                <p className="text-sm text-muted-foreground mb-2">Strategies for unconditional bidding at commercial property auctions.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/commercial-property-development-finance"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Bridging Finance for Developers</h3>
                <p className="text-sm text-muted-foreground mb-2">Project funding solutions between development phases and construction draws.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/short-term-property-loans-when-you-need-fast-finance"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Short-Term Property Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Short-term property funding options when timing and exit planning matter.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              </div>
            </section>


            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

          <DiscoveryGuides service="bridging-finance" />

          {/* Related Reading */}
          <RelatedReading articles={[
            { title: "Bridging Finance Australia: Complete Property Guide", slug: "bridging-finance-australia-complete-property-guide", description: "Peak debt, exit evidence, total cost, timing risk and alternatives" },
            { title: "Commercial Bridging Finance for Auction Purchases", slug: "commercial-bridging-loans-for-property-auctions-expert-guide", description: "How to assess an auction bridge before making an unconditional commitment" },
            { title: "Bridge Lending for Commercial Property", slug: "bridge-lending-australia-commercial-property", description: "How commercial property bridge lending is structured and assessed" }
          ] as RelatedArticle[]} />

          {/* City-Specific Pages */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Bridging Finance by City</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Review property-location considerations for major Australian markets. Finance remains subject to the transaction, security, borrower and lender rather than the city label alone.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Sydney</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Commercial auction, purchase-before-sale and development timing scenarios involving Sydney property.</p>
                  <Link to="/services/bridging-finance/cities/sydney" className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                    Sydney Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Melbourne</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Melbourne property.</p>
                  <Link to="/services/bridging-finance/cities/melbourne" className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                    Melbourne Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Brisbane</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Brisbane property.</p>
                  <Link to="/services/bridging-finance/cities/brisbane" className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                    Brisbane Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Perth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Perth property.</p>
                  <Link to="/services/bridging-finance/cities/perth" className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                    Perth Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Adelaide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Adelaide property.</p>
                  <Link to="/services/bridging-finance/cities/adelaide" className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                    Adelaide Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Gold Coast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Valuation, title, legal and lender-coverage considerations for bridging scenarios involving Gold Coast property.</p>
                  <Link to="/services/bridging-finance/cities/gold-coast" className="text-accent hover:underline inline-flex items-center text-sm font-semibold">
                    Gold Coast Bridging Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commercial Property Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Commercial property settlement, purchase, and refinance structures</p>
                  <Link to="/services/commercial-property-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Caveat Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Short-term business-purpose finance supported by a workable property and title position</p>
                  <Link to="/services/caveat-loans" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Construction and development project finance</p>
                  <Link to="/services/commercial-property-development" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BridgingFinance;
