import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useThemeMode } from "@/theme";
import logo from "@/assets/akwa-ibom-logo-main.png";
import {
  Nav,
  Inner,
  Row,
  BrandLink,
  LogoImg,
  BrandText,
  BrandTitle,
  BrandSubtitle,
  DesktopLinks,
  NavItemLink,
  NavActions,
  IconToggleButton,
  NavCtaButtonOutline,
  NavCtaButton,
  MenuButton,
  MobileMenu,
  MobileLinks,
  MobileNavItemLink,
  MobileCtaRow,
} from "./Navbar.styles";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Why Register", to: "/#benefits" },
  { label: "How It Works", to: "/#how-it-works" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();

  return (
    <Nav>
      <Inner>
        <Row>
          <BrandLink to="/" onClick={() => setIsMenuOpen(false)}>
            <LogoImg src={logo} alt="Akwa Ibom Hotels & Tourism Development Commission" />
            <BrandText>
              <BrandTitle>Akwa Ibom State</BrandTitle>
              <BrandSubtitle>Hospitality Establishment Registration Portal</BrandSubtitle>
            </BrandText>
          </BrandLink>

          <DesktopLinks>
            {navLinks.map((link) => (
              <NavItemLink key={link.to} to={link.to}>
                {link.label}
              </NavItemLink>
            ))}
          </DesktopLinks>

          <NavActions>
            <IconToggleButton
              onClick={toggleMode}
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              type="button"
            >
              {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </IconToggleButton>

            <NavCtaButtonOutline to="/login">Log In</NavCtaButtonOutline>
            <NavCtaButton to="/register">Register</NavCtaButton>

            <MenuButton onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle menu" type="button">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </MenuButton>
          </NavActions>
        </Row>

        {isMenuOpen && (
          <MobileMenu>
            <MobileLinks>
              {navLinks.map((link) => (
                <MobileNavItemLink key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </MobileNavItemLink>
              ))}
            </MobileLinks>
            <MobileCtaRow>
              <NavCtaButtonOutline to="/login" style={{ display: "inline-flex" }} onClick={() => setIsMenuOpen(false)}>
                Log In
              </NavCtaButtonOutline>
              <NavCtaButton to="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </NavCtaButton>
            </MobileCtaRow>
          </MobileMenu>
        )}
      </Inner>
    </Nav>
  );
};

export default Navbar;
