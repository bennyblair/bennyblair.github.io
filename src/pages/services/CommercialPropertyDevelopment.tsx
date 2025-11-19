import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const CommercialPropertyDevelopment = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of development projects can be financed?",
      answer: "Commercial developments, residential subdivisions, mixed-use projects, industrial developments, retail centers, and construction projects across all property types can be financed."
    },
    {
      question: "How fast can development finance be approved?",
      answer: "Timeframes vary based on project complexity and documentation. Simple developments may receive indicative approvals within 2-4 weeks, while complex projects may require 4-8 weeks for full approval."
    },
    {
      question: "Are development loans available Australia-wide?",
      answer: "Yes, development finance is available for projects across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for property development and construction projects only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial Property Development Finance Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Development finance from $500K-$100M+ for commercial, residential, and mixed-use construction projects across Australia." 
        />
        <meta name="keywords" content="development finance, construction loans, property development, project funding, development funding" />
        <link rel="canonical" href="https://emetcapital.com.au/services/commercial-property-development" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Property Development" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Construction Funding</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial Property Development Finance
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Property Development Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Property development finance provides funding for construction and development projects, covering land acquisition, construction costs, and related expenses until project completion and sale or refinancing. This specialized lending addresses developers, builders, and investors undertaking property projects by providing capital through progressive drawdowns aligned with construction milestones. Development finance encompasses residential subdivisions, commercial buildings, industrial projects, mixed-use developments, and major construction initiatives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Funding structures typically include land acquisition components and construction facilities releasing capital progressively as building stages complete. Security comprises the development site and work-in-progress, with lenders requiring feasibility studies, council approvals, professional cost estimates, and presales or end-value assessments. Interest is often capitalized during construction, with principal repayment upon project completion through sales or refinancing. Terms range from 12-36 months depending on project scale and complexity.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Development finance serves property developers, construction companies, builders, investors, and companies undertaking property projects. Experienced developers funding multiple projects, first-time developers entering the market, and builders constructing spec projects all utilize development finance. Property investors creating subdivision developments, commercial entities building owner-occupied premises, and joint venture partners financing collaborative projects benefit from tailored development funding solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require demonstrated development experience or experienced professional teams, detailed project feasibility, appropriate approvals or approval pathways, and equity contributions typically ranging from 20-40% of total project costs. Both seasoned developers and appropriately supported new entrants benefit from development finance tailored to project scale and complexity.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist development financiers, and private construction funders. Our lender relationships encompass traditional institutions and non-bank alternatives specializing in various development types, project scales, and developer experience levels. We match clients with lenders offering appropriate development structures, competitive pricing, and terms aligned with project feasibility, timelines, and exit strategies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through project assessment, feasibility structuring, and finance applications. Our expertise includes coordinating quantity surveyors, structuring equity contributions, and navigating presale requirements or end-value assessments. Approval timeframes are significantly faster than direct applications, with experienced guidance through complex development finance processes. We structure arrangements accommodating diverse project types, from simple residential subdivisions to complex commercial developments.
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
                      Development finance from $500K to $100M+ with terms from 12-36 months. Progressive drawdowns aligned with construction milestones and interest capitalization options.
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
                      Land acquisition, construction costs, residential subdivisions, commercial buildings, industrial projects, mixed-use developments, and major construction initiatives.
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
                      Security includes development site and work-in-progress. Additional security may include other property or guarantees depending on project scale and developer experience.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Comprehensive Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Detailed project assessment and feasibility review. Broker expertise coordinates professional teams, manages lender requirements, and ensures efficient approval processes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), demonstrated development experience or experienced professional teams, detailed project feasibility and costings, appropriate council approvals or clear approval pathways, and equity contributions typically 20-40% of total costs. Documentation includes feasibility studies, quantity surveyor reports, council approvals, presales contracts (if required), and developer financial position. Security requirements focus on development sites and construction work-in-progress.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for a project assessment. We'll evaluate your development feasibility, experience, and circumstances to identify optimal development finance solutions. Our process includes project review, lender recommendation, feasibility refinement, and guidance through to finance approval and progressive construction funding.
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

            {/* FAQs */}
            <FAQSection faqs={faqs} />
          </div>

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
                  <p className="text-sm text-muted-foreground mb-4">Alternative funding outside traditional banking channels</p>
                  <Link to="/services/private-lending" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default CommercialPropertyDevelopment;
