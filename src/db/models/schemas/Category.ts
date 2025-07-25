import { z } from "zod";

/**
 * Zod schema for Category model validation
 * Provides runtime type safety and validation for category data
 */
export const CategorySchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  image: z.instanceof(Blob).optional(),
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  pictograms: z.array(z.string()).optional(),
});

export type Category = z.infer<typeof CategorySchema>;

/**
 * Validation helpers
 */
export const validateCategory = (data: unknown): Category => {
  return CategorySchema.parse(data);
};

export const validateCategorySafe = (data: unknown) => {
  return CategorySchema.safeParse(data);
};

export const validateCategoryPartial = (data: unknown): Partial<Category> => {
  return CategorySchema.partial().parse(data);
};

/**
 * Type guard for Category validation
 */
export const isValidCategory = (data: unknown): data is Category => {
  return CategorySchema.safeParse(data).success;
};
