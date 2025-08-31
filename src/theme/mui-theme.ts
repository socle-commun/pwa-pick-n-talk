/**
 * Material UI theme configuration
 * Creates MUI themes using TypeScript color tokens instead of CSS variables
 * Context: Migrated from CSS variables to proper MUI theme structure
 */

import { createTheme } from "@mui/material/styles";
import type { Theme, ThemeOptions } from "@mui/material/styles";

import { getThemeVariantById } from "./theme-variants";
import type { ColorTokens, ThemeVariant } from "./types";

/**
 * Convert custom color tokens to MUI palette
 */
function createMuiPalette(colors: ColorTokens, mode: "light" | "dark") {
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

/**
 * Create a MUI theme from a theme variant
 */
export function createMuiTheme(themeVariant: ThemeVariant): Theme {
  const palette = createMuiPalette(themeVariant.colors, themeVariant.mode);

  const baseTheme: ThemeOptions = {
    palette,
    // Add custom colors and theme variant to theme
    customColors: themeVariant.colors,
    themeVariant,
    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ].join(","),
      // Use design system scale
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.4,
      },
    },
    spacing: 8, // 8px base spacing
    shape: {
      borderRadius: 8,
    },
    components: {
      // Override component styles using theme colors
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${themeVariant.colors.border.secondary}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
            },
          },
        },
      },
    },
  };

  return createTheme(baseTheme);
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
