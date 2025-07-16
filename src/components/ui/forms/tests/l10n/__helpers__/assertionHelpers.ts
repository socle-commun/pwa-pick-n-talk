import { expect } from "vitest";

/**
 * Helpers d'assertion pour les tests de traduction
 */
export const translationAssertions = {
  /**
   * Vérifie qu'un message contient les paramètres interpolés
   */
  expectInterpolation(message: string, params: Record<string, unknown>) {
    Object.entries(params).forEach(([key, value]) => {
      expect(message).toContain(String(value));
      expect(message).not.toContain(`{{${key}}}`);
    });
  },

  /**
   * Vérifie qu'un message est dans la langue attendue
   */
  expectLanguage(message: string, language: "en-US" | "fr-FR") {
    if (language === "fr-FR") {
      // Vérifie la présence de mots français typiques
      const frenchWords = ["obligatoire", "invalide", "caractères", "minimum", "maximum", "attendu"];
      const containsFrench = frenchWords.some(word => message.toLowerCase().includes(word));
      expect(containsFrench).toBe(true);
    } else {
      // Vérifie la présence de mots anglais typiques
      const englishWords = ["required", "invalid", "characters", "minimum", "maximum", "expected"];
      const containsEnglish = englishWords.some(word => message.toLowerCase().includes(word));
      expect(containsEnglish).toBe(true);
    }
  },

  /**
   * Vérifie qu'aucune clé de traduction brute n'apparaît
   */
  expectNoRawKeys(message: string) {
    expect(message).not.toMatch(/^validation\.errors\./);
    expect(message).not.toContain("{{");
    expect(message).not.toContain("}}");
  }
};
