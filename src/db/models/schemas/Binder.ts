import { z } from "zod";

/**
 * Zod schema for Binder model validation
 * Provides runtime type safety and validation for binder data
 */
export const BinderSchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  author: z.string().min(1, "validation.errors.field_empty"),
  image: z.instanceof(Blob).optional(),
  isFavorite: z.boolean().default(false),
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  pictograms: z.array(z.string()).optional(),
  users: z.array(z.string()).optional(),
});

export type Binder = z.infer<typeof BinderSchema>;

/**
 * Validation helpers
 */
export const validateBinder = (data: unknown): Binder => {
  return BinderSchema.parse(data);
};

export const validateBinderSafe = (data: unknown) => {
  return BinderSchema.safeParse(data);
};

export const validateBinderPartial = (data: unknown): Partial<Binder> => {
  return BinderSchema.partial().parse(data);
};

/**
 * Type guard for Binder validation
 */
export const isValidBinder = (data: unknown): data is Binder => {
  return BinderSchema.safeParse(data).success;
};
