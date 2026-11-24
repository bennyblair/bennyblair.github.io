import articleAuthors from "@/data/article-authors.json";

// Utility functions for generating JSON-LD structured data schemas

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AuthorProfile {
  name: string;
  title: string;
  url: string;
  shortBio: string;
  knowsAbout: string[];
}

export const BEN_AUTHOR: AuthorProfile = articleAuthors.authors.Ben;

export const DANIEL_AUTHOR: AuthorProfile = articleAuthors.authors.Daniel;

export const ARTICLE_AUTHORS: Record<string, AuthorProfile> = articleAuthors.authors;

export const EMET_LOGO_URL = "https://emetcapital.com.au/images/emet-capital-logo.png";

export function resolveArticleAuthor(name?: string): AuthorProfile | undefined {
  return name ? ARTICLE_AUTHORS[name] : undefined;
}

const authorEmployeeSchema = (author: AuthorProfile) => ({
  "@type": "Person",
  "name": author.name,
  "jobTitle": author.title,
  "url": author.url
});

const EMET_ADDRESS_SCHEMA = {
  "@type": "PostalAddress",
  "streetAddress": "2C/3-5 Anzac Parade",
  "addressLocality": "Kensington",
  "addressRegion": "NSW",
  "postalCode": "2033",
  "addressCountry": "AU"
};

/** Nominatim OpenStreetMap geocode for 3-5 Anzac Parade, Kensington NSW 2033 (queried 2026-11-13). */
export const EMET_GEO = {
  latitude: "-33.9029642",
  longitude: "151.2231989"
};

export const EMET_ORGANIZATION_ID = "https://emetcapital.com.au/#organization";
export const EMET_FINANCIAL_SERVICE_ID = "https://emetcapital.com.au/#financialservice";

const ORGANIZATION_DESCRIPTION =
  "Emet Capital is an Australian commercial finance broker, not a lender. It helps businesses, property investors and developers compare and arrange business-purpose finance secured by property, including commercial property finance, bridging finance, first and second mortgages and private lending.";

const ORGANIZATION_DISAMBIGUATION =
  "Emet Capital Pty Ltd, ABN 50 682 228 182, Kensington NSW, Australia. Not affiliated with Emet Capital Management (New York), Emet Mortgage (California), Emit Capital (Melbourne) or EMET Capital (Bogota).";

const EMET_AREA_SERVED = { "@type": "Country", "name": "Australia" };

const EMET_KNOWS_ABOUT = [
  "Commercial property finance",
  "Bridging finance",
  "First and second mortgages for business purposes",
  "Private lending for businesses",
  "Business-purpose property-secured finance"
];

const EMET_CORE_SERVICES = [
  { name: "Commercial property finance", path: "/services/commercial-property-finance" },
  { name: "Bridging finance", path: "/services/bridging-finance" },
  { name: "First and second mortgages", path: "/services/first-second-mortgages" },
  { name: "Private lending", path: "/services/private-lending" }
];

/**
 * Generates Person JSON-LD schema for Ben.
 *
 * LinkedIn sameAs is intentionally omitted until the correct public URL is
 * confirmed. Do not substitute another person or company profile here.
 */
export const generateBenPersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": BEN_AUTHOR.name,
    "jobTitle": BEN_AUTHOR.title,
    "url": BEN_AUTHOR.url,
    "description": BEN_AUTHOR.shortBio,
    "worksFor": {
      "@type": "Organization",
      "name": "Emet Capital",
      "url": "https://emetcapital.com.au"
    },
    "knowsAbout": BEN_AUTHOR.knowsAbout
  };
};

/**
 * Generates Person JSON-LD schema for Daniel.
 *
 * Public sameAs links are intentionally omitted until the correct public URL is
 * confirmed.
 */
export const generateDanielPersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": DANIEL_AUTHOR.name,
    "jobTitle": DANIEL_AUTHOR.title,
    "url": DANIEL_AUTHOR.url,
    "description": DANIEL_AUTHOR.shortBio,
    "worksFor": {
      "@type": "Organization",
      "name": "Emet Capital",
      "url": "https://emetcapital.com.au"
    },
    "knowsAbout": DANIEL_AUTHOR.knowsAbout
  };
};

/**
 * Generates BreadcrumbList JSON-LD schema
 */
export const generateBreadcrumbSchema = (items: BreadcrumbItem[], baseUrl: string = "https://emetcapital.com.au") => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const listItem: {
        "@type": "ListItem";
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label
      };
      
      if ('href' in item && item.href) {
        listItem.item = `${baseUrl}${item.href}`;
      }
      
      return listItem;
    })
  };
};

