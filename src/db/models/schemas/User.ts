import { z } from "zod";

/**
 * Zod schema for User model validation
 * Provides runtime type safety and validation for user data
 */
export const UserSchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  name: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
  email: z.string().email("validation.errors.invalid_email"),
  hash: z.string().optional(),
  role: z.enum(["user", "caregiver", "professional"]),
  settings: z.record(z.string(), z.union([z.boolean(), z.number(), z.string(), z.object({})])),
  binders: z.array(z.string()).default([]),
});

export type UserValidated = z.infer<typeof UserSchema>;

/**
 * Validation helpers
 */
export const validateUser = (data: unknown): UserValidated => {
  return UserSchema.parse(data);
};

export const validateUserSafe = (data: unknown) => {
  return UserSchema.safeParse(data);
};

export const validateUserPartial = (data: unknown): Partial<UserValidated> => {
  return UserSchema.partial().parse(data);
};

/**
 * Type guard for User validation
 */
export const isValidUser = (data: unknown): data is UserValidated => {
  return UserSchema.safeParse(data).success;
};