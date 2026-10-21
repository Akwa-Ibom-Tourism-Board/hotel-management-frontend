import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import { DashboardShell, PageLoader } from "@/shared/components";
import { Card, CardContent, Button, toast } from "@/shared/ui";
import { EstablishmentSearchInput } from "../components/EstablishmentSearchInput";
import { EstablishmentForm } from "../components/EstablishmentForm";
import {
  getEstablishment,
  createEstablishment,
  claimEstablishment,
  createDraftEstablishment,
  updateDraftEstablishment,
  submitDraftEstablishment,
} from "../api";
import { toFormDefaults } from "../lib/toFormDefaults";
import type { EstablishmentSearchResult } from "../api/types";
import type { EstablishmentFormSchema } from "../schemas/establishment.schema";

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.25rem;
`;

const DraftBanner = styled.div`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.8125rem;
  margin-bottom: 1.25rem;
`;

const ExistsBanner = styled.div`
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.12)};
  border: 1.5px solid ${({ theme }) => theme.colors.destructive.DEFAULT};
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
`;

type Mode = "search" | "claim" | "create";

export const AddEstablishmentPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("search");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<EstablishmentSearchResult | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);

  const { data: fullRecord, isLoading: isLoadingRecord } = useQuery({
    queryKey: ["establishment", selected?.id],
    queryFn: () => getEstablishment(selected!.id),
    enabled: mode === "claim" && Boolean(selected),
  });

  const handleSelect = (result: EstablishmentSearchResult) => {
    setSelected(result);
    setMode("claim");
  };

  const backToSearch = () => {
    setMode("search");
    setSelected(null);
    setDraftId(null);
  };

  const handleSaveDraft = async (values: Partial<EstablishmentFormSchema>) => {
    try {
      if (draftId) {
        await updateDraftEstablishment(draftId, values);
        toast.success("Draft updated");
      } else {
        const draft = await createDraftEstablishment(values);
        setDraftId(draft.id);
        toast.success("Draft saved; find it any time under Establishments with a Draft status");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this draft, please try again.");
    }
  };

  const handleSubmit = async (values: EstablishmentFormSchema) => {
    try {
      if (mode === "claim" && selected) {
        await claimEstablishment(selected.id, values);
        toast.success("Establishment confirmed and added to your profile");
      } else if (draftId) {
        await submitDraftEstablishment(draftId, values);
        toast.success("Establishment submitted for review");
      } else {
        await createEstablishment(values);
        toast.success("Establishment registered");
      }
      navigate("/dashboard/establishments");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this establishment, please try again.");
    }
  };

  return (
    <DashboardShell title="Add Establishment">
      <Card style={mode === "search" ? { maxWidth: "32rem", margin: "0 auto" } : undefined}>
        <CardContent>
          {mode === "search" ? (
            <BackLink type="button" onClick={() => navigate("/dashboard/establishments")}>
              <ArrowLeft size={15} /> Back to Establishments
            </BackLink>
          ) : (
            <BackLink type="button" onClick={backToSearch}>
              <ArrowLeft size={15} /> Back to search
            </BackLink>
          )}

          {mode === "search" && (
            <>
              <EstablishmentSearchInput value={query} onChange={setQuery} onSelect={handleSelect} />
              {query.trim().length > 0 && (
                <>
                  <Divider>or</Divider>
                  <Button type="button" variant="outline" fullWidth onClick={() => setMode("create")}>
                    Register as a New Establishment
                  </Button>
                </>
              )}
            </>
          )}

          {mode === "claim" && isLoadingRecord && <PageLoader title="Loading establishment details..." />}

          {mode === "claim" && fullRecord && (
            <>
              <ExistsBanner>This establishment exists, kindly confirm the information below is correct</ExistsBanner>
              <EstablishmentForm defaultValues={toFormDefaults(fullRecord)} onSubmit={handleSubmit} submitLabel="Confirm" />
            </>
          )}

          {mode === "create" && (
            <>
              {draftId && <DraftBanner>You are continuing a saved draft; save again anytime or submit when ready.</DraftBanner>}
              <EstablishmentForm
                defaultValues={{ businessName: query }}
                onSubmit={handleSubmit}
                submitLabel="Submit for Review"
                onSaveDraft={handleSaveDraft}
              />
            </>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
};
