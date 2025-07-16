import { describe, it, expect } from "vitest";
import { PictogramSchema, validatePictogram, validatePictogramSafe, isValidPictogram } from "../Pictogram";

describe("Pictogram Schema Validation", () => {
  const validPictogram = {
    id: "pictogram-123",
    image: new Blob(["test"], { type: "image/png" }),
    sound: new Blob(["audio"], { type: "audio/mp3" }),
    isFavorite: true,
    order: 5,
    properties: { 
      "en": { "text": "Cat", "description": "A furry animal" },
      "fr": { "text": "Chat", "description": "Un animal poilu" }
    },
    binder: "binder-456",
    categories: ["category-1", "category-2"],
  };

  it("validates a correct pictogram object", () => {
    expect(() => validatePictogram(validPictogram)).not.toThrow();
    expect(isValidPictogram(validPictogram)).toBe(true);
  });

  it("rejects pictogram with empty id", () => {
    const invalidPictogram = { ...validPictogram, id: "" };
    expect(() => validatePictogram(invalidPictogram)).toThrow();
    expect(isValidPictogram(invalidPictogram)).toBe(false);
  });

  it("rejects pictogram with empty binder", () => {
    const invalidPictogram = { ...validPictogram, binder: "" };
    expect(() => validatePictogram(invalidPictogram)).toThrow();
    expect(isValidPictogram(invalidPictogram)).toBe(false);
  });

  it("rejects pictogram with negative order", () => {
    const invalidPictogram = { ...validPictogram, order: -1 };
    expect(() => validatePictogram(invalidPictogram)).toThrow();
    expect(isValidPictogram(invalidPictogram)).toBe(false);
  });

  it("rejects pictogram with non-integer order", () => {
    const invalidPictogram = { ...validPictogram, order: 5.5 };
    expect(() => validatePictogram(invalidPictogram)).toThrow();
    expect(isValidPictogram(invalidPictogram)).toBe(false);
  });

  it("accepts pictogram without optional image", () => {
    const { image, ...pictogramWithoutImage } = validPictogram;
    expect(() => validatePictogram(pictogramWithoutImage)).not.toThrow();
    expect(isValidPictogram(pictogramWithoutImage)).toBe(true);
  });

  it("accepts pictogram without optional sound", () => {
    const { sound, ...pictogramWithoutSound } = validPictogram;
    expect(() => validatePictogram(pictogramWithoutSound)).not.toThrow();
    expect(isValidPictogram(pictogramWithoutSound)).toBe(true);
  });

  it("accepts pictogram without optional properties", () => {
    const { properties, ...pictogramWithoutProperties } = validPictogram;
    expect(() => validatePictogram(pictogramWithoutProperties)).not.toThrow();
    expect(isValidPictogram(pictogramWithoutProperties)).toBe(true);
  });

  it("uses default false for isFavorite", () => {
    const { isFavorite, ...pictogramWithoutFavorite } = validPictogram;
    const result = PictogramSchema.parse(pictogramWithoutFavorite);
    expect(result.isFavorite).toBe(false);
  });

  it("uses default empty array for categories", () => {
    const { categories, ...pictogramWithoutCategories } = validPictogram;
    const result = PictogramSchema.parse(pictogramWithoutCategories);
    expect(result.categories).toEqual([]);
  });

  it("validates pictogram with minimal required fields", () => {
    const minimalPictogram = {
      id: "pictogram-minimal",
      order: 0,
      binder: "binder-123"
    };
    expect(() => validatePictogram(minimalPictogram)).not.toThrow();
    expect(isValidPictogram(minimalPictogram)).toBe(true);
  });

  it("validates pictogram with complex properties structure", () => {
    const pictogramWithComplexProperties = {
      ...validPictogram,
      properties: {
        "en": { 
          "text": "Cat", 
          "description": "A furry animal",
          "phonetic": "kæt",
          "category": "animals"
        },
        "fr": { 
          "text": "Chat", 
          "description": "Un animal poilu",
          "phonetic": "ʃa",
          "category": "animaux"
        }
      }
    };
    expect(() => validatePictogram(pictogramWithComplexProperties)).not.toThrow();
  });

  it("validatePictogramSafe returns success for valid data", () => {
    const result = validatePictogramSafe(validPictogram);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(expect.objectContaining({
        id: validPictogram.id,
        binder: validPictogram.binder,
        order: validPictogram.order
      }));
    }
  });

  it("validatePictogramSafe returns error for invalid data", () => {
    const invalidPictogram = { ...validPictogram, order: -5 };
    const result = validatePictogramSafe(invalidPictogram);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe("validation.errors.number_too_small");
    }
  });

  it("rejects pictogram with invalid image type", () => {
    const invalidPictogram = { ...validPictogram, image: "not-a-blob" };
    expect(() => validatePictogram(invalidPictogram)).toThrow();
    expect(isValidPictogram(invalidPictogram)).toBe(false);
  });

  it("rejects pictogram with invalid sound type", () => {
    const invalidPictogram = { ...validPictogram, sound: "not-a-blob" };
    expect(() => validatePictogram(invalidPictogram)).toThrow();
    expect(isValidPictogram(invalidPictogram)).toBe(false);
  });
});