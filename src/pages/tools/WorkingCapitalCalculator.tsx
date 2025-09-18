import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Calculator, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

const WorkingCapitalCalculator = () => {
  const [currentAssets, setCurrentAssets] = useState("");
  const [currentLiabilities, setCurrentLiabilities] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [industry, setIndustry] = useState("");

  const industryBenchmarks = {
    retail: { min: 1.5, optimal: 2.0 },
    manufacturing: { min: 1.2, optimal: 1.8 },
    construction: { min: 1.0, optimal: 1.5 },
    services: { min: 1.3, optimal: 1.7 },
    hospitality: { min: 0.8, optimal: 1.2 },
    technology: { min: 2.0, optimal: 3.0 }
  };

  const calculateWorkingCapital = () => {
    const assets = parseFloat(currentAssets) || 0;
    const liabilities = parseFloat(currentLiabilities) || 0;
    const revenue = parseFloat(annualRevenue) || 0;

    if (assets > 0 && liabilities > 0) {
      const workingCapital = assets - liabilities;
      const currentRatio = assets / liabilities;
      const quickRatio = (assets * 0.7) / liabilities; // Assuming 70% of assets are liquid
      const workingCapitalRatio = revenue > 0 ? (workingCapital / revenue) * 100 : 0;
      
      const benchmark = industry ? industryBenchmarks[industry as keyof typeof industryBenchmarks] : null;
      const healthStatus = benchmark ? 
        (currentRatio >= benchmark.optimal ? 'excellent' : 
         currentRatio >= benchmark.min ? 'good' : 'poor') : 'unknown';

      return {
        workingCapital: workingCapital.toFixed(2),
        currentRatio: currentRatio.toFixed(2),
        quickRatio: quickRatio.toFixed(2),
        workingCapitalRatio: workingCapitalRatio.toFixed(2),
        healthStatus,
        benchmark
      };
    }
    return null;
  };

  const results = calculateWorkingCapital();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'poor': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'poor': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Calculator className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const faqs = [
    {
      question: "What is working capital and why is it important?",
      answer: "Working capital is the difference between current assets and current liabilities. It measures your business's ability to pay short-term obligations and fund day-to-day operations."
    },
    {
      question: "What's a good current ratio for my business?",
      answer: "A current ratio between 1.2-2.0 is generally healthy, but optimal ratios vary by industry. Too high may indicate inefficient use of assets, while too low suggests liquidity problems."
    },
    {
      question: "How can I improve my working capital position?",
      answer: "Strategies include accelerating receivables collection, optimizing inventory levels, negotiating better payment terms with suppliers, and securing working capital finance."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Working Capital Calculator | Business Liquidity Analysis Australia</title>
        <meta name="description" content="Calculate your business working capital requirements. Analyze current ratio, quick ratio, and liquidity position with industry benchmarks." />
        <meta name="keywords" content="working capital calculator, current ratio calculator, business liquidity, cash flow analysis, working capital finance Australia" />
        <link rel="canonical" href="/tools/working-capital-calculator" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Working Capital Calculator" }
          ]} />

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Working Capital Calculator
              </h1>
              <p className="text-xl text-muted-foreground">
                Analyze your business liquidity and working capital requirements with industry-specific benchmarks.
              </p>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="currentAssets">Current Assets ($)</Label>
                      <Input
                        id="currentAssets"
                        type="number"
                        placeholder="500000"
                        value={currentAssets}
                        onChange={(e) => setCurrentAssets(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Cash, inventory, accounts receivable, short-term investments</p>
                    </div>

                    <div>
                      <Label htmlFor="currentLiabilities">Current Liabilities ($)</Label>
                      <Input
                        id="currentLiabilities"
                        type="number"
                        placeholder="300000"
                        value={currentLiabilities}
                        onChange={(e) => setCurrentLiabilities(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Accounts payable, short-term debt, accrued expenses</p>
                    </div>

                    <div>
                      <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
                      <Input
                        id="annualRevenue"
                        type="number"
                        placeholder="2000000"
                        value={annualRevenue}
                        onChange={(e) => setAnnualRevenue(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Optional: For working capital ratio calculation</p>
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">For industry-specific benchmark comparison</p>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <Calculator className="w-5 h-5 mr-2 text-primary" />
                      Working Capital Analysis
                    </h3>
                    {results ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-muted-foreground">Working Capital:</span>
                          <span className="text-xl font-bold text-primary">${results.workingCapital}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-muted-foreground">Current Ratio:</span>
                          <span className="text-lg font-bold text-foreground">{results.currentRatio}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-muted-foreground">Quick Ratio:</span>
                          <span className="text-lg font-bold text-foreground">{results.quickRatio}</span>
                        </div>
                        {parseFloat(annualRevenue) > 0 && (
                          <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="text-muted-foreground">WC % of Revenue:</span>
                            <span className="text-lg font-bold text-foreground">{results.workingCapitalRatio}%</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center py-3">
                          <span className="text-muted-foreground">Financial Health:</span>
                          <span className={`text-lg font-bold flex items-center gap-2 ${getStatusColor(results.healthStatus)}`}>
                            {getStatusIcon(results.healthStatus)}
                            <span className="capitalize">{results.healthStatus}</span>
                          </span>
                        </div>
                        {results.benchmark && (
                          <div className="mt-4 p-3 bg-secondary-blue rounded-lg">
                            <p className="text-sm text-secondary-blue-foreground">
                              <strong>Industry Benchmark:</strong> Minimum {results.benchmark.min}, Optimal {results.benchmark.optimal}+
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Enter your financial data to see working capital analysis</p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild className="w-full md:w-auto">
                    <Link to="/contact">Get Working Capital Finance</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Current Ratio</h3>
                  <p className="text-sm text-muted-foreground">
                    Measures ability to pay short-term obligations. Higher ratios indicate better liquidity but may suggest inefficient asset use.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Ratio</h3>
                  <p className="text-sm text-muted-foreground">
                    More conservative liquidity measure excluding inventory. Shows immediate ability to meet obligations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Working Capital</h3>
                  <p className="text-sm text-muted-foreground">
                    Net amount available for operations. Positive working capital indicates healthy short-term financial position.
                  </p>
                </CardContent>
              </Card>
            </div>

            <FAQSection faqs={faqs} />

            <Card className="mt-12 bg-gradient-to-r from-primary to-primary-light">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  Need Working Capital Finance?
                </h3>
                <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                  Our working capital solutions can help improve your cash flow and liquidity position.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                    <Link to="/contact">
                      Speak with Specialist
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/services/working-capital">Learn About Working Capital</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingCapitalCalculator;