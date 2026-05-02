import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Phone, FileText, Building2, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { generateServiceSchema } from "@/lib/schema-utils";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const FirstSecondMortgages = () => {
  const faqs: FAQItem[] = [
    {
      question: "What types of security are accepted?",
      answer: "Commercial property including office buildings, retail premises, industrial facilities, warehouses, and investment properties across Australia. Both first and second mortgage positions are available."
    },
    {
      question: "How fast can approval take?",
      answer: "An initial assessment may be possible quickly where the property, borrower, purpose, and documents are clear. Full approval and settlement timeframes depend on valuation, lender appetite, legal work, and documentation completeness."
    },
    {
      question: "When is a second mortgage used instead of a first mortgage?",
      answer: "A second mortgage may be considered when a borrower wants to access property equity without disturbing an existing first mortgage. It can suit business-purpose funding, but pricing, consent, and combined loan-to-value risk need careful review."
    },
    {
      question: "How is a second mortgage different from a caveat loan?",
      answer: "A second mortgage is usually a registered mortgage behind an existing lender, while a caveat loan uses a caveat interest and may be used for shorter, more urgent scenarios. The right structure depends on timing, security, existing debt, and exit."
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
      <SEO
        title="Second Mortgage Business Loans Australia | Emet Capital"
        description="First and second mortgage business loans for Australian commercial borrowers using property equity for acquisitions, refinance gaps, working capital, or short-term funding."
        canonical="/services/first-second-mortgages"
        keywords="second mortgage business loan, first mortgage commercial loan, commercial mortgage, property-backed business loans, commercial property finance"
        schemas={[generateServiceSchema(
          "First and Second Mortgage Business Loans",
          "Commercial first and second mortgage finance for Australian business borrowers using property equity for acquisitions, refinance gaps, working capital, and short-term funding structures.",
          "https://emetcapital.com.au/services/first-second-mortgages"
        )]}
      />
      
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
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              First and second mortgages can help business borrowers use commercial or investment property equity for acquisitions, refinance gaps, working capital, partner exits, and short-term business funding. The right structure depends on the first mortgage position, total leverage, lender consent, use of funds, and exit strategy.
            </p>
            
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
            <section className="bg-muted/30 rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">When a First or Second Mortgage Usually Fits</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">First mortgage</h3>
                  <p>Usually fits property purchases, cleaner refinances, commercial premises funding, and lower-risk structures where the new lender takes the primary security position.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Second mortgage</h3>
                  <p>Usually fits business-purpose equity release, urgent working capital, refinance bridges, partner exits, or project gaps where the borrower wants to keep the existing first mortgage in place.</p>
                </div>
              </div>
            </section>

            {/* What this service is */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Commercial Mortgage Finance?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial mortgage finance is property-backed lending for business or investment purposes. A first mortgage usually sits as the primary registered security over the property. A second mortgage sits behind an existing first mortgage and may allow a borrower to access additional equity without replacing the whole debt stack.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Commercial mortgage finance provides property-backed funding for business purposes through first and second mortgage positions. First mortgages represent primary security over commercial property and are often used for acquisitions, refinances, and longer-term property-backed facilities. Second mortgages provide additional funding against existing property equity without refinancing existing facilities, enabling businesses to access capital while preserving existing first mortgage arrangements where appropriate.
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
                We guide clients through the finance process, from initial assessment and lender selection through documentation preparation and settlement. Our expertise includes both first and second mortgage positioning, enabling strategic capital structuring. Timeframes depend on the security, valuation, consent requirements, and lender appetite, so we focus on packaging the file clearly and matching it to lenders that fit the transaction.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">First Mortgage vs Second Mortgage vs Caveat Loan</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Structure</th>
                      <th className="text-left py-3 pr-4 font-semibold">Typical Use</th>
                      <th className="text-left py-3 pr-4 font-semibold">Key Consideration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">First mortgage</td>
                      <td className="py-3 pr-4">Primary property-backed business loan, purchase, refinance, or equity release.</td>
                      <td className="py-3 pr-4">Usually needs the clearest security position and formal valuation pathway.</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 font-medium text-foreground">Second mortgage</td>
                      <td className="py-3 pr-4">Access additional equity without replacing the first mortgage.</td>
                      <td className="py-3 pr-4">Combined leverage, first lender consent, and exit strategy matter.</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-foreground">Caveat loan</td>
                      <td className="py-3 pr-4">Shorter-term urgent property-backed business funding.</td>
                      <td className="py-3 pr-4">Often higher cost and more time-sensitive; not a substitute for a weak exit.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                      Efficient documentation pathways through broker-led file packaging. Professional valuations arranged and alternative documentation options may be available depending on lender and circumstances.
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
                  href="/resources/guides/first-and-second-mortgages-for-business"
                  className="block p-6 bg-accent/5 border-2 border-accent/20 rounded-lg hover:border-accent/40 hover:bg-accent/10 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Definitive Guide to 1st & 2nd Mortgages</h3>
                      <p className="text-muted-foreground mb-3">Complete guide to first and second mortgage financing for business purposes—structures, costs, and strategic uses.</p>
                      <span className="text-accent font-medium inline-flex items-center">
                        Read Complete Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <a 
                href="/resources/guides/second-mortgage-lenders-australia-directory"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Second Mortgage Lenders Directory</h3>
                <p className="text-sm text-muted-foreground mb-2">Compare Australian second mortgage providers, structures, and assessment criteria.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/second-mortgages-for-business-guide"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Second Mortgages for Business</h3>
                <p className="text-sm text-muted-foreground mb-2">Is a second mortgage right for your company? Decision framework included.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/second-mortgage-bad-credit-qualify"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Bad Credit Second Mortgages</h3>
                <p className="text-sm text-muted-foreground mb-2">Qualifying options when credit history may limit your choices.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/caveat-loan-vs-second-mortgage-which-is-right-for-you"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Caveat Loan vs Second Mortgage</h3>
                <p className="text-sm text-muted-foreground mb-2">Compare urgent caveat funding with second mortgage structures.</p>
                <span className="text-accent text-sm inline-flex items-center">
                  Read Guide <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </a>
              <a 
                href="/resources/guides/second-mortgage-loan-equity-access-strategies"
                className="block p-4 border border-border rounded-lg hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <h3 className="font-semibold text-foreground mb-2">Equity Access Strategies</h3>
                <p className="text-sm text-muted-foreground mb-2">Advanced strategies for unlocking your property's hidden value.</p>
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
            { title: "First and Second Mortgages for Business", slug: "first-and-second-mortgages-for-business", description: "Understanding mortgage positions and their strategic uses" },
            { title: "Second Mortgage Lenders Australia Directory", slug: "second-mortgage-lenders-australia-directory", description: "Guide to second mortgage lender options across Australia" },
            { title: "How to Find Second Mortgage Brokers in Australia", slug: "how-to-find-second-mortgage-brokers-australia", description: "Finding the right broker for your second mortgage needs" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Commercial Property Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Short-term property finance for timing gaps and settlement pressure</p>
                  <Link to="/services/commercial-property-finance" className="text-accent hover:underline inline-flex items-center text-sm">
                    Commercial Property Finance <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Caveat Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Urgent property-backed business funding where timing is compressed</p>
                  <Link to="/services/caveat-loans" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Private Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Non-bank and private credit for property-backed business scenarios</p>
                  <Link to="/services/private-lending" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Asset-Backed Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Business loans secured by property, equipment, receivables, or other assets</p>
                  <Link to="/services/asset-backed-lending" className="text-accent hover:underline inline-flex items-center text-sm">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* City-specific pages */}
          <section className="mb-16">
            <div className="bg-muted/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1st & 2nd Mortgages by Location</h2>
              <p className="text-muted-foreground mb-6">
                Looking for commercial mortgage finance in your area? Explore our city-specific guides with local market insights and examples:
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  to="/services/first-second-mortgages/cities/sydney" 
                  className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  Sydney <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/services/first-second-mortgages/cities/melbourne" 
                  className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  Melbourne <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/services/first-second-mortgages/cities/brisbane" 
                  className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  Brisbane <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/services/first-second-mortgages/cities/perth" 
                  className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  Perth <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/services/first-second-mortgages/cities/adelaide" 
                  className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  Adelaide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/services/first-second-mortgages/cities/gold-coast" 
                  className="inline-flex items-center px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors"
                >
                  Gold Coast <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FirstSecondMortgages;
