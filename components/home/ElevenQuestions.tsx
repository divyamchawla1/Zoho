import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { QuestionsGrid } from "@/components/ui/QuestionsGrid";
import type { DecisionFrameworkTest } from "@/schemas/content-types";

export function ElevenQuestions({
  name,
  intro,
  tests,
}: {
  name: string;
  intro: string;
  tests: DecisionFrameworkTest[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950 py-16 sm:py-20 lg:py-24">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[13rem] font-semibold leading-none text-paper-50/[0.04] sm:text-[18rem]"
      >
        {tests.length}
      </p>

      <Container className="relative">
        <Eyebrow tone="paper">The decision framework</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold text-paper-50 sm:text-4xl">
          {name}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-50/75">{intro}</p>

        <div className="mt-12">
          <QuestionsGrid tests={tests} />
        </div>
      </Container>
    </section>
  );
}
