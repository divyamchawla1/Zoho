import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomepageContent } from "@/schemas/content-types";

export function ProblemSection({ problem }: { problem: HomepageContent["problem"] }) {
  return (
    <section className="border-b border-ink-800 bg-ink-950 py-16 sm:py-20 lg:py-24">
      <Container>
        <Eyebrow tone="paper">The problem</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold text-paper-50 sm:text-4xl">
          {problem.title}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="border border-danger-500/40 bg-ink-900 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-danger-500">
              {problem.arrivesLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {problem.arrives.map((item) => (
                <li key={item} className="border-l-2 border-danger-500/50 pl-3 text-sm text-paper-50/85">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-accent-400/40 bg-ink-900 p-6">
            <p className="font-mono text-xs uppercase tracking-wide text-accent-400">
              {problem.neededLabel}
            </p>
            <ul className="mt-4 space-y-3">
              {problem.needed.map((item) => (
                <li key={item} className="border-l-2 border-accent-400/50 pl-3 text-sm text-paper-50/85">
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
