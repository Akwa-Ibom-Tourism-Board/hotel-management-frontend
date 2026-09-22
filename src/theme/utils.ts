// Turns a `#rgb`/`#rrggbb` token into an `rgba(r, g, b, alpha)` string so
// components can express things like "primary at 10% opacity".
export const withAlpha = (hexColor: string, alpha: number): string => {
  const hex = hexColor.replace("#", "");
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  const value = parseInt(full, 16);

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
