
import { describe, it, expect } from "vitest";
import { validateSetting, validateSettingSafe, isValidSetting } from "../Setting";

describe("Setting Schema Validation", () => {
  it("validates setting with string value", () => {
    const stringSetting = { key: "theme", value: "dark" };
    expect(() => validateSetting(stringSetting)).not.toThrow();
    expect(isValidSetting(stringSetting)).toBe(true);
  });

  it("validates setting with boolean value", () => {
    const booleanSetting = { key: "notifications", value: true };
    expect(() => validateSetting(booleanSetting)).not.toThrow();
    expect(isValidSetting(booleanSetting)).toBe(true);
  });

  it("validates setting with number value", () => {
    const numberSetting = { key: "fontSize", value: 16 };
    expect(() => validateSetting(numberSetting)).not.toThrow();
    expect(isValidSetting(numberSetting)).toBe(true);
  });

  it("validates setting with object value", () => {
    const objectSetting = {
      key: "layout",
      value: { columns: 3, rows: 4, spacing: 10 }
    };
    expect(() => validateSetting(objectSetting)).not.toThrow();
    expect(isValidSetting(objectSetting)).toBe(true);
  });

  it("rejects setting with empty key", () => {
    const invalidSetting = { key: "", value: "test" };
    expect(() => validateSetting(invalidSetting)).toThrow();
    expect(isValidSetting(invalidSetting)).toBe(false);
  });

  it("rejects setting with key too long", () => {
    const longKey = "a".repeat(101);
    const invalidSetting = { key: longKey, value: "test" };
    expect(() => validateSetting(invalidSetting)).toThrow();
    expect(isValidSetting(invalidSetting)).toBe(false);
  });

  it("accepts setting with maximum allowed key length", () => {
    const maxKey = "a".repeat(100);
    const validSetting = { key: maxKey, value: "test" };
    expect(() => validateSetting(validSetting)).not.toThrow();
    expect(isValidSetting(validSetting)).toBe(true);
  });

  it("validates setting with complex object value", () => {
    const complexSetting = {
      key: "userPreferences",
      value: {
        ui: {
          theme: "dark",
          language: "en",
          accessibility: {
            highContrast: true,
            largeText: false
          }
        },
        features: {
          autoSave: true,
          notifications: {
            email: false,
            push: true
          }
        }
      }
    };
    expect(() => validateSetting(complexSetting)).not.toThrow();
    expect(isValidSetting(complexSetting)).toBe(true);
  });

  it("validateSettingSafe returns success for valid data", () => {
    const validSetting = { key: "theme", value: "light" };
    const result = validateSettingSafe(validSetting);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validSetting);
    }
  });

  it("validateSettingSafe returns error for invalid key", () => {
    const invalidSetting = { key: "", value: "test" };
    const result = validateSettingSafe(invalidSetting);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe("validation.errors.field_empty");
    }
  });

  it("validateSettingSafe returns error for key too long", () => {
    const longKey = "a".repeat(101);
    const invalidSetting = { key: longKey, value: "test" };
    const result = validateSettingSafe(invalidSetting);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe("validation.errors.string_too_long");
    }
  });

  it("rejects setting with invalid value type", () => {
    const invalidSetting = { key: "test", value: Symbol("invalid") as any };
    expect(() => validateSetting(invalidSetting)).toThrow();
    expect(isValidSetting(invalidSetting)).toBe(false);
  });

  it("accepts setting with nested empty object", () => {
    const settingWithEmptyObject = { key: "empty", value: {} };
    expect(() => validateSetting(settingWithEmptyObject)).not.toThrow();
    expect(isValidSetting(settingWithEmptyObject)).toBe(true);
  });

  it("validates setting with zero number value", () => {
    const zeroSetting = { key: "counter", value: 0 };
    expect(() => validateSetting(zeroSetting)).not.toThrow();
    expect(isValidSetting(zeroSetting)).toBe(true);
  });

  it("validates setting with negative number value", () => {
    const negativeSetting = { key: "offset", value: -10 };
    expect(() => validateSetting(negativeSetting)).not.toThrow();
    expect(isValidSetting(negativeSetting)).toBe(true);
  });

  it("validates setting with decimal number value", () => {
    const decimalSetting = { key: "scale", value: 1.5 };
    expect(() => validateSetting(decimalSetting)).not.toThrow();
    expect(isValidSetting(decimalSetting)).toBe(true);
  });
});
