import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { markdownToHtml } from "@/lib/markdown";
import { isArticleComingSoon } from "@/lib/content";

// Direct content embedding - bypassing all import issues
interface StaticArticle {
  title: string;
  date: string;
  description: string;
  category: string;
  author: string;
  readingTime: number;
  content: string;
}

const STATIC_CONTENT: Record<string, StaticArticle> = {
  'fast-business-funding': {
    title: 'How to Secure Fast Business Funding in Australia: A Complete Guide',
    date: '2025-09-17T06:00:00Z',
    description: 'In today\'s competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away.',
    category: 'Business Funding',
    author: 'Emet Capital Editorial Team',
    readingTime: 10,
    content: `# How to Secure Fast Business Funding in Australia: A Complete Guide

In today's competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away. Whether you're looking to expand operations, manage cash flow, or invest in new equipment, understanding your fast funding options is crucial for Australian businesses.

## What is Fast Business Funding?

Fast business funding refers to financing solutions that can be approved and disbursed quickly, typically within 24-48 hours to a few weeks. Unlike traditional bank loans that may take months to process, fast funding options are designed for businesses that need immediate capital injection.

## Types of Fast Business Funding Available

### Asset-Based Lending

Asset-based lending allows businesses to borrow against their existing assets, including property, equipment, or inventory. This type of funding is often processed faster because the collateral reduces lender risk.

### Bridging Loans

Bridging loans provide short-term financing to bridge timing gaps, such as when purchasing new premises before selling existing property. These loans can often be approved within days.

### Caveat Loans

Caveat loans are secured against property and can be processed extremely quickly, sometimes within 24 hours. They're ideal for businesses needing immediate capital for time-sensitive opportunities.

### Alternative Lenders

Non-bank lenders often have more flexible criteria and faster approval processes than traditional banks, making them popular for urgent funding needs.

## When to Consider Fast Funding

Fast funding solutions are most appropriate when:
• Time-sensitive business opportunities arise
• Cash flow gaps need immediate attention
• Equipment purchases can't wait for lengthy approval processes
• Property settlements require quick bridging finance
• Emergency business expenses occur

## Benefits of Fast Business Funding

### Speed Of Approval

The primary advantage is rapid access to capital, with some lenders providing approval within hours rather than weeks or months.

### Flexible Criteria

Fast funding providers often have more flexible lending criteria, considering factors beyond just credit scores and financial statements.

### Opportunity Capitalisation

Quick access to funds allows businesses to act on time-sensitive opportunities that traditional lending timeframes would prevent.

### Cash Flow Management

Fast funding can help businesses manage seasonal fluctuations or unexpected expenses without disrupting operations.

## Requirements for Fast Funding

While fast funding has fewer requirements than traditional loans, applicants typically need:
• Valid ABN and business registration
• Proof of income or business revenue
• Asset documentation (for secured loans)
• Basic business financial information

## How to Apply for Fast Business Funding

### Assess Your Needs

Determine exactly how much funding you need and for what purpose. This clarity helps lenders process applications faster.

### Gather Documentation

Prepare basic business documents, financial statements, and asset information to expedite the application process.

### Choose The Right Lender

Research lenders who specialise in your type of business and funding requirements. Some focus on specific industries or loan types.

### Submit Your Application

Complete applications accurately and provide all requested information upfront to avoid delays in processing.

### Review Terms Carefully

Fast funding often comes with higher interest rates, so ensure you understand all terms and can meet repayment obligations.

## Costs and Considerations

Fast business funding typically involves:
• Higher interest rates than traditional bank loans
• Additional fees for expedited processing
• Shorter repayment terms
• More stringent default consequences

However, the speed and flexibility often justify these costs when urgent funding is needed.

## Choosing the Right Fast Funding Solution

Consider these factors when selecting fast funding:
• Your specific business needs and timeline
• Available collateral or assets
• Repayment capacity and terms
• Lender reputation and transparency
• Total cost of the funding solution

## Alternative Fast Funding Options

### Invoice Factoring

Sell outstanding invoices to access immediate cash flow, though this isn't technically a loan.

### Merchant Cash Advances

Receive upfront cash in exchange for a percentage of future sales, though rates can be very high.

### Peer-To-Peer Lending

Online platforms connecting businesses with individual investors, offering potentially faster approval than banks.

## Conclusion

Fast business funding can be a valuable tool for Australian businesses needing immediate capital. While these solutions come at a premium compared to traditional financing, the speed and flexibility they offer can be crucial for capitalising on opportunities or managing urgent business needs.

The key is understanding your options, choosing reputable lenders, and ensuring any funding solution aligns with your business's capacity to repay. When used strategically, fast funding can help businesses grow and thrive in competitive markets.

## Frequently Asked Questions

### How fast can I get business funding approved?

Approval times vary by lender and loan type, but some fast funding solutions can be approved within 24 hours. Caveat loans and asset-based lending typically offer the fastest approval times.

### What's the difference between fast funding and traditional bank loans?

Fast funding prioritises speed over lengthy due diligence processes. While traditional bank loans may offer lower rates, they typically take weeks or months to approve, whereas fast funding can be accessed within days.

### Do I need perfect credit for fast business funding?

Not necessarily. Many fast funding providers focus more on business assets, cash flow, and repayment capacity rather than just credit scores. However, better credit will typically result in more favourable terms.

### What are the typical interest rates for fast business funding?

Interest rates for fast funding are generally higher than traditional bank loans, often ranging from 8% to 25% annually, depending on the risk profile and loan type.

### Can I use fast funding for any business purpose?

Most fast funding can be used for legitimate business purposes, including equipment purchases, working capital, property investments, or business expansion. Some lenders may have restrictions on certain uses.

## Glossary

**Asset-Based Lending**: Financing secured against business assets such as property, equipment, or inventory.

**Bridging Loan**: Short-term financing used to bridge timing gaps, often in property transactions.

**Caveat Loan**: A secured loan where a legal notice (caveat) is placed on property title as security.

**Due Diligence**: The investigation and verification process lenders undertake before approving loans.

**Merchant Cash Advance**: Upfront cash provided in exchange for a percentage of future business sales.`
  },
  'how-to-secure-fast-business-funding-in-australia-a-complete-guide': {
    title: 'How to Secure Fast Business Funding in Australia: A Complete Guide',
    date: '2025-09-17T06:00:00Z',
    description: 'In today\'s competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away.',
    category: 'Business Funding',
    author: 'Emet Capital Editorial Team',
    readingTime: 10,
    content: `# How to Secure Fast Business Funding in Australia: A Complete Guide

In today's competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away. Whether you're looking to expand operations, manage cash flow, or invest in new equipment, understanding your fast funding options is crucial for Australian businesses.

## What is Fast Business Funding?

Fast business funding refers to financing solutions that can be approved and disbursed quickly, typically within 24-48 hours to a few weeks. Unlike traditional bank loans that may take months to process, fast funding options are designed for businesses that need immediate capital injection.

## Types of Fast Business Funding Available

### Asset-Based Lending

Asset-based lending allows businesses to borrow against their existing assets, including property, equipment, or inventory. This type of funding is often processed faster because the collateral reduces lender risk.

### Bridging Loans

Bridging loans provide short-term financing to bridge timing gaps, such as when purchasing new premises before selling existing property. These loans can often be approved within days.

### Caveat Loans

Caveat loans are secured against property and can be processed extremely quickly, sometimes within 24 hours. They're ideal for businesses needing immediate capital for time-sensitive opportunities.

### Alternative Lenders

Non-bank lenders often have more flexible criteria and faster approval processes than traditional banks, making them popular for urgent funding needs.

## When to Consider Fast Funding

Fast funding solutions are most appropriate when:
• Time-sensitive business opportunities arise
• Cash flow gaps need immediate attention
• Equipment purchases can't wait for lengthy approval processes
• Property settlements require quick bridging finance
• Emergency business expenses occur

## Benefits of Fast Business Funding

### Speed Of Approval

The primary advantage is rapid access to capital, with some lenders providing approval within hours rather than weeks or months.

### Flexible Criteria

Fast funding providers often have more flexible lending criteria, considering factors beyond just credit scores and financial statements.

### Opportunity Capitalisation

Quick access to funds allows businesses to act on time-sensitive opportunities that traditional lending timeframes would prevent.

### Cash Flow Management

Fast funding can help businesses manage seasonal fluctuations or unexpected expenses without disrupting operations.

## Requirements for Fast Funding

While fast funding has fewer requirements than traditional loans, applicants typically need:
• Valid ABN and business registration
• Proof of income or business revenue
• Asset documentation (for secured loans)
• Basic business financial information

## How to Apply for Fast Business Funding

### Assess Your Needs

Determine exactly how much funding you need and for what purpose. This clarity helps lenders process applications faster.

### Gather Documentation

Prepare basic business documents, financial statements, and asset information to expedite the application process.

### Choose The Right Lender

Research lenders who specialise in your type of business and funding requirements. Some focus on specific industries or loan types.

### Submit Your Application

Complete applications accurately and provide all requested information upfront to avoid delays in processing.

### Review Terms Carefully

Fast funding often comes with higher interest rates, so ensure you understand all terms and can meet repayment obligations.

## Costs and Considerations

Fast business funding typically involves:
• Higher interest rates than traditional bank loans
• Additional fees for expedited processing
• Shorter repayment terms
• More stringent default consequences

However, the speed and flexibility often justify these costs when urgent funding is needed.

## Choosing the Right Fast Funding Solution

Consider these factors when selecting fast funding:
• Your specific business needs and timeline
• Available collateral or assets
• Repayment capacity and terms
• Lender reputation and transparency
• Total cost of the funding solution

## Alternative Fast Funding Options

### Invoice Factoring

Sell outstanding invoices to access immediate cash flow, though this isn't technically a loan.

### Merchant Cash Advances

Receive upfront cash in exchange for a percentage of future sales, though rates can be very high.

### Peer-To-Peer Lending

Online platforms connecting businesses with individual investors, offering potentially faster approval than banks.

## Conclusion

Fast business funding can be a valuable tool for Australian businesses needing immediate capital. While these solutions come at a premium compared to traditional financing, the speed and flexibility they offer can be crucial for capitalising on opportunities or managing urgent business needs.

The key is understanding your options, choosing reputable lenders, and ensuring any funding solution aligns with your business's capacity to repay. When used strategically, fast funding can help businesses grow and thrive in competitive markets.

## Frequently Asked Questions

### How fast can I get business funding approved?

Approval times vary by lender and loan type, but some fast funding solutions can be approved within 24 hours. Caveat loans and asset-based lending typically offer the fastest approval times.

### What's the difference between fast funding and traditional bank loans?

Fast funding prioritises speed over lengthy due diligence processes. While traditional bank loans may offer lower rates, they typically take weeks or months to approve, whereas fast funding can be accessed within days.

### Do I need perfect credit for fast business funding?

Not necessarily. Many fast funding providers focus more on business assets, cash flow, and repayment capacity rather than just credit scores. However, better credit will typically result in more favourable terms.

### What are the typical interest rates for fast business funding?

Interest rates for fast funding are generally higher than traditional bank loans, often ranging from 8% to 25% annually, depending on the risk profile and loan type.

### Can I use fast funding for any business purpose?

Most fast funding can be used for legitimate business purposes, including equipment purchases, working capital, property investments, or business expansion. Some lenders may have restrictions on certain uses.

## Glossary

**Asset-Based Lending**: Financing secured against business assets such as property, equipment, or inventory.

**Bridging Loan**: Short-term financing used to bridge timing gaps, often in property transactions.

**Caveat Loan**: A secured loan where a legal notice (caveat) is placed on property title as security.

**Due Diligence**: The investigation and verification process lenders undertake before approving loans.

**Merchant Cash Advance**: Upfront cash provided in exchange for a percentage of future business sales.`
  },
  'bridging-loan': {
    title: 'Commercial Bridging Finance: Bridging Loan Guide — Costs, Timing, Uses',
    date: '2025-09-11T06:00:00Z',
    description: 'Australian commercial guide on bridging loans: when to use them, eligibility, pricing and how we arrange them with lenders.',
    category: 'Bridging Finance',
    author: 'Emet Capital Editorial Team',
    readingTime: 8,
    content: `# Commercial Bridging Finance: Bridging Loan Guide — Costs, Timing, Uses

*Discuss your funding plan with a broker (commercial only).*

## bridging loan guide: quick overview

If you're weighing up bridging loan options for your business, this guide breaks down how it works in Australia, when it's useful, what it costs, and how we structure it with lenders.

**What is a bridging loan?** It's a commercial finance solution used by Australian businesses. We arrange and negotiate terms with lenders, then coordinate credit and settlement.

## When to use it (Australian SMEs)

- Time‑sensitive transactions (deadlines, settlements, supplier payments)
- Funding tied to a clear exit (sale, refinance, receivables, progress claim)
- Working capital gaps (seasonality, stock build, long debtor terms)
- Where property, invoices, inventory or plant & equipment can support the facility

## Rates, fees & typical terms

| Interest | 0.8%–1.8% per month (interest-only) |
|----------|-------------------------------------|
| Term | 1–12 months (extensions possible) |
| LVR / Advance | Up to ~70% 1st mortgage; ~55–65% 2nd (asset/val dependent) |
| Security | 1st/2nd mortgage over investment or commercial property; caveat |
| Typical fees | Establishment 1.5%–3.5% + legal/valuation |

These are indicative only and vary by lender, asset quality and exit.

## Eligibility & documents

- ABN & photo ID
- Rates notice & title search
- Purpose & exit strategy
- Assets & liabilities
- Leases (if income-supporting)
- Valuation (if required)

## Process & timelines

1. **Outline objectives & exit**
2. **Price/structure options**
3. **Credit pack & conditions**
4. **Signing**
5. **Funding**

**Case vignette.** NSW wholesaler used *bridging loan financing* to raise $1,200,000. Structure: approx 65% LVR, 6-month term. Indicative terms in 24–48h; settlement in 7 business days. Fees: 3.0% establishment + legals. Security and pricing always depend on the asset and exit.

## FAQs

**Is bridging loan financing regulated under NCCP in Australia?**
For business‑purpose loans, NCCP consumer credit rules generally do not apply. We arrange commercial finance only.

**How fast can funding be arranged?**
Indicative terms are often achievable in 24–48 hours for straightforward scenarios. Settlement timing depends on security, docs and valuation.

**What security is usually required?**
Commonly 1st/2nd mortgage over investment or commercial property; caveat. The exact structure is lender‑ and asset‑dependent.

*Emet Capital acts as a commercial finance broker and does not provide consumer credit. Information is general and for Australian business borrowers.*`
  },
  'no-doc-abn-loans': {
    title: 'No Doc ABN Loans — Commercial Property Lending in Australia',
    date: '2025-09-12T06:00:00Z',
    description: 'Australian commercial guide on no doc abn loans: when to use it, eligibility, pricing and how we arrange it with lenders.',
    category: 'Commercial Property Loans',
    author: 'Emet Capital Editorial Team',
    readingTime: 10,
    content: `# No Doc ABN Loans — Commercial Property Lending in Australia

*Discuss your funding plan with a broker (commercial only).*

## no doc abn loans: quick overview

Thinking about no doc abn loans? Below we cover the practical bits—use‑cases, eligibility, typical pricing, timelines—and the way we arrange it with credit teams.

**What is no doc abn loans?** It's a commercial finance solution used by Australian businesses. We arrange and negotiate terms with lenders, then coordinate credit and settlement.

## When to use it (Australian SMEs)

- Time‑sensitive transactions (deadlines, settlements, supplier payments)
- Funding tied to a clear exit (sale, refinance, receivables, progress claim)
- Working capital gaps (seasonality, stock build, long debtor terms)
- Where property, invoices, inventory or plant & equipment can support the facility

## Rates, fees & typical terms

| Interest | Variable; bank 6%–9% p.a. typical range; alt/privates higher |
|----------|--------------------------------------------------------------|
| Term | 1–5 years (IO or P&I) |
| LVR / Advance | Up to ~65%–75% depending on lender/asset/lease WALE |
| Security | 1st mortgage over commercial/industrial/retail property |
| Typical fees | Application/establishment 0.5%–2% + legal/valuation |

These are indicative only and vary by lender, asset quality and exit.

## Eligibility & documents

- ABN & photo ID
- Lease docs & WALE
- Rent roll/outgoings
- Financials or BAS
- Rates notice
- Valuation instructions

## Process & timelines

1. **Initial call & data room**
2. **Term sheet negotiation**
3. **Due diligence & security**
4. **Final docs**
5. **Settlement**

**Case vignette.** NSW wholesaler used *no doc abn loans* to raise $600,000. Structure: approx 75% LVR, 36-month term. Indicative terms in 24–48h; settlement in 3 weeks. Fees: 1.5% establishment + legals. Security and pricing always depend on the asset and exit.`
  }
};

const SimpleGuideArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkArticle = async () => {
      if (!slug) return;
      
      // Check if article exists in our static content
      if (STATIC_CONTENT[slug]) {
        setLoading(false);
        return;
      }
      
      // Determine content type from current URL path
      const currentPath = window.location.href;
      let contentType: 'guides' | 'case-studies' | 'insights' | 'tools' = 'guides';
      
      if (currentPath.includes('/case-studies/')) {
        contentType = 'case-studies';
      } else if (currentPath.includes('/insights/')) {
        contentType = 'insights';
      } else if (currentPath.includes('/tools/')) {
        contentType = 'tools';
      } else {
        contentType = 'guides'; // default
      }
      
      // Check if it's a coming soon article
      // First check hardcoded list of known scheduled articles
      const knownScheduledSlugs = [
        'bridging-finance-for-property-development',
        'mortgage-rates-for-second-mortgage', 
        'short-term-property-finance',
        'short-term-property-loans',
        'short-term-property-funding',
        'short-term-property-loan',
        'commercial-bridging-loan',
        'bridging-loan-for-property-development',
        'low-doc-business-finance',
        'no-doc-short-term-mortgages',
        '10000-small-business-grant-nsw',
        '2nd-mortgage-australia',
        '2nd-mortgage-lenders',
        '2nd-mortgage-loan',
        '2nd-mortgages-with-bad-credit',
        'abn-auto-loan-brisbane',
        'abn-car-finance-adelaide',
        'abn-car-finance-brisbane',
        'abn-car-finance-melbourne',
        'abn-car-finance-sydney',
        'abn-car-lease',
        'abn-holder-car-finance',
        'abn-holder-loans'
      ];
      
      console.log(`Checking slug: ${slug}, in scheduled list: ${knownScheduledSlugs.includes(slug)}`);
      
      if (knownScheduledSlugs.includes(slug)) {
        console.log(`Setting Coming Soon for: ${slug}`);
        setIsComingSoon(true);
        setLoading(false);
        return;
      }
      
      // Also try the CSV-based check as backup
      try {
        const comingSoon = await isArticleComingSoon(slug);
        console.log(`CSV Coming Soon check for ${slug}:`, comingSoon);
        if (comingSoon) {
          setIsComingSoon(true);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn('CSV Coming Soon check failed:', error);
      }
      
      setLoading(false);
    };
    
    checkArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show "Coming Soon" page
  if (isComingSoon && !STATIC_CONTENT[slug]) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Guides", href: "/resources/guides" },
            { label: "Coming Soon" }
          ]} />

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Coming Soon</h1>
              <p className="text-xl text-muted-foreground mb-6">
                This article is currently being prepared and will be available soon.
              </p>
              <p className="text-muted-foreground">
                Check back later or{" "}
                <a href="/contact" className="text-primary hover:underline">
                  contact us
                </a>{" "}
                if you have specific questions about this topic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Direct lookup - no complex loading logic  
  const article = slug ? STATIC_CONTENT[slug] : null;
  
  if (!loading && !article && !isComingSoon) {
    // For now, show Coming Soon for any missing article instead of Article Not Found
    // This ensures scheduled articles show the right message
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Guides", href: "/resources/guides" },
            { label: "Coming Soon" }
          ]} />

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">Coming Soon</h1>
              <p className="text-xl text-muted-foreground mb-6">
                This article is currently being prepared and will be available soon.
              </p>
              <p className="text-muted-foreground">
                Check back later or{" "}
                <a href="/contact" className="text-primary hover:underline">
                  contact us
                </a>{" "}
                if you have specific questions about this topic.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Guides", href: "/resources/guides" },
          { label: article.title }
        ]} />

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {article.description}
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>{article.author}</span>
            <span>{article.readingTime} min read</span>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="mb-12">
          <div 
            className="
              prose prose-lg prose-slate max-w-none 
              prose-headings:scroll-mt-20 
              prose-h1:text-3xl prose-h1:font-bold prose-h1:text-foreground prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
              prose-h2:text-2xl prose-h2:font-bold prose-h2:text-foreground prose-h2:mb-5 prose-h2:mt-10 prose-h2:leading-tight prose-h2:border-b prose-h2:border-border/20 prose-h2:pb-2
              prose-h3:text-xl prose-h3:font-bold prose-h3:text-foreground prose-h3:mb-4 prose-h3:mt-8 prose-h3:leading-tight
              prose-p:text-muted-foreground prose-p:mb-6 prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ul:mb-8 prose-ul:space-y-2
              prose-ol:text-muted-foreground prose-ol:mb-8 prose-ol:space-y-2
              prose-li:leading-relaxed prose-li:mb-2
              prose-table:w-full prose-table:border-collapse prose-table:mb-8 prose-table:rounded-lg prose-table:overflow-hidden prose-table:border prose-table:border-border/20 prose-table:shadow-sm
              prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-semibold prose-th:text-foreground prose-th:bg-muted/30 prose-th:border-b-2 prose-th:border-primary/20
              prose-td:px-6 prose-td:py-4 prose-td:text-muted-foreground prose-td:border-b prose-td:border-border/20
            "
            dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} 
          />
        </article>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Discuss Your Funding Requirements?</h3>
            <p className="text-lg mb-6 opacity-90">
              Our commercial lending specialists are here to help structure the right solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Your Quote
              </a>
              <a 
                href="tel:0485952651" 
                className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Call 0485 952 651
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleGuideArticle;
