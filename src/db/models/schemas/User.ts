import { z } from "zod";
import { RoleSchema } from "./shared-types";

/**
 * Zod schema for User model validation
 * Provides runtime type safety and validation for user data
 */
export const UserSchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  name: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
  email: z.string().email("validation.errors.invalid_email"),
  hash: z.string().optional(),
  role: RoleSchema,
  settings: z.record(z.string(), z.union([z.boolean(), z.number(), z.string(), z.record(z.string(), z.any())])),
  binders: z.array(z.string()).default([]),
  hasCompletedOnboarding: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Validation helpers
 */
export const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};

export const validateUserSafe = (data: unknown) => {
  return UserSchema.safeParse(data);
};

export const validateUserPartial = (data: unknown): Partial<User> => {
  return UserSchema.partial().parse(data);
};

/**
 * Type guard for User validation
 */
export const isValidUser = (data: unknown): data is User => {
  return UserSchema.safeParse(data).success;
};
