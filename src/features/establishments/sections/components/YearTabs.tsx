import styled from "styled-components";
import type { SectionStatus } from "../types";
import { getStatusTone, getStatusLabel } from "../lib/statusTone";

const Scroller = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    height: 4px;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  padding: 0.5rem 0.875rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1.5px solid ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.alpha(theme.colors.primary.DEFAULT, 0.1) : theme.colors.card)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : theme.colors.foreground)};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast}, background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

const Dot = styled.span<{ $color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

interface YearTabsProps {
  years: number[];
  statusByYear: Record<number, SectionStatus | undefined>;
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const YearTabs = ({ years, statusByYear, selectedYear, onSelectYear }: YearTabsProps) => (
  <Scroller role="tablist" aria-label="Reporting year">
    {years.map((year) => {
      const status = statusByYear[year];
      return (
        <Tab
          key={year}
          type="button"
          role="tab"
          aria-selected={year === selectedYear}
          $active={year === selectedYear}
          onClick={() => onSelectYear(year)}
          title={getStatusLabel(status)}
        >
          <Dot $color={getStatusTone(status).fg} />
          {year}
        </Tab>
      );
    })}
  </Scroller>
);
