import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, DollarSign, Calendar, Building2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getArticleBySlug } from "@/lib/content";
import { marked } from "marked";
import DOMPurify from "dompurify";

const CaseStudyArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug("case-studies", slug);

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

  const htmlContent = DOMPurify.sanitize(marked(article.content) as string);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: article.title }
  ];

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
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="mb-8">
            <Link to="/resources/case-studies" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Case Studies
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                  className="text-foreground"
                />
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
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
                <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-foreground mb-2">
                      Need Similar Financing?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Let us help you achieve your property finance goals
                    </p>
                    <Button asChild className="w-full">
                      <Link to="/contact">Get Started Today</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyArticle;