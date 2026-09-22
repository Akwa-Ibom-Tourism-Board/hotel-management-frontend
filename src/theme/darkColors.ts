import type { ColorPalette } from "./colors";

// Dark-mode tokens — same shape as `colors.ts`. Keeps the brand's green +
// orange identity but inverts background/foreground/card/border so text
// stays legible on dark surfaces.
export const darkColors: ColorPalette = {
  background: "#04120C",
  foreground: "#F3F7F5",

  card: "#0F2A1E",
  cardForeground: "#F3F7F5",

  popover: "#0F2A1E",
  popoverForeground: "#F3F7F5",

  primary: "#1DA36B",
  primaryForeground: "#04120C",

  secondary: "#FE6301",
  secondaryForeground: "#FFFFFF",

  muted: "#122A1F",
  mutedForeground: "#9FB8AC",

  accent: "#E77918",
  accentForeground: "#FFFFFF",

  destructive: "#F87171",
  destructiveForeground: "#2B0A0A",

  border: "#1E3A2D",
  input: "#1E3A2D",
  ring: "#2FA873",

  white: "#FFFFFF",
  black: "#000000",

  navHover: "#2FA873",

  highlight: "#FACC14",
  highlightMuted: "#FDDF49",

  gray700: "#D1D5DB",
  gray500: "#9CA3AF",

  primaryLight: "#1DA36B",
  heroDeep: "#04120C",

  servicesBackground: "#0B1F16",

  footerDark: "#02110D",
  footerGlow: "#04261A",
} as const;
