import styled from "styled-components";
import { media } from "@/theme";

export const Section = styled.section`
  padding: 4.5rem 0;
  background: ${({ theme }) => theme.colors.background};
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform ${({ theme }) => theme.transitions.base}, box-shadow ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const IconWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.cardForeground};
  margin: 0 0 0.5rem;
`;

export const CardText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
`;
