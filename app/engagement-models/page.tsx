import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BulletList } from "@/components/ui/BulletList";
import { getEngagementModels } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Engagement Models",
  description: "Six shapes of engagement, from a bounded discovery sprint to ongoing delivery oversight — matched to what the business actually needs, not a standard package.",
  path: "/engagement-models",
});

export default async function EngagementModelsPage() {
  const models = await getEngagementModels();

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="How engagements are shaped"
          title="Engagement Models"
          intro="Six shapes an engagement can take, matched to what the business actually needs rather than a fixed package."
        />

        <div className="mt-12 space-y-px border border-paper-200 bg-paper-200">
          {models.map((model) => (
            <div key={model.slug} className="bg-paper-50 p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl font-semibold text-ink-950">{model.name}</h2>
                {model.typicalDuration ? (
                  <span className="font-mono text-xs uppercase tracking-wide text-ink-800/70">
                    {model.typicalDuration}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-800">{model.bestFor}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-800/80">{model.shape}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">What I Do</p>
                  <div className="mt-2">
                    <BulletList items={model.whatDivyamDoes} tone="accent" />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">What the Client Does</p>
                  <div className="mt-2">
                    <BulletList items={model.whatTheClientDoes} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Output</p>
                  <div className="mt-2">
                    <BulletList items={model.output} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
