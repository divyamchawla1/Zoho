import type { EngagementStage, ExposureLevel } from "@/schemas/content-types";

/** Honest, never-upgraded display labels — docs/04-content-and-confidentiality.md. */
export const EXPOSURE_LABEL: Record<ExposureLevel, string> = {
  "solutioning-experience": "Solutioning experience",
  "process-experience": "Process experience",
  "project-exposure": "Project exposure",
  "operator-experience": "Operator experience",
};

export const ENGAGEMENT_STAGE_LABEL: Record<EngagementStage, string> = {
  discovery: "Discovery",
  "process-mapping": "Process mapping",
  architecture: "Architecture",
  "requirement-documentation": "Requirement documentation",
  estimation: "Estimation",
  "delivery-leadership": "Delivery leadership",
  uat: "UAT",
};
