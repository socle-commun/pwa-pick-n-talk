/**
 * @file src/db/entities/data/validation.test.ts
 * @description Tests for Zod validation schemas
 * Because testing your validation is the minimum you should do
 */

import { describe, it, expect } from "vitest";
import {
  UserSchema,
  PictogramSchema,
  BinderSchema,
  CategorySchema,
  TranslationSchema,
  SettingSchema,
  HistorySchema,
  validateUser,
  validatePictogram,
  RoleSchema,
  EntityTypeSchema,
  HistoryActionSchema,
} from "./index";

describe("User Schema Validation", () => {
  it("should validate a correct user", () => {
    const validUser = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      email: "test@example.com",
      role: "user",
      settings: { theme: "dark", language: "en" },
    };

    expect(() => validateUser(validUser)).not.toThrow();
    const result = validateUser(validUser);
    expect(result.email).toBe("test@example.com");
  });

  it("should reject invalid UUID", () => {
    const invalidUser = {
      uuid: "not-a-uuid",
      email: "test@example.com",
      role: "user",
      settings: {},
    };

    expect(() => validateUser(invalidUser)).toThrow();
  });

  it("should reject invalid email", () => {
    const invalidUser = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      email: "not-an-email",
      role: "user",
      settings: {},
    };

    expect(() => validateUser(invalidUser)).toThrow();
  });
});

describe("Pictogram Schema Validation", () => {
  it("should validate a correct pictogram", () => {
    const validPictogram = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      isFavorite: false,
      binderUuid: "123e4567-e89b-12d3-a456-426614174001",
    };

    expect(() => validatePictogram(validPictogram)).not.toThrow();
  });

  it("should reject invalid binder UUID", () => {
    const invalidPictogram = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      isFavorite: false,
      binderUuid: "invalid-uuid",
    };

    expect(() => validatePictogram(invalidPictogram)).toThrow();
  });
});

describe("Enum Schema Validation", () => {
  it("should validate role enum", () => {
    expect(RoleSchema.parse("user")).toBe("user");
    expect(RoleSchema.parse("caregiver")).toBe("caregiver");
    expect(RoleSchema.parse("professional")).toBe("professional");
    expect(() => RoleSchema.parse("invalid")).toThrow();
  });

  it("should validate entity type enum", () => {
    expect(EntityTypeSchema.parse("user")).toBe("user");
    expect(EntityTypeSchema.parse("binder")).toBe("binder");
    expect(() => EntityTypeSchema.parse("invalid")).toThrow();
  });

  it("should validate history action enum", () => {
    expect(HistoryActionSchema.parse("create")).toBe("create");
    expect(HistoryActionSchema.parse("update")).toBe("update");
    expect(() => HistoryActionSchema.parse("invalid")).toThrow();
  });
});

describe("Binder Schema Validation", () => {
  it("should validate a correct binder", () => {
    const validBinder = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      author: "John Doe",
    };

    const result = BinderSchema.parse(validBinder);
    expect(result.author).toBe("John Doe");
  });

  it("should reject empty author", () => {
    const invalidBinder = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      author: "",
    };

    expect(() => BinderSchema.parse(invalidBinder)).toThrow();
  });
});

describe("Translation Schema Validation", () => {
  it("should validate a correct translation", () => {
    const validTranslation = {
      objectUuid: "123e4567-e89b-12d3-a456-426614174000",
      language: "en-US",
      value: "Hello World",
    };

    const result = TranslationSchema.parse(validTranslation);
    expect(result.value).toBe("Hello World");
  });

  it("should reject empty value", () => {
    const invalidTranslation = {
      objectUuid: "123e4567-e89b-12d3-a456-426614174000",
      language: "en",
      value: "",
    };

    expect(() => TranslationSchema.parse(invalidTranslation)).toThrow();
  });
});

describe("Setting Schema Validation", () => {
  it("should validate different value types", () => {
    const booleanSetting = {
      key: "darkMode",
      value: true,
    };

    const numberSetting = {
      key: "fontSize",
      value: 16,
    };

    const stringSetting = {
      key: "theme",
      value: "dark",
    };

    const objectSetting = {
      key: "preferences",
      value: { color: "blue" },
    };

    expect(() => SettingSchema.parse(booleanSetting)).not.toThrow();
    expect(() => SettingSchema.parse(numberSetting)).not.toThrow();
    expect(() => SettingSchema.parse(stringSetting)).not.toThrow();
    expect(() => SettingSchema.parse(objectSetting)).not.toThrow();
  });
});

describe("History Schema Validation", () => {
  it("should validate a correct history entry", () => {
    const validHistory = {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      entityType: "user",
      entityId: "123e4567-e89b-12d3-a456-426614174001",
      action: "create",
      performedBy: "123e4567-e89b-12d3-a456-426614174002",
      timestamp: new Date(),
      changes: { field1: { old: "value1", new: "value2" } },
    };

    const result = HistorySchema.parse(validHistory);
    expect(result.action).toBe("create");
  });
});
