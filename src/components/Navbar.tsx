import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const primaryLinks = [
  { href: "/services/commercial-property-finance", label: "Property Finance" },
  { href: "/services", label: "All Services" },
  { href: "/resources/guides", label: "Guides" },
  { href: "/resources/tools", label: "Calculators" },
  { href: "/about", label: "About" },
] as const;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(`${path}/`));

  const linkClass = (path: string) =>
    `rounded-sm text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      isActive(path) ? "text-accent" : ""
    }`;

  return (
    <nav aria-label="Primary navigation" className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              aria-label="Emet Capital home"
              className="rounded-sm text-2xl font-bold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Emet Capital
            </Link>

            <div className="hidden items-center gap-5 lg:flex">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={linkClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:+61485952651"
                className="hidden items-center gap-2 rounded-sm text-sm font-semibold text-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                0485 952 651
              </a>
              <Button asChild className="hidden md:inline-flex">
                <Link to="/contact" data-analytics-event="header_enquiry_cta">
                  Discuss a deal
                </Link>
              </Button>
              <button
                type="button"
                className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
          <div id="mobile-navigation" className="border-t border-border pb-5 lg:hidden">
            <div className="grid gap-1 pt-4">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="rounded-md px-4 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/resources/case-studies"
                className="rounded-md px-4 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-accent"
              >
                Case Studies
              </Link>
              <Link
                to="/contact"
                data-analytics-event="header_enquiry_cta"
                className="rounded-md px-4 py-3 text-base font-medium text-foreground hover:bg-muted hover:text-accent"
              >
                Contact
              </Link>
              <a
                href="tel:+61485952651"
                className="mx-4 mt-3 flex min-h-12 items-center justify-center gap-2 rounded-md border border-accent/50 font-semibold text-accent"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call 0485 952 651
              </a>
            </div>
          </div>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
