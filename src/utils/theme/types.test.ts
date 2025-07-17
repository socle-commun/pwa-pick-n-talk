import { vi, describe, it, expect } from 'vitest';

import { 
  ThemeConfig, 
  DEFAULT_THEME, 
  getThemeClassName, 
  getThemeDisplayName, 
  getAllThemeConfigs, 
  parseThemeConfig, 
  serializeThemeConfig, 
  isValidThemeConfig,
  detectPreferredTheme,
  applyTheme
} from './types';

describe('Theme Types', () => {
  describe('getThemeClassName', () => {
    it('should return empty string for light default normal theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'default', variant: 'normal' };
      expect(getThemeClassName(config)).toBe('');
    });

    it('should return "dark" for dark default normal theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'default', variant: 'normal' };
      expect(getThemeClassName(config)).toBe('dark');
    });

    it('should return correct class for light protanopia theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'protanopia', variant: 'normal' };
      expect(getThemeClassName(config)).toBe('theme-light-protanopia');
    });

    it('should return correct class for dark deuteranopia theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'deuteranopia', variant: 'normal' };
      expect(getThemeClassName(config)).toBe('dark theme-dark-deuteranopia');
    });

    it('should return correct class for high contrast theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'default', variant: 'high-contrast' };
      expect(getThemeClassName(config)).toBe('theme-high-contrast');
    });

    it('should return correct class for dark high contrast protanopia theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'protanopia', variant: 'high-contrast' };
      expect(getThemeClassName(config)).toBe('dark theme-dark-protanopia theme-high-contrast');
    });
  });

  describe('getThemeDisplayName', () => {
    it('should return "Light" for light default normal theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'default', variant: 'normal' };
      expect(getThemeDisplayName(config)).toBe('Light');
    });

    it('should return "Dark" for dark default normal theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'default', variant: 'normal' };
      expect(getThemeDisplayName(config)).toBe('Dark');
    });

    it('should return "Light Protanopia" for light protanopia theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'protanopia', variant: 'normal' };
      expect(getThemeDisplayName(config)).toBe('Light Protanopia');
    });

    it('should return "Dark Deuteranopia High Contrast" for dark deuteranopia high contrast theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'deuteranopia', variant: 'high-contrast' };
      expect(getThemeDisplayName(config)).toBe('Dark Deuteranopia High Contrast');
    });

    it('should return "Light High Contrast" for light high contrast theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'default', variant: 'high-contrast' };
      expect(getThemeDisplayName(config)).toBe('Light High Contrast');
    });
  });

  describe('getAllThemeConfigs', () => {
    it('should return all 16 theme configurations', () => {
      const configs = getAllThemeConfigs();
      expect(configs).toHaveLength(16); // 2 modes × 4 daltonism × 2 variants
    });

    it('should include all mode combinations', () => {
      const configs = getAllThemeConfigs();
      const modes = [...new Set(configs.map(c => c.mode))];
      expect(modes).toEqual(['light', 'dark']);
    });

    it('should include all daltonism combinations', () => {
      const configs = getAllThemeConfigs();
      const daltonismTypes = [...new Set(configs.map(c => c.daltonism))];
      expect(daltonismTypes).toEqual(['default', 'protanopia', 'deuteranopia', 'tritanopia']);
    });

    it('should include all variant combinations', () => {
      const configs = getAllThemeConfigs();
      const variants = [...new Set(configs.map(c => c.variant))];
      expect(variants).toEqual(['normal', 'high-contrast']);
    });
  });

  describe('parseThemeConfig', () => {
    it('should parse valid theme config', () => {
      const configString = '{"mode":"dark","daltonism":"protanopia","variant":"high-contrast"}';
      const parsed = parseThemeConfig(configString);
      expect(parsed).toEqual({ mode: 'dark', daltonism: 'protanopia', variant: 'high-contrast' });
    });

    it('should return default theme for invalid JSON', () => {
      const configString = 'invalid json';
      const parsed = parseThemeConfig(configString);
      expect(parsed).toEqual(DEFAULT_THEME);
    });

    it('should return default theme for missing properties', () => {
      const configString = '{"mode":"dark"}';
      const parsed = parseThemeConfig(configString);
      // The parsing should use default values for missing properties
      expect(parsed.mode).toBe('dark');
      expect(parsed.daltonism).toBe('default');
      expect(parsed.variant).toBe('normal');
    });

    it('should return default theme for invalid values', () => {
      const configString = '{"mode":"invalid","daltonism":"invalid","variant":"invalid"}';
      const parsed = parseThemeConfig(configString);
      expect(parsed).toEqual(DEFAULT_THEME);
    });
  });

  describe('serializeThemeConfig', () => {
    it('should serialize theme config to JSON string', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'protanopia', variant: 'high-contrast' };
      const serialized = serializeThemeConfig(config);
      expect(serialized).toBe('{"mode":"dark","daltonism":"protanopia","variant":"high-contrast"}');
    });
  });

  describe('isValidThemeConfig', () => {
    it('should return true for valid theme config', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'protanopia', variant: 'high-contrast' };
      expect(isValidThemeConfig(config)).toBe(true);
    });

    it('should return false for null', () => {
      expect(isValidThemeConfig(null)).toBe(false);
    });

    it('should return false for invalid mode', () => {
      const config = { mode: 'invalid', daltonism: 'default', variant: 'normal' };
      expect(isValidThemeConfig(config)).toBe(false);
    });

    it('should return false for invalid daltonism', () => {
      const config = { mode: 'light', daltonism: 'invalid', variant: 'normal' };
      expect(isValidThemeConfig(config)).toBe(false);
    });

    it('should return false for invalid variant', () => {
      const config = { mode: 'light', daltonism: 'default', variant: 'invalid' };
      expect(isValidThemeConfig(config)).toBe(false);
    });

    it('should return false for missing properties', () => {
      const config = { mode: 'light', daltonism: 'default' };
      expect(isValidThemeConfig(config)).toBe(false);
    });
  });

  describe('detectPreferredTheme', () => {
    it('should detect dark theme when user prefers dark', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const preferred = detectPreferredTheme();
      expect(preferred.mode).toBe('dark');
      expect(preferred.daltonism).toBe('default');
      expect(preferred.variant).toBe('normal');
    });

    it('should detect high contrast theme when user prefers high contrast', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const preferred = detectPreferredTheme();
      expect(preferred.mode).toBe('light');
      expect(preferred.daltonism).toBe('default');
      expect(preferred.variant).toBe('high-contrast');
    });

    it('should detect light normal theme by default', () => {
      // Mock matchMedia
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const preferred = detectPreferredTheme();
      expect(preferred).toEqual({ mode: 'light', daltonism: 'default', variant: 'normal' });
    });
  });

  describe('applyTheme', () => {
    beforeEach(() => {
      // Mock document.documentElement
      document.documentElement.classList.remove = vi.fn();
      document.documentElement.classList.add = vi.fn();
    });

    it('should remove all existing theme classes', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'default', variant: 'normal' };
      applyTheme(config);
      
      expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
        'dark',
        'theme-light-protanopia',
        'theme-light-deuteranopia',
        'theme-light-tritanopia',
        'theme-dark-protanopia',
        'theme-dark-deuteranopia',
        'theme-dark-tritanopia',
        'theme-high-contrast'
      );
    });

    it('should add dark class for dark theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'default', variant: 'normal' };
      applyTheme(config);
      
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('should add daltonism classes', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'protanopia', variant: 'normal' };
      applyTheme(config);
      
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('theme-light-protanopia');
    });

    it('should add multiple classes for complex theme', () => {
      const config: ThemeConfig = { mode: 'dark', daltonism: 'protanopia', variant: 'high-contrast' };
      applyTheme(config);
      
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark', 'theme-dark-protanopia', 'theme-high-contrast');
    });

    it('should not add any classes for light default normal theme', () => {
      const config: ThemeConfig = { mode: 'light', daltonism: 'default', variant: 'normal' };
      applyTheme(config);
      
      expect(document.documentElement.classList.add).not.toHaveBeenCalled();
    });
  });
});