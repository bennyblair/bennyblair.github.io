import { useParams, Navigate, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, FileText, ArrowRight, Building2, TrendingUp, Shield, Briefcase, Landmark, Truck, BarChart2, Home, Wrench, DollarSign, Factory, Users } from "lucide-react";

interface ServiceLink {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

interface CityData {
  name: string;
  state: string;
  stateFullName: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  intro: string;
  marketContext: string;
}

const cityData: Record<string, CityData> = {
  sydney: {
    name: "Sydney",
    state: "NSW",
    stateFullName: "New South Wales",
    slug: "sydney",
    title: "Commercial Finance Sydney | Business Lending NSW | Emet Capital",
    description: "Commercial lending solutions in Sydney, NSW — bridging finance, private lending, SMSF loans, caveat loans, and business finance through Emet Capital's national lender network.",
    keywords: "commercial finance sydney, business loans sydney, bridging finance sydney, private lending sydney, commercial lending nsw",
    intro: "Sydney is Australia's most active commercial lending market. Whether you're dealing with auction pressure in the inner city, a development milestone on the fringe, or an urgent refinance deadline on a premium asset, the right lender connection often determines the outcome.",
    marketContext: "Australia's largest property market moves fast, and lender concentration limits, complex tenancy structures, and premium valuations can compress settlement windows in ways that standard bank processes can't accommodate. Emet Capital connects borrowers with lenders across 50+ institutions to match the right product to the urgency.",
  },
  melbourne: {
    name: "Melbourne",
    state: "VIC",
    stateFullName: "Victoria",
    slug: "melbourne",
    title: "Commercial Finance Melbourne | Business Lending VIC | Emet Capital",
    description: "Commercial lending solutions in Melbourne, VIC — bridging finance, private lending, SMSF loans, caveat loans, and business finance through Emet Capital's national lender network.",
    keywords: "commercial finance melbourne, business loans melbourne, bridging finance melbourne, private lending melbourne, commercial lending vic",
    intro: "Melbourne's commercial property market spans CBD towers, inner-north industrial corridors, bayside commercial strips, and outer-ring development sites — each with its own lender appetite and timing dynamics.",
    marketContext: "Victoria's broad lending market includes active private lending, competitive institutional rates, and growing demand for short-term solutions in a market where auction activity and development timelines often trump conventional bank approval windows.",
  },
  brisbane: {
    name: "Brisbane",
    state: "QLD",
    stateFullName: "Queensland",
    slug: "brisbane",
    title: "Commercial Finance Brisbane | Business Lending QLD | Emet Capital",
    description: "Commercial lending solutions in Brisbane, QLD — bridging finance, private lending, SMSF loans, caveat loans, and business finance through Emet Capital's national lender network.",
    keywords: "commercial finance brisbane, business loans brisbane, bridging finance brisbane, private lending brisbane, commercial lending qld",
    intro: "Brisbane has emerged as one of Australia's fastest-growing commercial markets, driven by infrastructure investment, population growth, and rising demand for industrial, mixed-use, and commercial property assets across the city and surrounds.",
    marketContext: "Queensland's commercial lending environment is competitive and increasingly active, with private and non-bank lenders playing a larger role as demand for faster approvals grows alongside the market's momentum heading into infrastructure-led expansion.",
  },
  perth: {
    name: "Perth",
    state: "WA",
    stateFullName: "Western Australia",
    slug: "perth",
    title: "Commercial Finance Perth | Business Lending WA | Emet Capital",
    description: "Commercial lending solutions in Perth, WA — bridging finance, private lending, SMSF loans, caveat loans, and business finance through Emet Capital's national lender network.",
    keywords: "commercial finance perth, business loans perth, bridging finance perth, private lending perth, commercial lending wa",
    intro: "Perth's resource-backed economy creates distinct commercial lending patterns — from industrial and logistics assets in the port corridor to commercial acquisitions in the CBD and established business districts across the metro area.",
    marketContext: "Western Australia's lending market has strengthened through the commodity cycle recovery, with strong demand for short-term bridging, asset finance, and business acquisition lending across both the resources sector and diverse commercial property market.",
  },
  adelaide: {
    name: "Adelaide",
    state: "SA",
    stateFullName: "South Australia",
    slug: "adelaide",
    title: "Commercial Finance Adelaide | Business Lending SA | Emet Capital",
    description: "Commercial lending solutions in Adelaide, SA — bridging finance, private lending, SMSF loans, caveat loans, and business finance through Emet Capital's national lender network.",
    keywords: "commercial finance adelaide, business loans adelaide, bridging finance adelaide, private lending adelaide, commercial lending sa",
    intro: "Adelaide offers one of Australia's most stable commercial property markets, with strong government activity, growing defence and technology sectors, and consistent demand for commercial finance across industrial, office, and mixed-use assets.",
    marketContext: "South Australia's lending market is active across both private and institutional channels, with competitive opportunities in commercial property, business acquisition finance, and working capital for businesses navigating South Australia's diversifying economy.",
  },
  "gold-coast": {
    name: "Gold Coast",
    state: "QLD",
    stateFullName: "Queensland",
    slug: "gold-coast",
    title: "Commercial Finance Gold Coast | Business Lending QLD | Emet Capital",
    description: "Commercial lending solutions in Gold Coast, QLD — bridging finance, private lending, SMSF loans, caveat loans, and business finance through Emet Capital's national lender network.",
    keywords: "commercial finance gold coast, business loans gold coast, bridging finance gold coast, private lending gold coast, commercial lending gold coast qld",
    intro: "The Gold Coast commercial lending market spans tourism-linked hospitality assets, residential development projects, growing industrial precincts, and a strong business community that increasingly needs flexible commercial finance solutions.",
    marketContext: "Queensland's second-largest city has a dynamic commercial property and business finance market, with active demand for short-term bridging, hospitality and property development finance, and working capital solutions across Gold Coast's evolving economy.",
  },
};

function getServices(citySlug: string): ServiceLink[] {
  return [
    {
      name: "Bridging Finance",
      description: "Short-term property finance for auctions, settlements, refinance deadlines and timing gaps.",
      href: `/services/bridging-finance/cities/${citySlug}`,
      icon: <Building2 className="h-5 w-5 text-accent" />,
    },
    {
      name: "Private Lending",
      description: "Non-bank and private lender solutions for commercial property and business-purpose lending.",
      href: `/services/private-lending/cities/${citySlug}`,
      icon: <Shield className="h-5 w-5 text-accent" />,
    },
    {
      name: "First & Second Mortgages",
      description: "Property-backed finance structured as a first or second ranking mortgage for business purposes.",
      href: `/services/first-second-mortgages/cities/${citySlug}`,
      icon: <Home className="h-5 w-5 text-accent" />,
    },
    {
      name: "Commercial Property Development",
      description: "Development and construction finance for residential, commercial, and mixed-use projects.",
      href: `/services/commercial-property-development/cities/${citySlug}`,
      icon: <Landmark className="h-5 w-5 text-accent" />,
    },
    {
      name: "Caveat Loans",
      description: "Fast caveat-based lending secured against property equity for urgent business funding needs.",
      href: `/services/caveat-loans/cities/${citySlug}`,
      icon: <TrendingUp className="h-5 w-5 text-accent" />,
    },
    {
      name: "SMSF Lending",
      description: "Commercial property lending structured for self-managed super funds within regulatory limits.",
      href: `/services/smsf-lending/cities/${citySlug}`,
      icon: <BarChart2 className="h-5 w-5 text-accent" />,
    },
    {
      name: "Refinancing Solutions",
      description: "Commercial property and business loan refinancing to better rates, terms, or lenders.",
      href: `/services/refinancing-solutions/cities/${citySlug}`,
      icon: <DollarSign className="h-5 w-5 text-accent" />,
    },
    {
      name: "Business Acquisition Finance",
      description: "Funding for business purchases, share acquisitions, and partner buyouts.",
      href: `/services/business-acquisition/cities/${citySlug}`,
      icon: <Briefcase className="h-5 w-5 text-accent" />,
    },
    {
      name: "Debt Consolidation",
      description: "Consolidate multiple business debts into a single structured commercial facility.",
      href: `/services/debt-consolidation/cities/${citySlug}`,
      icon: <Users className="h-5 w-5 text-accent" />,
    },
    {
      name: "Equipment Finance",
      description: "Asset-backed equipment and machinery finance for business operations and expansion.",
      href: `/services/equipment-finance/cities/${citySlug}`,
      icon: <Wrench className="h-5 w-5 text-accent" />,
    },
    {
      name: "Working Capital",
      description: "Short-term business finance to fund operations, inventory, and day-to-day cash flow.",
      href: `/services/working-capital/cities/${citySlug}`,
      icon: <TrendingUp className="h-5 w-5 text-accent" />,
    },
    {
      name: "Trade Finance",
      description: "Import, export, and supply chain finance for businesses with international trade activity.",
      href: `/services/trade-finance/cities/${citySlug}`,
      icon: <Truck className="h-5 w-5 text-accent" />,
    },
    {
      name: "Asset Finance & Leasing",
      description: "Finance and lease structures for business assets, vehicles, and equipment.",
      href: `/services/asset-finance/cities/${citySlug}`,
      icon: <Factory className="h-5 w-5 text-accent" />,
    },
  ];
}

const CityLandingPage = () => {
  const { city } = useParams<{ city: string }>();

  if (!city || !cityData[city]) {
    return <Navigate to="/services" replace />;
  }

  const data = cityData[city];
  const services = getServices(city);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": `Emet Capital — Commercial Finance ${data.name}`,
    "description": data.description,
    "url": `https://emetcapital.com.au/locations/${city}`,
    "areaServed": {
      "@type": "City",
      "name": data.name,
      "addressRegion": data.state,
      "addressCountry": "AU"
    },
    "serviceType": "Commercial Finance Brokerage",
  };

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        canonical={`/locations/${city}`}
        keywords={data.keywords}
        schemas={[schema]}
      />

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: data.name }
          ]} />

          {/* Hero */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent">{data.state} — Commercial Finance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Commercial Finance in {data.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
              {data.intro}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {data.marketContext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                <Link to="/contact">
                  <FileText className="mr-2 h-5 w-5" />
                  Discuss Your Needs
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:0485952651">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Expert
                </a>
              </Button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Commercial Lending Services in {data.name}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Emet Capital connects {data.name} borrowers with the right lenders across 13 commercial finance categories. Select a service below to see {data.name}-specific information, local scenarios, and how we can help.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link key={service.href} to={service.href} className="block group">
                  <Card className="h-full transition-shadow hover:shadow-md border-border group-hover:border-accent/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {service.icon}
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {service.description}
                      </p>
                      <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View {data.name} details <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Why Emet Capital */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl font-bold mb-4">Why Use Emet Capital in {data.name}?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                As a commercial finance brokerage, Emet Capital provides access to over 50 lenders — from major banks and specialist non-bank lenders to private capital providers — across every category of commercial lending. We work with {data.name} borrowers on both straightforward and complex transactions, matching the right product and lender to the actual timing, security, and purpose of each deal.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This is commercial and business-purpose lending only. We do not provide consumer or retail home loan products.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent mb-1">50+</p>
                  <p className="text-sm text-muted-foreground">Lender relationships</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent mb-1">24–48hr</p>
                  <p className="text-sm text-muted-foreground">Initial assessment</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent mb-1">13</p>
                  <p className="text-sm text-muted-foreground">Finance categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to discuss your {data.name} finance needs?</h2>
            <p className="text-muted-foreground mb-6">
              Tell us about your project or situation — we'll identify the most relevant lenders and structure options for your specific transaction.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link to="/contact">
                <FileText className="mr-2 h-5 w-5" />
                Contact Emet Capital
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityLandingPage;
