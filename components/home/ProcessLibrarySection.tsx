import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessLibraryPreview } from "@/components/home/ProcessLibraryPreview";
import type { HomepageContent, Process, ProcessCategory } from "@/schemas/content-types";

export function ProcessLibrarySection({
  categories,
  processes,
  copy,
}: {
  categories: ProcessCategory[];
  processes: Process[];
  copy: HomepageContent["processLibrary"];
}) {
  const entries = processes.map((process) => ({
    slug: process.slug,
    name: process.name,
    category: process.category,
  }));

  return (
    <section className="border-b border-ink-800 bg-ink-950 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="The strategic asset" title={copy.title} intro={copy.intro} tone="paper" />
        <div className="mt-10">
          <ProcessLibraryPreview categories={categories} processes={entries} copy={copy} />
        </div>
      </Container>
    </section>
  );
}
