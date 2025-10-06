import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Globe, Ship, CreditCard, Phone, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TradeFinance = () => {
  const keyTakeaways = [
    "Trade finance facilities from $100K to $25M+ support import/export operations with flexible terms",
    "Letters of credit and bank guarantees secure international transactions and build supplier confidence",
    "Invoice factoring provides immediate cash flow from export receivables without waiting for payment",
    "Pre-shipment and inventory finance helps manage working capital gaps in global supply chains",
    "Foreign exchange hedging protects against currency fluctuations in international transactions"
  ];

  const faqs = [
    {
      question: "What types of trade finance facilities are available for importers?",
      answer: "Letters of credit, inventory funding, pre-shipment finance, documentary collections, and foreign exchange hedging."
    },
    {
      question: "How does export invoice factoring work?",
      answer: "Sell export invoices for 80-90% upfront within 24-48 hours, with factor handling collection and payment protection."
    },
    {
      question: "How quickly can trade finance facilities be established?",
      answer: "Invoice factoring within 5-10 days, letters of credit within 2-4 weeks depending on complexity."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Trade Finance Solutions Australia | Import Export Funding | Emet Capital</title>
        <meta 
          name="description" 
          content="Comprehensive trade finance for Australian importers & exporters. Letters of credit, invoice factoring & working capital from $100K-$25M+. Expert guidance." 
        />
        <meta name="keywords" content="trade finance, import finance, export finance, letters of credit, invoice factoring, international trade" />
        <link rel="canonical" href="https://emetcapital.com.au/services/trade-finance" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Trade Finance" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Import/Export Finance</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Trade Finance Solutions
          </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Comprehensive import/export financing to support your international trade operations. From $100K to $25M+ with flexible terms and global reach.
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
                Call Expert
              </a>
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="premium-card">
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Global Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Support your international business with comprehensive trade finance solutions for imports, exports, and global operations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Ship className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Supply Chain</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Optimize your supply chain cash flow with invoice financing, inventory funding, and purchase order finance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <CreditCard className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Trade Instruments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access letters of credit, bank guarantees, and other trade instruments to secure international transactions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>


        {/* What is Trade Finance */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What is Trade Finance?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Trade finance provides working capital, reduces payment risks, and facilitates international commerce through 
                specialized instruments like letters of credit and invoice factoring. These solutions bridge cash flow gaps in 
                the global trade cycle.
              </p>
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Learn more:</strong> Read our comprehensive <Link to="/resources/guides/trade-finance-in-australia-how-it-helps-businesses-manage-imports" className="text-accent hover:underline">Trade Finance Guide</Link> for detailed information.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Stats */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Trade Finance <span className="gradient-text">at a Glance</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="p-6">
                  <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Facility Size</h3>
                  <p className="text-2xl font-bold text-accent mb-1">$100K - $25M+</p>
                  <p className="text-sm text-muted-foreground">Trade volumes</p>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                    <Ship className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Setup Time</h3>
                  <p className="text-2xl font-bold text-primary mb-1">5-10 Days</p>
                  <p className="text-sm text-muted-foreground">For factoring</p>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Advance Rate</h3>
                  <p className="text-2xl font-bold text-accent mb-1">80-90%</p>
                  <p className="text-sm text-muted-foreground">Of invoice value</p>
                </div>
                <div className="p-6">
                  <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Payment Speed</h3>
                  <p className="text-2xl font-bold text-primary mb-1">24-48 Hours</p>
                  <p className="text-sm text-muted-foreground">Invoice funding</p>
                </div>
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
              <h2 className="text-2xl font-bold mb-6">Related Trade Solutions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Working Capital</h3>
                  <p className="text-sm text-muted-foreground">Cash flow solutions</p>
                </Link>
                <Link to="/services/asset-backed-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Asset-Backed Lending</h3>
                  <p className="text-sm text-muted-foreground">Inventory financing</p>
                </Link>
                <Link to="/services/debt-consolidation" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Debt Consolidation</h3>
                  <p className="text-sm text-muted-foreground">Multi-facility management</p>
                </Link>
                <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2">Trade Assessment</h3>
                  <p className="text-sm text-muted-foreground">Free consultation</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Expand Your Global Reach
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let trade finance complexity limit your international growth. Our specialists understand global trade and can structure solutions that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Discuss Requirements
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:0485952651">Call Specialist</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default TradeFinance;