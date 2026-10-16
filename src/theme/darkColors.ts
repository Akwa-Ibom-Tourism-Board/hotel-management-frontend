import type { ColorPalette } from "./colors";

// Dark-mode tokens — same shape as `colors.ts`. Keeps the Mbopo green +
// orange identity but inverts background/foreground/card/border so text
// stays legible on dark surfaces.
export const darkColors: ColorPalette = {
  background: "#00120C",
  foreground: "#F3F7F5",

  card: "#062A1B",
  cardForeground: "#F3F7F5",

  popover: "#062A1B",
  popoverForeground: "#F3F7F5",

  primary: "#1F8F5E",
  primaryForeground: "#00120C",

  secondary: "#FE6201",
  secondaryForeground: "#FFFFFF",

  muted: "#0B1F16",
  mutedForeground: "#9FB8AC",

  accent: "#E07A2B",
  accentForeground: "#FFFFFF",

  destructive: "#F87171",
  destructiveForeground: "#2B0A0A",

  border: "#1E3A2D",
  input: "#1E3A2D",
  ring: "#FE6201",

  white: "#FFFFFF",
  black: "#000000",

  navHover: "#0A3524",

  highlight: "#FACC14",
  highlightMuted: "#FDDF49",

  gray700: "#D1D5DB",
  gray500: "#9CA3AF",

  primaryLight: "#1F8F5E",
  heroDeep: "#00120C",

  servicesBackground: "#0B1F16",

  footerDark: "#02110D",
  footerGlow: "#04261A",
} as const;
