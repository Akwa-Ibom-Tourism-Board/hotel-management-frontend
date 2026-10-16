import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Save, FileClock } from "lucide-react";
import { Button, FormField, Input, toast } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getGuestArrivals, updateGuestArrivals } from "../api";
import type { SectionStatus } from "../types";
import { StatusTag } from "./StatusTag";
import { SectionCardHeader, SectionIntro, FieldGrid, SectionActions, ErrorText } from "./SectionLayout.styles";

interface GuestArrivalsSectionProps {
  establishmentId: string;
  year: number;
  status: SectionStatus | undefined;
}

export const GuestArrivalsSection = ({ establishmentId, year, status }: GuestArrivalsSectionProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["guest-arrivals", establishmentId, year];

  const { data, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getGuestArrivals(establishmentId, year),
  });

  const [akwaIbomResidents, setAkwaIbomResidents] = useState("");
  const [otherNigerianStates, setOtherNigerianStates] = useState("");
  const [internationalGuests, setInternationalGuests] = useState("");
  const [mostStateOfArrival, setMostStateOfArrival] = useState("");
  const [mostCountryOfArrival, setMostCountryOfArrival] = useState("");
  const [savingStatus, setSavingStatus] = useState<SectionStatus | null>(null);

  useEffect(() => {
    setAkwaIbomResidents(data?.akwaIbomResidents != null ? String(data.akwaIbomResidents) : "");
    setOtherNigerianStates(data?.otherNigerianStates != null ? String(data.otherNigerianStates) : "");
    setInternationalGuests(data?.internationalGuests != null ? String(data.internationalGuests) : "");
    setMostStateOfArrival(data?.mostStateOfArrival ?? "");
    setMostCountryOfArrival(data?.mostCountryOfArrival ?? "");
  }, [data]);

  const handleSave = async (nextStatus: SectionStatus) => {
    setSavingStatus(nextStatus);
    try {
      await updateGuestArrivals(establishmentId, {
        reportingYear: year,
        status: nextStatus,
        akwaIbomResidents: akwaIbomResidents === "" ? null : Number(akwaIbomResidents),
        otherNigerianStates: otherNigerianStates === "" ? null : Number(otherNigerianStates),
        internationalGuests: internationalGuests === "" ? null : Number(internationalGuests),
        mostStateOfArrival: mostStateOfArrival.trim() === "" ? null : mostStateOfArrival.trim(),
        mostCountryOfArrival: mostCountryOfArrival.trim() === "" ? null : mostCountryOfArrival.trim(),
      });
      toast.success(nextStatus === "complete" ? "Guest arrival statistics marked as complete" : "Guest arrival statistics saved as draft");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["sections-summary", establishmentId] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save guest arrival statistics, please try again.");
    } finally {
      setSavingStatus(null);
    }
  };

  if (isLoading) return <PageLoader title="Loading guest arrival statistics..." />;
  if (isError) return <ErrorText>We could not load guest arrival statistics, please try again.</ErrorText>;

  const isSaving = savingStatus !== null;

  return (
    <div>
      <SectionCardHeader>
        <SectionIntro>Report where your guests travelled from in {year}.</SectionIntro>
        <StatusTag status={status} />
      </SectionCardHeader>

      <FieldGrid>
        <FormField label="Akwa Ibom Residents" optional>
          <Input
            type="number"
            min={0}
            value={akwaIbomResidents}
            onChange={(e) => setAkwaIbomResidents(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Other Nigerian States" optional>
          <Input
            type="number"
            min={0}
            value={otherNigerianStates}
            onChange={(e) => setOtherNigerianStates(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="International Guests" optional>
          <Input
            type="number"
            min={0}
            value={internationalGuests}
            onChange={(e) => setInternationalGuests(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Total Guests" hint="Calculated automatically from the fields above.">
          <Input type="text" readOnly value={(data?.totalGuests ?? 0).toLocaleString()} />
        </FormField>

        <FormField label="Most State of Arrival" optional>
          <Input
            placeholder="e.g. Lagos"
            value={mostStateOfArrival}
            onChange={(e) => setMostStateOfArrival(e.target.value)}
            disabled={isSaving}
          />
        </FormField>

        <FormField label="Most Country of Arrival" optional>
          <Input
            placeholder="e.g. Nigeria"
            value={mostCountryOfArrival}
            onChange={(e) => setMostCountryOfArrival(e.target.value)}
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
