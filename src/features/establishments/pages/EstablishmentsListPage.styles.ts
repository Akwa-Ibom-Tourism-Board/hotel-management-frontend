import styled from "styled-components";
import { media } from "@/theme";

export const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  ${media.lg} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  flex: 1;
`;

export const SearchWrap = styled.div`
  min-width: 14rem;
  flex: 1;
`;

export const SelectWrap = styled.div`
  min-width: 10rem;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;

export const DraftBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 0.8125rem;
  margin-bottom: 1.25rem;

  button {
    background: none;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
  }
`;
