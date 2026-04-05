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
const LocationRedirect = lazy(() => import("./pages/LocationRedirect"));
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
const SMSFLendingSydney = lazy(() => import("./pages/services/cities/SMSFLendingSydney"));
const SMSFLendingMelbourne = lazy(() => import("./pages/services/cities/SMSFLendingMelbourne"));
const SMSFLendingBrisbane = lazy(() => import("./pages/services/cities/SMSFLendingBrisbane"));
const SMSFLendingPerth = lazy(() => import("./pages/services/cities/SMSFLendingPerth"));
const SMSFLendingAdelaide = lazy(() => import("./pages/services/cities/SMSFLendingAdelaide"));
const SMSFLendingGoldCoast = lazy(() => import("./pages/services/cities/SMSFLendingGoldCoast"));

// City-specific service pages
const PrivateLendingSydney = lazy(() => import("./pages/services/cities/PrivateLendingSydney"));
const PrivateLendingMelbourne = lazy(() => import("./pages/services/cities/PrivateLendingMelbourne"));
const PrivateLendingBrisbane = lazy(() => import("./pages/services/cities/PrivateLendingBrisbane"));
const PrivateLendingPerth = lazy(() => import("./pages/services/cities/PrivateLendingPerth"));
const PrivateLendingAdelaide = lazy(() => import("./pages/services/cities/PrivateLendingAdelaide"));
const PrivateLendingGoldCoast = lazy(() => import("./pages/services/cities/PrivateLendingGoldCoast"));
const FirstSecondMortgagesSydney = lazy(() => import("./pages/services/cities/FirstSecondMortgagesSydney"));
const FirstSecondMortgagesMelbourne = lazy(() => import("./pages/services/cities/FirstSecondMortgagesMelbourne"));
const FirstSecondMortgagesBrisbane = lazy(() => import("./pages/services/cities/FirstSecondMortgagesBrisbane"));
const FirstSecondMortgagesPerth = lazy(() => import("./pages/services/cities/FirstSecondMortgagesPerth"));
const FirstSecondMortgagesAdelaide = lazy(() => import("./pages/services/cities/FirstSecondMortgagesAdelaide"));
const FirstSecondMortgagesGoldCoast = lazy(() => import("./pages/services/cities/FirstSecondMortgagesGoldCoast"));
const CommercialDevelopmentSydney = lazy(() => import("./pages/services/cities/CommercialDevelopmentSydney"));
const CommercialDevelopmentMelbourne = lazy(() => import("./pages/services/cities/CommercialDevelopmentMelbourne"));
const CommercialDevelopmentBrisbane = lazy(() => import("./pages/services/cities/CommercialDevelopmentBrisbane"));
const CommercialDevelopmentPerth = lazy(() => import("./pages/services/cities/CommercialDevelopmentPerth"));
const CommercialDevelopmentAdelaide = lazy(() => import("./pages/services/cities/CommercialDevelopmentAdelaide"));
const CommercialDevelopmentGoldCoast = lazy(() => import("./pages/services/cities/CommercialDevelopmentGoldCoast"));

const BridgingFinanceSydney = lazy(() => import("./pages/services/cities/BridgingFinanceSydney"));
const BridgingFinanceMelbourne = lazy(() => import("./pages/services/cities/BridgingFinanceMelbourne"));
const BridgingFinanceBrisbane = lazy(() => import("./pages/services/cities/BridgingFinanceBrisbane"));
// Tool pages
const BridgingFinancePerth = lazy(() => import("./pages/services/cities/BridgingFinancePerth"));
const BridgingFinanceAdelaide = lazy(() => import("./pages/services/cities/BridgingFinanceAdelaide"));
const BridgingFinanceGoldCoast = lazy(() => import("./pages/services/cities/BridgingFinanceGoldCoast"));

const AssetFinanceSydney = lazy(() => import("./pages/services/cities/AssetFinanceSydney"));
const AssetFinanceMelbourne = lazy(() => import("./pages/services/cities/AssetFinanceMelbourne"));
const AssetFinanceBrisbane = lazy(() => import("./pages/services/cities/AssetFinanceBrisbane"));
const AssetFinancePerth = lazy(() => import("./pages/services/cities/AssetFinancePerth"));
const AssetFinanceAdelaide = lazy(() => import("./pages/services/cities/AssetFinanceAdelaide"));
const AssetFinanceGoldCoast = lazy(() => import("./pages/services/cities/AssetFinanceGoldCoast"));

