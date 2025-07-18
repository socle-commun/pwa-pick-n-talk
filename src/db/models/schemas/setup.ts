import { z } from "zod";

/**
 * Onboarding form schema for multi-step tutorial
 */
export const OnboardingSchema = z.object({
  // Step 1: Settings & Accessibility
  enableNotifications: z.boolean().default(true),
  preferredLanguage: z.string().optional(),
  enableSounds: z.boolean().default(true),
  
  // Step 2: Welcome
  welcomeAcknowledged: z.boolean().default(false),
  
  // Step 3: Enhanced Binder Creation
  binderName: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
  binderDescription: z.string().optional(),
  binderCategories: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).optional(),
  binderPictograms: z.array(z.string()).optional(),
  
  // Step 4: Completion
  completed: z.boolean().default(false),
});

export type OnboardingFormData = z.infer<typeof OnboardingSchema>;

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

export const BinderStepSchema = OnboardingSchema.pick({
  binderName: true,
  binderDescription: true,
  binderCategories: true,
  binderPictograms: true,
});

export const CompletionStepSchema = OnboardingSchema.pick({
  completed: true,
});

export type SettingsStepData = z.infer<typeof SettingsStepSchema>;
export type WelcomeStepData = z.infer<typeof WelcomeStepSchema>;
export type BinderStepData = z.infer<typeof BinderStepSchema>;
export type CompletionStepData = z.infer<typeof CompletionStepSchema>;