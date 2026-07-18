import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { TechnologyContent } from "@/schemas/content-types";

export function TechnologySection({ technology }: { technology: TechnologyContent }) {
  return (
    <section className="border-b border-ink-800 bg-ink-900 py-16 sm:py-20 lg:py-24">
      <Container>
        <Eyebrow tone="paper">Technology enablement</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold text-paper-50 sm:text-4xl">
          {technology.message}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-50/70">{technology.note}</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {technology.groups.map((group) => (
            <div key={group.slug} className="border border-paper-50/15 p-6">
              <p className="font-display text-sm font-semibold text-paper-50">{group.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper-50/75">{group.capability}</p>
              <p className="mt-4 text-xs leading-relaxed text-paper-50/60">{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
