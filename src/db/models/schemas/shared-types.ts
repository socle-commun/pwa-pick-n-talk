/**
 * @file src/db/models/schemas/shared-types.ts
 * @description Shared types and enums used across multiple schemas.
 *
 * This file contains common types that are referenced by multiple models,
 * ensuring consistency and avoiding duplication.
 */

import { z } from "zod";

/**
 * User roles in the application
 */
export const RoleSchema = z.enum(["user", "caregiver", "professional"]);
export type Role = z.infer<typeof RoleSchema>;

/**
 * Entity types for history tracking
 */
export const EntityTypeSchema = z.enum(["user", "binder", "pictogram", "category"]);
export type EntityType = z.infer<typeof EntityTypeSchema>;

/**
 * History actions for audit trail
 */
export const HistoryActionSchema = z.enum([
  "create",
  "update",
  "delete",
  "access",
  "share",
  "import",
  "export",
  "setupStarted"
]);
export type HistoryAction = z.infer<typeof HistoryActionSchema>;
