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

export const BEN_AUTHOR: AuthorProfile = {
  name: "Ben",
  title: "Commercial Finance Broker, Emet Capital",
  url: "https://emetcapital.com.au/about/ben",
  shortBio:
    "Ben is a commercial finance broker at Emet Capital with 10 years' experience in private lending. He specialises in operational finance guides, scenario walkthroughs, and case studies across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.",
  knowsAbout: [
    "Caveat loans",
    "Second mortgages",
    "Bridging finance",
    "Commercial property finance",
    "Private lending",
    "Business finance",
  ],
};

export const DANIEL_AUTHOR: AuthorProfile = {
  name: "Daniel",
  title: "Director, Emet Capital",
  url: "https://emetcapital.com.au/about/daniel",
  shortBio:
    "Daniel is the Director at Emet Capital with 10 years' experience in commercial finance and private lending. He focuses on market commentary, lender behaviour, and strategic comparisons across caveat loans, second mortgages, bridging finance, commercial property finance, private lending, and business finance for SMEs and property investors.",
  knowsAbout: [
    "Caveat loans",
    "Second mortgages",
    "Bridging finance",
    "Commercial property finance",
    "Private lending",
    "Business finance",
  ],
};

const authorEmployeeSchema = (author: AuthorProfile) => ({
  "@type": "Person",
  "name": author.name,
  "jobTitle": author.title,
  "url": author.url
});

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
      const listItem: any = {
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
 * Generates Organization JSON-LD schema
 */
export const generateOrganizationSchema = (options: { includeSameAs?: boolean } = {}) => {
  const { includeSameAs = true } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Emet Capital",
    "legalName": "Emet Capital Pty Ltd",
    "url": "https://emetcapital.com.au",
    "logo": "https://emetcapital.com.au/logo.png",
    "description": "Australia's trusted commercial lending specialists. We connect businesses with the right financing solutions through our extensive network of private and institutional lenders.",
    "taxID": "50 682 228 182",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "ABN",
      "value": "50 682 228 182"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "NSW",
      "addressLocality": "Sydney"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-485-952-651",
      "contactType": "Customer Service",
      "areaServed": "AU",
      "availableLanguage": "English"
    },
    ...(includeSameAs
      ? {
          "sameAs": [
            "https://www.linkedin.com/company/emet-capital"
          ],
        }
      : {}),
    "employee": [
      authorEmployeeSchema(BEN_AUTHOR),
      authorEmployeeSchema(DANIEL_AUTHOR)
    ]
  };
};

/**
 * Generates AggregateRating JSON-LD schema
 */
export const generateAggregateRatingSchema = () => {
  return {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "18",
    "bestRating": "5",
    "worstRating": "1"
  };
};

/**
 * Generates LocalBusiness JSON-LD schema with reviews
 */
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Emet Capital",
    "legalName": "Emet Capital Pty Ltd",
    "image": "https://emetcapital.com.au/logo.png",
    "url": "https://emetcapital.com.au",
    "telephone": "+61-485-952-651",
    "email": "enquiry@emetcapital.com.au",
    "taxID": "50 682 228 182",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "ABN",
      "value": "50 682 228 182"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "NSW",
      "addressLocality": "Sydney"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-33.8688",
      "longitude": "151.2093"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "employee": [
      authorEmployeeSchema(BEN_AUTHOR),
      authorEmployeeSchema(DANIEL_AUTHOR)
    ],
    "aggregateRating": generateAggregateRatingSchema()
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
    "description": "Australia's trusted commercial lending specialists. We connect businesses with the right financing solutions through our extensive network of private and institutional lenders.",
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
    "description": "Get in touch with our commercial lending specialists. Fast approvals and competitive rates for Australian businesses.",
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
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        }
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
      "@type": "Organization",
      "name": "Emet Capital",
      "url": "https://emetcapital.com.au"
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    },
    "serviceType": "Commercial Finance"
  };
};
