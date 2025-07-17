import { describe, it, expect } from "vitest";
import { UserSchema, validateUser, validateUserSafe, isValidUser } from "../User";

describe("User Schema Validation", () => {
  const validUser = {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    role: "user" as const,
    settings: { theme: "dark", notifications: true },
    binders: ["binder-1", "binder-2"],
  };

  it("validates a correct user object", () => {
    expect(() => validateUser(validUser)).not.toThrow();
    expect(isValidUser(validUser)).toBe(true);
  });

  it("rejects user with invalid email", () => {
    const invalidUser = { ...validUser, email: "invalid-email" };
    expect(() => validateUser(invalidUser)).toThrow();
    expect(isValidUser(invalidUser)).toBe(false);
  });

  it("rejects user with empty name", () => {
    const invalidUser = { ...validUser, name: "" };
    expect(() => validateUser(invalidUser)).toThrow();
    expect(isValidUser(invalidUser)).toBe(false);
  });

  it("rejects user with invalid role", () => {
    const invalidUser = { ...validUser, role: "admin" as any };
    expect(() => validateUser(invalidUser)).toThrow();
    expect(isValidUser(invalidUser)).toBe(false);
  });

  it("validateUserSafe returns success for valid data", () => {
    const result = validateUserSafe(validUser);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validUser);
    }
  });

  it("validateUserSafe returns error for invalid data", () => {
    const invalidUser = { ...validUser, email: "invalid" };
    const result = validateUserSafe(invalidUser);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe("validation.errors.invalid_email");
    }
  });

  it("accepts user with optional hash field", () => {
    const userWithHash = { ...validUser, hash: "hashed-password" };
    expect(() => validateUser(userWithHash)).not.toThrow();
  });

  it("uses default empty array for binders", () => {
    const { binders, ...userWithoutBinders } = validUser;
    const result = UserSchema.parse(userWithoutBinders);
    expect(result.binders).toEqual([]);
  });
});
