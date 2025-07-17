import { z } from "zod";

/**
 * Zod schema for Pictogram model validation
 * Provides runtime type safety and validation for pictogram data
 */
export const PictogramSchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  image: z.instanceof(Blob).optional(),
  sound: z.instanceof(Blob).optional(),
  isFavorite: z.boolean().default(false),
  order: z.number().int().min(0, "validation.errors.number_too_small"),
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  binder: z.string().min(1, "validation.errors.field_empty"),
  categories: z.array(z.string()).optional(),
});

export type Pictogram = z.infer<typeof PictogramSchema>;

/**
 * Validation helpers
 */
export const validatePictogram = (data: unknown): Pictogram => {
  return PictogramSchema.parse(data);
};

export const validatePictogramSafe = (data: unknown) => {
  return PictogramSchema.safeParse(data);
};

export const validatePictogramPartial = (data: unknown): Partial<Pictogram> => {
  return PictogramSchema.partial().parse(data);
};

/**
 * Type guard for Pictogram validation
 */
export const isValidPictogram = (data: unknown): data is Pictogram => {
  return PictogramSchema.safeParse(data).success;
};