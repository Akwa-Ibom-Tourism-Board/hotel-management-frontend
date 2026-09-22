import styled from "styled-components";
import { media } from "@/theme";

export const FooterEl = styled.footer`
  position: relative;
  background: ${({ theme }) => theme.gradients.footer};
  color: ${({ theme }) => theme.colors.white};
  padding: 4rem 0 2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const BrandLogo = styled.img`
  height: 4rem;
  width: 4rem;
  object-fit: contain;
`;

export const BrandTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.0625rem;
  font-weight: 700;
`;

export const BrandSubtitle = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.7)};
`;

export const About = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
`;

export const Heading = styled.h3`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
  margin: 0 0 1.25rem;
  padding-left: 0.75rem;
  border-left: 3px solid ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

export const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
`;

export const FooterLink = styled.a`
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const ContactList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
`;

export const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &[data-align="start"] {
    align-items: flex-start;

    svg {
      margin-top: 0.25rem;
      flex-shrink: 0;
    }
  }
`;

export const SocialText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.65)};
  margin: 0 0 1rem;
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SocialButton = styled.a`
  background: ${({ theme }) => theme.alpha(theme.colors.white, 0.1)};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const BottomBar = styled.div`
  border-top: 1px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.15)};
  padding-top: 2rem;
  text-align: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.6)};
`;

export const BackToTopButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: ${({ theme }) => theme.zIndex.floatingAction};
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "0.75rem")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity ${({ theme }) => theme.transitions.base}, transform ${({ theme }) => theme.transitions.base}, background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
    transform: translateY(-2px);
  }
`;
