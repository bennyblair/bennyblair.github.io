import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen, Clock, User, Filter, Star, CheckCircle } from "lucide-react";
import { getContentFiles, type Article } from "@/lib/content";

const Guides = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [latestArticle, setLatestArticle] = useState<Article | null>(null);
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load published articles from content system
    const articles = getContentFiles('guides');
    setPublishedArticles(articles);
    
    // Get the most recent article for hero section
    if (articles.length > 0) {
      const latest = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      setLatestArticle(latest);
    }
  }, []);

  // Helper function to check if article is "new" (within 7 days)
  const isNewArticle = (date: string) => {
    const articleDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - articleDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const categories = [
    "All",
    "Asset Finance",
    "Development Finance", 
    "Property Finance",
    "Working Capital",
    "Trade Finance",
    "Getting Started"
  ];

  const guides = [
    {
      title: "Complete Guide to Bridging Finance in Australia",
      excerpt: "Master bridging loans with our comprehensive guide covering everything from basics to advanced strategies, including real examples and expert tips.",
      category: "Property Finance",
      readTime: "12 min",
      featured: true,
      slug: "bridging-finance-complete-guide"
    },
    {
      title: "Asset Finance vs Equipment Leasing: Which is Right for You?",
      excerpt: "Compare asset finance options and equipment leasing to make the best decision for your business equipment needs.",
      category: "Asset Finance",
      readTime: "8 min",
      featured: false,
      slug: "asset-finance-vs-equipment-leasing"
    },
    {
      title: "Development Finance: From Application to Settlement",
      excerpt: "Step-by-step guide to securing development finance in Australia, including documentation, timelines, and common pitfalls.",
      category: "Development Finance",
      readTime: "15 min",
      featured: false,
      slug: "development-finance-application-guide"
    },
    {
      title: "Working Capital Solutions for Growing Businesses",
      excerpt: "Explore flexible working capital options including lines of credit, invoice finance, and trade facilities.",
      category: "Working Capital",
      readTime: "10 min",
      featured: false,
      slug: "working-capital-solutions-guide"
    },
    {
      title: "Commercial Property Finance: Investment vs Owner-Occupied",
      excerpt: "Understand the differences between investment and owner-occupied commercial property finance, including rates and structures.",
      category: "Property Finance",
      readTime: "11 min",
      featured: false,
      slug: "commercial-property-finance-guide"
    },
    {
      title: "Trade Finance Essentials for Import/Export Businesses",
      excerpt: "Navigate letters of credit, trade finance facilities, and international payment structures for your import/export business.",
      category: "Trade Finance",
      readTime: "13 min",
      featured: false,
      slug: "trade-finance-essentials"
    },
    {
      title: "First-Time Commercial Borrower's Complete Checklist",
      excerpt: "Everything new commercial borrowers need to know, from credit preparation to documentation requirements.",
      category: "Getting Started",
      readTime: "9 min",
      featured: false,
      slug: "first-time-borrower-checklist"
    },
    {
      title: "Construction Finance: Managing Progress Payments & Risk",
      excerpt: "Expert strategies for managing construction finance including progress payment structures and risk mitigation.",
      category: "Development Finance",
      readTime: "14 min",
      featured: false,
      slug: "construction-finance-guide"
    }
  ];

  const filteredGuides = selectedCategory === "All" 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  const featuredGuide = guides.find(guide => guide.featured);

  // Combine hardcoded and published articles for display
  const allGuides = [
    ...guides.filter(g => !g.featured).map(guide => ({
      ...guide,
      isNew: false,
      date: undefined as string | undefined
    })), // Hardcoded guides (excluding featured)
    ...publishedArticles.map(article => ({
      title: article.title,
      excerpt: article.description,
      category: article.category,
      readTime: `${article.readingTime} min`,
      featured: false,
      slug: article.slug,
      isNew: isNewArticle(article.date),
      date: article.date
    }))
  ].sort((a, b) => {
    // Sort by date if both have dates, otherwise hardcoded first
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.date ? -1 : 1; // Articles with dates first
  });

  const filteredAllGuides = selectedCategory === "All" 
    ? allGuides 
    : allGuides.filter(guide => guide.category === selectedCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Guides" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Guides
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert-written guides to help you navigate every aspect of commercial lending in Australia. From beginner basics to advanced strategies.
          </p>
        </div>

        {/* Latest Article Hero Section */}
        {latestArticle && (
          <Card className="mb-8 bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                {isNewArticle(latestArticle.date) && (
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mr-3">
                    NEW
                  </span>
                )}
                <Star className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Latest Guide</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {latestArticle.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {latestArticle.description}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {latestArticle.readingTime} min read
                    </div>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full">
                      {latestArticle.category}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(latestArticle.date).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to={`/resources/guides/${latestArticle.slug}`}>
                      Read Latest Guide
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Guide */}
        {featuredGuide && (
          <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Featured Guide</span>
              </div>
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredGuide.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {featuredGuide.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredGuide.readTime} read
                    </div>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {featuredGuide.category}
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to={`/resources/guides/${featuredGuide.slug}`}>
                      Read Complete Guide
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Filter className="w-5 h-5 text-muted-foreground mt-2 mr-2" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAllGuides.filter(guide => !guide.featured).map((guide) => (
            <Card key={guide.slug} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {guide.category}
                    </span>
                    {guide.isNew && (
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                        NEW
                      </span>
                    )}
                  </div>
                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {guide.readTime} read
                  </div>
                  {guide.date && (
                    <span className="text-xs">
                      {new Date(guide.date).toLocaleDateString('en-AU', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/resources/guides/${guide.slug}`}>
                    Read Guide
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <section className="text-center mt-16 py-12 bg-muted rounded-2xl">
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
    </div>
  );
};

export default Guides;