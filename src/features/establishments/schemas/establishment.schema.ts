import { z } from "zod";
import { HOTEL_LIKE_TYPES, DINING_LIKE_TYPES } from "@/shared/content";

const NIGERIAN_PHONE_REGEX = /^(0[789][01]\d{8}|234[789][01]\d{8})$/;

export const entityTypeEnum = z.enum(["hotel", "restaurant", "lounge", "bar", "tour_operator", "travel_agent", "hospitality_org", "other"]);

export const branchSchema = z.object({
  businessName: z.string().trim().optional(),
  address: z.string().trim().min(1, "Branch address is required"),
  localGovernment: z.string().min(1, "Select a local government"),
  businessPhoneNumber: z.string().regex(NIGERIAN_PHONE_REGEX, "Enter a valid Nigerian phone number"),
  contactName: z.string().trim().min(1, "Contact name is required"),
  contactPhoneNumber: z.string().regex(NIGERIAN_PHONE_REGEX, "Enter a valid Nigerian phone number"),
  contactEmail: z.string().trim().email("Enter a valid email address"),
});

export type BranchFormValues = z.infer<typeof branchSchema>;

const baseEstablishmentSchema = z.object({
  entityType: entityTypeEnum,
  businessName: z.string().trim().min(1, "Business name is required"),
  address: z.string().trim().min(1, "Address is required"),
  localGovernment: z.string().min(1, "Select a local government"),
  hasWebsite: z.boolean(),
  website: z.string().trim().optional().or(z.literal("")),
  yearEstablished: z.coerce
    .number()
    .int()
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  contactName: z.string().trim().min(1, "Contact name is required"),
  contactPhoneNumber: z.string().regex(NIGERIAN_PHONE_REGEX, "Enter a valid Nigerian phone number"),
  contactEmail: z.string().trim().email("Enter a valid email address"),
  businessEmail: z.string().trim().email("Enter a valid business email address"),
  businessPhoneNumber: z.string().regex(NIGERIAN_PHONE_REGEX, "Enter a valid Nigerian phone number"),
  roomCount: z.coerce.number().int().min(1, "Room count must be at least 1").optional(),
  bedSpaces: z.coerce.number().int().min(1, "Bed spaces must be at least 1").optional(),
  facilities: z.array(z.string()).optional(),
  seatingCapacity: z.coerce.number().int().min(1, "Seating capacity must be at least 1").optional(),
  serviceTypes: z.array(z.string()).optional(),
  branches: z.array(branchSchema).optional(),
});

export const establishmentSchema = baseEstablishmentSchema.superRefine((data, ctx) => {
  if (HOTEL_LIKE_TYPES.includes(data.entityType)) {
    if (!data.roomCount) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Room count is required for hotels", path: ["roomCount"] });
    }
    if (!data.bedSpaces) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Bed spaces is required for hotels", path: ["bedSpaces"] });
    }
  }

  if (DINING_LIKE_TYPES.includes(data.entityType) && !data.seatingCapacity) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Seating capacity is required", path: ["seatingCapacity"] });
  }

  if (data.hasWebsite && !data.website) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter your website address", path: ["website"] });
  }
});

export type EstablishmentFormSchema = z.infer<typeof establishmentSchema>;

export const bulkAddSchema = z.object({
  entityType: entityTypeEnum,
  establishments: z.array(establishmentSchema).min(1, "Add at least one establishment"),
});

export type BulkAddFormSchema = z.infer<typeof bulkAddSchema>;
