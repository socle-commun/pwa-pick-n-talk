import { z } from "zod";

/**
 * Pictogram entity schema with validation error keys for i18n
 */
export const PictogramSchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  
  image: z.instanceof(Blob, { message: "validation.errors.invalid_file" }).optional(),
  sound: z.instanceof(Blob, { message: "validation.errors.invalid_file" }).optional(),
  isFavorite: z.boolean(),
  
  binderUuid: z.string().uuid("validation.errors.invalid_uuid"),
  categories: z.array(z.string().uuid("validation.errors.invalid_uuid")).optional(),
  
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
});

export type Pictogram = z.infer<typeof PictogramSchema>;

/**
 * Validation helpers
 */
export const validatePictogram = (data: unknown): Pictogram => {
  return PictogramSchema.parse(data);
};

export const validatePictogramPartial = (data: unknown) => {
  return PictogramSchema.partial().parse(data);
};
