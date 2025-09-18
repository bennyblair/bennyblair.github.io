import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";

const AssetFinanceROICalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [annualSavings, setAnnualSavings] = useState("");
  const [operatingCosts, setOperatingCosts] = useState("");
  const [taxRate, setTaxRate] = useState("30");
  const [depreciationYears, setDepreciationYears] = useState("5");

  const calculateROI = () => {
    const price = parseFloat(purchasePrice) || 0;
    const savings = parseFloat(annualSavings) || 0;
    const costs = parseFloat(operatingCosts) || 0;
    const tax = parseFloat(taxRate) || 0;
    const depYears = parseFloat(depreciationYears) || 1;

    if (price > 0) {
      const netAnnualBenefit = savings - costs;
      const annualDepreciation = price / depYears;
      const taxSavings = annualDepreciation * (tax / 100);
      const totalAnnualBenefit = netAnnualBenefit + taxSavings;
      const roi = (totalAnnualBenefit / price) * 100;
      const paybackPeriod = price / totalAnnualBenefit;

      return {
        roi: roi.toFixed(2),
        annualBenefit: totalAnnualBenefit.toFixed(2),
        paybackPeriod: paybackPeriod.toFixed(2),
        taxSavings: taxSavings.toFixed(2)
      };
    }
    return null;
  };

  const results = calculateROI();

  const faqs = [
    {
      question: "How is asset finance ROI calculated?",
      answer: "ROI is calculated by dividing the annual net benefit (including tax savings from depreciation) by the purchase price, then multiplying by 100 to get a percentage."
    },
    {
      question: "What factors should I consider for asset finance?",
      answer: "Consider the asset's productivity gains, maintenance costs, depreciation benefits, tax implications, and how it fits into your business strategy."
    },
    {
      question: "How do tax benefits affect ROI?",
      answer: "Tax deductions from depreciation can significantly improve ROI by reducing your taxable income, effectively lowering the net cost of the asset."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Asset Finance ROI Calculator | Equipment Finance Returns Australia</title>
        <meta name="description" content="Calculate return on investment for equipment purchases. Factor in depreciation, tax benefits, and operational savings to make informed asset finance decisions." />
        <meta name="keywords" content="asset finance ROI calculator, equipment finance returns, asset finance Australia, equipment ROI, depreciation calculator" />
        <link rel="canonical" href="/tools/asset-finance-roi-calculator" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Asset Finance ROI Calculator" }
          ]} />

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Asset Finance ROI Calculator
              </h1>
              <p className="text-xl text-muted-foreground">
                Calculate the return on investment for equipment purchases, including depreciation benefits and tax savings.
              </p>
            </div>

            <Card className="mb-12">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="purchasePrice">Equipment Purchase Price ($)</Label>
                      <Input
                        id="purchasePrice"
                        type="number"
                        placeholder="100000"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="annualSavings">Annual Savings/Revenue ($)</Label>
                      <Input
                        id="annualSavings"
                        type="number"
                        placeholder="25000"
                        value={annualSavings}
                        onChange={(e) => setAnnualSavings(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="operatingCosts">Annual Operating Costs ($)</Label>
                      <Input
                        id="operatingCosts"
                        type="number"
                        placeholder="5000"
                        value={operatingCosts}
                        onChange={(e) => setOperatingCosts(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        placeholder="30"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="depreciationYears">Depreciation Period (Years)</Label>
                      <Input
                        id="depreciationYears"
                        type="number"
                        placeholder="5"
                        value={depreciationYears}
                        onChange={(e) => setDepreciationYears(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                      ROI Analysis Results
                    </h3>
                    {results ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-muted-foreground">Annual ROI:</span>
                          <span className="text-xl font-bold text-primary">{results.roi}%</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-muted-foreground">Annual Benefit:</span>
                          <span className="text-lg font-bold text-foreground">${results.annualBenefit}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-muted-foreground">Tax Savings:</span>
                          <span className="text-lg font-bold text-foreground">${results.taxSavings}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-muted-foreground">Payback Period:</span>
                          <span className="text-lg font-bold text-foreground">{results.paybackPeriod} years</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Enter equipment details to see ROI analysis</p>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild className="w-full md:w-auto">
                    <Link to="/contact">Get Professional Quote</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Asset Finance Benefits</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Preserve working capital for operations</li>
                    <li>• Tax deductions through depreciation</li>
                    <li>• Fixed monthly payments for budgeting</li>
                    <li>• Access to latest equipment technology</li>
                    <li>• Improved cash flow management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">ROI Considerations</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Include productivity improvements</li>
                    <li>• Factor in maintenance and training costs</li>
                    <li>• Consider equipment obsolescence risk</li>
                    <li>• Account for opportunity cost of capital</li>
                    <li>• Evaluate financing vs. purchase options</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <FAQSection faqs={faqs} />

            <Card className="mt-12 bg-gradient-to-r from-primary to-primary-light">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  Ready to Finance Your Equipment?
                </h3>
                <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                  Our asset finance specialists can help you structure the perfect financing solution for your equipment needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-accent-foreground">
                    <Link to="/contact">
                      Speak with Specialist
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link to="/services/asset-finance">Learn About Asset Finance</Link>
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

export default AssetFinanceROICalculator;