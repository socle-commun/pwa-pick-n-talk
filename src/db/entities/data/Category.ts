import { z } from "zod";

/**
 * Category entity schema with validation error keys for i18n
 */
export const CategorySchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  icon: z.instanceof(Blob, { message: "validation.errors.invalid_file" }),
  
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  
  pictograms: z.array(z.string().uuid("validation.errors.invalid_uuid")).optional(),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Validation helpers
 */
export const validateCategory = (data: unknown): Category => {
  return CategorySchema.parse(data);
};

export const validateCategoryPartial = (data: unknown) => {
  return CategorySchema.partial().parse(data);
};
