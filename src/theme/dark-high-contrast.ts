/**
 * Dark theme high contrast variants
 * High contrast versions of all dark themes for better accessibility
 */

import {
  darkDefaultTokens,
  darkProtanopiaTokens,
  darkDeuteranopiaTokens,
  darkTritanopiaTokens,
} from "./dark-themes";
import type { ColorTokens } from "./types";

// Dark high contrast variants
export const darkDefaultHighContrastTokens: ColorTokens = {
  ...darkDefaultTokens,
  text: {
    primary: "rgb(255 255 255)",
    secondary: "rgb(209 213 219)",
    tertiary: "rgb(156 163 175)",
    inverse: "rgb(0 0 0)",
  },
  border: {
    primary: "rgb(107 114 128)",
    secondary: "rgb(75 85 99)",
    focus: "rgb(59 130 246)",
  },
  interactive: {
    ...darkDefaultTokens.interactive,
    primary: "rgb(59 130 246)",
    hover: "rgb(37 99 235)",
    active: "rgb(29 78 216)",
  },
};

export const darkProtanopiaHighContrastTokens: ColorTokens = {
  ...darkProtanopiaTokens,
  ...darkDefaultHighContrastTokens,
  success: {
    ...darkProtanopiaTokens.success,
    primary: "rgb(59 130 246)",
    text: "rgb(191 219 254)",
  },
  error: {
    ...darkProtanopiaTokens.error,
    primary: "rgb(245 158 11)",
    text: "rgb(253 230 138)",
  },
};

export const darkDeuteranopiaHighContrastTokens: ColorTokens = {
  ...darkDeuteranopiaTokens,
  ...darkDefaultHighContrastTokens,
  success: {
    ...darkDeuteranopiaTokens.success,
    primary: "rgb(59 130 246)",
    text: "rgb(191 219 254)",
  },
  error: {
    ...darkDeuteranopiaTokens.error,
    primary: "rgb(168 85 247)",
    text: "rgb(221 214 254)",
  },
};

export const darkTritanopiaHighContrastTokens: ColorTokens = {
  ...darkTritanopiaTokens,
  ...darkDefaultHighContrastTokens,
  warning: {
    ...darkTritanopiaTokens.warning,
    primary: "rgb(248 113 113)",
    text: "rgb(254 226 226)",
  },
  info: {
    ...darkTritanopiaTokens.info,
    primary: "rgb(34 197 94)",
    text: "rgb(187 247 208)",
  },
  interactive: {
    ...darkTritanopiaTokens.interactive,
    primary: "rgb(34 197 94)",
    hover: "rgb(22 163 74)",
    active: "rgb(21 128 61)",
  },
};
