import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

export type HighContrastMode = "normal" | "high-contrast";

const HIGH_CONTRAST_MODE_KEY = "high-contrast-mode";

// Atom with localStorage persistence
const highContrastModeAtom = atomWithStorage<HighContrastMode>(HIGH_CONTRAST_MODE_KEY, "normal", {
  getItem: (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "high-contrast" || stored === "normal") {
        return stored;
      }
      // Default to normal contrast
      return "normal";
    } catch {
      return "normal";
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
 * Hook for managing high contrast mode (normal/high-contrast)
 */
export function useHighContrastMode() {
  const [highContrastMode, setHighContrastMode] = useAtom(highContrastModeAtom);

  // Apply high contrast mode to document
  useEffect(() => {
    const html = document.documentElement;
    if (highContrastMode === "high-contrast") {
      html.classList.add("high-contrast");
    } else {
      html.classList.remove("high-contrast");
    }
  }, [highContrastMode]);

  return {
    highContrastMode,
    setHighContrastMode,
    toggleHighContrastMode: () => setHighContrastMode(prev => prev === "normal" ? "high-contrast" : "normal"),
    isNormal: highContrastMode === "normal",
    isHighContrast: highContrastMode === "high-contrast"
  };
}
