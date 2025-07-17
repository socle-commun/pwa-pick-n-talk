import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import {
  type UserPreferences,
  type DaltonismType,
  DEFAULT_USER_PREFERENCES,
  validateUserPreferencesSafe
} from "@/db/entities/data/UserPreferences";

const STORAGE_KEY = "user-preferences";

// Load initial preferences from localStorage with validation
const loadInitialPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_USER_PREFERENCES;

    const parsed = JSON.parse(stored);
    const result = validateUserPreferencesSafe(parsed);

    return result.success ? result.data : DEFAULT_USER_PREFERENCES;
  } catch {
    return DEFAULT_USER_PREFERENCES;
  }
};

// Jotai atom for user preferences
const userPreferencesAtom = atom<UserPreferences>(loadInitialPreferences());

// Atom for computed daltonism state
const daltonismEnabledAtom = atom((get) => {
  const prefs = get(userPreferencesAtom);
  return prefs.daltonism.enabled && prefs.daltonism.type !== "none";
});

export default function useUserPreferences() {
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);
  const [isDaltonismEnabled] = useAtom(daltonismEnabledAtom);

  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error("Failed to save user preferences:", error);
    }
  }, [preferences]);

  // Apply daltonism CSS classes to document
  useEffect(() => {
    const { daltonism } = preferences;
    const body = document.body;

    // Remove all daltonism classes
    body.classList.remove("daltonism-protanopia", "daltonism-deuteranopia", "daltonism-tritanopia");

    // Add appropriate class if enabled
    if (daltonism.enabled && daltonism.type !== "none") {
      body.classList.add(`daltonism-${daltonism.type}`);
    }
  }, [preferences.daltonism]);

  const setDaltonismMode = (enabled: boolean, type: DaltonismType = "none") => {
    setPreferences(prev => ({
      ...prev,
      daltonism: {
        enabled,
        type: enabled ? type : "none",
      },
    }));
  };

  const setLocale = (locale: string) => {
    setPreferences(prev => ({
      ...prev,
      locale,
    }));
  };

  return {
    preferences,
    isDaltonismEnabled,
    daltonismType: preferences.daltonism.type,
    setDaltonismMode,
    setLocale,
    reset: () => setPreferences(DEFAULT_USER_PREFERENCES),
  };
}
