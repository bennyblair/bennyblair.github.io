import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Shield, Building, Coins, Phone, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AssetBackedLending = () => {
  const keyTakeaways = [
    "Asset-backed lending uses business assets as security to access competitive rates and higher loan amounts",
    "Acceptable security includes commercial property, equipment, inventory, receivables, and business goodwill",
    "Loans from $250K to $200M+ with flexible terms and potentially lower rates than unsecured facilities",
    "Security valuations determine borrowing capacity - typically 60-80% of asset values depending on type",
    "Multiple assets can be combined to create larger facilities and optimize security arrangements"
  ];

  const faqs = [
    {
      question: "What assets can be used as security for asset-backed lending?",
      answer: "Commercial property, equipment, inventory, receivables, and business goodwill can all secure asset-backed loans."
    },
    {
      question: "How much can I borrow against my business assets?",
      answer: "Typically 60-80% of asset value depending on type, with total facilities from $250K to $200M+."
    },
    {
      question: "What are the advantages of asset-backed lending over unsecured loans?",
      answer: "Lower interest rates, higher borrowing limits, and more flexible terms due to reduced lender risk."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asset Backed Lending Australia | Secured Business Loans | Emet Capital</title>
        <meta 
          name="description" 
          content="Unlock asset value with secured lending against property, equipment & inventory. Asset-backed loans from $250K-$200M+ with competitive rates." 
        />
        <meta name="keywords" content="asset backed lending, secured business loans, equipment finance, inventory funding, commercial property loans" />
        <link rel="canonical" href="https://emetcapital.com.au/services/asset-backed-lending" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Asset-Backed Lending" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Secured Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Asset-Backed Lending Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Unlock the value in your business assets with secured lending solutions. From $250K to $200M+ against property, equipment, inventory, and receivables with competitive rates and flexible terms.
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
                <Link to="/contact">Get Valuation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* What is Asset-Backed Lending */}
          {/* What is Asset-Backed Lending */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is Asset-Backed Lending?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Asset-backed lending uses business assets as security to provide lower-cost financing with higher borrowing 
                  limits than unsecured loans. By leveraging property, equipment, inventory, or receivables, you can access 
                  competitive rates and flexible terms while maintaining operational control.
                </p>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong>Learn more:</strong> Read our comprehensive <Link to="/resources/guides/asset-backed-lending-and-asset-finance" className="text-accent hover:underline">Asset-Backed Lending Guide</Link> for detailed information.
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
                <h2 className="text-2xl font-bold mb-6">Related Financing Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/equipment-finance" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Equipment Finance</h3>
                    <p className="text-sm text-muted-foreground">Machinery & equipment</p>
                  </Link>
                  <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Working Capital</h3>
                    <p className="text-sm text-muted-foreground">Cash flow solutions</p>
                  </Link>
                  <Link to="/services/first-second-mortgages" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Commercial Mortgages</h3>
                    <p className="text-sm text-muted-foreground">Property finance</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Asset Assessment</h3>
                    <p className="text-sm text-muted-foreground">Free valuation</p>
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
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Secured Lending</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Leverage your valuable business assets as security for competitive interest rates and flexible terms.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Multiple Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Use property, equipment, inventory, receivables, or business goodwill as security for your loan facility.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <Coins className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Higher Leverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Access higher loan amounts and better terms by utilizing the full value of your business asset portfolio.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Asset Types */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">Acceptable Security Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tangible Assets</h3>
                    <ul className="space-y-3">
                      {[
                        "Commercial real estate properties",
                        "Manufacturing and production equipment",
                        "Vehicle fleets and specialized transport",
                        "Inventory and stock holdings",
                        "Plant and machinery"
                      ].map((asset, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{asset}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Financial Assets</h3>
                    <ul className="space-y-3">
                      {[
                        "Accounts receivable and invoices",
                        "Contract revenue streams",
                        "Investment portfolios",
                        "Business goodwill and intangibles",
                        "Future cash flows and royalties"
                      ].map((asset, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{asset}</span>
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
                <CardTitle className="text-2xl">Asset-Backed Lending Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Financial Advantages</h3>
                    <ul className="space-y-3">
                      {[
                        "Lower interest rates than unsecured loans",
                        "Higher borrowing limits against asset values",
                        "Flexible repayment terms and structures",
                        "Competitive pricing due to security",
                        "Retain operational control of assets"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Strategic Options</h3>
                    <ul className="space-y-3">
                      {[
                        "Cross-collateralize multiple assets",
                        "Release equity for business growth",
                        "Consolidate existing debt facilities",
                        "Access working capital solutions",
                        "Structure for tax efficiency"
                      ].map((option, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{option}</span>
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
                Unlock Your Asset Value Today
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Your business assets could be the key to accessing significant funding at competitive rates. Let our specialists assess your assets and structure the optimal lending solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                  <Link to="/contact">
                    Asset Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:0485952651">Speak to Expert</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AssetBackedLending;