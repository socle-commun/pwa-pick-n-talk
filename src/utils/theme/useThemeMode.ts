import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

export type ThemeMode = "light" | "dark";

const THEME_MODE_KEY = "theme-mode";

// Atom with localStorage persistence
const themeModeAtom = atomWithStorage<ThemeMode>(THEME_MODE_KEY, "light", {
  getItem: (key) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "dark" || stored === "light") {
        return stored;
      }
      // Detect system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
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
 * Hook for managing theme mode (light/dark)
 */
export function useThemeMode() {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);

  // Apply theme mode to document
  useEffect(() => {
    const html = document.documentElement;
    if (themeMode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [themeMode]);

  // Listen for system theme changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't set a preference explicitly
      const hasUserPreference = localStorage.getItem(THEME_MODE_KEY) !== null;
      if (!hasUserPreference) {
        setThemeMode(e.matches ? "dark" : "light");
      }
    };

    darkModeQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [setThemeMode]);

  return {
    themeMode,
    setThemeMode,
    toggleThemeMode: () => setThemeMode(prev => prev === "light" ? "dark" : "light"),
    isLight: themeMode === "light",
    isDark: themeMode === "dark"
  };
}
