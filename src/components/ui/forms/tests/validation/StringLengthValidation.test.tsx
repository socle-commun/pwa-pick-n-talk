import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        "validation.errors.string_too_short":
          `Text too short (minimum ${params?.min || 8} characters)`,
        "validation.errors.string_too_long":
          `Text too long (maximum ${params?.max || 100} characters)`,
      };
      return translations[key] || key;
    },
  }),
}));

describe("String Length Validation", () => {
  const StringSchema = z.object({
    password: z.string().min(8, "validation.errors.string_too_short"),
    bio: z.string().max(100, "validation.errors.string_too_long"),
    description: z.string().min(10, "validation.errors.string_too_short")
      .max(200, "validation.errors.string_too_long"),
  });

  type StringFormData = z.infer<typeof StringSchema>;

  const defaultProps = {
    schema: StringSchema,
    initialValues: { password: "", bio: "", description: "" },
  };

  it("shows error for password too short", async () => {
    render(
      <Form<StringFormData> {...defaultProps}>
        <FormInput name="password" label="Password" type="password" />
      </Form>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText("Text too short (minimum 8 characters)")).toBeInTheDocument();
    });
  });

  it("shows error for bio too long", async () => {
    render(
      <Form<StringFormData> {...defaultProps}>
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    const bioInput = screen.getByLabelText("Bio");
    const longText = "a".repeat(101); // Over 100 character limit
    fireEvent.change(bioInput, { target: { value: longText } });
    fireEvent.blur(bioInput);

    await waitFor(() => {
      expect(screen.getByText("Text too long (maximum 100 characters)")).toBeInTheDocument();
    });
  });

  it("validates both min and max constraints", async () => {
    render(
      <Form<StringFormData> {...defaultProps}>
        <FormInput name="description" label="Description" />
      </Form>
    );

    const descriptionInput = screen.getByLabelText("Description");

    // Test too short
    fireEvent.change(descriptionInput, { target: { value: "short" } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.getByText("Text too short (minimum 10 characters)")).toBeInTheDocument();
    });

    // Test too long
    const longText = "a".repeat(201); // Over 200 character limit
    fireEvent.change(descriptionInput, { target: { value: longText } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.getByText("Text too long (maximum 200 characters)")).toBeInTheDocument();
    });

    // Test valid length
    fireEvent.change(descriptionInput, { target: { value: "A valid description with proper length." } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.queryByText(/Text too/)).not.toBeInTheDocument();
    });
  });
});
