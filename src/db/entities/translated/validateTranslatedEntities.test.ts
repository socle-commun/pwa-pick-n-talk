import { describe, it, expect } from "vitest";
import { z } from "zod";
import { validateTranslatedEntities } from "../index";

/**
 * Tests for validateTranslatedEntities
 * Because the reviewer demanded it, and rightfully so
 */
describe("validateTranslatedEntities", () => {
  describe("binders validation", () => {
    it("should validate valid binder arrays", () => {
      const validBinders = [
        {
          uuid: "123e4567-e89b-12d3-a456-426614174000",
          author: "Test Author",
          title: "Test Binder",
          description: "Test Description",
          icon: null,
          langCode: "en-US"
        }
      ];

      expect(() => validateTranslatedEntities.binders(validBinders)).not.toThrow();
    });

    it("should reject invalid binder arrays", () => {
      const invalidBinders = [
        {
          uuid: "invalid-uuid",
          author: "",
          title: "",
          description: "",
          icon: null,
          langCode: "en-US"
        }
      ];

      expect(() => validateTranslatedEntities.binders(invalidBinders)).toThrow();
    });

    it("should reject non-array input", () => {
      expect(() => validateTranslatedEntities.binders("not an array")).toThrow();
      expect(() => validateTranslatedEntities.binders(null)).toThrow();
      expect(() => validateTranslatedEntities.binders(undefined)).toThrow();
    });
  });

  describe("pictograms validation", () => {
    it("should validate valid pictogram arrays", () => {
      const validPictograms = [
        {
          uuid: "123e4567-e89b-12d3-a456-426614174001",
          binderUuid: "123e4567-e89b-12d3-a456-426614174000",
          word: "Test Pictogram",
          // image: null (optional field)
        }
      ];

      expect(() => validateTranslatedEntities.pictograms(validPictograms)).not.toThrow();
    });

    it("should reject invalid pictogram arrays", () => {
      const invalidPictograms = [
        {
          uuid: "invalid-uuid",
          binderUuid: "",
          word: "",
        }
      ];

      expect(() => validateTranslatedEntities.pictograms(invalidPictograms)).toThrow();
    });
  });

  describe("categories validation", () => {
    it("should validate valid category arrays", () => {
      const validCategories = [
        {
          uuid: "123e4567-e89b-12d3-a456-426614174002",
          name: "Test Category",
          icon: new Blob([], { type: "image/png" }),
        }
      ];

      expect(() => validateTranslatedEntities.categories(validCategories)).not.toThrow();
    });

    it("should reject invalid category arrays", () => {
      const invalidCategories = [
        {
          uuid: "invalid-uuid",
          name: "",
          icon: "invalid" // Not a Blob
        }
      ];

      expect(() => validateTranslatedEntities.categories(invalidCategories)).toThrow();
    });
  });

  describe("edge cases", () => {
    it("should handle empty arrays", () => {
      expect(() => validateTranslatedEntities.binders([])).not.toThrow();
      expect(() => validateTranslatedEntities.pictograms([])).not.toThrow();
      expect(() => validateTranslatedEntities.categories([])).not.toThrow();
    });

    it("should provide meaningful error messages", () => {
      try {
        validateTranslatedEntities.binders([{ invalid: "data" }]);
      } catch (error) {
        expect(error).toBeInstanceOf(z.ZodError);
        expect((error as z.ZodError).issues.length).toBeGreaterThan(0);
      }
    });
  });
});
