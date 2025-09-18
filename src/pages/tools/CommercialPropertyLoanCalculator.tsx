import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Calculator, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";

const CommercialPropertyLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const calculateResults = () => {
    const principal = parseFloat(loanAmount) || 0;
    const price = parseFloat(purchasePrice) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const payments = (parseFloat(loanTerm) || 0) * 12;

    if (principal > 0 && rate > 0 && payments > 0) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
      const totalPayment = monthlyPayment * payments;
      const totalInterest = totalPayment - principal;
      const deposit = price - principal;
      const lvr = price > 0 ? (principal / price) * 100 : 0;

      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        deposit: deposit.toFixed(2),
        lvr: lvr.toFixed(1)
      };
    }
    return null;
  };

  const results = calculateResults();

  const faqs = [
    {
      question: "Is commercial property loan repayment calculator regulated under NCCP in Australia?",
      answer: "For business-purpose loans, NCCP consumer credit rules generally do not apply. We arrange commercial finance only."
    },
    {
      question: "How fast can funding be arranged?",
      answer: "Indicative terms are often achievable in 24-48 hours for straightforward scenarios. Settlement timing depends on security, docs and valuation."
    },
    {
      question: "What security is usually required?",
      answer: "Commonly 1st mortgage over commercial/industrial/retail property. The exact structure is lender- and asset-dependent."
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
        <title>Commercial Property Loan Calculator — Commercial Property Lending Australia | Emet Capital</title>
        <meta name="description" content="Calculate commercial property loan payments, deposits, and LVR with our professional calculator. Get instant estimates for Australian commercial property finance." />
        <meta name="keywords" content="commercial property loan calculator, commercial lending, business finance, Australia" />
        <link rel="canonical" href="/tools/commercial-property-loan-calculator" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Commercial Property Loan Calculator" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial Property Loan Calculator
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Calculate loan payments, deposits, and loan-to-value ratios for commercial property purchases in Australia.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Speak with a broker about your options (no consumer credit).
            </p>
          </div>

          {/* Calculator */}
          <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Calculator className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Calculate Your Commercial Property Loan</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calculator Inputs */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="purchasePrice" className="text-sm font-medium text-foreground">
                      Property Purchase Price ($)
                    </Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      placeholder="1500000"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loanAmount" className="text-sm font-medium text-foreground">
                      Loan Amount ($)
                    </Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="1000000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interestRate" className="text-sm font-medium text-foreground">
                      Annual Interest Rate (%)
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="7.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loanTerm" className="text-sm font-medium text-foreground">
                      Loan Term (Years)
                    </Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      step="0.5"
                      placeholder="25"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Calculation Results</h3>
                  {results ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Monthly Payment:</span>
                        <span className="text-lg font-bold text-primary">${results.monthlyPayment}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Required Deposit:</span>
                        <span className="text-lg font-bold text-foreground">${results.deposit}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Loan-to-Value Ratio:</span>
                        <span className="text-lg font-bold text-foreground">{results.lvr}%</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-muted-foreground">Total Interest:</span>
                        <span className="text-lg font-bold text-foreground">${results.totalInterest}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-muted-foreground">Total Repayment:</span>
                        <span className="text-lg font-bold text-foreground">${results.totalPayment}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Enter property details to see calculations</p>
                  )}
                  
                  <div className="mt-6">
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground"
                    >
                      <Link to="/contact">Get Professional Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Commercial Property Loan Calculator: Quick Overview</h2>
            <div className="prose max-w-none text-muted-foreground mb-8">
              <p>If you're weighing up commercial property loans for your business, this calculator helps you estimate payments, deposits, and loan structures in Australia.</p>
              <p><strong>What is a commercial property loan calculator?</strong> It's a planning tool for Australian businesses considering commercial property purchases. We arrange and negotiate terms with lenders, then coordinate credit and settlement.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* When to use it */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">When to Use It (Australian SMEs)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Time-sensitive transactions (deadlines, settlements)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Commercial property purchases for business use</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Investment property acquisitions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Warehouse, office, or retail property financing</span>
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
                      <span className="text-sm">Bank 6%-9% p.a. typical range</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Term:</span>
                      <span className="text-sm">1-5 years (IO or P&I)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">LVR:</span>
                      <span className="text-sm">Up to ~65%-75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Security:</span>
                      <span className="text-sm">1st mortgage over property</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Fees:</span>
                      <span className="text-sm">0.5%-2% + legal/valuation</span>
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
          <section className="text-center mt-16 py-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
            <div className="max-w-2xl mx-auto px-8">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                Ready to Secure Your Commercial Property Loan?
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Our calculators provide estimates, but every property and business situation is unique. Connect with our commercial lending specialists for tailored solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-accent hover:bg-accent-dark text-accent-foreground"
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
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link to="/resources/guides">Read Our Property Guides</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CommercialPropertyLoanCalculator;