import { z } from "zod";

// Schémas de base réutilisables
export const BasicFormSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  name: z.string().min(1, "validation.errors.field_empty"),
});

export const FullFormSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  name: z.string().min(1, "validation.errors.field_empty"),
  password: z.string().min(8, "validation.errors.string_too_short"),
  age: z.number().min(18, "validation.errors.number_too_small")
    .max(120, "validation.errors.number_too_big"),
  bio: z.string().max(500, "validation.errors.string_too_long").optional(),
});

export const ValidationTestSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  required: z.string().min(1, "validation.errors.field_empty"),
  shortText: z.string().min(8, "validation.errors.string_too_short"),
  longText: z.string().max(100, "validation.errors.string_too_long"),
  minNumber: z.number().min(18, "validation.errors.number_too_small"),
  maxNumber: z.number().max(120, "validation.errors.number_too_big"),
});

// Types inférés
export type BasicFormData = z.infer<typeof BasicFormSchema>;
export type FullFormData = z.infer<typeof FullFormSchema>;
export type ValidationTestData = z.infer<typeof ValidationTestSchema>;

// Props par défaut communes
export const createDefaultProps = <T>(schema: z.ZodSchema<T>, initialValues: T) => ({
  schema,
  initialValues,
});

export const basicFormProps = createDefaultProps(BasicFormSchema, {
  email: "",
  name: "",
});

export const fullFormProps = createDefaultProps(FullFormSchema, {
  email: "",
  name: "",
  password: "",
  age: 0,
  bio: "",
});

export const validationTestProps = createDefaultProps(ValidationTestSchema, {
  email: "",
  required: "",
  shortText: "",
  longText: "",
  minNumber: 0,
  maxNumber: 0,
});
