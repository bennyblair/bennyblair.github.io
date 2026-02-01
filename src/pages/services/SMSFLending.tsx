import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PiggyBank, Phone, FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const SMSFLending = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Commercial and residential property purchased by the SMSF. Property must be held in compliant custody trust structures and meet regulatory requirements for SMSF property investment."
    },
    {
      question: "How fast can approval take?",
      answer: "Initial assessments typically within 48-72 hours for SMSF applications. Full approval depends on property valuation, SMSF documentation, and compliance verification."
    },
    {
      question: "Are these loans available Australia-wide?",
      answer: "Yes, SMSF property lending is available for properties across all Australian states and territories through our specialist lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, SMSF lending is for investment purposes only through self-managed superannuation funds. This is not consumer or business operational lending."
    }
  ];

  return (
    <>
      <Helmet>
        <title>SMSF Property Lending Australia | Super Fund Loans | Emet Capital</title>
        <meta 
          name="description" 
          content="Specialized SMSF property lending with Limited Recourse Borrowing Arrangements. Super fund loans from $150K-$25M+ with compliant structures." 
        />
        <meta name="keywords" content="SMSF lending, super fund loans, LRBA, self managed super fund property, SMSF investment" />
        <link rel="canonical" href="https://emetcapital.com.au/services/smsf-lending" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "SMSF Lending" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Super Fund Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              SMSF Property Lending
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
                  Call Specialist
                </a>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-12 mb-16">
            {/* What this service is */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is SMSF Property Lending?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SMSF property lending enables self-managed superannuation funds to borrow for property investment through Limited Recourse Borrowing Arrangements (LRBAs). These specialized structures allow SMSFs to leverage borrowings for property acquisition while maintaining regulatory compliance with superannuation legislation. Property is held in compliant custody trust arrangements, protecting the broader SMSF from lender recourse beyond the secured property asset.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Lending applies to both commercial and residential investment properties, including office buildings, retail premises, industrial facilities, and residential real estate held for investment purposes. Loan structures accommodate SMSF cash flow characteristics with interest-only options and terms aligned with retirement planning horizons. All arrangements must comply with SIS Act requirements, including sole purpose test, in-house asset rules, and related party transaction restrictions.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SMSF property lending serves self-managed superannuation fund trustees seeking property investment within their retirement savings strategy. Fund members utilize SMSF lending to build property portfolios within tax-effective superannuation structures, benefiting from concessional tax treatment during accumulation phase and potential tax-free income during pension phase. Property investors diversify retirement savings beyond traditional super investments through direct property holdings.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is specialized investment lending through self-managed superannuation structures only—not consumer or business operational lending. Funds require appropriate SMSF establishment with compliant trust deeds, sufficient fund balance for deposits and costs, and ongoing capacity to service debt from fund income or contributions. Both established SMSFs and those establishing funds for property investment benefit from specialized SMSF lending solutions.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers with SMSF lending expertise, we provide access to specialist lenders nationwide offering Limited Recourse Borrowing Arrangement facilities. Our lender relationships include major banks with SMSF divisions, specialist SMSF lenders, and private capital providers understanding superannuation property investment requirements. We match trustees with lenders offering competitive rates and compliant structures for property acquisition.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide trustees through LRBA structuring, custody trust establishment, and documentation preparation ensuring regulatory compliance. Our expertise includes coordination with SMSF administrators, accountants, and legal advisors to establish compliant borrowing arrangements. Approval processes consider SMSF-specific criteria including fund balance, investment strategy alignment, and ongoing serviceability. We structure arrangements accommodating SMSF cash flow characteristics while maintaining full compliance with superannuation legislation.
              </p>
            </section>

            {/* Key features & benefits */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Key Features & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <PiggyBank className="mr-2 h-5 w-5 text-accent" />
                      Loan Ranges & Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Finance available from $150,000 to $25M+ with terms from 5 to 30 years. Interest-only options available to optimize SMSF cash flow during accumulation phase.
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
                      Supports commercial and residential investment property acquisition within SMSF structures. Enables leveraged property investment within retirement savings strategies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="mr-2 h-5 w-5 text-accent" />
                      Compliant LRBA Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Secured through Limited Recourse Borrowing Arrangements with compliant custody trust structures. Protection for broader SMSF assets beyond secured property.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Expert Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Specialized expertise in SMSF lending requirements and regulatory compliance. Coordination with SMSF administrators and legal advisors throughout the process.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires compliant SMSF establishment with appropriate trust deed, sufficient fund balance for deposit and costs (typically minimum $200,000+ fund balance), acceptable investment property for security, and ongoing capacity to service debt from fund income or contributions. Property must align with SMSF investment strategy and comply with sole purpose test and related party restrictions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our SMSF lending specialists for initial assessment. We'll evaluate your fund circumstances, property investment plans, and serviceability to identify optimal lender options. Our process includes LRBA structure coordination, custody trust establishment, and guidance through to compliant settlement.
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
                  href="/resources/guides/construction-finance-australia-complete-guide"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Complete Construction Finance Guide</h3>
                      <p className="text-muted-foreground mb-3">Comprehensive property finance guide including SMSF lending for commercial property.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/smsf-loans-for-commercial-property"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">SMSF Commercial Property Loans</h3>
                <p className="text-sm text-muted-foreground mb-2">Complete guide to buying commercial property through your SMSF.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/commercial-property-loans-australia-complete-guide"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Commercial Property Loans Guide</h3>
                <p className="text-sm text-muted-foreground mb-2">Understanding commercial lending options for SMSF purchases.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/commercial-property-loan-eligibility-what-you-need-to-qualify"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Loan Eligibility Guide</h3>
                <p className="text-sm text-muted-foreground mb-2">Qualification requirements for SMSF commercial property lending.</p>
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
            { title: "SMSF Loans for Commercial Property", slug: "smsf-loans-for-commercial-property", description: "Guide to SMSF property investment and LRBA structures" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">1st & 2nd Mortgages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Commercial property finance solutions</p>
                  <Link to="/services/first-second-mortgages" className="text-accent hover:underline inline-flex items-center text-sm">
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Refinancing Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Optimize existing property finance arrangements</p>
                  <Link to="/services/refinancing-solutions" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default SMSFLending;