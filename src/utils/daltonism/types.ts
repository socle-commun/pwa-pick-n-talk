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
 * Daltonism configuration schema
 */
export const DaltonismConfigSchema = z.object({
  enabled: z.boolean().default(false),
  type: DaltonismTypeSchema.default("none"),
});

export type DaltonismConfig = z.infer<typeof DaltonismConfigSchema>;

/**
 * Default daltonism configuration
 */
export const DEFAULT_DALTONISM_CONFIG: DaltonismConfig = {
  enabled: false,
  type: "none",
};