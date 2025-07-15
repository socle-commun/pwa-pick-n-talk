import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../index";

// Mock i18next with detailed translations
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        "validation.errors.invalid_email": "Invalid email format",
        "validation.errors.field_empty": "This field cannot be empty",
        "validation.errors.string_too_short":
          `Text too short (minimum ${params?.min || 8} characters)`,
        "validation.errors.string_too_long":
          `Text too long (maximum ${params?.max || 500} characters)`,
        "validation.errors.number_too_small":
          `Number too small (minimum ${params?.min || 18})`,
        "validation.errors.number_too_big":
          `Number too big (maximum ${params?.max || 120})`,
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

    it("clears error when valid email is entered", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
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

    it("shows error for bio too long", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="bio" label="Bio" />
        </Form>
      );

      const bioInput = screen.getByLabelText("Bio");
      const longText = "a".repeat(501); // Over 500 character limit
      fireEvent.change(bioInput, { target: { value: longText } });
      fireEvent.blur(bioInput);

      await waitFor(() => {
        expect(screen.getByText("Text too long (maximum 500 characters)")).toBeInTheDocument();
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
  });

  describe("Field interaction behavior", () => {
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

    it("maintains field values during validation", async () => {
      render(
        <Form<TestFormData> {...defaultProps}>
          <FormInput name="email" label="Email" />
          <FormInput name="name" label="Name" />
        </Form>
      );

      const emailInput = screen.getByLabelText("Email");
      const nameInput = screen.getByLabelText("Name");

      // Enter values
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(nameInput, { target: { value: "John Doe" } });

      // Blur to trigger validation
      fireEvent.blur(emailInput);
      fireEvent.blur(nameInput);

      // Values should be maintained
      expect(emailInput).toHaveValue("test@example.com");
      expect(nameInput).toHaveValue("John Doe");
    });
  });
});
