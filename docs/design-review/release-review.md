# Release review: preserved lender-count claims

The claim-integrity gate reports nine changed service files because it scans their complete source for unsupported claims. Every flagged occurrence is the exact existing phrase **“access to over 50 lenders”**, present in both fresh `origin/main` source and the captured public production HTML. The redesign has preserved all nine occurrences; it has introduced none of them.

| Production route | Source and live baseline match |
| --- | --- |
| /services/asset-backed-lending | Exact phrase preserved |
| /services/asset-finance | Exact phrase preserved |
| /services/business-acquisition | Exact phrase preserved |
| /services/commercial-property-development | Exact phrase preserved |
| /services/debt-consolidation | Exact phrase preserved |
| /services/first-second-mortgages | Exact phrase preserved |
| /services/private-lending | Exact phrase preserved |
| /services/refinancing-solutions | Exact phrase preserved |
| /services/working-capital | Exact phrase preserved |

Machine-readable evidence, including source and production-text context, is in `claim-gate-baseline.json`. It can be regenerated with `check_preserved_claims.py` without modifying the site.

The private design preview can be reviewed with this known content issue documented. Do not label CI as fully passing, disable the claim gate, or silently rewrite these claims as part of the visual redesign. Before a production promotion, the owner and colleague should verify the current lender-panel evidence and resolve the claim gate through the repository's normal content review process. Any resulting copy or validation-policy change should be reviewed explicitly as a separate substantive correction.

This check establishes that the copy is pre-existing and unchanged; it does not establish that the lender count is accurate.
