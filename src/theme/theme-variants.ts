/**
 * All theme variants collection
 * Centralizes all light and dark theme variants for the application
 */

import {
  darkDefaultHighContrastTokens,
  darkProtanopiaHighContrastTokens,
  darkDeuteranopiaHighContrastTokens,
  darkTritanopiaHighContrastTokens,
} from "./dark-high-contrast";
import {
  darkDefaultTokens,
  darkProtanopiaTokens,
  darkDeuteranopiaTokens,
  darkTritanopiaTokens,
} from "./dark-themes";
import {
  lightDefaultHighContrastTokens,
  lightProtanopiaHighContrastTokens,
  lightDeuteranopiaHighContrastTokens,
  lightTritanopiaHighContrastTokens,
} from "./light-high-contrast";
import {
  lightDefaultTokens,
  lightProtanopiaTokens,
  lightDeuteranopiaTokens,
  lightTritanopiaTokens,
} from "./light-themes";
import type { ThemeVariant } from "./types";

// All theme variants
export const allThemeVariants: ThemeVariant[] = [
  // Light themes
  {
    id: "light-default",
    name: "Light Default",
    mode: "light",
    visionType: "normal",
    contrast: "normal",
    colors: lightDefaultTokens,
  },
  {
    id: "light-protanopia",
    name: "Light Protanopia",
    mode: "light",
    visionType: "protanopia",
    contrast: "normal",
    colors: lightProtanopiaTokens,
  },
  {
    id: "light-deuteranopia",
    name: "Light Deuteranopia",
    mode: "light",
    visionType: "deuteranopia",
    contrast: "normal",
    colors: lightDeuteranopiaTokens,
  },
  {
    id: "light-tritanopia",
    name: "Light Tritanopia",
    mode: "light",
    visionType: "tritanopia",
    contrast: "normal",
    colors: lightTritanopiaTokens,
  },
  {
    id: "light-default-high",
    name: "Light Default High Contrast",
    mode: "light",
    visionType: "normal",
    contrast: "high",
    colors: lightDefaultHighContrastTokens,
  },
  {
    id: "light-protanopia-high",
    name: "Light Protanopia High Contrast",
    mode: "light",
    visionType: "protanopia",
    contrast: "high",
    colors: lightProtanopiaHighContrastTokens,
  },
  {
    id: "light-deuteranopia-high",
    name: "Light Deuteranopia High Contrast",
    mode: "light",
    visionType: "deuteranopia",
    contrast: "high",
    colors: lightDeuteranopiaHighContrastTokens,
  },
  {
    id: "light-tritanopia-high",
    name: "Light Tritanopia High Contrast",
    mode: "light",
    visionType: "tritanopia",
    contrast: "high",
    colors: lightTritanopiaHighContrastTokens,
  },
  // Dark themes
  {
    id: "dark-default",
    name: "Dark Default",
    mode: "dark",
    visionType: "normal",
    contrast: "normal",
    colors: darkDefaultTokens,
  },
  {
    id: "dark-protanopia",
    name: "Dark Protanopia",
    mode: "dark",
    visionType: "protanopia",
    contrast: "normal",
    colors: darkProtanopiaTokens,
  },
  {
    id: "dark-deuteranopia",
    name: "Dark Deuteranopia",
    mode: "dark",
    visionType: "deuteranopia",
    contrast: "normal",
    colors: darkDeuteranopiaTokens,
  },
  {
    id: "dark-tritanopia",
    name: "Dark Tritanopia",
    mode: "dark",
    visionType: "tritanopia",
    contrast: "normal",
    colors: darkTritanopiaTokens,
  },
  {
    id: "dark-default-high",
    name: "Dark Default High Contrast",
    mode: "dark",
    visionType: "normal",
    contrast: "high",
    colors: darkDefaultHighContrastTokens,
  },
  {
    id: "dark-protanopia-high",
    name: "Dark Protanopia High Contrast",
    mode: "dark",
    visionType: "protanopia",
    contrast: "high",
    colors: darkProtanopiaHighContrastTokens,
  },
  {
    id: "dark-deuteranopia-high",
    name: "Dark Deuteranopia High Contrast",
    mode: "dark",
    visionType: "deuteranopia",
    contrast: "high",
    colors: darkDeuteranopiaHighContrastTokens,
  },
  {
    id: "dark-tritanopia-high",
    name: "Dark Tritanopia High Contrast",
    mode: "dark",
    visionType: "tritanopia",
    contrast: "high",
    colors: darkTritanopiaHighContrastTokens,
  },
];

// Helper function to get theme by ID
export function getThemeVariantById(id: string): ThemeVariant | undefined {
  return allThemeVariants.find((variant) => variant.id === id);
}

// Helper function to get themes by criteria
export function getThemeVariants(
  mode?: "light" | "dark",
  visionType?: "normal" | "protanopia" | "deuteranopia" | "tritanopia",
  contrast?: "normal" | "high",
): ThemeVariant[] {
  return allThemeVariants.filter((variant) => {
    return (
      (!mode || variant.mode === mode) &&
      (!visionType || variant.visionType === visionType) &&
      (!contrast || variant.contrast === contrast)
    );
  });
}
