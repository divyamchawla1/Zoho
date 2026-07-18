import type { MetadataRoute } from "next";
import { getCaseStudies, getIndustries, getInsights, getProcesses } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

const STATIC_ROUTES = [
  "/",
  "/work",
  "/industries",
  "/processes",
  "/methodology",
  "/services",
  "/engagement-models",
  "/deliverables",
  "/about",
  "/insights",
  "/faq",
  "/contact",
];

/** Generated from the content model. Insight placeholders are excluded. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, industries, processes, insights] = await Promise.all([
    getCaseStudies(),
    getIndustries(),
    getProcesses(),
    getInsights(),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  for (const caseStudy of caseStudies) entries.push({ url: `${siteUrl}/work/${caseStudy.slug}` });
  for (const industry of industries) entries.push({ url: `${siteUrl}/industries/${industry.slug}` });
  for (const process of processes) entries.push({ url: `${siteUrl}/processes/${process.slug}` });
  for (const insight of insights) {
    if (insight.status === "published") entries.push({ url: `${siteUrl}/insights/${insight.slug}` });
  }

  return entries;
}
