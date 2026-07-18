import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsights, getMethodology, getProcesses } from "@/lib/content";
import { resolveProcesses } from "@/lib/resolve";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbList, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.filter((insight) => insight.status === "published").map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insights = await getInsights();
  const insight = insights.find((i) => i.slug === slug && i.status === "published");
  if (!insight) return {};

  return pageMetadata({ title: insight.title, description: insight.summary, path: `/insights/${slug}` });
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const insights = await getInsights();
  const insight = insights.find((i) => i.slug === slug && i.status === "published");
  if (!insight) notFound();

  const [allProcesses, methodology] = await Promise.all([getProcesses(), getMethodology()]);
  const relatedProcesses = resolveProcesses(insight.relatedProcesses, allProcesses);
  const relatedStages = methodology.stages.filter((stage) => insight.relatedMethodologyStages.includes(stage.slug));

  return (
    <article className="py-16 sm:py-20 lg:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: insight.title,
          description: insight.summary,
          articleSection: insight.category,
        }}
      />
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: insight.title, path: `/insights/${slug}` },
        ])}
      />
      <Container className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-wide text-accent-text">{insight.category}</p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          {insight.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-800">{insight.summary}</p>

        <div className="mt-10 space-y-4">
          {insight.body.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-ink-800">
              {paragraph}
            </p>
          ))}
        </div>

        {relatedProcesses.length > 0 || relatedStages.length > 0 ? (
          <div className="mt-12 grid gap-6 border-t border-paper-200 pt-8 sm:grid-cols-2">
            {relatedProcesses.length > 0 ? (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Related Processes</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {relatedProcesses.map((process) => (
                    <li key={process.slug}>
                      <Link
                        href={`/processes/${process.slug}`}
                        className="inline-block border border-paper-200 px-3 py-1.5 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text"
                      >
                        {process.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {relatedStages.length > 0 ? (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Methodology Stages</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {relatedStages.map((stage) => (
                    <li key={stage.slug}>
                      <Link
                        href={`/methodology#${stage.slug}`}
                        className="inline-block border border-paper-200 px-3 py-1.5 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text"
                      >
                        {stage.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>
    </article>
  );
}
