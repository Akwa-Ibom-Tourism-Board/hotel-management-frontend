import type { EntityTypeValue } from "@/shared/content";

export type RegistrationStatus = "Draft" | "Pending" | "Approved" | "Rejected";

export interface Branch {
  id: string;
  businessName: string;
  address: string;
  localGovernment: string;
  businessPhoneNumber: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  registrationStatus: RegistrationStatus;
}

export interface Establishment {
  id: string;
  entityType: EntityTypeValue;
  businessName: string;
  uniqueBusinessId?: string | null;
  businessPhoneNumber: string;
  phoneVerified?: boolean;
  address: string;
  localGovernment: string;
  hasWebsite: boolean;
  website?: string | null;
  yearEstablished: number;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
  businessEmail: string;
  roomCount?: number | null;
  bedSpaces?: number | null;
  facilities?: string[];
  seatingCapacity?: number | null;
  serviceTypes?: string[];
  registrationStatus: RegistrationStatus;
  rejectionReason?: string | null;
  ownerId?: string | null;
  submittedAt?: string;
  approvedAt?: string | null;
  branches?: Branch[];
  // Set by the Commission when it deactivates an establishment; the
  // establishment stays read-only for the owner while this is true.
  isDisabled?: boolean;
  disabledAt?: string | null;
  disabledReason?: string | null;
}

export interface EstablishmentSearchResult {
  id: string;
  businessName: string;
  entityType: EntityTypeValue;
  localGovernment: string;
  ownerId?: string | null;
}

export type EstablishmentFormValues = Omit<
  Establishment,
  | "id"
  | "uniqueBusinessId"
  | "registrationStatus"
  | "rejectionReason"
  | "ownerId"
  | "submittedAt"
  | "approvedAt"
  | "phoneVerified"
  | "branches"
  | "isDisabled"
  | "disabledAt"
  | "disabledReason"
>;

export interface BranchInput {
  businessName?: string;
  address: string;
  localGovernment: string;
  businessPhoneNumber: string;
  contactName: string;
  contactPhoneNumber: string;
  contactEmail: string;
}

export interface CreateEstablishmentPayload extends EstablishmentFormValues {
  branches?: BranchInput[];
}

export interface BulkCreatePayload {
  entityType: EntityTypeValue;
  establishments: CreateEstablishmentPayload[];
}
