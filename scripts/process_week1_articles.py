#!/usr/bin/env python3
"""
Process the Emet Capital Week 1 articles specifically
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from process_word_articles import WordArticleProcessor

# Your Week 1 articles content
WEEK1_CONTENT = """
Article 1
Second Mortgage for Business in Australia: What It Is and When to Use It
Emet Capital | Resources → Guides
Introduction
Australian businesses often encounter funding needs that cannot wait for lengthy bank approval processes. Directors may need to finish a project, pay urgent tax arrears, or release capital tied up in property to take advantage of an opportunity. When the business already has a first mortgage on a property, one option to unlock equity quickly is a second mortgage.
A second mortgage is not a replacement for traditional bank finance. It is a short-term, purpose-driven tool that gives a business flexibility when timing is critical and an exit is already in sight. This article explains what a second mortgage is, when it can make sense, what lenders look for, how pricing works, the risks to consider, and alternatives. A worked example is included to show how the numbers play out in practice. This is general information only and not financial or credit advice.
 
What Is a Second Mortgage for Business?
A second mortgage is a facility secured against property that already has an existing mortgage registered. The second lender takes a subordinated position on title — meaning that if the property is sold, the first lender is repaid in full before the second lender sees a cent.
Because this ranking increases the lender's risk, second mortgages are usually priced higher than first mortgages and offered for shorter terms. They are intended to bridge a specific gap, not to become permanent financing.
For businesses, a second mortgage can unlock property equity quickly. Common uses include: completing fit-outs to trigger rental income, paying GST arrears so a refinance can proceed, or covering working capital until a contracted receivable arrives.
 
When Does a Second Mortgage Make Sense?
Second mortgages work best where there is both equity in the property and a dated exit strategy. They are not intended for indefinite use or long-term leverage.
Situations where they can make sense include:
•	Bridging a settlement gap: when a property is due to settle but funds are required beforehand.
•	Project completion: finishing works that unlock revenue or trigger further drawdowns.
•	Tax or regulatory obligations: paying ATO arrears to avoid penalties and maintain compliance.
•	Seasonal working capital: covering cash flow for stock or payroll ahead of peak trading.
In each case, the loan should be linked to an exit — a sale, refinance, or incoming receivable. Without this, the risk of over-gearing rises quickly.
 
Eligibility and Security Requirements
Private lenders assess second mortgages differently from banks, but the fundamentals are similar:
•	Combined Loan-to-Value Ratio (LVR): The total of the first and second mortgages divided by the property value. Most lenders cap this at 65–75%.
•	Property quality: Residential, commercial, or industrial property may all qualify, but stronger locations and asset types improve appetite.
•	Borrower profile: Facilities are usually taken in company names. Directors' guarantees are standard. Basic financial information, BAS, and bank statements are often required.
•	Exit evidence: For sales, lenders want contracts and realistic net proceeds. For refinances, updated financials and indicative offers from banks. For receivables, signed contracts and counterparty details.
 
Costs, Fees, and Terms
Because of the subordinated position, pricing reflects higher risk. Borrowers should expect:
•	Establishment fees of 1–3% of the facility size.
•	Legal and valuation fees payable by the borrower, typically several thousand dollars.
•	Interest often between 1–2% per month. Many lenders allow capitalisation, so repayments are not required during the term, but the balance grows.
•	Terms usually from 3 to 12 months. Longer terms may be available where the exit is credible.
Worked Example
A construction business needs $500,000 for six months to complete a fit-out. The property is worth $2.5m and has a first mortgage of $1.2m.
•	Combined LVR = ($1.2m + $0.5m) ÷ $2.5m = 68% (within common limits).
•	Establishment fee (2%) = $10,000.
•	Legal costs = $6,000.
•	Interest (1.5% per month, capitalised) = $45,000.
•	Total cost of funds ≈ $61,000.
If the works allow the business to trigger $250,000 per year in rental income, the facility may be commercially justified.
 
Process and Timelines
Settlement speed depends on the quality of the borrower's file. A "clean file" includes:
•	Identification and KYC documents for all directors.
•	ASIC company extracts and constitutional documents.
•	First mortgage statements and payout figures.
•	Property title and valuation.
•	Clear evidence of the exit.
With this in place, private lenders can issue terms within 24 hours and settle inside a week. If an intercreditor deed is required from the first mortgagee, timelines may stretch to several weeks.
 
Risks and Red Flags
Second mortgages are powerful but carry risks:
•	Exit slippage: delays in settlement or refinance increase costs and risk default.
•	Over-gearing: high combined LVRs leave little buffer against value falls.
•	Complex title structures: cross-collateralised securities or caveats can delay or block settlement.
•	Consent issues: if the first mortgagee refuses to sign an intercreditor deed, the second mortgage cannot proceed.
Mitigants include conservative gearing, contingency buffers in timing and costs, and early engagement with the first lender.
 
Alternatives to Consider
Second mortgages are not the only option:
•	Caveat loans provide smaller, faster facilities but are usually short-term.
•	Bridging loans are tied to dated settlements and can be cleaner for certain exits.
•	Invoice finance unlocks working capital from receivables without touching property.
•	Equity injections avoid debt altogether but may dilute ownership.
 
Conclusion
A second mortgage is a specialist tool for businesses that need short-term capital and have a clear path to repay. It is not cheap, and it is not permanent, but in the right situation it can unlock substantial value. Businesses should only proceed with a well-documented exit plan and, ideally, with advice from a broker experienced in the private lending market.
 
FAQs
What is a second mortgage for business?
A facility secured behind a first mortgage that provides short-term funding for business purposes, repaid from a defined exit.
How is it different from a caveat loan?
A second mortgage is fully registered on title, while a caveat is only a notice of interest. A caveat loan is faster but usually smaller and shorter-term.
What are typical LVRs?
Most lenders cap combined LVRs at 65–75%, depending on property type and exit quality.
How quickly can funds be accessed?
Private lenders can often settle in under a week with a clean file, but intercreditor requirements may extend timelines.
Can interest be capitalised?
Yes, many lenders allow it so businesses are not making monthly repayments. The balance increases, so a buffer should be built into the exit.
Are these consumer loans?
No. These facilities are for business purposes only and not for owner-occupied or personal use.
Is this advice?
No. This information is general only and does not consider your objectives, financial situation, or needs.
 
Glossary
LVR: Loan-to-Value Ratio, total loans divided by property value.
Exit: The dated cashflow event (sale, refinance, receivable) that repays the loan.
Priority deed: Agreement between first and second mortgagees setting ranking and enforcement rights.
Capitalised interest: Interest added to the loan balance instead of paid monthly.
 
Links to Related Guides
•	Caveat Loans vs Second Mortgages
•	Bridging Loans in Australia
•	Understanding LVRs and Priority Deeds

Article 2
Caveat Loans vs Second Mortgages: Which Works Best for Australian Businesses?
Emet Capital | Resources → Guides
Introduction
For Australian businesses seeking fast access to capital, two common private lending tools are caveat loans and second mortgages. At first glance, they may look similar — both are secured against real property, both can settle quickly, and both are often used when traditional bank finance is too slow. But there are important differences in structure, risk, cost, and use cases.
This guide breaks down the key distinctions between caveat loans and second mortgages, when each might make sense, what lenders look for, and the risks to be aware of. It also includes a worked example to show how the numbers play out in practice. The goal is to help business owners and directors understand how these tools can solve immediate funding challenges — without mistaking them for permanent financing. Information is general only, not financial or credit advice.
 
What Is a Caveat Loan?
A caveat loan is a short-term facility secured by lodging a caveat on the title of a property. A caveat is a legal notice that prevents dealings with the property without the lender's consent.
Because a caveat does not give the lender the same rights as a registered mortgage, it is considered a lighter-touch security. This makes caveat loans faster to set up — often within 24 to 48 hours — but also means they are generally smaller, shorter-term, and riskier for lenders.
Businesses often use caveat loans to cover very short cashflow gaps, such as paying a tax bill due in days or bridging a receivable.
 
What Is a Second Mortgage?
A second mortgage is a fully registered security on the property, ranking behind the first mortgage. This means the second lender's interest is formally recorded, and if the property is sold, the first mortgagee gets paid out first.
Because the second lender has clearer rights than a caveat holder, second mortgages can support larger facilities and longer terms — typically from several months to a year. They require more documentation and sometimes intercreditor agreements, which adds time, but they also provide more certainty for both borrower and lender.
 
Key Differences Between Caveat Loans and Second Mortgages
The distinctions can be summarised across four dimensions:
•	Speed: Caveat loans often settle in 1–3 days. Second mortgages usually take longer — a week or more if deeds or consents are needed.
•	Size: Caveat loans are typically smaller, often up to a few hundred thousand dollars. Second mortgages can extend to millions, depending on equity and LVR.
•	Term: Caveat loans are very short — weeks to a few months. Second mortgages may stretch to 6–12 months or beyond.
•	Security: Caveat loans only block dealings; second mortgages provide registered rights, which gives lenders more comfort.
 
