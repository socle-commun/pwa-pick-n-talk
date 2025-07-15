import { z } from "zod";

/**
 * Translation entity schema
 * Teaching your translations to validate themselves
 */
export const TranslationSchema = z.object({
  id: z.number().int().positive().optional(),
  
  objectUuid: z.string().uuid("validation.errors.invalid_uuid"),
  language: z.string().min(2, "validation.errors.string_too_short").max(10, "validation.errors.string_too_long"),
  
  key: z.string().optional(),
  
  value: z.string().min(1, "validation.errors.field_empty"),
});

export type Translation = z.infer<typeof TranslationSchema>;

/**
 * Validation helpers
 */
export const validateTranslation = (data: unknown): Translation => {
  return TranslationSchema.parse(data);
};

export const validateTranslationPartial = (data: unknown) => {
  return TranslationSchema.partial().parse(data);
};
