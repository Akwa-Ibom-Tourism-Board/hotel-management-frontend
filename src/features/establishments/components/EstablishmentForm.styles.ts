import styled from "styled-components";
import { media } from "@/theme";

// The main field grid: 1 column on mobile, 2 from sm, 3 from lg — lets a
// form with a lot of short fields fill wide screens instead of running
// down a single narrow column. Long fields (free text, checkbox option
// grids, field arrays) use WideField to span every column.
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 1rem;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const WideField = styled.div`
  grid-column: 1 / -1;
`;

export const CheckboxRow = styled.div`
  margin-bottom: 1.1rem;
`;

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 1.5rem 0;
`;

export const SectionTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.75rem;
`;
