import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Building2, Phone, FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const AssetFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Business equipment, machinery, vehicles, technology assets, and specialized tools across all industries. Assets must be for commercial business use only."
    },
    {
      question: "How fast can approval take?",
      answer: "Initial assessments typically within 24-48 hours. Full approval depends on asset type, value, and documentation completeness."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, asset finance is available for businesses across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business purposes only. Consumer equipment finance is not offered."
    }
  ];

  return (
    <>
      <SEO 
        title="Asset Finance Australia | Fund Vehicles, Machinery & Equipment | Emet Capital"
        description="Asset finance helps businesses acquire vehicles, equipment, and machinery. Competitive rates from $10,000 to $5 million for commercial purposes."
        canonical="/services/asset-finance"
        keywords="asset finance, equipment finance, vehicle finance, machinery finance, business equipment loans"
        schemas={[generateServiceSchema(
          "Asset Finance",
          "Finance for business vehicles, equipment, and machinery acquisition",
          "https://emetcapital.com.au/services/asset-finance"
        )]}
      />

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Asset Finance" }
        ]} />
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Business Growth Finance
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Asset Finance Australia
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/contact">
                  <FileText className="w-5 h-5 mr-2" />
                  Get Quote
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:0485952651">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12 mb-16">
          {/* What this service is */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">What is Asset Finance?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Asset finance enables businesses to acquire essential equipment, vehicles, and machinery without significant upfront capital outlay. This financing method provides funding specifically secured against the asset being purchased, allowing businesses to preserve working capital while accessing necessary operational tools. Asset finance encompasses both purchase financing and leasing arrangements, with structures tailored to business cash flow and asset depreciation characteristics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Funding applies to diverse asset types including vehicles, construction equipment, manufacturing machinery, medical equipment, technology systems, agricultural equipment, and specialized industry tools. Both new and used assets may qualify depending on age, condition, and lender criteria. Repayment structures align with asset useful life and business revenue patterns, providing flexibility in managing equipment acquisition costs.
            </p>
          </section>

          {/* Who this service is for */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Asset finance serves business owners, companies, contractors, and operators across all industries requiring equipment and machinery for commercial operations. Manufacturing businesses utilize equipment finance for production machinery, while transport operators access vehicle finance for fleet expansion. Construction companies, medical practices, agricultural businesses, and technology firms all benefit from asset-backed funding solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is commercial and business-purpose lending only—no consumer equipment finance is provided. Borrowers require appropriate business structures (ABN/ACN) and seek funding for assets used in commercial operations. Both established businesses and those upgrading or expanding equipment holdings benefit from flexible asset finance solutions tailored to commercial lending requirements.
            </p>
          </section>

          {/* How Emet Capital helps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist equipment financiers, and alternative capital providers. Our lender relationships encompass traditional institutions and specialist asset finance providers, enabling competitive rate comparisons and optimal structure selection. We specialize in asset-backed lending options that align with your business operational requirements and equipment strategies.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We guide clients through the entire finance process, from initial assessment and supplier coordination through documentation preparation and settlement. Our expertise includes both chattel mortgage and lease structures, enabling tax-effective equipment acquisition. Approval timeframes are significantly faster than direct applications, with streamlined processes and experienced guidance throughout. We structure flexible arrangements compared to traditional bank constraints, accommodating diverse business and equipment scenarios.
            </p>
          </section>

          {/* Key features & benefits */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
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
                    Finance available from $10,000 to $5M+ with terms from 2 to 7 years depending on asset type and useful life. Flexible repayment structures accommodate business cash flow patterns.
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
                    Supports vehicle acquisition, construction equipment, manufacturing machinery, medical equipment, technology systems, agricultural equipment, and specialized industry tools for business operations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Shield className="mr-2 h-5 w-5 text-accent" />
                    Asset-Based Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Secured specifically by the asset being financed. This security structure enables competitive rates and higher approval rates compared to unsecured business lending.
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
                    Efficient documentation requirements with faster approval pathways. Broker expertise ensures optimal structure selection and supplier coordination throughout the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Eligibility & next steps */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Eligibility requires business purpose (no consumer lending), appropriate business structure (ABN/ACN), demonstrated capacity to service repayments, and acceptable asset for security. Documentation typically includes business financial statements, tax returns, and asset details. Both new and used assets are considered subject to age and condition requirements.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              To proceed, contact our team for an initial assessment. We'll evaluate your equipment requirements, business circumstances, and asset specifications to identify optimal lender options. Our process includes structure recommendation, supplier coordination, and guidance through to asset delivery.
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
                      <p className="text-muted-foreground mb-3">Everything you need to know about asset-backed lending for business equipment, vehicles, and machinery.</p>
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
                <p className="text-sm text-muted-foreground mb-2">Detailed guide to chattel mortgages, leases, and novated leases.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/working-capital-loans-for-smes"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Working Capital Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Funding options to maintain cash flow while acquiring assets.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/business-debt-consolidation-australia"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Business Debt Consolidation</h3>
                <p className="text-sm text-muted-foreground mb-2">Restructuring multiple equipment facilities into one manageable loan.</p>
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
            { title: "Asset-Backed Lending and Asset Finance", slug: "asset-backed-lending-and-asset-finance", description: "Understanding asset-secured business funding" },
            { title: "Equipment Finance and Leasing Australia", slug: "equipment-finance-and-leasing-australia", description: "Complete guide to equipment finance options" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Equipment Finance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Specialized equipment and machinery financing solutions</p>
                <Link to="/services/equipment-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Working Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Short-term funding for operational needs</p>
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
                <p className="text-sm text-muted-foreground mb-4">Secured lending against business assets</p>
                <Link to="/services/asset-backed-lending" className="text-accent hover:underline inline-flex items-center text-sm">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export default AssetFinance;