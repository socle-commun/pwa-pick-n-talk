/**
 * Dark theme definitions
 * Dark mode variants for all vision types and contrast levels
 */

import type { ColorTokens } from "./types";

// Dark theme - Default (normal vision)
export const darkDefaultTokens: ColorTokens = {
  bg: {
    primary: "rgb(24 24 27)",
    secondary: "rgb(39 39 42)",
    tertiary: "rgb(63 63 70)",
    overlay: "rgba(0 0 0 / 0.8)",
  },
  text: {
    primary: "rgb(244 244 245)",
    secondary: "rgb(161 161 170)",
    tertiary: "rgb(113 113 122)",
    inverse: "rgb(24 24 27)",
  },
  border: {
    primary: "rgb(63 63 70)",
    secondary: "rgb(39 39 42)",
    focus: "rgb(96 165 250)",
  },
  success: {
    primary: "rgb(34 197 94)",
    secondary: "rgb(22 101 52)",
    text: "rgb(187 247 208)",
    border: "rgb(22 163 74)",
  },
  warning: {
    primary: "rgb(234 179 8)",
    secondary: "rgb(133 77 14)",
    text: "rgb(254 240 138)",
    border: "rgb(202 138 4)",
  },
  error: {
    primary: "rgb(239 68 68)",
    secondary: "rgb(153 27 27)",
    text: "rgb(254 202 202)",
    border: "rgb(220 38 38)",
  },
  info: {
    primary: "rgb(96 165 250)",
    secondary: "rgb(30 58 138)",
    text: "rgb(219 234 254)",
    border: "rgb(59 130 246)",
  },
  feature: {
    primary: {
      primary: "rgb(129 140 248)",
      secondary: "rgb(67 56 202)",
      text: "rgb(238 242 255)",
      border: "rgb(99 102 241)",
    },
    secondary: {
      primary: "rgb(34 197 94)",
      secondary: "rgb(22 101 52)",
      text: "rgb(240 253 244)",
      border: "rgb(22 163 74)",
    },
  },
  privacy: {
    primary: "rgb(96 165 250)",
    secondary: "rgb(30 58 138)",
    text: "rgb(239 246 255)",
    border: "rgb(59 130 246)",
    iconBg: "rgb(30 64 175)",
  },
  interactive: {
    primary: "rgb(96 165 250)",
    secondary: "rgb(148 163 184)",
    hover: "rgb(59 130 246)",
    active: "rgb(37 99 235)",
    disabled: "rgb(71 85 105)",
  },
};

// Dark theme - Protanopia (red-green color blindness)
export const darkProtanopiaTokens: ColorTokens = {
  ...darkDefaultTokens,
  success: {
    primary: "rgb(96 165 250)", // Blue instead of green
    secondary: "rgb(30 58 138)",
    text: "rgb(219 234 254)",
    border: "rgb(59 130 246)",
  },
  error: {
    primary: "rgb(234 179 8)", // Yellow instead of red
    secondary: "rgb(133 77 14)",
    text: "rgb(254 240 138)",
    border: "rgb(202 138 4)",
  },
  interactive: {
    ...darkDefaultTokens.interactive,
    primary: "rgb(96 165 250)", // Stay blue
  },
};

// Dark theme - Deuteranopia (red-green color blindness, most common)
export const darkDeuteranopiaTokens: ColorTokens = {
  ...darkDefaultTokens,
  success: {
    primary: "rgb(96 165 250)", // Blue instead of green
    secondary: "rgb(30 58 138)",
    text: "rgb(219 234 254)",
    border: "rgb(59 130 246)",
  },
  error: {
    primary: "rgb(196 181 253)", // Purple instead of red
    secondary: "rgb(126 34 206)",
    text: "rgb(243 232 255)",
    border: "rgb(168 85 247)",
  },
  interactive: {
    ...darkDefaultTokens.interactive,
    primary: "rgb(96 165 250)", // Stay blue
  },
};

// Dark theme - Tritanopia (blue-yellow color blindness)
export const darkTritanopiaTokens: ColorTokens = {
  ...darkDefaultTokens,
  warning: {
    primary: "rgb(239 68 68)", // Red instead of yellow
    secondary: "rgb(153 27 27)",
    text: "rgb(254 202 202)",
    border: "rgb(220 38 38)",
  },
  info: {
    primary: "rgb(34 197 94)", // Green instead of blue
    secondary: "rgb(22 101 52)",
    text: "rgb(187 247 208)",
    border: "rgb(22 163 74)",
  },
  interactive: {
    ...darkDefaultTokens.interactive,
    primary: "rgb(34 197 94)", // Green instead of blue
    hover: "rgb(22 163 74)",
    active: "rgb(21 128 61)",
  },
};
