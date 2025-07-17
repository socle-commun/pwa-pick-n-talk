export type ThemeMode = 'light' | 'dark';

export type DaltonismType = 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';

export type ThemeVariant = 'normal' | 'high-contrast';

export interface ThemeConfig {
  mode: ThemeMode;
  daltonism: DaltonismType;
  variant: ThemeVariant;
}

export const THEME_MODES: ThemeMode[] = ['light', 'dark'];

export const DALTONISM_TYPES: DaltonismType[] = ['default', 'protanopia', 'deuteranopia', 'tritanopia'];

export const THEME_VARIANTS: ThemeVariant[] = ['normal', 'high-contrast'];

export const DEFAULT_THEME: ThemeConfig = {
  mode: 'light',
  daltonism: 'default',
  variant: 'normal'
};

/**
 * Generate CSS class names for theme configuration
 */
export function getThemeClassName(config: ThemeConfig): string {
  const classes: string[] = [];
  
  // Base theme mode
  if (config.mode === 'dark') {
    classes.push('dark');
  }
  
  // Daltonism variant
  if (config.daltonism !== 'default') {
    classes.push(`theme-${config.mode}-${config.daltonism}`);
  }
  
  // High contrast variant
  if (config.variant === 'high-contrast') {
    classes.push('theme-high-contrast');
  }
  
  return classes.join(' ');
}

/**
 * Get theme display name for UI
 */
export function getThemeDisplayName(config: ThemeConfig): string {
  const parts: string[] = [];
  
  // Base mode
  parts.push(config.mode === 'dark' ? 'Dark' : 'Light');
  
  // Daltonism type
  switch (config.daltonism) {
    case 'protanopia':
      parts.push('Protanopia');
      break;
    case 'deuteranopia':
      parts.push('Deuteranopia');
      break;
    case 'tritanopia':
      parts.push('Tritanopia');
      break;
    default:
      // Don't add anything for default
      break;
  }
  
  // Variant
  if (config.variant === 'high-contrast') {
    parts.push('High Contrast');
  }
  
  return parts.join(' ');
}

/**
 * Get all available theme configurations
 */
export function getAllThemeConfigs(): ThemeConfig[] {
  const configs: ThemeConfig[] = [];
  
  for (const mode of THEME_MODES) {
    for (const daltonism of DALTONISM_TYPES) {
      for (const variant of THEME_VARIANTS) {
        configs.push({ mode, daltonism, variant });
      }
    }
  }
  
  return configs;
}

/**
 * Parse theme configuration from string
 */
export function parseThemeConfig(configString: string): ThemeConfig {
  try {
    const parsed = JSON.parse(configString);
    return {
      mode: THEME_MODES.includes(parsed.mode) ? parsed.mode : DEFAULT_THEME.mode,
      daltonism: DALTONISM_TYPES.includes(parsed.daltonism) ? parsed.daltonism : DEFAULT_THEME.daltonism,
      variant: THEME_VARIANTS.includes(parsed.variant) ? parsed.variant : DEFAULT_THEME.variant
    };
  } catch {
    return DEFAULT_THEME;
  }
}

/**
 * Serialize theme configuration to string
 */
export function serializeThemeConfig(config: ThemeConfig): string {
  return JSON.stringify(config);
}

/**
 * Check if theme configuration is valid
 */
export function isValidThemeConfig(config: any): config is ThemeConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    THEME_MODES.includes(config.mode) &&
    DALTONISM_TYPES.includes(config.daltonism) &&
    THEME_VARIANTS.includes(config.variant)
  );
}

/**
 * Detect preferred theme from system
 */
export function detectPreferredTheme(): ThemeConfig {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
  
  return {
    mode: prefersDark ? 'dark' : 'light',
    daltonism: 'default',
    variant: prefersHighContrast ? 'high-contrast' : 'normal'
  };
}

/**
 * Apply theme to document
 */
