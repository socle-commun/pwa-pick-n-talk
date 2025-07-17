/**
 * @file src/db/models/index.ts
 * @description Central export point for all database models with Zod validation.
 *
 * This file consolidates all model schemas and validated types,
 * replacing the old interface-based approach with runtime-safe Zod schemas.
 *
 * Usage:
 * import { UserSchema, type User } from "@/db/models";
 * import { validateUser } from "@/db/models";
 */

// Export all schemas, types, and validation helpers
export {
  // Shared types
  RoleSchema,
  EntityTypeSchema,
  HistoryActionSchema,
  type Role,
  type EntityType,
  type HistoryAction,

  // User exports
  UserSchema,
  validateUser,
  validateUserSafe,
  validateUserPartial,
  isValidUser,
  type User,

  // Binder exports
  BinderSchema,
  validateBinder,
  validateBinderSafe,
  validateBinderPartial,
  isValidBinder,
  type Binder,

  // Category exports
  CategorySchema,
  validateCategory,
  validateCategorySafe,
  validateCategoryPartial,
  isValidCategory,
  type Category,

  // History exports
  HistorySchema,
  validateHistory,
  validateHistorySafe,
  validateHistoryPartial,
  isValidHistory,
  type History,

  // Pictogram exports
  PictogramSchema,
  validatePictogram,
  validatePictogramSafe,
  validatePictogramPartial,
  isValidPictogram,
  type Pictogram,

  // Setting exports
  SettingSchema,
  validateSetting,
  validateSettingSafe,
  validateSettingPartial,
  isValidSetting,
  type Setting,
} from "./schemas";
