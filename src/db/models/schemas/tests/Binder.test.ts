import { describe, it, expect } from "vitest";
import { BinderSchema, validateBinder, validateBinderSafe, isValidBinder } from "../Binder";

describe("Binder Schema Validation", () => {
  const validBinder = {
    id: "binder-123",
    author: "user-456",
    isFavorite: false,
    pictograms: ["pictogram-1", "pictogram-2"],
    users: ["user-1", "user-2"],
  };

  it("validates a correct binder object", () => {
    expect(() => validateBinder(validBinder)).not.toThrow();
    expect(isValidBinder(validBinder)).toBe(true);
  });

  it("rejects binder with empty id", () => {
    const invalidBinder = { ...validBinder, id: "" };
    expect(() => validateBinder(invalidBinder)).toThrow();
    expect(isValidBinder(invalidBinder)).toBe(false);
  });

  it("rejects binder with empty author", () => {
    const invalidBinder = { ...validBinder, author: "" };
    expect(() => validateBinder(invalidBinder)).toThrow();
    expect(isValidBinder(invalidBinder)).toBe(false);
  });

  it("accepts binder with optional image blob", () => {
    const blob = new Blob(["test"], { type: "image/png" });
    const binderWithImage = { ...validBinder, image: blob };
    expect(() => validateBinder(binderWithImage)).not.toThrow();
  });

  it("accepts binder with properties", () => {
    const binderWithProperties = {
      ...validBinder,
      properties: { "en": { "title": "My Binder" } }
    };
    expect(() => validateBinder(binderWithProperties)).not.toThrow();
  });

  it("arrays are optional and undefined when not provided", () => {
    const { pictograms, users, ...binderWithoutArrays } = validBinder;
    const result = BinderSchema.parse(binderWithoutArrays);
    expect(result.pictograms).toBeUndefined();
    expect(result.users).toBeUndefined();
  });

  it("uses default false for isFavorite", () => {
    const { isFavorite, ...binderWithoutFavorite } = validBinder;
    const result = BinderSchema.parse(binderWithoutFavorite);
    expect(result.isFavorite).toBe(false);
  });

  it("validateBinderSafe returns success for valid data", () => {
    const result = validateBinderSafe(validBinder);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(expect.objectContaining(validBinder));
    }
  });

  it("validateBinderSafe returns error for invalid data", () => {
    const invalidBinder = { ...validBinder, id: "" };
    const result = validateBinderSafe(invalidBinder);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});