import { useClearHashOnScrollAway } from "@/shared/hooks";
import Hero from "../components/Hero";
import BenefitsSection from "../components/BenefitsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import CtaSection from "../components/CtaSection";

const SECTION_IDS = ["home", "benefits", "how-it-works", "cta"];

const LandingPage = () => {
  useClearHashOnScrollAway(SECTION_IDS);

  return (
    <>
      <Hero />
      <BenefitsSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
};

export default LandingPage;
