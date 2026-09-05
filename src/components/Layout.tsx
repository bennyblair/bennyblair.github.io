import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { siteRoutes } from "@/config/site-route-manifest";
import { isDesignPreview } from "@/lib/design-preview";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const parts = location.pathname.split("/");
  const route = siteRoutes.find(item => item.path !== "*" && item.path.split("/").length === parts.length && item.path.split("/").every((part, index) => part.startsWith(":") || part === parts[index]));
  const pageType = location.pathname === "/contact" || route?.pageType === "tool" ? "utility" : route?.pageType === "resource" || location.pathname === "/services" ? "directory" : route?.pageType === "guide" ? "article" : route?.pageType || "system";

  return (
    <div className={`site-shell page-${pageType} min-h-screen bg-background flex flex-col ${isHome ? "is-home" : "is-interior"}`}>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Navbar />
      {isDesignPreview && <div className="preview-notice">Private design review <span>Enquiries are simulated · Live website unchanged</span></div>}
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
