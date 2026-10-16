import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, FileClock } from "lucide-react";
import { Button, FormField, Input, toast } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getWageStats, updateWageStats } from "../api";
import type { SectionStatus } from "../types";
import { StatusTag } from "./StatusTag";
import {
  SectionCardHeader,
  SectionIntro,
  FieldGrid,
  SectionActions,
  CurrencyInputWrap,
  CurrencyPrefix,
  ErrorText,
} from "./SectionLayout.styles";

interface WageStatsSectionProps {
  establishmentId: string;
  year: number;
  status: SectionStatus | null;
}

export const WageStatsSection = ({ establishmentId, year, status }: WageStatsSectionProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["wage-stats", establishmentId, year];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getWageStats(establishmentId, year),
  });

  const [employeesPaidCount, setEmployeesPaidCount] = useState("");
  const [totalWageSalary, setTotalWageSalary] = useState("");
  const [savingStatus, setSavingStatus] = useState<SectionStatus | null>(null);

  useEffect(() => {
    setEmployeesPaidCount(data?.employeesPaidCount != null ? String(data.employeesPaidCount) : "");
    setTotalWageSalary(data?.totalWageSalary != null ? String(data.totalWageSalary) : "");
  }, [data]);

  const handleSave = async (nextStatus: SectionStatus) => {
    setSavingStatus(nextStatus);
    try {
      await updateWageStats(establishmentId, {
        reportingYear: year,
        status: nextStatus,
        employeesPaidCount: employeesPaidCount === "" ? null : Number(employeesPaidCount),
        totalWageSalary: totalWageSalary === "" ? null : Number(totalWageSalary),
      });
      toast.success(nextStatus === "complete" ? "Wage and salary statistics marked as complete" : "Wage and salary statistics saved as draft");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["sections-summary", establishmentId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save wage and salary statistics, please try again.");
    } finally {
      setSavingStatus(null);
    }
  };

  if (isLoading) return <PageLoader title="Loading wage and salary statistics..." />;
  if (isError) return <ErrorText>We could not load wage and salary statistics, please try again.</ErrorText>;

  const isSaving = savingStatus !== null;

  return (
    <div>
      <SectionCardHeader>
        <SectionIntro>Report total wages paid and employee counts for {year}.</SectionIntro>
        <StatusTag status={status} />
      </SectionCardHeader>

      <FieldGrid>
        <FormField label="No. of Employees Paid" optional>
          <Input
            type="number"
            min={0}
            value={employeesPaidCount}
            onChange={(e) => setEmployeesPaidCount(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Total Wage-Salary" optional>
          <CurrencyInputWrap>
            <CurrencyPrefix>₦</CurrencyPrefix>
            <Input
              type="number"
              min={0}
              value={totalWageSalary}
              onChange={(e) => setTotalWageSalary(e.target.value)}
              disabled={isSaving}
            />
          </CurrencyInputWrap>
        </FormField>

        <FormField label="Average Monthly Wage" hint="Calculated automatically from the fields above.">
          <CurrencyInputWrap>
            <CurrencyPrefix>₦</CurrencyPrefix>
            <Input type="text" readOnly value={(data?.averageMonthlyWage ?? 0).toLocaleString()} />
          </CurrencyInputWrap>
        </FormField>
      </FieldGrid>

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
