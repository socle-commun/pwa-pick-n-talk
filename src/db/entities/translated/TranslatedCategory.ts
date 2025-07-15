import { z } from "zod";

/**
 * TranslatedCategory entity schema with validation error keys for i18n
 */
export const TranslatedCategorySchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  icon: z.instanceof(Blob, { message: "validation.errors.invalid_file" }),
  
  name: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
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
