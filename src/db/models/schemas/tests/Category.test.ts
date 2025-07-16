import { describe, it, expect } from "vitest";
import { CategorySchema, validateCategory, validateCategorySafe, isValidCategory } from "../Category";

describe("Category Schema Validation", () => {
  const validCategory = {
    id: "category-123",
    image: new Blob(["test"], { type: "image/png" }),
    properties: { "en": { "title": "Animals", "description": "Animal pictograms" } },
    pictograms: ["pictogram-1", "pictogram-2"],
  };

  it("validates a correct category object", () => {
    expect(() => validateCategory(validCategory)).not.toThrow();
    expect(isValidCategory(validCategory)).toBe(true);
  });

  it("rejects category with empty id", () => {
    const invalidCategory = { ...validCategory, id: "" };
    expect(() => validateCategory(invalidCategory)).toThrow();
    expect(isValidCategory(invalidCategory)).toBe(false);
  });

  it("accepts category without optional image", () => {
    const { image, ...categoryWithoutImage } = validCategory;
    expect(() => validateCategory(categoryWithoutImage)).not.toThrow();
    expect(isValidCategory(categoryWithoutImage)).toBe(true);
  });

  it("accepts category without optional properties", () => {
    const { properties, ...categoryWithoutProperties } = validCategory;
    expect(() => validateCategory(categoryWithoutProperties)).not.toThrow();
    expect(isValidCategory(categoryWithoutProperties)).toBe(true);
  });

  it("uses default empty array for pictograms", () => {
    const { pictograms, ...categoryWithoutPictograms } = validCategory;
    const result = CategorySchema.parse(categoryWithoutPictograms);
    expect(result.pictograms).toEqual([]);
  });

  it("validates category with complex properties structure", () => {
    const categoryWithComplexProperties = {
      ...validCategory,
      properties: {
        "en": { "title": "Animals", "description": "All animals" },
        "fr": { "title": "Animaux", "description": "Tous les animaux" }
      }
    };
    expect(() => validateCategory(categoryWithComplexProperties)).not.toThrow();
  });

  it("validateCategorySafe returns success for valid data", () => {
    const result = validateCategorySafe(validCategory);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(expect.objectContaining({
        id: validCategory.id,
        pictograms: validCategory.pictograms
      }));
    }
  });

  it("validateCategorySafe returns error for invalid data", () => {
    const invalidCategory = { ...validCategory, id: "" };
    const result = validateCategorySafe(invalidCategory);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe("validation.errors.field_empty");
    }
  });

  it("rejects category with invalid image type", () => {
    const invalidCategory = { ...validCategory, image: "not-a-blob" };
    expect(() => validateCategory(invalidCategory)).toThrow();
    expect(isValidCategory(invalidCategory)).toBe(false);
  });
});