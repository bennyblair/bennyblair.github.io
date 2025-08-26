import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Clock, 
  DollarSign, 
  Phone, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  FileText,
  Calculator
} from "lucide-react";

const BridgingFinance = () => {
  const keyTakeaways = [
    "Bridging loans are short-term property loans (usually 3–12 months) that let you buy before you sell or cover a funding gap.",
    "They can be used for residential, investment, or commercial property.",
    "Two main structures: Closed Bridging Loans (sale exchanged) and Open Bridging Loans (no buyer yet).",
    "Repayments are usually interest-only or capitalised until sale/refinance.",
    "Private lenders can approve in days, while banks may take weeks."
  ];

  const benefits = [
    "Fast access to funds (3–7 days with private lenders)",
    "Flexibility in repayment via sale or refinance", 
    "Interest-only or capitalised repayment options",
    "Suitable for both residential and commercial borrowers"
  ];

  const risks = [
    "Higher interest rates than standard home loans",
    "Property market risk if the sale takes longer than expected", 
    "Dual debt exposure: carrying both mortgage and bridging loan until exit",
    "Exit strategy required: lenders will assess how repayment will occur"
  ];

  const eligibilityItems = [
    "Property in Australia offered as security",
    "Maximum LVR usually 70–80%, depending on lender and property type",
    "Identification documents required",
    "Mortgage statements and property valuations",
    "Income and liabilities summary"
  ];

  const applicationSteps = [
    { title: "Initial enquiry", description: "Discuss needs and timeline" },
    { title: "Indicative terms", description: "Lender provides LVR, rates, and fees" },
    { title: "Valuation ordered", description: "Property assessments completed" },
    { title: "Approval and loan docs", description: "Formal offer provided" },
    { title: "Settlement", description: "Funds advanced to borrower" },
    { title: "Exit management", description: "Repayment via property sale or refinance" }
  ];

  const faqs = [
    {
      question: "How long do bridging loans last?",
      answer: "Most bridging loans run for 3–12 months, with private lenders sometimes extending up to 24 months."
    },
    {
      question: "Do I need monthly repayments?",
      answer: "Many bridging loans allow capitalised interest, meaning you don't need to make monthly repayments."
    },
    {
      question: "Are bridging loans only for residential properties?",
      answer: "No. Bridging loans are also available for commercial and investment properties."
    },
    {
      question: "How fast can I get a bridging loan?",
      answer: "Private lenders can settle in 3–7 business days, while banks usually take 2–4+ weeks."
    },
    {
      question: "What is the maximum LVR for bridging loans?",
      answer: "Most lenders cap at 70–80% LVR across the combined security pool."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Bridging Loans Australia | Fast Short-Term Property Finance</title>
        <meta name="description" content="Bridging loans in Australia help you buy before you sell. Learn how bridging finance works, loan terms, costs, eligibility, and how to apply today." />
        <meta name="keywords" content="bridging loans australia, bridging finance, bridging loan rates, open bridging loan, closed bridging loan, short-term property finance" />
        <link rel="canonical" href="/services/bridging-finance" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Bridging Loans Australia | Fast Short-Term Property Finance",
            "description": "Comprehensive guide to bridging loans in Australia, including types, costs, eligibility, and application process.",
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
              "@id": "/services/bridging-finance"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Bridging Loans" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Short-Term Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Bridging Loans Australia
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Fast short-term property finance that lets you buy before you sell. Bridge the gap with flexible bridging loans from 3-12 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
                <Link to="/contact">Apply for a Bridging Loan Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>

          {/* Key Takeaways */}
          <section className="mb-16">
            <Card className="premium-card bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <TrendingUp className="mr-3 h-6 w-6 text-accent" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* What Is a Bridging Loan */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">What Is a Bridging Loan?</h2>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-lg text-muted-foreground mb-6">
                  A bridging loan is a short-term finance product designed to help borrowers purchase a new property or cover urgent funding requirements before selling an existing property or securing long-term finance. It provides a temporary "bridge" to ensure transactions can move forward without delay.
                </p>
                <h3 className="text-xl font-semibold mb-4">How Do Bridging Loans Work?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>The loan is secured against your existing property, and sometimes also against the new purchase</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Funds are advanced to complete the transaction</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Interest accrues during the loan term and is often capitalised (added to the balance)</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Once the existing property sells or refinance is finalised, the loan is repaid in full</span>
                  </li>
                </ul>
              </div>
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-3 h-6 w-6 text-accent" />
                    Example Scenario
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>New property purchase:</span>
                      <span className="font-semibold">$1.2m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current mortgage:</span>
                      <span className="font-semibold">$500k</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bridging loan required:</span>
                      <span className="font-semibold text-accent">$700k</span>
                    </div>
                    <hr className="my-4" />
                    <div className="text-sm text-muted-foreground">
                      <p>Old property sells for $900k → $500k clears mortgage, $400k clears bridging loan, borrower keeps remaining equity.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Types of Bridging Loans */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Types of Bridging Loans</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-accent">
                    <Shield className="mr-3 h-6 w-6" />
                    Closed Bridging Loan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>Suitable when you have exchanged contracts on your sale property</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>Lower risk for lenders → lower interest rates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>Best for homeowners or investors with a committed buyer</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-accent">
                    <Building2 className="mr-3 h-6 w-6" />
                    Open Bridging Loan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>Used when the sale property has not yet secured a buyer</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>Higher lender risk → higher interest rates and tighter LVRs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                      <span>Ideal for developers or investors needing flexibility</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Who Uses Bridging Loans */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Who Uses Bridging Loans?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Homeowners upgrading or downsizing who want to move quickly",
                "Investors seizing time-sensitive opportunities",
                "Property developers acquiring sites ahead of construction finance", 
                "Businesses leveraging commercial property for short-term cash flow"
              ].map((user, index) => (
                <Card key={index} className="premium-card text-center">
                  <CardContent className="pt-6">
                    <p className="text-sm">{user}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits and Risks */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="premium-card border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <CheckCircle className="mr-3 h-6 w-6" />
                    Benefits of Bridging Finance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="premium-card border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <AlertTriangle className="mr-3 h-6 w-6" />
                    Risks and Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {risks.map((risk, index) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Eligibility and Costs */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-3 h-6 w-6 text-accent" />
                    Eligibility and Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibilityItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="mr-3 h-6 w-6 text-accent" />
                    Costs of Bridging Loans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Interest rates:</h4>
                      <p className="text-sm text-muted-foreground">6–12% p.a. depending on lender, LVR, and risk profile</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Fees:</h4>
                      <p className="text-sm text-muted-foreground">Establishment, valuation, legal, and settlement fees</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Repayments:</h4>
                      <p className="text-sm text-muted-foreground">Often structured as capitalised interest, with total balance cleared on exit</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Application Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Application Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applicationSteps.map((step, index) => (
                <Card key={index} className="premium-card">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Card className="premium-card">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
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
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Related Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>
                    <Link to="/services/commercial-property-development" className="text-accent hover:text-accent-dark">
                      Development Finance
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Long-term construction and development funding for your property projects.</p>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>
                    <Link to="/services/working-capital" className="text-accent hover:text-accent-dark">
                      Working Capital
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Flexible business funding to support operations and growth opportunities.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-r from-accent to-accent-light rounded-2xl">
            <div className="max-w-3xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-accent-foreground mb-6">
                Apply for a Bridging Loan Today
              </h2>
              <p className="text-xl text-accent-foreground/90 mb-8">
                Need funds to buy before you sell, or cover a short-term property finance gap? Our specialists can secure the right bridging solution fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-accent">
                  <Link to="/contact">
                    Apply Now for a Bridging Loan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
                  <a href="tel:0485952651">Call Expert</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BridgingFinance;