import { z } from "zod";

/**
 * TranslatedBinder entity schema with validation error keys for i18n
 */
export const TranslatedBinderSchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  author: z.string().min(1, "validation.errors.field_empty"),
  
  title: z.string().min(1, "validation.errors.field_empty").max(200, "validation.errors.string_too_long"),
  description: z.string().min(1, "validation.errors.field_empty").max(1000, "validation.errors.string_too_long"),
});

export type TranslatedBinder = z.infer<typeof TranslatedBinderSchema>;

/**
 * Validation helpers
 */
export const validateTranslatedBinder = (data: unknown): TranslatedBinder => {
  return TranslatedBinderSchema.parse(data);
};

export const validateTranslatedBinderPartial = (data: unknown) => {
  return TranslatedBinderSchema.partial().parse(data);
};
