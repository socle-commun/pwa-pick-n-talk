import { vi } from "vitest";

/**
 * Mock simplifié pour les tests qui n'ont pas besoin de la vraie i18n
 */
export const mockI18nextSimple = () => {
  vi.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string, _params?: Record<string, unknown>) => {
        // Mock basique qui retourne la clé brute (comme nos tests actuels)
        return key;
      },
      i18n: {
        language: "en-US",
        changeLanguage: vi.fn(),
      }
    }),
  }));
};

/**
 * Mock complet avec vraie interpolation pour les tests l10n
 */
export const mockI18nextWithInterpolation = () => {
  vi.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string, params?: Record<string, unknown>) => {
        const translations: Record<string, string> = {
          "validation.errors.required": "This field is required",
          "validation.errors.invalid_uuid": "Invalid UUID format",
          "validation.errors.invalid_email": "Invalid email format",
          "validation.errors.field_empty": "This field cannot be empty",
          "validation.errors.string_too_short": `Text too short (minimum ${params?.min || 8} characters)`,
          "validation.errors.string_too_long": `Text too long (maximum ${params?.max || 100} characters)`,
          "validation.errors.number_too_small": `Number too small (minimum ${params?.min || 18})`,
          "validation.errors.number_too_big": `Number too large (maximum ${params?.max || 120})`,
          "validation.errors.invalid_type": `Invalid type, expected ${params?.expected || "string"}`
        };
        
        let result = translations[key] || key;
        
        // Interpolation manuelle
        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            result = result.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue));
          });
        }
        
        return result;
      },
      i18n: {
        language: "en-US",
        changeLanguage: vi.fn(),
      }
    }),
  }));
};