const AssetBackedLendingSydney = lazy(() => import("./pages/services/cities/AssetBackedLendingSydney"));
const AssetBackedLendingMelbourne = lazy(() => import("./pages/services/cities/AssetBackedLendingMelbourne"));
const AssetBackedLendingBrisbane = lazy(() => import("./pages/services/cities/AssetBackedLendingBrisbane"));
const AssetBackedLendingPerth = lazy(() => import("./pages/services/cities/AssetBackedLendingPerth"));
const AssetBackedLendingAdelaide = lazy(() => import("./pages/services/cities/AssetBackedLendingAdelaide"));
const AssetBackedLendingGoldCoast = lazy(() => import("./pages/services/cities/AssetBackedLendingGoldCoast"));

const RefinancingSolutionsSydney = lazy(() => import("./pages/services/cities/RefinancingSolutionsSydney"));
const RefinancingSolutionsMelbourne = lazy(() => import("./pages/services/cities/RefinancingSolutionsMelbourne"));
const RefinancingSolutionsBrisbane = lazy(() => import("./pages/services/cities/RefinancingSolutionsBrisbane"));
const RefinancingSolutionsGoldCoast = lazy(() => import("./pages/services/cities/RefinancingSolutionsGoldCoast"));
const RefinancingSolutionsAdelaide = lazy(() => import("./pages/services/cities/RefinancingSolutionsAdelaide"));
const RefinancingSolutionsPerth = lazy(() => import("./pages/services/cities/RefinancingSolutionsPerth"));


const BusinessAcquisitionSydney = lazy(() => import("./pages/services/cities/BusinessAcquisitionSydney"));
const BusinessAcquisitionMelbourne = lazy(() => import("./pages/services/cities/BusinessAcquisitionMelbourne"));
const BusinessAcquisitionBrisbane = lazy(() => import("./pages/services/cities/BusinessAcquisitionBrisbane"));
const BusinessAcquisitionPerth = lazy(() => import("./pages/services/cities/BusinessAcquisitionPerth"));
const BusinessAcquisitionAdelaide = lazy(() => import("./pages/services/cities/BusinessAcquisitionAdelaide"));
const BusinessAcquisitionGoldCoast = lazy(() => import("./pages/services/cities/BusinessAcquisitionGoldCoast"));

const DebtConsolidationSydney = lazy(() => import("./pages/services/cities/DebtConsolidationSydney"));
const DebtConsolidationMelbourne = lazy(() => import("./pages/services/cities/DebtConsolidationMelbourne"));
const DebtConsolidationBrisbane = lazy(() => import("./pages/services/cities/DebtConsolidationBrisbane"));
const DebtConsolidationPerth = lazy(() => import("./pages/services/cities/DebtConsolidationPerth"));
const DebtConsolidationAdelaide = lazy(() => import("./pages/services/cities/DebtConsolidationAdelaide"));
const DebtConsolidationGoldCoast = lazy(() => import("./pages/services/cities/DebtConsolidationGoldCoast"));

const EquipmentFinanceSydney = lazy(() => import("./pages/services/cities/EquipmentFinanceSydney"));
const EquipmentFinanceMelbourne = lazy(() => import("./pages/services/cities/EquipmentFinanceMelbourne"));
const EquipmentFinanceBrisbane = lazy(() => import("./pages/services/cities/EquipmentFinanceBrisbane"));
const EquipmentFinancePerth = lazy(() => import("./pages/services/cities/EquipmentFinancePerth"));
const EquipmentFinanceAdelaide = lazy(() => import("./pages/services/cities/EquipmentFinanceAdelaide"));
const EquipmentFinanceGoldCoast = lazy(() => import("./pages/services/cities/EquipmentFinanceGoldCoast"));

const WorkingCapitalSydney = lazy(() => import("./pages/services/cities/WorkingCapitalSydney"));
const WorkingCapitalMelbourne = lazy(() => import("./pages/services/cities/WorkingCapitalMelbourne"));
const WorkingCapitalBrisbane = lazy(() => import("./pages/services/cities/WorkingCapitalBrisbane"));
const WorkingCapitalPerth = lazy(() => import("./pages/services/cities/WorkingCapitalPerth"));
const WorkingCapitalAdelaide = lazy(() => import("./pages/services/cities/WorkingCapitalAdelaide"));
const WorkingCapitalGoldCoast = lazy(() => import("./pages/services/cities/WorkingCapitalGoldCoast"));

