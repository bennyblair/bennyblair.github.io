import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-accent">Emet Capital</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Specialised commercial lending solutions for Australian businesses and property investors.
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Emet Capital Pty Ltd</p>
              <p>ABN 50 682 228 182</p>
              <p>Commercial-purpose finance brokerage.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-accent">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-accent">About Us</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-accent">Services</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          {/* Key Services */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Key Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/commercial-property-finance" className="text-muted-foreground hover:text-accent">Commercial Property Finance</Link></li>
              <li><Link to="/services/caveat-loans" className="text-muted-foreground hover:text-accent">Caveat Loans</Link></li>
              <li><Link to="/services/first-second-mortgages" className="text-muted-foreground hover:text-accent">First & Second Mortgages</Link></li>
              <li><Link to="/services/bridging-finance" className="text-muted-foreground hover:text-accent">Bridging Finance</Link></li>
              <li><Link to="/services/private-lending" className="text-muted-foreground hover:text-accent">Private Lending</Link></li>
              <li><Link to="/services/asset-backed-lending" className="text-muted-foreground hover:text-accent">Asset-Backed Lending</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources/guides" className="text-muted-foreground hover:text-accent">Guides</Link></li>
              <li><Link to="/resources/case-studies" className="text-muted-foreground hover:text-accent">Case Studies</Link></li>
              <li><Link to="/resources/tools" className="text-muted-foreground hover:text-accent">Tools & Calculators</Link></li>
              <li><Link to="/resources/faqs" className="text-muted-foreground hover:text-accent">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 text-accent" />
                <a href="tel:0485952651" className="hover:text-accent transition-colors">
                  0485 952 651
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 text-accent" />
                <a
                  href="mailto:enquiry@emetcapital.com.au"
                  className="hover:text-accent transition-colors"
                >
                  enquiry@emetcapital.com.au
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-accent" />
                <span>Sydney, Australia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground max-w-2xl">
            &copy; {currentYear} Emet Capital. General information only. This website does not provide financial, legal, or tax advice.
          </p>
          <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-accent">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-accent">Terms of Service</Link>
            <Link to="/editorial-standards" className="text-muted-foreground hover:text-accent">Editorial Standards</Link>
            <Link to="/complaints-process" className="text-muted-foreground hover:text-accent">Complaints Process</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
