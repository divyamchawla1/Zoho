import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudies,
  getDeliverables,
  getIndustries,
  getIndustryBySlug,
  getProcesses,
  getServices,
} from "@/lib/content";
import { resolveCaseStudies, resolveDeliverables, resolveProcesses, resolveServices } from "@/lib/resolve";
import { EXPOSURE_LABEL } from "@/lib/labels";
import { Container } from "@/components/ui/Container";
import { BulletList } from "@/components/ui/BulletList";
import { DetailSection } from "@/components/ui/DetailSection";
import { DetailSectionNav, type DetailNavSection } from "@/components/ui/DetailSectionNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbList, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};

  return pageMetadata({ title: industry.name, description: industry.summary, path: `/industries/${slug}` });
}

const SECTIONS: DetailNavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "typical-problems", label: "Typical Problems" },
  { id: "processes", label: "Processes Worked On" },
  { id: "example-engagements", label: "Example Engagements" },
  { id: "architecture-considerations", label: "Architecture Considerations" },
  { id: "risks", label: "Common Risks" },
  { id: "deliverables", label: "Deliverables" },
  { id: "services", label: "Services" },
  { id: "case-studies", label: "Related Case Studies" },
];

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const [allProcesses, allDeliverables, allServices, allCaseStudies] = await Promise.all([
    getProcesses(),
    getDeliverables(),
    getServices(),
    getCaseStudies(),
  ]);

  const processes = resolveProcesses(industry.processes, allProcesses);
  const deliverables = resolveDeliverables(industry.deliverables, allDeliverables);
  const services = resolveServices(industry.services, allServices);
  const caseStudies = resolveCaseStudies(industry.caseStudies, allCaseStudies);
  const caseStudyMap = new Map(allCaseStudies.map((c) => [c.slug, c]));

  return (
    <article>
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${slug}` },
        ])}
      />
      <header className="border-b border-paper-200 bg-paper-100 py-14 sm:py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wide text-accent-text">
            {EXPOSURE_LABEL[industry.exposure]}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            {industry.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-800">{industry.summary}</p>
        </Container>
      </header>

      <Container className="grid gap-10 py-10 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-3">
          <DetailSectionNav sections={SECTIONS} ariaLabel="Industry sections" />
        </div>

        <div className="xl:col-span-9">
          <DetailSection id="overview" title="Overview">
            <div className="max-w-3xl space-y-4">
              {industry.overview.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink-800">
                  {paragraph}
                </p>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="typical-problems" title="Typical Problems">
            <BulletList items={industry.typicalProblems} tone="danger" />
          </DetailSection>

          <DetailSection id="processes" title="Processes Worked On">
            <ul className="flex flex-wrap gap-2">
              {processes.map((process) => (
                <li key={process.slug}>
                  <Link
                    href={`/processes/${process.slug}`}
                    className="inline-flex min-h-11 items-center border border-paper-200 px-3 py-1.5 text-sm text-ink-950 hover:border-accent-500 hover:text-accent-text"
                  >
                    {process.name}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="example-engagements" title="Example Engagements">
            <ul className="space-y-4">
              {industry.exampleEngagements.map((engagement) => {
                const linkedCase = engagement.caseStudySlug ? caseStudyMap.get(engagement.caseStudySlug) : undefined;
                return (
                  <li key={engagement.descriptor} className="border border-paper-200 bg-paper-50 p-5">
                    <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">
                      {engagement.descriptor}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-800">{engagement.summary}</p>
                    {linkedCase ? (
                      <Link
                        href={`/work/${linkedCase.slug}`}
                        className="mt-3 inline-block font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
                      >
                        View case study →
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </DetailSection>

          <DetailSection id="architecture-considerations" title="Architecture Considerations">
            <BulletList items={industry.architectureConsiderations} tone="accent" />
          </DetailSection>

          <DetailSection id="risks" title="Common Risks">
            <BulletList items={industry.commonRisks} tone="danger" />
          </DetailSection>

          <DetailSection id="deliverables" title="Deliverables">
            <ul className="flex flex-wrap gap-2">
              {deliverables.map((deliverable) => (
                <li key={deliverable.slug}>
                  <Link
                    href="/deliverables"
                    className="inline-flex min-h-11 items-center border border-paper-200 px-3 py-1.5 text-sm text-ink-950 hover:border-accent-500 hover:text-accent-text"
                  >
                    {deliverable.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="services" title="Services">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/services"
                    className="inline-flex min-h-11 items-center border border-paper-200 px-3 py-1.5 text-sm text-ink-950 hover:border-accent-500 hover:text-accent-text"
                  >
                    {service.title}
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
              <p className="text-sm text-ink-800/70">No published case study for this industry yet.</p>
            )}
          </DetailSection>
        </div>
      </Container>
    </article>
  );
}
