import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Link as LinkType } from "@/schemas/content-types";

export function FinalCta({
  headline,
  supportingText,
  cta,
}: {
  headline: string;
  supportingText: string;
  cta: LinkType;
}) {
  return (
    <section className="bg-ink-950 py-20 sm:py-28">
      <Container className="max-w-3xl text-center">
        <h2 className="text-balance font-display text-3xl font-semibold text-paper-50 sm:text-4xl">
          {headline}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper-50/75">
          {supportingText}
        </p>
        <Link
          href={cta.href}
          className="mt-8 inline-block border border-paper-50 bg-paper-50 px-6 py-3 font-mono text-sm uppercase tracking-wide text-ink-950 transition-colors hover:bg-transparent hover:text-paper-50"
        >
          {cta.label}
        </Link>
      </Container>
    </section>
  );
}
