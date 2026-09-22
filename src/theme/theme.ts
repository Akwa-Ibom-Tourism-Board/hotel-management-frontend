import { colors, type ColorPalette } from "./colors";
import { withAlpha } from "./utils";

export const buildTheme = (palette: ColorPalette) =>
  ({
    colors: {
      background: palette.background,
      foreground: palette.foreground,

      card: palette.card,
      cardForeground: palette.cardForeground,

      popover: palette.popover,
      popoverForeground: palette.popoverForeground,

      primary: {
        DEFAULT: palette.primary,
        foreground: palette.primaryForeground,
      },
      secondary: {
        DEFAULT: palette.secondary,
        foreground: palette.secondaryForeground,
      },
      muted: {
        DEFAULT: palette.muted,
        foreground: palette.mutedForeground,
      },
      accent: {
        DEFAULT: palette.accent,
        foreground: palette.accentForeground,
      },
      destructive: {
        DEFAULT: palette.destructive,
        foreground: palette.destructiveForeground,
      },

      border: palette.border,
      input: palette.input,
      ring: palette.ring,

      white: palette.white,
      black: palette.black,

      navHover: palette.navHover,
      highlight: palette.highlight,
      highlightMuted: palette.highlightMuted,
      gray700: palette.gray700,
      gray500: palette.gray500,
      primaryLight: palette.primaryLight,
      heroDeep: palette.heroDeep,
      servicesBackground: palette.servicesBackground,
      footerDark: palette.footerDark,
      footerGlow: palette.footerGlow,
    },

    alpha: withAlpha,

    gradients: {
      hero: `linear-gradient(135deg, ${withAlpha(palette.primary, 0.95)}, ${withAlpha(palette.primaryLight, 0.9)})`,
      accent: `linear-gradient(135deg, ${palette.secondary}, #EB9A4C)`,
      heroScene: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.heroDeep} 55%, ${palette.black} 100%)`,
      panel: `linear-gradient(160deg, ${palette.primary} 0%, ${palette.heroDeep} 100%)`,
      footer: `radial-gradient(ellipse 140% 90% at 50% 0%, ${palette.footerGlow} 0%, ${palette.footerDark} 60%, ${palette.black} 100%)`,
    },

    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      elegant: `0 10px 40px -10px ${withAlpha(palette.primary, 0.2)}`,
    },

    radii: {
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },

    fonts: {
      sans: "'Inter', system-ui, sans-serif",
      display: "'Playfair Display', serif",
    },

    breakpoints: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    container: {
      maxWidth: "1400px",
      padding: "1rem",
    },

    zIndex: {
      dropdown: 40,
      sticky: 45,
      topBar: 50,
      navbar: 50,
      modal: 60,
      floatingAction: 55,
    },

    transitions: {
      fast: "150ms ease",
      base: "300ms ease",
      slow: "500ms ease",
    },
  }) as const;

export const theme = buildTheme(colors);
export type Theme = typeof theme;
