import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { clientRedirects, siteRoutes } from "@/config/site-route-manifest";
import { installContactTracking, trackPageView } from "@/lib/analytics";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

type PageModule = { default: React.ComponentType };
const pageModules = import.meta.glob("./pages/**/*.tsx") as Record<string, () => Promise<PageModule>>;

function moduleKey(source: string) {
  return source.replace(/^src/, ".");
}

const routeComponents = new Map(
  siteRoutes.map((route) => {
    const loader = pageModules[moduleKey(route.source)];
    if (!loader) throw new Error(`Route "${route.path}" references missing module "${route.source}"`);
    return [route.path, lazy(loader)] as const;
  }),
);
const preloadedRouteComponents = new Map<string, React.ComponentType>();

function routeMatchesPath(pattern: string, pathname: string) {
  if (pattern === "*") return true;
  const patternParts = pattern.replace(/^\/+|\/+$/g, "").split("/");
  const pathParts = pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (pattern === "/") return pathname === "/";
  if (patternParts.length !== pathParts.length) return false;
  return patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index]);
}

export async function preloadCurrentRoute(pathname: string) {
  const route = siteRoutes.find((candidate) => candidate.path !== "*" && routeMatchesPath(candidate.path, pathname));
  if (!route || preloadedRouteComponents.has(route.path)) return;
  const loader = pageModules[moduleKey(route.source)];
  if (!loader) return;
  const pageModule = await loader();
  preloadedRouteComponents.set(route.path, pageModule.default);
}

const LoadingSpinner = () => (
  <div
    className="min-h-screen flex items-center justify-center bg-background"
    data-route-loading="true"
    role="status"
    aria-live="polite"
  >
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-hidden="true" />
      <p className="text-muted-foreground">Loading…</p>
    </div>
  </div>
);

/**
 * The production renderer waits for this deterministic signal rather than
 * guessing whether lazy routes and article content have finished rendering.
 */
const RouteReadySignal = () => {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.prerenderReady = "false";
    let cancelled = false;
    let lastSignature = "";
    let stableChecks = 0;

    const timer = window.setInterval(() => {
      const main = document.querySelector("main");
      const heading = main?.querySelector("h1");
      const loading = main?.querySelector('[data-route-loading="true"]');
      const text = main?.textContent?.replace(/\s+/g, " ").trim() ?? "";
      const signature = `${heading?.textContent ?? ""}:${text.length}`;

      if (main && heading && !loading && text.length >= 80) {
        stableChecks = signature === lastSignature ? stableChecks + 1 : 0;
        lastSignature = signature;
        if (stableChecks >= 5) {
          root.dataset.prerenderReady = "true";
          window.clearInterval(timer);
        }
      } else {
        stableChecks = 0;
        lastSignature = signature;
      }
    }, 60);

    return () => {
      cancelled = true;
      if (cancelled) window.clearInterval(timer);
    };
  }, [location.pathname]);

  return null;
};

const AnalyticsSignals = () => {
  const location = useLocation();

  useEffect(() => installContactTracking(), []);

  useEffect(() => {
    const timer = window.setTimeout(() => trackPageView(location.pathname, document.title), 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <RouteReadySignal />
    <AnalyticsSignals />
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {clientRedirects.map((redirect) => (
            <Route
              key={`redirect:${redirect.from}`}
              path={redirect.from}
              element={<Navigate to={redirect.to} replace />}
            />
          ))}
          {siteRoutes.map((route) => {
            const Component = preloadedRouteComponents.get(route.path) ?? routeComponents.get(route.path)!;
            return <Route key={route.path} path={route.path} element={<Component />} />;
          })}
        </Routes>
      </Suspense>
    </Layout>
  </>
);

const App = () => (
  <HelmetProvider>
    <Router>
      <AppRoutes />
    </Router>
  </HelmetProvider>
);

export default App;
