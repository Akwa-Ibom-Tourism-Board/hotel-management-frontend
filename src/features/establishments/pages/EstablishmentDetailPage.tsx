import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Ban } from "lucide-react";
import { DashboardShell, PageLoader } from "@/shared/components";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, FormField, Input, toast } from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { getEstablishment, updateEstablishment, updateDraftEstablishment, submitDraftEstablishment } from "../api";
import { toFormDefaults } from "../lib/toFormDefaults";
import { EstablishmentForm } from "../components/EstablishmentForm";
import { StatusBadge } from "../components/StatusBadge";
import type { EstablishmentFormSchema } from "../schemas/establishment.schema";
import {
  BackLink,
  HeaderCard,
  BusinessName,
  BusinessId,
  RejectionNote,
  DisabledBanner,
  DisabledBannerTitle,
  DisabledBannerText,
  ErrorText,
} from "./EstablishmentDetailPage.styles";

export const EstablishmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: establishment,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["establishment", id],
    queryFn: () => getEstablishment(id as string),
    enabled: Boolean(id),
  });

  const isDraft = establishment?.registrationStatus === "Draft";

  const handleSubmit = async (values: EstablishmentFormSchema) => {
    if (!id) return;
    try {
      if (isDraft) {
        await submitDraftEstablishment(id, values);
        toast.success("Submitted for review");
      } else {
        await updateEstablishment(id, values);
        toast.success("Establishment updated");
      }
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update this establishment, please try again.");
    }
  };

  const handleSaveDraft = async (values: Partial<EstablishmentFormSchema>) => {
    if (!id) return;
    try {
      await updateDraftEstablishment(id, values);
      toast.success("Draft updated");
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this draft, please try again.");
    }
  };

  return (
    <DashboardShell title="Establishment Details">
      <BackLink type="button" onClick={() => navigate("/dashboard/establishments")}>
        <ArrowLeft size={15} /> Back to Establishments
      </BackLink>

      {isLoading && <PageLoader title="Loading establishment..." />}
      {isError && <ErrorText>We could not load this establishment, please go back and try again.</ErrorText>}

      {establishment && (
        <>
          <HeaderCard>
            <div>
              <BusinessName>{establishment.businessName}</BusinessName>
              {establishment.uniqueBusinessId && <BusinessId>{establishment.uniqueBusinessId}</BusinessId>}
            </div>
            <StatusBadge status={establishment.registrationStatus} />
          </HeaderCard>

          {establishment.registrationStatus === "Rejected" && establishment.rejectionReason && (
            <RejectionNote>Rejection reason: {establishment.rejectionReason}</RejectionNote>
          )}

          <Card style={{ maxWidth: "42rem" }}>
            <CardContent>
              <EstablishmentForm
                defaultValues={toFormDefaults(establishment)}
                onSubmit={handleSubmit}
                submitLabel={isDraft ? "Submit for Review" : "Save Changes"}
                onSaveDraft={isDraft ? handleSaveDraft : undefined}
              />
            </CardContent>
          </Card>
        </>
      )}
    </DashboardShell>
  );
};
