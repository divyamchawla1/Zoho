import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getInsights } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Editorial notes on discovery, solution architecture, implementation risk and delivery — written from the same method used on every engagement.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container className="max-w-3xl">
        <SectionHeading
          level="h1"
          eyebrow="Editorial"
          title="Insights"
          intro="Notes on discovery, solution architecture, implementation risk and delivery. Published pieces link through; the rest are titles waiting to be written properly rather than placeholders pretending to be articles."
        />

        <ul className="mt-12 divide-y divide-paper-200 border-t border-paper-200">
          {insights.map((insight) =>
            insight.status === "published" ? (
              <li key={insight.slug} className="py-6">
                <Link href={`/insights/${insight.slug}`} className="block">
                  <p className="font-mono text-xs uppercase tracking-wide text-accent-text">{insight.category}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink-950">{insight.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">{insight.summary}</p>
                </Link>
              </li>
            ) : (
              <li key={insight.slug} className="py-6">
                <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">{insight.category}</p>
                <p className="mt-2 font-display text-lg font-semibold text-ink-800/70">{insight.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-800/70">{insight.summary}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Not yet written</p>
              </li>
            ),
          )}
        </ul>
      </Container>
    </div>
  );
}
