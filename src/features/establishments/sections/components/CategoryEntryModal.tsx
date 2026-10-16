import { useEffect, useState } from "react";
import styled from "styled-components";
import { Trash2 } from "lucide-react";
import { Button, Dialog, DialogContent, DialogTitle, DialogDescription, Input, Select, FormField } from "@/shared/ui";
import type { CategoryFieldSpec, CategoryOptionSpec, CategoryTableRow } from "../types";

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  align-self: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem;
  margin-top: 0.25rem;
`;

const OTHER_OPTION: CategoryOptionSpec = { value: "other", label: "Other" };

interface CategoryEntryModalProps {
  open: boolean;
  onClose: () => void;
  categoryColumnLabel: string;
  predefinedOptions: readonly CategoryOptionSpec[];
  usedCategories: Set<string>;
  fields: CategoryFieldSpec[];
  row: CategoryTableRow | null;
  onSave: (row: CategoryTableRow) => void;
  onDelete?: (rowKey: string) => void;
}

export const CategoryEntryModal = ({
  open,
  onClose,
  categoryColumnLabel,
  predefinedOptions,
  usedCategories,
  fields,
  row,
  onSave,
  onDelete,
}: CategoryEntryModalProps) => {
  const isEditing = Boolean(row);
  const [category, setCategory] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [values, setValues] = useState<Record<string, number | null>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    if (row) {
      setCategory(row.category);
      setCategoryLabel(row.categoryLabel);
      setValues(row.values);
    } else {
      setCategory("");
      setCategoryLabel("");
      setValues(fields.reduce<Record<string, number | null>>((acc, field) => ({ ...acc, [field.key]: null }), {}));
    }
    setError("");
  }, [open, row, fields]);

  if (!open) return null;

  const availableOptions = [...predefinedOptions.filter((option) => !usedCategories.has(option.value)), OTHER_OPTION];
  const selectedOption = predefinedOptions.find((option) => option.value === category);

  const handleSave = () => {
    if (!category) {
      setError(`Choose a ${categoryColumnLabel.toLowerCase()}`);
      return;
    }
    if (category === "other" && !categoryLabel.trim()) {
      setError("Enter a name for this category");
      return;
    }

    onSave({
      rowKey: row?.rowKey ?? `new-${crypto.randomUUID()}`,
      category,
      categoryLabel: category === "other" ? categoryLabel.trim() : (selectedOption?.label ?? categoryLabel),
      values,
    });
    onClose();
  };

  const handleDelete = () => {
    if (row) onDelete?.(row.rowKey);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogDescription>Fill in the details below and save.</DialogDescription>

        <Form>
          {isEditing ? (
            category === "other" ? (
              <FormField label={categoryColumnLabel} required>
                <Input
                  placeholder="Enter category name"
                  value={categoryLabel}
                  onChange={(e) => setCategoryLabel(e.target.value)}
                />
              </FormField>
            ) : (
              <FormField label={categoryColumnLabel}>
                <Input value={categoryLabel} readOnly />
              </FormField>
            )
          ) : (
            <FormField label={categoryColumnLabel} required>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>
                  Select {categoryColumnLabel.toLowerCase()}
                </option>
                {availableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>
          )}

          {!isEditing && category === "other" && (
            <FormField label="Category Name" required>
              <Input
                placeholder="Enter category name"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
              />
            </FormField>
          )}

          {fields.map((field) => (
            <FormField key={field.key} label={field.label}>
              <Input
                type="number"
                min={0}
                value={values[field.key] ?? ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.key]: e.target.value === "" ? null : Number(e.target.value) }))
                }
              />
            </FormField>
          ))}

          {error && <p style={{ color: "#EF4444", fontSize: "0.8125rem", margin: "-0.5rem 0 0.75rem" }}>{error}</p>}

          <Actions>
            <Button type="button" variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" fullWidth onClick={handleSave}>
              Save
            </Button>
          </Actions>

          {isEditing && onDelete && (
            <DeleteButton type="button" onClick={handleDelete}>
              <Trash2 size={14} /> Remove this category
            </DeleteButton>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
