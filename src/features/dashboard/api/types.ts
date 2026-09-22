export interface AnalyticsSummary {
  total: number;
  licensed: number;
  unlicensed: number;
  drafts: number;
  byEntityType: Record<string, number>;
}

export type ExportFilter = "all" | "licensed" | "unlicensed" | "drafts";
