/**
 * MUI Theme Provider Integration
 * 
 * This component integrates MUI's ThemeProvider with our existing theme system,
 * preserving all 16 theme variants and accessibility settings.
 */

import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createMuiTheme } from '@/utils/theme/mui-theme';
import { useThemeMode, useDaltonismMode, useFontSize, useHighContrastMode } from '@/utils/theme';

interface AppThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provides MUI theme context that integrates with our existing theme system
 */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { themeMode } = useThemeMode();
  const { daltonismMode } = useDaltonismMode();
  const { scale } = useFontSize(); // Use scale instead of fontSize
  const { highContrastMode } = useHighContrastMode();

  // Create MUI theme based on current settings
  const muiTheme = useMemo(() => {
    return createMuiTheme(
      themeMode,
      daltonismMode,
      highContrastMode,
      scale
    );
  }, [themeMode, daltonismMode, scale, highContrastMode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}