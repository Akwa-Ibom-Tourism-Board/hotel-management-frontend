import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, FileClock } from "lucide-react";
import { Button, toast } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getEmploymentStats, updateEmploymentStats } from "../api";
import { EMPLOYMENT_CATEGORY_OPTIONS } from "../types";
import type { CategoryTableRow, SectionStatus } from "../types";
import { CategoryStatTable } from "./CategoryStatTable";
import { StatusTag } from "./StatusTag";
import { SectionCardHeader, SectionIntro, SectionActions, ErrorText } from "./SectionLayout.styles";

const FIELDS = [
  { key: "akwaIbomIndigenes", label: "Akwa Ibom Indigenes" },
  { key: "nonIndigenes", label: "Non-Indigenes" },
  { key: "foreignEmployees", label: "Foreign Employees" },
];

interface EmploymentStatsSectionProps {
  establishmentId: string;
  year: number;
  status: SectionStatus | undefined;
}

export const EmploymentStatsSection = ({ establishmentId, year, status }: EmploymentStatsSectionProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["employment-stats", establishmentId, year];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getEmploymentStats(establishmentId, year),
  });

  const [rows, setRows] = useState<CategoryTableRow[]>([]);
  const [savingStatus, setSavingStatus] = useState<SectionStatus | null>(null);

  useEffect(() => {
    setRows(
      (data?.categories ?? []).map((category) => ({
        rowKey: category.id,
        category: category.category,
        categoryLabel: category.categoryLabel,
        values: {
          akwaIbomIndigenes: category.akwaIbomIndigenes,
          nonIndigenes: category.nonIndigenes,
          foreignEmployees: category.foreignEmployees,
        },
      })),
    );
  }, [data]);

  const handleSave = async (nextStatus: SectionStatus) => {
    setSavingStatus(nextStatus);
    try {
      await updateEmploymentStats(establishmentId, {
        reportingYear: year,
        status: nextStatus,
        categories: rows.map((row) => ({
          category: row.category,
          categoryLabel: row.categoryLabel,
          akwaIbomIndigenes: row.values.akwaIbomIndigenes ?? null,
          nonIndigenes: row.values.nonIndigenes ?? null,
          foreignEmployees: row.values.foreignEmployees ?? null,
        })),
      });
      toast.success(nextStatus === "complete" ? "Employment statistics marked as complete" : "Employment statistics saved as draft");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["sections-summary", establishmentId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save employment statistics, please try again.");
    } finally {
      setSavingStatus(null);
    }
  };

  if (isLoading) return <PageLoader title="Loading employment statistics..." />;
  if (isError) return <ErrorText>We could not load employment statistics, please try again.</ErrorText>;

  const isSaving = savingStatus !== null;

  return (
    <div>
      <SectionCardHeader>
        <SectionIntro>Report your staff headcount by category for {year}.</SectionIntro>
        <StatusTag status={status} />
      </SectionCardHeader>

      <CategoryStatTable
        categoryColumnLabel="Employment Category"
        predefinedOptions={EMPLOYMENT_CATEGORY_OPTIONS}
        fields={FIELDS}
        rows={rows}
        onChange={setRows}
        totals={data?.totals ?? { akwaIbomIndigenes: 0, nonIndigenes: 0, foreignEmployees: 0 }}
        showRowTotal
        disabled={isSaving}
      />

      <SectionActions>
        <Button type="button" variant="outline" disabled={isSaving} onClick={() => handleSave("draft")}>
          <FileClock size={16} />
          {savingStatus === "draft" ? "Saving..." : "Save as Draft"}
        </Button>
        <Button type="button" disabled={isSaving} onClick={() => handleSave("complete")}>
          <Save size={16} />
          {savingStatus === "complete" ? "Saving..." : "Mark Complete"}
        </Button>
      </SectionActions>
    </div>
  );
};
