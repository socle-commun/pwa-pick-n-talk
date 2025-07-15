/**
 * @file src/db/entities/index.ts
 * @description Master export file for all entities with Zod validation
 * Everything you need for proper data validation in one place
 */

import type { z } from "zod";

// Export all data entities (the main ones)
export * from "./data";

// Export all translated entities
export * from "./translated";

// Re-export Zod for convenience
export { z } from "zod";

// Common entity operations
export const EntityOperations = {
  /**
   * Validate any entity with its corresponding schema
   */
  validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
  },

  /**
   * Safe validation that doesn't throw
   */
  validateSafe(schema: z.ZodSchema, data: unknown) {
    return schema.safeParse(data);
  },

  /**
   * Validate arrays of entities
   */
  validateArray<T>(schema: z.ZodSchema<T>, data: unknown): T[] {
    return schema.array().parse(data);
  },
};

/**
 * Utility for creating type-safe entity validators
 */
export const createEntityValidator = <T>(schema: z.ZodSchema<T>) => ({
  validate: (data: unknown): T => schema.parse(data),
  validateSafe: (data: unknown) => schema.safeParse(data),
  validateArray: (data: unknown): T[] => schema.array().parse(data),
});
