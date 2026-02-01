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

const EquipmentFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of equipment can be financed?",
      answer: "Most commercial equipment including machinery, vehicles, technology, manufacturing equipment, medical equipment, hospitality assets, and construction equipment can be financed."
    },
    {
      question: "How fast can equipment finance be approved?",
      answer: "Approval timeframes vary based on equipment value and complexity. Simple equipment finance may approve within 24-48 hours, while larger or specialized equipment may require 3-7 days."
    },
    {
      question: "Are these solutions available Australia-wide?",
      answer: "Yes, equipment finance is available for businesses across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business equipment and asset acquisition only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial Equipment Finance for Businesses | Emet Capital</title>
        <meta 
          name="description" 
          content="Finance business equipment from $10K-$5M+ with flexible lease and loan structures for all commercial assets across Australia." 
        />
        <meta name="keywords" content="equipment finance, asset finance, equipment leasing, business equipment loans, machinery finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/equipment-finance" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Equipment Finance" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Asset Acquisition</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Equipment Finance
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Equipment Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Equipment finance enables businesses to acquire essential assets through loans or leases without large upfront capital outlays. This solution addresses businesses requiring machinery, vehicles, technology, or specialized equipment by spreading costs over time while preserving working capital. Equipment finance structures include finance leases, chattel mortgages, hire purchase agreements, and operating leases, each offering different ownership, tax, and cash flow implications tailored to business requirements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Financing structures vary from full-payout leases where businesses eventually own equipment, to operating leases maintaining vendor ownership with usage rights. Security is typically the financed equipment itself, minimizing additional collateral requirements. Repayment terms align with equipment lifespan and business cash flow, from short-term technology refreshes to long-term heavy machinery financing. Tax treatment varies by structure, offering potential deductions and depreciation benefits depending on ownership arrangements.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Equipment finance serves business owners, manufacturers, contractors, service providers, and companies across all industries requiring business assets. Construction businesses financing heavy machinery, hospitality operators acquiring kitchen equipment, medical practices purchasing diagnostic technology, and transport companies funding vehicle fleets all utilize equipment finance. SMEs preserving working capital, growth-stage businesses scaling operations, and established companies maintaining asset bases benefit from equipment financing solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), demonstrated trading history or business plans, and capacity to service equipment repayments. Both new and established businesses benefit from equipment finance tailored to commercial lending requirements and operational asset needs.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist equipment financiers, and alternative funders. Our lender relationships encompass traditional institutions and non-bank alternatives specializing in various equipment types and industry sectors. We match clients with lenders offering appropriate financing structures, competitive pricing, and terms aligned with equipment types, business cash flow, and tax planning objectives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through equipment financing options, structure selection, and application processes. Our expertise includes comparing lease versus loan benefits, optimizing tax outcomes, and coordinating vendor relationships. Approval timeframes are significantly faster than direct applications, with streamlined processes and experienced guidance. We structure flexible arrangements accommodating diverse equipment types, from standard commercial vehicles to specialized industry machinery.
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
                      Finance available from $10K to $5M+ with flexible terms from 1-7 years depending on equipment type and lifespan. Balloon payments available.
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
                      Machinery acquisition, vehicle fleets, technology equipment, manufacturing assets, medical equipment, hospitality assets, and construction machinery.
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
                      Security is typically the financed equipment itself. Additional security may include property or business assets for larger facilities.
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
                      Efficient assessment and approval processes designed for equipment acquisition timelines. Broker expertise ensures appropriate structure selection and quick decision-making.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), demonstrated or projected capacity to service equipment repayments, and business financials or plans. Documentation includes equipment quotes, business financial statements, and tax returns. Security is primarily the equipment being financed, with additional security requirements varying by lender and equipment value.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for an equipment finance assessment. We'll evaluate your equipment requirements, business cash flow, and tax objectives to identify optimal financing solutions. Our process includes structure recommendation, lender selection, and guidance through to equipment delivery and finance settlement.
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
                  href="/resources/guides/asset-backed-lending-and-asset-finance"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Complete Asset Finance Guide</h3>
                      <p className="text-muted-foreground mb-3">Comprehensive guide covering all forms of asset-backed business lending including equipment finance.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/equipment-finance-and-leasing-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Equipment Finance & Leasing</h3>
                <p className="text-sm text-muted-foreground mb-2">In-depth guide to financing equipment, vehicles, and machinery.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/working-capital-loans-for-smes"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Working Capital Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Maintain operational cash flow while funding equipment purchases.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/business-acquisition-finance-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Business Acquisition Finance</h3>
                <p className="text-sm text-muted-foreground mb-2">Financing equipment as part of buying an existing business.</p>
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
            { title: "Equipment Finance and Leasing Australia", slug: "equipment-finance-and-leasing-australia", description: "Complete guide to equipment finance options" },
            { title: "Asset-Backed Lending and Asset Finance", slug: "asset-backed-lending-and-asset-finance", description: "Understanding asset-secured business funding" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
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
                  <CardTitle className="text-lg">Asset-Backed Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business finance secured by commercial assets</p>
                  <Link to="/services/asset-backed-lending" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default EquipmentFinance;
