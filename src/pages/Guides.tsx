import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Clock, ArrowRight, Star, Building2, FileText, Landmark, Wrench, Wallet, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { getContentFiles, type Article } from "@/lib/content";
import { generateCollectionPageSchema } from "@/lib/schema-utils";
import SEO from "@/components/SEO";

// Define guide categories with pillar guides and related service pages
interface GuideCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  pillarGuide: string;
  pillarTitle?: string;
  supportingGuides: string[];
  relatedService: string;
  relatedServiceTitle: string;
}

const guideCategories: GuideCategory[] = [
  {
    id: "bridging",
    title: "Bridging Finance",
    icon: <Building2 className="w-6 h-6" />,
    description: "Short-term property loans for time-sensitive opportunities, auctions, and settlement gaps. Learn when bridging finance makes sense and how to structure deals effectively.",
    pillarGuide: "bridging-finance-australia-complete-property-guide",
    supportingGuides: [
      "best-bridging-loan-lenders-companies-2025",
      "bridging-finance-developers-project-funding-solutions",
      "commercial-bridging-finance-auction-purchases",
      "commercial-bridging-loans-for-property-auctions-expert-guide",
      "commercial-bridging-loans-property-auctions-expert-guide",
      "short-term-property-loans-when-you-need-fast-finance"
    ],
    relatedService: "/services/bridging-finance",
    relatedServiceTitle: "Bridging Finance Services"
  },
  {
    id: "caveat",
    title: "Caveat Loans",
    icon: <FileText className="w-6 h-6" />,
    description: "Ultra-fast property-secured funding for urgent business needs. Understand how caveats work, typical costs, settlement timeframes, and when this financing option is appropriate.",
    pillarGuide: "caveat-loans-australia-complete-guide",
    supportingGuides: [
      "caveat-lenders-australia-directory-comparison",
      "caveat-loan-emergency-business-funding",
      "caveat-loans-for-property-settlement-bridge-your-purchase",
      "caveat-loans-vs-bank-loans-speed-comparison",
      "find-caveat-loan-brokers-australia",
      "quick-caveat-loans-48-hour-settlement-possible",
      "urgent-caveat-loans"
    ],
    relatedService: "/services/caveat-loans",
    relatedServiceTitle: "Caveat Loan Services"
  },
  {
    id: "mortgages",
    title: "First & Second Mortgages",
    icon: <Landmark className="w-6 h-6" />,
    description: "Comprehensive coverage of first and second mortgage options for business purposes. From equity access strategies to bad credit solutions and broker selection guides.",
    pillarGuide: "first-and-second-mortgages-for-business",
    supportingGuides: [
      "first-mortgage-loans-primary-property-finance",
      "second-mortgage-for-business",
      "second-mortgages-for-business-guide",
      "2nd-loan-mortgage-business-capital",
      "second-mortgage-bad-credit-qualify",
      "second-mortgage-lenders-australia-directory",
      "second-mortgage-loan-equity-access-strategies",
      "second-mortgage-partnership-buyout-financing-transitions",
      "how-to-find-second-mortgage-brokers-australia",
      "when-second-mortgages-make-financial-sense-smes",
      "understanding-secondary-mortgage-markets-australia"
    ],
    relatedService: "/services/first-second-mortgages",
    relatedServiceTitle: "First & Second Mortgage Services"
  },
  {
    id: "construction",
    title: "Construction & Development Finance",
    icon: <Wrench className="w-6 h-6" />,
    description: "Funding solutions for property development projects, from land acquisition through construction completion. Covers commercial, residential, and mixed-use developments.",
    pillarGuide: "construction-finance-australia-complete-guide",
    supportingGuides: [
      "building-development-loans-funding-guide",
      "commercial-property-development-finance",
      "commercial-land-loans-financing-property-development",
      "commercial-property-loans-australia-complete-guide",
      "commercial-property-loans-for-startups-first-time-buyers",
      "commercial-property-loans-for-immigrants-expats-australia",
      "commercial-property-loan-eligibility-what-you-need-to-qualify",
      "commercial-property-loan-retail-spaces-guide",
      "commercial-property-finance-rates-2025-comparison",
      "commercial-property-refinancing-solutions",
      "commercial-mortgages-vs-residential-key-differences-explained",
      "how-to-buy-commercial-property-step-by-step-guide",
      "owner-occupier-commercial-loans-buy-your-business-premises",
      "office-property-loans-financing-commercial-workspace",
      "industrial-property-finance-warehouses-manufacturing",
      "hospitality-property-finance-restaurants-hotels-venues",
      "mezzanine-finance-australia-complete-guide",
      "smsf-loans-for-commercial-property"
    ],
    relatedService: "/services/commercial-property-development",
    relatedServiceTitle: "Commercial Development Services"
  },
  {
    id: "asset",
    title: "Asset Finance",
    icon: <Building2 className="w-6 h-6" />,
    description: "Equipment finance, asset-backed lending, and leasing options for Australian businesses. Understand how to leverage existing assets or finance new equipment purchases.",
    pillarGuide: "asset-backed-lending-and-asset-finance",
    supportingGuides: [
      "equipment-finance-and-leasing-australia"
    ],
    relatedService: "/services/asset-finance",
    relatedServiceTitle: "Asset Finance Services"
  },
  {
    id: "working-capital",
    title: "Working Capital & Refinancing",
    icon: <Wallet className="w-6 h-6" />,
    description: "Cash flow solutions including invoice finance, debtor finance, trade finance, and debt consolidation. Plus comprehensive refinancing guides for better loan terms.",
    pillarGuide: "working-capital-loans-for-smes",
    supportingGuides: [
      "invoice-finance-australia-complete-guide",
      "debtor-finance-supply-chain-finance-australia",
      "trade-finance-in-australia-how-it-helps-businesses-manage-imports",
      "business-debt-consolidation-australia",
      "business-acquisition-finance-australia"
    ],
    relatedService: "/services/working-capital",
    relatedServiceTitle: "Working Capital Services"
  },
  {
    id: "private-lending",
    title: "Private Lending",
    icon: <RefreshCw className="w-6 h-6" />,
    description: "Understanding the private lending landscape in Australia. How to find, compare, and work with private lenders for commercial and property finance needs.",
    pillarGuide: "what-is-private-lending-australia",
    supportingGuides: [
      "finding-best-private-lenders-for-your-business",
      "finding-comparing-private-lenders-loans-2025-guide",
      "private-lenders-for-mortgages",
      "private-lenders-small-business-fast-approval-guide",
      "private-lenders-for-land-loans-alternative-financing",
      "private-commercial-real-estate-lenders-cre-directory",
      "private-real-estate-investment-lenders-guide",
      "short-term-private-lenders-fast-business-finance-solutions"
    ],
    relatedService: "/services/private-lending",
    relatedServiceTitle: "Private Lending Services"
  }
];

