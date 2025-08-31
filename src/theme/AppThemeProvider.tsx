/**
 * MUI Theme Provider Integration
 *
 * This component integrates MUI's ThemeProvider with our new TypeScript theme system,
 * preserving all 16 theme variants and accessibility settings.
 */

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import React, { useMemo } from "react";

import { useThemeMode, useDaltonismMode, useHighContrastMode } from "@/utils/theme";

import { getCurrentTheme } from "./mui-theme";

interface AppThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provides MUI theme context that integrates with our new theme system
 */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { themeMode } = useThemeMode();
  const { daltonismMode } = useDaltonismMode();
  const { highContrastMode } = useHighContrastMode();

  // Create theme ID based on current settings
  const themeId = useMemo(() => {
    const mode = themeMode;
    const vision = daltonismMode === "default" ? "default" : daltonismMode;
    const contrast = highContrastMode === "normal" ? "" : "-high";

    return `${mode}-${vision}${contrast}`;
  }, [themeMode, daltonismMode, highContrastMode]);

  // Create MUI theme based on current settings
  const muiTheme = useMemo(() => {
    return getCurrentTheme(themeId);
  }, [themeId]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
