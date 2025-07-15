import { z } from "zod";

/**
 * TranslatedBinder entity schema
 * Because even translations need proper validation, shocking concept
 */
export const TranslatedBinderSchema = z.object({
  uuid: z.string().uuid("Translated binder UUID invalid"),
  
  author: z.string().min(1, "Author cannot be empty"),
  
  title: z.string().min(1, "Title cannot be empty").max(200, "Title too long"),
  description: z.string().min(1, "Description cannot be empty").max(1000, "Description too long"),
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
