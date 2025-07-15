import { z } from "zod";

/**
 * @file src/db/entities/data/Types.ts
 * @description The different possible users roles in the application.
 * This is used to define the permissions and access levels for different users.
 */
export const RoleSchema = z.enum(["user", "caregiver", "professional"]);
export type Role = z.infer<typeof RoleSchema>;

/**
 * @file src/db/entities/data/Types.ts
 * @description The different types of entities in the application.
 * This is used to categorize the entities in the database and define their history.
 */
export const EntityTypeSchema = z.enum(["user", "binder", "pictogram", "category"]);
export type EntityType = z.infer<typeof EntityTypeSchema>;

/**
 * @file src/db/entities/data/Types.ts
 * @description The different actions that can be performed on entities in the application.
 * This is used to track the history of changes made to entities.
 * It helps in auditing and understanding the changes made over time.
 */
export const HistoryActionSchema = z.enum([
  "create",
  "update",
  "delete",
  "access",
  "share",
  "import",
  "export",
]);
export type HistoryAction = z.infer<typeof HistoryActionSchema>;
