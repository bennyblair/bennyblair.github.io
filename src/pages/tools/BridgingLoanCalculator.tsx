/**
 * reviewedBy: "OpenClaw independent reviewer"
 * reviewedAt: "2026-11-17T20:42:16.229Z"
 * expiresAt: "2027-05-16T20:42:16.229Z"
 */

import { isDesignPreview } from "@/lib/design-preview";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import FAQSection from "@/components/FAQSection";
import { EMET_LOGO_URL, generateFAQPageSchema } from "@/lib/schema-utils";

const faqs = [
  {
    question: "How accurate is the bridging loan calculator?",
    answer:
      "The calculator estimates interest-only monthly interest and total interest from the loan amount, annual rate and term you enter. It does not include establishment, valuation, legal, broker or exit fees, default interest or extension costs. Treat the result as indicative only. Lenders set actual pricing for each file.",
  },
  {
    question: "What interest rate should I enter in the calculator?",
    answer:
      "Enter the annual interest rate a lender has quoted for your file. If the quote is a monthly rate, multiply it by 12 before you enter it. The calculator uses that simple annual rate and does not compound. Use the rate that applies to your security and circumstances, not an advertised headline rate.",
  },
  {
    question: "Can I reduce my monthly payments on bridging loans?",
    answer:
      "Monthly payments in this calculator are interest-only. You can lower the shown payment by entering a smaller loan amount or a lower annual rate. Some lenders allow interest to be capitalised, so cash interest is not paid monthly and the debt rises instead. Capitalisation is a lender setting, not something this calculator changes automatically.",
  },
  {
    question: "How do bridging loan costs compare to standard commercial loans?",
    answer:
      "Do not compare a bridging facility to a longer-term commercial loan on monthly interest alone. Bridging is used when timing does not allow a standard assessment. Compare total cost over the period you need the money, including fees this calculator excludes.",
  },
  {
    question: "What loan term should I enter in the calculator?",
    answer:
      "Enter your realistic time until you can repay through sale, refinance or another evidenced exit, not a hopeful minimum. If the exit might be delayed, run the calculator again with a longer term. This tool does not add default interest or extension fees; those costs, if any, are set by the lender.",
  },
];

const BridgingLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);

  const calculatePayments = () => {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = loanAmount * monthlyRate;
    const totalInterest = monthlyPayment * loanTerm;
    const totalRepayment = loanAmount + totalInterest;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    };
  };

  const results = calculatePayments();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Bridging Loan Calculator: Calculate Costs & Repayments Instantly",
    "description": "Guide to using this calculator to estimate interest-only monthly interest and total interest for Australian commercial bridging finance. Results exclude establishment, valuation, legal, broker and exit fees, default interest and extensions, and are indicative only.",
    "image": "https://emetcapital.com.au/images/bridging-loan-calculator.jpg",
    "author": {
      "@type": "Organization",
      "name": "Emet Capital"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Emet Capital",
      "logo": {
        "@type": "ImageObject",
        "url": EMET_LOGO_URL,
        "width": 512,
        "height": 512
      }
    },
    "datePublished": "2025-10-21",
    "dateModified": "2025-10-21"
  };

  return (
    <>
      <Helmet>
        <title>Bridging Loan Calculator Australia: Calculate Costs Instantly</title>
        <meta name="description" content="Estimate interest-only monthly interest and total interest for a commercial bridging loan. Excludes establishment, valuation, legal, broker and exit fees, default interest and extensions. Indicative only; lenders set pricing." />
        <meta name="keywords" content="bridging loan calculator, bridging finance calculator, bridge loan calculator, commercial bridging calculator" />
      <link rel="canonical" href="https://emetcapital.com.au/resources/tools/bridging-loan-calculator" />
      <meta property="og:image" content="https://emetcapital.com.au/hero-property-finance-poster.webp" />
      <meta property="og:image:alt" content="Emet Capital bridging loan calculator" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://emetcapital.com.au/hero-property-finance-poster.webp" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQPageSchema(faqs))}
        </script>
      {isDesignPreview && <meta name="robots" content="noindex, nofollow, noarchive" />}
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="page-header text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Bridging Loan Calculator</h1>
            <div className="text-lg text-muted-foreground max-w-3xl mx-auto space-y-3">
              <p>
                This calculator estimates interest-only monthly interest and total interest from the loan amount, annual interest rate and term you enter.
              </p>
              <p>
                It excludes establishment, valuation, legal, broker and exit fees, default interest and extension costs.
              </p>
              <p>
                Results are indicative only, and lenders set actual pricing.
              </p>
            </div>
          </div>

          <Card className="calculator-workspace calculator-workspace--light mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Calculator className="h-5 w-5" />
                Calculate Your Bridging Loan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Monthly Payment</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">${Number(results.monthlyPayment).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Interest</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">${Number(results.totalInterest).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Repayment</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">${Number(results.totalRepayment).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg">
            <div className="article-content space-y-6 prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Understanding the true cost of bridging finance before committing to any lending arrangement protects you from unexpected expenses and helps assess whether short-term funding suits your situation. Bridging loans serve critical functions: funding property purchases before selling existing assets, covering urgent business expenses, or securing time-sensitive opportunities. Their cost structure differs substantially from traditional mortgages. Monthly interest charges, establishment fees, and total borrowing costs add up quickly over even short timeframes, making accurate calculation essential.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                The calculator above shows monthly interest and total interest on the three inputs you provide. It does not show peak debt after capitalised costs, and it does not show what happens if the exit is late. For a business or commercial property purchase, run the term you expect and a longer term so a delayed sale or refinance is visible in the interest total.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Using the calculator effectively means knowing what figures to input, understanding how different variables impact costs, and recognising when results suggest alternatives might serve better than bridging finance. This guide explains how to interpret calculator results accurately, what costs to factor beyond basic calculations, how to compare different bridging finance scenarios, and strategies to minimise your total borrowing expenses whilst achieving your commercial objectives.
              </p>

              <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">How to Use the Bridging Loan Calculator</h2>
              <p className="text-muted-foreground leading-relaxed">
                The calculator above requires three key inputs that determine your estimated costs. Understanding each input and how to calculate it accurately ensures reliable results that guide your financing decisions.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Entering Your Loan Amount</h3>
              <p className="text-muted-foreground leading-relaxed">
                The loan amount represents total funds you need to borrow. For property bridging loans, this equals your purchase price minus any deposit you're contributing. However, you might also capitalise certain costs, including establishment fees, legal expenses, and sometimes initial interest payments, into the loan amount rather than paying them from pocket.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Enter the total you expect to draw, including any fees or prepaid interest the lender will capitalise, not only the base purchase gap. If you enter only the purchase shortfall, the monthly interest figure will understate the cost of the facility you actually take.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Consider whether you're borrowing the minimum necessary or optimal amount. Sometimes borrowing slightly more provides working capital buffer during the bridging period, whilst other times minimising the loan reduces interest costs. Calculate both scenarios using the calculator to see the monthly payment difference.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Understanding Interest Rate Inputs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enter the annual interest rate from a lender quote for this file. If the quote is a monthly rate, multiply it by 12 and enter the annual figure. The calculator uses simple annual interest divided by twelve. It does not compound, and it does not apply a different rate after an extension.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                The rate a lender will quote depends on the security, location, loan-to-value settings, existing debt and the rest of the file. Use the rate indicated for your circumstances rather than an advertised headline rate that may not apply.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Setting Realistic Loan Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                Input your realistic timeframe: how long until you sell an existing property, complete a development, or refinance to longer-term finance. Underestimating term length creates artificially low cost projections. This calculator does not assume a standard term.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Most bridging loans structure as interest-only with principal due at maturity. The calculator reflects this: your monthly payment equals only the interest charge, with the full principal amount repaid when you exit the loan through sale, refinance, or other means.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                If a delayed exit is realistic, enter a longer term as well. Extension pricing, default interest and extra fees are set by the lender and are not in this calculator. Modelling extra months of ordinary interest is the way to see delay cost here.
              </p>

              <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">Understanding Your Calculator Results</h2>
              <p className="text-muted-foreground leading-relaxed">
                The calculator provides several key figures helping you assess bridging loan costs and affordability. Each metric reveals different aspects of your total financial commitment.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Monthly Payment Breakdown</h3>
              <p className="text-muted-foreground leading-relaxed">
                The monthly payment figure represents your ongoing cash flow requirement throughout the loan term. Most bridging loans require monthly interest payments despite being interest-only structures. This amount must be paid from your available cash flow. Missing payments triggers default provisions.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Ask whether the business or investment can meet that monthly interest from cash, or whether the file depends on capitalising interest. A payment you cannot sustain is a file risk, not only a calculator output.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Some lenders offer interest capitalisation where monthly interest adds to principal rather than requiring cash payment. This preserves working capital but increases total debt progressively. This calculator still shows the interest as a monthly amount; it does not add that interest back onto the loan balance for you.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Total Interest and Cost Projections</h3>
              <p className="text-muted-foreground leading-relaxed">
                The total interest figure shows cumulative interest over your specified loan term. It is only part of the borrowing cost. Establishment, application, legal, valuation and exit fees sit outside the three outputs above. Add those from the lender proposal before you treat the result as a budget.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Understanding total all-in costs helps compare bridging finance against alternatives. <Link to="/resources/guides/bridging-finance-australia-complete-property-guide" className="text-primary hover:underline">Bridging finance in Australia</Link> is used when timing, not only price, drives the structure. Assess whether the speed of a short-term facility is worth the extra cost for your circumstances.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Effective Interest Rate Calculations</h3>
              <p className="text-muted-foreground leading-relaxed">
                The calculator shows your nominal annual rate, but your effective cost is higher if fees are capitalised into the drawn amount. You then pay interest on a larger balance throughout the term even though the rate field has not changed.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                To compare facilities, add interest plus every fee, then divide by the money you actually needed, and look at that cost over the term you will use. A lower headline rate with heavier fees can cost more than a higher rate with lighter fees. Always compare total cost rather than the rate field alone.
              </p>

              <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">Comparing Bridging Loan Scenarios</h2>
              <p className="text-muted-foreground leading-relaxed">
                Use the calculator to model multiple scenarios, helping you assess various strategies and identify the most cost-effective approach for your situation.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Short-Term vs Extended Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                Because this calculator multiplies monthly interest by the number of months you enter, a longer term increases total interest in proportion. Fixed fees charged once do not rise with extra months, so the all-in cost does not double just because the term doubles.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                That is why a delayed exit matters. Extra months of interest can outweigh a slightly lower sale price that lets you repay on time. Run the expected term and a delayed term before you treat the first result as the cost of the deal.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Different Interest Rate Impacts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Model more than one annual rate if you have more than one quote, or if the quote is still a range. Small rate differences accumulate over the term because the monthly interest is a share of the whole loan amount.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Rate variations often reflect property quality and borrower strength rather than arbitrary lender policies. Security type, location, existing debt and the evidence for the exit can all change the rate a lender will quote. Compare quotes on the same amount, term and fee assumptions.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Loan Amount Optimisation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Calculate costs for different borrowing amounts to determine how much you actually need to draw. Borrowing less reduces interest. Contributing more equity ties up capital you might need for the purchase, works or working capital. Use the calculator to see the monthly interest difference, then weigh that against the cash you would otherwise keep.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Maximum borrowing is set by the lender against the security, existing debt and the file. There is no single loan-to-value figure that applies to every commercial bridging loan. Confirm the lender's limit before you plan a purchase that assumes a draw the security cannot support.
              </p>

              <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">Beyond the Calculator: Hidden Costs</h2>
              <p className="text-muted-foreground leading-relaxed">
                Basic calculator results show interest costs but omit several significant expenses affecting your total financial commitment. Understanding these additional costs prevents budget surprises and enables accurate project feasibility assessment.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Establishment and Application Fees</h3>
              <p className="text-muted-foreground leading-relaxed">
                Establishment fees are charged on many bridging facilities and are not part of the monthly payment shown above. Some lenders allow those fees to be capitalised into the loan amount, whilst others require cash at settlement. If they are capitalised, increase the loan amount input so the interest total matches the drawn facility.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Application or assessment fees may be payable for the lender's evaluation even if the loan does not proceed. Legal fees for documents vary with the complexity of the security and the existing debt. Valuation costs vary by property type and usually fall due before formal approval.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Ongoing and Exit Expenses</h3>
              <p className="text-muted-foreground leading-relaxed">
                Account-keeping fees can accumulate over the term even when each charge is small. Some facilities also have a minimum interest period, so an early repayment may still cost more than the months you actually used. Other lenders allow repayment when the exit completes, with no minimum. Confirm that term before you rely on an early-exit saving.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Exit or discharge fees, if charged, are separate from the interest total. Some lenders charge a percentage of the loan, some charge a flat fee, and some charge only ordinary legal discharge costs. Add the exit cost from the proposal when you compare all-in cost.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Opportunity Costs and Alternatives</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond direct costs, consider opportunity costs of capital tied to deposits and ongoing interest payments. Cash used as a deposit cannot earn a return elsewhere during the bridging period. That forgone return is part of the economic cost even though it does not appear in the calculator.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Compare calculator results against alternative financing options. What would <Link to="/resources/guides/commercial-property-loans-australia-complete-guide" className="text-primary hover:underline">commercial property loans in Australia</Link> cost over the same period? A longer-term commercial loan follows a different assessment path and may not meet a short required date. Calculate both options when the timeline actually allows a standard facility.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                A caveat on title can delay a sale or refinance exit even when the bridging interest looks manageable. That is a title issue, not a product Emet Capital offers. For educational background on caveats on title, see <Link to="/resources/guides/caveat-loans-australia-complete-guide" className="text-primary hover:underline">Caveat loans in Australia</Link>.
              </p>

              <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">When Calculator Results Suggest Alternatives</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sometimes bridging loan calculator results reveal that alternative financing approaches might serve better than short-term bridging arrangements, particularly when total costs seem excessive relative to benefits achieved.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Cost-Benefit Analysis Thresholds</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compare calculated bridging costs against the value of completing the purchase or works on the required date. If the interest and fees consume most of the expected commercial benefit, the facility may not be worth taking. If the alternative is losing a contracted opportunity or paying a commercial penalty, the same cost may still be rational.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Assess costs against your alternatives. What happens if you do not use bridging finance? A slightly later timeline with a cheaper facility can be the better file. Paying bridging interest only to save a short wait is harder to justify when nothing commercial is lost by waiting.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Stress Testing Scenarios</h3>
              <p className="text-muted-foreground leading-relaxed">
                Run calculator scenarios with pessimistic assumptions to understand downside risks. If you have calculated based on a sale or refinance inside the first term, model a longer term as well. The difference is the interest cost of a delayed exit, before any default interest or extension fee the lender may add.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                If the facility is variable, enter a higher annual rate as a second scenario. This calculator does not forecast rate movements. A higher input is the way to see whether a rate increase would stress cash flow or the project.
              </p>

              <h3 className="text-foreground text-xl font-semibold mt-6 mb-3">Alternative Funding Strategies</h3>
              <p className="text-muted-foreground leading-relaxed">
                If calculator results show bridging costs consuming significant portions of expected profits or returns, explore alternatives. Vendor finance arrangements, where a property seller provides funding, remove a third-party lender's interest and fees. Whether a vendor will do that, and on what terms, depends on the contract, not on this calculator.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Traditional commercial lending, whilst slower, might suit situations where speed isn't absolutely critical. If your timeline allows a standard assessment, a longer-term commercial loan may cost less over the same holding period. Calculate both scenarios: sometimes accepting a later start to access cheaper funding improves overall economics, whilst other files genuinely need a short-term bridge.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Joint venture partnerships with equity investors represent another alternative: rather than borrowing, you partner with capital providers who fund acquisition in exchange for profit shares. JVs eliminate interest costs and debt service pressure, though you sacrifice ownership and profit compared to debt-financed deals. Calculate break-even points: at what profit level does JV equity dilution cost less than bridging loan interest?
              </p>
            </div>

            <div className="mt-8">
              <FAQSection faqs={faqs} />
            </div>

            <div className="article-content space-y-6 prose prose-lg max-w-none mt-8">
              <h2 className="text-foreground text-2xl font-bold mt-8 mb-4">Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed">
                The bridging loan calculator above provides immediate visibility into monthly payments and interest costs, enabling quick assessment of whether short-term commercial finance fits your budget and project economics. Comprehensive cost evaluation still has to include establishment fees, legal expenses, valuations, potential exit charges, and opportunity costs that the three outputs do not show.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Use the calculator as your starting point, not your ending point. Model more than one loan amount, rate and term, including a delayed-exit term. Add fees from a lender proposal to the interest total before you treat the figure as a budget. Compare that all-in cost against the commercial benefit you are trying to protect.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                When calculator results reveal high costs relative to benefits, explore alternatives including traditional commercial lending, vendor finance arrangements, or joint venture partnerships that might deliver better overall economics despite different risk-return profiles. Sometimes accepting slightly delayed timelines to access cheaper funding improves project viability substantially, whilst other situations genuinely require the speed premium that justifies bridging loan expense.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                If you need a business-purpose facility discussed against security and an evidenced exit, see <Link to="/services/bridging-finance" className="text-primary hover:underline">how a broker arranges commercial bridging finance</Link>. Emet Capital is a commercial finance broker that arranges finance for eligible business borrowers and is not the lender. It does not quote rates or approve loans.
              </p>

              <p className="text-muted-foreground text-sm italic mt-8">
                <strong>Disclaimer:</strong> This calculator provides general information only and is not financial advice. It is for business-purpose commercial bridging finance. Emet Capital is a commercial finance broker that arranges finance for eligible business borrowers and is not the lender. Emet Capital does not arrange consumer loans.
              </p>

              <div className="mt-8 text-center">
                <Button asChild size="lg">
                  <Link to="/contact">Speak with a broker</Link>
                </Button>
              </div>
            </div>
          </Card>
        </article>
      </div>
    </>
  );
};

export default BridgingLoanCalculator;
