import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/shared/components";
import { Card, CardContent, toast } from "@/shared/ui";
import { BulkAddForm } from "../components/BulkAddForm";
import { bulkCreateEstablishments, bulkSaveDraftEstablishments } from "../api";
import type { BulkAddFormSchema } from "../schemas/establishment.schema";

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

export const BulkAddEstablishmentsPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: BulkAddFormSchema) => {
    try {
      const created = await bulkCreateEstablishments(values);
      toast.success(`${created.length} establishment${created.length === 1 ? "" : "s"} submitted for review`);
      navigate("/dashboard/establishments");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit this batch, please try again.");
    }
  };

  const handleSaveDraft = async (values: BulkAddFormSchema) => {
    try {
      const saved = await bulkSaveDraftEstablishments(values);
      toast.success(`${saved.length} establishment${saved.length === 1 ? "" : "s"} saved as drafts`);
      navigate("/dashboard/establishments");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this batch as a draft, please try again.");
    }
  };

  return (
    <DashboardShell title="Bulk Add Establishments">
      <Card style={{ maxWidth: "44rem" }}>
        <CardContent>
          <BackLink type="button" onClick={() => navigate("/dashboard/establishments")}>
            <ArrowLeft size={15} /> Back to Establishments
          </BackLink>
          <BulkAddForm onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
};
