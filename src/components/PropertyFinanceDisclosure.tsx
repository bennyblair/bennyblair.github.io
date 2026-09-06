/** Visible information for property-backed business-finance enquiries. */
export default function PropertyFinanceDisclosure() {
  return (
    <section aria-labelledby="property-finance-disclosure" className="max-w-4xl mx-auto mb-12 rounded-lg border border-border bg-muted/30 p-6 text-left">
      <h2 id="property-finance-disclosure" className="text-xl font-semibold text-foreground mb-3">Your broker, purpose and costs</h2>
      <p className="text-base text-muted-foreground leading-relaxed mb-3">
        Emet Capital Pty Ltd is a commercial finance broker, not the lender. We help borrowers
        compare and arrange finance with third-party lenders. For property-backed business
        funding, residential or commercial property may be considered as security. Consumer-purpose
        loans are not offered. Approval, terms and security acceptance remain subject to lender assessment.
      </p>
      <p className="text-base text-muted-foreground leading-relaxed mb-3">
        Rates and costs depend on the lender and transaction; there is no single rate or total
        cost for every borrower. Costs may include interest, brokerage, lender establishment fees,
        valuation, legal and registration costs, and ongoing, exit or default charges where applicable.
        Ask us for the fees applicable to your proposed transaction, including who receives each
        payment and when it becomes payable, before deciding to proceed.
      </p>
      <p className="text-base text-muted-foreground leading-relaxed">
        Property offered as security may be at risk if the loan is not repaid. Reduced-documentation
        lending does not mean no assessment or guaranteed approval: lenders still require evidence
        of the borrower, business purpose, security and repayment or exit strategy.
      </p>
    </section>
  );
}
