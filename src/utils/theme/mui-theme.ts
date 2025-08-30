import { createTheme, alpha } from '@mui/material/styles';
import { ThemeMode, DaltonismMode, HighContrastMode } from '@/types/theme';

// CSS Custom Property Mappings
const getCSSVarColor = (varName: string) => `var(--${varName})`;

// Base theme configuration
const baseThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
};

// Light theme palette using CSS variables
const lightPalette = {
  mode: 'light' as const,
  background: {
    default: getCSSVarColor('bg-primary'),
    paper: getCSSVarColor('bg-secondary'),
  },
  text: {
    primary: getCSSVarColor('text-primary'),
    secondary: getCSSVarColor('text-secondary'),
  },
  primary: {
    main: getCSSVarColor('interactive-primary'),
    dark: getCSSVarColor('interactive-hover'),
  },
  secondary: {
    main: getCSSVarColor('interactive-secondary'),
  },
  error: {
    main: getCSSVarColor('error-primary'),
    light: getCSSVarColor('error-secondary'),
  },
  warning: {
    main: getCSSVarColor('warning-primary'),
    light: getCSSVarColor('warning-secondary'),
  },
  info: {
    main: getCSSVarColor('info-primary'),
    light: getCSSVarColor('info-secondary'),
  },
  success: {
    main: getCSSVarColor('success-primary'),
    light: getCSSVarColor('success-secondary'),
  },
  divider: getCSSVarColor('border-primary'),
  action: {
    hover: alpha(getCSSVarColor('interactive-primary'), 0.04),
    selected: alpha(getCSSVarColor('interactive-primary'), 0.08),
    disabled: getCSSVarColor('interactive-disabled'),
  },
};

// Dark theme palette using CSS variables
const darkPalette = {
  mode: 'dark' as const,
  background: {
    default: getCSSVarColor('bg-primary'),
    paper: getCSSVarColor('bg-secondary'),
  },
  text: {
    primary: getCSSVarColor('text-primary'),
    secondary: getCSSVarColor('text-secondary'),
  },
  primary: {
    main: getCSSVarColor('interactive-primary'),
    dark: getCSSVarColor('interactive-hover'),
  },
  secondary: {
    main: getCSSVarColor('interactive-secondary'),
  },
  error: {
    main: getCSSVarColor('error-primary'),
    light: getCSSVarColor('error-secondary'),
  },
  warning: {
    main: getCSSVarColor('warning-primary'),
    light: getCSSVarColor('warning-secondary'),
  },
  info: {
    main: getCSSVarColor('info-primary'),
    light: getCSSVarColor('info-secondary'),
  },
  success: {
    main: getCSSVarColor('success-primary'),
    light: getCSSVarColor('success-secondary'),
  },
  divider: getCSSVarColor('border-primary'),
  action: {
    hover: alpha(getCSSVarColor('interactive-primary'), 0.08),
    selected: alpha(getCSSVarColor('interactive-primary'), 0.12),
    disabled: getCSSVarColor('interactive-disabled'),
  },
};

// High contrast adjustments
const getHighContrastOverrides = (isHighContrast: boolean, isDark: boolean) => {
  if (!isHighContrast) return {};
  
  return {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderWidth: 2,
            '&:focus': {
              outline: `3px solid ${getCSSVarColor('border-focus')}`,
              outlineOffset: 2,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderWidth: 2,
              '&:focus-within': {
                outline: `3px solid ${getCSSVarColor('border-focus')}`,
                outlineOffset: 2,
              },
            },
          },
        },
      },
    },
  };
};

// Create theme function
export const createMuiTheme = (
  themeMode: ThemeMode,
  daltonismMode: DaltonismMode,
  highContrastMode: HighContrastMode,
  fontSizeMode: number = 1
) => {
  const isDark = themeMode === 'dark';
  const isHighContrast = highContrastMode === 'high-contrast';
  
  const palette = isDark ? darkPalette : lightPalette;
  const highContrastOverrides = getHighContrastOverrides(isHighContrast, isDark);
  
  return createTheme({
    ...baseThemeOptions,
    palette,
    ...highContrastOverrides,
    typography: {
      ...baseThemeOptions.typography,
      fontSize: 14 * fontSizeMode,
      h1: {
        ...baseThemeOptions.typography.h1,
        fontSize: `${2.5 * fontSizeMode}rem`,
      },
      h2: {
        ...baseThemeOptions.typography.h2,
        fontSize: `${2 * fontSizeMode}rem`,
      },
      h3: {
        ...baseThemeOptions.typography.h3,
        fontSize: `${1.75 * fontSizeMode}rem`,
      },
      h4: {
        ...baseThemeOptions.typography.h4,
        fontSize: `${1.5 * fontSizeMode}rem`,
      },
      h5: {
        ...baseThemeOptions.typography.h5,
        fontSize: `${1.25 * fontSizeMode}rem`,
      },
      h6: {
        ...baseThemeOptions.typography.h6,
        fontSize: `${1.125 * fontSizeMode}rem`,
      },
      body1: {
        ...baseThemeOptions.typography.body1,
        fontSize: `${1 * fontSizeMode}rem`,
      },
      body2: {
        ...baseThemeOptions.typography.body2,
        fontSize: `${0.875 * fontSizeMode}rem`,
      },
    },
  });
};

// Default theme
export const defaultTheme = createMuiTheme('light', 'default', 'normal', 1);