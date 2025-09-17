import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/SimpleHomepage";
import Contact from "./pages/SimpleContact";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/fast-business-funding" element={
        <div style={{padding: '40px', maxWidth: '800px', margin: '0 auto'}}>
          <h1>Fast Business Funding in Australia</h1>
          <p>Complete guide to securing fast business funding.</p>
          <h2>What is Fast Business Funding?</h2>
          <p>Fast business funding refers to financing solutions that can be approved quickly.</p>
          <h2>Types Available</h2>
          <ul>
            <li>Asset-Based Lending</li>
            <li>Bridging Loans</li>
            <li>Caveat Loans</li>
          </ul>
          <div style={{backgroundColor: '#f0f8ff', padding: '20px', marginTop: '30px'}}>
            <h3>Get Your Quote</h3>
            <p>Contact our specialists for fast business funding.</p>
            <a href="/#/contact" style={{backgroundColor: '#007bff', color: 'white', padding: '10px 20px', textDecoration: 'none'}}>
              Contact Us
            </a>
          </div>
        </div>
      } />
    </Routes>
  </HashRouter>
);

export default App;
