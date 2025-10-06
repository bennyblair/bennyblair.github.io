import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Target, TrendingDown, RefreshCw, Phone, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const DebtConsolidation = () => {
  const keyTakeaways = [
    "Debt consolidation combines multiple business debts into a single loan with simplified management",
    "Potential cost savings through lower interest rates and reduced fees across consolidated facilities",
    "Improved cash flow management with single monthly payments and optimized repayment terms",
    "Consolidate various debt types including business loans, credit cards, overdrafts, and equipment finance",
    "Strategic restructuring can reduce total monthly payments and improve working capital position"
  ];

  const faqs = [
    {
      question: "What types of business debts can be consolidated?",
      answer: "Most business debts can be consolidated including business loans, credit cards, overdrafts, equipment finance, trade creditor arrangements, and property loans. The key is ensuring the new facility offers better overall terms than the combined existing debts."
    },
    {
      question: "How much can I save through business debt consolidation?",
      answer: "Savings vary but typically include reduced interest rates (potentially 1-5% per annum), eliminated duplicate fees, and improved cash flow through extended terms. On $500K of consolidated debt, a 2% rate reduction saves $10,000 annually plus fee savings."
    },
    {
      question: "What are the requirements for debt consolidation loans?",
      answer: "Requirements include stable business cash flow, acceptable credit history, adequate security (property, equipment, or other assets), and demonstration that consolidation improves the business's financial position. Lenders assess total debt levels and repayment capacity."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Debt Consolidation Australia | Simplify Business Loans | Emet Capital</title>
        <meta 
          name="description" 
          content="Simplify multiple business debts into one manageable loan. Business debt consolidation from $100K-$50M+ with improved terms & cash flow." 
        />
        <meta name="keywords" content="business debt consolidation, commercial debt consolidation, business loan consolidation, debt restructuring" />
        <link rel="canonical" href="https://emetcapital.com.au/services/debt-consolidation" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Debt Consolidation" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Debt Restructure</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Business Debt Consolidation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Simplify your business finances by consolidating multiple debts into a single, manageable facility. Reduce costs, improve cash flow, and streamline payments from $100K to $50M+ with expert guidance.
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

          {/* What is Debt Consolidation */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is Business Debt Consolidation?</h2>
                <div className="prose max-w-none text-muted-foreground mb-6">
                  <p className="text-lg">
                    Business debt consolidation involves combining multiple existing debts into a single new loan facility, typically with better interest rates, terms, and simplified management. This strategic financial restructuring can reduce total borrowing costs, improve cash flow, and eliminate the complexity of managing multiple loan payments and lender relationships.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Learn more:</strong> For detailed information on debt consolidation strategies, cost analysis, and restructuring options, see our <Link to="/resources/guides/business-debt-consolidation-australia" className="text-primary hover:underline">comprehensive Debt Consolidation guide</Link>.
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
                <h2 className="text-2xl font-bold mb-6">Related Debt Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link to="/services/refinancing-solutions" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Loan Refinancing</h3>
                    <p className="text-sm text-muted-foreground">Improve existing terms</p>
                  </Link>
                  <Link to="/services/working-capital" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Working Capital</h3>
                    <p className="text-sm text-muted-foreground">Cash flow solutions</p>
                  </Link>
                  <Link to="/services/asset-backed-lending" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Asset-Backed Lending</h3>
                    <p className="text-sm text-muted-foreground">Secured debt solutions</p>
                  </Link>
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Debt Analysis</h3>
                    <p className="text-sm text-muted-foreground">Free assessment</p>
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
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Simplified Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Replace multiple loan payments with a single monthly facility, reducing administrative burden and complexity.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <TrendingDown className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Reduced Costs</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Potentially lower your overall borrowing costs through better rates and reduced fees across your debt portfolio.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader className="text-center">
                  <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Improved Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Optimize repayment terms and structures to improve monthly cash flow and working capital management.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">$100K+</div>
                  <p className="text-sm text-muted-foreground">Minimum Amount</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">1-5%</div>
                  <p className="text-sm text-muted-foreground">Rate Savings</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">3-6wks</div>
                  <p className="text-sm text-muted-foreground">Typical Timeline</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">Single</div>
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
            <div className="max-w-3xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-primary-foreground mb-6">
                Simplify Your Business Finances
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Stop juggling multiple debt payments and start focusing on growing your business. Our debt consolidation experts can analyze your current obligations and structure a solution that saves money and improves cash flow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                  <Link to="/contact">
                    Free Assessment
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

export default DebtConsolidation;