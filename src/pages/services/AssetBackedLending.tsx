import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const AssetBackedLending = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of assets can secure lending?",
      answer: "Commercial property, equipment, machinery, inventory, receivables, vehicles, and other business assets can secure lending. Multiple asset types can be combined for comprehensive facilities."
    },
    {
      question: "How fast can asset-backed lending be approved?",
      answer: "Timeframes vary based on asset type and valuation requirements. Simple equipment-backed loans may approve within 48-72 hours, while property-backed facilities may require 2-4 weeks."
    },
    {
      question: "Are these solutions available Australia-wide?",
      answer: "Yes, asset-backed lending is available for businesses across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business funding secured by business assets only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asset-Backed Lending Australia | Business Asset Finance | Emet Capital</title>
        <meta 
          name="description" 
          content="Asset-backed business lending from $50K-$20M+ secured by property, equipment, inventory, or receivables across Australia." 
        />
        <meta name="keywords" content="asset-backed lending, business finance, secured lending, asset finance, commercial lending" />
        <link rel="canonical" href="https://emetcapital.com.au/services/asset-backed-lending" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Asset-Backed Lending" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Secured Funding</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Asset-Backed Lending
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Asset-Backed Lending?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Asset-backed lending provides business finance secured by business assets including property, equipment, machinery, inventory, receivables, or vehicles. This security-focused approach enables businesses to leverage existing assets for working capital, growth funding, or debt restructuring without diluting ownership through equity arrangements. Asset-backed structures accommodate businesses with strong asset bases but limited traditional lending criteria, focusing on security value rather than extensive financial history or cash flow patterns.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Lending structures vary by asset type, from property-secured facilities resembling mortgages to equipment finance, inventory funding, and debtor finance converting receivables to immediate capital. Security valuations determine lending capacity, typically ranging from 50-80% of asset value depending on asset type, liquidity, and lender risk appetite. Repayment terms align with asset life and business cash flow, from short-term inventory cycles to long-term property-backed arrangements. Interest rates reflect security strength and asset liquidity.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Asset-backed lending serves business owners, manufacturers, retailers, wholesalers, contractors, and companies with substantial asset bases requiring funding. Businesses owning commercial property, equipment, or inventory utilize asset-backed lending for working capital, expansion, or refinancing. Manufacturing businesses funding production cycles, property-owning businesses accessing equity, and asset-rich companies managing cash flow benefit from leveraging assets for capital access without traditional lending constraints.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN), business assets suitable for security, and capacity to service debt from business operations or asset realizations. Both established asset-rich businesses and growth-stage companies building asset bases benefit from asset-backed solutions tailored to commercial lending requirements.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist asset financiers, and alternative funders. Our lender relationships encompass institutions specializing in various asset types from property to equipment, inventory, and receivables. We match clients with lenders offering appropriate asset-backed structures, competitive pricing relative to security strength, and terms aligned with business operations and asset characteristics.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through asset assessment, valuation coordination, and application processes. Our expertise includes optimizing security structures, combining multiple asset types, and structuring arrangements for favorable loan-to-value outcomes. Approval timeframes are significantly faster than direct applications, with streamlined processes and experienced guidance. We structure flexible arrangements compared to traditional constraints, accommodating diverse asset types and business models.
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
                      Finance from $50K to $20M+ with flexible terms from 3 months to 30 years depending on asset type. Interest-only and principal-and-interest options available.
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
                      Working capital, business expansion, equipment acquisition, inventory funding, debt refinancing, and leveraging existing business assets for growth.
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
                      Security may include commercial property, equipment, machinery, inventory, receivables, vehicles, or combinations of business assets.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Efficient Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Asset valuation and approval processes designed for business urgency. Broker expertise ensures optimal security structures and efficient decision-making.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), business assets suitable for security, and capacity to service debt from operations or asset realizations. Documentation includes business financial statements, asset valuations or evidence, and security details. Security requirements focus on asset type, condition, and marketability, with lending capacity typically 50-80% of assessed value.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for an asset assessment. We'll evaluate your business assets, funding requirements, and circumstances to identify optimal asset-backed solutions. Our process includes asset review, lender recommendation, valuation coordination, and guidance through to facility establishment.
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

          {/* Related Reading */}
          <RelatedReading articles={[
            { title: "Asset-Backed Lending and Asset Finance Guide", slug: "asset-backed-lending-and-asset-finance", description: "Comprehensive overview of asset-backed lending options for businesses" },
            { title: "First Mortgage Loans: Primary Property Finance", slug: "first-mortgage-loans-primary-property-finance", description: "Understanding first mortgage positions and their advantages" }
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
                  <CardTitle className="text-lg">Equipment Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Machinery and equipment acquisition funding</p>
                  <Link to="/services/equipment-finance" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default AssetBackedLending;
