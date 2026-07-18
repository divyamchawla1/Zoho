/**
 * Build-time content validation. Ported from scripts/validate-content.mjs —
 * keep the two in sync. Throwing here fails `next build`: a broken
 * cross-reference must never render as a dead link (docs/01, docs/05).
 */

import type {
  CaseStudy,
  Deliverable,
  EngagementModel,
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

export type RawContent = {
  processes: Process[];
  cases: CaseStudy[];
  industries: Industry[];
  services: Service[];
  deliverables: Deliverable[];
  categories: ProcessCategory[];
  methodology: Methodology;
  technology: TechnologyContent;
  insights: Insight[];
  engagement: EngagementModel[];
  testimonials: Testimonial[];
  metrics: Metric[];
};

const EXPOSURE = new Set([
  "solutioning-experience",
  "process-experience",
  "project-exposure",
  "operator-experience",
]);
const VERDICT = new Set(["standard", "configuration", "custom", "external"]);
const STAGES = new Set([
  "discovery",
  "process-mapping",
  "architecture",
  "requirement-documentation",
  "estimation",
  "delivery-leadership",
  "uat",
]);

function toSet<T extends Record<string, unknown>>(arr: T[], key: string): Set<string> {
  return new Set(arr.map((x) => x[key] as string));
}

export function validateContent(content: RawContent): void {
  const {
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
  } = content;

  const P = toSet(processes, "slug");
  const C = toSet(cases, "slug");
  const I = toSet(industries, "slug");
  const S = toSet(services, "slug");
  const D = toSet(deliverables, "slug");
  const CAT = toSet(categories, "slug");
  const E = toSet(engagement, "slug");
  const M = toSet(methodology.stages, "slug");
  const TECH = new Set(technology.groups.map((g) => g.name));

  const errors: string[] = [];
  const check = (cond: unknown, msg: string) => {
    if (!cond) errors.push(msg);
  };
  const each = (
    list: Record<string, unknown> & { slug: string },
    field: string,
    valid: Set<string>,
    label: string,
    name: string,
  ) => {
    const values = (list[field] as string[] | undefined) ?? [];
    for (const v of values) {
      check(valid.has(v), `${label} ${list.slug}: unknown ${name} "${v}"`);
    }
  };

  for (const p of processes) {
    check(CAT.has(p.category), `process ${p.slug}: unknown category "${p.category}"`);
    each(p, "industries", I, "process", "industry");
    each(p, "caseStudies", C, "process", "case study");
    each(p, "technologyCategories", TECH, "process", "technology group");
    for (const f of [
      "objective",
      "stakeholders",
      "commonProblems",
      "futureState",
      "controls",
      "dataRequired",
      "reporting",
      "risks",
      "discoveryQuestions",
    ] as const) {
      const value = p[f];
      check(value && (value as unknown[]).length, `process ${p.slug}: empty required field "${f}"`);
    }
  }

  for (const c of cases) {
    each(c, "industrySlugs", I, "case", "industry");
    each(c, "processSlugs", P, "case", "process");
    each(c, "serviceSlugs", S, "case", "service");
    each(c, "deliverableSlugs", D, "case", "deliverable");
    each(c, "technology", TECH, "case", "technology group");
    each(c, "engagementStages", STAGES, "case", "engagement stage");
    check(
      ["expected", "achieved"].includes(c.effect?.type),
      `case ${c.slug}: effect.type must be "expected" or "achieved"`,
    );
    check(
      Array.isArray(c.effect?.verifiedMetrics) && c.effect.verifiedMetrics.length === 0,
      `case ${c.slug}: verifiedMetrics must remain empty until a metric is verified by Divyam`,
    );
    for (const sc of c.standardVsCustom ?? []) {
      check(VERDICT.has(sc.verdict), `case ${c.slug}: unknown verdict "${sc.verdict}"`);
    }
    if (c.featured) {
      check(typeof c.featureOrder === "number", `case ${c.slug}: featured cases need a featureOrder`);
    }
  }

  for (const i of industries) {
    check(EXPOSURE.has(i.exposure), `industry ${i.slug}: unknown exposure "${i.exposure}"`);
    each(i, "processes", P, "industry", "process");
    each(i, "caseStudies", C, "industry", "case study");
    each(i, "deliverables", D, "industry", "deliverable");
    each(i, "services", S, "industry", "service");
    for (const ex of i.exampleEngagements ?? []) {
      if (ex.caseStudySlug) {
        check(C.has(ex.caseStudySlug), `industry ${i.slug}: unknown case study "${ex.caseStudySlug}"`);
      }
    }
  }

  for (const s of services) {
    check(E.has(s.engagementModel), `service ${s.slug}: unknown engagement model "${s.engagementModel}"`);
    each(s, "relatedProcesses", P, "service", "process");
    each(s, "caseStudies", C, "service", "case study");
    check(s.price === "TBD", `service ${s.slug}: price must remain "TBD" unless Divyam supplies one`);
  }

  for (const d of deliverables) each(d, "relatedServices", S, "deliverable", "service");

  for (const st of methodology.stages) {
    each(st, "deliverableSlugs", D, "methodology stage", "deliverable");
    each(st, "caseStudySlugs", C, "methodology stage", "case study");
  }

  for (const x of insights) {
    each(x, "relatedProcesses", P, "insight", "process");
    each(x, "relatedMethodologyStages", M, "insight", "methodology stage");
    check(["draft-placeholder", "published"].includes(x.status), `insight ${x.slug}: unknown status "${x.status}"`);
    if (x.status === "draft-placeholder") {
      check((x.body ?? []).length === 0, `insight ${x.slug}: a draft-placeholder must have an empty body`);
    }
  }

  check(testimonials.length === 0, "testimonials.json must remain empty until written approval exists");
  check(metrics.length === 0, "metrics.json must remain empty until a metric is verified");

  for (const [name, list] of Object.entries({
    processes,
    cases,
    industries,
    services,
    deliverables,
    engagement,
    insights,
  })) {
    const seen = new Set<string>();
    for (const x of list as { slug: string }[]) {
      check(!seen.has(x.slug), `${name}: duplicate slug "${x.slug}"`);
      seen.add(x.slug);
    }
  }

  if (errors.length) {
    throw new Error(
      `Content validation failed (${errors.length} error${errors.length > 1 ? "s" : ""}):\n` +
        errors.map((e) => `  - ${e}`).join("\n"),
    );
  }
}
