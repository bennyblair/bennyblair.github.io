import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Briefcase, Shield, Clock, DollarSign, TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const WorkingCapital = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "FinancialProduct",
    "name": "Working Capital Finance",
    "description": "Flexible short-term business funding from $50K-$20M+ with revolving credit facilities and fast approval across Australia.",
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
        <title>Working Capital Finance Solutions Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Access working capital from $50K-$20M+ with flexible credit lines, fast approval, and minimal security for business cash flow needs across Australia." 
        />
        <meta name="keywords" content="working capital, business cash flow, revolving credit, business overdraft, short term finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/working-capital" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Working Capital" }
          ]} />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Cash Flow Solutions</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Working Capital Finance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Flexible short-term business funding to support operations and growth. Access working capital from $50K to $20M+ with revolving credit facilities and fast 24-48 hour approval.
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
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Fast approval typically within 24-48 hours</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Revolving credit lines for ongoing flexibility</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Minimal security required for established businesses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-sm">Flexible repayment aligned with cash flow cycles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* What Is Section with Guide Link */}
          <section className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What is Working Capital Finance?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Working capital finance provides short-term funding to support your business's day-to-day operations, including covering inventory purchases, meeting payroll, managing accounts receivable gaps, and handling seasonal cash flow variations.
                </p>
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Learn more:</strong> Discover detailed working capital strategies, cash flow optimization techniques, seasonal funding solutions, and industry-specific applications.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link to="/resources/guides/working-capital-loans-for-smes">
                      Read Complete Working Capital Guide
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
                    <div className="text-3xl font-bold text-accent mb-2">$50K - $20M+</div>
                    <div className="text-sm text-muted-foreground">Facility Size</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">3-24 Months</div>
                    <div className="text-sm text-muted-foreground">Terms</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">24-48 Hours</div>
                    <div className="text-sm text-muted-foreground">Approval</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">Flexible</div>
                    <div className="text-sm text-muted-foreground">Security</div>
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
                    <AccordionTrigger>How much working capital can my business access?</AccordionTrigger>
                    <AccordionContent>
                      Working capital facilities range from $50K to $20M+ depending on business size, revenue, and trading history. Most lenders offer 1-3 months of turnover as a guide.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How quickly can working capital be approved?</AccordionTrigger>
                    <AccordionContent>
                      Applications can be approved within 24-48 hours for established businesses with complete documentation. Simple facilities can be funded within 2-3 business days.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>What security is required?</AccordionTrigger>
                    <AccordionContent>
                      Many facilities require minimal security, often secured by business assets like inventory or equipment. Established businesses may access unsecured facilities based on trading history.
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
                  <Link to="/services/trade-finance" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Trade Finance</h3>
                    <p className="text-sm text-muted-foreground">Import/export funding</p>
                  </Link>
                  <Link to="/services/equipment-finance" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Equipment Finance</h3>
                    <p className="text-sm text-muted-foreground">Asset funding solutions</p>
                  </Link>
                  <Link to="/services/debt-consolidation" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Debt Consolidation</h3>
                    <p className="text-sm text-muted-foreground">Simplify business debts</p>
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
              <h2 className="text-2xl font-bold mb-4">Ready to Improve Your Cash Flow?</h2>
              <p className="text-muted-foreground mb-6">
                Flexible working capital solutions aligned with your business cycle.
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

export default WorkingCapital;
