import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./pages/Homepage";
import ResourcesHub from "./pages/ResourcesHub";
import Guides from "./pages/Guides";
import CaseStudies from "./pages/CaseStudies";
import Tools from "./pages/Tools";
import Glossary from "./pages/Glossary";
import FAQs from "./pages/FAQs";
import MarketInsights from "./pages/MarketInsights";
import TestPage from "./pages/TestPage";
import SimpleGuideArticle from "./pages/SimpleGuideArticle";
import GuideArticle from "./pages/GuideArticle";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FirstSecondMortgages from "./pages/services/FirstSecondMortgages";
import CommercialPropertyDevelopment from "./pages/services/CommercialPropertyDevelopment";
import WorkingCapital from "./pages/services/WorkingCapital";
import BridgingFinance from "./pages/services/BridgingFinance";
import RefinancingSolutions from "./pages/services/RefinancingSolutions";
import EquipmentFinance from "./pages/services/EquipmentFinance";
import BusinessAcquisition from "./pages/services/BusinessAcquisition";
import TradeFinance from "./pages/services/TradeFinance";
import AssetBackedLending from "./pages/services/AssetBackedLending";
import PrivateLending from "./pages/services/PrivateLending";
import SMSFLending from "./pages/services/SMSFLending";
import DebtConsolidation from "./pages/services/DebtConsolidation";
import CaveatLoans from "./pages/services/CaveatLoans";
import AssetFinance from "./pages/services/AssetFinance";
import BuildingMaintenanceLoans from "./pages/services/BuildingMaintenanceLoans";
import CapitalWorksFinance from "./pages/services/CapitalWorksFinance";
import StrataFinance from "./pages/services/StrataFinance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/resources" element={<ResourcesHub />} />
              <Route path="/resources/guides" element={<Guides />} />
              <Route path="/resources/guides/test-route" element={<div><h1>Guide Test Route Works</h1><p>Direct guide route test</p></div>} />
              <Route path="/resources/guides/:slug" element={<SimpleGuideArticle />} />
              <Route path="/resources/case-studies" element={<CaseStudies />} />
              <Route path="/resources/case-studies/:slug" element={<SimpleGuideArticle />} />
              <Route path="/resources/tools" element={<Tools />} />
              <Route path="/resources/tools/:slug" element={<SimpleGuideArticle />} />
              <Route path="/resources/glossary" element={<Glossary />} />
              <Route path="/resources/faqs" element={<FAQs />} />
              <Route path="/resources/insights" element={<MarketInsights />} />
              <Route path="/resources/insights/:slug" element={<SimpleGuideArticle />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/consultation" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/first-second-mortgages" element={<FirstSecondMortgages />} />
              <Route path="/services/commercial-property-development" element={<CommercialPropertyDevelopment />} />
              <Route path="/services/working-capital" element={<WorkingCapital />} />
              <Route path="/services/bridging-finance" element={<BridgingFinance />} />
              <Route path="/services/refinancing" element={<RefinancingSolutions />} />
              <Route path="/services/equipment-finance" element={<EquipmentFinance />} />
              <Route path="/services/business-acquisition" element={<BusinessAcquisition />} />
              <Route path="/services/trade-finance" element={<TradeFinance />} />
              <Route path="/services/asset-backed-lending" element={<AssetBackedLending />} />
              <Route path="/services/private-lending" element={<PrivateLending />} />
              <Route path="/services/smsf-lending" element={<SMSFLending />} />
              <Route path="/services/debt-consolidation" element={<DebtConsolidation />} />
              <Route path="/services/caveat-loans" element={<CaveatLoans />} />
              <Route path="/services/asset-finance" element={<AssetFinance />} />
              <Route path="/services/building-maintenance-loans" element={<BuildingMaintenanceLoans />} />
              <Route path="/services/capital-works-finance" element={<CapitalWorksFinance />} />
              <Route path="/services/strata-finance" element={<StrataFinance />} />
              <Route path="/about" element={<About />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/simple-test" element={<div><h1>Simple Test Works</h1><p>This is a direct test component</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
