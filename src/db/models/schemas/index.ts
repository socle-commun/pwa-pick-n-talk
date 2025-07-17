/**
 * Central export point for all Zod validation schemas
 *
 * This file provides unified access to all model validation schemas,
 * validation helpers, and type guards for runtime type safety.
 */

// Shared types
export {
  RoleSchema,
  EntityTypeSchema,
  HistoryActionSchema,
  type Role,
  type EntityType,
  type HistoryAction
} from "./shared-types";

// User schema and validators
export {
  UserSchema,
  validateUser,
  validateUserSafe,
  validateUserPartial,
  isValidUser,
  type User
} from "./User";

// Binder schema and validators
export {
  BinderSchema,
  validateBinder,
  validateBinderSafe,
  validateBinderPartial,
  isValidBinder,
  type Binder
} from "./Binder";

// Category schema and validators
export {
  CategorySchema,
  validateCategory,
  validateCategorySafe,
  validateCategoryPartial,
  isValidCategory,
  type Category
} from "./Category";

// Pictogram schema and validators
export {
  PictogramSchema,
  validatePictogram,
  validatePictogramSafe,
  validatePictogramPartial,
  isValidPictogram,
  type Pictogram
} from "./Pictogram";

// History schema and validators
export {
  HistorySchema,
  validateHistory,
  validateHistorySafe,
  validateHistoryPartial,
  isValidHistory,
  type History
} from "./History";

// Setting schema and validators
export {
  SettingSchema,
  validateSetting,
  validateSettingSafe,
  validateSettingPartial,
  isValidSetting,
  type Setting
} from "./Setting";

/**
 * Generic validation utilities for any schema
 */
export const EntityOperations = {
  validate: <T>(schema: import("zod").ZodSchema<T>, data: unknown): T => {
    return schema.parse(data);
  },
  validateSafe: <T>(schema: import("zod").ZodSchema<T>, data: unknown) => {
    return schema.safeParse(data);
  },
};