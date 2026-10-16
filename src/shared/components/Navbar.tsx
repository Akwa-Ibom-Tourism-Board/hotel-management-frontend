import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
// Dark mode is disabled for now — see theme/ThemeModeContext.tsx.
// import { Sun, Moon } from "lucide-react";
// import { useThemeMode } from "@/theme";
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
  NavCtaButtonOutline,
  NavCtaButton,
  MenuButton,
  Backdrop,
  MobileMenu,
  MobileMenuHeader,
  MobileCloseButton,
  MobileLinks,
  MobileNavItemLink,
  MobileDivider,
  MobileCtaRow,
} from "./Navbar.styles";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Why Register", to: "/#benefits" },
  { label: "How It Works", to: "/#how-it-works" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <Nav>
        <Inner>
          <Row>
            <BrandLink to="/" onClick={closeMenu}>
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
              {/* Dark mode is disabled for now — see theme/ThemeModeContext.tsx.
              <IconToggleButton
                onClick={toggleMode}
                aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                type="button"
              >
                {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </IconToggleButton> */}

              <NavCtaButtonOutline to="/login">Log In</NavCtaButtonOutline>
              <NavCtaButton to="/register">Register</NavCtaButton>

              <MenuButton onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle menu" type="button">
                <Menu size={22} />
              </MenuButton>
            </NavActions>
          </Row>
        </Inner>
      </Nav>

      {isMenuOpen && <Backdrop onClick={closeMenu} aria-hidden="true" />}

      <MobileMenu $open={isMenuOpen} role="dialog" aria-modal="true" aria-label="Site menu">
        <MobileMenuHeader>
          <BrandLink to="/" onClick={closeMenu}>
            <LogoImg src={logo} alt="Akwa Ibom Hotels & Tourism Development Commission" />
            <BrandText style={{ display: "block" }}>
              <BrandTitle>Akwa Ibom State</BrandTitle>
            </BrandText>
          </BrandLink>
          <MobileCloseButton onClick={closeMenu} aria-label="Close menu" type="button">
            <X size={22} />
          </MobileCloseButton>
        </MobileMenuHeader>

        <MobileLinks>
          {navLinks.map((link) => (
            <MobileNavItemLink key={link.to} to={link.to} onClick={closeMenu}>
              {link.label}
            </MobileNavItemLink>
          ))}
        </MobileLinks>

        <MobileDivider />

        <MobileCtaRow>
          <NavCtaButtonOutline to="/login" style={{ display: "inline-flex" }} onClick={closeMenu}>
            Log In
          </NavCtaButtonOutline>
          <NavCtaButton to="/register" onClick={closeMenu}>
            Register
          </NavCtaButton>
        </MobileCtaRow>
      </MobileMenu>
    </>
  );
};

export default Navbar;
