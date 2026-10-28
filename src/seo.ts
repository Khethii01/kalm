import { SITE } from "./site";

/**
 * Reusable JSON-LD structured-data builders. Structured data helps Google
 * understand what KALM does (supplies commercial/bulk fuel to mining and other
 * sectors in South Africa) and can produce rich results.
 */

export function breadcrumbLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqLd(
  qa: { q: string; a: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceLd(args: {
  name: string;
  description: string;
  serviceType: string;
  area?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: {
      "@type": "Country",
      name: args.area ?? "South Africa",
    },
  };
}

/** Frequently-asked questions used on the mining-focused areas of the site. */
export const MINING_FAQ = [
  {
    q: "Does KALM Group supply bulk diesel to mining companies in South Africa?",
    a: "Yes. KALM Group engages with mining operations, opencast mining contractors, plant operators and mining services businesses regarding bulk diesel and commercial fuel supply across South Africa. Submit a fuel quote request with your sites, equipment profile and expected volumes and we will review your requirement.",
  },
  {
    q: "What fuel types can mining operations enquire about?",
    a: "Mining customers typically enquire about bulk diesel for haul trucks, excavators, generators and plant equipment. Petrol supply enquiries are also considered subject to confirmed product availability and commercial arrangements.",
  },
  {
    q: "Can KALM Group supply remote or opencast mine sites?",
    a: "Share your delivery towns, provinces and site details in a quote request and we will review what supply arrangement is possible for your locations and volumes. Delivery capability depends on location, volume and agreed terms.",
  },
  {
    q: "How are fuel quotations for mining determined?",
    a: "Quotations depend on fuel type, volume, delivery location, prevailing pricing, product availability and agreed commercial terms. We do not publish fixed prices; each enquiry is reviewed and responded to directly.",
  },
  {
    q: "Is there a minimum order for bulk fuel supply?",
    a: "Minimum quantities, pricing and terms are confirmed through a direct commercial enquiry rather than published on the website. Tell us your estimated volumes and we will advise what is possible.",
  },
];
