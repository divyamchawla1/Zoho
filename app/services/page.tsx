import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbout, getCaseStudies, getEngagementModels, getGlobal, getProcesses, getServices } from "@/lib/content";
import { resolveCaseStudies, resolveProcesses } from "@/lib/resolve";
import { buildProfessionalService, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Nineteen services, each with who it is for, when it is needed, what is produced and — deliberately — what is not included. No prices published.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, engagementModels, caseStudies, processes, global, about] = await Promise.all([
    getServices(),
    getEngagementModels(),
    getCaseStudies(),
    getProcesses(),
    getGlobal(),
    getAbout(),
  ]);

  const servicesByModel = engagementModels.map((model) => ({
    model,
    services: services.filter((service) => service.engagementModel === model.slug),
  }));

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <JsonLd
        data={buildProfessionalService({
          name: global.name,
          description: global.summary,
          areaServed: about.markets,
          services: services.map((service) => ({ title: service.title, audience: service.audience })),
        })}
      />
      <Container>
        <SectionHeading
          level="h1"
          eyebrow="Services"
          title="Services"
          intro="Nineteen services, grouped by engagement model. Each states what is not included — scope discipline in the one place a services page usually oversells. No prices are published; every engagement is scoped on its own terms."
        />

        <div className="mt-12 space-y-14">
          {servicesByModel.map(({ model, services: groupServices }) =>
            groupServices.length > 0 ? (
              <div key={model.slug}>
                <p className="font-mono text-xs uppercase tracking-wide text-accent-text">{model.name}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-800">{model.bestFor}</p>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {groupServices.map((service) => (
                    <ServiceCard
                      key={service.slug}
                      service={service}
                      caseStudies={resolveCaseStudies(service.caseStudies, caseStudies)}
                      relatedProcesses={resolveProcesses(service.relatedProcesses, processes)}
                    />
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </Container>
    </div>
  );
}
