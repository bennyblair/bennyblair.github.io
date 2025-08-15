import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Calculator, Star, Clock, CheckCircle, ArrowRight } from "lucide-react";

const Tools = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const calculatePayments = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const payments = (parseFloat(loanTerm) || 0) * 12;

    if (principal > 0 && rate > 0 && payments > 0) {
      const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
      const totalPayment = monthlyPayment * payments;
      const totalInterest = totalPayment - principal;

      return {
        monthlyPayment: monthlyPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalPayment: totalPayment.toFixed(2)
      };
    }
    return null;
  };

  const results = calculatePayments();

  const upcomingTools = [
    {
      title: "Cash Flow Projection Calculator",
      description: "Project future cash flows with loan payments factored in",
      features: ["Monthly projections", "Scenario planning", "Break-even analysis"],
      status: "Coming Soon"
    },
    {
      title: "Asset Finance ROI Calculator",
      description: "Calculate return on investment for equipment purchases",
      features: ["ROI analysis", "Depreciation factors", "Tax implications"],
      status: "Coming Soon"
    },
    {
      title: "Development Finance Feasibility Tool",
      description: "Assess project viability and financing requirements",
      features: ["Cost estimation", "Profit projections", "Risk assessment"],
      status: "Coming Soon"
    },
    {
      title: "Working Capital Requirements Calculator",
      description: "Determine optimal working capital for your business",
      features: ["Industry benchmarks", "Seasonal adjustments", "Growth planning"],
      status: "Coming Soon"
    },
    {
      title: "Loan Comparison Tool",
      description: "Compare multiple loan offers side by side",
      features: ["Rate comparison", "Cost analysis", "Term optimization"],
      status: "Coming Soon"
    },
    {
      title: "Risk Assessment Calculator",
      description: "Evaluate lending risk factors for your application",
      features: ["Credit scoring", "Industry analysis", "Improvement tips"],
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
          { label: "Tools & Calculators" }
        ]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Commercial Lending Tools & Calculators
          </h1>
          <p className="text-xl text-muted-foreground">
            Professional-grade financial calculators to help you plan and estimate your commercial lending needs with confidence.
          </p>
        </div>

        {/* Featured Calculator */}
        <Card className="mb-12 bg-gradient-to-r from-accent/5 to-accent-light/5 border-accent/20">
          <CardContent className="p-8">
            <div className="flex items-center mb-6">
              <Star className="w-6 h-6 text-accent mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Bridging Loan Calculator</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Inputs */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="loanAmount" className="text-sm font-medium text-foreground">
                    Loan Amount ($)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="500000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="interestRate" className="text-sm font-medium text-foreground">
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    placeholder="8.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="loanTerm" className="text-sm font-medium text-foreground">
                    Loan Term (Years)
                  </Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    step="0.5"
                    placeholder="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Calculation Results</h3>
                {results ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Monthly Payment:</span>
                      <span className="text-lg font-bold text-primary">${results.monthlyPayment}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-muted-foreground">Total Interest:</span>
                      <span className="text-lg font-bold text-foreground">${results.totalInterest}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-muted-foreground">Total Repayment:</span>
                      <span className="text-lg font-bold text-foreground">${results.totalPayment}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Enter loan details to see calculations</p>
                )}
                
                <div className="mt-6">
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-accent-foreground"
                  >
                    <Link to="/contact">Get Personalized Quote</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-secondary-blue rounded-lg">
              <h4 className="font-semibold text-secondary-blue-foreground mb-2">Calculator Features:</h4>
              <ul className="grid md:grid-cols-3 gap-2 text-sm text-secondary-blue-foreground">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Real-time calculations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Professional accuracy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Detailed breakdown
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tools */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            More Tools Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calculator className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {tool.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {tool.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {tool.description}
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    disabled 
                    className="w-full opacity-50 cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16 py-12 bg-gradient-to-r from-primary to-primary-light rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-2xl font-bold text-primary-foreground mb-4">
              Need More Than Just Calculations?
            </h2>
            <p className="text-primary-foreground/90 mb-6">
              Our tools provide estimates, but every business situation is unique. Get expert analysis and personalized lending solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-accent-foreground"
              >
                <Link to="/contact">
                  Speak with Expert
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/resources/guides">Read Our Guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tools;