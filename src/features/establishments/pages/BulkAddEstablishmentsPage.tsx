import { useNavigate } from "react-router-dom";
import { DashboardShell } from "@/shared/components";
import { Card, CardContent, toast } from "@/shared/ui";
import { BulkAddForm } from "../components/BulkAddForm";
import { bulkCreateEstablishments, bulkSaveDraftEstablishments } from "../api";
import type { BulkAddFormSchema } from "../schemas/establishment.schema";

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
          <BulkAddForm onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
        </CardContent>
      </Card>
    </DashboardShell>
  );
};
