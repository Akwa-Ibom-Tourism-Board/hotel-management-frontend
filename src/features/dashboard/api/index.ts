import { httpClient } from "@/shared/lib";
import type { AnalyticsSummary, ExportFilter } from "./types";

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const { data } = await httpClient.get("/analytics/summary");
  return data.data;
};

export const exportEstablishments = async (filter: ExportFilter): Promise<Blob> => {
  const { data } = await httpClient.get("/analytics/export", {
    params: { type: filter, format: "xlsx" },
    responseType: "blob",
  });
  return data;
};
