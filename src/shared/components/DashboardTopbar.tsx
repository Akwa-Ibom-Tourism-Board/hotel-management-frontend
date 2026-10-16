import styled from "styled-components";
import { Menu } from "lucide-react";
// Dark mode is disabled for now — see theme/ThemeModeContext.tsx.
// import { Sun, Moon } from "lucide-react";
// import { useThemeMode } from "@/theme";
import { useAuth } from "@/features/auth";
import { Avatar, AvatarFallback } from "@/shared/ui";
import { media } from "@/theme";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: ${({ theme }) => theme.colors.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuToggle = styled.button`
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};

  ${media.lg} {
    display: none;
  }
`;

const Title = styled.h1`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
  display: none;

  ${media.sm} {
    display: inline;
  }
`;

const UserCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

// Dark mode is disabled for now — see theme/ThemeModeContext.tsx.
// const IconToggleButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 2.25rem;
//   height: 2.25rem;
//   border-radius: ${({ theme }) => theme.radii.full};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   background: ${({ theme }) => theme.colors.background};
//   color: ${({ theme }) => theme.colors.foreground};
//   cursor: pointer;
//   transition: background-color ${({ theme }) => theme.transitions.fast};
//
//   &:hover {
//     background: ${({ theme }) => theme.colors.muted.DEFAULT};
//   }
// `;

interface DashboardTopbarProps {
  title: string;
  onMenuClick: () => void;
}

export const DashboardTopbar = ({ title, onMenuClick }: DashboardTopbarProps) => {
  const { user } = useAuth();
  const displayName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email;
  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : (user?.email?.[0]?.toUpperCase() ?? "?");

  return (
    <Bar>
      <MenuToggle onClick={onMenuClick} aria-label="Open menu" type="button">
        <Menu size={22} />
      </MenuToggle>
      <Title>{title}</Title>
      {/* Dark mode is disabled for now — see theme/ThemeModeContext.tsx.
      <IconToggleButton
        onClick={toggleMode}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        type="button"
      >
        {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </IconToggleButton> */}
      <UserCluster>
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <UserName>{displayName}</UserName>
      </UserCluster>
    </Bar>
  );
};
