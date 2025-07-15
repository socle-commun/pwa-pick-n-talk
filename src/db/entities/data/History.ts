import { z } from "zod";
import { EntityTypeSchema, HistoryActionSchema } from "./Types";

/**
 * @file src/db/entities/data/History.ts
 * @description Represents a history record in the database.
 * This record tracks changes made to entities in the application.
 * It includes the entity type, entity ID, action performed, user who performed the action,
 * timestamp of the action, and the changes made.
 * Now with proper validation because tracking garbage isn't useful.
 */
export const HistorySchema = z.object({
  uuid: z.string().uuid("History UUID invalid"),
  
  entityType: EntityTypeSchema,
  entityId: z.string().uuid("Entity ID must be a valid UUID"),
  
  action: HistoryActionSchema,
  performedBy: z.string().uuid("Performer ID must be a valid UUID"),
  timestamp: z.date(),
  
  changes: z.record(z.string(), z.record(z.string(), z.string())),
});

export type History = z.infer<typeof HistorySchema>;

/**
 * Validation helpers
 */
export const validateHistory = (data: unknown): History => {
  return HistorySchema.parse(data);
};

export const validateHistoryPartial = (data: unknown) => {
  return HistorySchema.partial().parse(data);
};
