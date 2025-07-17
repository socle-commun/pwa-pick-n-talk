import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../index";

// Mock i18next with Vitest
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "validation.errors.invalid_email": "Invalid email format",
        "validation.errors.field_empty": "This field cannot be empty",
        "validation.errors.string_too_short": "Text too short (minimum 8 characters)",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Form Component", () => {
  const TestSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    name: z.string().min(1, "validation.errors.field_empty"),
  });

  type TestFormData = z.infer<typeof TestSchema>;

  const defaultProps = {
    schema: TestSchema,
    initialValues: { email: "", name: "" },
  };

  it("renders form elements correctly", () => {
    render(
      <Form<TestFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("validates email field on blur", async () => {
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

  it("submits form with valid data", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <Form<TestFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill with valid data
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        name: "John Doe",
      });
    });
  });

  it("prevents submission with validation errors", async () => {
    const onSubmit = vi.fn();

    render(
      <Form<TestFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
    });
  });
});
