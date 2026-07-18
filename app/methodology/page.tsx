import type { Metadata } from "next";
import { getCaseStudies, getDeliverables, getMethodology } from "@/lib/content";
import { resolveCaseStudies, resolveDeliverables } from "@/lib/resolve";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/ui/DetailSection";
import { DetailSectionNav, type DetailNavSection } from "@/components/ui/DetailSectionNav";
import { StageDetail } from "@/components/methodology/StageDetail";
import { TestingLayers } from "@/components/methodology/TestingLayers";
import { QuestionsGrid } from "@/components/ui/QuestionsGrid";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const methodology = await getMethodology();
  return pageMetadata({ title: "Methodology", description: methodology.intro, path: "/methodology" });
}

export default async function MethodologyPage() {
  const [methodology, deliverables, caseStudies] = await Promise.all([
    getMethodology(),
    getDeliverables(),
    getCaseStudies(),
  ]);

  const sections: DetailNavSection[] = [
    ...methodology.stages.map((stage) => ({ id: stage.slug, label: stage.name })),
    { id: "eleven-questions", label: methodology.decisionFramework.name },
    { id: "testing-model", label: "Testing Model" },
  ];

  return (
    <article>
      <header className="border-b border-paper-200 bg-paper-100 py-14 sm:py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wide text-accent-text">Methodology</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            {methodology.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-800">{methodology.intro}</p>
        </Container>
      </header>

      <Container className="grid gap-10 py-10 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-3">
          <DetailSectionNav sections={sections} ariaLabel="Methodology sections" />
        </div>

        <div className="xl:col-span-9">
          {methodology.stages.map((stage, index) => (
            <DetailSection key={stage.slug} id={stage.slug} title={stage.name}>
              <StageDetail
                stage={stage}
                index={index}
                deliverables={resolveDeliverables(stage.deliverableSlugs, deliverables)}
                caseStudies={resolveCaseStudies(stage.caseStudySlugs, caseStudies)}
              />
            </DetailSection>
          ))}

          <DetailSection id="eleven-questions" title={methodology.decisionFramework.name}>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-800">{methodology.decisionFramework.intro}</p>
            <div className="mt-6 bg-ink-950 p-1">
              <QuestionsGrid tests={methodology.decisionFramework.tests} />
            </div>
          </DetailSection>

          <DetailSection id="testing-model" title="Testing Model">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-800">{methodology.testingModel.intro}</p>
            <div className="mt-8 max-w-2xl">
              <TestingLayers layers={methodology.testingModel.layers} />
            </div>
          </DetailSection>
        </div>
      </Container>
    </article>
  );
}
