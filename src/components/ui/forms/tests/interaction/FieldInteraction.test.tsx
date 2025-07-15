import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Form Field Interaction", () => {
  const InteractionSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    password: z.string().min(8, "validation.errors.string_too_short"),
    age: z.number().min(18, "validation.errors.number_too_small"),
    bio: z.string().optional(),
  });

  type InteractionFormData = z.infer<typeof InteractionSchema>;

  const defaultProps = {
    schema: InteractionSchema,
    initialValues: { email: "", password: "", age: 0, bio: "" },
  };

  it("supports different input types correctly", () => {
    render(
      <Form<InteractionFormData> {...defaultProps}>
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("Age")).toHaveAttribute("type", "number");
    expect(screen.getByLabelText("Bio")).toHaveAttribute("type", "text");
  });

  it("maintains focus management correctly", () => {
    render(
      <Form<InteractionFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const ageInput = screen.getByLabelText("Age");

    // Focus email field
    emailInput.focus();
    expect(document.activeElement).toBe(emailInput);

    // Focus password field
    passwordInput.focus();
    expect(document.activeElement).toBe(passwordInput);

    // Focus age field
    ageInput.focus();
    expect(document.activeElement).toBe(ageInput);
  });

  it("handles field clearing correctly", () => {
    render(
      <Form<InteractionFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");
    const bioInput = screen.getByLabelText("Bio");

    // Enter values
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(bioInput, { target: { value: "A bio text" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(bioInput).toHaveValue("A bio text");

    // Clear values
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(bioInput, { target: { value: "" } });

    expect(emailInput).toHaveValue("");
    expect(bioInput).toHaveValue("");
  });

  it("handles disabled state correctly", () => {
    render(
      <Form<InteractionFormData> {...defaultProps}>
        <FormInput name="email" label="Email" disabled />
        <FormInput name="password" label="Password" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toBeDisabled();
    expect(passwordInput).not.toBeDisabled();

    // Disabled input should not accept changes
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("");

    // Enabled input should accept changes
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });
});
