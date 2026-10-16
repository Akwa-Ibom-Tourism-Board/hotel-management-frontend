import styled from "styled-components";
import type { RegistrationStatus } from "../api/types";

const toneFor = (status: RegistrationStatus) => {
  switch (status) {
    case "Approved":
      return { bg: "rgba(34, 197, 94, 0.12)", fg: "#16A34A" };
    case "Pending":
      return { bg: "rgba(254, 99, 1, 0.12)", fg: "#C2410C" };
    case "Rejected":
      return { bg: "rgba(239, 68, 68, 0.12)", fg: "#DC2626" };
    case "Draft":
    default:
      return { bg: "rgba(107, 114, 128, 0.14)", fg: "#4B5563" };
  }
};

const Badge = styled.span<{ $bg: string; $fg: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  white-space: nowrap;
`;

export const StatusBadge = ({ status }: { status: RegistrationStatus }) => {
  const tone = toneFor(status);
  return (
    <Badge $bg={tone.bg} $fg={tone.fg}>
      {status === "Approved" ? "Licensed" : status}
    </Badge>
  );
};

// Shown alongside StatusBadge when the Commission has deactivated an
// establishment; registrationStatus is unaffected, so this is a separate,
// independent indicator rather than another status value.
export const DisabledBadge = () => (
  <Badge $bg="rgba(239, 68, 68, 0.12)" $fg="#DC2626">
    Disabled
  </Badge>
);
