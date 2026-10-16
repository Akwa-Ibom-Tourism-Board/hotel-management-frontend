import { useFormContext } from "react-hook-form";
import { Input, Select, Checkbox, FormField } from "@/shared/ui";
import { localGovernments, entityTypeOptions, type EntityTypeValue } from "@/shared/content";
import { getFieldError } from "../lib/fieldPath";
import { EntityTypeFields } from "./EntityTypeFields";
import { BranchFieldArray } from "./BranchFieldArray";
import { Grid, WideField, CheckboxRow, SectionDivider, SectionTitle } from "./EstablishmentForm.styles";

interface EstablishmentFieldsGroupProps {
  entityType: EntityTypeValue;
  namePrefix?: string;
  showEntityTypeSelect?: boolean;
}

// The full set of establishment fields (everything but the <form> wrapper
// and submit button), path-aware via `namePrefix` so it can be used both
// standalone (single add/edit) and nested inside a bulk-add array item.
export const EstablishmentFieldsGroup = ({ entityType, namePrefix = "", showEntityTypeSelect = true }: EstablishmentFieldsGroupProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const path = (name: string) => `${namePrefix}${name}`;
  const hasWebsite = watch(path("hasWebsite"));

  return (
    <>
      <Grid>
        {showEntityTypeSelect && (
          <FormField label="Establishment Type" required error={getFieldError(errors, path("entityType"))}>
            <Select {...register(path("entityType"))}>
              {entityTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormField>
        )}

        <WideField>
          <FormField
            label="Business Name"
            required
            hint="Type the full name; avoid abbreviations, for example write International instead of Intl."
            error={getFieldError(errors, path("businessName"))}
          >
            <Input {...register(path("businessName"))} />
          </FormField>
        </WideField>

        <WideField>
          <FormField label="Address" required error={getFieldError(errors, path("address"))}>
            <Input {...register(path("address"))} />
          </FormField>
        </WideField>

        <FormField label="Local Government" required error={getFieldError(errors, path("localGovernment"))}>
          <Select {...register(path("localGovernment"))} defaultValue="">
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

        <FormField label="Year Established" required error={getFieldError(errors, path("yearEstablished"))}>
          <Input type="number" {...register(path("yearEstablished"))} />
        </FormField>

        <FormField label="Business Phone Number" required error={getFieldError(errors, path("businessPhoneNumber"))}>
          <Input type="tel" {...register(path("businessPhoneNumber"))} />
        </FormField>
        <FormField label="Business Email" required error={getFieldError(errors, path("businessEmail"))}>
          <Input type="email" {...register(path("businessEmail"))} />
        </FormField>

        <FormField label="Contact Name" required error={getFieldError(errors, path("contactName"))}>
          <Input {...register(path("contactName"))} />
        </FormField>
        <FormField label="Contact Phone Number" required error={getFieldError(errors, path("contactPhoneNumber"))}>
          <Input type="tel" {...register(path("contactPhoneNumber"))} />
        </FormField>
        <FormField label="Contact Email" required error={getFieldError(errors, path("contactEmail"))}>
          <Input type="email" {...register(path("contactEmail"))} />
        </FormField>

        <WideField>
          <CheckboxRow>
            <Checkbox label="This establishment has a website" {...register(path("hasWebsite"))} />
          </CheckboxRow>
        </WideField>

        {hasWebsite && (
          <WideField>
            <FormField label="Website" required error={getFieldError(errors, path("website"))}>
              <Input type="url" placeholder="https://" {...register(path("website"))} />
            </FormField>
          </WideField>
        )}
      </Grid>

      <SectionDivider />
      <SectionTitle>Type-Specific Details</SectionTitle>
      <EntityTypeFields entityType={entityType} namePrefix={namePrefix} />

      <SectionDivider />
      <BranchFieldArray namePrefix={namePrefix} />
    </>
  );
};
