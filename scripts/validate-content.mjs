#!/usr/bin/env node
/**
 * Content validator for the Divyam Chawla portfolio content model.
 *
 * Zero dependencies. Run from the package root:
 *   node scripts/validate-content.mjs
 *
 * This is the same set of rules the build-time validator in /lib/validate.ts
 * must enforce once the site exists. A broken cross-reference should FAIL
 * the build, not render a dead link.
 *
 * Exit code 1 on any error.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const load = (n) => JSON.parse(readFileSync(join(root, "content", `${n}.json`), "utf8"));

const processes = load("processes");
const cases = load("case-studies");
const industries = load("industries");
const services = load("services");
const deliverables = load("deliverables");
const categories = load("process-categories");
const methodology = load("methodology");
const technology = load("technology");
const insights = load("insights");
const engagement = load("engagement-models");
const testimonials = load("testimonials");
const metrics = load("metrics");

const set = (arr, k = "slug") => new Set(arr.map((x) => x[k]));
const P = set(processes);
const C = set(cases);
const I = set(industries);
const S = set(services);
const D = set(deliverables);
const CAT = set(categories);
const E = set(engagement);
const M = set(methodology.stages);
const TECH = new Set(technology.groups.map((g) => g.name));

const errors = [];
const check = (cond, msg) => { if (!cond) errors.push(msg); };
const each = (list, field, valid, label, name) => {
  for (const v of list?.[field] ?? []) check(valid.has(v), `${label} ${list.slug}: unknown ${name} "${v}"`);
};

const EXPOSURE = new Set(["solutioning-experience", "process-experience", "project-exposure", "operator-experience"]);
const VERDICT = new Set(["standard", "configuration", "custom", "external"]);
const STAGES = new Set(["discovery", "process-mapping", "architecture", "requirement-documentation", "estimation", "delivery-leadership", "uat"]);

for (const p of processes) {
  check(CAT.has(p.category), `process ${p.slug}: unknown category "${p.category}"`);
  each(p, "industries", I, "process", "industry");
  each(p, "caseStudies", C, "process", "case study");
  each(p, "technologyCategories", TECH, "process", "technology group");
  for (const f of ["objective", "stakeholders", "commonProblems", "futureState", "controls", "dataRequired", "reporting", "risks", "discoveryQuestions"]) {
    check(p[f] && p[f].length, `process ${p.slug}: empty required field "${f}"`);
  }
}

for (const c of cases) {
  each(c, "industrySlugs", I, "case", "industry");
  each(c, "processSlugs", P, "case", "process");
  each(c, "serviceSlugs", S, "case", "service");
  each(c, "deliverableSlugs", D, "case", "deliverable");
  each(c, "technology", TECH, "case", "technology group");
  each(c, "engagementStages", STAGES, "case", "engagement stage");
  check(["expected", "achieved"].includes(c.effect?.type), `case ${c.slug}: effect.type must be "expected" or "achieved"`);
  check(Array.isArray(c.effect?.verifiedMetrics) && c.effect.verifiedMetrics.length === 0,
    `case ${c.slug}: verifiedMetrics must remain empty until a metric is verified by Divyam`);
  for (const sc of c.standardVsCustom ?? []) check(VERDICT.has(sc.verdict), `case ${c.slug}: unknown verdict "${sc.verdict}"`);
  if (c.featured) check(typeof c.featureOrder === "number", `case ${c.slug}: featured cases need a featureOrder`);
}

for (const i of industries) {
  check(EXPOSURE.has(i.exposure), `industry ${i.slug}: unknown exposure "${i.exposure}"`);
  each(i, "processes", P, "industry", "process");
  each(i, "caseStudies", C, "industry", "case study");
  each(i, "deliverables", D, "industry", "deliverable");
  each(i, "services", S, "industry", "service");
  for (const ex of i.exampleEngagements ?? []) {
    if (ex.caseStudySlug) check(C.has(ex.caseStudySlug), `industry ${i.slug}: unknown case study "${ex.caseStudySlug}"`);
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
    check((x.body ?? []).length === 0, `insight ${x.slug}: a draft-placeholder must have an empty body — do not write it for him`);
  }
}

check(testimonials.length === 0, "testimonials.json must remain empty until written approval exists");
check(metrics.length === 0, "metrics.json must remain empty until a metric is verified");

// Duplicate slug detection
for (const [name, list] of Object.entries({ processes, cases, industries, services, deliverables, engagement, insights })) {
  const seen = new Set();
  for (const x of list) {
    check(!seen.has(x.slug), `${name}: duplicate slug "${x.slug}"`);
    seen.add(x.slug);
  }
}

const counts = `processes=${processes.length} cases=${cases.length} industries=${industries.length} services=${services.length} deliverables=${deliverables.length} insights=${insights.length}`;

if (errors.length) {
  console.error(`\n✗ Content validation failed (${errors.length} error${errors.length > 1 ? "s" : ""})\n`);
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}

console.log(`✓ Content valid — ${counts}`);
