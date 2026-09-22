import styled from "styled-components";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Select, FormField } from "@/shared/ui";
import { localGovernments } from "@/shared/content";
import { getFieldError } from "../lib/fieldPath";

const Wrap = styled.div`
  margin-top: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const Title = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

const EmptyText = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 1rem;
`;

const BranchCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const BranchCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.75rem;
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

const emptyBranch = {
  businessName: "",
  address: "",
  localGovernment: "",
  businessPhoneNumber: "",
  contactName: "",
  contactPhoneNumber: "",
  contactEmail: "",
};

interface BranchFieldArrayProps {
  namePrefix?: string;
}

export const BranchFieldArray = ({ namePrefix = "" }: BranchFieldArrayProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const branchesName = `${namePrefix}branches`;
  const { fields, append, remove } = useFieldArray({ control, name: branchesName });

  return (
    <Wrap>
      <Header>
        <Title>Branches</Title>
        <Button type="button" variant="outline" size="sm" onClick={() => append(emptyBranch)}>
          <Plus size={15} /> Add Branch
        </Button>
      </Header>

      {fields.length === 0 && (
        <EmptyText>
          No branches added yet; if this establishment operates in more than one location, add each branch here.
        </EmptyText>
      )}

      {fields.map((field, index) => {
        const branchPath = (name: string) => `${branchesName}.${index}.${name}`;
        return (
          <BranchCard key={field.id}>
            <BranchCardHeader>
              <span>Branch {index + 1}</span>
              <RemoveButton type="button" onClick={() => remove(index)} aria-label="Remove branch">
                <Trash2 size={15} />
              </RemoveButton>
            </BranchCardHeader>

            <FormField label="Branch Name" optional hint="Type the full name; avoid abbreviations, for example write International instead of Intl.">
              <Input {...register(branchPath("businessName"))} />
            </FormField>

            <FormField label="Address" required error={getFieldError(errors, branchPath("address"))}>
              <Input {...register(branchPath("address"))} />
            </FormField>

            <FormField label="Local Government" required error={getFieldError(errors, branchPath("localGovernment"))}>
              <Select {...register(branchPath("localGovernment"))} defaultValue="">
                <option value="" disabled>
                  Select local government
                </option>
                {localGovernments.map((lg) => (
                  <option key={lg} value={lg}>
                    {lg}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Branch Phone Number" required error={getFieldError(errors, branchPath("businessPhoneNumber"))}>
              <Input type="tel" {...register(branchPath("businessPhoneNumber"))} />
            </FormField>

            <FormField label="Contact Name" required error={getFieldError(errors, branchPath("contactName"))}>
              <Input {...register(branchPath("contactName"))} />
            </FormField>

            <FormField label="Contact Phone Number" required error={getFieldError(errors, branchPath("contactPhoneNumber"))}>
              <Input type="tel" {...register(branchPath("contactPhoneNumber"))} />
            </FormField>

            <FormField label="Contact Email" required error={getFieldError(errors, branchPath("contactEmail"))}>
              <Input type="email" {...register(branchPath("contactEmail"))} />
            </FormField>
          </BranchCard>
        );
      })}
    </Wrap>
  );
};
