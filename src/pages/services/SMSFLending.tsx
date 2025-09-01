import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PiggyBank, TrendingUp, Shield, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SMSFLending = () => {
  const keyTakeaways = [
    "SMSF lending enables property investment through Limited Recourse Borrowing Arrangements (LRBAs)",
    "Minimum $200K fund balance required with established compliance history and professional administration",
    "Property types include residential, commercial, industrial, and vacant land with up to 80% LVR available",
    "Personal guarantees from members typically required with compliant investment strategy documentation",
    "Tax-effective wealth building through super fund property investment with potential CGT exemptions"
  ];

  const faqs = [
    {
      question: "What is a Limited Recourse Borrowing Arrangement (LRBA)?",
      answer: "An LRBA allows your SMSF to borrow money to purchase a single asset (usually property) while limiting the lender's recourse to that specific asset. This structure ensures compliance with super laws while enabling your fund to leverage property investment opportunities."
    },
    {
      question: "What are the eligibility requirements for SMSF lending?",
      answer: "Key requirements include an established SMSF with minimum $200K balance, clean audit history, compliant investment strategy allowing property, professional fund administration, and personal guarantees from members. The fund must demonstrate capacity to service the loan and meet compliance obligations."
    },
    {
      question: "Can my SMSF purchase any type of property?",
      answer: "SMSF can purchase residential investment properties, commercial premises, industrial facilities, and vacant land. The property must be acquired at market value from unrelated parties and cannot be used by fund members or related parties (except for commercial properties leased at market rates)."
    },
    {
      question: "What loan-to-value ratios (LVR) are available for SMSF loans?",
      answer: "SMSF loans typically offer LVR up to 80% for residential properties and 70% for commercial properties. The exact LVR depends on the property type, fund's financial position, and lender's assessment of the investment strategy and compliance history."
    },
    {
      question: "How do interest rates compare for SMSF lending?",
      answer: "SMSF loan rates are typically 0.5-1.5% higher than standard investment property loans due to the specialized nature and compliance requirements. However, the tax benefits within super (15% tax rate, potential CGT exemption in pension phase) often offset higher borrowing costs."
    },
    {
      question: "What are the tax implications of property investment through SMSF?",
      answer: "Income and capital gains within accumulation phase are taxed at 15%. In pension phase, income is tax-free and capital gains may be exempt from CGT. Rental income and expenses flow through to the fund, and depreciation benefits can be claimed on the property improvements."
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
        <meta name="keywords" content="SMSF lending, super fund loans, LRBA, self managed super fund property, SMSF investment property" />
        <link rel="canonical" href="https://emetcapital.com.au/services/smsf-lending" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "SMSF Lending" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Super Fund Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              SMSF Property Lending
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Specialized lending for Self-Managed Super Fund property investments. Build wealth through compliant Limited Recourse Borrowing Arrangements from $150K to $25M+ with competitive rates and expert guidance.
            </p>
            
            {/* Key Takeaways */}
            <Card className="bg-muted/30 mb-8 text-left">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
                <Link to="/contact">Get Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Specialist
                </a>
              </Button>
            </div>
          </div>

          {/* What is SMSF Lending */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is SMSF Property Lending?</h2>
                <div className="prose max-w-none text-muted-foreground mb-6">
                  <p className="text-lg mb-4">
                    SMSF property lending allows Self-Managed Super Funds to borrow money for property investment through 
                    Limited Recourse Borrowing Arrangements (LRBAs). This specialized structure enables your super fund 
                    to leverage property investment while maintaining compliance with strict superannuation regulations.
                  </p>
                  <p className="mb-4">
                    The key advantage lies in the tax-effective environment of superannuation, where income is taxed at 
                    just 15% during accumulation phase and potentially tax-free during pension phase. Combined with potential 
                    capital gains tax exemptions and rental income benefits, SMSF property investment can be a powerful 
                    wealth-building strategy for retirement planning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* Internal Links */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Related Super Fund Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/first-second-mortgages" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Commercial Mortgages</h3>
                    <p className="text-sm text-muted-foreground">Property investment loans</p>
                  </Link>
                  <Link to="/services/asset-backed-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Asset-Backed Lending</h3>
                    <p className="text-sm text-muted-foreground">Property security finance</p>
                  </Link>
                  <Link to="/services/refinancing-solutions" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">SMSF Refinancing</h3>
                    <p className="text-sm text-muted-foreground">Improve loan terms</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">SMSF Strategy</h3>
                    <p className="text-sm text-muted-foreground">Investment planning</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Key Features */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="premium-card">
                <CardHeader className="text-center">
                  <PiggyBank className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Super Fund Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Leverage your super fund to build a diversified property portfolio with tax-effective investment structures.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Compliant Structures</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Ensure full compliance with SIS Act and ATO regulations through proper Limited Recourse Borrowing Arrangements.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Wealth Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Build long-term wealth through property investment within your super fund with potential tax advantages.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SMSF Requirements */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">SMSF Lending Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Eligibility Criteria</h3>
                    <ul className="space-y-3">
                      {[
                        "Established SMSF with minimum $200K balance",
                        "Clean audit history and compliance record",
                        "Investment strategy allowing property",
                        "Professional fund administration",
                        "Personal guarantees from members"
                      ].map((criteria, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Property Types</h3>
                    <ul className="space-y-3">
                      {[
                        "Residential investment properties",
                        "Commercial office and retail",
                        "Industrial and warehouse facilities",
                        "Vacant land for development",
                        "Strata-titled commercial units"
                      ].map((property, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{property}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">SMSF Investment Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tax Advantages</h3>
                    <ul className="space-y-3">
                      {[
                        "15% tax rate on income and gains",
                        "Potential CGT exemption in pension phase",
                        "Tax-free income during pension phase",
                        "Depreciation benefits on improvements",
                        "Concessional contribution deductions"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Investment Benefits</h3>
                    <ul className="space-y-3">
                      {[
                        "Leverage super funds for property",
                        "Diversify retirement savings",
                        "Control investment decisions",
                        "Professional property management",
                        "Long-term wealth accumulation"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
            <div className="max-w-3xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Maximize Your Super Fund Potential
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Don't let your super fund sit idle. Our SMSF lending specialists can help you leverage property investment to build long-term wealth within your fund through compliant, tax-effective structures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                  <Link to="/contact">
                    Start Planning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:0485952651">Call SMSF Expert</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SMSFLending;