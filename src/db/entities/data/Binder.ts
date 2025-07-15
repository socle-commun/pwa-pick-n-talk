import { z } from "zod";

/**
 * Binder entity schema
 * Finally, some structure in your chaotic codebase
 */
export const BinderSchema = z.object({
  uuid: z.string().uuid("Invalid UUID, do you even generate them properly?"),
  
  author: z.string().min(1, "Author cannot be empty, obviously"),
  icon: z.instanceof(Blob, { message: "Icon must be a Blob" }).optional(),
  
  properties: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  
  pictograms: z.array(z.string().uuid("Pictogram UUID invalid")).optional(),
  users: z.array(z.string().uuid("User UUID invalid")).optional(),
});

export type Binder = z.infer<typeof BinderSchema>;

/**
 * Validation helpers
 */
export const validateBinder = (data: unknown): Binder => {
  return BinderSchema.parse(data);
};

export const validateBinderPartial = (data: unknown) => {
  return BinderSchema.partial().parse(data);
};
