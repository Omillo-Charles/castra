export const colors = {
  // Primary Colors
  primary: {
    white: "#FFFFFF",
    dark: "#000000",
    darkElevated: "#0A0A0A",
  },

  // Brand Accent Colors (extracted from logo.png)
  brand: {
    gold: "#C6A16A",        // Signature Warm Gold
    goldLight: "#FFF2C6",   // Soft Champagne Gold
    goldMuted: "#EED195",   // Light Amber / Sand
    goldDark: "#76532B",    // Deep Bronze
    goldDeep: "#6F4E24",    // Dark Mahogany Accent
  },

  // Surface & Neutral Shades
  surface: {
    light: "#FFFFFF",
    lightMuted: "#FAFAFA",
    dark: "#0A0A0A",
    darkElevated: "#121212",
    darkCard: "#171717",
  },

  // Text Colors
  text: {
    lightPrimary: "#0A0A0A",
    lightSecondary: "#71717A",
    darkPrimary: "#FFFFFF",
    darkSecondary: "#A1A1AA",
    gold: "#C6A16A",
  },

  // Borders
  border: {
    light: "#E4E4E7",
    dark: "#27272A",
    gold: "#C6A16A40",
  },
} as const;

export type ProjectColors = typeof colors;
