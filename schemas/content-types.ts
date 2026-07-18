/**
 * Content types for the Divyam Chawla portfolio.
 *
 * These types are the contract between `/content/*.json` and the UI.
 * Page components must consume these types and must never hard-code content.
 *
 * Rules:
 * - Every entity has a stable `slug`. Slugs are the cross-link key.
 * - Anything not yet verified is the string "TBD" or an empty array.
 * - Nothing in this file implies a claim that has not been verified.
 */

export type Link = {
  label: string;
  href: string;
};

/** Depth of involvement. Used to keep language honest on industry pages. */
export type ExposureLevel =
  | "solutioning-experience"
  | "process-experience"
  | "project-exposure"
  | "operator-experience";

/** Which parts of the lifecycle a piece of work involved. */
export type EngagementStage =
  | "discovery"
  | "process-mapping"
  | "architecture"
  | "requirement-documentation"
  | "estimation"
  | "delivery-leadership"
  | "uat";

export type ProcessCategorySlug =
  | "customer-and-sales"
  | "service-and-support"
  | "commerce-and-fulfilment"
  | "finance-operations"
  | "operations-and-governance"
  | "marketing-and-engagement";

/* -------------------------------------------------------------------------- */
/* global.json                                                                 */
/* -------------------------------------------------------------------------- */

export type GlobalContent = {
  name: string;
  primaryTitle: string;
  specialistTitle: string;
  seniorTitle: string;
  profileLine: string;
  headline: string;
  summary: string;
  supportingStatement: string;
  locationDisplay: string;
  primaryCta: Link;
  secondaryCta: Link;
  contactCta: Link;
  nav: Link[];
  footerNav: Link[];
  /** Shown wherever anonymised client work appears. */
  anonymisationNotice: string;
};

/* -------------------------------------------------------------------------- */
/* homepage.json                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Homepage-only structural copy that MASTER_BUILD_PROMPT.md prescribes
 * verbatim but that has no natural home in another collection (the problem
 * framing, the clients-bring/I-produce split). Everything else on the
 * homepage is sourced from its own collection (global, case-studies,
 * industries, processes, methodology, technology, about, contact).
 */
export type HomepageContent = {
  problem: {
    title: string;
    arrivesLabel: string;
    arrives: string[];
    neededLabel: string;
    needed: string[];
  };
  transformations: { title: string; intro: string };
  industries: { title: string; intro: string };
  processLibrary: { title: string; intro: string };
  clientsBring: {
    title: string;
    clientBringsLabel: string;
    clientBrings: string[];
    iProduceLabel: string;
    iProduce: string[];
  };
  deliverables: { title: string; intro: string };
  aboutPreview: { title: string };
};

/* -------------------------------------------------------------------------- */
/* about.json                                                                  */
/* -------------------------------------------------------------------------- */

export type CoreRole = {
  slug: string;
  title: string;
  description: string;
  /** What this role produces. Used by the role-intersection diagram. */
  outputs: string[];
};

export type CapabilityGroup = {
  slug: string;
  name: string;
  /** No proficiency scores. Capability presence only. */
  capabilities: string[];
};

export type TimelineEntry = {
  /** "TBD" until Divyam confirms dates. Rendered as sequence, not calendar. */
  period: string;
  title: string;
  description: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type AboutContent = {
  shortIntroduction: string;
  professionalNarrative: string[];
  coreRoles: CoreRole[];
  roleIntersection: {
    intro: string;
    axes: { name: string; description: string }[];
    centre: string;
  };
  capabilityMap: CapabilityGroup[];
  principles: Principle[];
  timeline: TimelineEntry[];
  differentiators: string[];
  markets: string[];
  operatorExperience: {
    intro: string;
    points: string[];
  };
  aiPosition: {
    intro: string;
    doing: string[];
    notDoing: string[];
  };
};

/* -------------------------------------------------------------------------- */
/* industries.json                                                             */
/* -------------------------------------------------------------------------- */

export type Industry = {
  slug: string;
  name: string;
  /** Honest label for depth of involvement. Rendered on the page. */
  exposure: ExposureLevel;
  summary: string;
  overview: string[];
  typicalProblems: string[];
  /** Slugs from processes.json. */
  processes: string[];
  exampleEngagements: {
    descriptor: string;
    summary: string;
    caseStudySlug?: string;
  }[];
  architectureConsiderations: string[];
  commonRisks: string[];
  /** Slugs from deliverables.json. */
  deliverables: string[];
  /** Slugs from services.json. */
  services: string[];
  /** Slugs from case-studies.json. */
  caseStudies: string[];
};

/* -------------------------------------------------------------------------- */
/* process-categories.json                                                     */
/* -------------------------------------------------------------------------- */

export type ProcessCategory = {
  slug: ProcessCategorySlug;
  name: string;
  description: string;
};

/* -------------------------------------------------------------------------- */
/* processes.json                                                              */
/* -------------------------------------------------------------------------- */

export type Process = {
  slug: string;
  name: string;
  category: ProcessCategorySlug;
  objective: string;
  stakeholders: string[];
  commonProblems: string[];
  /** Ordered steps of the recommended future-state pattern. */
  futureState: string[];
  controls: string[];
  dataRequired: string[];
  reporting: string[];
  risks: string[];
  /** Questions asked during discovery. A key differentiator of the library. */
  discoveryQuestions: string[];
  /** Capability categories, not product names. Keeps the library vendor-neutral. */
  technologyCategories: string[];
  industries: string[];
  caseStudies: string[];
};

/* -------------------------------------------------------------------------- */
/* case-studies.json                                                           */
/* -------------------------------------------------------------------------- */

export type CaseState = {
  summary: string;
  steps: string[];
  risks?: string[];
  controls?: string[];
  gaps?: string[];
};

export type ScopeDecision = {
  requirement: string;
  decision: string;
  reasoning: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Always the anonymised descriptor, e.g. "South African retail business". */
  locationContext: string;
  status: string;
  featured: boolean;
  /** Order on the homepage when featured. */
  featureOrder?: number;
  industrySlugs: string[];
  processSlugs: string[];
  serviceSlugs: string[];
  deliverableSlugs: string[];
  engagementStages: EngagementStage[];
  executiveSummary: string;
  industryContext: string;
  businessModel: string;
  operationalChallenge: string[];
  stakeholders: string[];
  currentState: CaseState;
  processGaps: string[];
  keyDiscoveryQuestions: string[];
  futureState: CaseState;
  solutionArchitecture: {
    summary: string;
    layers: { name: string; role: string }[];
    dataFlow: string[];
  };
  standardVsCustom: {
    requirement: string;
    verdict: "standard" | "configuration" | "custom" | "external";
    reasoning: string;
  }[];
  scopeDecisions: ScopeDecision[];
  dependencies: string[];
  clientResponsibilities: string[];
  risks: string[];
  contribution: string[];
  deliverablesProduced: string[];
  /** Qualitative only unless a verified metric is supplied. Never invented. */
  effect: {
    type: "expected" | "achieved";
    statement: string;
    verifiedMetrics: string[];
  };
  /** Technology capability groups involved. */
  technology: string[];
};

/* -------------------------------------------------------------------------- */
/* services.json                                                               */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  title: string;
  audience: string;
  neededWhen: string;
  inputs: string[];
  activities: string[];
  deliverables: string[];
  /** Slug from engagement-models.json. */
  engagementModel: string;
  notIncluded: string[];
  caseStudies: string[];
  relatedProcesses: string[];
  /** No price is published unless Divyam supplies one. */
  price: "TBD";
};

