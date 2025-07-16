import { z } from "zod";

/**
 * Sign-in form validation schema
 */
export const SignInSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  password: z.string().min(16, "validation.errors.password_too_short"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;

/**
 * Sign-up form validation schema
 */
export const SignUpSchema = z.object({
  name: z.string().min(2, "validation.errors.name_too_short").max(100, "validation.errors.string_too_long"),
  email: z.string().email("validation.errors.invalid_email"),
  password: z.string().min(16, "validation.errors.password_too_short"),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

/**
 * Forgot password form validation schema
 */
export const ForgotPasswordSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

/**
 * Profile edit form validation schema
 */
export const ProfileEditSchema = z.object({
  name: z.string().min(2, "validation.errors.name_too_short").max(100, "validation.errors.string_too_long"),
  email: z.string().email("validation.errors.invalid_email"),
  role: z.enum(["user", "caregiver", "professional"]),
});

export type ProfileEditFormData = z.infer<typeof ProfileEditSchema>;

/**
 * Binder creation/edit form validation schema
 */
export const BinderFormSchema = z.object({
  id: z.string().min(1, "validation.errors.field_empty"),
  author: z.string().min(1, "validation.errors.field_empty"),
  isFavorite: z.boolean().default(false),
});

export type BinderFormData = z.infer<typeof BinderFormSchema>;