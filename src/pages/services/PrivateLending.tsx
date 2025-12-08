import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Phone, FileText, Briefcase, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import FAQSection, { FAQItem } from "@/components/FAQSection";
import RelatedReading, { RelatedArticle } from "@/components/RelatedReading";

const PrivateLending = () => {
  const faqs: FAQItem[] = [
    {
      question: "What is private lending?",
      answer: "Private lending involves finance from non-bank lenders including private credit funds, high-net-worth individuals, and specialist finance companies offering alternative funding outside traditional banking channels."
    },
    {
      question: "How fast can private lending be arranged?",
      answer: "Private lenders typically offer faster approvals than banks. Simple transactions may approve within 3-7 days, while complex deals may require 2-4 weeks depending on security and circumstances."
    },
    {
      question: "Are private lending solutions available Australia-wide?",
      answer: "Yes, private lending is available for businesses and property investors across all Australian states and territories through our national lender network."
    },
    {
      question: "Is this for business purposes only?",
      answer: "Yes, this is commercial lending for business and investment purposes only. Consumer finance is not offered."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Private Lending Solutions Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Access private lending from $100K-$50M+ with flexible terms and fast approval for commercial property and business finance across Australia." 
        />
        <meta name="keywords" content="private lending, alternative finance, private credit, non-bank lending, commercial finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/private-lending" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Private Lending" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Alternative Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Private Lending Solutions
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What is Private Lending?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Private lending provides commercial finance from non-bank sources including private credit funds, high-net-worth individuals, family offices, and specialist finance companies operating outside traditional banking channels. This alternative funding addresses businesses and investors requiring flexible solutions, faster approvals, or finance for circumstances outside standard bank criteria. Private lenders evaluate opportunities based on security strength and deal merit rather than rigid policy constraints, accommodating diverse situations and property types.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Lending structures encompass first mortgages, second mortgages, mezzanine finance, and specialized arrangements tailored to transaction requirements. Private lenders accommodate various property types, unique circumstances, and time-sensitive situations that traditional lenders may decline. Security typically involves real property, though business assets may support certain private lending arrangements. Interest rates reflect risk assessment and funding urgency, with terms ranging from short-term bridging to medium-term facilities depending on purpose and exit strategy.
              </p>
            </section>

            {/* Who this service is for */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Who This Service Is For</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Private lending serves property investors, developers, business owners, and companies requiring flexible funding outside traditional banking constraints. Borrowers with complex income structures, non-standard properties, urgent funding requirements, or circumstances outside bank policy benefit from private lending solutions. Property investors managing portfolio transitions, developers funding time-sensitive acquisitions, and businesses restructuring debt or pursuing growth opportunities utilize private finance for alternative capital access.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is commercial and business-purpose lending only—no consumer finance is provided. Borrowers require appropriate business structures (ABN/ACN) or investment purposes, property or business asset security, and viable exit strategies for loan repayment. Both established investors and emerging businesses benefit from private lending tailored to commercial requirements and individual transaction circumstances.
              </p>
            </section>

            {/* How Emet Capital helps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">How Emet Capital Helps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As commercial finance brokers, we provide access to over 50 lenders nationwide, including extensive private lending networks encompassing credit funds, private investors, and specialist non-bank financiers. Our relationships span diverse private capital sources with varying risk appetites, funding scales, and specializations. We match clients with private lenders offering appropriate structures, competitive pricing within the private market, and terms aligned with transaction requirements and exit strategies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We guide clients through private lending assessment, deal structuring, and negotiation processes. Our expertise includes presenting transactions to private lenders, structuring security arrangements, and coordinating rapid settlements when required. Approval timeframes are significantly faster than traditional banking, with experienced guidance through alternative lending processes. We structure flexible arrangements accommodating unique circumstances, non-standard properties, and time-sensitive commercial opportunities.
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
                      Private lending from $100K to $50M+ with flexible terms from 3 months to 5 years. Interest-only structures common with exit-focused repayment strategies.
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
                      Property acquisition, business growth funding, debt restructuring, development finance, bridging loans, and situations outside standard bank policy.
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
                      Security typically includes real property (commercial, residential, or investment). First and second mortgage positions available depending on equity and deal structure.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <FileText className="mr-2 h-5 w-5 text-accent" />
                      Fast Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Rapid assessment and approval based on security strength and deal merit. Private lenders offer significantly faster decisions than traditional banking channels.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Eligibility & next steps */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility & Next Steps</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eligibility requires business or investment purpose (no consumer lending), property or business asset security with sufficient equity, and viable exit strategies for loan repayment. Documentation requirements are typically streamlined compared to banks, focusing on security evidence and transaction details. Private lenders assess deals based on security strength and merit rather than rigid policy criteria, accommodating diverse circumstances and property types.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To proceed, contact our team for a transaction assessment. We'll evaluate your funding requirements, security position, and circumstances to identify optimal private lending solutions. Our process includes deal structuring, private lender matching, and guidance through to rapid approval and settlement.
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
            { title: "What is Private Lending in Australia?", slug: "what-is-private-lending-australia", description: "Understanding private lending and how it differs from traditional bank finance" },
            { title: "Finding the Best Private Lenders for Your Business", slug: "finding-best-private-lenders-for-your-business", description: "How to identify and work with reputable private lenders" },
            { title: "Private Lenders for Small Business: Fast Approval Guide", slug: "private-lenders-small-business-fast-approval-guide", description: "Navigating private lending options for SMEs" }
          ] as RelatedArticle[]} />

          {/* Related Services */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
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
                  <CardTitle className="text-lg">Caveat Loans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Fast settlement urgent business funding</p>
                  <Link to="/services/caveat-loans" className="text-accent hover:underline inline-flex items-center text-sm">
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

export default PrivateLending;
