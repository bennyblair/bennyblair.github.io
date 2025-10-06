import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, DollarSign, Shield, AlertTriangle, FileText, Phone, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";

const CaveatLoans = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Caveat Loans" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Caveat Loans Australia | Fast Business Finance in 24 Hours",
        "description": "Caveat loans in Australia provide urgent short-term business funding secured by property. Learn eligibility, costs, benefits, risks, and apply online today.",
        "author": {
          "@type": "Organization",
          "name": "Emet Capital"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Emet Capital"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "/services/caveat-loans"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How fast can I get a caveat loan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Usually within 24–48 hours from application approval."
            }
          },
          {
            "@type": "Question",
            "name": "What loan term is available?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically 1–12 months, depending on your specific requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Can I have an existing mortgage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, provided there is sufficient equity and the mortgage terms allow it."
            }
          },
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Caveat Loans Australia | Fast Business Finance in 24 Hours</title>
        <meta name="description" content="Caveat loans in Australia provide urgent short-term business funding secured by property. Learn eligibility, costs, benefits, risks, and apply online today." />
        <meta name="keywords" content="Caveat Loans Australia, caveat loan, fast business loan, short-term finance, ATO debt loan, property secured business loan" />
        <link rel="canonical" href="/services/caveat-loans" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-4">
                <Clock className="w-4 h-4 mr-2" />
                Fast Finance
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Caveat Loans Australia
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Fast business finance in 24 hours. Caveat loans provide urgent short-term funding secured by property for ATO debt, cash flow gaps, and critical business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <FileText className="w-5 h-5 mr-2" />
                  Apply for Caveat Loan
                </Button>
                <Button variant="outline" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Expert
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-primary" />
            Key Takeaways
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Caveat loans are short-term property-secured business loans approved in as little as 24–48 hours.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              The lender registers a caveat on your property, restricting further dealings until the loan is cleared.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Loan terms are 1–12 months with interest-only repayments, often capitalised.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Common uses: ATO tax debt, cash flow gaps, creditor payments, and urgent settlements.
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
              Best for businesses needing fast capital when traditional finance is too slow.
            </li>
          </ul>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Caveat Loans?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Ultra-Fast Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get approved and funded within 24-48 hours. Perfect for urgent business needs and time-sensitive opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Property Secured</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secured against your property equity with minimal documentation required. Simple caveat registration process.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Flexible Repayment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interest-only or capitalised repayments with flexible exit strategies through sale or refinance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Is Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What Is a Caveat Loan?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                A caveat loan is a short-term funding solution that allows businesses to quickly release equity from property. Unlike a full mortgage, a caveat is a legal notice lodged on the property's title that prevents sale or further encumbrance without the lender's consent. Funds are typically released within 24-48 hours with terms of 1-12 months.
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Learn more:</strong> For detailed information on caveat loan structures, costs, and exit strategies, see our <Link to="/resources/guides/caveat-loans-australia-complete-guide" className="text-primary hover:underline">comprehensive Caveat Loans guide</Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">24-48h</div>
                <p className="text-sm text-muted-foreground">Approval Time</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">1-12mo</div>
                <p className="text-sm text-muted-foreground">Loan Terms</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">60% LVR</div>
                <p className="text-sm text-muted-foreground">Max Property</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">Minimal</div>
                <p className="text-sm text-muted-foreground">Documentation</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <Card className="premium-card">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How fast can I get a caveat loan?",
                    answer: "Usually within 24–48 hours from application approval."
                  },
                  {
                    question: "What loan term is available?",
                    answer: "Typically 1–12 months, depending on your specific requirements."
                  },
                  {
                    question: "Can I have an existing mortgage?",
                    answer: "Yes, provided there is sufficient equity and the mortgage terms allow it."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Related Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/services/bridging-finance" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Bridging Loans</h3>
                  <p className="text-sm text-muted-foreground">Better for buying and selling property</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/working-capital" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Working Capital</h3>
                  <p className="text-sm text-muted-foreground">Designed for ongoing liquidity needs</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/asset-backed-lending" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">Asset Backed Lending</h3>
                  <p className="text-sm text-muted-foreground">Leverage business assets</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/services/first-second-mortgages" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <h3 className="font-semibold">First & Second Mortgages</h3>
                  <p className="text-sm text-muted-foreground">Property-secured finance</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Apply for a Caveat Loan Today</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Need urgent funding? Unlock your property equity in 24 hours with a caveat loan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Apply Now for Caveat Loan
            </Button>
            <Button variant="outline" size="lg">
              Speak to Specialist
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CaveatLoans;