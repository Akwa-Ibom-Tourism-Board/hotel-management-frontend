import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BarChart3, Building2, BadgeCheck, UserCircle, LogOut, X } from "lucide-react";
import { useLogoutConfirm } from "@/shared/hooks";
import { LogoutConfirmModal } from "./LogoutConfirmModal";
import { media } from "@/theme";

const NAV_ITEMS = [
  { label: "Analytics", to: "/dashboard", icon: BarChart3 },
  { label: "Establishments", to: "/dashboard/establishments", icon: Building2 },
  { label: "Licensing Status", to: "/dashboard/licensing", icon: BadgeCheck },
  { label: "Profile", to: "/dashboard/profile", icon: UserCircle },
];

const Aside = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform ${({ theme }) => theme.transitions.base};

  ${media.lg} {
    position: sticky;
    transform: none;
    /* Without this, a sticky sidebar inside a flex row stretches to match
       the (often much taller, scrollable) main content's height by default,
       so its own bottom — and the Log Out button pinned there — ends up far
       below the viewport, reachable only by scrolling the whole page. */
    align-self: flex-start;
    height: 100vh;
    overflow-y: auto;
  }
`;

const Overlay = styled.button<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  z-index: ${({ theme }) => theme.zIndex.dropdown};

  ${media.lg} {
    display: none;
  }
`;

const BrandLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const CloseIcon = styled(X)`
  cursor: pointer;
  flex-shrink: 0;

  ${media.lg} {
    display: none;
  }
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active, theme }) => ($active ? theme.colors.primary.DEFAULT : "rgba(255,255,255,0.85)")};
  background: ${({ $active, theme }) => ($active ? theme.colors.white : "transparent")};
  margin-bottom: 0.25rem;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.colors.white : "rgba(255,255,255,0.1)")};
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const location = useLocation();
  const { isOpen: isLogoutOpen, isLoggingOut, requestLogout, cancelLogout, confirmLogout } = useLogoutConfirm();

  return (
    <>
      <Overlay $open={open} onClick={onClose} aria-label="Close menu" type="button" />
      <Aside $open={open}>
        <BrandLink to="/dashboard">
          Akwa Ibom Hotels Portal
          <CloseIcon size={18} onClick={onClose} />
        </BrandLink>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <NavItem key={item.to} to={item.to} $active={active} onClick={onClose}>
              <Icon size={17} />
              {item.label}
            </NavItem>
          );
        })}
        <LogoutButton onClick={requestLogout} type="button">
          <LogOut size={17} />
          Log Out
        </LogoutButton>
      </Aside>

      <LogoutConfirmModal open={isLogoutOpen} isLoggingOut={isLoggingOut} onCancel={cancelLogout} onConfirm={confirmLogout} />
    </>
  );
};