/**
 * Generates Organization JSON-LD schema.
 *
 * sameAs is omitted. The previous company LinkedIn slug pointed at EMET Capital
 * in Bogota, a different company. Do not add a replacement LinkedIn URL until
 * the correct public profile is confirmed.
 *
 * memberOf is omitted: Emet Capital has no industry association memberships.
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": EMET_ORGANIZATION_ID,
    "name": "Emet Capital",
    "legalName": "Emet Capital Pty Ltd",
    "url": "https://emetcapital.com.au",
    "logo": EMET_LOGO_URL,
    "description": ORGANIZATION_DESCRIPTION,
    "disambiguatingDescription": ORGANIZATION_DISAMBIGUATION,
    "telephone": "+61-485-952-651",
    "email": "enquiry@emetcapital.com.au",
    "taxID": "50 682 228 182",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "ABN",
      "value": "50 682 228 182"
    },
    "address": EMET_ADDRESS_SCHEMA,
    "areaServed": EMET_AREA_SERVED,
    "knowsAbout": EMET_KNOWS_ABOUT,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-485-952-651",
      "contactType": "Customer Service",
      "areaServed": "AU",
      "availableLanguage": "English"
    },
    "employee": [
      authorEmployeeSchema(BEN_AUTHOR),
      authorEmployeeSchema(DANIEL_AUTHOR)
    ]
  };
};

/**
 * Generates LocalBusiness JSON-LD schema.
 *
 * openingHours and openingHoursSpecification are omitted. Public listings do not
 * publish hours, and the site owner confirmed they should not be displayed.
 *
 * Hardcoded aggregateRating is omitted: the Google review count is not sourced live.
 * memberOf is omitted: Emet Capital has no industry association memberships.
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": EMET_FINANCIAL_SERVICE_ID,
    "name": "Emet Capital",
    "legalName": "Emet Capital Pty Ltd",
    "image": EMET_LOGO_URL,
    "url": "https://emetcapital.com.au",
    "description": ORGANIZATION_DESCRIPTION,
    "telephone": "+61-485-952-651",
    "email": "enquiry@emetcapital.com.au",
    "taxID": "50 682 228 182",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "ABN",
      "value": "50 682 228 182"
    },
    "address": EMET_ADDRESS_SCHEMA,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": EMET_GEO.latitude,
      "longitude": EMET_GEO.longitude
    },
    "parentOrganization": {
      "@id": EMET_ORGANIZATION_ID
    },
    "areaServed": EMET_AREA_SERVED,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business-purpose property finance arranged by Emet Capital",
      "itemListElement": EMET_CORE_SERVICES.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "url": `https://emetcapital.com.au${service.path}`,
          "provider": { "@id": EMET_ORGANIZATION_ID }
        }
      }))
    },
    "priceRange": "$$",
    "employee": [
      authorEmployeeSchema(BEN_AUTHOR),
      authorEmployeeSchema(DANIEL_AUTHOR)
    ]
  };
};

/**
 * Generates AboutPage JSON-LD schema
 */
export const generateAboutPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Emet Capital",
    "description": ORGANIZATION_DESCRIPTION,
    "url": "https://emetcapital.com.au/about",
    "mainEntity": generateOrganizationSchema()
  };
};

/**
 * Generates ContactPage JSON-LD schema
 */
export const generateContactPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Emet Capital",
    "description": "Get in touch with our commercial finance brokers. We work to move applications quickly; timeframes depend on the lender and the deal.",
    "url": "https://emetcapital.com.au/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Emet Capital",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+61-485-952-651",
        "email": "enquiry@emetcapital.com.au",
        "contactType": "Customer Service",
        "areaServed": "AU",
        "availableLanguage": "English"
      }
    }
  };
};

/**
 * Generates CollectionPage JSON-LD schema
 */
export const generateCollectionPageSchema = (
  name: string,
  description: string,
  url: string,
  numberOfItems: number
) => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "numberOfItems": numberOfItems,
    "publisher": {
      "@type": "Organization",
      "name": "Emet Capital",
      "url": "https://emetcapital.com.au"
    }
  };
};

/**
 * Generates FAQPage JSON-LD schema
 */
export const generateFAQPageSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Generates Service JSON-LD schema
 */
export const generateServiceSchema = (
  name: string,
  description: string,
  url: string,
  areaServed: string = "Australia"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url,
    "provider": {
      "@type": "FinancialService",
      "name": "Emet Capital",
      "legalName": "Emet Capital Pty Ltd",
      "url": "https://emetcapital.com.au",
      "telephone": "+61-485-952-651",
      "email": "enquiry@emetcapital.com.au",
      "taxID": "50 682 228 182",
      "address": EMET_ADDRESS_SCHEMA
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "serviceType": "Commercial Finance"
  };
};
