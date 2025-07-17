import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

export type DaltonismMode = 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';

const DALTONISM_MODE_KEY = 'daltonism-mode';

// Atom with localStorage persistence
const daltonismModeAtom = atomWithStorage<DaltonismMode>(DALTONISM_MODE_KEY, 'default', {
  getItem: (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === 'default' || stored === 'protanopia' || stored === 'deuteranopia' || stored === 'tritanopia') {
        return stored;
      }
      return 'default';
    } catch {
      return 'default';
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
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
 * Hook for managing daltonism mode
 */
export function useDaltonismMode() {
  const [daltonismMode, setDaltonismMode] = useAtom(daltonismModeAtom);

  // Apply daltonism mode to document
  useEffect(() => {
    const html = document.documentElement;
    
    // Remove all daltonism classes
    html.classList.remove('daltonism-protanopia', 'daltonism-deuteranopia', 'daltonism-tritanopia');
    
    // Add appropriate daltonism class
    if (daltonismMode !== 'default') {
      html.classList.add(`daltonism-${daltonismMode}`);
    }
  }, [daltonismMode]);

  return {
    daltonismMode,
    setDaltonismMode,
    isDefault: daltonismMode === 'default',
    isProtanopia: daltonismMode === 'protanopia',
    isDeuteranopia: daltonismMode === 'deuteranopia',
    isTritanopia: daltonismMode === 'tritanopia'
  };
}