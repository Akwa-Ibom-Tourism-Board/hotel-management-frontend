import styled from "styled-components";

export const PanelWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2rem;
`;

export const PanelHeading = styled.div`
  margin-bottom: 0.25rem;
`;

export const PanelTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.25rem;
`;

export const PanelSubtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
  max-width: 48rem;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  font-size: 0.875rem;
`;
