import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Phone, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  TrendingUp,
  FileText,
  Clock
} from "lucide-react";

const BridgingFinance = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "FinancialProduct",
    "name": "Bridging Finance",
    "description": "Fast short-term property finance that lets you buy before you sell. Bridging loans from 3-12 months across Australia.",
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
        <title>Bridging Loans Australia | Fast Short-Term Property Finance</title>
        <meta name="description" content="Fast bridging loans in Australia. Buy before you sell with flexible short-term property finance from 3-12 months. Quick approval and competitive rates." />
        <meta name="keywords" content="bridging loans australia, bridging finance, bridging loan rates, short-term property finance" />
        <link rel="canonical" href="/services/bridging-finance" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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
            <p className="text-xl text-muted-foreground mb-8">
              Fast short-term property finance that lets you buy before you sell. Bridge the gap with flexible loans from 3-12 months and approval in days.
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
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* Key Benefits */}
          <section className="mb-16">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <TrendingUp className="mr-3 h-6 w-6 text-accent" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Buy before you sell - seize property opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Fast approval - funds in 3-7 days with private lenders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Flexible repayment via sale or refinance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span>Interest-only or capitalized payment options</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* What Is Section with Guide Link */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What Is a Bridging Loan?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  A bridging loan is short-term finance that helps you purchase a new property before selling your existing one. It provides a temporary "bridge" to complete transactions without delay, with terms typically ranging from 3-12 months.
                </p>
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Learn more:</strong> Explore detailed bridging finance strategies, LVR calculations, exit strategies, and closed vs. open bridging structures.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link to="/resources/guides/bridging-finance-australia-complete-property-guide">
                      Read Complete Bridging Finance Guide
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>


          {/* Quick Stats */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">3-12 Months</div>
                    <div className="text-sm text-muted-foreground">Loan Terms</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">70-80% LVR</div>
                    <div className="text-sm text-muted-foreground">Maximum Lending</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">3-7 Days</div>
                    <div className="text-sm text-muted-foreground">Approval Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">No Limit</div>
                    <div className="text-sm text-muted-foreground">Loan Amount</div>
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
                    <AccordionTrigger>How fast can I get a bridging loan?</AccordionTrigger>
                    <AccordionContent>
                      Private lenders can approve and settle in 3-7 business days, while banks typically take 2-4+ weeks.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Do I need monthly repayments?</AccordionTrigger>
                    <AccordionContent>
                      Many bridging loans allow capitalized interest, meaning you don't make monthly repayments - interest is added to the loan balance.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What properties are eligible?</AccordionTrigger>
                    <AccordionContent>
                      Bridging loans are available for residential, investment, and commercial properties across Australia.
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
                  <Link to="/services/commercial-property-development" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Development Finance</h3>
                    <p className="text-sm text-muted-foreground">Property development loans</p>
                  </Link>
                  <Link to="/services/refinancing-solutions" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Refinancing</h3>
                    <p className="text-sm text-muted-foreground">Better loan terms</p>
                  </Link>
                  <Link to="/services/caveat-loans" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Caveat Loans</h3>
                    <p className="text-sm text-muted-foreground">Ultra-fast property finance</p>
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
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Don't Miss Your Property Opportunity</h2>
              <p className="text-muted-foreground mb-6">
                Fast bridging finance for time-sensitive opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">Apply Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:0485952651">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Expert
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BridgingFinance;
