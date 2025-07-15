import { z } from "zod";

/**
 * TranslatedPictogram entity schema
 * Adding intelligence to your pictogram translations
 */
export const TranslatedPictogramSchema = z.object({
  uuid: z.string().uuid("Translated pictogram UUID invalid"),
  
  image: z.instanceof(Blob, { message: "Image must be a Blob" }).optional(),
  
  binderUuid: z.string().uuid("Binder UUID invalid"),
  categories: z.array(z.string().uuid("Category UUID invalid")).optional(),
  
  word: z.string().min(1, "Word cannot be empty").max(100, "Word too long"),
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
