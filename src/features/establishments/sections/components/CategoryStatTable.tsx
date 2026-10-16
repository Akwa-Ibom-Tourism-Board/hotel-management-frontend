import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Select } from "@/shared/ui";
import type { CategoryFieldSpec, CategoryOptionSpec, CategoryTableRow } from "../types";

// Same horizontally-scrollable wrapper + fade-edge affordance EstablishmentsTable
// uses, so a category table with several numeric columns behaves the same way
// on narrow screens instead of collapsing into cards.
const OuterWrap = styled.div`
  position: relative;
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
`;

const ScrollFade = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 2.5rem;
  border-radius: 0 ${({ theme }) => theme.radii.xl} ${({ theme }) => theme.radii.xl} 0;
  background: linear-gradient(to right, transparent, ${({ theme }) => theme.alpha(theme.colors.foreground, 0.14)});
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  pointer-events: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 36rem;
`;

const Thead = styled.thead`
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.muted.foreground};
  white-space: nowrap;
`;

const Row = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Td = styled.td`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  vertical-align: middle;
`;

const CategoryCell = styled(Td)`
  font-weight: 600;
  min-width: 11rem;
`;

const NumberCell = styled(Td)`
  min-width: 8rem;
`;

const TotalCell = styled(Td)`
  min-width: 8rem;
  font-weight: 600;
`;

const RemoveCell = styled(Td)`
  width: 2.5rem;
`;

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  }
`;

const TotalsRow = styled.tr`
  border-top: 1.5px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const TotalsLabel = styled(Td)`
  font-weight: 700;
`;

const TotalsValue = styled(Td)`
  font-weight: 700;
`;

const EmptyRow = styled.tr``;

const EmptyCell = styled.td`
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const AddRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
`;

const AddSelectWrap = styled.div`
  min-width: 13rem;
  flex: 1 1 13rem;
`;

const OTHER_OPTION: CategoryOptionSpec = { value: "other", label: "Other" };

interface CategoryStatTableProps {
  categoryColumnLabel: string;
  predefinedOptions: readonly CategoryOptionSpec[];
  fields: CategoryFieldSpec[];
  rows: CategoryTableRow[];
  onChange: (rows: CategoryTableRow[]) => void;
  totals: Record<string, number>;
  showRowTotal?: boolean;
  disabled?: boolean;
}

export const CategoryStatTable = ({
  categoryColumnLabel,
  predefinedOptions,
  fields,
  rows,
  onChange,
  totals,
  showRowTotal = false,
  disabled = false,
}: CategoryStatTableProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);
  const [pendingCategory, setPendingCategory] = useState("");

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const updateFade = () => {
      setShowFade(el.scrollWidth - el.clientWidth - el.scrollLeft > 4);
    };

    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [rows]);

  // "Other" can be added more than once (each gets its own free-typed
  // label), so it always stays in the list; predefined categories drop out
  // once they have a row.
  const usedCategories = new Set(rows.map((row) => row.category));
  const availableOptions = [...predefinedOptions.filter((option) => !usedCategories.has(option.value)), OTHER_OPTION];

  const handleAdd = () => {
    if (!pendingCategory) return;
    const option = availableOptions.find((opt) => opt.value === pendingCategory);
    const emptyValues = fields.reduce<Record<string, number | null>>((acc, field) => {
      acc[field.key] = null;
      return acc;
    }, {});

    onChange([
      ...rows,
      {
        rowKey: `new-${crypto.randomUUID()}`,
        category: pendingCategory,
        categoryLabel: pendingCategory === "other" ? "" : option?.label ?? pendingCategory,
        values: emptyValues,
      },
    ]);
    setPendingCategory("");
  };

  const handleRemove = (rowKey: string) => {
    onChange(rows.filter((row) => row.rowKey !== rowKey));
  };

  const handleLabelChange = (rowKey: string, label: string) => {
    onChange(rows.map((row) => (row.rowKey === rowKey ? { ...row, categoryLabel: label } : row)));
  };

  const handleValueChange = (rowKey: string, fieldKey: string, raw: string) => {
    const parsed = raw === "" ? null : Number(raw);
    onChange(
      rows.map((row) => (row.rowKey === rowKey ? { ...row, values: { ...row.values, [fieldKey]: parsed } } : row)),
    );
  };

  const rowTotal = (row: CategoryTableRow) =>
    fields.reduce((sum, field) => sum + (row.values[field.key] ?? 0), 0);

  const totalsRowTotal = fields.reduce((sum, field) => sum + (totals[field.key] ?? 0), 0);

  return (
    <div>
      <OuterWrap>
        <TableWrap ref={scrollRef}>
          <Table>
            <Thead>
              <tr>
                <Th>{categoryColumnLabel}</Th>
                {fields.map((field) => (
                  <Th key={field.key}>{field.label}</Th>
                ))}
                {showRowTotal && <Th>Total</Th>}
                <Th aria-hidden />
              </tr>
            </Thead>
            <tbody>
              {rows.length === 0 && (
                <EmptyRow>
                  <EmptyCell colSpan={fields.length + (showRowTotal ? 1 : 0) + 2}>
                    No categories added yet; use "Add category" below to get started.
                  </EmptyCell>
                </EmptyRow>
              )}

              {rows.map((row) => (
                <Row key={row.rowKey}>
                  <CategoryCell>
                    {row.category === "other" ? (
                      <Input
                        placeholder="Enter category name"
                        value={row.categoryLabel}
                        onChange={(e) => handleLabelChange(row.rowKey, e.target.value)}
                        disabled={disabled}
                      />
                    ) : (
                      row.categoryLabel
                    )}
                  </CategoryCell>
                  {fields.map((field) => (
                    <NumberCell key={field.key}>
                      <Input
                        type="number"
                        min={0}
                        value={row.values[field.key] ?? ""}
                        onChange={(e) => handleValueChange(row.rowKey, field.key, e.target.value)}
                        disabled={disabled}
                      />
                    </NumberCell>
                  ))}
                  {showRowTotal && <TotalCell>{rowTotal(row)}</TotalCell>}
                  <RemoveCell>
                    <RemoveButton
                      type="button"
                      onClick={() => handleRemove(row.rowKey)}
                      aria-label={`Remove ${row.categoryLabel || "category"}`}
                      disabled={disabled}
                    >
                      <Trash2 size={15} />
                    </RemoveButton>
                  </RemoveCell>
                </Row>
              ))}

              <TotalsRow>
                <TotalsLabel>Totals</TotalsLabel>
                {fields.map((field) => (
                  <TotalsValue key={field.key}>{totals[field.key] ?? 0}</TotalsValue>
                ))}
                {showRowTotal && <TotalsValue>{totalsRowTotal}</TotalsValue>}
                <Td aria-hidden />
              </TotalsRow>
            </tbody>
          </Table>
        </TableWrap>
        <ScrollFade $visible={showFade} />
      </OuterWrap>

      <AddRow>
        <AddSelectWrap>
          <Select
            value={pendingCategory}
            onChange={(e) => setPendingCategory(e.target.value)}
            disabled={disabled || availableOptions.length === 0}
          >
            <option value="" disabled>
              Select category to add
            </option>
            {availableOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </AddSelectWrap>
        <Button type="button" variant="outline" size="sm" onClick={handleAdd} disabled={disabled || !pendingCategory}>
          <Plus size={15} /> Add Category
        </Button>
      </AddRow>
    </div>
  );
};
