import { useState } from "react";
import styled from "styled-components";
import { Download } from "lucide-react";
import { Button, toast } from "@/shared/ui";
import { downloadBlob } from "@/shared/lib";
import { exportEstablishments } from "../api";
import type { ExportFilter } from "../api/types";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const OPTIONS: { label: string; filter: ExportFilter }[] = [
  { label: "All Establishments", filter: "all" },
  { label: "Licensed Only", filter: "licensed" },
  { label: "Unlicensed Only", filter: "unlicensed" },
  { label: "Drafts Only", filter: "drafts" },
];

export const ExportMenu = () => {
  const [loadingFilter, setLoadingFilter] = useState<ExportFilter | null>(null);

  const handleExport = async (filter: ExportFilter) => {
    setLoadingFilter(filter);
    try {
      const blob = await exportEstablishments(filter);
      downloadBlob(blob, `establishments-${filter}-${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export that list, please try again.");
    } finally {
      setLoadingFilter(null);
    }
  };

  return (
    <Row>
      {OPTIONS.map((option) => (
        <Button
          key={option.filter}
          variant="outline"
          size="sm"
          onClick={() => handleExport(option.filter)}
          disabled={loadingFilter !== null}
          type="button"
        >
          <Download size={15} />
          {loadingFilter === option.filter ? "Exporting..." : option.label}
        </Button>
      ))}
    </Row>
  );
};
