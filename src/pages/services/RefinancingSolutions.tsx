import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { RefreshCw, TrendingDown, Calculator, Phone, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const RefinancingSolutions = () => {
  const keyTakeaways = [
    "Refinancing can reduce interest costs by 1-3% annually through better rates and improved terms",
    "Consolidate multiple facilities into a single loan to simplify management and reduce fees",
    "Access additional equity for business expansion without selling existing property assets",
    "Switch loan structures from principal & interest to interest-only to improve cash flow",
    "Remove personal guarantees or reduce security requirements through strategic refinancing"
  ];

  const faqs = [
    {
      question: "When should I consider refinancing my commercial property loans?",
      answer: "Consider refinancing when interest rates have dropped, your business financial position has improved, you need additional funding, or want to consolidate multiple loans. Also consider refinancing if loan terms are restrictive, you want to remove guarantees, or access equity for business growth opportunities."
    },
    {
      question: "How much can I save through commercial loan refinancing?",
      answer: "Savings vary but typically range from 1-3% per annum in interest rate reductions, plus potential fee savings from consolidation. On a $1M loan, a 2% rate reduction saves $20,000 annually. Additional savings come from improved terms, reduced fees, and better cash flow management."
    },
    {
      question: "What costs are involved in refinancing commercial loans?",
      answer: "Refinancing costs include application fees, valuation fees, legal costs, and potential break costs on existing loans. These typically range from $5,000-$15,000 but are often offset by interest savings within 6-12 months. Some lenders may contribute to costs for quality applications."
    },
    {
      question: "How long does the commercial refinancing process take?",
      answer: "Commercial refinancing typically takes 4-8 weeks from application to settlement. This includes credit assessment, property valuation, legal documentation, and settlement coordination. Existing client relationships and complete documentation can expedite the process."
    },
    {
      question: "Can I access additional funds when refinancing?",
      answer: "Yes, refinancing often provides access to additional funds through increased borrowing capacity or accessing property equity growth. You can typically borrow up to 80% of current property values, potentially releasing significant capital for business expansion or debt consolidation."
    },
    {
      question: "What documentation is required for refinancing applications?",
      answer: "Required documents include current loan statements, financial statements (2-3 years), tax returns, property valuations, rent rolls for investment properties, and details of proposed use for additional funds. Lenders also require current business trading information and projected cash flows."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commercial Loan Refinancing Solutions Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Reduce borrowing costs with commercial loan refinancing. Access better rates, terms & additional funds from $250K-$100M+ across Australia." 
        />
        <meta name="keywords" content="commercial loan refinancing, business loan refinancing, commercial mortgage refinancing, debt restructuring" />
        <link rel="canonical" href="https://emetcapital.com.au/services/refinancing-solutions" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Refinancing Solutions" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Cost Reduction</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Commercial Refinancing Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Reduce your borrowing costs and improve cash flow with strategic commercial property refinancing. 
              Access better rates, terms, and additional funding from $250K to $100M+ with expert guidance.
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
                <Link to="/contact">Get Assessment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* What is Refinancing */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is Commercial Loan Refinancing?</h2>
                <div className="prose max-w-none text-muted-foreground mb-6">
                  <p className="text-lg mb-4">
                    Commercial loan refinancing involves replacing existing business or property loans with new financing that offers 
                    better terms, rates, or features. This strategic financial move can significantly reduce borrowing costs, improve 
                    cash flow, and provide access to additional capital for business growth.
                  </p>
                  <p className="mb-4">
                    Refinancing opportunities arise when market conditions improve, your business strengthens, or property values increase. 
                    The process involves comprehensive analysis of current loans, market comparison, and strategic restructuring to 
                    optimize your financing arrangements for maximum benefit.
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
                <h2 className="text-2xl font-bold mb-6">Related Financial Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/debt-consolidation" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Debt Consolidation</h3>
                    <p className="text-sm text-muted-foreground">Simplify multiple debts</p>
                  </Link>
                  <Link to="/services/first-second-mortgages" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Commercial Mortgages</h3>
                    <p className="text-sm text-muted-foreground">Property financing solutions</p>
                  </Link>
                  <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Working Capital</h3>
                    <p className="text-sm text-muted-foreground">Business operational funding</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Free Assessment</h3>
                    <p className="text-sm text-muted-foreground">Analyze your loans</p>
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
                <TrendingDown className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Rate Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access better interest rates and terms by leveraging current market conditions and improved property values.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <RefreshCw className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Debt Restructure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Consolidate multiple loans into a single facility with improved terms and simplified management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <Calculator className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Cash Release</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Release equity from your commercial property for business expansion or investment opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Refinancing Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Advantages</h3>
                  <ul className="space-y-3">
                    {[
                      "Reduced interest rates and fees",
                      "Improved monthly cash flow",
                      "Access to additional funding",
                      "Tax-efficient debt structuring",
                      "Better loan terms and conditions"
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
                      "Consolidate multiple properties",
                      "Switch from P&I to interest-only",
                      "Access equity for expansion",
                      "Improve loan flexibility",
                      "Remove guarantors or security"
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
              Ready to Reduce Your Borrowing Costs?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Our refinancing specialists will assess your current loans and identify opportunities to save money and improve terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Start Assessment
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

export default RefinancingSolutions;