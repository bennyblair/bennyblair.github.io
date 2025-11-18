import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Building2, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FAQSection, { FAQItem } from "@/components/FAQSection";

const FirstSecondMortgages = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Commercial property including office buildings, retail premises, industrial facilities, warehouses, and investment properties across Australia. Both first and second mortgage positions are available."
    },
    {
      question: "How fast can approval take?",
      answer: "Initial assessments typically within 24-48 hours for straightforward applications. Full approval and settlement timeframes depend on property valuation and documentation completeness."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, commercial mortgage finance is available for properties across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, these are commercial lending products for business purposes only. Consumer lending and residential home loans are not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial 1st & 2nd Mortgages Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Secure commercial first and second mortgages from $100K-$50M+. Fast approval, competitive rates, flexible terms for business property finance." 
        />
        <meta name="keywords" content="commercial mortgage, first mortgage, second mortgage, commercial property finance, business property loans" />
        <link rel="canonical" href="https://emetcapital.com.au/services/first-second-mortgages" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "1st & 2nd Mortgages" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Commercial Property Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial 1st & 2nd Mortgages
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
                <Link to="/contact"><FileText className="mr-2 h-5 w-5" />Get Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651"><Phone className="mr-2 h-5 w-5" />Call Expert</a>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            {/* What this service is */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Commercial Mortgage Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial mortgage finance provides property-backed funding for business purposes through first and second mortgage positions. First mortgages represent primary security over commercial property, typically offering the most competitive rates and terms. Second mortgages provide additional funding against existing property equity without refinancing existing facilities, enabling businesses to access capital while preserving favorable first mortgage arrangements.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                These facilities support property acquisition, business expansion, asset consolidation, and working capital requirements. Lending is secured against commercial real estate including office buildings, retail premises, industrial facilities, warehouses, and investment properties. Both owner-occupied and investment properties qualify, with loan structures tailored to business cash flow and property characteristics.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial mortgage finance serves business owners, property investors, developers, companies, trusts, and self-managed superannuation funds seeking property-backed funding. Business owners utilize these facilities to acquire premises, consolidate operations, or access equity for growth initiatives. Property investors leverage mortgages to expand portfolios and optimize returns across commercial real estate holdings.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer lending is provided. Borrowers require appropriate business structures (ABN/ACN or trust arrangements) and seek funding backed by commercial property security. Both established businesses and those building property portfolios benefit from flexible mortgage solutions tailored to commercial lending requirements.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including major banks, regional lenders, and private capital providers. Our lender relationships encompass traditional institutions and non-bank alternatives, enabling competitive rate comparisons and optimal structure selection. We specialize in property-backed lending options that align with your business objectives and property portfolio strategy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through the entire finance process, from initial assessment and lender selection through documentation preparation and settlement. Our expertise includes both first and second mortgage positioning, enabling strategic capital structuring. Approval timeframes are significantly faster than direct bank applications, with streamlined processes and experienced guidance throughout. We structure flexible arrangements compared to traditional bank constraints, accommodating diverse business and property scenarios.
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
                      Finance available from $100,000 to $50M+ with terms from 1 to 30 years depending on purpose and property. Interest-only and principal-and-interest repayment structures accommodate diverse cash flow requirements.
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
                      Supports business premises acquisition, commercial property investment, business expansion, equipment purchases, working capital, and debt consolidation. Second mortgages enable equity access without disturbing existing facilities.
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
                      Secured by commercial real estate including office, retail, industrial, warehouse, and mixed-use properties. Both first and second mortgage positions available depending on existing encumbrances and equity.
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
                      Efficient documentation requirements and faster approval pathways through broker expertise. Professional valuations arranged and alternative documentation options available depending on lender and circumstances.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business purpose (no consumer lending), commercial property security with adequate valuation, appropriate business structure (ABN/ACN or trust), and demonstrated capacity to service debt. Financial documentation requirements vary by lender but typically include business financial statements, tax returns, and property information. Both established businesses and those building property portfolios are considered.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for an initial assessment. We'll evaluate your requirements, property security, and business circumstances to identify optimal lender options. Our process includes structure recommendation, lender application preparation, and guidance through to settlement.
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
                  <p className="text-sm text-muted-foreground mb-4">Short-term property finance for immediate funding needs</p>
                  <Link to="/services/bridging-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Refinancing Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Optimize existing facilities with better rates and terms</p>
                  <Link to="/services/refinancing-solutions" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Construction and development finance for projects</p>
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

export default FirstSecondMortgages;