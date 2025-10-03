import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, DollarSign, Calendar, Building2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getArticleBySlug } from "@/lib/content";
import { convertMarkdownToHtml, stripFirstHeading } from "@/lib/markdown-converter";
import { initializeArticleEnhancements } from "@/lib/article-enhancements";

const CaseStudyArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug("case-studies", slug);
  const articleRef = useRef<HTMLDivElement>(null);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
            <p className="text-muted-foreground mb-8">The case study you're looking for doesn't exist.</p>
            <Link to="/resources/case-studies">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Process the content - strip first heading if it matches the title
  const processedContent = stripFirstHeading(article.content);
  
  // Initialize article enhancements after content loads
  useEffect(() => {
    if (article && articleRef.current) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        if (articleRef.current) {
          initializeArticleEnhancements(articleRef.current);
        }
      }, 100);
    }
  }, [article]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: article.title }
  ];

  // Generate JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.featuredImage ? `https://emetcapital.com.au${article.featuredImage}` : `https://emetcapital.com.au/images/uploads/${article.slug}.jpg`,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "Emet Capital",
      "url": "https://emetcapital.com.au"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Emet Capital",
      "url": "https://emetcapital.com.au",
      "logo": {
        "@type": "ImageObject",
        "url": "https://emetcapital.com.au/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://emetcapital.com.au/resources/case-studies/${article.slug}`
    },
    "articleSection": article.category || "Case Study",
    "keywords": article.keywords?.join(', '),
    "wordCount": article.content.split(/\s+/).length,
    "inLanguage": "en-AU",
    "isAccessibleForFree": true,
    ...(article.loanAmount && { "about": {
      "@type": "FinancialProduct",
      "name": article.loanType || "Business Loan",
      "amount": article.loanAmount,
      ...(article.location && { "areaServed": article.location }),
      ...(article.industry && { "applicationCategory": article.industry })
    }})
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | Emet Capital Case Studies</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords?.join(", ")} />
        <link rel="canonical" href={`https://emetcapital.com.au/resources/case-studies/${article.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://emetcapital.com.au/resources/case-studies/${article.slug}`} />
        {article.featuredImage && <meta property="og:image" content={article.featuredImage} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        {article.featuredImage && <meta name="twitter:image" content={article.featuredImage} />}

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="mb-8">
            <Link to="/resources/case-studies" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center space-x-4 mb-6">
              <span className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                {article.category || 'Case Study'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-4xl mx-auto">
              {article.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {article.description}
            </p>
          </header>

          <div className="grid lg:grid-cols-12 gap-8 mb-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <Card className="p-8 shadow-lg">
                <div 
                  ref={articleRef}
                  className="article-content space-y-8"
                  dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(processedContent) }}
                />
              </Card>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6 sticky top-8">
              {/* Case Study Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Case Study Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {article.loanAmount && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Loan Amount
                      </span>
                      <Badge variant="secondary">{article.loanAmount}</Badge>
                    </div>
                  )}
                  
                  {article.loanType && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Loan Type
                      </span>
                      <Badge variant="outline">{article.loanType}</Badge>
                    </div>
                  )}
                  
                  {article.location && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        Location
                      </span>
                      <Badge variant="secondary">{article.location}</Badge>
                    </div>
                  )}
                  
                  {article.duration && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        Duration
                      </span>
                      <Badge variant="outline">{article.duration}</Badge>
                    </div>
                  )}
                  
                  {article.industry && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Industry</span>
                      <Badge>{article.industry}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Outcome */}
              {article.outcome && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-primary">Key Outcome</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">{article.outcome}</p>
                  </CardContent>
                </Card>
              )}

              {/* Challenge */}
              {article.challenge && (
                <Card>
                  <CardHeader>
                    <CardTitle>Main Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{article.challenge}</p>
                  </CardContent>
                </Card>
              )}

              {/* Call to Action */}
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent-light/10 border-accent/20">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Want to Understand Your Options?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We share general information on financing solutions and guide you through the next steps.
                </p>
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent"
                >
                  <Link to="/contact">Reach Out to Us Today</Link>
                </Button>
              </Card>
            </aside>
          </div>

          {/* Bottom CTA Section */}
          <Card className="mb-12 bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/20 shadow-lg">
            <CardContent className="p-10 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Discuss Your Financing Needs?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                We can provide information and guidance on potential financing solutions for your next property venture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="min-w-[200px]">
                  <Link to="/contact">
                    Reach Out to Us Today
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                  <Link to="/resources/case-studies">View More Case Studies</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CaseStudyArticle;