import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();

  const resourcesLinks = [
    { href: "/resources/guides", label: "Guides" },
    { href: "/resources/case-studies", label: "Case Studies" },
    { href: "/resources/tools", label: "Tools & Calculators" },
    { href: "/resources/glossary", label: "Glossary" },
    { href: "/resources/faqs", label: "FAQs" },
    { href: "/resources/insights", label: "Market Insights" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">Emet</span>
            </div>
            <span className="text-xl font-bold text-primary">Emet Capital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              to="/consultation"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/consultation") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Consultation
            </Link>

            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/services") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Services
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About Us
            </Link>

            <Link
              to="/resources"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.startsWith("/resources") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Resources
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact Us
            </Link>
            
            <div className="text-sm font-medium text-primary">
              📞 0485 952 651
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium"
            >
              <Link to="/contact">Get Quote Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-muted-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/consultation"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Consultation
              </Link>
              <Link
                to="/services"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/resources"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="px-4 pt-2 space-y-2">
                <div className="text-center text-primary font-medium py-2">
                  📞 0485 952 651
                </div>
                <Button 
                  asChild 
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Quote Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;