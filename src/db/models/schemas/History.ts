import { z } from "zod";

/**
 * Zod schema for History model validation
 * Provides runtime type safety and validation for history data
 */
export const HistorySchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  entityType: z.enum(["user", "binder", "pictogram", "category"]),
  entityId: z.string().min(1, "validation.errors.field_empty"),
  action: z.enum(["create", "update", "delete", "access", "share", "import", "export"]),
  performedBy: z.string().min(1, "validation.errors.field_empty"),
  timestamp: z.date(),
  changes: z.record(z.string(), z.record(z.string(), z.string())),
});

export type HistoryValidated = z.infer<typeof HistorySchema>;

/**
 * Validation helpers
 */
export const validateHistory = (data: unknown): HistoryValidated => {
  return HistorySchema.parse(data);
};

export const validateHistorySafe = (data: unknown) => {
  return HistorySchema.safeParse(data);
};

export const validateHistoryPartial = (data: unknown): Partial<HistoryValidated> => {
  return HistorySchema.partial().parse(data);
};

/**
 * Type guard for History validation
 */
export const isValidHistory = (data: unknown): data is HistoryValidated => {
  return HistorySchema.safeParse(data).success;
};