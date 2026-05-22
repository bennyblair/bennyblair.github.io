import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getPrecompiledContentFiles } from "@/lib/precompiled-content";

type Props = {
  authorName: "Ben" | "Daniel";
  heading: string;
  intro: string;
};

type FeedArticle = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  author?: string;
  authorName?: string;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const getAuthorArticles = (authorName: Props["authorName"]) => {
  const guides = getPrecompiledContentFiles("guides") as FeedArticle[];
  const caseStudies = getPrecompiledContentFiles("case-studies") as FeedArticle[];

  return [
    ...guides.map((article) => ({ ...article, contentType: "guides" as const })),
    ...caseStudies.map((article) => ({ ...article, contentType: "case-studies" as const })),
  ]
    .filter((article) => (article.authorName ?? article.author) === authorName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)
    .map((article) => ({
      ...article,
      href: article.contentType === "case-studies"
        ? `/resources/case-studies/${article.slug}`
        : `/resources/guides/${article.slug}`,
    }));
};

const AuthorArticleFeed = ({ authorName, heading, intro }: Props) => {
  const articles = getAuthorArticles(authorName);

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">{heading}</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">{intro}</p>
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={article.href}
              className="rounded-md border border-border p-4 hover:border-accent/50 hover:bg-accent/5 transition-colors"
            >
              <div className="text-xs text-muted-foreground mb-2">{formatDate(article.date)}</div>
              <h3 className="font-semibold text-foreground leading-snug mb-2">{article.title}</h3>
              {article.description ? (
                <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
              ) : null}
              <span className="mt-3 inline-flex items-center text-sm font-medium text-accent">
                Read article <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorArticleFeed;
