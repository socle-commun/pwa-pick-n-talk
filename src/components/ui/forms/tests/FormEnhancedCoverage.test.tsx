import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";

import { Form, FormInput } from "../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "validation.errors.invalid_email": "Invalid email format",
        "validation.errors.field_empty": "This field cannot be empty",
        "validation.errors.string_too_short": "Text too short",
        "validation.errors.string_too_long": "Text too long",
        "validation.errors.password_mismatch": "Passwords do not match",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Form Enhanced Test Coverage", () => {
  describe("Comprehensive Email Validation", () => {
    const EmailSchema = z.object({
      email: z.string().email("validation.errors.invalid_email"),
    });

    it("validates multiple valid email formats", async () => {
      render(
        <Form schema={EmailSchema} initialValues={{ email: "" }}>
          <FormInput name="email" label="Email" />
        </Form>
      );

      const emailInput = screen.getByLabelText("Email");
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "test+tag@example.org",
        "user_name@example.com",
        "123@numbers.com",
        "test-user@example-domain.com",
        "valid.email@subdomain.example.org",
      ];

      for (const email of validEmails) {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.blur(emailInput);

        await waitFor(() => {
          expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
        });
      }
    });

    it("rejects invalid email formats", async () => {
      render(
        <Form schema={EmailSchema} initialValues={{ email: "" }}>
          <FormInput name="email" label="Email" />
        </Form>
      );

      const emailInput = screen.getByLabelText("Email");
      const invalidEmails = [
        "plaintext",
        "@domain.com",
        "user@",
        "user..name@domain.com",
        "user name@domain.com",
        "user@domain",
        "",
      ];

      for (const email of invalidEmails) {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.blur(emailInput);

        await waitFor(() => {
          expect(screen.getByText("Invalid email format")).toBeInTheDocument();
        });

        // Clear for next test
        fireEvent.change(emailInput, { target: { value: "valid@test.com" } });
        await waitFor(() => {
          expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
        });
      }
    });
  });

  describe("String Length Validation Cases", () => {
    const StringSchema = z.object({
      username: z.string().min(3, "validation.errors.string_too_short").max(20, "validation.errors.string_too_long"),
      password: z.string().min(8, "validation.errors.string_too_short"),
      bio: z.string().max(500, "validation.errors.string_too_long"),
    });

    it("validates username length constraints", async () => {
      render(
        <Form schema={StringSchema} initialValues={{ username: "", password: "", bio: "" }}>
          <FormInput name="username" label="Username" />
        </Form>
      );

      const usernameInput = screen.getByLabelText("Username");

      // Test too short
      fireEvent.change(usernameInput, { target: { value: "ab" } });
      fireEvent.blur(usernameInput);

      await waitFor(() => {
        expect(screen.getByText("Text too short")).toBeInTheDocument();
      });

      // Test valid length
      fireEvent.change(usernameInput, { target: { value: "validuser" } });
      fireEvent.blur(usernameInput);

      await waitFor(() => {
        expect(screen.queryByText("Text too short")).not.toBeInTheDocument();
      });

      // Test too long
      fireEvent.change(usernameInput, { target: { value: "a".repeat(21) } });
      fireEvent.blur(usernameInput);

      await waitFor(() => {
        expect(screen.getByText("Text too long")).toBeInTheDocument();
      });
    });

    it("validates password minimum length", async () => {
      render(
        <Form schema={StringSchema} initialValues={{ username: "", password: "", bio: "" }}>
          <FormInput name="password" label="Password" type="password" />
        </Form>
      );

      const passwordInput = screen.getByLabelText("Password");

      // Test too short
      fireEvent.change(passwordInput, { target: { value: "short" } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText("Text too short")).toBeInTheDocument();
      });

      // Test valid length
      fireEvent.change(passwordInput, { target: { value: "validpassword" } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.queryByText("Text too short")).not.toBeInTheDocument();
      });
    });
  });

  describe("Complex Form Validation", () => {
    const ComplexSchema = z.object({
      firstName: z.string().min(1, "validation.errors.field_empty"),
      lastName: z.string().min(1, "validation.errors.field_empty"),
      email: z.string().email("validation.errors.invalid_email"),
      password: z.string().min(8, "validation.errors.string_too_short"),
      confirmPassword: z.string(),
      terms: z.boolean(),
    }).refine(data => data.password === data.confirmPassword, {
      message: "validation.errors.password_mismatch",
      path: ["confirmPassword"],
    });

    type ComplexFormData = z.infer<typeof ComplexSchema>;

    it("validates complete form with multiple field types", async () => {
      const onSubmit = vi.fn();

      render(
        <Form<ComplexFormData>
          schema={ComplexSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          onSubmit={onSubmit}
        >
          <FormInput name="firstName" label="First Name" />
          <FormInput name="lastName" label="Last Name" />
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <FormInput name="confirmPassword" label="Confirm Password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      );

      // Submit empty form - should show validation errors
      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getAllByText("This field cannot be empty")).toHaveLength(2); // firstName, lastName
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
        expect(screen.getByText("Text too short")).toBeInTheDocument(); // password
      });

      // Fill form with valid data
      fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "John" } });
      fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Doe" } });
      fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
      fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "password123" } });

      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "password123",
          confirmPassword: "password123",
          terms: false,
        });
      });
    });

    it("validates password confirmation mismatch", async () => {
      render(
        <Form<ComplexFormData>
          schema={ComplexSchema}
          initialValues={{
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
        >
          <FormInput name="password" label="Password" type="password" />
          <FormInput name="confirmPassword" label="Confirm Password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      );

      fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });
      fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "different123" } });

      fireEvent.click(screen.getByRole("button", { name: "Submit" }));

      await waitFor(() => {
        expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
      });
    });
  });

  describe("Form Input Types and Attributes", () => {
    const TypesSchema = z.object({
      text: z.string(),
      email: z.string().email(),
      password: z.string(),
      number: z.number(),
      tel: z.string(),
      url: z.string().url(),
      search: z.string(),
    });

    it("renders all input types correctly", () => {
      render(
        <Form
          schema={TypesSchema}
          initialValues={{ text: "", email: "", password: "", number: 0, tel: "", url: "", search: "" }}
        >
          <FormInput name="text" label="Text" type="text" />
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <FormInput name="number" label="Number" type="number" />
          <FormInput name="tel" label="Phone" type="tel" />
          <FormInput name="url" label="Website" type="url" />
          <FormInput name="search" label="Search" type="search" />
        </Form>
      );

      expect(screen.getByLabelText("Text")).toHaveAttribute("type", "text");
      expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
      expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
      expect(screen.getByLabelText("Number")).toHaveAttribute("type", "number");
      expect(screen.getByLabelText("Phone")).toHaveAttribute("type", "tel");
      expect(screen.getByLabelText("Website")).toHaveAttribute("type", "url");
      expect(screen.getByLabelText("Search")).toHaveAttribute("type", "search");
    });

    it("handles required attributes correctly", () => {
      render(
        <Form schema={TypesSchema} initialValues={{ text: "", email: "", password: "", number: 0, tel: "", url: "", search: "" }}>
          <FormInput name="text" label="Required Text" required />
          <FormInput name="email" label="Optional Email" />
        </Form>
      );

      expect(screen.getByLabelText(/required text/i)).toHaveAttribute("required");
      expect(screen.getByLabelText("Optional Email")).not.toHaveAttribute("required");
    });
  });

  describe("Special Characters and Edge Cases", () => {
    const EdgeCaseSchema = z.object({
      specialText: z.string().min(1, "validation.errors.field_empty"),
      unicodeText: z.string().min(1, "validation.errors.field_empty"),
    });

    it("handles special characters correctly", () => {
      render(
        <Form schema={EdgeCaseSchema} initialValues={{ specialText: "", unicodeText: "" }}>
          <FormInput name="specialText" label="Special Characters" />
        </Form>
      );

      const input = screen.getByLabelText("Special Characters");
      const specialText = "!@#$%^&*()_+-=[]{}|;':\",./<>?~`";

      fireEvent.change(input, { target: { value: specialText } });
      expect(input).toHaveValue(specialText);
    });

    it("handles unicode and emoji input", () => {
      render(
        <Form schema={EdgeCaseSchema} initialValues={{ specialText: "", unicodeText: "" }}>
          <FormInput name="unicodeText" label="Unicode Text" />
        </Form>
      );

      const input = screen.getByLabelText("Unicode Text");
      const unicodeText = "🚀 Hello 世界 🌟 مرحبا العربية";

      fireEvent.change(input, { target: { value: unicodeText } });
      expect(input).toHaveValue(unicodeText);
    });

    it("handles very long text input", () => {
      render(
        <Form schema={EdgeCaseSchema} initialValues={{ specialText: "", unicodeText: "" }}>
          <FormInput name="specialText" label="Long Text" />
        </Form>
      );

      const input = screen.getByLabelText("Long Text");
      const longText = "A".repeat(1000);

      fireEvent.change(input, { target: { value: longText } });
      expect(input).toHaveValue(longText);
    });
  });

  describe("Error Handling and Recovery", () => {
    const ErrorSchema = z.object({
      field1: z.string().min(1, "validation.errors.field_empty"),
      field2: z.string().email("validation.errors.invalid_email"),
      field3: z.string().min(5, "validation.errors.string_too_short"),
    });

    it("displays multiple field errors simultaneously", async () => {
      render(
        <Form schema={ErrorSchema} initialValues={{ field1: "", field2: "", field3: "" }}>
          <FormInput name="field1" label="Field 1" />
          <FormInput name="field2" label="Field 2" />
          <FormInput name="field3" label="Field 3" />
        </Form>
      );

      // Trigger all validation errors
      fireEvent.blur(screen.getByLabelText("Field 1"));
      fireEvent.change(screen.getByLabelText("Field 2"), { target: { value: "invalid" } });
      fireEvent.blur(screen.getByLabelText("Field 2"));
      fireEvent.change(screen.getByLabelText("Field 3"), { target: { value: "abc" } });
      fireEvent.blur(screen.getByLabelText("Field 3"));

      await waitFor(() => {
        expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
        expect(screen.getByText("Text too short")).toBeInTheDocument();
      });
    });

    it("clears errors when fields become valid", async () => {
      render(
        <Form schema={ErrorSchema} initialValues={{ field1: "", field2: "", field3: "" }}>
          <FormInput name="field1" label="Field 1" />
          <FormInput name="field2" label="Field 2" />
        </Form>
      );

      // Create errors
      fireEvent.blur(screen.getByLabelText("Field 1"));
      fireEvent.change(screen.getByLabelText("Field 2"), { target: { value: "invalid" } });
      fireEvent.blur(screen.getByLabelText("Field 2"));

      await waitFor(() => {
        expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
        expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      });

      // Fix errors
      fireEvent.change(screen.getByLabelText("Field 1"), { target: { value: "valid" } });
      fireEvent.change(screen.getByLabelText("Field 2"), { target: { value: "valid@email.com" } });

      await waitFor(() => {
        expect(screen.queryByText("This field cannot be empty")).not.toBeInTheDocument();
        expect(screen.queryByText("Invalid email format")).not.toBeInTheDocument();
      });
    });
  });

  describe("Performance Testing", () => {
    const PerformanceSchema = z.object({
      field: z.string().min(1, "validation.errors.field_empty"),
    });

    it("handles rapid field changes efficiently", () => {
      render(
        <Form schema={PerformanceSchema} initialValues={{ field: "" }}>
          <FormInput name="field" label="Performance Field" />
        </Form>
      );

      const field = screen.getByLabelText("Performance Field");

      // Rapid changes
      const startTime = performance.now();
      for (let i = 0; i < 50; i++) {
        fireEvent.change(field, { target: { value: `value${i}` } });
      }
      const endTime = performance.now();

      // Should complete quickly (less than 500ms)
      expect(endTime - startTime).toBeLessThan(500);
      expect(field).toHaveValue("value49");
    });

    it("maintains field state during rapid interactions", () => {
      render(
        <Form schema={PerformanceSchema} initialValues={{ field: "" }}>
          <FormInput name="field" label="State Field" />
        </Form>
      );

      const field = screen.getByLabelText("State Field");

      // Multiple rapid changes
      fireEvent.change(field, { target: { value: "first" } });
      fireEvent.change(field, { target: { value: "second" } });
      fireEvent.change(field, { target: { value: "third" } });
      fireEvent.change(field, { target: { value: "final" } });

      expect(field).toHaveValue("final");
    });
  });

  describe("Accessibility Compliance", () => {
    const A11ySchema = z.object({
      required_field: z.string().min(1, "validation.errors.field_empty"),
      optional_field: z.string().optional(),
    });

    it("provides proper ARIA attributes for invalid fields", async () => {
      render(
        <Form schema={A11ySchema} initialValues={{ required_field: "", optional_field: "" }}>
          <FormInput name="required_field" label="Required Field" />
        </Form>
      );

      const field = screen.getByRole("textbox", { name: /required field/i });
      fireEvent.blur(field);

      await waitFor(() => {
        expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
        expect(field).toHaveAttribute("data-invalid", "true");
      });
    });

    it("supports proper labeling for screen readers", () => {
      render(
        <Form schema={A11ySchema} initialValues={{ required_field: "", optional_field: "" }}>
          <FormInput name="required_field" label="Screen Reader Field" />
        </Form>
      );

      const field = screen.getByRole("textbox", { name: /screen reader field/i });
      expect(field).toBeInTheDocument();
    });
  });
});
