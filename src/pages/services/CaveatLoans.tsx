import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";
import DiscoveryGuides from "@/components/DiscoveryGuides";
import FinanceDecisionSupport from "@/components/FinanceDecisionSupport";

const CaveatLoans = () => {
  const faqs: FAQItem[] = [
    {
      question: "What is a caveat loan?",
      answer: "A caveat loan is short-term business-purpose finance commonly supported by lodging a caveat over real property. A caveat records a claimed interest and can restrict later dealings with the title; the legal basis and effect depend on the documents and jurisdiction, so borrowers should obtain legal advice."
    },
    {
      question: "How fast can caveat loans settle?",
      answer: "Some lenders can assess a complete, straightforward file quickly, but no timeframe is guaranteed. Title position, property evidence, the lender's due diligence, legal documents, first-mortgagee requirements and the borrower's responsiveness all affect approval and settlement."
    },
    {
      question: "Are caveat loans available Australia-wide?",
      answer: "Emet Capital can assess business-purpose enquiries from across Australia. Actual availability depends on the property jurisdiction, title position, lender coverage and the complete transaction."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for urgent business funding only. Consumer finance is not offered."
    }
  ];

  const cityLinkGroups = [
    {
      heading: "Major capital markets",
      links: [
        { label: "Sydney caveat finance", href: "/services/caveat-loans/cities/sydney" },
        { label: "Melbourne caveat finance", href: "/services/caveat-loans/cities/melbourne" },
        { label: "Brisbane caveat finance", href: "/services/caveat-loans/cities/brisbane" },
      ],
    },
    {
      heading: "Growth and regional markets",
      links: [
        { label: "Perth caveat finance", href: "/services/caveat-loans/cities/perth" },
        { label: "Adelaide caveat finance", href: "/services/caveat-loans/cities/adelaide" },
        { label: "Gold Coast caveat finance", href: "/services/caveat-loans/cities/gold-coast" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Caveat Loans Australia for Business | Emet Capital</title>
        <meta 
          name="description" 
          content="Compare caveat loans for Australian business purposes. Understand property equity, title, total cost, documents, risks and the exit evidence lenders assess."
        />
        <meta name="keywords" content="caveat loans, fast business finance, urgent funding, short-term loans, property-secured finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/caveat-loans" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Caveat Loans" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Short-Term Business Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Caveat Loans
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is a Caveat Loan?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Caveat loans are short-term, business-purpose facilities commonly supported by lodging a caveat over real property. They may be considered where a commercial deadline is shorter than a mainstream lending process, but a caveat is not simply a faster substitute for every mortgage. The borrower still needs a valid business purpose, sufficient property support, a workable title position and a credible repayment plan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Structures, terms and repayment methods vary by lender and scenario. Compare the interest calculation, establishment and legal costs, default terms, extension rights and total repayment—not only an advertised rate. The exit should be evidenced before drawdown, whether it is a refinance, a property sale or a documented business receipt.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A caveat facility may be relevant to a business owner, company, developer or property investor facing a defined commercial payment or settlement deadline. Examples can include an auction purchase, a delayed refinance, a documented receivable timing gap or a restructuring step where property support and a near-term repayment source are available.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. A scenario should have a valid business purpose, sufficient usable property equity, a legally workable security position, capacity to meet the proposed obligations and an exit that can be evidenced. If any of those foundations is missing, another structure or a later application may be more appropriate.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we assess the purpose, title position, property support, required date and exit before approaching relevant specialist lenders. The objective is to compare structures that can actually assess the file, not to send an urgent application indiscriminately across the market.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We help identify missing documents, surface legal or consent dependencies and compare indicative terms on total cost and exit risk. Lender assessment, valuation, legal work and settlement remain subject to the facts of the transaction; neither approval nor a particular settlement date can be promised.
              </p>
            </section>

            {/* Key decision factors */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Decision Factors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Briefcase className="mr-2 h-5 w-5 text-accent" />
                      Loan Ranges & Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Facility size, term and repayment structure depend on property support, existing debt, business purpose, lender appetite and the proposed exit.
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
                      Defined business-purpose payments, auction settlements, refinance timing gaps, documented receivables and restructuring steps with a credible exit.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="mr-2 h-5 w-5 text-accent" />
                      Flexible Security Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Security via caveat over commercial or residential property with sufficient equity. Documentation and legal requirements depend on the transaction, title position and lender.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      File Readiness
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      A complete document pack can reduce avoidable delay. The lender and its lawyers still determine due diligence, approval and settlement timing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <FinanceDecisionSupport
              heading="Is a Caveat Loan Suitable for This Business Scenario?"
              summary="Start with the deadline and exit, then test title position, usable equity and total cost. Urgency alone does not make a caveat facility suitable."
              suitable={[
                "A genuine business-purpose payment or settlement has a fixed, evidenced deadline.",
                "The property owner can demonstrate a valid title interest and enough equity after existing debt and costs.",
                "The exit is specific, timed and supported by refinance, sale or receivable evidence.",
                "The commercial consequence of missing the deadline has been compared with the facility's full cost.",
              ]}
              unsuitable={[
                "The purpose is personal, domestic or household rather than commercial.",
                "The exit depends only on hoped-for growth, an unlisted property sale or an unstarted refinance.",
                "Ownership, existing mortgages, caveats or first-mortgagee requirements have not been checked.",
                "A less expensive facility can meet the deadline without exposing the property to short-term default risk.",
              ]}
              evidence={[
                { label: "Property and title", detail: "Current title search or ownership evidence, rates notice, valuation evidence and statements for existing secured debt." },
                { label: "Business purpose", detail: "Invoice, settlement statement, creditor notice or contract showing the amount, use of funds and required date." },
                { label: "Entity and authority", detail: "Identification, ABN/ACN, trust or company documents and confirmation of who can approve and sign." },
                { label: "Exit evidence", detail: "Refinance progress, sale agency agreement and timetable, contract proceeds or another verifiable repayment source." },
              ]}
              process={[
                "Define the exact amount, commercial purpose, deadline and consequence of delay.",
                "Check ownership, existing secured debt, title interests and available property support.",
                "Test the exit under delay and lower-value scenarios before seeking indicative terms.",
                "Compare lender terms on net proceeds, total cost, control events, defaults and extensions.",
                "Obtain independent legal, accounting or tax advice where the documents or consequences require it.",
              ]}
              decisionRows={[
                { question: "How much cash is actually available at settlement?", whyItMatters: "Establishment, valuation and legal costs can reduce net proceeds, so the headline facility amount may not cover the requirement." },
                { question: "What happens if the exit is delayed?", whyItMatters: "Extension pricing, default provisions and enforcement rights can materially change the downside." },
                { question: "Does the caveator have a valid interest?", whyItMatters: "The legal basis for a caveat is jurisdiction- and document-specific and should be confirmed by a lawyer." },
                { question: "Is another structure more appropriate?", whyItMatters: "A second mortgage, bridging facility, refinance or working-capital product may better match the purpose and term." },
              ]}
            />

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), property with sufficient equity for security, a credible exit strategy for repayment and capacity to meet the proposed obligations. A lender may require property and title evidence, business-purpose confirmation, existing-debt details, valuation material and exit evidence. The assessment and settlement timetable remains subject to the lender, legal work and third parties.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, provide the required net amount, commercial purpose, deadline, property and existing-debt details, and proposed exit. We can identify evidence gaps, explain which structures may fit and seek indicative terms where the file is ready. The lender, valuer, lawyers and other parties retain control of approval, conditions and settlement timing.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If the scenario involves a commercial property purchase, business premises settlement, or a
                wider property-backed funding requirement, compare this option with{" "}
                <Link to="/services/commercial-property-finance" className="text-accent hover:underline">
                  commercial property finance
                </Link>{" "}
                before deciding whether a caveat structure is suitable.
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
                  href="/resources/guides/caveat-loans-australia-complete-guide"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Complete Caveat Loans Guide</h3>
                      <p className="text-muted-foreground mb-3">A decision guide to caveat mechanics, title position, costs, risks, evidence and alternatives.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/caveat-lenders-australia-directory-comparison"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Caveat Lender Types & Comparison</h3>
                <p className="text-sm text-muted-foreground mb-2">Compare lender fit, title requirements, evidence, total cost and exit expectations.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/caveat-loan-emergency-business-funding"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Emergency Business Funding</h3>
                <p className="text-sm text-muted-foreground mb-2">How to assess property support, purpose, cost and exit when a business payment is time-sensitive.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/urgent-caveat-loans"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Urgent Caveat Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Prepare a time-critical file and understand the dependencies that can delay assessment or settlement.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/caveat-loans-vs-bank-loans-speed-comparison"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Caveat vs Bank Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Compare process dependencies, total cost, security and product fit.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              </div>
            </section>


            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

          <DiscoveryGuides service="caveat-loans" />

          {/* Related Reading */}
          <RelatedReading articles={[
            { title: "Caveat Loans Australia: The Complete Guide", slug: "caveat-loans-australia-complete-guide", description: "Mechanics, evidence, title position, total cost, exit risk and alternatives" },
            { title: "Urgent Caveat Loans: When Timing Matters", slug: "urgent-caveat-loans", description: "How to prepare a decision-ready file for a time-critical business requirement" },
            { title: "Quick Caveat Loans: What Controls Settlement Timing", slug: "quick-caveat-loans-48-hour-settlement-possible", description: "The evidence and dependencies that influence caveat-finance timing" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bridging Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Short-term property acquisition and transition funding</p>
                  <Link to="/services/bridging-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Private Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Alternative funding outside traditional banking channels</p>
                  <Link to="/services/private-lending" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business operations and cash flow funding</p>
                  <Link to="/services/working-capital" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-3 text-center">Caveat Finance by Location</h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Compare local caveat-loan timing, security, and exit scenarios across key Australian markets.
              </p>
              <div className="space-y-6">
                {cityLinkGroups.map((group) => (
                  <div key={group.heading}>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">{group.heading}</h3>
                    <div className="flex flex-wrap gap-3">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="inline-flex items-center bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-lg transition-colors"
                        >
                          {link.label}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CaveatLoans;
