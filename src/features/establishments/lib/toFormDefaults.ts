import type { Establishment } from "../api/types";
import type { EstablishmentFormSchema } from "../schemas/establishment.schema";

// The API can return null for optional fields; the form schema expects
// undefined instead, and branches need their server-only fields stripped.
export const toFormDefaults = (establishment: Establishment): Partial<EstablishmentFormSchema> => ({
  entityType: establishment.entityType,
  businessName: establishment.businessName,
  address: establishment.address,
  localGovernment: establishment.localGovernment,
  hasWebsite: establishment.hasWebsite,
  website: establishment.website ?? "",
  yearEstablished: establishment.yearEstablished,
  contactName: establishment.contactName,
  contactPhoneNumber: establishment.contactPhoneNumber,
  contactEmail: establishment.contactEmail,
  businessEmail: establishment.businessEmail,
  businessPhoneNumber: establishment.businessPhoneNumber,
  roomCount: establishment.roomCount ?? undefined,
  bedSpaces: establishment.bedSpaces ?? undefined,
  facilities: establishment.facilities ?? [],
  seatingCapacity: establishment.seatingCapacity ?? undefined,
  serviceTypes: establishment.serviceTypes ?? [],
  branches: (establishment.branches ?? []).map((branch) => ({
    businessName: branch.businessName ?? "",
    address: branch.address,
    localGovernment: branch.localGovernment,
    businessPhoneNumber: branch.businessPhoneNumber,
    contactName: branch.contactName,
    contactPhoneNumber: branch.contactPhoneNumber,
    contactEmail: branch.contactEmail,
  })),
});
