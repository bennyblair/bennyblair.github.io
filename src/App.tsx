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
              <Route path="/fast-business-funding" element={
                <div style={{padding: '40px', maxWidth: '1000px', margin: '0 auto', lineHeight: '1.6'}}>
                  <h1 style={{fontSize: '36px', marginBottom: '20px', color: '#2c3e50'}}>How to Secure Fast Business Funding in Australia: Complete Guide</h1>
                  
                  <div style={{backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px', marginBottom: '30px'}}>
                    <p style={{fontSize: '18px', margin: '0', fontStyle: 'italic'}}>
                      "In today's competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away."
                    </p>
                  </div>

                  <h2 style={{fontSize: '28px', marginBottom: '15px', color: '#34495e'}}>What is Fast Business Funding?</h2>
                  <p style={{marginBottom: '20px', fontSize: '16px'}}>
                    Fast business funding refers to financing solutions that can be approved and disbursed quickly, typically within 24-48 hours to a few weeks. 
                    Unlike traditional bank loans that may take months to process, fast funding options are designed for businesses that need immediate capital injection.
                  </p>

                  <h2 style={{fontSize: '28px', marginBottom: '15px', color: '#34495e'}}>Types of Fast Business Funding Available</h2>
                  
                  <h3 style={{fontSize: '22px', marginBottom: '10px', color: '#2980b9'}}>Asset-Based Lending</h3>
                  <p style={{marginBottom: '15px'}}>
                    Asset-based lending allows businesses to borrow against their existing assets, including property, equipment, or inventory. 
                    This type of funding is often processed faster because the collateral reduces lender risk.
                  </p>

                  <h3 style={{fontSize: '22px', marginBottom: '10px', color: '#2980b9'}}>Bridging Loans</h3>
                  <p style={{marginBottom: '15px'}}>
                    Bridging loans provide short-term financing to bridge timing gaps, such as when purchasing new premises before selling existing property. 
                    These loans can often be approved within days.
                  </p>

                  <h3 style={{fontSize: '22px', marginBottom: '10px', color: '#2980b9'}}>Caveat Loans</h3>
                  <p style={{marginBottom: '20px'}}>
                    Caveat loans are secured against property and can be processed extremely quickly, sometimes within 24 hours. 
                    They're ideal for businesses needing immediate capital for time-sensitive opportunities.
                  </p>

                  <h2 style={{fontSize: '28px', marginBottom: '15px', color: '#34495e'}}>When to Consider Fast Funding</h2>
                  <ul style={{marginBottom: '20px', paddingLeft: '20px'}}>
                    <li style={{marginBottom: '8px'}}>Time-sensitive business opportunities arise</li>
                    <li style={{marginBottom: '8px'}}>Cash flow gaps need immediate attention</li>
                    <li style={{marginBottom: '8px'}}>Equipment purchases can't wait for lengthy approval processes</li>
                    <li style={{marginBottom: '8px'}}>Property settlements require quick bridging finance</li>
                    <li style={{marginBottom: '8px'}}>Emergency business expenses occur</li>
                  </ul>

                  <h2 style={{fontSize: '28px', marginBottom: '15px', color: '#34495e'}}>Benefits of Fast Business Funding</h2>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px'}}>
                    <div style={{backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px'}}>
                      <h4 style={{color: '#e74c3c', marginBottom: '10px'}}>Speed of Approval</h4>
                      <p style={{margin: '0'}}>Rapid access to capital, with some lenders providing approval within hours rather than weeks or months.</p>
                    </div>
                    <div style={{backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px'}}>
                      <h4 style={{color: '#e74c3c', marginBottom: '10px'}}>Flexible Criteria</h4>
                      <p style={{margin: '0'}}>More flexible lending criteria, considering factors beyond just credit scores and financial statements.</p>
                    </div>
                  </div>

                  <div style={{backgroundColor: '#2c3e50', color: 'white', padding: '30px', borderRadius: '10px', textAlign: 'center', marginTop: '40px'}}>
                    <h3 style={{marginBottom: '15px', fontSize: '24px'}}>Ready to Discuss Your Funding Requirements?</h3>
                    <p style={{marginBottom: '20px', fontSize: '16px'}}>Our commercial lending specialists are here to help structure the right solution for your business.</p>
                    <div style={{display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap'}}>
                      <a href="/contact" style={{
                        backgroundColor: '#3498db', 
                        color: 'white', 
                        padding: '12px 25px', 
                        textDecoration: 'none', 
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        display: 'inline-block'
                      }}>
                        Get Your Quote
                      </a>
                      <a href="tel:0485952651" style={{
                        border: '2px solid #3498db',
                        color: '#3498db', 
                        backgroundColor: 'transparent',
                        padding: '10px 25px', 
                        textDecoration: 'none', 
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        display: 'inline-block'
                      }}>
                        Call 0485 952 651
                      </a>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/test-new-page" element={<div><h1>TEST PAGE WORKS!</h1><p>This is a test of new page routing</p></div>} />
              <Route path="/guides/:slug" element={<SimpleGuideArticle />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/resources" element={<ResourcesHub />} />
              <Route path="/resources/guides/:slug" element={<SimpleGuideArticle />} />
              <Route path="/resources/guides" element={<Guides />} />
              <Route path="/resources/guides/test-route" element={<div><h1>Guide Test Route Works</h1><p>Direct guide route test</p></div>} />
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
