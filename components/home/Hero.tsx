import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { HeroTransformation } from "@/components/home/HeroTransformation";
import type { GlobalContent } from "@/schemas/content-types";

export function Hero({ global }: { global: GlobalContent }) {
  return (
    <section className="border-b border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-800/70">
            {global.primaryTitle}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-950 sm:text-5xl lg:text-[3.25rem]">
            {global.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-800">{global.summary}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={global.primaryCta.href}
              className="border border-ink-950 bg-ink-950 px-5 py-3 font-mono text-sm uppercase tracking-wide text-paper-50 transition-colors hover:bg-ink-800"
            >
              {global.primaryCta.label}
            </Link>
            <Link
              href={global.secondaryCta.href}
              className="border border-ink-950 px-5 py-3 font-mono text-sm uppercase tracking-wide text-ink-950 transition-colors hover:bg-ink-950 hover:text-paper-50"
            >
              {global.secondaryCta.label}
            </Link>
          </div>
        </div>

        <HeroTransformation />
      </Container>
    </section>
  );
}
