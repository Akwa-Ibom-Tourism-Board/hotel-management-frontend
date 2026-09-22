import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, FileClock } from "lucide-react";
import styled from "styled-components";
import { Button, toast } from "@/shared/ui";
import { HOTEL_LIKE_TYPES, DINING_LIKE_TYPES, type EntityTypeValue } from "@/shared/content";
import { establishmentSchema, type EstablishmentFormSchema } from "../schemas/establishment.schema";
import { EstablishmentFieldsGroup } from "./EstablishmentFieldsGroup";

const DEFAULT_VALUES: EstablishmentFormSchema = {
  entityType: "hotel",
  businessName: "",
  address: "",
  localGovernment: "",
  hasWebsite: false,
  website: "",
  yearEstablished: new Date().getFullYear(),
  contactName: "",
  contactPhoneNumber: "",
  contactEmail: "",
  businessEmail: "",
  businessPhoneNumber: "",
  roomCount: undefined,
  bedSpaces: undefined,
  facilities: [],
  seatingCapacity: undefined,
  serviceTypes: [],
  branches: [],
};

const Actions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const DraftHint = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.5rem 0 0;
`;

interface EstablishmentFormProps {
  defaultValues?: Partial<EstablishmentFormSchema>;
  lockedEntityType?: EntityTypeValue;
  onSubmit: (values: EstablishmentFormSchema) => Promise<void> | void;
  submitLabel?: string;
  onSaveDraft?: (values: Partial<EstablishmentFormSchema>) => Promise<void> | void;
  draftLabel?: string;
}

export const EstablishmentForm = ({
  defaultValues,
  lockedEntityType,
  onSubmit,
  submitLabel = "Save Establishment",
  onSaveDraft,
  draftLabel = "Save as Draft",
}: EstablishmentFormProps) => {
  const methods = useForm<EstablishmentFormSchema>({
    resolver: zodResolver(establishmentSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
      ...(lockedEntityType ? { entityType: lockedEntityType } : {}),
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const entityType = watch("entityType");

  // Switching entity type unmounts the other type's fields (room count,
  // seating capacity, ...); without clearing them, a stale leftover value
  // can still fail validation for a field the user can no longer see or fix.
  useEffect(() => {
    if (HOTEL_LIKE_TYPES.includes(entityType)) {
      setValue("seatingCapacity", undefined);
      setValue("serviceTypes", []);
    } else if (DINING_LIKE_TYPES.includes(entityType)) {
      setValue("roomCount", undefined);
      setValue("bedSpaces", undefined);
      setValue("facilities", []);
    } else {
      setValue("roomCount", undefined);
      setValue("bedSpaces", undefined);
      setValue("facilities", []);
      setValue("seatingCapacity", undefined);
      setValue("serviceTypes", []);
    }
  }, [entityType, setValue]);

  const handleSaveDraft = async () => {
    if (!onSaveDraft) return;
    const values = getValues();
    if (!values.businessName?.trim()) {
      toast.error("Enter at least a business name before saving a draft");
      return;
    }
    setIsSavingDraft(true);
    try {
      await onSaveDraft(values);
    } finally {
      setIsSavingDraft(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EstablishmentFieldsGroup entityType={entityType} showEntityTypeSelect={!lockedEntityType} />

        <Actions>
          {onSaveDraft && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={isSubmitting || isSavingDraft}
              onClick={handleSaveDraft}
              fullWidth
            >
              <FileClock size={17} />
              {isSavingDraft ? "Saving Draft..." : draftLabel}
            </Button>
          )}
          <Button type="submit" size="lg" disabled={isSubmitting || isSavingDraft} fullWidth>
            <Save size={17} />
            {isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        </Actions>

        {onSaveDraft && (
          <DraftHint>Saving as a draft keeps whatever you have filled in; you can come back and finish it later.</DraftHint>
        )}
      </form>
    </FormProvider>
  );
};
