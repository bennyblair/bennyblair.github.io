import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Calculator, CheckCircle, ArrowRight, TrendingUp, DollarSign } from "lucide-react";

const CommercialRealEstateCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [annualRent, setAnnualRent] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");

  const calculateResults = () => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const termMonths = (parseFloat(loanTerm) || 0) * 12;
    const rent = parseFloat(annualRent) || 0;
    const expenses = parseFloat(operatingExpenses) || 0;

    if (price > 0 && down > 0 && rate > 0 && termMonths > 0) {
      const loanAmount = price - down;
      const lvr = (loanAmount / price) * 100;
      const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
      const monthlyRent = rent / 12;
      const monthlyExpenses = expenses / 12;
      const netOperatingIncome = rent - expenses;
      const cashFlow = monthlyRent - monthlyExpenses - monthlyPayment;
      const capRate = price > 0 ? (netOperatingIncome / price) * 100 : 0;
      const cashOnCashReturn = down > 0 && rent > 0 ? ((cashFlow * 12) / down) * 100 : 0;

      return {
        loanAmount: loanAmount.toFixed(2),
        lvr: lvr.toFixed(1),
        monthlyPayment: monthlyPayment.toFixed(2),
        monthlyRent: monthlyRent.toFixed(2),
        monthlyExpenses: monthlyExpenses.toFixed(2),
        cashFlow: cashFlow.toFixed(2),
        netOperatingIncome: netOperatingIncome.toFixed(2),
        capRate: capRate.toFixed(2),
        cashOnCashReturn: cashOnCashReturn.toFixed(2)
      };
    }
    return null;
  };

  const results = calculateResults();

  const faqs = [
    {
      question: "Is commercial real estate loans calculator regulated under NCCP in Australia?",
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
        <title>Commercial Real Estate Loans Calculator — Investment Property Finance Australia | Emet Capital</title>
        <meta name="description" content="Calculate commercial real estate loan payments, ROI, and cash flow for Australian investment properties. Professional calculator for commercial property finance." />
        <meta name="keywords" content="commercial real estate loans calculator, commercial lending, investment property finance, Australia" />
        <link rel="canonical" href="/tools/commercial-real-estate-calculator" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Commercial Real Estate Calculator" }
          ]} />

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Commercial Real Estate Loans Calculator
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Calculate loan payments, ROI, and cash flow for commercial real estate investments in Australia.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Speak with a broker about your options (no consumer credit).
            </p>
          </div>

          {/* Calculator */}
          <Card className="mb-12 bg-gradient-to-r from-secondary/5 to-secondary-light/5 border-secondary/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 text-secondary mr-3" />
                <h2 className="text-2xl font-bold text-foreground">Calculate Your Commercial Real Estate Investment</h2>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Calculator Inputs */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="purchasePrice" className="text-sm font-medium text-foreground">
                      Purchase Price ($)
                    </Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      placeholder="2500000"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="downPayment" className="text-sm font-medium text-foreground">
                      Down Payment ($)
                    </Label>
                    <Input
                      id="downPayment"
                      type="number"
                      placeholder="750000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
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
                  
                  <div>
                    <Label htmlFor="annualRent" className="text-sm font-medium text-foreground">
                      Annual Rental Income ($)
                    </Label>
                    <Input
                      id="annualRent"
                      type="number"
                      placeholder="200000"
                      value={annualRent}
                      onChange={(e) => setAnnualRent(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="operatingExpenses" className="text-sm font-medium text-foreground">
                      Annual Operating Expenses ($)
                    </Label>
                    <Input
                      id="operatingExpenses"
                      type="number"
                      placeholder="50000"
                      value={operatingExpenses}
                      onChange={(e) => setOperatingExpenses(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Investment Analysis</h3>
                  {results ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Loan Amount:</span>
                        <span className="text-sm font-bold text-primary">${results.loanAmount}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">LVR:</span>
                        <span className="text-sm font-bold text-foreground">{results.lvr}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Monthly Payment:</span>
                        <span className="text-sm font-bold text-secondary">${results.monthlyPayment}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Monthly Rent:</span>
                        <span className="text-sm font-bold text-primary">${results.monthlyRent}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Monthly Expenses:</span>
                        <span className="text-sm font-bold text-destructive">${results.monthlyExpenses}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Monthly Cash Flow:</span>
                        <span className={`text-sm font-bold ${parseFloat(results.cashFlow) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                          ${results.cashFlow}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Cap Rate:</span>
                        <span className="text-sm font-bold text-secondary">{results.capRate}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">Cash-on-Cash Return:</span>
                        <span className="text-sm font-bold text-secondary">{results.cashOnCashReturn}%</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Enter investment details to see analysis</p>
                  )}
                  
                  <div className="mt-6">
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary text-secondary-foreground"
                    >
                      <Link to="/contact">Get Investment Analysis</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Commercial Real Estate Loans Calculator: Quick Overview</h2>
            <div className="prose max-w-none text-muted-foreground mb-8">
              <p>If you're weighing up commercial real estate loans calculator for your business, this guide breaks down how it works in Australia, when it's useful, what it costs, and how we structure it with lenders.</p>
              <p><strong>What is commercial real estate loans calculator?</strong> It's a commercial finance solution used by Australian businesses. We arrange and negotiate terms with lenders, then coordinate credit and settlement.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* When to use it */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-secondary mr-2" />
                    <h3 className="text-lg font-semibold text-foreground">When to Use It</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Time-sensitive transactions</li>
                    <li>• Investment property acquisitions</li>
                    <li>• Working capital gaps</li>
                    <li>• Commercial property purchases</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Typical Terms */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-6 h-6 text-secondary mr-2" />
                    <h3 className="text-lg font-semibold text-foreground">Typical Terms</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Interest:</span>
                      <span>6%-9% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term:</span>
                      <span>1-5 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LVR:</span>
                      <span>Up to 65%-75%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fees:</span>
                      <span>0.5%-2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Metrics */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-6 h-6 text-secondary mr-2" />
                    <h3 className="text-lg font-semibold text-foreground">Key Metrics</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>• Capitalisation Rate (Cap Rate)</li>
                    <li>• Cash-on-Cash Return</li>
                    <li>• Monthly Cash Flow</li>
                    <li>• Loan-to-Value Ratio</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQs */}
          <FAQSection 
            faqs={faqs}
          />

          {/* CTA */}
          <section className="text-center mt-16 py-12 bg-gradient-to-r from-secondary to-secondary-light rounded-2xl">
            <div className="max-w-2xl mx-auto px-8">
              <h2 className="text-2xl font-bold text-secondary-foreground mb-4">
                Ready to Invest in Commercial Real Estate?
              </h2>
              <p className="text-secondary-foreground/90 mb-6">
                Our calculator provides investment analysis, but every property and market is unique. Connect with our commercial lending specialists for detailed investment advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  <Link to="/contact">
                    Speak with Investment Specialist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                >
                  <Link to="/resources/guides">Read Investment Guides</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CommercialRealEstateCalculator;