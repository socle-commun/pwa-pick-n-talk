/**
 * @file src/theme/mui-palette.ts
 * @description MUI palette creation from color tokens
 */

import type { ColorTokens } from "./types";

/**
 * Convert custom color tokens to MUI palette
 */
export function createMuiPalette(colors: ColorTokens, mode: "light" | "dark") {
  return {
    mode,
    primary: {
      main: colors.interactive.primary,
      light: colors.interactive.hover,
      dark: colors.interactive.active,
      contrastText: mode === "light" ? colors.text.inverse : colors.text.primary,
    },
    secondary: {
      main: colors.interactive.secondary,
      light: colors.text.secondary,
      dark: colors.text.tertiary,
      contrastText: colors.text.primary,
    },
    error: {
      main: colors.error.primary,
      light: colors.error.secondary,
      dark: colors.error.text,
      contrastText: colors.text.inverse,
    },
    warning: {
      main: colors.warning.primary,
      light: colors.warning.secondary,
      dark: colors.warning.text,
      contrastText: colors.text.inverse,
    },
    info: {
      main: colors.info.primary,
      light: colors.info.secondary,
      dark: colors.info.text,
      contrastText: colors.text.inverse,
    },
    success: {
      main: colors.success.primary,
      light: colors.success.secondary,
      dark: colors.success.text,
      contrastText: colors.text.inverse,
    },
    background: {
      default: colors.bg.primary,
      paper: colors.bg.secondary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.tertiary,
    },
    divider: colors.border.primary,
    action: {
      active: colors.interactive.primary,
      hover: colors.interactive.hover,
      selected: colors.interactive.active,
      disabled: colors.interactive.disabled,
      disabledBackground: colors.bg.tertiary,
    },
  };
}
