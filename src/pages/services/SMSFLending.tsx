import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PiggyBank, TrendingUp, Shield, Phone, CheckCircle, ArrowRight, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SMSFLending = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "FinancialProduct",
    "name": "SMSF Property Lending",
    "description": "Specialized SMSF property lending with Limited Recourse Borrowing Arrangements. Super fund loans from $150K-$25M+ with compliant structures.",
    "provider": {
      "@type": "FinancialService",
      "name": "Emet Capital"
    },
    "areaServed": "AU",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AUD"
    }
  };

  return (
    <>
      <Helmet>
        <title>SMSF Property Lending Australia | Super Fund Loans | Emet Capital</title>
        <meta 
          name="description" 
          content="Specialized SMSF property lending with Limited Recourse Borrowing Arrangements. Super fund loans from $150K-$25M+ with compliant structures and competitive rates." 
        />
        <meta name="keywords" content="SMSF lending, super fund loans, LRBA, self managed super fund property, SMSF investment property" />
        <link rel="canonical" href="https://emetcapital.com.au/services/smsf-lending" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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
            <p className="text-xl text-muted-foreground mb-8">
              Build wealth through tax-effective property investment in your Self-Managed Super Fund. Compliant Limited Recourse Borrowing Arrangements from $150K to $25M+ with competitive rates and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

          {/* Key Benefits */}
          <section className="mb-16">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Tax-effective property investment at 15% rate in accumulation phase</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Potential CGT exemption during pension phase</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Leverage super funds for property investment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">LVR up to 80% on residential and commercial property</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* What Is Section with Guide Link */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What is SMSF Property Lending?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  SMSF property lending allows Self-Managed Super Funds to borrow money for property investment through Limited Recourse Borrowing Arrangements (LRBAs). This specialized structure enables your super fund to leverage property investment while maintaining compliance with strict superannuation regulations.
                </p>
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Learn more:</strong> Discover detailed SMSF lending strategies, LRBA structures, compliance requirements, tax implications, and property selection criteria.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link to="/resources/guides/smsf-loans-for-commercial-property">
                      Read Complete SMSF Lending Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Key Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SMSF Lending Solutions</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="text-center">
                  <PiggyBank className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Super Fund Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Leverage your super fund to build a diversified property portfolio with tax-effective structures.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Compliant Structures</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Ensure full compliance with SIS Act and ATO regulations through proper LRBAs.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Wealth Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Build long-term wealth through property investment with potential tax advantages.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">$150K - $25M+</div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">Up to 80%</div>
                    <div className="text-sm text-muted-foreground">LVR Available</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">$200K Min</div>
                    <div className="text-sm text-muted-foreground">Fund Balance</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">15% Tax</div>
                    <div className="text-sm text-muted-foreground">Accumulation Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Simple FAQ */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is an LRBA?</AccordionTrigger>
                    <AccordionContent>
                      A Limited Recourse Borrowing Arrangement allows your SMSF to borrow money to purchase property while limiting the lender's recourse to that specific asset, ensuring compliance with super laws.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What properties can my SMSF purchase?</AccordionTrigger>
                    <AccordionContent>
                      SMSF can purchase residential investment properties, commercial premises, industrial facilities, and vacant land. The property must be acquired at market value from unrelated parties.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What are the tax benefits?</AccordionTrigger>
                    <AccordionContent>
                      Income and capital gains are taxed at 15% during accumulation phase. In pension phase, income is tax-free and capital gains may be exempt from CGT.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* Related Services */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Related Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Link to="/services/first-second-mortgages" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Commercial Mortgages</h3>
                    <p className="text-sm text-muted-foreground">Property investment loans</p>
                  </Link>
                  <Link to="/services/asset-backed-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Asset-Backed Lending</h3>
                    <p className="text-sm text-muted-foreground">Property security finance</p>
                  </Link>
                  <Link to="/services/refinancing-solutions" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Refinancing</h3>
                    <p className="text-sm text-muted-foreground">Improve loan terms</p>
                  </Link>
                  <Link to="/services" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">All Services</h3>
                    <p className="text-sm text-muted-foreground">View complete range</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 bg-gradient-to-r from-primary to-primary/80 rounded-2xl">
            <div className="max-w-3xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Maximize Your Super Fund Potential
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Build long-term wealth through property investment within your super fund. Our SMSF specialists provide compliant, tax-effective structures tailored to your retirement goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary">
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