const Guides = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Guides" }
  ];

  const [expandedCategories, setExpandedCategories] = useState<string[]>(guideCategories.map(c => c.id));
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [articleMap, setArticleMap] = useState<Map<string, Article>>(new Map());

  useEffect(() => {
    const articles = getContentFiles('guides');
    setPublishedArticles(articles);
    
    const map = new Map<string, Article>();
    articles.forEach(article => {
      map.set(article.slug, article);
    });
    setArticleMap(map);
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getArticleBySlug = (slug: string): Article | undefined => {
    return articleMap.get(slug);
  };

  if (publishedArticles.length === 0) {
    return (
      <div className="min-h-screen py-8 flex flex-col items-center justify-center">
        <SEO 
          title="Commercial Lending Guides | Expert Business Finance Articles | Emet Capital"
          description="In-depth guides on commercial lending, bridging finance, caveat loans, first and second mortgages, construction finance, and more. Expert resources for Australian businesses."
          canonical="/resources/guides"
          keywords="commercial lending guides, business finance articles, bridging finance guide, caveat loans guide, second mortgage guide, construction finance guide"
        />
        <h1 className="text-2xl font-bold mb-4">Loading Guides...</h1>
        <p className="text-muted-foreground">If this persists, please check the console for errors.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <SEO 
        title="Commercial Lending Guides | Expert Business Finance Articles | Emet Capital"
        description="In-depth guides on commercial lending, bridging finance, caveat loans, first and second mortgages, construction finance, and more. Expert resources for Australian businesses."
        canonical="/resources/guides"
        keywords="commercial lending guides, business finance articles, bridging finance guide, caveat loans guide, second mortgage guide, construction finance guide"
        schemas={[generateCollectionPageSchema(
          "Commercial Lending Guides",
          "Comprehensive library of expert guides covering every aspect of commercial lending in Australia",
          "https://emetcapital.com.au/resources/guides",
          publishedArticles.length
        )]}
      />
      
      <div className="container mx-auto px-4">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header Section */}
        <header className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center">
            Commercial Lending Guide Library
          </h1>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-xl text-center mb-6">
              Welcome to Emet Capital's comprehensive resource library—your trusted source for understanding commercial finance in Australia.
            </p>
            <p className="text-center">
              Whether you're exploring <a href="#bridging" className="text-primary hover:underline">bridging finance</a> for a time-sensitive property purchase, 
              need to understand <a href="#caveat" className="text-primary hover:underline">caveat loans</a> for urgent funding, 
              or want to learn about <a href="#construction" className="text-primary hover:underline">construction finance</a> for your development project, 
              our expert-written guides provide the knowledge you need to make informed decisions.
            </p>
            <p className="text-center mt-4 text-sm">
              <strong>{publishedArticles.length} guides</strong> covering bridging finance, caveat loans, first &amp; second mortgages, 
              construction finance, asset finance, working capital, and private lending.
            </p>
          </div>
        </header>

        {/* Quick Navigation */}
        <nav className="mb-12 p-6 bg-muted rounded-xl" aria-label="Guide categories">
          <h2 className="text-lg font-semibold mb-4 text-center">Jump to Category</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {guideCategories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-lg border hover:border-primary hover:text-primary transition-colors"
              >
                {category.icon}
                <span>{category.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Category Sections */}
        <div className="space-y-12">
          {guideCategories.map((category) => {
            const pillarArticle = getArticleBySlug(category.pillarGuide);
            const isExpanded = expandedCategories.includes(category.id);
            
            return (
              <section 
                key={category.id} 
                id={category.id}
                className="scroll-mt-24"
              >
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-6 lg:p-8">
                    {/* Category Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                        <Link 
                          to={category.relatedService}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          Explore {category.relatedServiceTitle}
                        </Link>
                      </div>
                    </div>

                    {/* Pillar Guide - Featured */}
                    {pillarArticle && (
                      <div className="mb-6 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-5 h-5 text-accent" />
                          <span className="text-sm font-semibold text-accent">Complete Guide</span>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                          <Link 
                            to={`/resources/guides/${pillarArticle.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {pillarArticle.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {pillarArticle.description}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {pillarArticle.readingTime} min read
                            </span>
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                              {pillarArticle.category}
                            </span>
                          </div>
                          <Button asChild>
                            <Link to={`/resources/guides/${pillarArticle.slug}`}>
                              Read Complete Guide
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Supporting Guides Toggle */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 mb-4"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      {isExpanded ? "Hide" : "Show"} {category.supportingGuides.length} Supporting Guides
                    </button>

                    {/* Supporting Guides Grid */}
                    {isExpanded && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.supportingGuides.map((slug) => {
                          const article = getArticleBySlug(slug);
                          if (!article) return null;
                          
                          return (
                            <Link
                              key={slug}
                              to={`/resources/guides/${slug}`}
                              className="group p-4 bg-background rounded-lg border hover:border-primary hover:shadow-md transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {article.readingTime} min
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            );
          })}
        </div>

        {/* All Guides - For uncategorized or quick browse */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Browse All Guides
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Can't find what you're looking for? Browse our complete collection of {publishedArticles.length} guides.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {publishedArticles
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 12)
              .map((article) => (
                <Link
                  key={article.slug}
                  to={`/resources/guides/${article.slug}`}
                  className="group p-4 bg-muted rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary line-clamp-2 mb-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="bg-background px-2 py-0.5 rounded">{article.category}</span>
                    <span>{article.readingTime} min</span>
                  </div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" asChild>
              <Link to="/resources/guides#bridging">
                View All {publishedArticles.length} Guides by Category
              </Link>
            </Button>
          </div>
        </section>

        {/* Cross-links to Related Resources */}
        <section className="mt-16 py-12 bg-muted rounded-2xl">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              More Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/resources/case-studies" 
                className="p-6 bg-background rounded-xl border hover:border-primary hover:shadow-lg transition-all group"
              >
                <Building2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">Case Studies</h3>
                <p className="text-sm text-muted-foreground">
                  See real examples of how Australian businesses secured financing for their projects.
                </p>
              </Link>
              <Link 
                to="/tools" 
                className="p-6 bg-background rounded-xl border hover:border-primary hover:shadow-lg transition-all group"
              >
                <Wrench className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">Calculators & Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Estimate loan repayments and compare options with our interactive calculators.
                </p>
              </Link>
              <Link 
                to="/resources/faqs" 
                className="p-6 bg-background rounded-xl border hover:border-primary hover:shadow-lg transition-all group"
              >
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">FAQs</h3>
                <p className="text-sm text-muted-foreground">
                  Quick answers to common questions about commercial lending in Australia.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16 py-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Need Personalised Advice?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Our lending specialists can discuss your specific situation and recommend the right financing solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <Link to="/contact">Speak to an Expert</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href="tel:0485952651">Call 0485 952 651</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Guides;
