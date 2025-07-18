import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

export type FontSize = "normal" | "large" | "extra-large";

const FONT_SIZE_KEY = "font-size";

// Font size scale mappings
const FONT_SIZE_SCALES: Record<FontSize, number> = {
  "normal": 1.0,
  "large": 1.125,
  "extra-large": 1.25
};

// Atom with localStorage persistence
const fontSizeAtom = atomWithStorage<FontSize>(FONT_SIZE_KEY, "normal", {
  getItem: (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "normal" || stored === "large" || stored === "extra-large") {
        return stored;
      }
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
 * Hook for managing font size accessibility setting
 */
export function useFontSize() {
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);

  // Apply font size to document
  useEffect(() => {
    const html = document.documentElement;
    const scale = FONT_SIZE_SCALES[fontSize];
    
    // Set CSS custom property for font size scaling
    html.style.setProperty("--font-size-scale", scale.toString());
  }, [fontSize]);

  return {
    fontSize,
    setFontSize,
    scale: FONT_SIZE_SCALES[fontSize],
    isNormal: fontSize === "normal",
    isLarge: fontSize === "large",
    isExtraLarge: fontSize === "extra-large"
  };
}