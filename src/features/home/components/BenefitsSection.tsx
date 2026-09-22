import { ShieldCheck, Eye, Landmark, Award, RefreshCw, BarChart3 } from "lucide-react";
import { Container } from "@/shared/components";
import { benefits, type Benefit } from "../content/benefits";
import { Section, Header, Eyebrow, Title, Subtitle, Grid, Card, IconWrap, CardTitle, CardText } from "./BenefitsSection.styles";

const icons: Record<Benefit["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  eye: Eye,
  landmark: Landmark,
  award: Award,
  refresh: RefreshCw,
  chart: BarChart3,
};

const BenefitsSection = () => (
  <Section id="benefits">
    <Container>
      <Header>
        <Eyebrow>Why Register</Eyebrow>
        <Title>Your Establishment Deserves to Be Seen, Trusted & Protected</Title>
        <Subtitle>
          Registration is more than a formality; it is how your hotel, restaurant, lounge or bar becomes a
          recognized, licensed part of Akwa Ibom&apos;s growing tourism economy.
        </Subtitle>
      </Header>

      <Grid>
        {benefits.map((benefit) => {
          const Icon = icons[benefit.icon];
          return (
            <Card key={benefit.title}>
              <IconWrap>
                <Icon size={22} />
              </IconWrap>
              <CardTitle>{benefit.title}</CardTitle>
              <CardText>{benefit.description}</CardText>
            </Card>
          );
        })}
      </Grid>
    </Container>
  </Section>
);

export default BenefitsSection;
