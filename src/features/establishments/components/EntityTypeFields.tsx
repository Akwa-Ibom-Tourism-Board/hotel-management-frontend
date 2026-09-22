import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { FormField, Input, Checkbox } from "@/shared/ui";
import { HOTEL_LIKE_TYPES, DINING_LIKE_TYPES, hotelFacilityOptions, diningServiceTypeOptions, type EntityTypeValue } from "@/shared/content";
import { getFieldError } from "../lib/fieldPath";

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.6rem;
`;

interface EntityTypeFieldsProps {
  entityType: EntityTypeValue;
  namePrefix?: string;
}

export const EntityTypeFields = ({ entityType, namePrefix = "" }: EntityTypeFieldsProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const path = (name: string) => `${namePrefix}${name}`;
  const facilitiesPath = path("facilities");
  const serviceTypesPath = path("serviceTypes");
  const selectedFacilities: string[] = watch(facilitiesPath) ?? [];
  const selectedServiceTypes: string[] = watch(serviceTypesPath) ?? [];

  const toggleValue = (fieldPath: string, current: string[], value: string) => {
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setValue(fieldPath, next, { shouldDirty: true });
  };

  if (HOTEL_LIKE_TYPES.includes(entityType)) {
    return (
      <>
        <FormField label="Room Count" required error={getFieldError(errors, path("roomCount"))}>
          <Input type="number" min={1} {...register(path("roomCount"))} />
        </FormField>
        <FormField label="Bed Spaces" required error={getFieldError(errors, path("bedSpaces"))}>
          <Input type="number" min={1} {...register(path("bedSpaces"))} />
        </FormField>
        <FormField label="Facilities" optional>
          <OptionsGrid>
            {hotelFacilityOptions.map((facility) => (
              <Checkbox
                key={facility}
                label={facility}
                checked={selectedFacilities.includes(facility)}
                onChange={() => toggleValue(facilitiesPath, selectedFacilities, facility)}
              />
            ))}
          </OptionsGrid>
        </FormField>
      </>
    );
  }

  if (DINING_LIKE_TYPES.includes(entityType)) {
    return (
      <>
        <FormField label="Seating Capacity" required error={getFieldError(errors, path("seatingCapacity"))}>
          <Input type="number" min={1} {...register(path("seatingCapacity"))} />
        </FormField>
        <FormField label="Service Types" optional>
          <OptionsGrid>
            {diningServiceTypeOptions.map((type) => (
              <Checkbox
                key={type}
                label={type}
                checked={selectedServiceTypes.includes(type)}
                onChange={() => toggleValue(serviceTypesPath, selectedServiceTypes, type)}
              />
            ))}
          </OptionsGrid>
        </FormField>
      </>
    );
  }

  return null;
};
