import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Deliverable, HomepageContent } from "@/schemas/content-types";

export function DeliverablesSection({
  deliverables,
  copy,
}: {
  deliverables: Deliverable[];
  copy: HomepageContent["deliverables"];
}) {
  return (
    <section className="border-b border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading title={copy.title} intro={copy.intro} />

        <ul className="mt-10 grid gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2 lg:grid-cols-5">
          {deliverables.map((deliverable) => (
            <li key={deliverable.slug} className="bg-paper-50 p-5">
              <p className="font-display text-sm font-semibold text-ink-950">{deliverable.shortName}</p>
              <p className="mt-2 text-xs leading-relaxed text-ink-800">{deliverable.purpose}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/deliverables"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
        >
          View every deliverable, with sample outlines →
        </Link>
      </Container>
    </section>
  );
}
