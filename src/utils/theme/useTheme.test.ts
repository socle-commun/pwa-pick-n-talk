import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useTheme } from './useTheme';
import { DEFAULT_THEME } from './types';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

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

// Mock document.documentElement
document.documentElement.classList.remove = vi.fn();
document.documentElement.classList.add = vi.fn();

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('should return default theme configuration', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.themeConfig).toEqual(DEFAULT_THEME);
  });

  it('should set theme mode', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setThemeMode('dark');
    });
    
    expect(result.current.themeConfig.mode).toBe('dark');
  });

  it('should set daltonism type', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setDaltonism('protanopia');
    });
    
    expect(result.current.themeConfig.daltonism).toBe('protanopia');
  });

  it('should set variant', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setVariant('high-contrast');
    });
    
    expect(result.current.themeConfig.variant).toBe('high-contrast');
  });

  it('should toggle theme mode', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleThemeMode();
    });
    
    expect(result.current.themeConfig.mode).toBe('dark');
    
    act(() => {
      result.current.toggleThemeMode();
    });
    
    expect(result.current.themeConfig.mode).toBe('light');
  });

  it('should toggle high contrast', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.toggleHighContrast();
    });
    
    expect(result.current.themeConfig.variant).toBe('high-contrast');
    
    act(() => {
      result.current.toggleHighContrast();
    });
    
    expect(result.current.themeConfig.variant).toBe('normal');
  });

  it('should reset to default theme', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setThemeMode('dark');
      result.current.setDaltonism('protanopia');
      result.current.setVariant('high-contrast');
    });
    
    expect(result.current.themeConfig).not.toEqual(DEFAULT_THEME);
    
    act(() => {
      result.current.resetToDefault();
    });
    
    expect(result.current.themeConfig).toEqual(DEFAULT_THEME);
  });

  it('should reset to system preferred theme', () => {
    // Mock dark mode preference
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.resetToSystemPreferred();
    });
    
    expect(result.current.themeConfig.mode).toBe('dark');
    expect(result.current.themeConfig.daltonism).toBe('default');
    expect(result.current.themeConfig.variant).toBe('normal');
  });

  it('should set complete theme configuration', () => {
    const { result } = renderHook(() => useTheme());
    
    const newConfig = {
      mode: 'dark' as const,
      daltonism: 'protanopia' as const,
      variant: 'high-contrast' as const,
    };
    
    act(() => {
      result.current.setThemeConfig(newConfig);
    });
    
    expect(result.current.themeConfig).toEqual(newConfig);
  });

  it('should load theme from localStorage', () => {
    const savedTheme = {
      mode: 'dark',
      daltonism: 'protanopia',
      variant: 'high-contrast',
    };
    
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedTheme));
    
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.themeConfig).toEqual(savedTheme);
  });

  it('should save theme to localStorage', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setThemeMode('dark');
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'theme-config',
      JSON.stringify({
        mode: 'dark',
        daltonism: 'default',
        variant: 'normal',
      })
    );
  });

  it('should apply theme to document', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setThemeMode('dark');
    });
    
    expect(document.documentElement.classList.remove).toHaveBeenCalled();
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('should indicate when theme is ready', () => {
    const { result } = renderHook(() => useTheme());
    
    // Theme should be ready after initial render
    expect(result.current.isReady).toBe(true);
  });
});