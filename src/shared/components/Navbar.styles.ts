import styled from "styled-components";
import { Link } from "react-router-dom";
import { media, fadeIn, glowPulse } from "@/theme";

// Must track TopBar's own height exactly (2.5rem below \`sm\`, 2.75rem from
// \`sm\` up) — any mismatch leaves a gap between the two fixed bars.
export const Nav = styled.nav`
  position: fixed;
  top: 2.5rem;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  background: ${({ theme }) => theme.alpha(theme.colors.background, 0.95)};
  backdrop-filter: blur(6px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: background-color ${({ theme }) => theme.transitions.base};

  ${media.sm} {
    top: 2.75rem;
  }
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.container.maxWidth};
  margin: 0 auto;
  padding: 0.75rem 1rem;

  ${media.sm} {
    padding: 0.75rem 2rem;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 0.5rem;
  min-height: 3.5rem;
`;

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
`;

export const LogoImg = styled.img`
  height: 2.75rem;
  width: 2.75rem;
  object-fit: contain;

  ${media.sm} {
    height: 3.25rem;
    width: 3.25rem;
  }
`;

export const BrandText = styled.div`
  display: none;

  ${media.sm} {
    display: block;
  }
`;

export const BrandTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  line-height: 1.2;

  ${media.md} {
    font-size: 1rem;
  }
`;

export const BrandSubtitle = styled.div`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const DesktopLinks = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const NavItemLink = styled(Link)`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 500;
  font-size: 0.9375rem;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${media.md} {
    gap: 0.75rem;
  }
`;

export const IconToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
  }
`;

export const NavCtaButtonOutline = styled(Link)`
  display: none;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.5rem 1.125rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1.5px solid ${({ theme }) => theme.colors.primary.DEFAULT};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-weight: 600;
  font-size: 0.8125rem;
  transition: background-color ${({ theme }) => theme.transitions.fast}, color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.DEFAULT};
    color: ${({ theme }) => theme.colors.primary.foreground};
  }

  ${media.sm} {
    display: inline-flex;
  }
`;

export const NavCtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 0.5rem 1.125rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: ${({ theme }) => theme.colors.secondary.foreground};
  font-weight: 600;
  font-size: 0.8125rem;
  animation: ${glowPulse} 2.4s ease-in-out infinite;
  transition: background-color ${({ theme }) => theme.transitions.fast}, transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
    transform: translateY(-1px);
  }
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.foreground};
  padding: 0.5rem;
  margin-right: -0.5rem;
  cursor: pointer;
  display: flex;

  ${media.md} {
    display: none;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: ${({ theme }) => theme.zIndex.navbar + 1};
  animation: ${fadeIn} 0.2s ease-out;

  ${media.md} {
    display: none;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(85vw, 22rem);
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.navbar + 2};
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
  transition: transform 0.25s ease-out, visibility 0.25s ease-out;
  overflow-y: auto;

  ${media.md} {
    display: none;
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const MobileCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
`;

export const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const MobileNavItemLink = styled(Link)`
  padding: 0.875rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 600;
  font-size: 1rem;
  transition: background-color ${({ theme }) => theme.transitions.fast}, color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.muted.DEFAULT};
    color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

export const MobileDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 1.25rem 0;
`;

export const MobileCtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;

  a {
    justify-content: center;
    width: 100%;
  }
`;
