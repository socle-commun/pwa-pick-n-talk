import { z } from "zod";

/**
 * TranslatedCategory entity schema
 * Because categories also deserve validation love
 */
export const TranslatedCategorySchema = z.object({
  uuid: z.string().uuid("Translated category UUID invalid"),
  
  icon: z.instanceof(Blob, { message: "Icon must be a Blob" }),
  
  name: z.string().min(1, "Category name cannot be empty").max(100, "Category name too long"),
});

export type TranslatedCategory = z.infer<typeof TranslatedCategorySchema>;

/**
 * Validation helpers
 */
export const validateTranslatedCategory = (data: unknown): TranslatedCategory => {
  return TranslatedCategorySchema.parse(data);
};

export const validateTranslatedCategoryPartial = (data: unknown) => {
  return TranslatedCategorySchema.partial().parse(data);
};
