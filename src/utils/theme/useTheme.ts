import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { 
  type ThemeConfig, 
  DEFAULT_THEME, 
  applyTheme, 
  detectPreferredTheme, 
  parseThemeConfig, 
  serializeThemeConfig,
  isValidThemeConfig
} from './types';

// Theme configuration atom with localStorage persistence
const themeConfigAtom = atomWithStorage<ThemeConfig>('theme-config', DEFAULT_THEME, {
  getItem: (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = parseThemeConfig(stored);
        return isValidThemeConfig(parsed) ? parsed : DEFAULT_THEME;
      }
      return detectPreferredTheme();
    } catch {
      return DEFAULT_THEME;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, serializeThemeConfig(value));
    } catch {
      // Ignore localStorage errors
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore localStorage errors
    }
  }
});

/**
 * Hook for managing theme configuration
 */
export function useTheme() {
  const [themeConfig, setThemeConfig] = useAtom(themeConfigAtom);
  const [isReady, setIsReady] = useState(false);

  // Apply theme to document when configuration changes
  useEffect(() => {
    applyTheme(themeConfig);
    setIsReady(true);
  }, [themeConfig]);

  // Listen for system theme changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleSystemThemeChange = () => {
      // Only update if user hasn't set a custom theme
      const currentConfig = themeConfig;
      if (currentConfig.mode === 'light' && currentConfig.variant === 'normal' && currentConfig.daltonism === 'default') {
        const preferredTheme = detectPreferredTheme();
        setThemeConfig(preferredTheme);
      }
    };

    darkModeQuery.addEventListener('change', handleSystemThemeChange);
    highContrastQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleSystemThemeChange);
      highContrastQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeConfig, setThemeConfig]);

  return {
    themeConfig,
    setThemeConfig,
    isReady,
    
    // Convenience methods
    setThemeMode: (mode: ThemeConfig['mode']) => {
      setThemeConfig(prev => ({ ...prev, mode }));
    },
    
    setDaltonism: (daltonism: ThemeConfig['daltonism']) => {
      setThemeConfig(prev => ({ ...prev, daltonism }));
    },
    
    setVariant: (variant: ThemeConfig['variant']) => {
      setThemeConfig(prev => ({ ...prev, variant }));
    },
    
    toggleThemeMode: () => {
      setThemeConfig(prev => ({ 
        ...prev, 
        mode: prev.mode === 'light' ? 'dark' : 'light' 
      }));
    },
    
    toggleHighContrast: () => {
      setThemeConfig(prev => ({ 
        ...prev, 
        variant: prev.variant === 'normal' ? 'high-contrast' : 'normal' 
      }));
    },
    
    resetToDefault: () => {
      setThemeConfig(DEFAULT_THEME);
    },
    
    resetToSystemPreferred: () => {
      setThemeConfig(detectPreferredTheme());
    }
  };
}

/**
 * Hook for getting current theme variables
 */
export function useThemeVariables() {
  const { themeConfig, isReady } = useTheme();
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isReady) return;

    const updateVariables = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      
      const newVariables: Record<string, string> = {
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
      
      setVariables(newVariables);
    };

    updateVariables();
  }, [themeConfig, isReady]);

  return variables;
}

/**
 * Hook for detecting if user prefers dark mode
 */
export function usePrefersDarkMode(): boolean {
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersDark;
}

/**
 * Hook for detecting if user prefers high contrast
 */
export function usePrefersHighContrast(): boolean {
  const [prefersHighContrast, setPrefersHighContrast] = useState(
    () => window.matchMedia('(prefers-contrast: high)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersHighContrast;
}

/**
 * Hook for detecting if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

export default useTheme;