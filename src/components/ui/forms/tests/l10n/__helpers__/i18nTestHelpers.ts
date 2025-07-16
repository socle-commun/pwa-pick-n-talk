import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { vi } from "vitest";

/**
 * Mock avancé pour i18next avec support réel de l'interpolation
 * et changement de langue dynamique
 */
export class I18nTestHelper {
  private static instance: I18nTestHelper;
  private i18nInstance: typeof i18n | null = null;

  private constructor() {}

  static getInstance(): I18nTestHelper {
    if (!I18nTestHelper.instance) {
      I18nTestHelper.instance = new I18nTestHelper();
    }
    return I18nTestHelper.instance;
  }

  /**
   * Initialise une instance i18next réelle pour les tests
   * avec les ressources de traduction nécessaires
   */
  async initializeI18n() {
    // Configuration minimale avec ressources de test
    await i18n
      .use(initReactI18next)
      .init({
        lng: "en-US",
        fallbackLng: "en-US",
        debug: false,
        interpolation: {
          escapeValue: false,
        },
        resources: {
          "en-US": {
            translation: {
              validation: {
                errors: {
                  required: "This field is required",
                  invalid_uuid: "Invalid UUID format",
                  invalid_email: "Invalid email format",
                  field_empty: "This field cannot be empty",
                  string_too_short: "Text too short (minimum {{min}} characters)",
                  string_too_long: "Text too long (maximum {{max}} characters)",
                  number_too_small: "Number too small (minimum {{min}})",
                  number_too_big: "Number too large (maximum {{max}})",
                  invalid_type: "Invalid type, expected {{expected}}"
                }
              }
            }
          },
          "fr-FR": {
            translation: {
              validation: {
                errors: {
                  required: "Ce champ est obligatoire",
                  invalid_uuid: "Format UUID invalide",
                  invalid_email: "Format d'email invalide",
                  field_empty: "Ce champ ne peut pas être vide",
                  string_too_short: "Texte trop court (minimum {{min}} caractères)",
                  string_too_long: "Texte trop long (maximum {{max}} caractères)",
                  number_too_small: "Nombre trop petit (minimum {{min}})",
                  number_too_big: "Nombre trop grand (maximum {{max}})",
                  invalid_type: "Type invalide, attendu {{expected}}"
                }
              }
            }
          }
        }
      });

    this.i18nInstance = i18n;
    return i18n;
  }

  /**
   * Change la langue de l'instance i18n de test
   */
  async changeLanguage(lng: "en-US" | "fr-FR") {
    if (!this.i18nInstance) {
      throw new Error("I18n not initialized. Call initializeI18n() first.");
    }
    await this.i18nInstance.changeLanguage(lng);
  }

  /**
   * Récupère une traduction avec interpolation
   */
  t(key: string, params?: Record<string, unknown>): string {
    if (!this.i18nInstance) {
      throw new Error("I18n not initialized. Call initializeI18n() first.");
    }
    return this.i18nInstance.t(key, params);
  }

  /**
   * Crée une fonction mock pour les tests de soumission de formulaire
   */
  createMockSubmit() {
    return vi.fn();
  }

  /**
   * Nettoie l'instance pour les tests suivants
   */
  cleanup() {
    this.i18nInstance = null;
  }
}
