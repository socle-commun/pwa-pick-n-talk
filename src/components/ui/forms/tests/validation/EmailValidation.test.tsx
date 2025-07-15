import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "validation.errors.invalid_email": "Invalid email format",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Email Field Validation", () => {
  const EmailSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
  });

  type EmailFormData = z.infer<typeof EmailSchema>;

  const defaultProps = {
    schema: EmailSchema,
    initialValues: { email: "" },
  };

  it("shows error for invalid email format", async () => {
    render(
      <Form<EmailFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  it("clears error when valid email is entered", async () => {
    render(
      <Form<EmailFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");

    // Make invalid first
    fireEvent.change(emailInput, { target: { value: "invalid" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });

    // Then make valid
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
    });
  });

  it("accepts various valid email formats", async () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.co.uk",
      "test+tag@example.org",
      "123@numbers.com",
    ];

    render(
      <Form<EmailFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");

    for (const email of validEmails) {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
      });

      // Clear the input for next iteration
      fireEvent.change(emailInput, { target: { value: "" } });
    }
  });

  it("validates only after blur, not on keystroke", async () => {
    render(
      <Form<EmailFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
      </Form>
    );

    const emailInput = screen.getByLabelText("Email");

    // Type invalid email but don't blur
    fireEvent.change(emailInput, { target: { value: "invalid" } });

    // Should not show error yet
    expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();

    // Now blur the field
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });
});
