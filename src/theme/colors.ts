// Light-mode raw color tokens — ported from the Akwa Ibom "Mbopo" design
// system (mbopo_akwa_ibom_design) to match this state's brand palette.
export const colors = {
  background: "#FFFFFF",
  foreground: "#111928",

  card: "#FFFFFF",
  cardForeground: "#111928",

  popover: "#FFFFFF",
  popoverForeground: "#111928",

  primary: "#003922",
  primaryForeground: "#FFFFFF",

  secondary: "#FE6201",
  secondaryForeground: "#FFFFFF",

  muted: "#F9FAFB",
  mutedForeground: "#6B7280",

  accent: "#CB4E01",
  accentForeground: "#FFFFFF",

  destructive: "#EF4444",
  destructiveForeground: "#FFFFFF",

  border: "#E5E7EB",
  input: "#E5E7EB",
  ring: "#FE6201",

  white: "#FFFFFF",
  black: "#000000",

  // Dropdown hover green used by the nav — distinct from `primary`.
  navHover: "#002F20",

  // Highlight yellow used for eye-catching CTAs. Mbopo has no equivalent
  // token, so this stays as the existing app-specific accent.
  highlight: "#FACC14",
  highlightMuted: "#FDDF49",

  // Neutral grays for chrome that isn't tied to the brand palette.
  gray700: "#374151",
  gray500: "#6B7280",

  // A lighter step of `primary`, used as the mid stop in the hero gradient.
  // Mapped to Mbopo's `navHover`, the closest "lighter active state of
  // primary" concept it defines.
  primaryLight: "#002F20",
  // Near-black with a hint of green, used as the dark end of the hero gradient.
  heroDeep: "#00120C",

  servicesBackground: "#F5F7FB",

  // Footer gradient: near-black base with a soft green glow at top-center.
  footerDark: "#02110D",
  footerGlow: "#04261A",
} as const;

export type ColorPalette = { [K in keyof typeof colors]: string };
