import {
  getAbout,
  getContact,
  getDeliverables,
  getFeaturedCaseStudies,
  getGlobal,
  getHomepage,
  getIndustries,
  getMethodology,
  getProcessCategories,
  getProcesses,
  getServices,
  getTechnology,
} from "@/lib/content";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildProfessionalService } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";
import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SelectedTransformations } from "@/components/home/SelectedTransformations";
import { IndustrySection } from "@/components/home/IndustrySection";
import { ProcessLibrarySection } from "@/components/home/ProcessLibrarySection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { ElevenQuestions } from "@/components/home/ElevenQuestions";
import { ClientsBringSection } from "@/components/home/ClientsBringSection";
import { DeliverablesSection } from "@/components/home/DeliverablesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { FinalCta } from "@/components/home/FinalCta";

export default async function HomePage() {
  const [
    global,
    homepage,
    featuredCaseStudies,
    industries,
    processes,
    categories,
    methodology,
    deliverables,
    technology,
    about,
    contact,
    services,
  ] = await Promise.all([
    getGlobal(),
    getHomepage(),
    getFeaturedCaseStudies(),
    getIndustries(),
    getProcesses(),
    getProcessCategories(),
    getMethodology(),
    getDeliverables(),
    getTechnology(),
    getAbout(),
    getContact(),
    getServices(),
  ]);

  return (
    <>
      <JsonLd
        data={buildProfessionalService({
          name: global.name,
          description: global.summary,
          areaServed: about.markets,
          services: services.map((service) => ({ title: service.title, audience: service.audience })),
        })}
      />

      {/* 1. Hero — auto-plays on load, not a scroll reveal target */}
      <Hero global={global} />

      {/* 2. The problem */}
      <Reveal>
        <ProblemSection problem={homepage.problem} />
      </Reveal>

      {/* 3. Selected transformations */}
      <Reveal>
        <SelectedTransformations
          caseStudies={featuredCaseStudies}
          industries={industries}
          processes={processes}
          copy={homepage.transformations}
        />
      </Reveal>

      {/* 4. Industry experience */}
      <Reveal>
        <IndustrySection industries={industries} processes={processes} copy={homepage.industries} />
      </Reveal>

      {/* 5. Process library preview */}
      <Reveal>
        <ProcessLibrarySection categories={categories} processes={processes} copy={homepage.processLibrary} />
      </Reveal>

      {/* 6. Methodology */}
      <Reveal>
        <MethodologySection name={methodology.name} intro={methodology.intro} stages={methodology.stages} />
      </Reveal>

      {/* 7. The Eleven Questions */}
      <Reveal>
        <ElevenQuestions
          name={methodology.decisionFramework.name}
          intro={methodology.decisionFramework.intro}
          tests={methodology.decisionFramework.tests}
        />
      </Reveal>

      {/* 8. What clients bring / what I produce */}
      <Reveal>
        <ClientsBringSection copy={homepage.clientsBring} />
      </Reveal>

      {/* 9. Deliverables */}
      <Reveal>
        <DeliverablesSection deliverables={deliverables} copy={homepage.deliverables} />
      </Reveal>

      {/* 10. Technology enablement — must sit below every business-process section */}
      <Reveal>
        <TechnologySection technology={technology} />
      </Reveal>

      {/* 11. About preview */}
      <Reveal>
        <AboutPreview about={about} copy={homepage.aboutPreview} />
      </Reveal>

      {/* 12. Final CTA */}
      <Reveal>
        <FinalCta headline={contact.headline} supportingText={contact.supportingText} cta={global.contactCta} />
      </Reveal>
    </>
  );
}
