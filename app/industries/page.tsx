import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryMatrix, type IndustryMatrixEntry } from "@/components/home/IndustryMatrix";
import { getIndustries, getProcesses } from "@/lib/content";
import { resolveProcesses } from "@/lib/resolve";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Eighteen industries, each shown with an honest exposure level — solutioning experience, process experience, project exposure or operator experience — rather than a claim of expertise.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const [industries, processes] = await Promise.all([getIndustries(), getProcesses()]);

  const entries: IndustryMatrixEntry[] = industries.map((industry) => ({
    slug: industry.slug,
    name: industry.name,
    exposure: industry.exposure,
    processes: resolveProcesses(industry.processes, processes).map((process) => ({
      slug: process.slug,
      name: process.name,
    })),
  }));

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="Cross-industry"
          title="Industries"
          intro="Eighteen industries, each shown with an honest exposure level rather than a claim of expertise. Hover, focus or tap an industry to see the processes worked on within it."
        />
        <div className="mt-10">
          <IndustryMatrix industries={entries} />
        </div>
      </Container>
    </div>
  );
}
