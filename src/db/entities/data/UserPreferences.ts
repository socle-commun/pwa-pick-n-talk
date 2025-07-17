import { z } from "zod";

/**
 * Daltonism types for color accessibility support
 */
export const DaltonismTypeSchema = z.enum([
  "none",
  "protanopia",
  "deuteranopia",
  "tritanopia"
]);
export type DaltonismType = z.infer<typeof DaltonismTypeSchema>;

/**
 * User preferences schema for application settings
 * Provides runtime type safety and validation for user preference data
 */
export const UserPreferencesSchema = z.object({
  daltonism: z.object({
    enabled: z.boolean().default(false),
    type: DaltonismTypeSchema.default("none"),
  }).default({
    enabled: false,
    type: "none",
  }),
  locale: z.string().default("en"),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

/**
 * Validation helpers
 */
export const validateUserPreferences = (data: unknown): UserPreferences => {
  return UserPreferencesSchema.parse(data);
};

export const validateUserPreferencesSafe = (data: unknown) => {
  return UserPreferencesSchema.safeParse(data);
};

export const validateUserPreferencesPartial = (data: unknown): Partial<UserPreferences> => {
  return UserPreferencesSchema.partial().parse(data);
};

/**
 * Type guard for UserPreferences validation
 */
export const isValidUserPreferences = (data: unknown): data is UserPreferences => {
  return UserPreferencesSchema.safeParse(data).success;
};

/**
 * Default user preferences
 */
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  daltonism: {
    enabled: false,
    type: "none",
  },
  locale: "en",
};
