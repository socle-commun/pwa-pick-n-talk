/**
 * @file src/theme/mui-theme-options.ts
 * @description Base theme options and component overrides for MUI
 */

import type { ThemeOptions } from "@mui/material/styles";

import type { ThemeVariant } from "./types";

/**
 * Create base theme options with typography and component overrides
 */
export function createBaseThemeOptions(themeVariant: ThemeVariant): ThemeOptions {
  return {
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
}
