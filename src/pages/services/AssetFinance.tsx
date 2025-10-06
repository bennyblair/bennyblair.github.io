import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Car, Cog, Building2, Phone, TrendingUp, FileText, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";

const AssetFinance = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Asset Finance" }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "FinancialProduct",
    "name": "Asset Finance",
    "description": "Asset finance in Australia helps businesses purchase vehicles, equipment, and machinery without upfront costs.",
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
        <title>Asset Finance Australia | Fund Vehicles, Machinery & Equipment</title>
        <meta name="description" content="Asset finance in Australia helps businesses purchase vehicles, equipment, and machinery without upfront costs. Get competitive rates from $10,000 to $5 million." />
        <meta name="keywords" content="Asset Finance Australia, asset finance, vehicle finance, equipment loan, business asset loan, machinery finance" />
        <link rel="canonical" href="/services/asset-finance" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Business Growth Finance
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Asset Finance Australia
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Fund vehicles, machinery, and equipment without upfront costs. Access flexible asset finance from $10,000 to $5 million with competitive rates and terms up to 7 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/contact">
                  <FileText className="w-5 h-5 mr-2" />
                  Get Quote
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:0485952651">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-primary" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                  <span>Acquire vehicles, machinery & equipment without upfront costs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                  <span>Preserve working capital for business operations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                  <span>Flexible structures with potential tax benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary mt-0.5 shrink-0" />
                  <span>Terms from 2-7 years aligned with asset lifespan</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* What Is Section with Guide Link */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">What Is Asset Finance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Asset finance allows businesses to access essential equipment while spreading the cost over time. The asset itself serves as security, making finance more accessible with competitive rates and flexible repayment structures.
              </p>
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Learn more:</strong> Discover detailed asset finance strategies, tax implications, and how to choose the right structure for your business.
                </p>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to="/resources/guides/asset-backed-lending-and-asset-finance">
                    Read Complete Asset Finance Guide
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Quick Stats */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">$10K - $5M</div>
                  <div className="text-sm text-muted-foreground">Loan Amount</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2-7 Years</div>
                  <div className="text-sm text-muted-foreground">Loan Terms</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">48-72 Hours</div>
                  <div className="text-sm text-muted-foreground">Approval Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">Up to 100%</div>
                  <div className="text-sm text-muted-foreground">Finance Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Simple FAQ */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can I finance used equipment?</AccordionTrigger>
                  <AccordionContent>
                    Yes, most lenders will finance used equipment subject to valuation and condition assessment.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is a deposit required?</AccordionTrigger>
                  <AccordionContent>
                    Often no deposit is required, though some lenders may ask for 10-20% depending on the asset and your business profile.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What finance structures are available?</AccordionTrigger>
                  <AccordionContent>
                    Common structures include chattel mortgage, hire purchase, finance lease, and operating lease. Each offers different ownership and tax benefits.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Related Services */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Related Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Link to="/services/equipment-finance" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Equipment Finance</h3>
                  <p className="text-sm text-muted-foreground">Specialized equipment funding</p>
                </Link>
                <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Working Capital</h3>
                  <p className="text-sm text-muted-foreground">Business cash flow solutions</p>
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
            <h2 className="text-2xl font-bold mb-4">Ready to Finance Your Business Assets?</h2>
            <p className="text-muted-foreground mb-6">
              Competitive rates and flexible terms for all business equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Get Quote</Link>
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
      </main>
    </>
  );
};

export default AssetFinance;
