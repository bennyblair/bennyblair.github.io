/// <reference types="vite/client" />

declare module "virtual:content-index" {
  const index: Record<string, import("@/lib/content").ArticleSummary[]>;
  export default index;
}
