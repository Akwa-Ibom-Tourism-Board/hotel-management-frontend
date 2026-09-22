import styled from "styled-components";
import { media } from "@/theme";

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 1rem;

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }
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
