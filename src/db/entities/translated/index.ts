// Export all translated schemas and types
export * from "./TranslatedBinder";
export * from "./TranslatedPictogram";
export * from "./TranslatedCategory";

// Re-export common utilities from main entities
export { validateUUID, validateEmail, createValidator } from "../data";

import {
  TranslatedBinderSchema,
  TranslatedPictogramSchema,
  TranslatedCategorySchema
} from ".";

/**
 * Utility to validate arrays of translated entities
 */
export const validateTranslatedEntities = {
  binders: (data: unknown) => TranslatedBinderSchema.array().parse(data),
  pictograms: (data: unknown) => TranslatedPictogramSchema.array().parse(data),
  categories: (data: unknown) => TranslatedCategorySchema.array().parse(data),
};
