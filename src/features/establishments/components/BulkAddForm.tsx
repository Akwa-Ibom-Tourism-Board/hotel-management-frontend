import { useState } from "react";
import { useForm, FormProvider, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Plus, Trash2, Save, FileClock } from "lucide-react";
import styled from "styled-components";
import { Select, Button, FormField, toast } from "@/shared/ui";
import { entityTypeOptions, type EntityTypeValue } from "@/shared/content";
import { bulkAddSchema, type BulkAddFormSchema } from "../schemas/establishment.schema";
import { EstablishmentFieldsGroup } from "./EstablishmentFieldsGroup";
import {
  LockedTypeBanner,
  LockedTypeText,
  ItemCard,
  ItemHeader,
  ItemHeaderLeft,
  ItemNumber,
  ItemTitle,
  ItemHeaderActions,
  RemoveItemButton,
  ItemBody,
  AddItemButton,
} from "./BulkAddForm.styles";

const blankEstablishment = (entityType: EntityTypeValue) => ({
  entityType,
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
});

const ItemTitleWatcher = ({ index }: { index: number }) => {
  const businessName = useWatch({ name: `establishments.${index}.businessName` });
  return <ItemTitle>{businessName || `Establishment ${index + 1}`}</ItemTitle>;
};

const Actions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const DraftHint = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.5rem 0 0;
`;

interface BulkAddFormProps {
  onSubmit: (values: BulkAddFormSchema) => Promise<void> | void;
  onSaveDraft?: (values: BulkAddFormSchema) => Promise<void> | void;
}

export const BulkAddForm = ({ onSubmit, onSaveDraft }: BulkAddFormProps) => {
  const [lockedType, setLockedType] = useState<EntityTypeValue | null>(null);
  const [pendingType, setPendingType] = useState<EntityTypeValue>("hotel");
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const methods = useForm<BulkAddFormSchema>({
    resolver: zodResolver(bulkAddSchema),
    defaultValues: { entityType: pendingType, establishments: [] },
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: "establishments" });

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleLockType = () => {
    setLockedType(pendingType);
    methods.setValue("entityType", pendingType);
    append(blankEstablishment(pendingType));
    setExpanded(new Set([0]));
  };

  const handleSaveDraft = async () => {
    if (!onSaveDraft) return;
    const values = getValues();
    if (values.establishments.some((item) => !item.businessName?.trim())) {
      toast.error("Give every establishment in this batch at least a business name before saving as a draft");
      return;
    }
    setIsSavingDraft(true);
    try {
      await onSaveDraft(values);
    } finally {
      setIsSavingDraft(false);
    }
  };

  if (!lockedType) {
    const entityLabel = entityTypeOptions.find((opt) => opt.value === pendingType)?.label ?? pendingType;
    return (
      <div>
        <FormField label="Establishment Type for This Batch" required>
          <Select value={pendingType} onChange={(e) => setPendingType(e.target.value as EntityTypeValue)}>
            {entityTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </FormField>
        <p style={{ fontSize: "0.8125rem", marginBottom: "1.5rem" }}>
          Every establishment added in this batch will be registered as a <strong>{entityLabel}</strong>. To add a
          different type, submit this batch first, then start a new bulk add.
        </p>
        <Button type="button" onClick={handleLockType} fullWidth>
          Continue with {entityLabel}
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LockedTypeBanner>
          <LockedTypeText>
            Adding <strong>{entityTypeOptions.find((opt) => opt.value === lockedType)?.label}</strong> establishments
          </LockedTypeText>
        </LockedTypeBanner>

        {fields.map((field, index) => {
          const isOpen = expanded.has(index);
          return (
            <ItemCard key={field.id}>
              <ItemHeader
                role="button"
                tabIndex={0}
                onClick={() => toggleExpanded(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpanded(index);
                  }
                }}
              >
                <ItemHeaderLeft>
                  <ItemNumber>{index + 1}</ItemNumber>
                  <ItemTitleWatcher index={index} />
                </ItemHeaderLeft>
                <ItemHeaderActions>
                  {fields.length > 1 && (
                    <RemoveItemButton
                      type="button"
                      aria-label="Remove establishment"
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(index);
                      }}
                    >
                      <Trash2 size={15} />
                    </RemoveItemButton>
                  )}
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </ItemHeaderActions>
              </ItemHeader>

              {isOpen && (
                <ItemBody>
                  <EstablishmentFieldsGroup entityType={lockedType} namePrefix={`establishments.${index}.`} showEntityTypeSelect={false} />
                </ItemBody>
              )}
            </ItemCard>
          );
        })}

        <AddItemButton
          type="button"
          onClick={() => {
            append(blankEstablishment(lockedType));
            setExpanded(new Set([fields.length]));
          }}
        >
          <Plus size={16} /> Add Another Establishment
        </AddItemButton>

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
              {isSavingDraft ? "Saving Batch as Draft..." : "Save Batch as Draft"}
            </Button>
          )}
          <Button type="submit" size="lg" disabled={isSubmitting || isSavingDraft} fullWidth>
            <Save size={17} />
            {isSubmitting ? "Submitting Batch..." : `Submit ${fields.length} Establishment${fields.length === 1 ? "" : "s"} for Review`}
          </Button>
        </Actions>

        {onSaveDraft && (
          <DraftHint>
            Saving as drafts creates each establishment with a Draft status; you can find and finish them individually
            later from the Establishments list.
          </DraftHint>
        )}
      </form>
    </FormProvider>
  );
};
