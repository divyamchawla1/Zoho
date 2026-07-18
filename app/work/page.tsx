import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkIndexExplorer, type WorkExplorerEntry } from "@/components/work/WorkIndexExplorer";
import { getCaseStudies, getIndustries, getProcessCategories, getProcesses, getTechnology } from "@/lib/content";
import type { ProcessCategorySlug } from "@/schemas/content-types";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Filterable case-study library. Every entry states which engagement stages the work involved — discovery, process mapping, architecture, requirement documentation, estimation, delivery leadership, UAT.",
  path: "/work",
});

export default async function WorkIndexPage() {
  const [caseStudies, industries, categories, processes, technology] = await Promise.all([
    getCaseStudies(),
    getIndustries(),
    getProcessCategories(),
    getProcesses(),
    getTechnology(),
  ]);

  const categoryByProcess = new Map(processes.map((process) => [process.slug, process.category]));

  const entries: WorkExplorerEntry[] = caseStudies.map((caseStudy) => {
    const processCategorySlugs = [
      ...new Set(
        caseStudy.processSlugs
          .map((slug) => categoryByProcess.get(slug))
          .filter((category): category is ProcessCategorySlug => Boolean(category)),
      ),
    ];

    return {
      slug: caseStudy.slug,
      title: caseStudy.title,
      locationContext: caseStudy.locationContext,
      challenge: caseStudy.operationalChallenge[0] ?? "",
      industrySlugs: caseStudy.industrySlugs,
      processCategorySlugs,
      engagementStages: caseStudy.engagementStages,
      technologyGroups: caseStudy.technology,
    };
  });

  const industryOptions = industries.map((industry) => ({ slug: industry.slug, name: industry.name }));
  const technologyGroupNames = technology.groups.map((group) => group.name);

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="Selected work"
          title="Work"
          intro="Every case study states which engagement stages it involved — discovery, process mapping, architecture, requirement documentation, estimation, delivery leadership, UAT. That honesty is the differentiator."
        />
        <div className="mt-10">
          <Suspense>
            <WorkIndexExplorer
              caseStudies={entries}
              categories={categories}
              industries={industryOptions}
              technologyGroups={technologyGroupNames}
            />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
