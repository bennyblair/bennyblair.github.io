import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const RefinancingSolutions = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of loans can be refinanced?",
      answer: "Commercial property loans, business loans, equipment finance, and investment property mortgages can all be refinanced. Both bank and non-bank facilities are suitable for refinancing."
    },
    {
      question: "How fast can refinancing be completed?",
      answer: "Timeframes vary based on loan type and security. Simple refinances may settle within 3-6 weeks, while complex commercial property refinances may require 6-12 weeks depending on valuation and documentation."
    },
    {
      question: "Can I refinance after a bank decline?",
      answer: "It may be possible if the decline was caused by lender policy, timing, property type, income presentation, or file structure. The transaction still needs adequate security, serviceability or exit, and a clear commercial rationale."
    },
    {
      question: "What does a commercial property refinance broker do?",
      answer: "A broker helps assess the existing debt, property security, borrower position, exit costs, lender appetite, and whether a direct refinance or short-term bridge-to-refinance is more realistic."
    },
    {
      question: "Are refinancing solutions available Australia-wide?",
      answer: "Yes, commercial refinancing is available for businesses and property investors across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business and investment property refinancing only. Consumer mortgage refinancing is not offered."
    }
  ];

  return (
    <>
      <SEO
        title="Commercial Property Refinance Broker Australia | Emet Capital"
        description="Commercial property refinance broker support for business-purpose property debt, bank-decline refinance scenarios, equity release, and bridge-to-refinance pathways."
        canonical="/services/refinancing-solutions"
        keywords="commercial property refinance broker, commercial refinancing, bank decline refinance, business property refinance, commercial mortgage refinance"
        schemas={[generateServiceSchema(
          "Commercial Property Refinance Broker",
          "Commercial property refinance support for business-purpose property debt, bank-decline scenarios, equity release, and bridge-to-refinance pathways.",
          "https://emetcapital.com.au/services/refinancing-solutions"
        )]}
      />
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Refinancing Solutions" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Commercial Property Refinance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial Property Refinance Broker
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Commercial Refinancing?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial refinancing replaces existing business or property loans with new facilities that may better fit the borrower's security, purpose, cash flow, or exit plan. Businesses and investors refinance to review pricing, access equity for business use, consolidate debt, manage maturity dates, or transition from restrictive bank facilities to more suitable alternatives. Refinancing applies to commercial property mortgages, business loans, equipment finance, and investment property debt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Refinancing structures include straight rate-and-term refinances maintaining similar loan amounts with improved pricing, cash-out refinances releasing equity for business use, and debt consolidation refinances combining multiple facilities. Security typically involves commercial or investment property, though business assets may support certain refinancing arrangements. Repayment terms range from short-term facilities to long-term mortgages depending on purpose and security type.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Refinancing After a Bank Decline</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A bank rejection can happen because the property, income, lease profile, loan size, timing,
                or borrower structure does not fit that lender's policy. That does not automatically mean
                the refinance is impossible, but the file needs a clear diagnosis before it is resubmitted.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Emet Capital helps borrowers compare direct refinance, non-bank refinance, private lending,
                and bridge-to-refinance pathways. The right option depends on security, valuation, exit,
                conduct, and whether the issue is temporary or structural.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Refinancing serves business owners, property investors, commercial property owners, and companies seeking better loan terms or accessing equity. Borrowers approaching loan maturity, experiencing improved financial positions, or requiring capital for expansion benefit from refinancing solutions. Investment property owners managing portfolio debt, SMEs requiring working capital, and businesses transitioning from bank to non-bank facilities utilize refinancing to optimize financial structures.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), demonstrated servicing capacity, and typically commercial or investment property as security. Both established businesses and growth-stage companies benefit from refinancing solutions tailored to commercial lending requirements and strategic financial objectives.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist commercial lenders, and alternative funders. Our lender relationships encompass traditional institutions and non-bank alternatives specializing in commercial property and business lending. We match clients with lenders offering appropriate refinancing structures, competitive pricing, and terms aligned with business objectives and property portfolios.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through refinancing assessment, lender comparison, and application processes. Our expertise includes analysing exit costs versus refinancing benefits, coordinating valuations, and structuring arrangements that fit the commercial objective. We focus on lender fit and file quality rather than promising outcomes, especially where the borrower is recovering from a decline or refinancing out of short-term debt.
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
                      Refinancing available from $200K to $50M+ with terms from 1-30 years depending on security. Interest-only and principal-and-interest options available.
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
                      Reviewing existing property debt, accessing equity for business use, consolidating debts, transitioning lenders, bank-decline recovery, or bridging into a longer-term refinance.
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
                      Security typically includes commercial property, investment property, or business premises. Some business asset-backed refinancing options available.
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
                      Comprehensive refinancing assessment and lender comparison. Broker expertise manages exit calculations, valuations, and settlement coordination.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), demonstrated capacity to service refinanced debt, and typically commercial or investment property as security. Documentation includes business financial statements, existing loan details, and property valuations. Security requirements vary by lender and refinancing purpose, from straightforward property security to comprehensive business asset arrangements.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for a refinancing assessment. We'll evaluate your existing loans, financial position, and objectives to identify optimal refinancing solutions. Our process includes benefit analysis, lender recommendation, and guidance through to settlement and loan replacement.
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
                Explore our in-depth guides on refinance strategy, bank-decline recovery, and commercial property lending.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Pillar Guide - Featured */}
              <div className="md:col-span-2 lg:col-span-3">
                <a 
                  href="/resources/guides/commercial-property-refinancing-solutions"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Commercial Property Refinancing Guide</h3>
                      <p className="text-muted-foreground mb-3">Guide to refinance structures, lender assessment, equity release, timing, and risk considerations.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/commercial-property-refinance-after-a-bank-decline-in-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Refinance After a Bank Decline</h3>
                <p className="text-sm text-muted-foreground mb-2">How to diagnose a declined refinance and compare alternative lender paths.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/vacant-commercial-property-refinance-in-australia-what-lenders-look-for"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Vacant Commercial Property Refinance</h3>
                <p className="text-sm text-muted-foreground mb-2">What lenders review when leases, vacancy, or income are part of the file.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/second-mortgage-lenders-australia-directory"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Second Mortgage Lenders</h3>
                <p className="text-sm text-muted-foreground mb-2">Refinancing options through second mortgage providers.</p>
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
            { title: "Commercial Property Refinancing Solutions", slug: "commercial-property-refinancing-solutions", description: "Guide to refinancing commercial property loans" },
            { title: "Commercial Property Refinance After a Bank Decline", slug: "commercial-property-refinance-after-a-bank-decline-in-australia", description: "How to diagnose bank-decline refinance issues and next steps" },
            { title: "Vacant Commercial Property Refinance", slug: "vacant-commercial-property-refinance-in-australia-what-lenders-look-for", description: "What lenders look for when refinancing vacant commercial property" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commercial Property Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Property-backed purchase, settlement, and refinance pathways</p>
                  <Link to="/services/commercial-property-finance" className="text-accent hover:underline inline-flex items-center text-sm">
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Private Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Non-bank and private credit options where bank policy does not fit</p>
                  <Link to="/services/private-lending" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>


          {/* City-specific pages */}
          <section className="mb-16">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Commercial Refinancing by Location</h2>
              <p className="text-muted-foreground mb-6">
                Explore our city-specific refinancing pages for local market context and commercial restructure scenarios:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/services/refinancing-solutions/cities/sydney" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Sydney <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link to="/services/refinancing-solutions/cities/melbourne" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Melbourne <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link to="/services/refinancing-solutions/cities/brisbane" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Brisbane <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link to="/services/refinancing-solutions/cities/perth" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Perth <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link to="/services/refinancing-solutions/cities/adelaide" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Adelaide <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link to="/services/refinancing-solutions/cities/gold-coast" className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors">Gold Coast <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RefinancingSolutions;
