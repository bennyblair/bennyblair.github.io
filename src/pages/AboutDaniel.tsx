import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle, Phone, Shield, UserRound } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import AuthorArticleFeed from "@/components/AuthorArticleFeed";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DANIEL_AUTHOR, generateDanielPersonSchema, generateOrganizationSchema } from "@/lib/schema-utils";

const AboutDaniel = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Daniel" },
  ];

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Daniel | Director at Emet Capital",
    "description": DANIEL_AUTHOR.shortBio,
    "url": "https://emetcapital.com.au/about/daniel",
    "mainEntity": generateDanielPersonSchema(),
  };

  const expertise = [
    {
      title: "Caveat loans",
      text: "Daniel's commentary focuses on where urgent caveat scenarios are legitimate, where risk is being misread, and what warning signs referrers should notice.",
    },
    {
      title: "Second mortgages",
      text: "He covers priority, intercreditor behaviour, second-ranking risk, and when a borrower may be better served by a different structure.",
    },
    {
      title: "Bridging finance",
      text: "Daniel writes about bridging as a timing function: what breaks between contract, valuation, lender decisioning, and exit.",
    },
    {
      title: "Commercial property finance",
      text: "His commercial property work focuses on lender appetite, lease strength, valuation risk, and how broker positioning affects outcomes.",
    },
    {
      title: "Private lending",
      text: "Daniel covers private credit and lender behaviour at a market level without making uncited current-rate or criteria claims.",
    },
    {
      title: "Business finance",
      text: "His business-finance commentary is strongest where cash-flow pressure, ATO timing, debt structure, or acquisition strategy affect lender fit.",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <SEO
        title="Daniel | Director at Emet Capital"
        description="Daniel is the Director at Emet Capital with 10 years' experience in commercial finance and private lending, focused on market commentary, lender behaviour, strategic comparisons, and broker takes."
        keywords="Daniel, Emet Capital Director, commercial finance commentary, private lending commentary, broker market notes"
        canonical="/about/daniel"
        schemas={[profilePageSchema, generateDanielPersonSchema(), generateOrganizationSchema({ includeSameAs: false })]}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-6">
            <UserRound className="h-4 w-4" />
            Director
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Daniel
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Daniel is the Director at Emet Capital with 10 years' experience in commercial finance and private lending. He focuses on market commentary, lender behaviour, and strategic comparisons across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <section className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Director Commentary</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Daniel's content is reserved for Director-level perspective: market notes, lender behaviour observations, strategic borrower positioning, rate and pricing interpretation where supported by sources, lender directories, broker selection, and X-vs-Y finance comparisons. His work is less about step-by-step document preparation and more about how the market is behaving, where borrowers are getting stuck, and how a commercial finance file is likely to be read by different lender types.
                  </p>
                  <p>
                    Daniel works across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs, property investors, and referral partners. His commentary is intended for readers who need a broker-side read on risk: whether the lender market is moving, whether the borrower story is too thin, whether a transaction is being forced into the wrong product, or whether timing pressure is hiding a structural issue.
                  </p>
                  <p>
                    At Emet Capital, Daniel's author lane is deliberately narrower than Ben's. He writes the strategic pieces, comparisons, and commentary where Director judgement is useful. His articles are general information for commercial borrowers and referral partners. They do not make current-rate, current-criteria, or approval-likelihood claims without a cited source, and they do not provide financial, legal, tax, or credit advice.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">What Daniel Covers</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Lender behaviour and appetite observations",
                    "Market notes for commercial borrowers",
                    "Strategic borrower positioning",
                    "Broker-side warning signs",
                    "Director-level commentary on private credit",
                    "Policy or pricing changes when supported by a cited source",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-md border border-border p-4">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <AuthorArticleFeed
              authorName="Daniel"
              heading="Recent Commentary and Comparisons"
              intro="Daniel's recent articles focus on strategic comparisons, lender behaviour, directories, and market notes where a Director-level broker read is useful."
            />
          </section>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-bold text-foreground">Areas of Expertise</h2>
                </div>
                <ul className="space-y-3">
                  {expertise.map((item) => (
                    <li key={item.title} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>
                        <span className="font-semibold text-foreground">{item.title}:</span> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-bold text-foreground">General Information</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Daniel's commentary is intended to help borrowers and referral partners understand market context. It is not financial, legal, tax, or credit advice.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Contact Daniel</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Speak with Emet Capital about a commercial finance scenario.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <a href="tel:+61485952651">
                      <Phone className="mr-2 h-4 w-4" />
                      0485 952 651
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">
                      Contact Form
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AboutDaniel;
