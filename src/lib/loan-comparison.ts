export interface LoanData {
  amount: string;
  rate: string;
  term: string;
  fees: string;
}

export interface LoanResult {
  principal: number;
  paymentCount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  totalPayments: number;
}

export type LoanComparison = {
  status: "insufficient_offers" | "different_principal" | "different_term" | "comparable";
  lowestIndex: number | null;
};

export function calculateLoanDetails(loan: LoanData): LoanResult | null {
  const principal = Number.parseFloat(loan.amount);
  const annualRate = Number.parseFloat(loan.rate) / 100;
  const paymentCount = Number.parseFloat(loan.term) * 12;
  const fees = Number.parseFloat(loan.fees || "0");

  if (
    !Number.isFinite(principal)
    || !Number.isFinite(annualRate)
    || !Number.isFinite(paymentCount)
    || !Number.isFinite(fees)
    || principal <= 0
    || annualRate < 0
    || paymentCount <= 0
    || !Number.isInteger(paymentCount)
    || fees < 0
  ) {
    return null;
  }

  const monthlyRate = annualRate / 12;
  const monthlyPayment = monthlyRate === 0
    ? principal / paymentCount
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, paymentCount))
      / (Math.pow(1 + monthlyRate, paymentCount) - 1);
  const totalPayments = monthlyPayment * paymentCount;
  const totalInterest = totalPayments - principal;

  return {
    principal,
    paymentCount,
    monthlyPayment,
    totalInterest,
    totalCost: totalPayments + fees,
    totalPayments,
  };
}

export function compareLoanResults(results: Array<LoanResult | null>): LoanComparison {
  const completed = results
    .map((result, index) => ({ result, index }))
    .filter((item): item is { result: LoanResult; index: number } => item.result !== null);
  if (completed.length < 2) return { status: "insufficient_offers", lowestIndex: null };
  if (new Set(completed.map(({ result }) => result.principal.toFixed(2))).size !== 1) {
    return { status: "different_principal", lowestIndex: null };
  }
  if (new Set(completed.map(({ result }) => result.paymentCount)).size !== 1) {
    return { status: "different_term", lowestIndex: null };
  }
  const lowest = completed.reduce((current, candidate) => (
    candidate.result.totalCost < current.result.totalCost ? candidate : current
  ));
  return { status: "comparable", lowestIndex: lowest.index };
}
