import type { ReactNode } from "react";
import styled from "styled-components";
import { Card } from "@/shared/ui";

const StyledCard = styled(Card)`
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const IconWrap = styled.div<{ $tone: "primary" | "success" | "warning" | "muted" }>`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme, $tone }) =>
    $tone === "success"
      ? theme.alpha("#22C55E", 0.12)
      : $tone === "warning"
        ? theme.alpha(theme.colors.secondary.DEFAULT, 0.12)
        : $tone === "muted"
          ? theme.colors.muted.DEFAULT
          : theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme, $tone }) =>
    $tone === "success" ? "#16A34A" : $tone === "warning" ? theme.colors.secondary.DEFAULT : theme.colors.primary.DEFAULT};
`;

const Value = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.1;
`;

const Label = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  tone?: "primary" | "success" | "warning" | "muted";
}

export const StatCard = ({ icon, label, value, tone = "primary" }: StatCardProps) => (
  <StyledCard>
    <IconWrap $tone={tone}>{icon}</IconWrap>
    <div>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </div>
  </StyledCard>
);
