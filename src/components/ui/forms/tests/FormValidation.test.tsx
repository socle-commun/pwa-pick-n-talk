import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../index";

// Mock i18next
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

describe("Form Validation", () => {
  const TestSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    name: z.string().min(1, "validation.errors.field_empty"),
    password: z.string().min(8, "validation.errors.string_too_short"),
    age: z.number().min(18, "validation.errors.number_too_small")
      .max(120, "validation.errors.number_too_big"),
    bio: z.string().max(500, "validation.errors.string_too_long").optional(),
  });

  type TestFormData = z.infer<typeof TestSchema>;

  const defaultProps = {
    schema: TestSchema,
    initialValues: { email: "", name: "", password: "", age: 0, bio: "" },
  };

  describe("Email validation", () => {
    it("shows error for invalid email format", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
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

    it("accepts various valid email formats", async () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "test+tag@example.org",
        "123@numbers.com",
      ];

      render(
        <Form<TestFormData> {...defaultProps}>
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
      }
    });
  });

  describe("Required field validation", () => {
    it("shows error for empty required fields", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="name" label="Name" />
        </Form>
      );

      const nameInput = screen.getByLabelText("Name");
      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
      });
    });

    it("clears error when field is filled", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="name" label="Name" />
        </Form>
      );

      const nameInput = screen.getByLabelText("Name");

      // Make empty first
      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
      });

      // Then fill it
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.queryByText("This field cannot be empty")).not.toBeInTheDocument();
      });
    });
  });

  describe("String length validation", () => {
    it("shows error for password too short", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
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

    it("accepts valid password length", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="password" label="Password" type="password" />
        </Form>
      );

      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "validpassword" } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.queryByText("Text too short (minimum 8 characters)")).not.toBeInTheDocument();
      });
    });
  });

  describe("Number validation", () => {
    it("shows error for age too small", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="age" label="Age" type="number" />
        </Form>
      );

      const ageInput = screen.getByLabelText("Age");
      fireEvent.change(ageInput, { target: { value: "17" } });
      fireEvent.blur(ageInput);

      await waitFor(() => {
        expect(screen.getByText("Number too small (minimum 18)")).toBeInTheDocument();
      });
    });

    it("shows error for age too big", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="age" label="Age" type="number" />
        </Form>
      );

      const ageInput = screen.getByLabelText("Age");
      fireEvent.change(ageInput, { target: { value: "121" } });
      fireEvent.blur(ageInput);

      await waitFor(() => {
        expect(screen.getByText("Number too big (maximum 120)")).toBeInTheDocument();
      });
    });

    it("accepts valid age", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="age" label="Age" type="number" />
        </Form>
      );

      const ageInput = screen.getByLabelText("Age");
      fireEvent.change(ageInput, { target: { value: "25" } });
      fireEvent.blur(ageInput);

      await waitFor(() => {
        expect(screen.queryByText("Number too small")).not.toBeInTheDocument();
        expect(screen.queryByText("Number too big")).not.toBeInTheDocument();
      });
    });
  });

  it("validates fields only after blur (not on every keystroke)", async () => {
    render(
      <Form<TestFormData> {...defaultProps}>
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
