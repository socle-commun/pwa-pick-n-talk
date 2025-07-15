import { z } from "zod";

/**
 * Category entity schema
 * Adding some brain cells to your data structures
 */
export const CategorySchema = z.object({
  uuid: z.string().uuid("Category UUID invalid, shocking"),
  
  icon: z.instanceof(Blob, { message: "Icon must be a Blob" }),
  
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  
  pictograms: z.array(z.string().uuid("Pictogram UUID invalid")).optional(),
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
