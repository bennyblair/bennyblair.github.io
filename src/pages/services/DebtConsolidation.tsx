import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const DebtConsolidation = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of business debts can be consolidated?",
      answer: "Most commercial debts including multiple property loans, equipment finance, trade finance facilities, working capital loans, and business credit lines can be consolidated into a single facility."
    },
    {
      question: "How fast can debt consolidation be arranged?",
      answer: "Timeframes vary based on security and existing debt complexity. Simple consolidations may settle within 2-4 weeks, while complex multi-lender scenarios may require 4-8 weeks."
    },
    {
      question: "Are these solutions available Australia-wide?",
      answer: "Yes, debt consolidation finance is available for businesses across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business debt consolidation only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Restructure & Refinancing Solutions | Emet Capital</title>
        <meta 
          name="description" 
          content="Consolidate multiple business debts into one facility with simplified management, improved cash flow, and competitive rates across Australia." 
        />
        <meta name="keywords" content="debt consolidation, business debt, refinancing, commercial finance, loan consolidation" />
        <link rel="canonical" href="https://emetcapital.com.au/services/debt-consolidation" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Debt Consolidation" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Debt Management</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Business Debt Consolidation
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Business Debt Consolidation?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Business debt consolidation combines multiple commercial debts into a single facility, simplifying debt management and potentially improving cash flow through better terms, lower interest rates, and streamlined repayments. This solution addresses businesses managing multiple lenders, facilities, or repayment schedules by refinancing existing debts into one comprehensive arrangement. Consolidation reduces administrative burden, improves financial clarity, and may lower overall servicing costs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Consolidation structures include property-secured facilities refinancing multiple debts against commercial or residential property, asset-backed solutions utilizing business equipment or inventory, and general security arrangements over business assets. Repayment terms are tailored to cash flow capacity, with options for interest-only periods during business transitions or principal-and-interest structures for debt reduction. Security requirements vary by debt size and business profile.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Debt consolidation serves business owners, companies, property investors, and commercial operators managing multiple debt facilities. Businesses experiencing cash flow pressure from multiple repayments, seeking better interest rates, or simplifying financial structures benefit from consolidation solutions. SMEs transitioning between growth phases, property investors managing portfolio debt, and companies restructuring operations utilize debt consolidation to improve financial efficiency.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), demonstrated servicing capacity, and typically property or business assets as security. Both established businesses and growth-stage companies benefit from consolidation solutions tailored to commercial lending requirements and operational cash flow management.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist consolidation providers, and alternative funders. Our lender relationships encompass traditional institutions and non-bank alternatives specializing in complex debt structures. We match clients with lenders offering appropriate consolidation structures, competitive pricing, and terms aligned with business cash flow and growth objectives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through debt assessment, facility structuring, and refinancing processes. Our expertise includes navigating payout penalties, coordinating multi-lender settlements, and structuring arrangements for optimal tax and cash flow outcomes. Approval timeframes are significantly faster than direct applications, with streamlined processes and experienced guidance. We structure flexible arrangements compared to traditional bank constraints, accommodating diverse business models and debt profiles.
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
                      Consolidation facilities from $100K to $50M+ with flexible terms from 1-30 years depending on security and business requirements. Interest-only options available.
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
                      Simplifying multiple debts, improving cash flow, reducing interest costs, releasing equity for growth, and streamlining business financial management.
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
                      Security may include commercial or residential property, business equipment, inventory, or general security over business assets depending on debt structure.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Streamlined Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive debt assessment and coordinated settlement process. Broker expertise manages multiple lender payouts and ensures efficient refinancing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), demonstrated capacity to service consolidated debt, and typically property or business assets as security. Documentation includes business financial statements, existing debt schedules, and asset valuations. Security requirements vary by lender and total debt quantum, from straightforward property security to comprehensive business asset arrangements.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for a debt assessment. We'll evaluate your existing debts, business cash flow, and circumstances to identify optimal consolidation solutions. Our process includes debt analysis, facility recommendation, lender selection, and guidance through to settlement and debt payout.
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
                  href="/resources/guides/working-capital-loans-for-smes"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Working Capital Loans Guide</h3>
                      <p className="text-muted-foreground mb-3">Understanding working capital finance including debt restructuring and consolidation strategies.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/business-debt-consolidation-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Business Debt Consolidation</h3>
                <p className="text-sm text-muted-foreground mb-2">Detailed guide to restructuring multiple debts into single manageable facilities.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/commercial-property-refinancing-solutions"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Commercial Refinancing Solutions</h3>
                <p className="text-sm text-muted-foreground mb-2">Restructuring property debt as part of overall consolidation.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/first-and-second-mortgages-for-business"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">First & Second Mortgages</h3>
                <p className="text-sm text-muted-foreground mb-2">Using property equity to consolidate business debts.</p>
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
            { title: "Business Debt Consolidation Australia", slug: "business-debt-consolidation-australia", description: "Guide to consolidating business debts effectively" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Refinancing Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Refinance existing commercial property or business loans</p>
                  <Link to="/services/refinancing-solutions" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Short-term funding for business operations and growth</p>
                  <Link to="/services/working-capital" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">First & Second Mortgages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Property-secured business finance solutions</p>
                  <Link to="/services/first-second-mortgages" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default DebtConsolidation;
