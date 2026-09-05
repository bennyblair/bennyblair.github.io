/// <reference types="vite/client" />

declare module "virtual:content-index" {
  const index: Record<string, import("@/lib/content").ArticleSummary[]>;
  export default index;
}

declare module "virtual:homepage-content" {
  const content: {
    latestArticles: (import("./lib/content").ArticleSummary & { contentType: "guides" | "case-studies" })[];
    featuredCaseStudies: import("./lib/content").ArticleSummary[];
  };
  export default content;
}
