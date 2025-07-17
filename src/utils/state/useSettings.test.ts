import { describe, it, expect, beforeEach, vi } from "vitest";
import { getSetting, setSetting } from "@/utils/state/useSettings";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe("useSettings utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getSetting", () => {
    it("should return null when key doesn't exist in localStorage", () => {
      localStorageMock.getItem.mockReturnValue(null);
      
      const result = getSetting("non-existent-key");
      
      expect(result).toBeNull();
      expect(localStorageMock.getItem).toHaveBeenCalledWith("non-existent-key");
    });

    it("should return parsed setting when valid data exists", () => {
      const validSetting = { key: "test-key", value: "test-value" };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(validSetting));
      
      const result = getSetting("test-key");
      
      expect(result).toEqual(validSetting);
      expect(localStorageMock.getItem).toHaveBeenCalledWith("test-key");
    });

    it("should return null when localStorage contains invalid JSON", () => {
      localStorageMock.getItem.mockReturnValue("invalid-json{");
      
      const result = getSetting("test-key");
      
      expect(result).toBeNull();
    });

    it("should return null when setting doesn't match schema", () => {
      const invalidSetting = { wrongProperty: "test" };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(invalidSetting));
      
      const result = getSetting("test-key");
      
      expect(result).toBeNull();
    });
  });

  describe("setSetting", () => {
    it("should store valid setting in localStorage", () => {
      const key = "test-key";
      const value = "test-value";
      
      setSetting(key, value);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify({ key, value })
      );
    });

    it("should handle different value types", () => {
      const testCases = [
        { key: "boolean-key", value: true },
        { key: "number-key", value: 42 },
        { key: "string-key", value: "test" },
        { key: "object-key", value: { nested: "object" } },
      ];

      testCases.forEach(({ key, value }) => {
        setSetting(key, value);
        
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          key,
          JSON.stringify({ key, value })
        );
      });
    });

    it("should not store setting if validation fails", () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Force validation to fail by breaking localStorage
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("Storage error");
      });
      
      setSetting("test-key", "test-value");
      
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to save setting test-key:",
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });
  });
});