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
    },
    {
      question: "How long does the debt consolidation process take?",
      answer: "Business debt consolidation typically takes 3-6 weeks from application to settlement. This includes credit assessment, asset valuation, legal documentation, and coordination with existing lenders for payout. Complex consolidations with multiple lenders may take longer."
    },
    {
      question: "Can I access additional funds when consolidating debt?",
      answer: "Yes, debt consolidation often provides access to additional working capital by leveraging improved security positions or business performance. You can typically access 10-30% additional funds above debt payouts, depending on security and cash flow capacity."
    },
    {
      question: "What security is required for debt consolidation loans?",
      answer: "Security requirements depend on the loan amount and risk profile. Options include commercial property, business assets, equipment, or personal guarantees. Secured consolidation loans typically offer better rates than unsecured facilities due to reduced lender risk."
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
                  <p className="text-lg mb-4">
                    Business debt consolidation involves combining multiple existing debts into a single new loan facility, 
                    typically with better interest rates, terms, and simplified management. This strategic financial restructuring 
                    can reduce total borrowing costs, improve cash flow, and eliminate the complexity of managing multiple 
                    loan payments and lender relationships.
                  </p>
                  <p className="mb-4">
                    The process involves comprehensive analysis of existing debt obligations, negotiation with current lenders, 
                    and structuring a new facility that pays out multiple debts while providing better overall terms. 
                    Consolidation can also provide access to additional working capital for business growth while simplifying 
                    financial management through a single monthly payment.
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

          {/* Consolidation Benefits */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">Debt Consolidation Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Financial Advantages</h3>
                    <ul className="space-y-3">
                      {[
                        "Single monthly payment simplicity",
                        "Potentially lower interest rates",
                        "Reduced total monthly payments",
                        "Improved cash flow management",
                        "Lower administrative costs"
                      ].map((advantage, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Debt Types We Consolidate</h3>
                    <ul className="space-y-3">
                      {[
                        "Multiple business loans",
                        "Credit cards and overdrafts",
                        "Equipment finance facilities",
                        "Trade creditor arrangements",
                        "Property and asset loans"
                      ].map((debtType, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{debtType}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Process */}
          <section className="mb-16">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle className="text-2xl">Consolidation Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Assessment Phase</h3>
                    <ul className="space-y-3">
                      {[
                        "Comprehensive debt analysis and review",
                        "Cash flow and repayment capacity assessment",
                        "Security valuation and lending capacity",
                        "Cost-benefit analysis of consolidation",
                        "Structure recommendations and options"
                      ].map((step, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Implementation Phase</h3>
                    <ul className="space-y-3">
                      {[
                        "New facility application and approval",
                        "Legal documentation and security preparation",
                        "Coordination with existing lenders",
                        "Settlement and debt payout execution",
                        "Ongoing relationship management"
                      ].map((step, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                          <span>{step}</span>
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