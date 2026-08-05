import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { ArrowRight, DollarSign } from "lucide-react";
import { calculateLoanDetails, compareLoanResults, type LoanData } from "@/lib/loan-comparison";

const formatCurrency = (value: number) => new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 2,
}).format(value);

const LoanComparisonTool = () => {
  const [loan1, setLoan1] = useState<LoanData>({ amount: "", rate: "", term: "", fees: "" });
  const [loan2, setLoan2] = useState<LoanData>({ amount: "", rate: "", term: "", fees: "" });
  const [loan3, setLoan3] = useState<LoanData>({ amount: "", rate: "", term: "", fees: "" });

  const loans = [loan1, loan2, loan3];
  const results = loans.map(calculateLoanDetails);
  const comparison = compareLoanResults(results);
  const lowestModelledCost = comparison.lowestIndex === null ? null : {
    name: `Loan ${comparison.lowestIndex + 1}`,
    result: results[comparison.lowestIndex]!,
  };

  const updateLoan = (loanNumber: number, field: keyof LoanData, value: string) => {
    const setters = [setLoan1, setLoan2, setLoan3];
    const current = loans[loanNumber - 1];
    setters[loanNumber - 1]({ ...current, [field]: value });
  };

  const faqs = [
    {
      question: "What factors should I consider when comparing business loans?",
      answer: "Use the same loan amount and assumptions, then compare repayment structure, all known fees, total modelled payments, security, guarantees, residual or balloon amounts, early-repayment terms, default provisions and flexibility.",
    },
    {
      question: "Is the lowest interest rate always the best option?",
      answer: "No. A rate does not capture fees, repayment structure, term, residual amounts, security, defaults or flexibility. This tool compares one simplified model and cannot determine which contract is suitable.",
    },
    {
      question: "What does this calculator include and exclude?",
      answer: "It models monthly principal-and-interest repayments using the entered annual rate and term, then adds the total known fees entered. It excludes rate changes, timing differences, tax, insurance, unentered legal or valuation costs, interest-only periods, balloons, residuals, redraws, defaults and early repayment.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Business Loan Comparison Tool Australia | Emet Capital</title>
        <meta
          name="description"
          content="Compare up to three business loan offers using one transparent repayment model. Review monthly payments, interest, known fees, assumptions and limitations."
        />
        <meta name="keywords" content="loan comparison tool, business loan comparison, loan calculator Australia, compare loan offers" />
        <link rel="canonical" href="https://emetcapital.com.au/resources/tools/loan-comparison-tool" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/resources/tools" },
            { label: "Loan Comparison Tool" },
          ]} />

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Business Loan Comparison Tool
              </h1>
              <p className="text-xl text-muted-foreground">
                Compare up to three offers using the same assumptions. Results are estimates, not recommendations or quotes.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {loans.map((loan, index) => {
                const loanNumber = index + 1;
                const result = results[index];
                const isLowest = lowestModelledCost?.name === `Loan ${loanNumber}`;

                return (
                  <Card key={loanNumber} className={isLowest ? "border-primary border-2" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-foreground">Loan {loanNumber}</h2>
                        {isLowest && (
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            Lowest modelled cost
                          </span>
                        )}
                      </div>

                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor={`loan${loanNumber}-amount`}>Loan Amount ($)</Label>
                          <Input
                            id={`loan${loanNumber}-amount`}
                            type="number"
                            min="0.01"
                            placeholder="500000"
                            value={loan.amount}
                            onChange={(event) => updateLoan(loanNumber, "amount", event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`loan${loanNumber}-rate`}>Annual Interest Rate (%)</Label>
                          <Input
                            id={`loan${loanNumber}-rate`}
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="8.5"
                            value={loan.rate}
                            onChange={(event) => updateLoan(loanNumber, "rate", event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`loan${loanNumber}-term`}>Loan Term (Years)</Label>
                          <Input
                            id={`loan${loanNumber}-term`}
                            type="number"
                            min="0.25"
                            step="0.25"
                            placeholder="5"
                            value={loan.term}
                            onChange={(event) => updateLoan(loanNumber, "term", event.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`loan${loanNumber}-fees`}>Total Known Fees ($)</Label>
                          <Input
                            id={`loan${loanNumber}-fees`}
                            type="number"
                            min="0"
                            placeholder="2500"
                            value={loan.fees}
                            onChange={(event) => updateLoan(loanNumber, "fees", event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-primary" />
                          Modelled results
                        </h3>
                        {result ? (
                          <dl className="space-y-3 text-sm">
                            <div className="flex justify-between gap-3">
                              <dt className="text-muted-foreground">Monthly payment</dt>
                              <dd className="font-semibold text-foreground">{formatCurrency(result.monthlyPayment)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt className="text-muted-foreground">Total interest</dt>
                              <dd className="font-semibold text-foreground">{formatCurrency(result.totalInterest)}</dd>
                            </div>
                            <div className="flex justify-between gap-3 border-t border-border pt-2">
                              <dt className="text-muted-foreground font-medium">Total incl. entered fees</dt>
                              <dd className="font-bold text-primary">{formatCurrency(result.totalCost)}</dd>
                            </div>
                          </dl>
                        ) : (
                          <p className="text-muted-foreground text-sm">Enter a positive amount and term, a non-negative rate, and non-negative fees.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {(comparison.status === "different_principal" || comparison.status === "different_term") && (
              <Card className="mb-6 border-amber-500/40 bg-amber-500/5" role="status">
                <CardContent className="p-5 text-sm text-muted-foreground">
                  {comparison.status === "different_principal"
                    ? "Enter the same loan amount for each offer before comparing modelled total cost. Different principals are not a like-for-like comparison."
                    : "Enter the same loan term for each offer before comparing modelled total cost. Different holding periods are not a like-for-like comparison."}
                </CardContent>
              </Card>
            )}

            {lowestModelledCost && (
              <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
                <CardContent className="p-6 text-center" aria-live="polite">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {lowestModelledCost.name} has the lowest modelled cost
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    Modelled total: {formatCurrency(lowestModelledCost.result.totalCost)} | Monthly payment: {formatCurrency(lowestModelledCost.result.monthlyPayment)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    This only compares the entered values under the method below. It does not establish the best or most suitable loan.
                  </p>
                  <Button asChild><Link to="/contact">Discuss the Offer Terms</Link></Button>
                </CardContent>
              </Card>
            )}

            <section className="mb-12" aria-labelledby="comparison-methodology">
              <h2 id="comparison-methodology" className="text-2xl font-bold text-foreground mb-4">
                Calculation Method and Limitations
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                The tool uses a standard monthly principal-and-interest amortisation formula. It divides the entered annual rate by 12, assumes the rate and monthly payment stay constant for the full term, and adds the known fees entered to scheduled repayments.
              </p>
              <div className="overflow-x-auto mb-5">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="py-3 pr-4 font-semibold text-foreground">Included</th>
                      <th scope="col" className="py-3 font-semibold text-foreground">Not modelled unless reflected in your inputs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border align-top">
                      <td className="py-3 pr-4 text-muted-foreground">
                        Principal, annual nominal rate, monthly amortisation, term and total known fees.
                      </td>
                      <td className="py-3 text-muted-foreground">
                        Variable-rate changes, interest-only periods, balloons or residuals, tax, other compounding conventions, repayment timing, redraws, defaults and early payout.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground">
                For a like-for-like result, use the same amount and include every fee you can quantify over the proposed holding period. Check the lender's written repayment schedule and contract before relying on an estimate.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Comparison checks</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use the same principal and holding period</li>
                    <li>• Enter all known fees over that period</li>
                    <li>• Add any balloon or residual outside this model</li>
                    <li>• Review early-payout and default provisions</li>
                    <li>• Compare security and guarantee requirements</li>
                    <li>• Stress-test cash flow, not only the base case</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Contract questions</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• What are the net proceeds after deducted costs?</li>
                    <li>• Is the rate fixed, variable or subject to default pricing?</li>
                    <li>• Is a residual, balloon or purchase option payable?</li>
                    <li>• Which conditions can delay settlement?</li>
                    <li>• Are all charges stated in writing?</li>
                    <li>• What happens if the plan changes early?</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Compare the Right Product Structure</h2>
              <p className="text-muted-foreground leading-relaxed">
                This model is most useful for fully amortising offers. For asset purchases, first compare the ownership and residual questions in the{" "}
                <Link className="text-accent hover:underline" to="/resources/guides/equipment-finance-and-leasing-australia">
                  equipment finance and leasing guide
                </Link>. For short-term property facilities, interest may be capitalised and the exit date can dominate cost; use the{" "}
                <Link className="text-accent hover:underline" to="/resources/guides/bridging-finance-australia-complete-property-guide">
                  bridging finance guide
                </Link>{" "}
                before modelling a conventional amortising repayment.
              </p>
            </section>

            <FAQSection faqs={faqs} />

            <Card className="mt-12 bg-gradient-to-r from-primary to-primary-light">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                  Need Help Testing the Assumptions?
                </h2>
                <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                  A commercial lending specialist can help align the inputs and identify contract terms that a simple repayment model cannot capture.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                  <Link to="/contact">
                    Speak with a Specialist
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanComparisonTool;
