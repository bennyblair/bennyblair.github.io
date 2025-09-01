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
      answer: "Import finance options include letters of credit, documentary collections, inventory funding, pre-shipment finance, and foreign exchange hedging. These facilities help manage cash flow gaps between ordering goods and receiving payment from customers, while providing security for overseas suppliers."
    },
    {
      question: "How does export invoice factoring work for Australian businesses?",
      answer: "Export factoring involves selling your export invoices to a financier for immediate cash flow, typically 80-90% of invoice value within 24-48 hours. The factor handles collection from overseas buyers and provides protection against non-payment, while you retain customer relationships."
    },
    {
      question: "What documentation is required for trade finance applications?",
      answer: "Trade finance applications require business financials, trade history, customer/supplier details, purchase orders or sales contracts, shipping documents, and details of the goods being traded. Bank statements, credit checks on trading partners, and insurance documentation may also be required."
    },
    {
      question: "Can trade finance help with foreign exchange risk management?",
      answer: "Yes, trade finance facilities often include foreign exchange hedging options such as forward contracts, options, and currency swaps. These tools help protect against adverse currency movements and provide certainty over future cash flows in foreign currency transactions."
    },
    {
      question: "What are the costs and fees associated with trade finance?",
      answer: "Trade finance costs vary by facility type and include interest rates (typically 8-18% for short-term facilities), establishment fees, letter of credit issuance fees, and foreign exchange margins. Factoring typically charges 2-5% of invoice value plus interest on advances."
    },
    {
      question: "How quickly can trade finance facilities be established?",
      answer: "Simple facilities like invoice factoring can be established within 5-10 business days. More complex arrangements like letters of credit may take 2-4 weeks depending on documentation requirements and credit approvals. Existing banking relationships can expedite the process."
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

        {/* Trade Services */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Trade Finance Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Import Finance</h3>
                  <ul className="space-y-3">
                    {[
                      "Import letters of credit",
                      "Inventory and stock funding",
                      "Pre-shipment finance",
                      "Documentary collections",
                      "Foreign exchange hedging"
                    ].map((service, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Export Finance</h3>
                  <ul className="space-y-3">
                    {[
                      "Export invoice factoring",
                      "Pre-export finance",
                      "Export credit insurance",
                      "Performance guarantees",
                      "Multi-currency facilities"
                    ].map((service, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What is Trade Finance */}
        <section className="mb-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">What is Trade Finance?</h2>
              <div className="prose max-w-none text-muted-foreground mb-6">
                <p className="text-lg mb-4">
                  Trade finance encompasses various financial instruments and facilities that support international trade by providing 
                  working capital, reducing payment risks, and facilitating the movement of goods between countries. These specialized 
                  financing solutions help businesses manage the complex cash flow and risk challenges of global commerce.
                </p>
                <p className="mb-4">
                  From letters of credit that secure payments between trading partners to invoice factoring that provides immediate 
                  cash flow from export sales, trade finance bridges the gap between sending goods and receiving payment. Our 
                  solutions support the entire trade cycle, from pre-shipment finance to post-delivery collections.
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