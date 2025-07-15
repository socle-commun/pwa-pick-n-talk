import { vi } from "vitest";
import { fireEvent } from "@testing-library/react";

// Mock i18next commun pour tous les tests
export const mockI18next = () => {
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

// Helpers pour remplir les formulaires rapidement
export const fillValidForm = (
  getByLabelText: (text: string) => HTMLElement,
  formType: "basic" | "full" = "basic"
) => {
  const baseData = {
    email: "test@example.com",
    name: "John Doe",
  };

  const fullData = {
    ...baseData,
    password: "password123",
    age: "25",
    bio: "A valid bio text",
  };

  const data = formType === "full" ? fullData : baseData;

  Object.entries(data).forEach(([field, value]) => {
    const input = getByLabelText(field.charAt(0).toUpperCase() + field.slice(1));
    if (input) {
      fireEvent.change(input, { target: { value } });
    }
  });
};

// Helper pour simuler les interactions utilisateur communes
export const simulateUserInput = (input: HTMLElement, value: string, shouldBlur = true) => {
  fireEvent.change(input, { target: { value } });
  if (shouldBlur) {
    fireEvent.blur(input);
  }
};
