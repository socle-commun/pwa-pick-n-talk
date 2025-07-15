import { z } from "zod";
import { RoleSchema } from "./Types";

/**
 * User entity schema with validation error keys for i18n
 * Now returns error keys instead of hardcoded messages
 */
export const UserSchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  name: z.string().min(1, "validation.errors.field_empty").optional(),
  email: z.string().email("validation.errors.invalid_email"),
  hash: z.string().optional(),
  password: z.string().min(8, "validation.errors.string_too_short").optional(),
  
  role: RoleSchema,
  
  settings: z.record(z.string(), z.union([z.boolean(), z.number(), z.string()])),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Validation helpers
 */
export const validateUser = (data: unknown): User => {
  return UserSchema.parse(data);
};

export const validateUserPartial = (data: unknown) => {
  return UserSchema.partial().parse(data);
};
