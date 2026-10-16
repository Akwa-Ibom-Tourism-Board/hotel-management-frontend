import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, FileClock } from "lucide-react";
import { Button, toast } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getAccommodation, updateAccommodation } from "../api";
import { ACCOMMODATION_CATEGORY_OPTIONS } from "../types";
import type { CategoryTableRow, SectionStatus } from "../types";
import { CategoryStatTable } from "./CategoryStatTable";
import { StatusTag } from "./StatusTag";
import { SectionCardHeader, SectionIntro, SectionActions, ErrorText } from "./SectionLayout.styles";

const FIELDS = [
  { key: "roomCount", label: "No. of Rooms" },
  { key: "bedCount", label: "No. of Beds" },
];

interface AccommodationSectionProps {
  establishmentId: string;
  status: SectionStatus | null;
}

export const AccommodationSection = ({ establishmentId, status }: AccommodationSectionProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["accommodation", establishmentId];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getAccommodation(establishmentId),
  });

  const [rows, setRows] = useState<CategoryTableRow[]>([]);
  const [savingStatus, setSavingStatus] = useState<SectionStatus | null>(null);

  useEffect(() => {
    setRows(
      (data?.categories ?? []).map((category) => ({
        rowKey: category.id,
        category: category.category,
        categoryLabel: category.categoryLabel,
        values: { roomCount: category.roomCount, bedCount: category.bedCount },
      })),
    );
  }, [data]);

  const handleSave = async (status: SectionStatus) => {
    setSavingStatus(status);
    try {
      await updateAccommodation(establishmentId, {
        status,
        categories: rows.map((row) => ({
          category: row.category,
          categoryLabel: row.categoryLabel,
          roomCount: row.values.roomCount ?? null,
          bedCount: row.values.bedCount ?? null,
        })),
      });
      toast.success(status === "complete" ? "Accommodation marked as complete" : "Accommodation saved as draft");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["sections-summary", establishmentId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save accommodation details, please try again.");
    } finally {
      setSavingStatus(null);
    }
  };

  if (isLoading) return <PageLoader title="Loading accommodation details..." />;
  if (isError) return <ErrorText>We could not load accommodation details, please try again.</ErrorText>;

  const isSaving = savingStatus !== null;

  return (
    <div>
      <SectionCardHeader>
        <SectionIntro>Break down your rooms and beds by category. Totals update automatically once saved.</SectionIntro>
        <StatusTag status={status} />
      </SectionCardHeader>

      <CategoryStatTable
        categoryColumnLabel="Room Category"
        predefinedOptions={ACCOMMODATION_CATEGORY_OPTIONS}
        fields={FIELDS}
        rows={rows}
        onChange={setRows}
        totals={data?.totals ?? { roomCount: 0, bedCount: 0 }}
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
