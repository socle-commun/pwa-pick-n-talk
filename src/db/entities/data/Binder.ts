import { z } from "zod";

/**
 * Binder entity schema with validation error keys for i18n
 */
export const BinderSchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  author: z.string().min(1, "validation.errors.field_empty"),
  icon: z.instanceof(Blob, { message: "validation.errors.invalid_file" }).optional(),
  
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  
  pictograms: z.array(z.string().uuid("validation.errors.invalid_uuid")).optional(),
  users: z.array(z.string().uuid("validation.errors.invalid_uuid")).optional(),
});

export type Binder = z.infer<typeof BinderSchema>;

/**
 * Validation helpers
 */
export const validateBinder = (data: unknown): Binder => {
  return BinderSchema.parse(data);
};

export const validateBinderPartial = (data: unknown) => {
  return BinderSchema.partial().parse(data);
};
