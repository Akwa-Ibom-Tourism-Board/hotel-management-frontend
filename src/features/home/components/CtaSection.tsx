import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui";
import { Section, Inner, Title, Subtitle, ButtonRow, OutlineLinkButton } from "./CtaSection.styles";

const CtaSection = () => (
  <Section id="cta">
    <Inner>
      <Title>Ready to Register Your Establishment?</Title>
      <Subtitle>
        Create your account in minutes and start managing your hospitality establishments in one secure
        dashboard.
      </Subtitle>
      <ButtonRow>
        <Link to="/register">
          <Button size="lg" variant="secondary">
            Register Now
            <ArrowRight size={20} />
          </Button>
        </Link>
        <OutlineLinkButton as={Link} to="/login">
          Already Registered? Log In
        </OutlineLinkButton>
      </ButtonRow>
    </Inner>
  </Section>
);

export default CtaSection;
