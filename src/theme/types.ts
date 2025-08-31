/**
 * Theme types for Material UI custom theming
 * Defines color schemes for different vision types and contrast levels
 */

export type VisionType = "normal" | "protanopia" | "deuteranopia" | "tritanopia";
export type ContrastLevel = "normal" | "high";
export type ColorMode = "light" | "dark";

export interface ColorTokens {
  // Background colors
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
    overlay: string;
  };

  // Text colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };

  // Border colors
  border: {
    primary: string;
    secondary: string;
    focus: string;
  };

  // Semantic colors
  success: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
  };

  warning: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
  };

  error: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
  };

  info: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
  };

  // Feature colors (for onboarding highlights)
  feature: {
    primary: {
      primary: string;
      secondary: string;
      text: string;
      border: string;
    };
    secondary: {
      primary: string;
      secondary: string;
      text: string;
      border: string;
    };
  };

  // Privacy colors (for data protection info)
  privacy: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
    iconBg: string;
  };

  // Interactive colors
  interactive: {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
    disabled: string;
  };
}

export interface ThemeVariant {
  id: string;
  name: string;
  mode: ColorMode;
  visionType: VisionType;
  contrast: ContrastLevel;
  colors: ColorTokens;
}

// Augment MUI theme type
declare module "@mui/material/styles" {
  interface Theme {
    customColors: ColorTokens;
    themeVariant: ThemeVariant;
  }

  interface ThemeOptions {
    customColors?: ColorTokens;
    themeVariant?: ThemeVariant;
  }
}
