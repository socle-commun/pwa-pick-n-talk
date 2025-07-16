/**
 * Central export point for all Zod validation schemas
 * 
 * This file provides unified access to all model validation schemas,
 * validation helpers, and type guards for runtime type safety.
 */

// User schema and validators
export {
  UserSchema,
  validateUser,
  validateUserSafe,
  validateUserPartial,
  isValidUser,
  type UserValidated
} from "./User";

// Binder schema and validators
export {
  BinderSchema,
  validateBinder,
  validateBinderSafe,
  validateBinderPartial,
  isValidBinder,
  type BinderValidated
} from "./Binder";

// Category schema and validators
export {
  CategorySchema,
  validateCategory,
  validateCategorySafe,
  validateCategoryPartial,
  isValidCategory,
  type CategoryValidated
} from "./Category";

// Pictogram schema and validators
export {
  PictogramSchema,
  validatePictogram,
  validatePictogramSafe,
  validatePictogramPartial,
  isValidPictogram,
  type PictogramValidated
} from "./Pictogram";

// History schema and validators
export {
  HistorySchema,
  validateHistory,
  validateHistorySafe,
  validateHistoryPartial,
  isValidHistory,
  type HistoryValidated
} from "./History";

// Setting schema and validators
export {
  SettingSchema,
  validateSetting,
  validateSettingSafe,
  validateSettingPartial,
  isValidSetting,
  type SettingValidated
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