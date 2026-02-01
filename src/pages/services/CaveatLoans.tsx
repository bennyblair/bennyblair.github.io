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

const CaveatLoans = () => {
  const faqs: FAQItem[] = [
    {
      question: "What is a caveat loan?",
      answer: "A caveat loan is short-term finance secured by registering a caveat (legal notice) on property title. It provides fast access to capital without full mortgage documentation, typically for urgent business needs."
    },
    {
      question: "How fast can caveat loans settle?",
      answer: "Caveat loans can settle within 24-72 hours for straightforward applications with clear property title and urgent business requirements. Complex cases may take 3-7 days."
    },
    {
      question: "Are caveat loans available Australia-wide?",
      answer: "Yes, caveat lending is available for businesses across all Australian states and territories through our specialist lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for urgent business funding only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Caveat Finance for Property Developers & Business Loans | Emet Capital</title>
        <meta 
          name="description" 
          content="Fast caveat loans from $50K-$5M+ with 24-72 hour settlement for urgent business funding needs secured against Australian property." 
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
            <Badge className="mb-4 bg-accent/10 text-accent">Fast Settlement</Badge>
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
                Caveat loans provide short-term business finance secured by registering a caveat over property title, enabling rapid funding without full mortgage documentation. This solution addresses urgent business funding needs, time-sensitive opportunities, or bridging requirements where traditional loan processes are too slow. Caveat loans settle within days rather than weeks, offering immediate capital access while businesses arrange permanent financing or await anticipated cash receipts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Loan structures are typically short-term (1-12 months) with interest-only repayments, designed for temporary funding needs rather than long-term finance. Security requires property with sufficient equity, though documentation requirements are streamlined compared to standard mortgages. Interest rates reflect the speed and convenience of settlement, with costs varying based on loan-to-value ratios, property type, and urgency. Exit strategies are essential, requiring clear plans for loan repayment through refinancing, asset sales, or business receipts.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Caveat loans serve business owners, property investors, and companies requiring urgent funding for time-sensitive opportunities or critical business needs. Businesses bridging delays in traditional finance approvals, property investors securing auction purchases, and companies addressing immediate cash flow requirements benefit from caveat lending. SMEs awaiting contract payments, businesses restructuring debt, and investors acquiring distressed assets utilize caveat loans for rapid capital access.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require property equity as security, clear exit strategies, and capacity to service short-term debt. Both established businesses and opportunistic investors benefit from caveat solutions tailored to urgent commercial funding requirements and time-sensitive business opportunities.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including specialist caveat lenders and private funders. Our lender relationships encompass institutions specializing in urgent commercial finance with streamlined approval processes and rapid settlement capabilities. We match clients with lenders offering appropriate caveat structures, competitive pricing given urgency, and terms aligned with business requirements and exit strategies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through rapid assessment, documentation, and settlement processes. Our expertise includes property equity assessment, exit strategy planning, and coordinating fast-track settlements. Approval timeframes are measured in hours or days rather than weeks, with experienced guidance through urgent funding scenarios. We structure appropriate short-term arrangements and assist with transition to permanent finance post-settlement.
              </p>
            </section>

            {/* Key features & benefits */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
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
                      Loans from $50K to $5M+ with terms from 1-12 months. Interest-only repayments with settlement achievable within 24-72 hours for urgent needs.
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
                      Urgent business funding, auction property purchases, bridging finance delays, time-sensitive opportunities, debt restructuring, and immediate cash flow needs.
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
                      Security via caveat over commercial or residential property with sufficient equity. Streamlined documentation compared to standard mortgage processes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Rapid Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Expedited assessment and approval designed for urgency. Minimal documentation and fast-track settlement within days, not weeks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), property with sufficient equity for security, clear exit strategy for loan repayment, and capacity to service short-term debt. Documentation is streamlined but includes property evidence, business purpose confirmation, and exit plan. Security requirements focus on property equity and clear title, with rapid valuation processes supporting fast settlement.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team immediately for urgent assessment. We'll evaluate your funding requirements, property security, and exit strategy to identify optimal caveat solutions. Our process includes rapid property assessment, lender selection, and guidance through to settlement within 24-72 hours where urgency demands.
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
                      <p className="text-muted-foreground mb-3">Everything you need to know about caveat finance—mechanics, costs, risks, and when it's the right choice.</p>
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
                <h3 className="font-semibold text-foreground mb-2">Caveat Lenders Directory 2025</h3>
                <p className="text-sm text-muted-foreground mb-2">Compare Australia's caveat finance providers by rates, speed, and LVR.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/caveat-loan-emergency-business-funding"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Emergency Business Funding</h3>
                <p className="text-sm text-muted-foreground mb-2">Caveat loans for tax debt, cash flow crises, and urgent business needs.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/urgent-caveat-loans"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Urgent Caveat Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Same-day and next-day approval options for time-critical funding.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/caveat-loans-vs-bank-loans-speed-comparison"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Caveat vs Bank Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Speed and cost comparison to help you choose the right option.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              </div>
            </section>


            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

          {/* Related Reading */}
          <RelatedReading articles={[
            { title: "Caveat Loans Australia: The Complete Guide", slug: "caveat-loans-australia-complete-guide", description: "Everything you need to know about caveat loans and urgent property finance" },
            { title: "Urgent Caveat Loans: When Speed Matters", slug: "urgent-caveat-loans", description: "How to access fast caveat funding for time-critical business needs" },
            { title: "Quick Caveat Loans: 48 Hour Settlement Possible", slug: "quick-caveat-loans-48-hour-settlement-possible", description: "Understanding rapid settlement options for caveat finance" }
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
        </div>
      </div>
    </>
  );
};

export default CaveatLoans;
