import { z } from "zod";

/**
 * Setting entity schema
 * Because settings without validation are just chaos
 */
export const SettingSchema = z.object({
  key: z.string().min(1, "validation.errors.field_empty"),
  value: z.union([
    z.boolean(),
    z.number(),
    z.string(),
    z.record(z.string(), z.unknown())
  ]),
});

export type Setting = z.infer<typeof SettingSchema>;

/**
 * Validation helpers
 */
export const validateSetting = (data: unknown): Setting => {
  return SettingSchema.parse(data);
};

export const validateSettingPartial = (data: unknown) => {
  return SettingSchema.partial().parse(data);
};