const TradeFinanceSydney = lazy(() => import("./pages/services/cities/TradeFinanceSydney"));
const TradeFinanceMelbourne = lazy(() => import("./pages/services/cities/TradeFinanceMelbourne"));
const TradeFinanceBrisbane = lazy(() => import("./pages/services/cities/TradeFinanceBrisbane"));
const TradeFinancePerth = lazy(() => import("./pages/services/cities/TradeFinancePerth"));
const TradeFinanceAdelaide = lazy(() => import("./pages/services/cities/TradeFinanceAdelaide"));
const TradeFinanceGoldCoast = lazy(() => import("./pages/services/cities/TradeFinanceGoldCoast"));

const CaveatLoansSydney = lazy(() => import("./pages/services/cities/CaveatLoansSydney"));
const CaveatLoansMelbourne = lazy(() => import("./pages/services/cities/CaveatLoansMelbourne"));
const CaveatLoansBrisbane = lazy(() => import("./pages/services/cities/CaveatLoansBrisbane"));
const CaveatLoansPerth = lazy(() => import("./pages/services/cities/CaveatLoansPerth"));
const CaveatLoansAdelaide = lazy(() => import("./pages/services/cities/CaveatLoansAdelaide"));
const CaveatLoansGoldCoast = lazy(() => import("./pages/services/cities/CaveatLoansGoldCoast"));

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
                <Route path="/first-second-mortgages" element={<Navigate to="/services/first-second-mortgages" replace />} />
                <Route path="/apply-now" element={<Navigate to="/contact" replace />} />
                <Route path="/contact-6" element={<Navigate to="/contact" replace />} />
                <Route path="/construction" element={<Navigate to="/services/commercial-property-development" replace />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/resources" element={<ResourcesHub />} />
                <Route path="/resources/guides" element={<Guides />} />
                <Route path="/resources/guides/:slug" element={<GuideArticle />} />
                <Route path="/resources/case-studies" element={<CaseStudies />} />
                <Route path="/resources/case-studies/:slug" element={<CaseStudyArticle />} />
                <Route path="/locations/:city" element={<LocationRedirect />} />
                <Route path="/resources/tools" element={<Tools />} />
                <Route path="/resources/tools/commercial-property-loan-calculator" element={<CommercialPropertyLoanCalculator />} />
                <Route path="/resources/tools/second-mortgage-calculator" element={<SecondMortgageCalculator />} />
                <Route path="/resources/tools/commercial-real-estate-calculator" element={<CommercialRealEstateCalculator />} />
                <Route path="/resources/tools/asset-finance-roi-calculator" element={<AssetFinanceROICalculator />} />
                <Route path="/resources/tools/working-capital-calculator" element={<WorkingCapitalCalculator />} />
                <Route path="/resources/tools/loan-comparison-tool" element={<LoanComparisonTool />} />
                <Route path="/resources/tools/bridging-loan-calculator" element={<BridgingLoanCalculator />} />
                <Route path="/resources/glossary" element={<Glossary />} />
                <Route path="/resources/faqs" element={<FAQs />} />
                <Route path="/resources/insights" element={<MarketInsights />} />
                <Route path="/case-studies" element={<CaseStudies />} />
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
                <Route path="/services/smsf-lending/cities/sydney" element={<SMSFLendingSydney />} />
                <Route path="/services/smsf-lending/cities/melbourne" element={<SMSFLendingMelbourne />} />
                <Route path="/services/smsf-lending/cities/brisbane" element={<SMSFLendingBrisbane />} />
                <Route path="/services/smsf-lending/cities/perth" element={<SMSFLendingPerth />} />
                <Route path="/services/smsf-lending/cities/adelaide" element={<SMSFLendingAdelaide />} />
                <Route path="/services/smsf-lending/cities/gold-coast" element={<SMSFLendingGoldCoast />} />
                <Route path="/services/debt-consolidation" element={<DebtConsolidation />} />
                <Route path="/services/caveat-loans" element={<CaveatLoans />} />
                <Route path="/services/asset-finance" element={<AssetFinance />} />
                {/* City-specific service pages */}
                <Route path="/services/private-lending/cities/sydney" element={<PrivateLendingSydney />} />
                <Route path="/services/private-lending/cities/melbourne" element={<PrivateLendingMelbourne />} />
                <Route path="/services/private-lending/cities/brisbane" element={<PrivateLendingBrisbane />} />
                <Route path="/services/private-lending/cities/perth" element={<PrivateLendingPerth />} />
                <Route path="/services/private-lending/cities/adelaide" element={<PrivateLendingAdelaide />} />
                <Route path="/services/private-lending/cities/gold-coast" element={<PrivateLendingGoldCoast />} />
                <Route path="/services/first-second-mortgages/cities/sydney" element={<FirstSecondMortgagesSydney />} />
                <Route path="/services/first-second-mortgages/cities/melbourne" element={<FirstSecondMortgagesMelbourne />} />
                <Route path="/services/first-second-mortgages/cities/brisbane" element={<FirstSecondMortgagesBrisbane />} />
                <Route path="/services/first-second-mortgages/cities/perth" element={<FirstSecondMortgagesPerth />} />
                <Route path="/services/first-second-mortgages/cities/adelaide" element={<FirstSecondMortgagesAdelaide />} />
                <Route path="/services/first-second-mortgages/cities/gold-coast" element={<FirstSecondMortgagesGoldCoast />} />
                <Route path="/services/commercial-property-development/cities/sydney" element={<CommercialDevelopmentSydney />} />
                <Route path="/services/commercial-property-development/cities/melbourne" element={<CommercialDevelopmentMelbourne />} />
                <Route path="/services/commercial-property-development/cities/brisbane" element={<CommercialDevelopmentBrisbane />} />
                <Route path="/services/commercial-property-development/cities/perth" element={<CommercialDevelopmentPerth />} />
                <Route path="/services/commercial-property-development/cities/adelaide" element={<CommercialDevelopmentAdelaide />} />
                <Route path="/services/commercial-property-development/cities/gold-coast" element={<CommercialDevelopmentGoldCoast />} />
                <Route path="/tools/commercial-property-loan-calculator" element={<CommercialPropertyLoanCalculator />} />
                <Route path="/services/bridging-finance/cities/sydney" element={<BridgingFinanceSydney />} />
                <Route path="/services/bridging-finance/cities/melbourne" element={<BridgingFinanceMelbourne />} />
                <Route path="/services/bridging-finance/cities/brisbane" element={<BridgingFinanceBrisbane />} />
                <Route path="/tools/second-mortgage-calculator" element={<SecondMortgageCalculator />} />
                <Route path="/services/bridging-finance/cities/perth" element={<BridgingFinancePerth />} />
                <Route path="/services/bridging-finance/cities/adelaide" element={<BridgingFinanceAdelaide />} />
                <Route path="/services/bridging-finance/cities/gold-coast" element={<BridgingFinanceGoldCoast />} />

                <Route path="/services/asset-finance/cities/sydney" element={<AssetFinanceSydney />} />
                <Route path="/services/asset-finance/cities/melbourne" element={<AssetFinanceMelbourne />} />
                <Route path="/services/asset-finance/cities/brisbane" element={<AssetFinanceBrisbane />} />
                <Route path="/services/asset-finance/cities/perth" element={<AssetFinancePerth />} />
                <Route path="/services/asset-finance/cities/adelaide" element={<AssetFinanceAdelaide />} />
                <Route path="/services/asset-finance/cities/gold-coast" element={<AssetFinanceGoldCoast />} />

                <Route path="/services/asset-backed-lending/sydney" element={<AssetBackedLendingSydney />} />
                <Route path="/services/asset-backed-lending/melbourne" element={<AssetBackedLendingMelbourne />} />
                <Route path="/services/asset-backed-lending/brisbane" element={<AssetBackedLendingBrisbane />} />
                <Route path="/services/asset-backed-lending/perth" element={<AssetBackedLendingPerth />} />
                <Route path="/services/asset-backed-lending/adelaide" element={<AssetBackedLendingAdelaide />} />
                <Route path="/services/asset-backed-lending/gold-coast" element={<AssetBackedLendingGoldCoast />} />

                <Route path="/services/refinancing-solutions/sydney" element={<RefinancingSolutionsSydney />} />
                <Route path="/services/refinancing-solutions/melbourne" element={<RefinancingSolutionsMelbourne />} />
                <Route path="/services/refinancing-solutions/brisbane" element={<RefinancingSolutionsBrisbane />} />
                <Route path="/services/refinancing-solutions/cities/sydney" element={<RefinancingSolutionsSydney />} />
                <Route path="/services/refinancing-solutions/cities/melbourne" element={<RefinancingSolutionsMelbourne />} />
                <Route path="/services/refinancing-solutions/cities/brisbane" element={<RefinancingSolutionsBrisbane />} />
                <Route path="/services/refinancing-solutions/cities/perth" element={<RefinancingSolutionsPerth />} />
                <Route path="/services/refinancing-solutions/cities/adelaide" element={<RefinancingSolutionsAdelaide />} />
                <Route path="/services/refinancing-solutions/cities/gold-coast" element={<RefinancingSolutionsGoldCoast />} />


                <Route path="/services/business-acquisition/cities/sydney" element={<BusinessAcquisitionSydney />} />
                <Route path="/services/business-acquisition/cities/melbourne" element={<BusinessAcquisitionMelbourne />} />
                <Route path="/services/business-acquisition/cities/brisbane" element={<BusinessAcquisitionBrisbane />} />
                <Route path="/services/business-acquisition/cities/perth" element={<BusinessAcquisitionPerth />} />
                <Route path="/services/business-acquisition/cities/adelaide" element={<BusinessAcquisitionAdelaide />} />
                <Route path="/services/business-acquisition/cities/gold-coast" element={<BusinessAcquisitionGoldCoast />} />

                <Route path="/services/debt-consolidation/cities/sydney" element={<DebtConsolidationSydney />} />
                <Route path="/services/debt-consolidation/cities/melbourne" element={<DebtConsolidationMelbourne />} />
                <Route path="/services/debt-consolidation/cities/brisbane" element={<DebtConsolidationBrisbane />} />
                <Route path="/services/debt-consolidation/cities/perth" element={<DebtConsolidationPerth />} />
                <Route path="/services/debt-consolidation/cities/adelaide" element={<DebtConsolidationAdelaide />} />
                <Route path="/services/debt-consolidation/cities/gold-coast" element={<DebtConsolidationGoldCoast />} />

                <Route path="/services/equipment-finance/cities/sydney" element={<EquipmentFinanceSydney />} />
                <Route path="/services/equipment-finance/cities/melbourne" element={<EquipmentFinanceMelbourne />} />
                <Route path="/services/equipment-finance/cities/brisbane" element={<EquipmentFinanceBrisbane />} />
                <Route path="/services/equipment-finance/cities/perth" element={<EquipmentFinancePerth />} />
                <Route path="/services/equipment-finance/cities/adelaide" element={<EquipmentFinanceAdelaide />} />
                <Route path="/services/equipment-finance/cities/gold-coast" element={<EquipmentFinanceGoldCoast />} />

                <Route path="/services/working-capital/cities/sydney" element={<WorkingCapitalSydney />} />
                <Route path="/services/working-capital/cities/melbourne" element={<WorkingCapitalMelbourne />} />
                <Route path="/services/working-capital/cities/brisbane" element={<WorkingCapitalBrisbane />} />
                <Route path="/services/working-capital/cities/perth" element={<WorkingCapitalPerth />} />
                <Route path="/services/working-capital/cities/adelaide" element={<WorkingCapitalAdelaide />} />
                <Route path="/services/working-capital/cities/gold-coast" element={<WorkingCapitalGoldCoast />} />

                <Route path="/services/trade-finance/cities/sydney" element={<TradeFinanceSydney />} />
                <Route path="/services/trade-finance/cities/melbourne" element={<TradeFinanceMelbourne />} />
                <Route path="/services/trade-finance/cities/brisbane" element={<TradeFinanceBrisbane />} />
                <Route path="/services/trade-finance/cities/perth" element={<TradeFinancePerth />} />
                <Route path="/services/trade-finance/cities/adelaide" element={<TradeFinanceAdelaide />} />
                <Route path="/services/trade-finance/cities/gold-coast" element={<TradeFinanceGoldCoast />} />

                <Route path="/services/caveat-loans/cities/sydney" element={<CaveatLoansSydney />} />
                <Route path="/services/caveat-loans/cities/melbourne" element={<CaveatLoansMelbourne />} />
                <Route path="/services/caveat-loans/cities/brisbane" element={<CaveatLoansBrisbane />} />
                <Route path="/services/caveat-loans/cities/perth" element={<CaveatLoansPerth />} />
                <Route path="/services/caveat-loans/cities/adelaide" element={<CaveatLoansAdelaide />} />
                <Route path="/services/caveat-loans/cities/gold-coast" element={<CaveatLoansGoldCoast />} />

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