When to Use a Caveat Loan
A caveat loan is most appropriate when:
•	Funding is needed in days, not weeks.
•	The required amount is relatively small.
•	The purpose is short-lived, such as covering a tax bill or urgent supplier payment.
•	The borrower plans to repay from a near-term receivable.
Example: A wholesaler has $150,000 in ATO arrears due within five days. They expect a $250,000 receivable to land in three weeks. A caveat loan may cover the shortfall quickly and be repaid once the receivable clears.
 
When to Use a Second Mortgage
A second mortgage is more suitable when:
•	The business needs larger sums (hundreds of thousands to millions).
•	The purpose will take several months to resolve (e.g., completing a project or bridging to a dated settlement).
•	There is sufficient equity and a credible exit such as a sale or refinance.
•	The business wants capitalised interest to avoid monthly repayments.
Example: A property developer requires $500,000 to finish works on an apartment project. With $2m of equity in another property and a dated sales contract in six months, a second mortgage is more appropriate than a caveat loan.
 
Costs and Risks Compared
Both caveat loans and second mortgages are more expensive than senior bank debt. Key points:
•	Interest rates: Caveat loans often carry higher monthly rates (2–4%) due to speed and risk. Second mortgages are lower (1–2% monthly) but run longer.
•	Fees: Establishment and legal fees apply to both, with caveat loans often having fewer upfront legal costs.
•	Risks: Caveat loans risk default if receivables don't arrive as expected. Second mortgages risk over-gearing if property values fall or exits slip.
 
Conclusion
Both caveat loans and second mortgages have a place in the Australian private lending market. Caveat loans are the sprint — fast, small, and short. Second mortgages are the middle-distance runner — slower to arrange, larger, and designed for multi-month timelines. Choosing the right tool depends on urgency, funding size, equity available, and the reliability of the exit. Businesses should use each carefully and only as part of a clear, short-term strategy.
 
FAQs
What is the main difference between a caveat loan and a second mortgage?
A caveat loan is secured by lodging a caveat, while a second mortgage is a registered mortgage that ranks behind the first. The latter gives stronger legal rights.
Which one is faster to arrange?
Caveat loans are usually faster — they can settle in as little as 24–48 hours. Second mortgages take longer due to legal and intercreditor steps.
Which one can fund larger amounts?
Second mortgages typically allow larger loan sizes because the lender's position on title is stronger.
Can interest be capitalised on both?
Often yes, but more common with second mortgages. Caveat loans may require short-term interest servicing depending on lender policy.
Which carries more risk for the borrower?
Both carry risks, but caveat loans can be especially risky if the planned exit (like a receivable) does not land on time, leading to rapid default.
Are they consumer loans?
No. Both are for business purposes only.
 
Glossary
Caveat: A legal notice on property title preventing dealings without the caveat holder's consent.
Second mortgage: A registered mortgage that ranks behind an existing first mortgage.
Intercreditor deed: An agreement between first and second mortgagees outlining enforcement priorities.
Capitalised interest: Interest added to the loan balance rather than paid monthly.
 
Links to Related Guides
•	Second Mortgage for Business in Australia
•	Bridging Loans in Australia
•	Invoice Finance vs Property Loans

Article 3
Bridging Loans in Australia: How They Help Businesses Manage Timing Gaps
Emet Capital | Resources → Guides
Introduction
Business timing doesn't always align neatly with cash flow. A property settlement might be weeks away while a supplier demands payment today. A contract milestone may trigger a receivable in 90 days, but staff and materials need funding now. These timing gaps are where bridging loans can play a vital role for Australian businesses.
A bridging loan is a short-term facility designed to provide liquidity until a clearly defined cash event occurs. It is not a substitute for long-term finance, but rather a specialist tool for covering urgent shortfalls when the exit is certain and dated. This article explains how bridging loans work, when they are used, the risks involved, and how they compare with alternatives such as caveat loans or second mortgages. Information provided is general only and not financial or credit advice.
 
What Is a Bridging Loan?
A bridging loan is a short-term facility secured by property, designed to "bridge" the gap between an outgoing cash obligation and an incoming cash inflow.
Unlike traditional loans, bridging finance is inherently temporary. The loan is advanced with the expectation of repayment from a specific event, such as:
•	The sale of a property.
•	The settlement of a contracted receivable.
•	The refinance of an existing facility once financials are in place.
Because they are structured around a dated exit, bridging loans are generally short in duration — often measured in weeks or a few months — and are priced accordingly.
 
When Businesses Use Bridging Loans
Bridging loans are particularly valuable when cash is needed now but repayment is clearly visible. Common use cases include:
•	Property settlement timing: Funding the purchase of one property before another has settled.
•	Project completion: Covering final construction or fit-out costs before a contracted settlement or progress claim.
•	ATO or regulatory payments: Paying arrears or obligations quickly to keep a project or contract alive while a longer-term refinance is prepared.
•	Short-term working capital: Financing payroll or inventory to secure an opportunity ahead of a dated receivable.
For example, a builder expecting a $1.5m receivable in 60 days may take a $400k bridging loan to cover subcontractors and materials. Once the receivable clears, the bridging facility is repaid.
 
