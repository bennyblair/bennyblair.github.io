import { useEffect, useLayoutEffect, useRef } from "react";
import { takeNavigationState } from "@/lib/navigation-state";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
const primaryLinks = [
  { href: "/services/commercial-property-finance", label: "Property Finance" },
  { href: "/services", label: "All Services" },
  { href: "/resources/guides", label: "Guides" },
  { href: "/resources/tools", label: "Calculators" },
  { href: "/about", label: "About" },
];
const Navbar = () => {
  const location = useLocation();
  const disclosure = useRef<HTMLDetailsElement>(null);
  useLayoutEffect(() => {
    const state = takeNavigationState();
    if (state.open && disclosure.current) disclosure.current.open = true;
    if (state.focusSummary) disclosure.current?.querySelector("summary")?.focus({ preventScroll: true });
  }, []);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    // Preserve a disclosure opened before hydration; close only after navigation.
    if (previousPath.current !== location.pathname && disclosure.current) disclosure.current.open = false;
    previousPath.current = location.pathname;
  }, [location.pathname]);
  const isActive = (path: string) => location.pathname === path || (path !== "/services" && location.pathname.startsWith(`${path}/`));
  const links = primaryLinks.map(link => <Link key={link.href} to={link.href} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link>);
  return <nav aria-label="Primary navigation" className="site-nav">
    <div className="nav-inner">
      <Link to="/" aria-label="Emet Capital home" className="brand"><span className="brand-mark" aria-hidden="true" />Emet Capital</Link>
      <div className="desktop-nav">{links}</div>
      <div className="nav-contact"><a href="tel:+61485952651" className="nav-phone"><Phone aria-hidden="true" />0485 952 651</a><Link to="/contact" className="nav-enquiry" data-analytics-event="header_enquiry_cta">Discuss a deal <ArrowUpRight aria-hidden="true" /></Link></div>
      <details className="mobile-menu" ref={disclosure} onKeyDown={event => { if(event.key === "Escape" && disclosure.current) { disclosure.current.open=false; disclosure.current.querySelector("summary")?.focus(); } }}>
        <summary aria-label="Navigation menu"><Menu className="menu-open-icon" aria-hidden="true" /><X className="menu-close-icon" aria-hidden="true" /></summary>
        <div id="mobile-navigation" className="mobile-navigation" onClick={event => { if((event.target as Element).closest("a") && disclosure.current) disclosure.current.open=false; }}>{links}<Link to="/resources/case-studies">Case Studies</Link><Link to="/contact" data-analytics-event="header_enquiry_cta">Contact</Link><a href="tel:+61485952651"><Phone aria-hidden="true" />Call 0485 952 651</a></div>
      </details>
    </div>
  </nav>;
};
export default Navbar;
