import { z } from "zod";
import { RoleSchema } from "./Types";

/**
 * User entity schema with proper validation
 * Because apparently someone needs to teach you what data validation means
 */
export const UserSchema = z.object({
  uuid: z.string().uuid("Invalid UUID format, did you even try?"),
  
  name: z.string().min(1, "Name cannot be empty").optional(),
  email: z.string().email("Learn what an email looks like"),
  hash: z.string().optional(),
  password: z.string().min(8, "Password too weak, like your coding skills").optional(),
  
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
