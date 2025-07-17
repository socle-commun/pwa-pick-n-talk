import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { getSetting, setSetting } from "@/utils/state/useSettings";
import {
  type DaltonismType,
  type DaltonismConfig,
  DaltonismConfigSchema,
  DEFAULT_DALTONISM_CONFIG
} from "@/utils/daltonism/types";

// Setting keys for localStorage
const DALTONISM_SETTING_KEY = "daltonism_config";

// Load initial daltonism config from localStorage
const loadInitialDaltonismConfig = (): DaltonismConfig => {
  const setting = getSetting(DALTONISM_SETTING_KEY);

  if (!setting) return DEFAULT_DALTONISM_CONFIG;

  try {
    const result = DaltonismConfigSchema.safeParse(setting.value);
    return result.success ? result.data : DEFAULT_DALTONISM_CONFIG;
  } catch {
    return DEFAULT_DALTONISM_CONFIG;
  }
};

// Jotai atoms for daltonism settings
const daltonismConfigAtom = atom<DaltonismConfig>(loadInitialDaltonismConfig());

// Computed atom for daltonism enabled state
const daltonismEnabledAtom = atom((get) => {
  const config = get(daltonismConfigAtom);
  return config.enabled && config.type !== "none";
});

export default function useDaltonismSettings() {
  const [daltonismConfig, setDaltonismConfig] = useAtom(daltonismConfigAtom);
  const [isDaltonismEnabled] = useAtom(daltonismEnabledAtom);

  // Persist daltonism config to localStorage whenever it changes
  useEffect(() => {
    setSetting(DALTONISM_SETTING_KEY, daltonismConfig);
  }, [daltonismConfig]);

  // Apply daltonism CSS classes to document
  useEffect(() => {
    const body = document.body;

    // Remove all daltonism classes
    body.classList.remove("daltonism-protanopia", "daltonism-deuteranopia", "daltonism-tritanopia");

    // Add appropriate class if enabled
    if (daltonismConfig.enabled && daltonismConfig.type !== "none") {
      body.classList.add(`daltonism-${daltonismConfig.type}`);
    }
  }, [daltonismConfig]);

  const setDaltonismMode = (enabled: boolean, type: DaltonismType = "none") => {
    setDaltonismConfig({
      enabled,
      type: enabled ? type : "none",
    });
  };

  const resetDaltonismSettings = () => {
    setDaltonismConfig(DEFAULT_DALTONISM_CONFIG);
  };

  return {
    daltonismConfig,
    isDaltonismEnabled,
    daltonismType: daltonismConfig.type,
    setDaltonismMode,
    resetDaltonismSettings,
  };
}
