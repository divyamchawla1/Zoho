import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDeliverables, getServices } from "@/lib/content";
import { resolveServices } from "@/lib/resolve";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Deliverables",
  description: "What actually gets handed over — ten deliverables, each with its purpose, audience and a sample outline of its structure.",
  path: "/deliverables",
});

export default async function DeliverablesPage() {
  const [deliverables, services] = await Promise.all([getDeliverables(), getServices()]);

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="What gets handed over"
          title="Deliverables"
          intro="What actually gets handed over."
        />

        <div className="mt-12 space-y-10">
          {deliverables.map((deliverable) => {
            const relatedServices = resolveServices(deliverable.relatedServices, services);
            return (
              <article key={deliverable.slug} className="border-t border-paper-200 pt-8 first:border-t-0 first:pt-0">
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <p className="font-mono text-xs uppercase tracking-wide text-accent-text">
                      {deliverable.shortName}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-semibold text-ink-950">{deliverable.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-800">{deliverable.purpose}</p>

                    <p className="mt-5 font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Audience</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {deliverable.audience.map((a) => (
                        <li key={a} className="border border-paper-200 px-2 py-1 text-xs text-ink-800">
                          {a}
                        </li>
                      ))}
                    </ul>

                    {relatedServices.length > 0 ? (
                      <>
                        <p className="mt-5 font-mono text-[10px] uppercase tracking-wide text-ink-800/70">
                          Related Services
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {relatedServices.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href="/services"
                                className="inline-flex min-h-11 items-center border border-paper-200 px-2 py-1 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text sm:min-h-0"
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>

                  <div className="lg:col-span-7">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Sample Outline</p>
                    <ol className="mt-3 space-y-2">
                      {deliverable.sampleOutline.map((item, index) => (
                        <li key={item} className="flex gap-3 border border-paper-200 bg-paper-50 px-4 py-2.5">
                          <span className="font-mono text-xs text-ink-800/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-ink-950">{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
