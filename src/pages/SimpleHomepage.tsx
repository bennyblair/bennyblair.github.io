const Homepage = () => {
  return (
    <div style={{padding: '40px', textAlign: 'center'}}>
      <h1>Commercial Lending Solutions</h1>
      <p>Expert commercial finance brokers in Sydney, Australia</p>
      <div style={{margin: '40px 0'}}>
        <a 
          href="/#/fast-business-funding" 
          style={{
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '15px 30px', 
            textDecoration: 'none',
            borderRadius: '5px',
            margin: '10px'
          }}
        >
          Fast Business Funding Guide
        </a>
        <a 
          href="/#/contact" 
          style={{
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '15px 30px', 
            textDecoration: 'none',
            borderRadius: '5px',
            margin: '10px'
          }}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Homepage;
