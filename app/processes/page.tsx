import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessLibraryExplorer, type ProcessExplorerEntry } from "@/components/processes/ProcessLibraryExplorer";
import { getCaseStudies, getIndustries, getProcessCategories, getProcesses } from "@/lib/content";
import { deriveProcessEngagementStages } from "@/lib/resolve";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Process Library",
  description:
    "Fifty processes across six families, each with the discovery questions that were actually asked, the common current-state problems and the recommended future-state pattern.",
  path: "/processes",
});

export default async function ProcessesPage() {
  const [processes, categories, industries, caseStudies] = await Promise.all([
    getProcesses(),
    getProcessCategories(),
    getIndustries(),
    getCaseStudies(),
  ]);

  const stagesByProcess = deriveProcessEngagementStages(caseStudies);

  const entries: ProcessExplorerEntry[] = processes.map((process) => ({
    slug: process.slug,
    name: process.name,
    category: process.category,
    objective: process.objective,
    industrySlugs: process.industries,
    stages: stagesByProcess.get(process.slug) ?? [],
  }));

  const industryOptions = industries.map((industry) => ({ slug: industry.slug, name: industry.name }));

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="The strategic asset"
          title="The process library"
          intro="Fifty processes across six families. Filter by category, industry or engagement stage — each result links to its objective, discovery questions and recommended future-state pattern."
        />
        <div className="mt-10">
          <Suspense>
            <ProcessLibraryExplorer processes={entries} categories={categories} industries={industryOptions} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
