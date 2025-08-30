/**
 * MUI Theme Configuration
 * 
 * This file creates MUI themes that integrate with the existing theme system
 * while preserving all 16 theme variants (light/dark × 4 daltonism types × normal/high contrast)
 */

import { createTheme, type Theme } from '@mui/material/styles';
import type { DaltonismMode, ThemeMode, FontSize, HighContrastMode } from '@/utils/theme';

export interface ThemeOptions {
  themeMode: ThemeMode;
  daltonismMode: DaltonismMode;
  highContrastMode: HighContrastMode;
  fontSize: FontSize;
}

/**
 * Font size scale mappings (same as existing system)
 */
const FONT_SIZE_SCALES: Record<FontSize, number> = {
  'normal': 1.0,
  'large': 1.125,
  'extra-large': 1.25
};

/**
 * Creates a MUI theme that integrates with our existing theme system
 */
export function createAppTheme(options: ThemeOptions): Theme {
  const { themeMode, fontSize } = options;
  const fontScale = FONT_SIZE_SCALES[fontSize];
  
  // Base theme configuration
  const theme = createTheme({
    palette: {
      mode: themeMode,
      // We'll use CSS variables for colors to maintain compatibility
      // with the existing 16-theme system
      primary: {
        main: 'var(--interactive-primary)',
      },
      secondary: {
        main: 'var(--interactive-secondary)',
      },
      background: {
        default: 'var(--bg-primary)',
        paper: 'var(--bg-secondary)',
      },
      text: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      error: {
        main: 'var(--error-primary)',
      },
      warning: {
        main: 'var(--warning-primary)',
      },
      success: {
        main: 'var(--success-primary)',
      },
    },
    typography: {
      fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14 * fontScale,
      // Scale all font variants by the accessibility scale
      h1: {
        fontSize: `${2.5 * fontScale}rem`,
      },
      h2: {
        fontSize: `${2 * fontScale}rem`,
      },
      h3: {
        fontSize: `${1.75 * fontScale}rem`,
      },
      h4: {
        fontSize: `${1.5 * fontScale}rem`,
      },
      h5: {
        fontSize: `${1.25 * fontScale}rem`,
      },
      h6: {
        fontSize: `${1.125 * fontScale}rem`,
      },
      body1: {
        fontSize: `${1 * fontScale}rem`,
      },
      body2: {
        fontSize: `${0.875 * fontScale}rem`,
      },
    },
    components: {
      // Customize MUI components to match our design system
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // No automatic uppercase
            borderRadius: '0.5rem', // Match our border radius
            fontWeight: 500,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // Use our CSS variables for consistency
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--bg-secondary)',
              '& fieldset': {
                borderColor: 'var(--border-primary)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--border-focus)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--border-focus)',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem',
          },
        },
      },
    },
    // Enable CSS variables mode for better integration
    cssVariables: true,
  });

  return theme;
}