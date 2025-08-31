import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, Phone, ArrowRight, Briefcase, Shield, Clock, DollarSign, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const WorkingCapital = () => {
  const keyTakeaways = [
    "Working capital facilities from $50K to $20M+ provide flexible business operational funding",
    "Revolving credit lines allow drawdown and repayment as needed without reapplication",
    "Short-term funding (3-24 months) designed to bridge cash flow gaps and seasonal variations",
    "No fixed asset security required for established businesses with strong trading history",
    "Fast approval process typically 24-48 hours with minimal documentation requirements"
  ];

  const faqs = [
    {
      question: "What is working capital and why do businesses need it?",
      answer: "Working capital is the funding required for day-to-day business operations, covering inventory, accounts receivable, and operating expenses. Businesses need working capital to maintain smooth operations during seasonal fluctuations, growth phases, or when customers pay slowly. It ensures you can meet obligations while waiting for revenue to materialize."
    },
    {
      question: "How much working capital can my business access?",
      answer: "Working capital facilities range from $50,000 to $20M+ depending on business size, revenue, and trading history. Most lenders offer 1-3 months of turnover as a guide, though established businesses with strong cash flow can access higher multiples. The facility size is determined by your ability to service the debt and repay from trading cash flow."
    },
    {
      question: "What are the different types of working capital facilities?",
      answer: "Common working capital solutions include business overdrafts, revolving credit facilities, invoice finance, trade finance, equipment rental finance, and seasonal funding lines. Each serves different purposes, from general cash flow support to specific financing needs like inventory purchases or contract fulfillment."
    },
    {
      question: "How quickly can working capital be approved and funded?",
      answer: "Working capital applications can be approved within 24-48 hours for established businesses with complete documentation. Simple facilities like overdrafts can be funded within 2-3 business days, while more complex facilities may take 5-7 days. The speed depends on documentation quality and business complexity."
    },
    {
      question: "What security is required for working capital facilities?",
      answer: "Many working capital facilities require minimal security, often secured by business assets like inventory, equipment, or accounts receivable. Established businesses may access unsecured facilities based on trading history and cash flow. Personal guarantees are common but not always required for companies with strong balance sheets."
    },
    {
      question: "How are working capital facilities repaid?",
      answer: "Working capital is repaid from business cash flow, typically through flexible arrangements that align with your trading cycle. Revolving facilities allow ongoing access as you repay, while term facilities have set repayment schedules. Many facilities offer seasonal variations to match business trading patterns."
    }
  ];

  const benefits = [
    "Fast access to funds",
    "Flexible repayment terms",
    "No fixed asset security required",
    "Revolving credit facilities",
    "Seasonal funding options",
    "Competitive interest rates"
  ];

  const features = [
    "Business lines of credit",
    "Overdraft facilities",
    "Invoice finance solutions",
    "Trade finance facilities",
    "Equipment rental finance",
    "Seasonal business funding"
  ];

  return (
    <>
      <Helmet>
        <title>Working Capital Finance Solutions Australia | Emet Capital</title>
        <meta 
          name="description" 
          content="Access working capital from $50K-$20M+. Flexible credit lines, fast approval, minimal security for business cash flow needs across Australia." 
        />
        <meta name="keywords" content="working capital, business cash flow, revolving credit, business overdraft, short term finance" />
        <link rel="canonical" href="https://emetcapital.com.au/services/working-capital" />
      </Helmet>
      
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Working Capital" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">Cash Flow Solutions</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Working Capital Finance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Flexible short-term business funding to support operations and growth. 
              Access working capital from $50K to $20M+ with revolving credit facilities and fast approval.
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

          {/* What is Working Capital */}
          <section className="mb-16">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">What is Working Capital Finance?</h2>
                <div className="prose max-w-none text-muted-foreground mb-6">
                  <p className="text-lg mb-4">
                    Working capital finance provides short-term funding to support your business's day-to-day operations. 
                    This includes covering inventory purchases, meeting payroll, managing accounts receivable gaps, and handling 
                    seasonal cash flow variations that are natural in business operations.
                  </p>
                  <p className="mb-4">
                    Unlike long-term business loans, working capital facilities are designed for flexibility and speed. 
                    They provide immediate access to funds when opportunities arise or cash flow gaps occur, helping maintain 
                    business momentum without missing crucial opportunities or falling behind on obligations.
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
                <h2 className="text-2xl font-bold mb-6">Related Business Finance Solutions</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <Link to="/contact" className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold mb-2">Cash Flow Assessment</h3>
                    <p className="text-sm text-muted-foreground">Analyze your needs</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

        {/* Key Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="premium-card">
            <CardHeader>
              <div className="p-4 bg-accent/10 rounded-xl w-fit mb-4">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Funding Solutions</CardTitle>
              <CardDescription>
                Comprehensive working capital options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <div className="p-4 bg-primary/10 rounded-xl w-fit mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Key Benefits</CardTitle>
              <CardDescription>
                Why choose our working capital solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Loan Details */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Facility <span className="gradient-text">Details</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Flexible terms designed for business cash flow needs
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Facility Size</h3>
                <p className="text-2xl font-bold text-accent mb-1">$50K - $20M+</p>
                <p className="text-sm text-muted-foreground">Scalable facilities</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Terms</h3>
                <p className="text-2xl font-bold text-primary mb-1">3-24 Months</p>
                <p className="text-sm text-muted-foreground">Short-term funding</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-accent/10 rounded-xl w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Security</h3>
                <p className="text-2xl font-bold text-accent mb-1">Flexible</p>
                <p className="text-sm text-muted-foreground">Business assets</p>
              </div>
              <div className="p-6">
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Approval</h3>
                <p className="text-2xl font-bold text-primary mb-1">24-48 Hours</p>
                <p className="text-sm text-muted-foreground">Fast decisions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Ready to Improve Your Cash Flow?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Don't let cash flow constraints limit your business growth. Our working capital specialists will structure 
              flexible facilities that align with your trading cycle and business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <Link to="/contact">
                  Start Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href="tel:0485952651">Call Cash Flow Expert</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default WorkingCapital;