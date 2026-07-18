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

      {/* 1. Hero */}
      <Hero global={global} />

      {/* 2. The problem */}
      <ProblemSection problem={homepage.problem} />

      {/* 3. Selected transformations */}
      <SelectedTransformations
        caseStudies={featuredCaseStudies}
        industries={industries}
        processes={processes}
        copy={homepage.transformations}
      />

      {/* 4. Industry experience */}
      <IndustrySection industries={industries} processes={processes} copy={homepage.industries} />

      {/* 5. Process library preview */}
      <ProcessLibrarySection categories={categories} processes={processes} copy={homepage.processLibrary} />

      {/* 6. Methodology */}
      <MethodologySection name={methodology.name} intro={methodology.intro} stages={methodology.stages} />

      {/* 7. The Eleven Questions */}
      <ElevenQuestions
        name={methodology.decisionFramework.name}
        intro={methodology.decisionFramework.intro}
        tests={methodology.decisionFramework.tests}
      />

      {/* 8. What clients bring / what I produce */}
      <ClientsBringSection copy={homepage.clientsBring} />

      {/* 9. Deliverables */}
      <DeliverablesSection deliverables={deliverables} copy={homepage.deliverables} />

      {/* 10. Technology enablement — must sit below every business-process section */}
      <TechnologySection technology={technology} />

      {/* 11. About preview */}
      <AboutPreview about={about} copy={homepage.aboutPreview} />

      {/* 12. Final CTA */}
      <FinalCta headline={contact.headline} supportingText={contact.supportingText} cta={global.contactCta} />
    </>
  );
}
