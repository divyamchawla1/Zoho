import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { getAbout } from "@/lib/content";
import type { HomepageContent } from "@/schemas/content-types";

export function AboutPreview({
  about,
  copy,
}: {
  about: Awaited<ReturnType<typeof getAbout>>;
  copy: HomepageContent["aboutPreview"];
}) {
  return (
    <section className="border-b border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading title={copy.title} intro={about.shortIntroduction} />
            <Link
              href="/about"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
            >
              Full role intersection, capability map and principles →
            </Link>
          </div>

          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">
              {about.roleIntersection.intro}
            </p>
            <div className="mt-6 grid gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2">
              {about.roleIntersection.axes.map((axis) => (
                <div key={axis.name} className="bg-paper-50 p-5">
                  <p className="font-display text-sm font-semibold text-ink-950">{axis.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-800">{axis.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-px border border-t-0 border-accent-500 bg-ink-950 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wide text-accent-400">
                Where they overlap
              </p>
              <p className="mt-1 font-display text-base font-semibold text-paper-50">
                {about.roleIntersection.centre}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
