import styled from "styled-components";
import { media } from "@/theme";

// Main form on the left, the compact Owner summary as a sidebar on the
// right — fills wide screens instead of leaving the form pinned narrow on
// the left with empty space beside it. Stacks to a single column below lg.
export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 2fr 1fr;
  }
`;

export const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.lg} {
    position: sticky;
    top: 1.5rem;
  }
`;

export const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 600;
  font-size: 0.8125rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.25rem;
`;

export const HeaderCard = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
`;

export const BusinessName = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.25rem;
`;

export const BusinessId = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
`;

export const RejectionNote = styled.p`
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

// A more prominent notice than RejectionNote: a disabled establishment is
// a stronger, ongoing state (read-only, Commission-initiated) rather than
// a one-time reviewer note, so it gets a bordered block instead of a line.
export const DisabledBanner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.3)};
  margin-bottom: 1.5rem;
`;

export const DisabledBannerTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-weight: 700;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

export const DisabledBannerText = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;
