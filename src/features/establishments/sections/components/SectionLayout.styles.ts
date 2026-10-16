import styled from "styled-components";
import { media } from "@/theme";

export const SectionCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const SectionIntro = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 1.25rem;
`;

// Matches EstablishmentForm.styles.ts's TwoCol pattern: one column on
// narrow viewports, two from the sm breakpoint up.
export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0 1rem;

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SectionActions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.75rem;
  margin-top: 0.5rem;

  ${media.xs} {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export const CurrencyInputWrap = styled.div`
  position: relative;

  input {
    padding-left: 1.75rem;
  }
`;

export const CurrencyPrefix = styled.span`
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 0.875rem;
  pointer-events: none;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;
