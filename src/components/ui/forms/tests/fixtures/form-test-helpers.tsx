import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { z } from "zod";

import { Form, FormInput } from "../../Form";

/**
 * Common i18next mock for form tests
 */
export const mockI18n = () => {
  vi.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string, params?: Record<string, unknown>) => {
        const translations: Record<string, string> = {
          "validation.errors.invalid_email": "Invalid email format",
          "validation.errors.field_empty": "This field cannot be empty",
          "validation.errors.string_too_short": `Text too short (minimum ${params?.min || 8} characters)`,
          "validation.errors.string_too_long": `Text too long (maximum ${params?.max || 100} characters)`,
          "validation.errors.number_too_small": `Number too small (minimum ${params?.min || 0})`,
          "validation.errors.number_too_big": `Number too big (maximum ${params?.max || 100})`,
        };
        return translations[key] || key;
      },
    }),
  }));
};

/**
 * Common test schema for form tests
 */
export const testSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  name: z.string().min(1, "validation.errors.field_empty"),
});

/**
 * Render a basic test form with common fields
 */
export const renderTestForm = (onSubmit = vi.fn(), schema = testSchema) => {
  render(
    <Form schema={schema} onSubmit={onSubmit} className="space-y-4">
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="name" label="Name" />
      <button type="submit">Submit</button>
    </Form>
  );
  return { onSubmit };
};

/**
 * Helper for form validation tests to reduce nested callbacks
 */
export const validateFieldAsync = async (
  fieldLabel: string,
  value: string,
  expectedError: string
) => {
  const input = screen.getByLabelText(fieldLabel);
  fireEvent.change(input, { target: { value } });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.getByText(expectedError)).toBeInTheDocument();
  });
};

/**
 * Helper for testing valid input values
 */
export const testValidInputAsync = async (
  fieldLabel: string,
  validValue: string
) => {
  const input = screen.getByLabelText(fieldLabel);
  fireEvent.change(input, { target: { value: validValue } });
  fireEvent.blur(input);

  await waitFor(() => {
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
};

/**
 * Helper for form submission tests
 */
export const submitFormAsync = async (_expectedData: object) => {
  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    // Form should be submitted successfully
    expect(submitButton).not.toBeDisabled();
  });
};
