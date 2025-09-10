import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Clock, User, CheckCircle, ArrowRight, Star } from "lucide-react";
import { getArticleBySlug, getContentFiles, type Article } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";

const GuideArticle = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Load the specific article
        const foundArticle = getArticleBySlug(contentType, slug);
        
        if (!foundArticle) {
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

  if (error || !article) {
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
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={getBreadcrumbs()} />

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            <div className="flex items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readingTime} min read
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {article.description}
          </p>
        </header>

        {/* Key Takeaways - Only show if we found some */}
        {keyTakeaways.length > 0 && (
          <Card className="mb-8 bg-secondary-blue">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-secondary-blue-foreground mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-accent" />
                Key Takeaways
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-secondary-blue-foreground text-sm">{takeaway}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} 
          />
        </article>

        {/* CTA Section */}
        <Card className="mb-12 bg-gradient-to-r from-accent/10 to-accent-light/10 border-accent/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Discuss Your Financing Needs?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our commercial lending specialists can assess your specific situation and connect you with the right financing solution. Get expert advice today.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
            >
              <Link to="/contact">Get Your Custom Quote</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related {contentType === 'guides' ? 'Guides' : contentType === 'case-studies' ? 'Case Studies' : 'Insights'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.slug} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {relatedArticle.readingTime} min read
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full">
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