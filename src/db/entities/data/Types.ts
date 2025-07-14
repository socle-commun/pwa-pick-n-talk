/**
 * @file src/db/entities/data/Types.ts
 * @description The different possible users roles in the application.
 * This is used to define the permissions and access levels for different users.
 */
export type Role = "user" | "caregiver" | "professional";

/**
 * @file src/db/entities/data/Types.ts
 * @description The different types of entities in the application.
 * This is used to categorize the entities in the database and define their history.
 */
export type EntityType = "user" | "binder" | "pictogram" | "category";

/**
 * @file src/db/entities/data/Types.ts
 * @description The different actions that can be performed on entities in the application.
 * This is used to track the history of changes made to entities.
 * It helps in auditing and understanding the changes made over time.
 */
export type HistoryAction =
  | "create"
  | "update"
  | "delete"
  | "access"
  | "share"
  | "import"
  | "export";
