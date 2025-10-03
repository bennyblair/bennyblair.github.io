// Utility functions for generating JSON-LD structured data schemas

interface BreadcrumbItem {
  label: string;
  href?: string;
}

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
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Emet Capital",
    "url": "https://emetcapital.com.au",
    "logo": "https://emetcapital.com.au/logo.png",
    "description": "Australia's trusted commercial lending specialists. We connect businesses with the right financing solutions through our extensive network of private and institutional lenders.",
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
    "sameAs": [
      "https://www.linkedin.com/company/emet-capital"
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
    "image": "https://emetcapital.com.au/logo.png",
    "url": "https://emetcapital.com.au",
    "telephone": "+61-485-952-651",
    "email": "enquiry@emetcapital.com.au",
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
