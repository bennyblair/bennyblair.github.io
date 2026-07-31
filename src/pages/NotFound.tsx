import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
    <SEO
      title="Page Not Found | Emet Capital"
      description="The requested Emet Capital page could not be found. Return to commercial property finance, resources, or the contact page."
      canonical="/404"
      noindex
    />
    <div className="max-w-xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Error 404</p>
      <h1 className="mt-4 text-4xl font-bold md:text-6xl">Page not found</h1>
      <p className="mt-6 leading-relaxed text-muted-foreground">
        The page may have moved or the address may be incorrect. Continue with commercial property
        finance, browse the resource library, or contact Emet Capital about a current transaction.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/services/commercial-property-finance">Property finance</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/resources">Browse resources</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default NotFound;
