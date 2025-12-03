import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowRight } from "lucide-react";

export interface RelatedArticle {
  title: string;
  slug: string;
  description?: string;
}

interface RelatedReadingProps {
  articles: RelatedArticle[];
}

const RelatedReading = ({ articles }: RelatedReadingProps) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
        <BookOpen className="h-6 w-6 text-accent" />
        Related Reading
      </h2>
      <div className={`grid gap-6 ${articles.length === 1 ? 'max-w-md mx-auto' : articles.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
        {articles.map((article, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {article.description && (
                <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
              )}
              <Link 
                to={`/resources/guides/${article.slug}`} 
                className="text-accent hover:underline inline-flex items-center text-sm"
              >
                Read Article <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedReading;
