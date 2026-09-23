import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, ArrowUp } from "lucide-react";
import { Container } from "./Container";
import logo from "@/assets/akwa-ibom-logo-main.png";
import {
  FooterEl,
  Grid,
  BrandRow,
  BrandLogo,
  BrandTitle,
  BrandSubtitle,
  About,
  Heading,
  LinkList,
  FooterLink,
  ContactList,
  ContactItem,
  SocialText,
  SocialRow,
  SocialButton,
  BottomBar,
  BackToTopButton,
} from "./Footer.styles";

const BACK_TO_TOP_THRESHOLD = 400;

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > BACK_TO_TOP_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <FooterEl id="contact">
      <Container>
        <Grid>
          <div>
            <BrandRow>
              <BrandLogo src={logo} alt="Logo" />
              <div>
                <BrandTitle>Akwa Ibom State</BrandTitle>
                <BrandSubtitle>Hotels & Tourism Development Commission</BrandSubtitle>
              </div>
            </BrandRow>
            <About>
              A single registration portal for every hotel, restaurant, lounge, and bar in Akwa Ibom State;
              built to make licensing simple and keep the state&apos;s hospitality sector accountable and visible.
            </About>
          </div>

          <div>
            <Heading>Quick Links</Heading>
            <LinkList>
              <li>
                <FooterLink href="/#home">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/#benefits">Why Register</FooterLink>
              </li>
              <li>
                <FooterLink href="/#how-it-works">How It Works</FooterLink>
              </li>
              <li>
                <FooterLink href="/login">Log In</FooterLink>
              </li>
              <li>
                <FooterLink href="/register">Register</FooterLink>
              </li>
            </LinkList>
          </div>

          <div>
            <Heading>Contact Us</Heading>
            <ContactList>
              <ContactItem data-align="start">
                <MapPin size={16} />
                <span>Akwa Ibom State Hotels & Tourism Development Commission, Uyo, Nigeria</span>
              </ContactItem>
              <ContactItem>
                <Phone size={16} />
                <span>+234 (0) 7030721184</span>
              </ContactItem>
              <ContactItem>
                <Mail size={16} />
                <span>info.akhtb@gmail.com</span>
              </ContactItem>
            </ContactList>
          </div>

          <div>
            <Heading>Follow Us</Heading>
            <SocialText>Stay connected for the latest updates on hospitality registration and licensing.</SocialText>
            <SocialRow>
              <SocialButton href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialButton>
              <SocialButton href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialButton>
              <SocialButton href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialButton>
            </SocialRow>
          </div>
        </Grid>

        <BottomBar>
          <p>&copy; {new Date().getFullYear()} Akwa Ibom State Hotels and Tourism Development Commission. All rights reserved.</p>
        </BottomBar>
      </Container>

      <BackToTopButton
        $visible={showBackToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        type="button"
      >
        <ArrowUp size={20} />
      </BackToTopButton>
    </FooterEl>
  );
};

export default Footer;
