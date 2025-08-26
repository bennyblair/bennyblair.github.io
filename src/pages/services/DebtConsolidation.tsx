import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Target, TrendingDown, RefreshCw, Phone, CheckCircle, ArrowRight } from "lucide-react";

const DebtConsolidation = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Debt Consolidation" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent">Debt Restructure</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Business Debt Consolidation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Simplify your business finances by consolidating multiple debts into a single, manageable facility. From $100K to $50M+ with improved terms and cash flow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground">
              <Link to="/contact">Get Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:0485952651">
                <Phone className="mr-2 h-5 w-5" />
                Call Expert
              </a>
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="premium-card">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Simplified Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Replace multiple loan payments with a single monthly facility, reducing administrative burden and complexity.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <TrendingDown className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Reduced Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Potentially lower your overall borrowing costs through better rates and reduced fees across your debt portfolio.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardHeader className="text-center">
                <RefreshCw className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Improved Cash Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Optimize repayment terms and structures to improve monthly cash flow and working capital management.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Consolidation Benefits */}
        <section className="mb-16">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-2xl">Debt Consolidation Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Financial Advantages</h3>
                  <ul className="space-y-3">
                    {[
                      "Single monthly payment simplicity",
                      "Potentially lower interest rates",
                      "Reduced total monthly payments",
                      "Improved cash flow management",
                      "Lower administrative costs"
                    ].map((advantage, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Debt Types We Consolidate</h3>
                  <ul className="space-y-3">
                    {[
                      "Multiple business loans",
                      "Credit cards and overdrafts",
                      "Equipment finance facilities",
                      "Trade creditor arrangements",
                      "Property and asset loans"
                    ].map((debtType, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{debtType}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-primary-foreground mb-6">
              Simplify Your Business Finances
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Stop juggling multiple debt payments and start focusing on growing your business. Our debt consolidation experts can structure a solution that works for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                <Link to="/contact">
                  Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="tel:0485952651">Speak to Expert</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DebtConsolidation;