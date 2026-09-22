import { Mail, Facebook, Instagram, Twitter } from "lucide-react";
import ariseLogo from "@/assets/arise-logo-main.png";
import akwaIbomLogo from "@/assets/akwa-ibom-logo-main.png";
import { Bar, Content, LogosGroup, LogoImgSmall, EmailGroup, EmailLink, SocialIcons, SocialIconLink } from "./TopBar.styles";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
];

const TopBar = () => (
  <Bar>
    <Content>
      <LogosGroup>
        <LogoImgSmall src={akwaIbomLogo} alt="Akwa Ibom State Government Logo" />
        <LogoImgSmall src={ariseLogo} alt="Arise Logo" />
      </LogosGroup>

      <EmailGroup>
        <Mail size={13} />
        <EmailLink href="mailto:info.akhtb@gmail.com">info.akhtb@gmail.com</EmailLink>
      </EmailGroup>

      <SocialIcons>
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <SocialIconLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon size={14} />
          </SocialIconLink>
        ))}
      </SocialIcons>
    </Content>
  </Bar>
);

export default TopBar;
