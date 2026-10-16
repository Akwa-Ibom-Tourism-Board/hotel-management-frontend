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
import { SectionsPanel } from "../sections/components/SectionsPanel";
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
  const isDisabled = Boolean(establishment?.isDisabled);
  const ownerFullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();

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

          {isDisabled && (
            <DisabledBanner>
              <DisabledBannerTitle>
                <Ban size={17} /> This establishment has been deactivated by the Commission
              </DisabledBannerTitle>
              {establishment.disabledReason && <DisabledBannerText>Reason: {establishment.disabledReason}</DisabledBannerText>}
              <DisabledBannerText>
                The details below are read-only while deactivated. Please contact the Commission by phone or in person to
                resolve this and have it reactivated.
              </DisabledBannerText>
            </DisabledBanner>
          )}

          {/* Owner info: a self-service owner is the account that owns this
              establishment, so this is a read-only reflection of the logged-in
              account rather than an editable field on the establishment. */}
          <Card style={{ maxWidth: "42rem", marginBottom: "1rem" }}>
            <CardHeader>
              <CardTitle>Owner</CardTitle>
              <CardDescription>You are the registered owner of this establishment.</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField label="Full Name">
                <Input value={ownerFullName} readOnly />
              </FormField>
              <FormField label="Email">
                <Input value={user?.email ?? ""} readOnly />
              </FormField>
            </CardContent>
          </Card>

          <Card style={{ maxWidth: "42rem" }}>
            <CardContent>
              <EstablishmentForm
                defaultValues={toFormDefaults(establishment)}
                onSubmit={handleSubmit}
                submitLabel={isDraft ? "Submit for Review" : "Save Changes"}
                onSaveDraft={isDraft && !isDisabled ? handleSaveDraft : undefined}
                readOnly={isDisabled}
              />
            </CardContent>
          </Card>

          <SectionsPanel establishmentId={establishment.id} entityType={establishment.entityType} />
        </>
      )}
    </DashboardShell>
  );
};
