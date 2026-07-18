import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Every route's metadata goes through this — docs/06-seo.md requires a
 * canonical on every route from NEXT_PUBLIC_SITE_URL, and nothing here may
 * be a value that does not exist (no fabricated fields).
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  };
}

/** BreadcrumbList JSON-LD — docs/06: on all detail pages. */
export function buildBreadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

/**
 * ProfessionalService JSON-LD — docs/06: on / and /services, name +
 * description + service list only. No aggregateRating, no review, no
 * priceRange — none of those exist, so none are included.
 */
export function buildProfessionalService({
  name,
  description,
  areaServed,
  services,
}: {
  name: string;
  description: string;
  areaServed: string[];
  services: { title: string; audience: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    url: siteUrl,
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.audience,
        },
      })),
    },
  };
}
