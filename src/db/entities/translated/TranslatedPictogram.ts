import { z } from "zod";

/**
 * TranslatedPictogram entity schema with validation error keys for i18n
 */
export const TranslatedPictogramSchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  image: z.instanceof(Blob, { message: "validation.errors.invalid_file" }).optional(),
  
  binderUuid: z.string().uuid("validation.errors.invalid_uuid"),
  categories: z.array(z.string().uuid("validation.errors.invalid_uuid")).optional(),
  
  word: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
});

export type TranslatedPictogram = z.infer<typeof TranslatedPictogramSchema>;

/**
 * Validation helpers
 */
export const validateTranslatedPictogram = (data: unknown): TranslatedPictogram => {
  return TranslatedPictogramSchema.parse(data);
};

export const validateTranslatedPictogramPartial = (data: unknown) => {
  return TranslatedPictogramSchema.partial().parse(data);
};
