import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Save, FileClock, BedDouble } from "lucide-react";
import { Button, Input, toast } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getRoomRates, updateRoomRates } from "../api";
import type { SectionStatus } from "../types";
import { StatusTag } from "./StatusTag";
import { SectionCardHeader, SectionIntro, SectionActions, CurrencyInputWrap, CurrencyPrefix, ErrorText } from "./SectionLayout.styles";

const RatesList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
`;

const RateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.card};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const RateLabel = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const RateInputWrap = styled(CurrencyInputWrap)`
  width: 10rem;
  flex-shrink: 0;
`;

const EmptyText = styled.p`
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

interface RoomRatesSectionProps {
  establishmentId: string;
  year: number;
  status: SectionStatus | undefined;
}

export const RoomRatesSection = ({ establishmentId, year, status }: RoomRatesSectionProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["room-rates", establishmentId, year];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getRoomRates(establishmentId, year),
  });

  const [rates, setRates] = useState<Record<string, string>>({});
  const [savingStatus, setSavingStatus] = useState<SectionStatus | null>(null);

  useEffect(() => {
    const next: Record<string, string> = {};
    (data?.categories ?? []).forEach((category) => {
      next[category.accommodationCategoryId] = category.rate != null ? String(category.rate) : "";
    });
    setRates(next);
  }, [data]);

  const handleSave = async (nextStatus: SectionStatus) => {
    setSavingStatus(nextStatus);
    try {
      await updateRoomRates(establishmentId, {
        reportingYear: year,
        status: nextStatus,
        rates: Object.entries(rates).map(([accommodationCategoryId, rate]) => ({
          accommodationCategoryId,
          rate: rate === "" ? null : Number(rate),
        })),
      });
      toast.success(nextStatus === "complete" ? "Room rates marked as complete" : "Room rates saved as draft");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["sections-summary", establishmentId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save room rates, please try again.");
    } finally {
      setSavingStatus(null);
    }
  };

  if (isLoading) return <PageLoader title="Loading room rates..." />;
  if (isError) return <ErrorText>We could not load room rates, please try again.</ErrorText>;

  const isSaving = savingStatus !== null;
  const categories = data?.categories ?? [];

  return (
    <div>
      <SectionCardHeader>
        <SectionIntro>
          Set a rate for each room category for {year}. Room categories themselves are managed in the Accommodation
          section above.
        </SectionIntro>
        {categories.length > 0 && <StatusTag status={status} />}
      </SectionCardHeader>

      {categories.length === 0 ? (
        <EmptyText>
          <BedDouble size={22} />
          No room types/accommodation types added yet. Add room categories in the Accommodation section first.
        </EmptyText>
      ) : (
        <>
          <RatesList>
            {categories.map((category) => (
              <RateRow key={category.accommodationCategoryId}>
                <RateLabel>{category.categoryLabel}</RateLabel>
                <RateInputWrap>
                  <CurrencyPrefix>₦</CurrencyPrefix>
                  <Input
                    type="number"
                    min={0}
                    value={rates[category.accommodationCategoryId] ?? ""}
                    disabled={isSaving}
                    onChange={(e) =>
                      setRates((prev) => ({ ...prev, [category.accommodationCategoryId]: e.target.value }))
                    }
                  />
                </RateInputWrap>
              </RateRow>
            ))}
          </RatesList>

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
        </>
      )}
    </div>
  );
};
