import { vi } from "vitest";

/**
 * Mock helper for i18next in tests
 * Because duplicating mocks everywhere is what amateurs do
 */
export const mockI18next = () => {
  vi.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string, params?: Record<string, unknown>) => {
        // Mock translation function with parameter interpolation
        const translations: Record<string, string> = {
          "validation.errors.required": "This field is required",
          "validation.errors.invalid_uuid": "Invalid UUID format",
          "validation.errors.invalid_email": "Invalid email format",
          "validation.errors.field_empty": "This field cannot be empty",
          "validation.errors.string_too_short": `Text too short (minimum ${params?.min || 1} characters)`,
          "validation.errors.string_too_long": `Text too long (maximum ${params?.max || 100} characters)`,
          "validation.errors.number_too_small": `Number too small (minimum ${params?.min || 0})`,
          "validation.errors.number_too_big": `Number too big (maximum ${params?.max || 100})`,
          "validation.errors.invalid_type": `Invalid type, expected ${params?.expected || "string"}`,
        };
        
        let result = translations[key] || key;
        
        // Handle interpolation manually for our tests
        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            result = result.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue));
          });
        }
        
        return result;
      },
    }),
  }));
};

/**
 * Common test utilities
 */
export const testUtils = {
  mockI18next,
};
