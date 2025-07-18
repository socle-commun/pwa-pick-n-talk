import { z } from "zod";

/**
 * User account creation schema for setup
 */
export const UserAccountSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
  email: z.string().email("validation.errors.invalid_email"),
  password: z.string().optional(),
});

/**
 * Setup form schema for multi-step tutorial
 */
export const OnboardingSchema = z.object({
  // Step 1: Settings & Accessibility
  enableNotifications: z.boolean().default(true),
  preferredLanguage: z.string().optional(),
  enableSounds: z.boolean().default(true),

  // Step 2: Welcome (informational only)
  welcomeAcknowledged: z.boolean().default(false),

  // Step 3: Caregiver Account Creation
  caregiver: UserAccountSchema.optional(),

  // Step 4: User Account Creation
  users: z.array(UserAccountSchema).default([]),

  // Step 5: Enhanced Binder Creation
  binderName: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
  binderDescription: z.string().optional(),
  binderCategories: z.array(z.object({
    id: z.string(),
    name: z.string(),
    pictograms: z.array(z.string()).optional(),
  })).optional(),
  binderPictograms: z.array(z.string()).optional(),
  binderAssignedUsers: z.array(z.string()).default([]),

  // Step 6: Completion
  completed: z.boolean().default(false),
});

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;
export type UserAccountData = z.infer<typeof UserAccountSchema>;

/**
 * Individual step schemas for validation
 */
export const SettingsStepSchema = OnboardingSchema.pick({
  enableNotifications: true,
  preferredLanguage: true,
  enableSounds: true,
});

export const WelcomeStepSchema = OnboardingSchema.pick({
  welcomeAcknowledged: true,
});

export const CaregiverStepSchema = OnboardingSchema.pick({
  caregiver: true,
});

export const UsersStepSchema = OnboardingSchema.pick({
  users: true,
});

export const BinderStepSchema = OnboardingSchema.pick({
  binderName: true,
  binderDescription: true,
  binderCategories: true,
  binderPictograms: true,
  binderAssignedUsers: true,
});

export const CompletionStepSchema = OnboardingSchema.pick({
  completed: true,
});

export type SettingsStepData = z.infer<typeof SettingsStepSchema>;
export type WelcomeStepData = z.infer<typeof WelcomeStepSchema>;
export type CaregiverStepData = z.infer<typeof CaregiverStepSchema>;
export type UsersStepData = z.infer<typeof UsersStepSchema>;
export type BinderStepData = z.infer<typeof BinderStepSchema>;
export type CompletionStepData = z.infer<typeof CompletionStepSchema>;
