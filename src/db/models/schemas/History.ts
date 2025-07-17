import { z } from "zod";
import { EntityTypeSchema, HistoryActionSchema } from "./shared-types";

/**
 * Zod schema for History model validation
 * Provides runtime type safety and validation for history data
 */
export const HistorySchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  entityType: EntityTypeSchema,
  entityId: z.string().min(1, "validation.errors.field_empty"),
  action: HistoryActionSchema,
  performedBy: z.string().min(1, "validation.errors.field_empty"),
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

export const validateHistorySafe = (data: unknown) => {
  return HistorySchema.safeParse(data);
};

export const validateHistoryPartial = (data: unknown): Partial<History> => {
  return HistorySchema.partial().parse(data);
};

/**
 * Type guard for History validation
 */
export const isValidHistory = (data: unknown): data is History => {
  return HistorySchema.safeParse(data).success;
};