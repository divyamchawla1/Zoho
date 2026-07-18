import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * docs/06-seo.md: preview and staging deployments must return Disallow: /.
 * Only an explicit production VERCEL_ENV allows indexing — every other
 * environment (preview, local dev, unset) is treated as non-production by
 * default, which is the safe direction to be wrong in.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
