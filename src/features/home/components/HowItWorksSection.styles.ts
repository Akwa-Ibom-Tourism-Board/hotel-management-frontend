import styled from "styled-components";
import { media } from "@/theme";

export const Section = styled.section`
  padding: 4.5rem 0;
  background: ${({ theme }) => theme.colors.servicesBackground};
`;

export const Header = styled.div`
  max-width: 40rem;
  margin: 0 auto 3rem;
  text-align: center;
`;

export const Eyebrow = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  font-weight: 700;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.875rem;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 1rem;

  ${media.md} {
    font-size: 2.25rem;
  }
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  font-size: 1.0625rem;
  line-height: 1.6;
`;

export const StepsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StepCard = styled.div`
  position: relative;
  text-align: center;
`;

export const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const StepTitle = styled.h3`
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 0.5rem;
`;

export const StepText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
  max-width: 18rem;
  margin: 0 auto;
`;