Eligibility and Security Requirements
Bridging lenders typically require:
•	Property security: Residential, commercial, or industrial property, with conservative combined LVRs (often 65–70%).
•	Exit evidence: Sale contracts, receivable agreements, or refinance approvals.
•	Corporate borrower structure: Facilities are usually taken in the name of the trading entity, with directors' guarantees.
•	Supporting documents: Title searches, ASIC extracts, bank statements, and sometimes valuations.
Because bridging loans are short-term and exit-driven, lenders care less about historical financial performance than about the certainty of the exit.
 
Costs, Fees, and Terms
Bridging loans are more expensive than long-term bank finance, reflecting their short-term, urgent nature. Borrowers can expect:
•	Interest rates of 1–2% per month, sometimes higher depending on risk.
•	Establishment fees of 1–2% of the facility amount.
•	Legal and valuation costs payable by the borrower.
•	Terms of 1–6 months, occasionally up to 12 months if the exit is credible.
Worked Example
A transport business needs $600,000 to purchase fleet upgrades. A property sale is contracted to settle in four months with net proceeds of $1.8m.
•	Loan: $600,000 bridging loan.
•	Interest: 1.25% per month (capitalised).
•	Fees: 2% establishment = $12,000.
•	Total cost over 4 months ≈ $42,000.
Because the sale is dated and sufficient to cover the repayment, the bridging facility provides certainty without long-term commitments.
 
Risks and Red Flags
While bridging loans are effective, they carry risks if not managed carefully:
•	Exit slippage: If the sale or receivable is delayed, the facility may need extending at further cost.
•	Over-gearing: High LVRs leave little buffer against market movements or unexpected expenses.
•	Consent requirements: If a first mortgage exists, lender consent or a deed may be required, slowing settlement.
Mitigation involves conservative gearing, realistic exit assumptions, and building in timing buffers.
 
Alternatives to Consider
•	Caveat loans: Faster, smaller facilities for very short-term gaps.
•	Second mortgages: Larger facilities for 6–12 month purposes.
•	Invoice finance: Unlocks liquidity from receivables, avoiding property security.
•	Equity injections: Reduce reliance on debt where possible.
Each tool has its place; bridging loans sit in the middle for size and timeframe.
 
Conclusion
Bridging loans can be highly effective for Australian businesses dealing with short-term funding gaps. They provide certainty when the exit is clear and dated, allowing operations to continue smoothly. But they are costly and should never be used without a credible repayment plan. For directors, the key is to treat bridging loans as a temporary bridge — not as a permanent solution.
 
FAQs
What is a bridging loan?
A short-term loan secured by property, designed to cover funding gaps until a dated cash inflow occurs.
How long do bridging loans usually run?
Typically between 1 and 6 months, depending on the exit. Some stretch to 12 months if justified.
What are common uses for bridging loans?
Funding settlements, completing projects, paying urgent obligations, or covering working capital before receivables.
What are the risks?
Exit delays, over-gearing, and unexpected costs can cause default or high extensions.
Are bridging loans consumer loans?
No. They are business-purpose only and not suitable for owner-occupied or personal use.
Can interest be capitalised?
Yes, many lenders allow capitalisation so cashflow is not drained during the term.
 
Glossary
Bridging loan: A short-term facility covering the gap between outgoing and incoming cash flows.
Exit: The dated event (sale, receivable, refinance) that repays the loan.
LVR: Loan-to-Value Ratio; total debt secured against the property.
Capitalised interest: Interest rolled into the loan balance instead of paid monthly.
Settlement: The date when a contracted property or asset transaction legally completes.
 
Links to Related Guides
•	Second Mortgage for Business in Australia
•	Caveat Loans vs Second Mortgages
•	Invoice Finance vs Property Loans
"""

def main():
    """Process the Week 1 articles"""
    processor = WordArticleProcessor()
    
    try:
        print("🚀 Processing Emet Capital Week 1 Articles...")
        processed_files = processor.process_articles(WEEK1_CONTENT)
        
        print(f"\n✅ Successfully processed {len(processed_files)} articles:")
        for file_info in processed_files:
            print(f"   📄 {file_info['title']}")
            print(f"      → {file_info['filename']}")
        
        print(f"\n📁 Files created in: {processor.guides_path}")
        print("🔗 Interlinks database updated")
        
        return processed_files
        
    except Exception as e:
        print(f"❌ Error processing articles: {e}")
        return []

if __name__ == "__main__":
    main()
