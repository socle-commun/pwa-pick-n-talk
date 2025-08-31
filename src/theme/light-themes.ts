/**
 * Light theme definitions - Base tokens
 * Replaces CSS theme files with TypeScript theme definitions
 */

import type { ColorTokens } from "./types";

// Light theme - Default (normal vision)
export const lightDefaultTokens: ColorTokens = {
  bg: {
    primary: "rgb(244 244 245)",
    secondary: "rgb(255 255 255)",
    tertiary: "rgb(250 250 250)",
    overlay: "rgba(0 0 0 / 0.1)",
  },
  text: {
    primary: "rgb(24 24 27)",
    secondary: "rgb(82 82 91)",
    tertiary: "rgb(161 161 170)",
    inverse: "rgb(255 255 255)",
  },
  border: {
    primary: "rgb(228 228 231)",
    secondary: "rgb(244 244 245)",
    focus: "rgb(59 130 246)",
  },
  success: {
    primary: "rgb(34 197 94)",
    secondary: "rgb(187 247 208)",
    text: "rgb(21 128 61)",
    border: "rgb(134 239 172)",
  },
  warning: {
    primary: "rgb(234 179 8)",
    secondary: "rgb(254 240 138)",
    text: "rgb(133 77 14)",
    border: "rgb(253 224 71)",
  },
  error: {
    primary: "rgb(239 68 68)",
    secondary: "rgb(254 202 202)",
    text: "rgb(185 28 28)",
    border: "rgb(252 165 165)",
  },
  info: {
    primary: "rgb(59 130 246)",
    secondary: "rgb(219 234 254)",
    text: "rgb(30 64 175)",
    border: "rgb(147 197 253)",
  },
  feature: {
    primary: {
      primary: "rgb(99 102 241)",
      secondary: "rgb(238 242 255)",
      text: "rgb(67 56 202)",
      border: "rgb(196 181 253)",
    },
    secondary: {
      primary: "rgb(34 197 94)",
      secondary: "rgb(240 253 244)",
      text: "rgb(21 128 61)",
      border: "rgb(187 247 208)",
    },
  },
  privacy: {
    primary: "rgb(59 130 246)",
    secondary: "rgb(239 246 255)",
    text: "rgb(30 64 175)",
    border: "rgb(191 219 254)",
    iconBg: "rgb(219 234 254)",
  },
  interactive: {
    primary: "rgb(59 130 246)",
    secondary: "rgb(100 116 139)",
    hover: "rgb(37 99 235)",
    active: "rgb(29 78 216)",
    disabled: "rgb(148 163 184)",
  },
};

// Light theme - Protanopia (red-green color blindness)
export const lightProtanopiaTokens: ColorTokens = {
  ...lightDefaultTokens,
  success: {
    primary: "rgb(59 130 246)", // Blue instead of green
    secondary: "rgb(219 234 254)",
    text: "rgb(30 64 175)",
    border: "rgb(147 197 253)",
  },
  error: {
    primary: "rgb(234 179 8)", // Yellow instead of red
    secondary: "rgb(254 240 138)",
    text: "rgb(133 77 14)",
    border: "rgb(253 224 71)",
  },
  interactive: {
    ...lightDefaultTokens.interactive,
    primary: "rgb(59 130 246)", // Stay blue
  },
};

// Light theme - Deuteranopia (red-green color blindness, most common)
export const lightDeuteranopiaTokens: ColorTokens = {
  ...lightDefaultTokens,
  success: {
    primary: "rgb(59 130 246)", // Blue instead of green
    secondary: "rgb(219 234 254)",
    text: "rgb(30 64 175)",
    border: "rgb(147 197 253)",
  },
  error: {
    primary: "rgb(168 85 247)", // Purple instead of red
    secondary: "rgb(243 232 255)",
    text: "rgb(126 34 206)",
    border: "rgb(221 214 254)",
  },
  interactive: {
    ...lightDefaultTokens.interactive,
    primary: "rgb(59 130 246)", // Stay blue
  },
};

// Light theme - Tritanopia (blue-yellow color blindness)
export const lightTritanopiaTokens: ColorTokens = {
  ...lightDefaultTokens,
  warning: {
    primary: "rgb(239 68 68)", // Red instead of yellow
    secondary: "rgb(254 202 202)",
    text: "rgb(185 28 28)",
    border: "rgb(252 165 165)",
  },
  info: {
    primary: "rgb(34 197 94)", // Green instead of blue
    secondary: "rgb(187 247 208)",
    text: "rgb(21 128 61)",
    border: "rgb(134 239 172)",
  },
  interactive: {
    ...lightDefaultTokens.interactive,
    primary: "rgb(34 197 94)", // Green instead of blue
    hover: "rgb(21 128 61)",
    active: "rgb(22 101 52)",
  },
};
