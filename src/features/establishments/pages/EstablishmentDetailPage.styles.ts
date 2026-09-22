import styled from "styled-components";

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

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;
