import styled from "styled-components";

export const LockedTypeBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.08)};
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.2)};
  margin-bottom: 1.5rem;
`;

export const LockedTypeText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};

  strong {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

export const ItemCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  margin-bottom: 1rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.card};
`;

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
`;

export const ItemHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const ItemNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
`;

export const ItemTitle = styled.span`
  font-weight: 700;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.foreground};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const RemoveItemButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.1)};
  }
`;

export const ItemBody = styled.div`
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1.25rem;
`;

export const AddItemButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1.5px dashed ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  margin-bottom: 1.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;
