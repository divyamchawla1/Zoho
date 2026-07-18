import type { Metadata } from "next";
import { sora, inter, plexMono } from "@/lib/fonts";
import { getGlobal } from "@/lib/content";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${global.name} — ${global.primaryTitle}`,
      template: `%s — ${global.name}`,
    },
    description: global.summary,
    alternates: { canonical: "/" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobal();

  return (
    <html lang="en-GB" className={`${sora.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <SkipLink />
        <SiteHeader name={global.name} primaryTitle={global.primaryTitle} nav={global.nav} contactCta={global.contactCta} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter
          name={global.name}
          primaryTitle={global.primaryTitle}
          locationDisplay={global.locationDisplay}
          footerNav={global.footerNav}
          anonymisationNotice={global.anonymisationNotice}
        />
      </body>
    </html>
  );
}
