import { describe, it, expect } from "vitest";
import {
  UserPreferencesSchema,
  DaltonismTypeSchema,
  validateUserPreferences,
  validateUserPreferencesSafe,
  validateUserPreferencesPartial,
  isValidUserPreferences,
  DEFAULT_USER_PREFERENCES,
} from "@/db/entities/data/UserPreferences";

describe("UserPreferences Schema", () => {
  describe("DaltonismTypeSchema", () => {
    it("should accept valid daltonism types", () => {
      expect(DaltonismTypeSchema.parse("none")).toBe("none");
      expect(DaltonismTypeSchema.parse("protanopia")).toBe("protanopia");
      expect(DaltonismTypeSchema.parse("deuteranopia")).toBe("deuteranopia");
      expect(DaltonismTypeSchema.parse("tritanopia")).toBe("tritanopia");
    });

    it("should reject invalid daltonism types", () => {
      expect(() => DaltonismTypeSchema.parse("invalid")).toThrow();
      expect(() => DaltonismTypeSchema.parse("")).toThrow();
      expect(() => DaltonismTypeSchema.parse(null)).toThrow();
    });
  });

  describe("UserPreferencesSchema", () => {
    it("should validate complete user preferences", () => {
      const validPrefs = {
        daltonism: {
          enabled: true,
          type: "protanopia" as const,
        },
        locale: "fr",
      };

      const result = UserPreferencesSchema.parse(validPrefs);
      expect(result).toEqual(validPrefs);
    });

    it("should apply default values for missing properties", () => {
      const partialPrefs = {};
      const result = UserPreferencesSchema.parse(partialPrefs);

      expect(result).toEqual({
        daltonism: {
          enabled: false,
          type: "none",
        },
        locale: "en",
      });
    });

    it("should validate partial daltonism settings", () => {
      const prefsWithPartialDaltonism = {
        daltonism: {
          enabled: true,
        },
        locale: "es",
      };

      const result = UserPreferencesSchema.parse(prefsWithPartialDaltonism);
      expect(result.daltonism.enabled).toBe(true);
      expect(result.daltonism.type).toBe("none");
      expect(result.locale).toBe("es");
    });

    it("should reject invalid structure", () => {
      expect(() => UserPreferencesSchema.parse({
        daltonism: "invalid",
      })).toThrow();

      expect(() => UserPreferencesSchema.parse({
        daltonism: {
          enabled: "not-boolean",
        },
      })).toThrow();
    });
  });

  describe("Validation helpers", () => {
    it("validateUserPreferences should parse valid data", () => {
      const validData = DEFAULT_USER_PREFERENCES;
      const result = validateUserPreferences(validData);
      expect(result).toEqual(validData);
    });

    it("validateUserPreferences should throw on invalid data", () => {
      expect(() => validateUserPreferences("invalid")).toThrow();
      expect(() => validateUserPreferences(null)).toThrow();
    });

    it("validateUserPreferencesSafe should return success for valid data", () => {
      const result = validateUserPreferencesSafe(DEFAULT_USER_PREFERENCES);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(DEFAULT_USER_PREFERENCES);
      }
    });

    it("validateUserPreferencesSafe should return error for invalid data", () => {
      const result = validateUserPreferencesSafe("invalid");
      expect(result.success).toBe(false);
    });

    it("validateUserPreferencesPartial should handle partial data", () => {
      const partialData = { locale: "fr" };
      const result = validateUserPreferencesPartial(partialData);
      expect(result.locale).toBe("fr");
      // Note: daltonism will still have defaults applied due to Zod's behavior
      expect(result.daltonism).toBeDefined();
    });

    it("isValidUserPreferences should work as type guard", () => {
      expect(isValidUserPreferences(DEFAULT_USER_PREFERENCES)).toBe(true);
      expect(isValidUserPreferences("invalid")).toBe(false);
      expect(isValidUserPreferences(null)).toBe(false);
    });
  });

  describe("DEFAULT_USER_PREFERENCES", () => {
    it("should have correct default values", () => {
      expect(DEFAULT_USER_PREFERENCES).toEqual({
        daltonism: {
          enabled: false,
          type: "none",
        },
        locale: "en",
      });
    });

    it("should pass schema validation", () => {
      expect(() => validateUserPreferences(DEFAULT_USER_PREFERENCES)).not.toThrow();
    });
  });
});
