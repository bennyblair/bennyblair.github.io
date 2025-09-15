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
      try {
        const comingSoon = await isArticleComingSoon(contentType, slug);
        console.log(`Coming Soon check for ${slug}:`, comingSoon);
        if (comingSoon) {
          setIsComingSoon(true);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.warn('Coming Soon check failed:', error);
        
        // Fallback: Check against hardcoded list of known scheduled articles
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
          '2nd-mortgages-with-bad-credit'
        ];
        
        if (knownScheduledSlugs.includes(slug)) {
          setIsComingSoon(true);
          setLoading(false);
          return;
        }
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
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: "Guides", href: "/resources/guides" },
            { label: "Article Not Found" }
          ]} />
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist or has been moved.</p>
          </div>
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
