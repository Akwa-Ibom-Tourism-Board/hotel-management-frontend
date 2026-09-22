import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkle } from "lucide-react";
import { Button } from "@/shared/ui";
import { useTheme } from "@/theme";
import { heroSlides } from "../content/heroSlides";
import {
  Section,
  Glow,
  ContentWrap,
  ContentCol,
  Eyebrow,
  EyebrowText,
  Title,
  Subtitle,
  CtaRow,
  MediaCol,
  MediaFrame,
  SlideLayer,
  SlideImage,
  Indicators,
  Dot,
} from "./Hero.styles";

const SLIDE_INTERVAL_MS = 5000;

const Hero = () => {
  const theme = useTheme();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[current];

  return (
    <Section id="home">
      <Glow />

      <ContentWrap>
        <ContentCol>
          <Eyebrow>
            <Sparkle color={theme.colors.highlightMuted} size={16} fill={theme.colors.highlightMuted} />
            <EyebrowText>Akwa Ibom State &middot; Land of Promise</EyebrowText>
          </Eyebrow>

          <Title key={`title-${current}`}>{slide.title}</Title>
          <Subtitle key={`subtitle-${current}`}>{slide.subtitle}</Subtitle>

          {slide.ctaLabel && slide.ctaTo && (
            <CtaRow key={`cta-${current}`}>
              <Link to={slide.ctaTo}>
                <Button size="lg" variant="secondary" style={{ boxShadow: theme.shadows.elegant }}>
                  {slide.ctaLabel}
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </CtaRow>
          )}
        </ContentCol>

        <MediaCol>
          <MediaFrame>
            {heroSlides.map((s, index) => (
              <SlideLayer key={s.image} $active={index === current}>
                <SlideImage
                  src={s.image}
                  alt=""
                  $objectFit={s.objectFit ?? "contain"}
                  $objectPosition={s.objectPosition ?? "center"}
                />
              </SlideLayer>
            ))}
          </MediaFrame>

          <Indicators>
            {heroSlides.map((s, index) => (
              <Dot
                key={s.image}
                $active={index === current}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            ))}
          </Indicators>
        </MediaCol>
      </ContentWrap>
    </Section>
  );
};

export default Hero;
