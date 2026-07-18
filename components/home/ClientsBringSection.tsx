import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomepageContent } from "@/schemas/content-types";

export function ClientsBringSection({ copy }: { copy: HomepageContent["clientsBring"] }) {
  return (
    <section className="border-b border-paper-200 bg-paper-100 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading title={copy.title} />

        <div className="mt-10 grid gap-px overflow-hidden border border-paper-200 bg-paper-200 md:grid-cols-2">
          <div className="bg-paper-50 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">
              {copy.clientBringsLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {copy.clientBrings.map((item) => (
                <li key={item} className="border-l-2 border-warning-500 pl-3 text-sm text-ink-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-paper-50 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">{copy.iProduceLabel}</p>
            <ul className="mt-4 space-y-3">
              {copy.iProduce.map((item) => (
                <li key={item} className="border-l-2 border-teal-500 pl-3 text-sm text-ink-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
