import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-xl blur opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
            <div className="flex flex-col justify-center min-h-[3rem]">
              <span className="text-2xl font-bold text-accent leading-tight">
                Emet Capital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                isActive("/services") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Services
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                location.pathname.startsWith("/resources") ? "text-primary" : "text-muted-foreground"
              }`}>
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card border-border">
                <DropdownMenuItem asChild>
                  <Link to="/resources" className="w-full">
                    Resources Hub
                  </Link>
                </DropdownMenuItem>
                {resourcesLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="w-full">
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary whitespace-nowrap ${
                isActive("/contact") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm font-medium text-foreground whitespace-nowrap">
              📞 0485 952 651
            </div>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                asChild
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium whitespace-nowrap"
              >
                <Link to="/contact">Get Quote</Link>
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
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="py-4 space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/resources"
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 pt-4 space-y-3 border-t border-border mt-4">
                <div className="text-center text-primary font-semibold text-lg py-2">
                  📞 0485 952 651
                </div>
                <Button 
                  asChild 
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold"
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