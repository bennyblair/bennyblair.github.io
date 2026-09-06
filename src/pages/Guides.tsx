import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import DirectoryFilters from "@/components/DirectoryFilters";
import { getContentSummaries } from "@/lib/content";
import { generateCollectionPageSchema } from "@/lib/schema-utils";
import SEO from "@/components/SEO";
import { normalizeGuideQuery, searchGuides } from "@/lib/guide-search";

const Guides = () => {
  const breadcrumbItems = [{label: "Home", href: "/"}, {label: "Resources", href: "/resources"}, {label: "Guides"}];
  const [selectedCategory, setSelectedCategory] = useState(() => typeof document === "undefined" ? "All" : (document.getElementById("guide-category") as HTMLSelectElement | null)?.value || "All");
  const [searchQuery, setSearchQuery] = useState(() => typeof document === "undefined" ? "" : (document.getElementById("guide-search") as HTMLInputElement | null)?.value || "");
  const hasSearch = normalizeGuideQuery(searchQuery).length > 0;
  const publishedArticles = getContentSummaries("guides");
  const latestArticle = publishedArticles[0] ?? null;
  const featuredGuide = publishedArticles.find(article => article.slug === "second-mortgage-for-business-australia");
  const isNewArticle = (date: string) => Math.ceil(Math.abs(Date.now() - new Date(date).getTime()) / 86400000) <= 7;
  const categories = ["All", ...Array.from(new Set(publishedArticles.map(article => article.category))).sort()];
  const matchingArticles = searchGuides(publishedArticles, searchQuery, selectedCategory);
  const picks = [{article: latestArticle, label: "Latest Guide", action: "Read Latest Guide"}, {article: featuredGuide, label: "Featured Guide", action: "Read Complete Guide"}].filter(pick => pick.article);
  const showPicks = selectedCategory === "All" && !hasSearch;
  const directoryArticles = matchingArticles.filter(article => !showPicks || !picks.some(pick => pick.article?.slug === article.slug));
  const guideCategoryHighlights = [
    {
      title: "Property-backed short-term finance",
      description: "Guides covering caveat loans, bridging finance, second mortgages and refinance gaps where timing, security position and exit strategy need to be assessed carefully.",
      links: [
        { label: "Caveat loans guide", url: "/resources/guides/caveat-loans-australia-complete-guide" },
        { label: "Urgent caveat loans", url: "/resources/guides/urgent-caveat-loans" },
        { label: "Bridging finance guide", url: "/resources/guides/bridging-finance-australia-complete-property-guide" }
      ]
    },
    {
      title: "Commercial property finance",
      description: "Practical explainers for business owners and investors comparing deposits, lender assessment, serviceability, commercial property LVR and settlement readiness.",
      links: [
        { label: "Commercial property finance Sydney", url: "/resources/guides/commercial-property-finance-sydney-local-expert-hub" },
        { label: "Commercial property LVR", url: "/resources/guides/commercial-property-lvr-explained-maximise-your-borrowing" },
        { label: "Commercial refinance after bank decline", url: "/resources/guides/commercial-property-refinance-after-a-bank-decline-in-australia" }
      ]
    },
    {
      title: "Business cash flow and asset funding",
      description: "Resources for businesses weighing working capital, trade finance, inventory, equipment and asset-backed structures where documents and repayment path matter.",
      links: [
        { label: "Working capital loans", url: "/resources/guides/working-capital-loans-for-smes" },
        { label: "Trade finance in Australia", url: "/resources/guides/trade-finance-in-australia-how-it-helps-businesses-manage-imports" },
        { label: "Asset-backed lending guide", url: "/resources/guides/asset-backed-lending-and-asset-finance" }
      ]
    }
  ];

  return <div className="guides-page min-h-screen py-8">
      <SEO 
        title="Commercial Lending Guides | Expert Business Finance Articles | Emet Capital"
        description="In-depth guides on commercial lending, bridging finance, asset finance, development loans and more. Expert advice for Australian businesses seeking funding."
        canonical="/resources/guides"
        keywords="commercial lending guides, business finance articles, bridging finance guide, asset finance guide, development finance guide"
      />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateCollectionPageSchema(
          "Commercial Lending Guides",
          "Expert-written guides to help you navigate every aspect of commercial lending in Australia",
          "https://emetcapital.com.au/resources/guides",
          publishedArticles.length
        ))}
      </script>
      
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="page-header directory-header">
        <h1>Commercial Lending Guides</h1>
        <p>Expert-written guides to help you navigate every aspect of commercial lending in Australia. From beginner basics to advanced strategies.</p>
      </header>
      <section className="guide-finder" aria-label="Find a guide">
        <div className="guide-search" role="search" aria-label="Search finance guides">
          <label htmlFor="guide-search">Search guides</label>
          <div className="guide-search-field">
            <Search aria-hidden="true" />
            <input id="guide-search" type="search" placeholder="Try bridging finance, equipment or SMSF" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} aria-controls="guide-results" />
            {searchQuery && <button type="button" aria-label="Clear search" onClick={() => { setSearchQuery(""); document.getElementById("guide-search")?.focus(); }}><X aria-hidden="true" /></button>}
          </div>
        </div>
        <DirectoryFilters id="guide-category" label="Browse by topic" value={selectedCategory} options={categories.map(label => ({label, count: label === "All" ? publishedArticles.length : publishedArticles.filter(article => article.category === label).length}))} count={matchingArticles.length} noun="guides" onChange={setSelectedCategory} />
        <noscript><p className="guide-search-help">Search and topic filtering require JavaScript. Every guide is listed below.</p></noscript>
      </section>
      <details className="directory-guidance">
        <summary>Choosing a finance guide <span aria-hidden="true">+</span></summary>
        <section className="mb-12">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Find the right guide for the finance decision in front of you
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These resources are written for business-purpose borrowers, property investors, developers, accountants and advisers who need plain-English context before comparing lender options. They explain what lenders usually assess, which documents matter, where short-term finance can become risky, and when another structure may be more suitable. The guides are general information only and should be read alongside professional advice for your circumstances.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {guideCategoryHighlights.map((group) => (
              <Card key={group.title} className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{group.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{group.description}</p>
                  <ul className="space-y-2 text-sm">
                    {group.links.map((link) => (
                      <li key={link.url}>
                        <Link to={link.url} className="text-primary hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </details>
      {showPicks && <div className="editorial-picks">
        {picks.map(({article, label, action}) => article && <article className="editorial-pick" key={label}>
          <div className="editorial-pick-label"><span>{label}</span>{isNewArticle(article.date) && <span className="new-label">NEW</span>}</div>
          <h2><Link to={`/resources/guides/${article.slug}`}>{article.title}</Link></h2>
          <p>{article.description}</p>
          <div className="directory-meta"><span>{article.category}</span><span>{article.readingTime} min read</span>{label === "Latest Guide" && <time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-AU', {year:'numeric',month:'long',day:'numeric'})}</time>}</div>
          <Link className="text-link" to={`/resources/guides/${article.slug}`}>{action}<ArrowUpRight aria-hidden="true" /></Link>
        </article>)}
      </div>}
      <div className="guide-directory" id="guide-results">
        {matchingArticles.length === 0 && <div className="guide-search-empty">
          <h2>No guides found</h2>
          <p>Try a broader term such as “property” or “business”, or clear your search and topic filter.</p>
          <button type="button" className="text-link" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); document.getElementById("guide-search")?.focus(); }}>Reset search and topic <ArrowUpRight aria-hidden="true" /></button>
        </div>}
        {directoryArticles.map(article => <article className="guide-directory-entry" key={article.slug}>
          <div className="guide-entry-meta"><span>{article.category}</span>{isNewArticle(article.date) && <span className="new-label">NEW</span>}<span>{article.readingTime} min read</span><time dateTime={article.date}>{new Date(article.date).toLocaleDateString('en-AU', {month:'short',day:'numeric'})}</time></div>
          <div className="guide-entry-copy"><h3><Link to={`/resources/guides/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p></div>
          <Link className="guide-entry-action text-link" to={`/resources/guides/${article.slug}`}>Read Guide <ArrowUpRight aria-hidden="true" /></Link>
        </article>)}
      </div>
        {/* Call to Action */}
        <section className="interior-enquiry text-center mt-16 py-12 bg-muted rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our lending specialists are here to help with information tailored to your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
              >
                <Link to="/contact">Ask Our Experts</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources/faqs">Browse FAQs</Link>
              </Button>
            </div>
          </div>
        </section>
    </div>
  </div>;
};
export default Guides;
