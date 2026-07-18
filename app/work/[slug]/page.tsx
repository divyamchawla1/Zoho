import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getDeliverables,
  getGlobal,
  getIndustries,
  getProcesses,
  getServices,
} from "@/lib/content";
import { resolveDeliverables, resolveIndustries, resolveProcesses, resolveServices } from "@/lib/resolve";
import { Container } from "@/components/ui/Container";
import { BulletList } from "@/components/ui/BulletList";
import { AnonymisationNotice } from "@/components/case-study/AnonymisationNotice";
import { DetailSection } from "@/components/ui/DetailSection";
import { DetailSectionNav, type DetailNavSection } from "@/components/ui/DetailSectionNav";
import { CurrentFutureToggle } from "@/components/case-study/CurrentFutureToggle";
import { StandardVsCustom } from "@/components/case-study/StandardVsCustom";
import { ScopeDecisions } from "@/components/case-study/ScopeDecisions";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { DataFlowDiagram } from "@/components/diagrams/DataFlowDiagram";
import { Disclosure } from "@/components/ui/Disclosure";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbList, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return pageMetadata({ title: caseStudy.title, description: caseStudy.executiveSummary, path: `/work/${slug}` });
}

const SECTIONS: DetailNavSection[] = [
  { id: "summary", label: "Executive Summary" },
  { id: "industry-context", label: "Industry Context" },
  { id: "business-model", label: "Business Model" },
  { id: "challenge", label: "Operational Challenge" },
  { id: "stakeholders", label: "Stakeholders" },
  { id: "process", label: "Current ⇄ Future State" },
  { id: "gaps", label: "Process Gaps" },
  { id: "discovery-questions", label: "Key Discovery Questions" },
  { id: "architecture", label: "Solution Architecture" },
  { id: "standard-vs-custom", label: "Standard vs Custom" },
  { id: "scope-decisions", label: "Scope Decisions" },
  { id: "dependencies", label: "Dependencies" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "risks", label: "Risks" },
  { id: "contribution", label: "Contribution" },
  { id: "deliverables-produced", label: "Deliverables Produced" },
  { id: "effect", label: "Expected Effect" },
  { id: "related", label: "Related" },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const [global, allIndustries, allProcesses, allServices, allDeliverables] = await Promise.all([
    getGlobal(),
    getIndustries(),
    getProcesses(),
    getServices(),
    getDeliverables(),
  ]);

  const industries = resolveIndustries(caseStudy.industrySlugs, allIndustries);
  const processes = resolveProcesses(caseStudy.processSlugs, allProcesses);
  const services = resolveServices(caseStudy.serviceSlugs, allServices);
  const deliverables = resolveDeliverables(caseStudy.deliverableSlugs, allDeliverables);

  return (
    <article>
      <JsonLd
        data={buildBreadcrumbList([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: caseStudy.title, path: `/work/${slug}` },
        ])}
      />
      <header className="border-b border-paper-200 bg-paper-100 py-14 sm:py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wide text-accent-text">
            {industries.map((industry) => industry.name).join(" · ")}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            {caseStudy.title}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-ink-800/70">
            {caseStudy.locationContext}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {caseStudy.engagementStages.map((stage) => (
              <span key={stage} className="border border-ink-800/30 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-800">
                {stage.replace(/-/g, " ")}
              </span>
            ))}
          </div>
          <div className="mt-6 max-w-lg">
            <AnonymisationNotice notice={global.anonymisationNotice} />
          </div>
        </Container>
      </header>

      <Container className="grid gap-10 py-10 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-3">
          <DetailSectionNav sections={SECTIONS} ariaLabel="Case study sections" />
        </div>

        <div className="xl:col-span-9">
          <DetailSection id="summary" title="Executive Summary">
            <p className="max-w-3xl text-base leading-relaxed text-ink-800">{caseStudy.executiveSummary}</p>
          </DetailSection>

          <DetailSection id="industry-context" title="Industry Context">
            <p className="max-w-3xl text-base leading-relaxed text-ink-800">{caseStudy.industryContext}</p>
          </DetailSection>

          <DetailSection id="business-model" title="Business Model">
            <p className="max-w-3xl text-base leading-relaxed text-ink-800">{caseStudy.businessModel}</p>
          </DetailSection>

          <DetailSection id="challenge" title="Operational Challenge">
            <BulletList items={caseStudy.operationalChallenge} />
          </DetailSection>

          <DetailSection id="stakeholders" title="Stakeholders">
            <ul className="flex flex-wrap gap-2">
              {caseStudy.stakeholders.map((stakeholder) => (
                <li key={stakeholder} className="border border-paper-200 px-3 py-1.5 text-sm text-ink-950">
                  {stakeholder}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection id="process" title="Current ⇄ Future State">
            <CurrentFutureToggle currentState={caseStudy.currentState} futureState={caseStudy.futureState} />
          </DetailSection>

          <DetailSection id="gaps" title="Process Gaps">
            <BulletList items={caseStudy.processGaps} tone="danger" />
          </DetailSection>

          <DetailSection id="discovery-questions" title="Key Discovery Questions">
            <ol className="space-y-3">
              {caseStudy.keyDiscoveryQuestions.map((question, index) => (
                <li key={question} className="flex gap-3 border border-paper-200 bg-paper-50 p-4">
                  <span className="font-mono text-xs text-ink-800/70">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-ink-950">{question}</p>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection id="architecture" title="Solution Architecture">
            <p className="max-w-3xl text-sm leading-relaxed text-ink-800">{caseStudy.solutionArchitecture.summary}</p>
            <div className="mt-6">
              <ArchitectureDiagram layers={caseStudy.solutionArchitecture.layers} />
            </div>
            <div className="mt-6">
              <Disclosure label="Show data flow detail">
                <DataFlowDiagram flows={caseStudy.solutionArchitecture.dataFlow} />
              </Disclosure>
            </div>
          </DetailSection>

          <DetailSection id="standard-vs-custom" title="Standard vs Custom">
            <StandardVsCustom items={caseStudy.standardVsCustom} />
          </DetailSection>

          <DetailSection id="scope-decisions" title="Scope Decisions">
            <ScopeDecisions decisions={caseStudy.scopeDecisions} />
          </DetailSection>

          <DetailSection id="dependencies" title="Dependencies">
            <BulletList items={caseStudy.dependencies} />
          </DetailSection>

          <DetailSection id="client-responsibilities" title="Client Responsibilities">
            <BulletList items={caseStudy.clientResponsibilities} />
          </DetailSection>

          <DetailSection id="risks" title="Risks">
            <BulletList items={caseStudy.risks} tone="danger" />
          </DetailSection>

          <DetailSection id="contribution" title="Contribution">
            <BulletList items={caseStudy.contribution} tone="accent" />
          </DetailSection>

          <DetailSection id="deliverables-produced" title="Deliverables Produced">
            <BulletList items={caseStudy.deliverablesProduced} />
            {deliverables.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {deliverables.map((deliverable) => (
                  <li key={deliverable.slug}>
                    <Link
                      href="/deliverables"
                      className="inline-block border border-paper-200 px-3 py-1.5 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text"
                    >
                      {deliverable.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </DetailSection>

          <DetailSection id="effect" title="Expected Effect">
            <span
              className={`inline-block border px-2 py-1 font-mono text-[10px] uppercase tracking-wide ${
                caseStudy.effect.type === "achieved"
                  ? "border-success-500 text-success-text"
                  : "border-accent-500 text-accent-text"
              }`}
            >
              {caseStudy.effect.type}
            </span>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-800">{caseStudy.effect.statement}</p>
          </DetailSection>

          <DetailSection id="related" title="Related">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Processes</p>
                <ul className="mt-3 space-y-2">
                  {processes.map((process) => (
                    <li key={process.slug}>
                      <Link href={`/processes/${process.slug}`} className="text-sm text-ink-950 hover:text-accent-text">
                        {process.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Industries</p>
                <ul className="mt-3 space-y-2">
                  {industries.map((industry) => (
                    <li key={industry.slug}>
                      <Link href={`/industries/${industry.slug}`} className="text-sm text-ink-950 hover:text-accent-text">
                        {industry.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Services</p>
                <ul className="mt-3 space-y-2">
                  {services.map((service) => (
                    <li key={service.slug}>
                      <Link href="/services" className="text-sm text-ink-950 hover:text-accent-text">
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DetailSection>

          <section className="border-t border-paper-200 py-12">
            <Link
              href={global.contactCta.href}
              className="inline-block border border-ink-950 bg-ink-950 px-6 py-3 font-mono text-sm uppercase tracking-wide text-paper-50 hover:bg-ink-800"
            >
              {global.contactCta.label}
            </Link>
          </section>
        </div>
      </Container>
    </article>
  );
}
