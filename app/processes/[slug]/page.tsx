import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudies,
  getIndustries,
  getProcessBySlug,
  getProcessCategories,
  getProcesses,
} from "@/lib/content";
import { resolveCaseStudies, resolveIndustries } from "@/lib/resolve";
import { Container } from "@/components/ui/Container";
import { BulletList } from "@/components/ui/BulletList";
import { DetailSection } from "@/components/ui/DetailSection";
import { DetailSectionNav, type DetailNavSection } from "@/components/ui/DetailSectionNav";
import { ProcessFlowDiagram } from "@/components/diagrams/ProcessFlowDiagram";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbList, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const processes = await getProcesses();
  return processes.map((process) => ({ slug: process.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const process = await getProcessBySlug(slug);
  if (!process) return {};

  return pageMetadata({ title: process.name, description: process.objective, path: `/processes/${slug}` });
}

const SECTIONS: DetailNavSection[] = [
  { id: "objective", label: "Objective" },
  { id: "stakeholders", label: "Stakeholders" },
  { id: "common-problems", label: "Common Problems" },
  { id: "future-state", label: "Future-State Pattern" },
  { id: "controls", label: "Controls" },
  { id: "data-required", label: "Data Required" },
  { id: "reporting", label: "Reporting" },
  { id: "risks", label: "Risks" },
  { id: "discovery-questions", label: "Discovery Questions" },
  { id: "technology", label: "Technology Categories" },
  { id: "industries", label: "Related Industries" },
  { id: "case-studies", label: "Related Case Studies" },
];

export default async function ProcessDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const process = await getProcessBySlug(slug);
  if (!process) notFound();

  const [allCategories, allIndustries, allCaseStudies] = await Promise.all([
    getProcessCategories(),
    getIndustries(),
    getCaseStudies(),
  ]);

  const category = allCategories.find((c) => c.slug === process.category);
  const industries = resolveIndustries(process.industries, allIndustries);
  const caseStudies = resolveCaseStudies(process.caseStudies, allCaseStudies);

  return (
    <article>
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", path: "/" },
          { name: "Process Library", path: "/processes" },
          { name: process.name, path: `/processes/${slug}` },
        ])}
      />
      <header className="border-b border-paper-200 bg-paper-100 py-14 sm:py-16">
        <Container>
          {category ? (
            <p className="font-mono text-xs uppercase tracking-wide text-accent-text">{category.name}</p>
          ) : null}
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            {process.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-800">{process.objective}</p>
        </Container>
      </header>

      <Container className="grid gap-10 py-10 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-3">
          <DetailSectionNav sections={SECTIONS} ariaLabel="Process sections" />
        </div>

        <div className="xl:col-span-9">
          <DetailSection id="objective" title="Objective">
            <p className="max-w-3xl text-base leading-relaxed text-ink-800">{process.objective}</p>
          </DetailSection>

          <DetailSection id="stakeholders" title="Stakeholders">
            <ul className="flex flex-wrap gap-2">
              {process.stakeholders.map((stakeholder) => (
                <li key={stakeholder} className="border border-paper-200 px-3 py-1.5 text-sm text-ink-950">
                  {stakeholder}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="common-problems" title="Common Current-State Problems">
            <BulletList items={process.commonProblems} tone="danger" />
          </DetailSection>

          <DetailSection id="future-state" title="Recommended Future-State Pattern">
            <ProcessFlowDiagram label="Future state" steps={process.futureState} tone="teal" />
          </DetailSection>

          <DetailSection id="controls" title="Controls">
            <BulletList items={process.controls} tone="accent" />
          </DetailSection>

          <DetailSection id="data-required" title="Data Required">
            <BulletList items={process.dataRequired} />
          </DetailSection>

          <DetailSection id="reporting" title="Reporting">
            <BulletList items={process.reporting} />
          </DetailSection>

          <DetailSection id="risks" title="Risks">
            <BulletList items={process.risks} tone="danger" />
          </DetailSection>

          <DetailSection id="discovery-questions" title="Discovery Questions">
            <ol className="space-y-3">
              {process.discoveryQuestions.map((question, index) => (
                <li key={question} className="flex gap-3 border border-paper-200 bg-paper-50 p-4">
                  <span className="font-mono text-xs text-ink-800/70">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-ink-950">{question}</p>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection id="technology" title="Technology Categories">
            <ul className="flex flex-wrap gap-2">
              {process.technologyCategories.map((name) => (
                <li key={name} className="border border-paper-200 px-3 py-1.5 text-sm text-ink-950">
                  {name}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="industries" title="Related Industries">
            <ul className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="inline-flex min-h-11 items-center border border-paper-200 px-3 py-1.5 text-sm text-ink-950 hover:border-accent-500 hover:text-accent-text"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="case-studies" title="Related Case Studies">
            {caseStudies.length > 0 ? (
              <ul className="space-y-3">
                {caseStudies.map((caseStudy) => (
                  <li key={caseStudy.slug}>
                    <Link
                      href={`/work/${caseStudy.slug}`}
                      className="block border border-paper-200 bg-paper-50 p-4 hover:border-accent-500"
                    >
                      <p className="font-display text-sm font-semibold text-ink-950">{caseStudy.title}</p>
                      <p className="mt-1 text-xs text-ink-800/70">{caseStudy.locationContext}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-800/70">No published case study for this process yet.</p>
            )}
          </DetailSection>
        </div>
      </Container>
    </article>
  );
}
