import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle, Phone, Shield, UserRound } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
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
    "Caveat loans",
    "Second mortgages",
    "Bridging finance",
    "Commercial property finance",
    "Private lending",
    "Business finance",
  ];

  return (
    <div className="min-h-screen py-8">
      <SEO
        title="Daniel | Director at Emet Capital"
        description="Daniel is the Director at Emet Capital, focused on commercial finance and private lending commentary across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance."
        keywords="Daniel Emet Capital, Director Emet Capital, commercial finance commentary, private lending commentary, broker market notes"
        canonical="/about/daniel"
        schemas={[profilePageSchema, generateDanielPersonSchema(), generateOrganizationSchema()]}
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
            Daniel is the Director at Emet Capital with 10 years' experience in commercial finance and private lending. He focuses on caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <section className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Director Commentary</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Daniel's content is reserved for Director-level perspective: market notes, lender behaviour observations, strategic borrower positioning, and broker takes on how commercial finance files are being assessed.
                  </p>
                  <p>
                    His writing focuses on what is changing in the market, where borrowers are getting stuck, and what a commercial finance broker is watching when a deal sits outside a simple bank process.
                  </p>
                  <p>
                    Daniel's articles are written as general information for commercial borrowers and referral partners. They do not make current-rate, current-criteria, or approval-likelihood claims without a cited source, and they do not provide personal financial advice.
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
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      {item}
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
