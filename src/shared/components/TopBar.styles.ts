import styled from "styled-components";
import { media, fadeIn } from "@/theme";

export const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.topBar};
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  animation: ${fadeIn} 0.4s ease-out;
`;

export const Content = styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth};
  margin: 0 auto;
  min-height: 2.5rem;
  padding: 0.375rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  ${media.sm} {
    min-height: 2.75rem;
    gap: 1rem;
  }
`;

export const LogosGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const LogoImgSmall = styled.img`
  height: 1.5rem;
  width: auto;

  ${media.sm} {
    height: 1.75rem;
  }
`;

export const EmailGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
  overflow: hidden;
`;

export const EmailLink = styled.a`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.6875rem;
  text-underline-offset: 2px;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    text-decoration: underline;
  }

  ${media.sm} {
    font-size: 0.8125rem;
  }
`;

export const SocialIcons = styled.div`
  display: none;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  margin-left: auto;

  ${media.sm} {
    display: flex;
  }
`;

export const SocialIconLink = styled.a`
  display: flex;
  padding: 0.125rem;
  border-radius: ${({ theme }) => theme.radii.full};
  transition: color ${({ theme }) => theme.transitions.base}, transform ${({ theme }) => theme.transitions.base};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
    transform: scale(1.1);
  }
`;
