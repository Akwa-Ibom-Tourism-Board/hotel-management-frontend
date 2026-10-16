import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, FileClock } from "lucide-react";
import { Button, FormField, Input, toast } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getOccupancy, updateOccupancy } from "../api";
import type { SectionStatus } from "../types";
import { StatusTag } from "./StatusTag";
import { SectionCardHeader, SectionIntro, FieldGrid, SectionActions, ErrorText } from "./SectionLayout.styles";

interface OccupancySectionProps {
  establishmentId: string;
  year: number;
  status: SectionStatus | null;
}

export const OccupancySection = ({ establishmentId, year, status }: OccupancySectionProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["occupancy", establishmentId, year];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getOccupancy(establishmentId, year),
  });

  const [availableRooms, setAvailableRooms] = useState("");
  const [roomNightsAvailable, setRoomNightsAvailable] = useState("");
  const [roomNightsSold, setRoomNightsSold] = useState("");
  const [totalGuestNights, setTotalGuestNights] = useState("");
  const [savingStatus, setSavingStatus] = useState<SectionStatus | null>(null);

  useEffect(() => {
    setAvailableRooms(data?.availableRooms != null ? String(data.availableRooms) : "");
    setRoomNightsAvailable(data?.roomNightsAvailable != null ? String(data.roomNightsAvailable) : "");
    setRoomNightsSold(data?.roomNightsSold != null ? String(data.roomNightsSold) : "");
    setTotalGuestNights(data?.totalGuestNights != null ? String(data.totalGuestNights) : "");
  }, [data]);

  const handleSave = async (nextStatus: SectionStatus) => {
    setSavingStatus(nextStatus);
    try {
      await updateOccupancy(establishmentId, {
        reportingYear: year,
        status: nextStatus,
        availableRooms: availableRooms === "" ? null : Number(availableRooms),
        roomNightsAvailable: roomNightsAvailable === "" ? null : Number(roomNightsAvailable),
        roomNightsSold: roomNightsSold === "" ? null : Number(roomNightsSold),
        totalGuestNights: totalGuestNights === "" ? null : Number(totalGuestNights),
      });
      toast.success(nextStatus === "complete" ? "Occupancy statistics marked as complete" : "Occupancy statistics saved as draft");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["sections-summary", establishmentId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save occupancy statistics, please try again.");
    } finally {
      setSavingStatus(null);
    }
  };

  if (isLoading) return <PageLoader title="Loading occupancy statistics..." />;
  if (isError) return <ErrorText>We could not load occupancy statistics, please try again.</ErrorText>;

  const isSaving = savingStatus !== null;

  return (
    <div>
      <SectionCardHeader>
        <SectionIntro>Report room nights and occupancy for {year}.</SectionIntro>
        <StatusTag status={status} />
      </SectionCardHeader>

      <FieldGrid>
        <FormField label="Available Rooms" optional>
          <Input
            type="number"
            min={0}
            value={availableRooms}
            onChange={(e) => setAvailableRooms(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Room Nights Available" optional>
          <Input
            type="number"
            min={0}
            value={roomNightsAvailable}
            onChange={(e) => setRoomNightsAvailable(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Room Nights Sold" optional>
          <Input
            type="number"
            min={0}
            value={roomNightsSold}
            onChange={(e) => setRoomNightsSold(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Occupancy Rate %" hint="Calculated automatically from the fields above.">
          <Input type="text" readOnly value={`${(data?.occupancyRate ?? 0).toFixed(1)}%`} />
        </FormField>

        <FormField label="Total Guest Nights" optional>
          <Input
            type="number"
            min={0}
            value={totalGuestNights}
            onChange={(e) => setTotalGuestNights(e.target.value)}
            disabled={isSaving}
          />
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