/* -------------------------------------------------------------------------- */
/* methodology.json                                                            */
/* -------------------------------------------------------------------------- */

export type MethodologyStage = {
  slug: string;
  name: string;
  purpose: string;
  inputs: string[];
  activities: string[];
  questionsAsked: string[];
  outputs: string[];
  risksChecked: string[];
  clientResponsibilities: string[];
  deliverableSlugs: string[];
  caseStudySlugs: string[];
};

export type DecisionFrameworkTest = {
  question: string;
  whyItMatters: string;
};

export type Methodology = {
  name: string;
  intro: string;
  stages: MethodologyStage[];
  decisionFramework: {
    name: string;
    intro: string;
    tests: DecisionFrameworkTest[];
  };
  testingModel: {
    intro: string;
    layers: { name: string; owner: string; checks: string[] }[];
  };
};

/* -------------------------------------------------------------------------- */
/* deliverables.json                                                           */
/* -------------------------------------------------------------------------- */

export type Deliverable = {
  slug: string;
  name: string;
  shortName: string;
  purpose: string;
  audience: string[];
  contains: string[];
  /** Structure preview only. Never a real client document. */
  sampleOutline: string[];
  relatedServices: string[];
};

/* -------------------------------------------------------------------------- */
/* technology.json                                                             */
/* -------------------------------------------------------------------------- */

export type TechnologyGroup = {
  slug: string;
  name: string;
  /** The business capability, stated before any product name. */
  capability: string;
  items: string[];
};

export type TechnologyContent = {
  message: string;
  note: string;
  groups: TechnologyGroup[];
};

/* -------------------------------------------------------------------------- */
/* insights.json                                                               */
/* -------------------------------------------------------------------------- */

export type Insight = {
  slug: string;
  title: string;
  category: string;
  status: "draft-placeholder" | "published";
  summary: string;
  /** Empty until Divyam writes the article. Index hides empty bodies. */
  body: string[];
  relatedProcesses: string[];
  relatedMethodologyStages: string[];
};

/* -------------------------------------------------------------------------- */
/* engagement-models.json                                                      */
/* -------------------------------------------------------------------------- */

export type EngagementModel = {
  slug: string;
  name: string;
  bestFor: string;
  shape: string;
  typicalDuration: string;
  whatDivyamDoes: string[];
  whatTheClientDoes: string[];
  output: string[];
};

/* -------------------------------------------------------------------------- */
/* faqs.json                                                                   */
/* -------------------------------------------------------------------------- */

export type Faq = {
  slug: string;
  question: string;
  answer: string;
  /** Used for FAQPage structured data grouping. */
  group: string;
};

/* -------------------------------------------------------------------------- */
/* contact.json                                                                */
/* -------------------------------------------------------------------------- */

export type ContactField = {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea";
  required: boolean;
  options?: string[];
};

export type ContactContent = {
  headline: string;
  supportingText: string;
  fields: ContactField[];
  collaborationOptions: string[];
  responseNote: string;
  /** All TBD until supplied. Render nothing rather than a placeholder. */
  email: string;
  linkedin: string;
  scheduling: string;
};

/* -------------------------------------------------------------------------- */
/* Future-ready, intentionally empty                                           */
/* -------------------------------------------------------------------------- */

/** testimonials.json ships as []. Never populate without written approval. */
export type Testimonial = {
  slug: string;
  quote: string;
  attribution: string;
  role: string;
  organisation: string;
  approvalOnFile: boolean;
};

/** metrics.json ships as []. Never populate without a verifiable source. */
export type Metric = {
  slug: string;
  label: string;
  value: string;
  source: string;
  verified: boolean;
  caseStudySlug?: string;
};
