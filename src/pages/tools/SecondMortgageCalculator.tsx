import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Calculator, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";

const SecondMortgageCalculator = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [firstMortgageBalance, setFirstMortgageBalance] = useState("");
  const [secondMortgageAmount, setSecondMortgageAmount] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const calculateResults = () => {
    const property = parseFloat(propertyValue) || 0;
    const firstMortgage = parseFloat(firstMortgageBalance) || 0;
    const secondMortgage = parseFloat(secondMortgageAmount) || 0;
    const rate = parseFloat(monthlyRate) || 0;
    const termMonths = (parseFloat(loanTerm) || 0);

    if (property > 0 && secondMortgage > 0 && rate > 0 && termMonths > 0) {
      const availableEquity = property - firstMortgage;
      const combinedLVR = ((firstMortgage + secondMortgage) / property) * 100;
      const monthlyInterestPayment = (secondMortgage * rate) / 100;
      const totalInterest = monthlyInterestPayment * termMonths;
      const totalRepayment = secondMortgage + totalInterest;
      const establishmentFee = secondMortgage * 0.025; // 2.5% typical

      return {
        availableEquity: availableEquity.toFixed(2),
        combinedLVR: combinedLVR.toFixed(1),
        monthlyInterestPayment: monthlyInterestPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalRepayment: totalRepayment.toFixed(2),
        establishmentFee: establishmentFee.toFixed(2)
      };
    }
    return null;
  };

  const results = calculateResults();

  const faqs = [
    {
      question: "Is second mortgage for business regulated under NCCP in Australia?",
      answer: "For business-purpose loans, NCCP consumer credit rules generally do not apply. We arrange commercial finance only."
    },
    {
      question: "How fast can funding be arranged?",
      answer: "Indicative terms are often achievable in 24-48 hours for straightforward scenarios. Settlement timing depends on security, docs and valuation."
    },
    {
      question: "What security is usually required?",
      answer: "Commonly 2nd mortgage over investment/commercial property. The exact structure is lender- and asset-dependent."
    },
    {
      question: "What documents should I prepare up front?",
      answer: "Photo ID, ABN, BAS/financials, bank statements, rates notice/title, plus asset/contract evidence."
    },
    {
      question: "Can this help with ATO/tax or supplier arrears?",
      answer: "Often yes, provided the exit is clear and security supports the risk."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Second Mortgage Calculator for Business — Mortgage Rates Australia | Emet Capital</title>
        <meta name="description" content="Calculate second mortgage rates, payments, and equity requirements for business use. Professional calculator for Australian commercial second mortgages." />
        <meta name="keywords" content="second mortgage calculator, mortgage rates for second mortgage, commercial lending, business finance" />
        <link rel="canonical" href="/tools/second-mortgage-calculator" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Second Mortgage Calculator" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Second Mortgage Calculator for Business Use
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Calculate mortgage rates, equity requirements, and monthly payments for business second mortgages in Australia.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Tell us your scenario—we'll map lenders and likely structures.
            </p>
          </div>

          {/* Calculator */}
          <Card className="mb-12 bg-gradient-to-r from-accent/5 to-accent-light/5 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Calculator className="w-6 h-6 text-accent mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Calculate Your Second Mortgage</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calculator Inputs */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="propertyValue" className="text-sm font-medium text-foreground">
                      Property Value ($)
                    </Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      placeholder="2000000"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="firstMortgageBalance" className="text-sm font-medium text-foreground">
                      First Mortgage Balance ($)
                    </Label>
                    <Input
                      id="firstMortgageBalance"
                      type="number"
                      placeholder="1200000"
                      value={firstMortgageBalance}
                      onChange={(e) => setFirstMortgageBalance(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="secondMortgageAmount" className="text-sm font-medium text-foreground">
                      Second Mortgage Amount ($)
                    </Label>
                    <Input
                      id="secondMortgageAmount"
                      type="number"
                      placeholder="400000"
                      value={secondMortgageAmount}
                      onChange={(e) => setSecondMortgageAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="monthlyRate" className="text-sm font-medium text-foreground">
                      Monthly Interest Rate (%)
                    </Label>
                    <Input
                      id="monthlyRate"
                      type="number"
                      step="0.1"
                      placeholder="1.5"
                      value={monthlyRate}
                      onChange={(e) => setMonthlyRate(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Typical range: 1.0%-2.2% per month</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="loanTerm" className="text-sm font-medium text-foreground">
                      Loan Term (Months)
                    </Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      placeholder="12"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Typical range: 3-24 months</p>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Calculation Results</h3>
                  {results ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Available Equity:</span>
                        <span className="text-lg font-bold text-primary">${results.availableEquity}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Combined LVR:</span>
                        <span className={`text-lg font-bold ${parseFloat(results.combinedLVR) > 75 ? 'text-destructive' : 'text-foreground'}`}>
                          {results.combinedLVR}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Monthly Payment:</span>
                        <span className="text-lg font-bold text-accent">${results.monthlyInterestPayment}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Establishment Fee:</span>
                        <span className="text-lg font-bold text-foreground">${results.establishmentFee}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Total Interest:</span>
                        <span className="text-lg font-bold text-foreground">${results.totalInterest}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-muted-foreground">Total Repayment:</span>
                        <span className="text-lg font-bold text-foreground">${results.totalRepayment}</span>
                      </div>
                      
                      {parseFloat(results.combinedLVR) > 75 && (
                        <div className="flex items-center p-3 bg-destructive/10 border border-destructive/20 rounded-lg mt-4">
                          <AlertTriangle className="w-5 h-5 text-destructive mr-2" />
                          <p className="text-sm text-destructive">Combined LVR exceeds typical lending limits (≤70%-75%)</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Enter mortgage details to see calculations</p>
                  )}
                  
                  <div className="mt-6">
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                    >
                      <Link to="/contact">Get Professional Assessment</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Second Mortgage for Business: Quick Overview</h2>
            <div className="prose max-w-none text-muted-foreground mb-8">
              <p>Thinking about mortgage rates for second mortgage? Below we cover the practical bits—use-cases, eligibility, typical pricing, timelines—and the way we arrange it with credit teams.</p>
              <p><strong>What is a second mortgage for business?</strong> It's a commercial finance solution used by Australian businesses. We arrange and negotiate terms with lenders, then coordinate credit and settlement.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* When to use it */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">When to Use It (Australian SMEs)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Time-sensitive transactions (deadlines, settlements, supplier payments)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Funding tied to a clear exit (sale, refinance, receivables)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Working capital gaps (seasonality, stock build)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Where property equity can support the facility</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Typical Terms */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Rates, Fees & Typical Terms</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Interest:</span>
                      <span className="text-sm">1.0%-2.2% per month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Term:</span>
                      <span className="text-sm">3-24 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Combined LVR:</span>
                      <span className="text-sm">Typically ≤70%-75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Security:</span>
                      <span className="text-sm">2nd mortgage over property</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fees:</span>
                      <span className="text-sm">2%-4% + legal/valuation</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">These are indicative only and vary by lender, asset quality and exit.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQs */}
          <FAQSection 
            faqs={faqs}
          />

          {/* CTA */}
          <section className="text-center mt-16 py-12 bg-gradient-to-r from-accent to-accent-light rounded-2xl">
            <div className="max-w-2xl mx-auto px-8">
              <h2 className="text-2xl font-bold text-accent-foreground mb-4">
                Ready to Explore Second Mortgage Options?
              </h2>
              <p className="text-accent-foreground/90 mb-6">
                Our calculator provides estimates, but every property and business situation is unique. Connect with our commercial lending specialists for tailored second mortgage solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  <Link to="/contact">
                    Speak with Specialist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
                >
                  <Link to="/resources/guides">Read Our Mortgage Guides</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SecondMortgageCalculator;