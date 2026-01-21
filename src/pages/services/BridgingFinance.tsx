import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Building2, Phone, FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const BridgingFinance = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Commercial and residential property across Australia. Security may include the property being purchased, existing property holdings, or a combination of both depending on loan-to-value ratios."
    },
    {
      question: "How fast can approval take?",
      answer: "Initial assessments typically within 24-48 hours for straightforward applications. Settlement can occur within 5-10 business days depending on property valuation and documentation."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, bridging finance is available for properties across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, these are commercial lending products for business purposes only. Consumer bridging loans are not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Bridging Loans Australia | Fast Short-Term Property Finance</title>
        <meta name="description" content="Fast bridging loans in Australia. Short-term property finance from 3-12 months with quick approval and competitive rates for commercial purposes." />
        <meta name="keywords" content="bridging loans, bridging finance, short-term property finance, property settlement loans" />
        <link rel="canonical" href="/services/bridging-finance" />
      </Helmet>

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
              Bridging Loans Australia
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
                Bridging finance provides short-term property funding that enables businesses and investors to proceed with property acquisition before completing existing property sales or refinancing arrangements. These facilities bridge temporary funding gaps, allowing strategic property moves without timing constraints. Bridging loans are property-secured with terms typically ranging from 3 to 12 months, providing flexibility for commercial property transactions and business property needs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The funding structure accommodates various scenarios including property purchase pending sale, auction purchases requiring quick settlement, property settlement timing mismatches, and temporary funding during refinancing processes. Security arrangements are flexible, utilizing either the property being purchased, existing holdings, or combined security positions. Interest structures often feature capitalization options, minimizing cash flow impact during the bridging period.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bridging finance serves property investors, business owners, developers, and companies requiring immediate property funding. Investors utilize bridging loans to secure opportunities before completing sales of existing properties. Business owners access short-term funding for premises acquisition while arranging permanent financing. Developers use bridging finance for land acquisition and pre-development funding before construction finance activation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer bridging loans are provided. Borrowers require property security and clear exit strategies demonstrating repayment capacity through property sale, refinancing, or business cash flow. Both established property holders and those building portfolios benefit from short-term bridging solutions tailored to commercial lending requirements.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, specialist bridging lenders, and private capital providers. Our lender relationships encompass traditional institutions and non-bank alternatives specializing in short-term property finance. We match clients with lenders offering competitive rates and structures aligned with property transaction timing and exit strategies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through rapid approval processes essential for time-sensitive property transactions. Our expertise includes security structuring, exit strategy planning, and coordination with property settlements. Approval timeframes are significantly faster than traditional property finance, with streamlined processes enabling quick decision-making. We structure flexible arrangements accommodating diverse property scenarios and business circumstances, ensuring successful property acquisition within tight timeframes.
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
                      Finance available from $100,000 to $50M+ with terms from 3 to 12 months. Flexible structures accommodate property transaction timing and exit strategies.
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
                      Supports property purchase pending sale, auction settlements, timing mismatches, refinancing transitions, and opportunity acquisition where immediate funding is required.
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
                      Streamlined Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Rapid assessment and approval processes designed for time-sensitive property transactions. Broker expertise ensures efficient documentation and quick settlement coordination.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), property security with adequate valuation, clear exit strategy demonstrating repayment capacity, and appropriate business structure where applicable. Documentation includes property details, exit strategy evidence (sale contracts or refinancing capacity), and business information. Both property investors and business owners with commercial property needs are considered.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for immediate assessment. Time-sensitive property transactions require rapid response, and we prioritize quick turnaround for bridging finance enquiries. We'll evaluate your property transaction, exit strategy, and security to identify optimal lender options and expedite approval processes.
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
            { title: "Bridging Finance Australia: Complete Property Guide", slug: "bridging-finance-australia-complete-property-guide", description: "Comprehensive guide to bridging loans for property investors and developers" },
            { title: "Commercial Bridging Finance for Auction Purchases", slug: "commercial-bridging-finance-auction-purchases", description: "How to secure auction properties with fast bridging finance" },
            { title: "Short-Term Property Loans: When You Need Fast Finance", slug: "short-term-property-loans-when-you-need-fast-finance", description: "Understanding when short-term property finance is the right solution" }
          ] as RelatedArticle[]} />

          {/* City-Specific Pages */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Bridging Finance by City</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get localized bridging finance information for Australia's major capital cities. Each city page provides market-specific insights, use cases, and examples tailored to your location.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Sydney</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Fast bridging loans for Sydney's dynamic property market - auction purchases, upgraders, and development sites.</p>
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
                  <p className="text-sm text-muted-foreground mb-4">Bridging finance for Melbourne's auction market - unconditional purchases, Bayside properties, and townhouse developments.</p>
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
                  <p className="text-sm text-muted-foreground mb-4">Brisbane bridging loans for Olympic-precinct developments, interstate relocations, and riverside property purchases.</p>
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
                  <p className="text-sm text-muted-foreground mb-4">Perth bridging finance for mining sector opportunities, resource-backed deals, and Western Australia property market.</p>
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
                  <p className="text-sm text-muted-foreground mb-4">Adelaide bridging loans for defense sector properties, urban renewal projects, and South Australian market opportunities.</p>
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
                  <p className="text-sm text-muted-foreground mb-4">Gold Coast bridging finance for tourism properties, waterfront developments, and Queensland coastal opportunities.</p>
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
                  <CardTitle className="text-lg">1st & 2nd Mortgages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Long-term commercial property finance solutions</p>
                  <Link to="/services/first-second-mortgages" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Caveat Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Ultra-fast property-secured business finance</p>
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