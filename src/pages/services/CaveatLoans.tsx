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
          {
            "@type": "Question",
            "name": "Are caveat loans for personal use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, they are designed for business purposes only."
            }
          }
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
                A caveat loan is a short-term funding solution that allows businesses to quickly release equity from property. Unlike a full mortgage, a caveat is a legal notice lodged on the property's title that prevents sale or further encumbrance without the lender's consent.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">How Caveat Loans Work</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>You apply with details of your property and funding needs.</li>
                <li>The lender confirms equity and registers a caveat on the property.</li>
                <li>Funds are released, often within 24–48 hours.</li>
                <li>Repayment is made through sale, refinance, or business income.</li>
                <li>Once repaid, the caveat is removed.</li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Common Uses & Benefits */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Common Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                    ATO tax debt repayment to avoid penalties
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                    Business cash flow — payroll, suppliers, or urgent expenses
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                    Property settlements where timing is critical
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                    Creditor payments to prevent winding-up orders
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                    Growth opportunities such as bulk stock purchases or contract bidding
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-green-700">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ultra-fast approval and funding
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Minimal documentation required
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Flexible use for most business purposes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Short loan terms reduce long-term commitment
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-800">Risks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-orange-700">
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Higher interest rates than traditional finance
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Short repayment terms (1–12 months)
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Inability to sell/refinance property until caveat is cleared
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Default may lead to legal enforcement
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl">Case Study: ATO Debt Clearance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                A Melbourne transport company had an urgent $250,000 ATO debt with 14 days to pay. They owned a depot valued at $1.5m with a $600k mortgage. A caveat loan of $300k was approved and settled in 48 hours. The debt was cleared, and the loan repaid six months later after refinancing with a mainstream lender.
              </p>
            </CardContent>
          </Card>
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
                  },
                  {
                    question: "Are caveat loans for personal use?",
                    answer: "No, they are designed for business purposes only."
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