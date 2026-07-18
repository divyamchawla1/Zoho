/**
 * Cross-reference resolution. Components receive resolved objects and never
 * look up content themselves — see docs/01-site-architecture.md.
 *
 * Content is validated at load time (lib/validate.ts), so a slug reaching
 * these functions is expected to resolve. Anything that does not is
 * silently dropped rather than thrown here — validation is where a broken
 * reference fails the build, not render time.
 */

import type {
  CaseStudy,
  Deliverable,
  EngagementModel,
  EngagementStage,
  Industry,
  Process,
  Service,
  TechnologyGroup,
} from "@/schemas/content-types";

function bySlug<T extends { slug: string }>(items: T[], slugs: string[]): T[] {
  const map = new Map(items.map((item) => [item.slug, item]));
  return slugs.map((slug) => map.get(slug)).filter((item): item is T => Boolean(item));
}

export function resolveProcesses(slugs: string[], allProcesses: Process[]): Process[] {
  return bySlug(allProcesses, slugs);
}

export function resolveIndustries(slugs: string[], allIndustries: Industry[]): Industry[] {
  return bySlug(allIndustries, slugs);
}

export function resolveCaseStudies(slugs: string[], allCaseStudies: CaseStudy[]): CaseStudy[] {
  return bySlug(allCaseStudies, slugs);
}

export function resolveServices(slugs: string[], allServices: Service[]): Service[] {
  return bySlug(allServices, slugs);
}

export function resolveDeliverables(slugs: string[], allDeliverables: Deliverable[]): Deliverable[] {
  return bySlug(allDeliverables, slugs);
}

export function resolveEngagementModel(
  slug: string,
  allModels: EngagementModel[],
): EngagementModel | undefined {
  return allModels.find((model) => model.slug === slug);
}

/** Technology cross-references are the group's `name`, not its `slug`. */
export function resolveTechnologyGroups(names: string[], allGroups: TechnologyGroup[]): TechnologyGroup[] {
  const map = new Map(allGroups.map((group) => [group.name, group]));
  return names.map((name) => map.get(name)).filter((group): group is TechnologyGroup => Boolean(group));
}

/**
 * A process has no engagementStages field of its own — only case studies do.
 * Derived (not invented) by unioning the engagement stages of every case
 * study that references the process, keyed by process slug.
 */
export function deriveProcessEngagementStages(allCaseStudies: CaseStudy[]): Map<string, EngagementStage[]> {
  const byProcess = new Map<string, Set<EngagementStage>>();
  for (const caseStudy of allCaseStudies) {
    for (const processSlug of caseStudy.processSlugs) {
      const stages = byProcess.get(processSlug) ?? new Set<EngagementStage>();
      for (const stage of caseStudy.engagementStages) stages.add(stage);
      byProcess.set(processSlug, stages);
    }
  }
  return new Map([...byProcess.entries()].map(([slug, stages]) => [slug, [...stages]]));
}
