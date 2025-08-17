import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import ResourcesHub from "./pages/ResourcesHub";
import Guides from "./pages/Guides";
import CaseStudies from "./pages/CaseStudies";
import Tools from "./pages/Tools";
import Glossary from "./pages/Glossary";
import FAQs from "./pages/FAQs";
import MarketInsights from "./pages/MarketInsights";
import GuideArticle from "./pages/GuideArticle";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FirstSecondMortgages from "./pages/services/FirstSecondMortgages";
import StrataFinance from "./pages/services/StrataFinance";
import CommercialPropertyDevelopment from "./pages/services/CommercialPropertyDevelopment";
import WorkingCapital from "./pages/services/WorkingCapital";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/resources" element={<ResourcesHub />} />
            <Route path="/resources/guides" element={<Guides />} />
            <Route path="/resources/guides/:slug" element={<GuideArticle />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/case-studies/:slug" element={<GuideArticle />} />
            <Route path="/resources/tools" element={<Tools />} />
            <Route path="/resources/glossary" element={<Glossary />} />
            <Route path="/resources/faqs" element={<FAQs />} />
            <Route path="/resources/insights" element={<MarketInsights />} />
            <Route path="/resources/insights/:slug" element={<GuideArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/consultation" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/first-second-mortgages" element={<FirstSecondMortgages />} />
            <Route path="/services/strata-finance" element={<StrataFinance />} />
            <Route path="/services/commercial-property-development" element={<CommercialPropertyDevelopment />} />
            <Route path="/services/working-capital" element={<WorkingCapital />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
