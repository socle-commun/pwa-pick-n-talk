import { z } from "zod";

/**
 * Zod schema for Setting model validation
 * Provides runtime type safety and validation for settings data
 */
export const SettingSchema = z.object({
  key: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
  value: z.union([z.boolean(), z.number(), z.string(), z.object({})]),
});

export type Setting = z.infer<typeof SettingSchema>;

/**
 * Validation helpers
 */
export const validateSetting = (data: unknown): Setting => {
  return SettingSchema.parse(data);
};

export const validateSettingSafe = (data: unknown) => {
  return SettingSchema.safeParse(data);
};

export const validateSettingPartial = (data: unknown): Partial<Setting> => {
  return SettingSchema.partial().parse(data);
};

/**
 * Type guard for Setting validation
 */
export const isValidSetting = (data: unknown): data is Setting => {
  return SettingSchema.safeParse(data).success;
};