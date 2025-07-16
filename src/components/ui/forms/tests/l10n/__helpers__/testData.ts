/**
 * Données de test pour différents scénarios de validation
 */
import { z } from "zod";

export const validationTestData = {
  stringTooShort: {
    value: "abc",
    expectedKey: "validation.errors.string_too_short",
    params: { min: 8 }
  },
  stringTooLong: {
    value: "a".repeat(101),
    expectedKey: "validation.errors.string_too_long",
    params: { max: 100 }
  },
  numberTooSmall: {
    value: 10,
    expectedKey: "validation.errors.number_too_small",
    params: { min: 18 }
  },
  numberTooBig: {
    value: 150,
    expectedKey: "validation.errors.number_too_big",
    params: { max: 120 }
  },
  invalidEmail: {
    value: "invalid-email",
    expectedKey: "validation.errors.invalid_email",
    params: {}
  },
  fieldEmpty: {
    value: "",
    expectedKey: "validation.errors.field_empty",
    params: {}
  }
};

/**
 * Langues supportées pour les tests
 */
export const supportedLanguages = ["en-US", "fr-FR"] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

/**
 * Schemas de test pour différents scénarios de validation
 */
export const validationTestSchemas = {
  requiredField: z.object({
    name: z.string().min(1, "validation.errors.required"),
    email: z.string().min(1, "validation.errors.required")
  }),
  stringLength: z.object({
    name: z.string().min(3, "validation.errors.string_too_short"),
    description: z.string().max(100, "validation.errors.string_too_long").optional()
  }),
  multipleErrors: z.object({
    name: z.string().min(3, "validation.errors.string_too_short"),
    email: z.string().email("validation.errors.invalid_email"),
    description: z.string().max(100, "validation.errors.string_too_long")
  })
};

export type TestFormSchema = z.infer<typeof validationTestSchemas.requiredField>;

/**
 * Messages de validation traduits pour les tests
 */
export const testTranslations = {
  "en-US": {
    validation: {
      errors: {
        required: "This field is required",
        string_too_short: "Text too short (minimum {{min}} characters)",
        string_too_long: "Text too long (maximum {{max}} characters)",
        invalid_email: "Invalid email format",
        invalid_uuid: "Invalid UUID format",
        number_too_small: "Number too small (minimum {{min}})",
        number_too_big: "Number too big (maximum {{max}})"
      }
    }
  },
  "fr-FR": {
    validation: {
      errors: {
        required: "Ce champ est requis",
        string_too_short: "Texte trop court (minimum {{min}} caractères)",
        string_too_long: "Texte trop long (maximum {{max}} caractères)",
        invalid_email: "Format d'email invalide",
        invalid_uuid: "Format UUID invalide",
        number_too_small: "Nombre trop petit (minimum {{min}})",
        number_too_big: "Nombre trop grand (maximum {{max}})"
      }
    }
  }
};
