import { z } from "zod";

/**
 * Translation entity schema
 * Teaching your translations to validate themselves
 */
export const TranslationSchema = z.object({
  id: z.number().int().positive().optional(),
  
  objectUuid: z.string().uuid("Object UUID invalid"),
  language: z.string().min(2, "Language code too short").max(10, "Language code too long"),
  
  key: z.string().optional(),
  
  value: z.string().min(1, "Translation value cannot be empty"),
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
