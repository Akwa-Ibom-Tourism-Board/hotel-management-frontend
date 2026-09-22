import styled, { css, keyframes } from "styled-components";
import { fadeIn, media } from "@/theme";

const contentFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const contentFadeAnim = css`
  animation: ${contentFade} 0.5s ease-out forwards;
`;

export const Section = styled.section`
  position: relative;
  min-height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary.DEFAULT};
  background: ${({ theme }) => theme.gradients.heroScene};
`;

export const Glow = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  width: 32rem;
  height: 32rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.25)};
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
`;

export const ContentWrap = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: ${({ theme }) => theme.container.maxWidth};
  margin: 0 auto;
  padding: 3rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  ${media.sm} {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ${media.lg} {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 4rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const fadeInAnim = css`
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

export const ContentCol = styled.div`
  max-width: 36rem;
  align-self: start;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.highlightMuted, 0.35)};
  background: ${({ theme }) => theme.alpha(theme.colors.white, 0.08)};
  ${fadeInAnim}
`;

export const EyebrowText = styled.span`
  color: ${({ theme }) => theme.colors.highlightMuted};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;

  ${media.sm} {
    font-size: 0.8125rem;
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 0 1.5rem;
  line-height: 1.2;
  ${contentFadeAnim}

  ${media.md} {
    font-size: 3rem;
  }

  ${media.lg} {
    font-size: 3.25rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.alpha(theme.colors.white, 0.9)};
  margin: 0 0 2rem;
  line-height: 1.6;
  ${contentFadeAnim}

  ${media.md} {
    font-size: 1.25rem;
  }
`;

export const CtaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${contentFadeAnim}

  ${media.sm} {
    flex-direction: row;
  }
`;

export const MediaCol = styled.div`
  position: relative;
  width: 100%;
`;

export const MediaFrame = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  background: ${({ theme }) => theme.alpha(theme.colors.white, 0.06)};

  ${media.lg} {
    width: 110%;
    margin-left: -5%;
  }
`;

export const SlideLayer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  transition: opacity 1000ms;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
`;

export const SlideImage = styled.img<{ $objectFit: "contain" | "cover"; $objectPosition: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit};
  object-position: ${({ $objectPosition }) => $objectPosition};
`;

export const Indicators = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  ${media.lg} {
    justify-content: flex-start;
  }
`;

export const Dot = styled.button<{ $active: boolean }>`
  height: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  cursor: pointer;
  transition: all 300ms;
  width: ${({ $active }) => ($active ? "2rem" : "0.5rem")};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.secondary.DEFAULT : theme.alpha(theme.colors.white, 0.4)};

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.secondary.DEFAULT : theme.alpha(theme.colors.white, 0.6)};
  }
`;
