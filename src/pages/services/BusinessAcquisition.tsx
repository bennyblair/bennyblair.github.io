import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const BusinessAcquisition = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of business acquisitions can be financed?",
      answer: "Most commercial business purchases including established trading businesses, franchises, professional practices, manufacturing operations, and service businesses can be financed subject to lender assessment."
    },
    {
      question: "How fast can acquisition finance be approved?",
      answer: "Timeframes vary based on business complexity and due diligence requirements. Simple acquisitions may approve within 2-4 weeks, while complex transactions may require 4-8 weeks."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, business acquisition finance is available for buyers across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business acquisition only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Acquisition Finance Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Finance business purchases from $100K-$20M+ with flexible structures for acquiring established businesses, franchises, and professional practices across Australia." 
        />
        <meta name="keywords" content="business acquisition, business purchase loans, acquisition finance, business loans, commercial finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/business-acquisition" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Business Acquisition" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Business Purchase</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Business Acquisition Finance
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Business Acquisition Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Business acquisition finance enables buyers to purchase established trading businesses, franchises, professional practices, or commercial operations without requiring full purchase price capital upfront. This funding addresses entrepreneurs, business operators, and investors acquiring existing businesses by financing purchase costs while preserving working capital for operational requirements and growth initiatives. Acquisition finance applies to diverse business types from retail and hospitality to manufacturing, services, and professional practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Financing structures typically combine business value assessment with buyer equity contributions, usually requiring 20-40% deposit depending on business type, trading history, and profitability. Security may include business assets, property, or personal guarantees depending on lender requirements and transaction structure. Repayment terms range from 3-10 years based on business cash flow capacity and asset lives. Lenders assess business performance, industry sector, buyer experience, and transition plans when evaluating acquisition finance applications.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Business acquisition finance serves business buyers, entrepreneurs, existing business owners seeking expansion, and investors pursuing commercial acquisitions. First-time business buyers entering ownership through established operations, experienced operators expanding through acquisition, and franchise buyers purchasing proven systems all utilize acquisition finance. Management buyout participants, family succession buyers, and industry consolidators benefit from structured acquisition funding tailored to business purchase requirements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), relevant industry experience or management capabilities, equity contributions, and capacity to service debt from acquired business operations. Both experienced operators and appropriately skilled first-time business buyers benefit from acquisition finance solutions tailored to commercial purchase requirements.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist business lenders, and alternative funders. Our lender relationships encompass institutions specializing in business acquisition across various industry sectors and business scales. We match clients with lenders offering appropriate acquisition structures, competitive pricing, and terms aligned with business cash flow, buyer experience, and industry sector.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through acquisition finance structuring, due diligence requirements, and application processes. Our expertise includes coordinating business valuations, structuring optimal debt-to-equity ratios, and presenting transactions to lenders with industry specialization. Approval timeframes are significantly faster than direct applications, with streamlined processes and experienced guidance. We structure arrangements accommodating diverse business types, from straightforward established operations to complex multi-entity acquisitions.
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
                      Finance available from $100K to $20M+ with terms from 3-10 years depending on business type and cash flow. Principal-and-interest or interest-only options.
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
                      Purchasing established businesses, franchise acquisitions, professional practice buyouts, management buyouts, expansion acquisitions, and industry consolidation.
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
                      Security may include acquired business assets, commercial property, personal guarantees, or combinations depending on business type and lender requirements.
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
                      Detailed business and buyer assessment processes. Broker expertise coordinates due diligence, valuations, and lender presentation for efficient approvals.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), relevant industry experience or management capabilities, equity contribution typically 20-40%, and capacity to service debt from business operations. Documentation includes business financials, purchase agreements, buyer experience evidence, and business plans. Security requirements vary by business type and lender, from business assets alone to comprehensive security arrangements.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for an acquisition finance assessment. We'll evaluate your business purchase opportunity, experience, and financial capacity to identify optimal financing solutions. Our process includes deal review, lender recommendation, due diligence coordination, and guidance through to settlement and business transfer.
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
                  <CardTitle className="text-lg">Working Capital</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business operations and cash flow funding</p>
                  <Link to="/services/working-capital" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Comprehensive business asset and equipment funding</p>
                  <Link to="/services/asset-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Debt Consolidation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Combine multiple business debts into one facility</p>
                  <Link to="/services/debt-consolidation" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default BusinessAcquisition;
