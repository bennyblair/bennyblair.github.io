export const TRANSACTION_JOURNEYS = [
  { value: "purchase", label: "Purchase", description: "Fund a business-purpose property purchase with a structure matched to the asset and settlement date.", path: "/services/commercial-property-finance" },
  { value: "refinance", label: "Refinance", description: "Review existing business-purpose debt, a facility maturity or a change in funding needs.", path: "/services/refinancing-solutions" },
  { value: "bridge", label: "Bridge a funding gap", description: "Connect a business transaction to an evidenced sale, refinance or other repayment event.", path: "/services/bridging-finance" },
  { value: "equity_release", label: "Release equity for business", description: "Explore business funding against available property equity, including first or second mortgages.", path: "/services/first-second-mortgages" },
] as const;

export type TransactionPurpose = typeof TRANSACTION_JOURNEYS[number]["value"] | "other" | "not_provided";

export function normaliseTransactionPurpose(value: string | null | undefined): TransactionPurpose {
  return TRANSACTION_JOURNEYS.some((journey) => journey.value === value) || value === "other"
    ? value as TransactionPurpose
    : "not_provided";
}

export const ENQUIRY_RESPONSE_MESSAGE = "We aim to respond within 1-2 business days. Call us if a funding deadline is close.";
