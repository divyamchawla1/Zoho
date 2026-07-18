/**
 * Typed content loaders. The only place anything under /content is read.
 * Async from day one — see docs/11-cms-migration.md: swapping this file for
 * a fetch-based implementation must be the entire migration.
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type {
  AboutContent,
  CaseStudy,
  ContactContent,
  Deliverable,
  EngagementModel,
  Faq,
  GlobalContent,
  HomepageContent,
  Industry,
  Insight,
  Metric,
  Methodology,
  Process,
  ProcessCategory,
  Service,
  TechnologyContent,
  Testimonial,
} from "@/schemas/content-types";
import { validateContent, type RawContent } from "@/lib/validate";

const CONTENT_DIR = join(process.cwd(), "content");

async function loadJson<T>(name: string): Promise<T> {
  const raw = await readFile(join(CONTENT_DIR, `${name}.json`), "utf8");
  return JSON.parse(raw) as T;
}

type AllContent = RawContent & {
  global: GlobalContent;
  about: AboutContent;
  contact: ContactContent;
  faqs: Faq[];
  homepage: HomepageContent;
};

let cache: Promise<AllContent> | null = null;

function loadAll(): Promise<AllContent> {
  if (!cache) {
    cache = (async () => {
      const [
        processes,
        cases,
        industries,
        services,
        deliverables,
        categories,
        methodology,
        technology,
        insights,
        engagement,
        testimonials,
        metrics,
        global,
        about,
        contact,
        faqs,
        homepage,
      ] = await Promise.all([
        loadJson<Process[]>("processes"),
        loadJson<CaseStudy[]>("case-studies"),
        loadJson<Industry[]>("industries"),
        loadJson<Service[]>("services"),
        loadJson<Deliverable[]>("deliverables"),
        loadJson<ProcessCategory[]>("process-categories"),
        loadJson<Methodology>("methodology"),
        loadJson<TechnologyContent>("technology"),
        loadJson<Insight[]>("insights"),
        loadJson<EngagementModel[]>("engagement-models"),
        loadJson<Testimonial[]>("testimonials"),
        loadJson<Metric[]>("metrics"),
        loadJson<GlobalContent>("global"),
        loadJson<AboutContent>("about"),
        loadJson<ContactContent>("contact"),
        loadJson<Faq[]>("faqs"),
        loadJson<HomepageContent>("homepage"),
      ]);

      const content: AllContent = {
        processes,
        cases,
        industries,
        services,
        deliverables,
        categories,
        methodology,
        technology,
        insights,
        engagement,
        testimonials,
        metrics,
        global,
        about,
        contact,
        faqs,
        homepage,
      };

      validateContent(content);

      return content;
    })();
  }
  return cache;
}

/** "TBD" is never handed to a component. Undefined means "not yet known". */
function filterTBD(value: string): string | undefined {
  return value === "TBD" ? undefined : value;
}

export async function getGlobal(): Promise<GlobalContent> {
  return (await loadAll()).global;
}

export async function getAbout(): Promise<
  Omit<AboutContent, "timeline"> & { timeline: (Omit<AboutContent["timeline"][number], "period"> & { period?: string })[] }
> {
  const about = (await loadAll()).about;
  return {
    ...about,
    timeline: about.timeline.map((entry) => ({ ...entry, period: filterTBD(entry.period) })),
  };
}

export async function getHomepage(): Promise<HomepageContent> {
  return (await loadAll()).homepage;
}

export async function getContact(): Promise<
  Omit<ContactContent, "email" | "linkedin" | "scheduling"> & {
    email?: string;
    linkedin?: string;
    scheduling?: string;
  }
> {
  const contact = (await loadAll()).contact;
  return {
    ...contact,
    email: filterTBD(contact.email),
    linkedin: filterTBD(contact.linkedin),
    scheduling: filterTBD(contact.scheduling),
  };
}

export async function getIndustries(): Promise<Industry[]> {
  return (await loadAll()).industries;
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
  return (await getIndustries()).find((i) => i.slug === slug);
}

export async function getProcesses(): Promise<Process[]> {
  return (await loadAll()).processes;
}

export async function getProcessBySlug(slug: string): Promise<Process | undefined> {
  return (await getProcesses()).find((p) => p.slug === slug);
}

export async function getProcessCategories(): Promise<ProcessCategory[]> {
  return (await loadAll()).categories;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return (await loadAll()).cases;
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return (await getCaseStudies())
    .filter((c) => c.featured)
    .sort((a, b) => (a.featureOrder ?? 0) - (b.featureOrder ?? 0));
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  return (await loadAll()).services;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function getDeliverables(): Promise<Deliverable[]> {
  return (await loadAll()).deliverables;
}

export async function getDeliverableBySlug(slug: string): Promise<Deliverable | undefined> {
  return (await getDeliverables()).find((d) => d.slug === slug);
}

export async function getMethodology(): Promise<Methodology> {
  return (await loadAll()).methodology;
}

export async function getTechnology(): Promise<TechnologyContent> {
  return (await loadAll()).technology;
}

export async function getEngagementModels(): Promise<
  (Omit<EngagementModel, "typicalDuration"> & { typicalDuration?: string })[]
> {
  const models = (await loadAll()).engagement;
  return models.map((model) => ({ ...model, typicalDuration: filterTBD(model.typicalDuration) }));
}

export async function getEngagementModelBySlug(slug: string) {
  return (await getEngagementModels()).find((e) => e.slug === slug);
}

export async function getFaqs(): Promise<Faq[]> {
  return (await loadAll()).faqs;
}

export async function getInsights(): Promise<Insight[]> {
  return (await loadAll()).insights;
}

export async function getPublishedInsightBySlug(slug: string): Promise<Insight | undefined> {
  const insight = (await getInsights()).find((i) => i.slug === slug);
  return insight?.status === "published" ? insight : undefined;
}

/** [] means the component that renders these does not render. Never a placeholder. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return (await loadAll()).testimonials;
}

/** [] means the component that renders these does not render. Never a placeholder. */
export async function getMetrics(): Promise<Metric[]> {
  return (await loadAll()).metrics;
}
