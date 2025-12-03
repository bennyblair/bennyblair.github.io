import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: string;
  image?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords = "commercial lending, business loans, private lending, bridging finance, commercial property loans, Sydney, Australia",
  canonical,
  type = "website",
  image = "/assets/sydney-skyline-hero.jpg"
}: SEOProps) => {
  const baseUrl = "https://www.emetcapital.com.au";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Hreflang for Australian targeting */}
      <link rel="alternate" hrefLang="en-AU" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
      
      {/* Geo targeting */}
      <meta name="geo.region" content="AU-NSW" />
      <meta name="geo.placename" content="Sydney" />
      <meta name="geo.position" content="-33.8688;151.2093" />
      <meta name="ICBM" content="-33.8688, 151.2093" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Emet Capital" />
      <meta property="og:locale" content="en_AU" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
};

export default SEO;