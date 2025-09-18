import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Calculator, ArrowRight, DollarSign } from "lucide-react";

interface LoanData {
  amount: string;
  rate: string;
  term: string;
  fees: string;
}

const LoanComparisonTool = () => {
  const [loan1, setLoan1] = useState<LoanData>({ amount: "", rate: "", term: "", fees: "" });
  const [loan2, setLoan2] = useState<LoanData>({ amount: "", rate: "", term: "", fees: "" });
  const [loan3, setLoan3] = useState<LoanData>({ amount: "", rate: "", term: "", fees: "" });

  const calculateLoanDetails = (loan: LoanData) => {
    const principal = parseFloat(loan.amount) || 0;
    const annualRate = (parseFloat(loan.rate) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const payments = (parseFloat(loan.term) || 0) * 12;
    const fees = parseFloat(loan.fees) || 0;

    if (principal > 0 && annualRate > 0 && payments > 0) {
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
      const totalPayments = monthlyPayment * payments;
      const totalInterest = totalPayments - principal;
      const totalCost = totalPayments + fees;

      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalCost: totalCost.toFixed(2),
        totalPayments: totalPayments.toFixed(2)
      };
    }
    return null;
  };

  const results1 = calculateLoanDetails(loan1);
  const results2 = calculateLoanDetails(loan2);
  const results3 = calculateLoanDetails(loan3);

  const updateLoan = (loanNumber: number, field: keyof LoanData, value: string) => {
    const setter = loanNumber === 1 ? setLoan1 : loanNumber === 2 ? setLoan2 : setLoan3;
    const currentLoan = loanNumber === 1 ? loan1 : loanNumber === 2 ? loan2 : loan3;
    setter({ ...currentLoan, [field]: value });
  };

  const getBestLoan = () => {
    const loans = [
      { name: "Loan 1", results: results1 },
      { name: "Loan 2", results: results2 },
      { name: "Loan 3", results: results3 }
    ].filter(loan => loan.results);

    if (loans.length === 0) return null;

    return loans.reduce((best, current) => {
      const bestCost = parseFloat(best.results!.totalCost);
      const currentCost = parseFloat(current.results!.totalCost);
      return currentCost < bestCost ? current : best;
    });
  };

  const bestLoan = getBestLoan();

  const faqs = [
    {
      question: "What factors should I consider when comparing loans?",
      answer: "Compare interest rates, fees, loan terms, monthly payments, total cost, prepayment penalties, and the lender's reputation and service quality."
    },
    {
      question: "Is the lowest interest rate always the best option?",
      answer: "Not necessarily. Consider total cost including all fees, loan terms, and conditions. Sometimes a slightly higher rate with lower fees can be more cost-effective."
    },
    {
      question: "How do establishment fees affect the total loan cost?",
      answer: "Establishment fees add to the upfront cost and total loan expense. High fees can make a low-rate loan more expensive than alternatives with higher rates but lower fees."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Loan Comparison Tool | Compare Business Loans Australia</title>
        <meta name="description" content="Compare multiple business loan offers side by side. Analyze rates, fees, monthly payments and total costs to find the best financing option." />
        <meta name="keywords" content="loan comparison tool, business loan comparison, loan calculator Australia, compare loan offers, loan rates comparison" />
        <link rel="canonical" href="/tools/loan-comparison-tool" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Loan Comparison Tool" }
          ]} />

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Loan Comparison Tool
              </h1>
              <p className="text-xl text-muted-foreground">
                Compare up to 3 loan offers side by side to find the best financing option for your business.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((loanNum) => {
                const loan = loanNum === 1 ? loan1 : loanNum === 2 ? loan2 : loan3;
                const results = loanNum === 1 ? results1 : loanNum === 2 ? results2 : results3;
                const isBest = bestLoan?.name === `Loan ${loanNum}`;

                return (
                  <Card key={loanNum} className={`${isBest ? 'border-primary border-2' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Loan {loanNum}</h3>
                        {isBest && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            Best Option
                          </span>
                        )}
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor={`loan${loanNum}-amount`}>Loan Amount ($)</Label>
                          <Input
                            id={`loan${loanNum}-amount`}
                            type="number"
                            placeholder="500000"
                            value={loan.amount}
                            onChange={(e) => updateLoan(loanNum, 'amount', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`loan${loanNum}-rate`}>Interest Rate (%)</Label>
                          <Input
                            id={`loan${loanNum}-rate`}
                            type="number"
                            step="0.1"
                            placeholder="8.5"
                            value={loan.rate}
                            onChange={(e) => updateLoan(loanNum, 'rate', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`loan${loanNum}-term`}>Loan Term (Years)</Label>
                          <Input
                            id={`loan${loanNum}-term`}
                            type="number"
                            step="0.5"
                            placeholder="5"
                            value={loan.term}
                            onChange={(e) => updateLoan(loanNum, 'term', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`loan${loanNum}-fees`}>Establishment Fees ($)</Label>
                          <Input
                            id={`loan${loanNum}-fees`}
                            type="number"
                            placeholder="2500"
                            value={loan.fees}
                            onChange={(e) => updateLoan(loanNum, 'fees', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-primary" />
                          Results
                        </h4>
                        {results ? (
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monthly Payment:</span>
                              <span className="font-semibold text-foreground">${results.monthlyPayment}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Interest:</span>
                              <span className="font-semibold text-foreground">${results.totalInterest}</span>
                            </div>
                            <div className="flex justify-between border-t border-border pt-2">
                              <span className="text-muted-foreground font-medium">Total Cost:</span>
                              <span className="font-bold text-primary">${results.totalCost}</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">Enter loan details to see comparison</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {bestLoan && (
              <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    🏆 {bestLoan.name} offers the lowest total cost
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Total cost: ${bestLoan.results!.totalCost} | Monthly payment: ${bestLoan.results!.monthlyPayment}
                  </p>
                  <Button asChild>
                    <Link to="/contact">Get Professional Loan Advice</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Comparison Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Consider total cost, not just interest rates</li>
                    <li>• Factor in all fees and charges</li>
                    <li>• Check for prepayment penalties</li>
                    <li>• Compare loan terms and flexibility</li>
                    <li>• Evaluate lender reputation and service</li>
                    <li>• Consider your cash flow capacity</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">What to Look For</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Competitive interest rates</li>
                    <li>• Reasonable establishment fees</li>
                    <li>• Flexible repayment options</li>
                    <li>• Quick approval processes</li>
                    <li>• No hidden charges</li>
                    <li>• Strong customer support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <FAQSection faqs={faqs} />

            <Card className="mt-12 bg-gradient-to-r from-primary to-primary-light">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  Found the Right Loan?
                </h3>
                <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                  Our commercial lending specialists can help you negotiate better terms and guide you through the application process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                    <Link to="/contact">
                      Speak with Specialist
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/services">Explore Our Services</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanComparisonTool;