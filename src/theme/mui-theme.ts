/**
 * Material UI theme configuration
 * Creates MUI themes using TypeScript color tokens instead of CSS variables
 * Context: Migrated from CSS variables to proper MUI theme structure
 */

import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

import { createMuiPalette } from "./mui-palette";
import { createBaseThemeOptions } from "./mui-theme-options";
import { getThemeVariantById } from "./theme-variants";
import type { ThemeVariant } from "./types";

/**
 * Create a MUI theme from a theme variant
 */
export function createMuiTheme(themeVariant: ThemeVariant): Theme {
  const palette = createMuiPalette(themeVariant.colors, themeVariant.mode);
  const baseOptions = createBaseThemeOptions(themeVariant);

  return createTheme({
    ...baseOptions,
    palette,
  });
}

/**
 * Get the current theme based on theme ID
 */
export function getCurrentTheme(themeId: string): Theme {
  const themeVariant = getThemeVariantById(themeId);
  if (!themeVariant) {
    // Fallback to light default theme
    const fallback = getThemeVariantById("light-default");
    if (!fallback) {
      throw new Error("Default theme not found");
    }
    return createMuiTheme(fallback);
  }
  return createMuiTheme(themeVariant);
}
