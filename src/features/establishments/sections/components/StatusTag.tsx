import styled from "styled-components";
import type { SectionStatus } from "../types";
import { getStatusTone, getStatusLabel } from "../lib/statusTone";

const Tag = styled.span<{ $bg: string; $fg: string }>`
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

interface StatusTagProps {
  status: SectionStatus | null | undefined;
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const tone = getStatusTone(status);
  return (
    <Tag $bg={tone.bg} $fg={tone.fg}>
      {getStatusLabel(status)}
    </Tag>
  );
};
