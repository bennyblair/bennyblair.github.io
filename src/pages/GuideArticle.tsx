import { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Clock, User, CheckCircle, ArrowRight, Star, Calendar } from "lucide-react";
import { getArticleBySlug, getContentFiles, isArticleComingSoon, debugModules, type Article } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import { initializeArticleEnhancements } from "@/lib/article-enhancements";

const GuideArticle = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  // Determine content type from URL path
  const getContentType = (): 'guides' | 'case-studies' | 'insights' => {
    if (location.pathname.includes('/guides/')) return 'guides';
    if (location.pathname.includes('/case-studies/')) return 'case-studies';
    if (location.pathname.includes('/insights/')) return 'insights';
    return 'guides'; // fallback
  };

  const contentType = getContentType();

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setError('No article slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Debug: Check what modules are loaded
        const debugInfo = debugModules();
        console.log('Debug info:', debugInfo);
        console.log('Looking for slug:', slug, 'in contentType:', contentType);

        // Load the specific article
        const foundArticle = await getArticleBySlug(contentType, slug);
        console.log('Found article:', foundArticle);
        
        if (!foundArticle) {
          // Check if it's a coming soon article
          const comingSoon = await isArticleComingSoon(slug);
          if (comingSoon) {
            setIsComingSoon(true);
            setLoading(false);
            return;
          }
          
          setError('Article not found');
          setLoading(false);
          return;
        }

        setArticle(foundArticle);

        // Load related articles (same content type, excluding current article)
        const allArticles = getContentFiles(contentType);
        const related = allArticles
          .filter(a => a.slug !== slug)
          .slice(0, 3);
        
        setRelatedArticles(related);
        setLoading(false);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, contentType]);

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

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!article && !isComingSoon)) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              {error || 'The article you\'re looking for doesn\'t exist.'}
            </p>
            <Button asChild>
              <Link to="/resources">Back to Resources</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show "Coming Soon" page
  if (isComingSoon && !article) {
    const contentTypeName = contentType === 'guides' ? 'Guide' : 
                           contentType === 'case-studies' ? 'Case Study' : 'Market Insight';
    
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: contentTypeName.replace('Market ', '') + 's', href: `/resources/${contentType}` },
            { label: "Coming Soon" }
          ]} />
          
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <Calendar className="w-16 h-16 text-accent mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">Coming Soon</h1>
              <p className="text-xl text-muted-foreground mb-6">
                This {contentTypeName.toLowerCase()} is being prepared and will be published soon as part of our content automation.
              </p>
            </div>

            <Card className="mb-8 bg-secondary-blue">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-secondary-blue-foreground mb-4">
                  What to expect:
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-blue-foreground text-sm">
                      Comprehensive {contentTypeName.toLowerCase()} with expert insights
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-blue-foreground text-sm">
                      Real-world examples and case studies
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-blue-foreground text-sm">
                      Actionable advice for Australian businesses
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button asChild size="lg">
                <Link to="/contact">
                  Get Expert Advice Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <Link 
                  to="/resources" 
                  className="hover:text-primary underline"
                >
                  Browse available resources
                </Link>
                {" or "}
                <Link 
                  to="/resources/guides" 
                  className="hover:text-primary underline"
                >
                  explore our guides
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get breadcrumb info based on content type
  const getBreadcrumbs = () => {
    const baseItems = [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" }
    ];

    switch (contentType) {
      case 'guides':
        return [...baseItems, { label: "Guides", href: "/resources/guides" }, { label: article.title }];
      case 'case-studies':
        return [...baseItems, { label: "Case Studies", href: "/resources/case-studies" }, { label: article.title }];
      case 'insights':
        return [...baseItems, { label: "Market Insights", href: "/resources/insights" }, { label: article.title }];
      default:
        return [...baseItems, { label: article.title }];
    }
  };

  // Parse content to extract key takeaways (look for bullet points after "Key" headings)
  const extractKeyTakeaways = (content: string): string[] => {
    const lines = content.split('\n');
    let inTakeawaysSection = false;
    const takeaways: string[] = [];

    for (const line of lines) {
      // Check if we're entering a takeaways section
      if (line.toLowerCase().includes('key') && (line.startsWith('##') || line.startsWith('#'))) {
        inTakeawaysSection = true;
        continue;
      }
      
      // Check if we're leaving the section (another heading)
      if (inTakeawaysSection && (line.startsWith('##') || line.startsWith('#'))) {
        break;
      }
      
      // Extract bullet points in the takeaways section
      if (inTakeawaysSection && line.trim().startsWith('-')) {
        const takeaway = line.replace(/^-\s*/, '').trim();
        if (takeaway) {
          takeaways.push(takeaway);
        }
      }
    }

    return takeaways;
  };

  const keyTakeaways = extractKeyTakeaways(article.content);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Breadcrumbs items={getBreadcrumbs()} />

        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center space-x-4 mb-6">
            <span className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              {article.category}
            </span>
            <div className="flex items-center text-sm text-muted-foreground space-x-6">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {article.readingTime} min read
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(article.date).toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-4xl mx-auto">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {article.description}
          </p>
        </header>

        {/* Key Takeaways - Only show if we found some */}
        {keyTakeaways.length > 0 && (
          <Card className="mb-12 bg-gradient-to-r from-accent/5 to-accent-light/5 border-l-4 border-l-accent shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Star className="w-6 h-6 mr-3 text-accent" />
                Key Takeaways
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-background/50">
                    <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <span className="text-foreground leading-relaxed">{takeaway}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Article Content */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <Card className="p-8 shadow-lg">
              <div 
                ref={articleRef}
                className="
                  article-content prose prose-lg max-w-none
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:leading-tight prose-h1:border-b prose-h1:border-border/30 prose-h1:pb-4
                  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:leading-tight prose-h2:text-primary prose-h2:border-b prose-h2:border-border/20 prose-h2:pb-3
                  prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-8 prose-h3:leading-tight prose-h3:text-foreground
                  prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-6 prose-h4:leading-tight prose-h4:text-foreground/90
                  prose-p:text-muted-foreground prose-p:mb-6 prose-p:leading-8 prose-p:text-lg
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground/90 prose-em:italic
                  prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:text-primary/80 hover:prose-a:underline prose-a:transition-all
                  prose-ul:text-muted-foreground prose-ul:mb-8 prose-ul:space-y-3 prose-ul:text-lg
                  prose-ol:text-muted-foreground prose-ol:mb-8 prose-ol:space-y-3 prose-ol:text-lg
                  prose-li:leading-8 prose-li:mb-2 prose-li:text-muted-foreground
                  prose-blockquote:border-l-4 prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:text-foreground prose-blockquote:italic
                  prose-code:bg-muted prose-code:px-3 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:border prose-code:text-foreground
                  prose-pre:bg-muted prose-pre:border-2 prose-pre:border-border/20 prose-pre:p-6 prose-pre:rounded-xl prose-pre:mb-8 prose-pre:overflow-x-auto prose-pre:shadow-inner
                  prose-table:w-full prose-table:border-collapse prose-table:mb-10 prose-table:rounded-xl prose-table:overflow-hidden prose-table:border-2 prose-table:border-border/20 prose-table:shadow-lg
                  prose-th:px-6 prose-th:py-5 prose-th:text-left prose-th:font-bold prose-th:text-foreground prose-th:bg-primary/10 prose-th:text-lg
                  prose-td:px-6 prose-td:py-4 prose-td:text-muted-foreground prose-td:border-b prose-td:border-border/10 prose-td:text-lg
                  prose-tr:transition-colors prose-tr:hover:bg-muted/30
                "
                dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} 
              />
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            <Card className="p-6 sticky top-8">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-accent" />
                Quick Navigation
              </h3>
              <div className="space-y-2 text-sm">
                <a href="#introduction" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                  Introduction
                </a>
                <a href="#key-points" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                  Key Points
                </a>
                <a href="#conclusion" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                  Conclusion
                </a>
                <a href="#faqs" className="block text-muted-foreground hover:text-primary transition-colors py-1">
                  FAQs
                </a>
              </div>
            </Card>

            {/* CTA Card */}
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent-light/10 border-accent/20">
              <h3 className="text-lg font-bold text-foreground mb-3">
                Need Expert Advice?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our lending specialists can help you navigate your financing options.
              </p>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent"
              >
                <Link to="/contact">Get Free Consultation</Link>
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
              Our commercial lending specialists can assess your specific situation and connect you with the right financing solution. Get expert advice today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground px-8 py-3"
              >
                <Link to="/contact">Get Your Custom Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="px-8 py-3"
              >
                <Link to="/resources/guides">Explore More Guides</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Related {contentType === 'guides' ? 'Guides' : contentType === 'case-studies' ? 'Case Studies' : 'Insights'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.slug} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors text-lg leading-tight">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {relatedArticle.readingTime} min read
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {relatedArticle.category}
                      </span>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Link to={`/resources/${contentType}/${relatedArticle.slug}`}>
                        Read {contentType === 'guides' ? 'Guide' : contentType === 'case-studies' ? 'Case Study' : 'Insight'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default GuideArticle;