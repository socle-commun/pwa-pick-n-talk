import { z } from "zod";

// Export all schemas and types
export * from "./Types";
export * from "./User";
export * from "./Binder";
export * from "./Pictogram";
export * from "./Category";
export * from "./Translation";
export * from "./Setting";
export * from "./History";

// Common validation utilities
export const validateUUID = (uuid: string): boolean => {
  return z.string().uuid().safeParse(uuid).success;
};

export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

/**
 * Generic validator for any schema
 */
export const createValidator = <T>(schema: z.ZodSchema<T>) => {
  return {
    validate: (data: unknown): T => schema.parse(data),
    validateSafe: (data: unknown) => schema.safeParse(data),
  };
};
