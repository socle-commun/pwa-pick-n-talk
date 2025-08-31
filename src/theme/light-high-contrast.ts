/**
 * Light theme high contrast variants
 * High contrast versions of all light themes for better accessibility
 */

import {
  lightDefaultTokens,
  lightProtanopiaTokens,
  lightDeuteranopiaTokens,
  lightTritanopiaTokens,
} from "./light-themes";
import type { ColorTokens } from "./types";

// High contrast variants (multiply contrast by ~1.5)
export const lightDefaultHighContrastTokens: ColorTokens = {
  ...lightDefaultTokens,
  text: {
    primary: "rgb(0 0 0)",
    secondary: "rgb(55 65 81)",
    tertiary: "rgb(107 114 128)",
    inverse: "rgb(255 255 255)",
  },
  border: {
    primary: "rgb(156 163 175)",
    secondary: "rgb(209 213 219)",
    focus: "rgb(37 99 235)",
  },
  interactive: {
    ...lightDefaultTokens.interactive,
    primary: "rgb(37 99 235)",
    hover: "rgb(29 78 216)",
    active: "rgb(30 58 138)",
  },
};

export const lightProtanopiaHighContrastTokens: ColorTokens = {
  ...lightProtanopiaTokens,
  ...lightDefaultHighContrastTokens,
  success: {
    ...lightProtanopiaTokens.success,
    primary: "rgb(37 99 235)",
    text: "rgb(30 58 138)",
  },
  error: {
    ...lightProtanopiaTokens.error,
    primary: "rgb(202 138 4)",
    text: "rgb(120 53 15)",
  },
};

export const lightDeuteranopiaHighContrastTokens: ColorTokens = {
  ...lightDeuteranopiaTokens,
  ...lightDefaultHighContrastTokens,
  success: {
    ...lightDeuteranopiaTokens.success,
    primary: "rgb(37 99 235)",
    text: "rgb(30 58 138)",
  },
  error: {
    ...lightDeuteranopiaTokens.error,
    primary: "rgb(147 51 234)",
    text: "rgb(107 33 168)",
  },
};

export const lightTritanopiaHighContrastTokens: ColorTokens = {
  ...lightTritanopiaTokens,
  ...lightDefaultHighContrastTokens,
  warning: {
    ...lightTritanopiaTokens.warning,
    primary: "rgb(220 38 38)",
    text: "rgb(153 27 27)",
  },
  info: {
    ...lightTritanopiaTokens.info,
    primary: "rgb(21 128 61)",
    text: "rgb(22 101 52)",
  },
  interactive: {
    ...lightTritanopiaTokens.interactive,
    primary: "rgb(21 128 61)",
    hover: "rgb(22 101 52)",
    active: "rgb(20 83 45)",
  },
};
