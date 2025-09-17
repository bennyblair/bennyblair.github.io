import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/SimpleHomepage";
import Contact from "./pages/SimpleContact";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/fast-business-funding" element={
        <div style={{padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif', lineHeight: '1.6'}}>
          <div style={{textAlign: 'center', marginBottom: '40px'}}>
            <h1 style={{fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px'}}>How to Secure Fast Business Funding in Australia</h1>
            <p style={{fontSize: '1.2rem', color: '#7f8c8d', fontStyle: 'italic'}}>Complete Guide for Australian Businesses</p>
          </div>
          
          <div style={{backgroundColor: '#e8f4fd', padding: '25px', borderRadius: '8px', marginBottom: '40px', borderLeft: '4px solid #3498db'}}>
            <p style={{fontSize: '1.1rem', margin: '0', fontStyle: 'italic', color: '#2c3e50'}}>
              "In today's competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away."
            </p>
          </div>

          <h2 style={{fontSize: '2rem', color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: '40px'}}>What is Fast Business Funding?</h2>
          <p style={{fontSize: '1.1rem', marginBottom: '20px'}}>
            Fast business funding refers to financing solutions that can be approved and disbursed quickly, typically within 24-48 hours to a few weeks. 
            Unlike traditional bank loans that may take months to process, fast funding options are designed for businesses that need immediate capital injection.
          </p>

          <h2 style={{fontSize: '2rem', color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: '40px'}}>Types of Fast Business Funding Available</h2>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', margin: '30px 0'}}>
            <div style={{backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #dee2e6'}}>
              <h3 style={{color: '#e74c3c', fontSize: '1.4rem', marginBottom: '15px'}}>Asset-Based Lending</h3>
              <p>Asset-based lending allows businesses to borrow against their existing assets, including property, equipment, or inventory. 
              This type of funding is often processed faster because the collateral reduces lender risk.</p>
            </div>
            
            <div style={{backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #dee2e6'}}>
              <h3 style={{color: '#e74c3c', fontSize: '1.4rem', marginBottom: '15px'}}>Bridging Loans</h3>
              <p>Bridging loans provide short-term financing to bridge timing gaps, such as when purchasing new premises before selling existing property. 
              These loans can often be approved within days.</p>
            </div>
            
            <div style={{backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #dee2e6'}}>
              <h3 style={{color: '#e74c3c', fontSize: '1.4rem', marginBottom: '15px'}}>Caveat Loans</h3>
              <p>Caveat loans are secured against property and can be processed extremely quickly, sometimes within 24 hours. 
              They're ideal for businesses needing immediate capital for time-sensitive opportunities.</p>
            </div>
            
            <div style={{backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', border: '1px solid #dee2e6'}}>
              <h3 style={{color: '#e74c3c', fontSize: '1.4rem', marginBottom: '15px'}}>Alternative Lenders</h3>
              <p>Non-bank lenders often have more flexible criteria and faster approval processes than traditional banks. 
              They may offer solutions like merchant cash advances or revenue-based financing.</p>
            </div>
          </div>

          <h2 style={{fontSize: '2rem', color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: '40px'}}>When to Consider Fast Funding</h2>
          <div style={{backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '30px'}}>
            <ul style={{margin: '0', paddingLeft: '20px'}}>
              <li style={{marginBottom: '10px'}}>Time-sensitive business opportunities arise</li>
              <li style={{marginBottom: '10px'}}>Cash flow gaps need immediate attention</li>
              <li style={{marginBottom: '10px'}}>Equipment purchases can't wait for lengthy approval processes</li>
              <li style={{marginBottom: '10px'}}>Property settlements require quick bridging finance</li>
              <li style={{marginBottom: '10px'}}>Emergency business expenses occur</li>
              <li style={{marginBottom: '10px'}}>Seasonal inventory purchases need quick capital</li>
            </ul>
          </div>

          <h2 style={{fontSize: '2rem', color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: '40px'}}>Benefits of Fast Business Funding</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '30px 0'}}>
            <div style={{backgroundColor: '#d4edda', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{color: '#155724', marginBottom: '10px'}}>⚡ Speed of Approval</h4>
              <p style={{margin: '0'}}>Rapid access to capital, with some lenders providing approval within hours rather than weeks or months.</p>
            </div>
            <div style={{backgroundColor: '#d4edda', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{color: '#155724', marginBottom: '10px'}}>🔄 Flexible Criteria</h4>
              <p style={{margin: '0'}}>More flexible lending criteria, considering factors beyond just credit scores and financial statements.</p>
            </div>
            <div style={{backgroundColor: '#d4edda', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{color: '#155724', marginBottom: '10px'}}>📋 Minimal Documentation</h4>
              <p style={{margin: '0'}}>Streamlined application processes with reduced paperwork requirements compared to traditional loans.</p>
            </div>
            <div style={{backgroundColor: '#d4edda', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
              <h4 style={{color: '#155724', marginBottom: '10px'}}>💰 Competitive Rates</h4>
              <p style={{margin: '0'}}>Despite the speed, many fast funding options offer competitive interest rates, especially for secured lending.</p>
            </div>
          </div>

          <h2 style={{fontSize: '2rem', color: '#34495e', borderBottom: '2px solid #3498db', paddingBottom: '10px', marginTop: '40px'}}>How to Apply for Fast Business Funding</h2>
          <div style={{backgroundColor: '#f8f9fa', padding: '25px', borderRadius: '10px', marginBottom: '30px'}}>
            <ol style={{paddingLeft: '20px'}}>
              <li style={{marginBottom: '15px'}}><strong>Initial Assessment:</strong> Quick evaluation of your funding needs and business situation</li>
              <li style={{marginBottom: '15px'}}><strong>Documentation:</strong> Provide essential financial documents and asset details</li>
              <li style={{marginBottom: '15px'}}><strong>Approval:</strong> Rapid assessment and approval, often within 24-48 hours</li>
              <li style={{marginBottom: '15px'}}><strong>Settlement:</strong> Quick settlement and fund disbursement</li>
            </ol>
          </div>

          <div style={{backgroundColor: '#2c3e50', color: 'white', padding: '40px', borderRadius: '15px', textAlign: 'center', marginTop: '50px'}}>
            <h3 style={{fontSize: '1.8rem', marginBottom: '15px'}}>Ready to Discuss Your Funding Requirements?</h3>
            <p style={{fontSize: '1.1rem', marginBottom: '25px'}}>Our commercial lending specialists are here to help structure the right solution for your business.</p>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href="/#/contact" style={{
                backgroundColor: '#3498db', 
                color: 'white', 
                padding: '15px 30px', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                display: 'inline-block'
              }}>
                Get Your Quote
              </a>
              <a href="tel:0485952651" style={{
                border: '2px solid #3498db',
                color: '#3498db', 
                backgroundColor: 'transparent',
                padding: '13px 30px', 
                textDecoration: 'none', 
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                display: 'inline-block'
              }}>
                📞 Call 0485 952 651
              </a>
            </div>
          </div>

          <div style={{textAlign: 'center', marginTop: '30px', padding: '20px'}}>
            <a href="/#/" style={{color: '#3498db', textDecoration: 'none', fontSize: '1rem'}}>← Back to Homepage</a>
          </div>
        </div>
      } />
    </Routes>
  </HashRouter>
);

export default App;
