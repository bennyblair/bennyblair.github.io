import { Link } from "react-router-dom";
import { ArrowRight, Building2, CheckCircle, Phone, Shield, UserRound } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BEN_AUTHOR, generateBenPersonSchema, generateOrganizationSchema } from "@/lib/schema-utils";

const AboutBen = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Ben" },
  ];

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Ben | Commercial Finance Broker",
    "description": BEN_AUTHOR.shortBio,
    "url": "https://emetcapital.com.au/about/ben",
    "mainEntity": generateBenPersonSchema(),
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
        title="Ben | Commercial Finance Broker at Emet Capital"
        description="Ben is a commercial finance broker at Emet Capital with 10 years' experience in private lending, specialising in operational guides, scenario walkthroughs, and case studies across Emet Capital's six finance pillars."
        keywords="Ben, Emet Capital, commercial finance broker, private lending broker, caveat loans broker, second mortgage broker, bridging finance broker"
        canonical="/about/ben"
        schemas={[profilePageSchema, generateBenPersonSchema(), generateOrganizationSchema()]}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-6">
            <UserRound className="h-4 w-4" />
            Commercial Finance Broker
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ben
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Ben is a commercial finance broker at Emet Capital with 10 years' experience in private lending. He specialises in operational finance guides, scenario walkthroughs, and case studies across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <section className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Broker Background</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Ben works with Australian business owners, property investors, and developers who need practical guidance across private lending, property-backed funding, non-bank commercial finance, and business finance options.
                  </p>
                  <p>
                    His content lane is operational: how-to guides, checklists, settlement explainers, document walkthroughs, case studies, and borrower scenarios where the useful answer is practical rather than market commentary.
                  </p>
                  <p>
                    The content Ben authors for Emet Capital is written as general information for commercial borrowers. It is designed to explain security, exit strategy, documents, timing, and risk in plain English, not to provide personal financial advice.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">How Ben Reviews Lending Scenarios</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "What is the funding purpose?",
                    "What security is available?",
                    "How clean is the title and ownership structure?",
                    "What documents can be produced quickly?",
                    "What is the realistic repayment or refinance exit?",
                    "What happens if the exit is delayed?",
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
                  Articles written by Ben explain commercial finance concepts for Australian borrowers. They do not replace advice from a licensed professional who understands your full circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-3">Contact Ben</h2>
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

export default AboutBen;
