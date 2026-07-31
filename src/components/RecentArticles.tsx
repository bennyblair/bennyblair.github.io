import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { getContentSummaries } from "@/lib/content";

interface RecentArticlesProps {
  count?: number;
  title?: string;
  filterByTags?: string[];
}

const RecentArticles = ({ 
  count = 5, 
  title = "Latest Articles",
  filterByTags = []
}: RecentArticlesProps) => {
  const allArticles = [
    ...getContentSummaries("guides").map((article) => ({ ...article, contentType: "guides" as const })),
    ...getContentSummaries("case-studies").map((article) => ({
      ...article,
      contentType: "case-studies" as const,
    })),
  ];
  const articles = allArticles
    .filter(
      (article) =>
        filterByTags.length === 0 ||
        article.tags?.some((tag) =>
          filterByTags.some((filterTag) => tag.toLowerCase().includes(filterTag.toLowerCase())),
        ),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold mb-6">{title}</h3>
      <div className="grid gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/resources/${article.contentType}/${article.slug}`}
            className="group block"
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:border-accent/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString('en-AU', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime} min
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2 text-sm mb-3">
                  {article.description}
                </CardDescription>
                <div className="flex items-center text-sm text-accent font-medium group-hover:gap-2 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentArticles;
