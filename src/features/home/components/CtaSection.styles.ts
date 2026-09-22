import styled from "styled-components";
import { media } from "@/theme";

export const Section = styled.section`
  background: ${({ theme }) => theme.gradients.panel};
  padding: 4rem 0;
`;

export const Inner = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 0 0.75rem;

  ${media.md} {
    font-size: 2.25rem;
  }
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.85)};
  font-size: 1.0625rem;
  line-height: 1.6;
  margin: 0 0 2rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    flex-direction: row;
  }
`;

export const OutlineLinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1.5px solid ${({ theme }) => theme.alpha(theme.colors.white, 0.6)};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.white, 0.1)};
  }
`;
