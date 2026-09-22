import { Container } from "@/shared/components";
import { steps } from "../content/steps";
import { Section, Header, Eyebrow, Title, Subtitle, StepsRow, StepCard, StepNumber, StepTitle, StepText } from "./HowItWorksSection.styles";

const HowItWorksSection = () => (
  <Section id="how-it-works">
    <Container>
      <Header>
        <Eyebrow>How It Works</Eyebrow>
        <Title>From NIN to License in Four Simple Steps</Title>
        <Subtitle>No paperwork queues, no guesswork, the whole process happens online, from verification to licensing.</Subtitle>
      </Header>

      <StepsRow>
        {steps.map((step) => (
          <StepCard key={step.step}>
            <StepNumber>{step.step}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepText>{step.description}</StepText>
          </StepCard>
        ))}
      </StepsRow>
    </Container>
  </Section>
);

export default HowItWorksSection;
