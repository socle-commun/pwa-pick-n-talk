import { type Setting, validateSettingSafe } from "@/db/models/schemas/Setting";

/**
 * Helper to get setting from localStorage
 * @param key - The setting key to retrieve
 * @returns The setting value or null if not found or invalid
 */
export const getSetting = (key: string): Setting | null => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    const result = validateSettingSafe(parsed);

    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

/**
 * Helper to set setting in localStorage
 * @param key - The setting key
 * @param value - The setting value to store
 */
export const setSetting = (key: string, value: any): void => {
  try {
    const setting: Setting = { key, value };
    const result = validateSettingSafe(setting);

    if (result.success) {
      localStorage.setItem(key, JSON.stringify(setting));
    }
  } catch (error) {
    console.error(`Failed to save setting ${key}:`, error);
  }
};
