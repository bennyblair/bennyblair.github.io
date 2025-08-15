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
import NotFound from "./pages/NotFound";

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
