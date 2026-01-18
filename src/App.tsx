import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load components for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Guides = lazy(() => import("./pages/Guides"));
const Tools = lazy(() => import("./pages/Tools"));
const Contact = lazy(() => import("./pages/Contact"));
const ResourcesHub = lazy(() => import("./pages/ResourcesHub"));
const MarketInsights = lazy(() => import("./pages/MarketInsights"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Glossary = lazy(() => import("./pages/Glossary"));
const GuideArticle = lazy(() => import("./pages/GuideArticle"));
const CaseStudyArticle = lazy(() => import("./pages/CaseStudyArticle"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));

// Service pages
const PrivateLending = lazy(() => import("./pages/services/PrivateLending"));
const AssetBackedLending = lazy(() => import("./pages/services/AssetBackedLending"));
const BridgingFinance = lazy(() => import("./pages/services/BridgingFinance"));
const AssetFinance = lazy(() => import("./pages/services/AssetFinance"));
const CommercialPropertyDevelopment = lazy(() => import("./pages/services/CommercialPropertyDevelopment"));
const WorkingCapital = lazy(() => import("./pages/services/WorkingCapital"));
const BusinessAcquisition = lazy(() => import("./pages/services/BusinessAcquisition"));
const CaveatLoans = lazy(() => import("./pages/services/CaveatLoans"));
const FirstSecondMortgages = lazy(() => import("./pages/services/FirstSecondMortgages"));
const DebtConsolidation = lazy(() => import("./pages/services/DebtConsolidation"));
const RefinancingSolutions = lazy(() => import("./pages/services/RefinancingSolutions"));
const EquipmentFinance = lazy(() => import("./pages/services/EquipmentFinance"));
const TradeFinance = lazy(() => import("./pages/services/TradeFinance"));
const SMSFLending = lazy(() => import("./pages/services/SMSFLending"));

// City-specific service pages
const FirstSecondMortgagesSydney = lazy(() => import("./pages/services/cities/FirstSecondMortgagesSydney"));
const FirstSecondMortgagesMelbourne = lazy(() => import("./pages/services/cities/FirstSecondMortgagesMelbourne"));
const FirstSecondMortgagesBrisbane = lazy(() => import("./pages/services/cities/FirstSecondMortgagesBrisbane"));
const FirstSecondMortgagesPerth = lazy(() => import("./pages/services/cities/FirstSecondMortgagesPerth"));
const FirstSecondMortgagesAdelaide = lazy(() => import("./pages/services/cities/FirstSecondMortgagesAdelaide"));
const FirstSecondMortgagesGoldCoast = lazy(() => import("./pages/services/cities/FirstSecondMortgagesGoldCoast"));
const CommercialDevelopmentSydney = lazy(() => import("./pages/services/cities/CommercialDevelopmentSydney"));
const CommercialDevelopmentMelbourne = lazy(() => import("./pages/services/cities/CommercialDevelopmentMelbourne"));
const CommercialDevelopmentBrisbane = lazy(() => import("./pages/services/cities/CommercialDevelopmentBrisbane"));

// Tool pages
const CommercialPropertyLoanCalculator = lazy(() => import("./pages/tools/CommercialPropertyLoanCalculator"));
const CommercialRealEstateCalculator = lazy(() => import("./pages/tools/CommercialRealEstateCalculator"));
const LoanComparisonTool = lazy(() => import("./pages/tools/LoanComparisonTool"));
const SecondMortgageCalculator = lazy(() => import("./pages/tools/SecondMortgageCalculator"));
const WorkingCapitalCalculator = lazy(() => import("./pages/tools/WorkingCapitalCalculator"));
const AssetFinanceROICalculator = lazy(() => import("./pages/tools/AssetFinanceROICalculator"));
const BridgingLoanCalculator = lazy(() => import("./pages/tools/BridgingLoanCalculator"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                {/* Legacy URL redirects */}
                <Route path="/about-us" element={<Navigate to="/about" replace />} />
                <Route path="/commercial-property-development" element={<Navigate to="/services/commercial-property-development" replace />} />
                <Route path="/business-investment-expansion" element={<Navigate to="/services/business-acquisition" replace />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/resources" element={<ResourcesHub />} />
                <Route path="/resources/guides" element={<Guides />} />
                <Route path="/resources/guides/:slug" element={<GuideArticle />} />
                <Route path="/resources/case-studies" element={<CaseStudies />} />
                <Route path="/resources/case-studies/:slug" element={<CaseStudyArticle />} />
                <Route path="/resources/tools" element={<Tools />} />
                <Route path="/resources/glossary" element={<Glossary />} />
                <Route path="/resources/faqs" element={<FAQs />} />
                <Route path="/resources/insights" element={<MarketInsights />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/case-studies/:slug" element={<CaseStudyArticle />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/insights" element={<MarketInsights />} />
                <Route path="/market-insights" element={<MarketInsights />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/services/first-second-mortgages" element={<FirstSecondMortgages />} />
                <Route path="/services/commercial-property-development" element={<CommercialPropertyDevelopment />} />
                <Route path="/services/working-capital" element={<WorkingCapital />} />
                <Route path="/services/bridging-finance" element={<BridgingFinance />} />
                <Route path="/services/refinancing-solutions" element={<RefinancingSolutions />} />
                <Route path="/services/equipment-finance" element={<EquipmentFinance />} />
                <Route path="/services/business-acquisition" element={<BusinessAcquisition />} />
                <Route path="/services/trade-finance" element={<TradeFinance />} />
                <Route path="/services/asset-backed-lending" element={<AssetBackedLending />} />
                <Route path="/services/private-lending" element={<PrivateLending />} />
                <Route path="/services/smsf-lending" element={<SMSFLending />} />
                <Route path="/services/debt-consolidation" element={<DebtConsolidation />} />
                <Route path="/services/caveat-loans" element={<CaveatLoans />} />
                <Route path="/services/asset-finance" element={<AssetFinance />} />
                {/* City-specific service pages */}
                <Route path="/services/first-second-mortgages/cities/sydney" element={<FirstSecondMortgagesSydney />} />
                <Route path="/services/first-second-mortgages/cities/melbourne" element={<FirstSecondMortgagesMelbourne />} />
                <Route path="/services/first-second-mortgages/cities/brisbane" element={<FirstSecondMortgagesBrisbane />} />
                <Route path="/services/first-second-mortgages/cities/perth" element={<FirstSecondMortgagesPerth />} />
                <Route path="/services/first-second-mortgages/cities/adelaide" element={<FirstSecondMortgagesAdelaide />} />
                <Route path="/services/first-second-mortgages/cities/gold-coast" element={<FirstSecondMortgagesGoldCoast />} />
                <Route path="/services/commercial-property-development/cities/sydney" element={<CommercialDevelopmentSydney />} />
                <Route path="/services/commercial-property-development/cities/melbourne" element={<CommercialDevelopmentMelbourne />} />
                <Route path="/services/commercial-property-development/cities/brisbane" element={<CommercialDevelopmentBrisbane />} />
                <Route path="/tools/commercial-property-loan-calculator" element={<CommercialPropertyLoanCalculator />} />
                <Route path="/tools/second-mortgage-calculator" element={<SecondMortgageCalculator />} />
                <Route path="/tools/commercial-real-estate-calculator" element={<CommercialRealEstateCalculator />} />
                <Route path="/tools/asset-finance-roi-calculator" element={<AssetFinanceROICalculator />} />
                <Route path="/tools/working-capital-calculator" element={<WorkingCapitalCalculator />} />
                <Route path="/tools/loan-comparison-tool" element={<LoanComparisonTool />} />
                <Route path="/tools/bridging-loan-calculator" element={<BridgingLoanCalculator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;