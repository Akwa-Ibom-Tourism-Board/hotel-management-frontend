// Light-mode raw color tokens — matches the Akwa Ibom Tourism Board brand
// palette used across the state's public-facing sites.
export const colors = {
  background: "#FFFFFF",
  foreground: "#0b4923",

  card: "#FFFFFF",
  cardForeground: "#0b4923",

  popover: "#FFFFFF",
  popoverForeground: "#0b4923",

  primary: "#0b4923",
  primaryForeground: "#FFFFFF",

  secondary: "#FE6301",
  secondaryForeground: "#FFFFFF",

  muted: "#F3F7F5",
  mutedForeground: "#677E76",

  accent: "#E77918",
  accentForeground: "#FFFFFF",

  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",

  border: "#E0EBE7",
  input: "#E0EBE7",
  ring: "#0b4923",

  white: "#FFFFFF",
  black: "#000000",

  // Dropdown hover green used by the nav — distinct from `primary`.
  navHover: "#287B60",

  // Highlight yellow used for eye-catching CTAs.
  highlight: "#FACC14",
  highlightMuted: "#FDDF49",

  // Neutral grays for chrome that isn't tied to the brand palette.
  gray700: "#384252",
  gray500: "#6B7280",

  // A lighter step of `primary`, used as the mid stop in the hero gradient.
  primaryLight: "#0b4923",
  // Near-black with a hint of green, used as the dark end of the hero gradient.
  heroDeep: "#04120C",

  servicesBackground: "#F5F7FB",

  // Footer gradient: near-black base with a soft green glow at top-center.
  footerDark: "#02110D",
  footerGlow: "#04261A",
} as const;

export type ColorPalette = { [K in keyof typeof colors]: string };
