import type { SectionStatus } from "../types";

// Mirrors the tone/label mapping StatusBadge uses for registration status,
// but for the draft/complete/not-started status of a Sections entry.
export const getStatusTone = (status: SectionStatus | null | undefined) => {
  switch (status) {
    case "complete":
      return { bg: "rgba(34, 197, 94, 0.12)", fg: "#16A34A" };
    case "draft":
      return { bg: "rgba(217, 119, 6, 0.12)", fg: "#B45309" };
    default:
      return { bg: "rgba(107, 114, 128, 0.14)", fg: "#4B5563" };
  }
};

export const getStatusLabel = (status: SectionStatus | null | undefined) => {
  switch (status) {
    case "complete":
      return "Complete";
    case "draft":
      return "Draft";
    default:
      return "Not Started";
  }
};