export function applyTheme(config: ThemeConfig): void {
  const html = document.documentElement;
  
  // Remove all existing theme classes
  html.classList.remove(
    'dark',
    'theme-light-protanopia',
    'theme-light-deuteranopia',
    'theme-light-tritanopia',
    'theme-dark-protanopia',
    'theme-dark-deuteranopia',
    'theme-dark-tritanopia',
    'theme-high-contrast'
  );
  
  // Apply new theme classes
  const themeClass = getThemeClassName(config);
  if (themeClass) {
    html.classList.add(...themeClass.split(' '));
  }
}

/**
 * Get CSS variables for current theme
 */
export function getThemeVariables(): Record<string, string> {
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    // Background colors
    'theme-bg-primary': computedStyle.getPropertyValue('--theme-bg-primary').trim(),
    'theme-bg-secondary': computedStyle.getPropertyValue('--theme-bg-secondary').trim(),
    'theme-bg-tertiary': computedStyle.getPropertyValue('--theme-bg-tertiary').trim(),
    'theme-bg-overlay': computedStyle.getPropertyValue('--theme-bg-overlay').trim(),
    
    // Text colors
    'theme-text-primary': computedStyle.getPropertyValue('--theme-text-primary').trim(),
    'theme-text-secondary': computedStyle.getPropertyValue('--theme-text-secondary').trim(),
    'theme-text-tertiary': computedStyle.getPropertyValue('--theme-text-tertiary').trim(),
    'theme-text-inverse': computedStyle.getPropertyValue('--theme-text-inverse').trim(),
    
    // Border colors
    'theme-border-primary': computedStyle.getPropertyValue('--theme-border-primary').trim(),
    'theme-border-secondary': computedStyle.getPropertyValue('--theme-border-secondary').trim(),
    'theme-border-focus': computedStyle.getPropertyValue('--theme-border-focus').trim(),
    
    // Semantic colors
    'theme-success-primary': computedStyle.getPropertyValue('--theme-success-primary').trim(),
    'theme-success-secondary': computedStyle.getPropertyValue('--theme-success-secondary').trim(),
    'theme-success-text': computedStyle.getPropertyValue('--theme-success-text').trim(),
    'theme-success-border': computedStyle.getPropertyValue('--theme-success-border').trim(),
    
    'theme-warning-primary': computedStyle.getPropertyValue('--theme-warning-primary').trim(),
    'theme-warning-secondary': computedStyle.getPropertyValue('--theme-warning-secondary').trim(),
    'theme-warning-text': computedStyle.getPropertyValue('--theme-warning-text').trim(),
    'theme-warning-border': computedStyle.getPropertyValue('--theme-warning-border').trim(),
    
    'theme-error-primary': computedStyle.getPropertyValue('--theme-error-primary').trim(),
    'theme-error-secondary': computedStyle.getPropertyValue('--theme-error-secondary').trim(),
    'theme-error-text': computedStyle.getPropertyValue('--theme-error-text').trim(),
    'theme-error-border': computedStyle.getPropertyValue('--theme-error-border').trim(),
    
    'theme-info-primary': computedStyle.getPropertyValue('--theme-info-primary').trim(),
    'theme-info-secondary': computedStyle.getPropertyValue('--theme-info-secondary').trim(),
    'theme-info-text': computedStyle.getPropertyValue('--theme-info-text').trim(),
    'theme-info-border': computedStyle.getPropertyValue('--theme-info-border').trim(),
    
    // Interactive colors
    'theme-interactive-primary': computedStyle.getPropertyValue('--theme-interactive-primary').trim(),
    'theme-interactive-secondary': computedStyle.getPropertyValue('--theme-interactive-secondary').trim(),
    'theme-interactive-hover': computedStyle.getPropertyValue('--theme-interactive-hover').trim(),
    'theme-interactive-active': computedStyle.getPropertyValue('--theme-interactive-active').trim(),
    'theme-interactive-disabled': computedStyle.getPropertyValue('--theme-interactive-disabled').trim(),
  };
}