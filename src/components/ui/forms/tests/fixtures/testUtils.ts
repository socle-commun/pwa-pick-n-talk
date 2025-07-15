import { vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";

// Configuration de Faker pour des résultats reproductibles dans les tests
faker.seed(123);

// Mock react-i18next commun pour tous les tests
export const mockL10n = () => {
  vi.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string, params?: Record<string, unknown>) => {
        const translations: Record<string, string> = {
          "validation.errors.invalid_email": "Invalid email format",
          "validation.errors.field_empty": "This field cannot be empty",
          "validation.errors.string_too_short":
            `Text too short (minimum ${params?.min || 8} characters)`,
          "validation.errors.string_too_long":
            `Text too long (maximum ${params?.max || 100} characters)`,
          "validation.errors.number_too_small":
            `Number too small (minimum ${params?.min || 0})`,
          "validation.errors.number_too_big":
            `Number too big (maximum ${params?.max || 100})`,
        };
        return translations[key] || key;
      },
    }),
  }));
};

// Générateurs de données valides utilisant Faker
export const generateValidFormData = (type: "basic" | "full" = "basic") => {
  const baseData = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
  };

  if (type === "full") {
    return {
      ...baseData,
      password: faker.internet.password({ length: 12 }),
      age: faker.number.int({ min: 18, max: 65 }),
      bio: faker.person.bio(),
    };
  }

  return baseData;
};

// Helper pour remplir les formulaires avec des données générées
export const fillFormWithData = (
  getByLabelText: (text: string) => HTMLElement,
  data: Record<string, string | number>
) => {
  Object.entries(data).forEach(([field, value]) => {
    try {
      const label = field.charAt(0).toUpperCase() + field.slice(1);
      const input = getByLabelText(label);
      if (input) {
        fireEvent.change(input, { target: { value: value.toString() } });
      }
    } catch {
      // Ignore si le champ n'existe pas dans le formulaire
    }
  });
};

// Helper pour remplir automatiquement avec des données valides
export const fillValidForm = (
  getByLabelText: (text: string) => HTMLElement,
  formType: "basic" | "full" = "basic"
) => {
  const data = generateValidFormData(formType);
  fillFormWithData(getByLabelText, data);
  return data; // Retourne les données générées pour les assertions
};

// Helper pour simuler les interactions utilisateur communes
export const simulateUserInput = (input: HTMLElement, value: string, shouldBlur = true) => {
  fireEvent.change(input, { target: { value } });
  if (shouldBlur) {
    fireEvent.blur(input);
  }
};

// Helper pour générer des données de test spécialisées
export const generateTestCase = (scenario: "valid" | "invalid" | "edge") => {
  switch (scenario) {
    case "valid":
      return {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password({ length: 12 }),
        age: faker.number.int({ min: 18, max: 65 }),
      };
    case "invalid":
      return {
        email: "invalid-email",
        name: "",
        password: faker.internet.password({ length: 3 }),
        age: faker.number.int({ min: 10, max: 17 }),
      };
    case "edge":
      return {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password({ length: 8 }), // Minimum
        age: 18, // Minimum
      };
  }
};
