import { z } from "zod";

/**
 * Pictogram entity schema
 * Now with actual validation, revolutionary concept I know
 */
export const PictogramSchema = z.object({
  uuid: z.string().uuid("UUID format invalid, surprise surprise"),
  
  image: z.instanceof(Blob, { message: "Image must be a Blob" }).optional(),
  sound: z.instanceof(Blob, { message: "Sound must be a Blob" }).optional(),
  isFavorite: z.boolean(),
  
  binderUuid: z.string().uuid("Binder UUID invalid"),
  categories: z.array(z.string().uuid("Category UUID invalid")).optional(),
  
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
});

export type Pictogram = z.infer<typeof PictogramSchema>;

/**
 * Validation helpers for those who can't handle raw Zod
 */
export const validatePictogram = (data: unknown): Pictogram => {
  return PictogramSchema.parse(data);
};

export const validatePictogramPartial = (data: unknown) => {
  return PictogramSchema.partial().parse(data);
};
