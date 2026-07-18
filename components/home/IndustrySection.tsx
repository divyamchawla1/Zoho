import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryMatrix, type IndustryMatrixEntry } from "@/components/home/IndustryMatrix";
import { resolveProcesses } from "@/lib/resolve";
import type { HomepageContent, Industry, Process } from "@/schemas/content-types";

export function IndustrySection({
  industries,
  processes,
  copy,
}: {
  industries: Industry[];
  processes: Process[];
  copy: HomepageContent["industries"];
}) {
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
    <section className="border-b border-paper-200 bg-paper-100 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Cross-industry" title={copy.title} intro={copy.intro} />
        <div className="mt-10">
          <IndustryMatrix industries={entries} />
        </div>
      </Container>
    </section>
  );
}
