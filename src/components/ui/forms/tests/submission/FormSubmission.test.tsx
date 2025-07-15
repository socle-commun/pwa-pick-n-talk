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
        "validation.errors.field_empty": "This field cannot be empty",
        "validation.errors.string_too_short": "Text too short (minimum 8 characters)",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Form Submission - Basic Scenarios", () => {
  const TestSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    name: z.string().min(1, "validation.errors.field_empty"),
    password: z.string().min(8, "validation.errors.string_too_short"),
    age: z.number().min(18, "validation.errors.number_too_small"),
  });

  type TestFormData = z.infer<typeof TestSchema>;

  const defaultProps = {
    schema: TestSchema,
    initialValues: { email: "", name: "", password: "", age: 0 },
  };

  it("prevents submission with validation errors", async () => {
    const onSubmit = vi.fn();

    render(
      <Form<TestFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <button type="submit">Submit</button>
      </Form>
    );

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
      expect(screen.getByText("This field cannot be empty")).toBeInTheDocument();
      expect(screen.getByText("Text too short (minimum 8 characters)")).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <Form<TestFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill all required fields with valid data
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" }
    });
    fireEvent.change(screen.getByLabelText("Age"), {
      target: { value: "25" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        name: "John Doe",
        password: "password123",
        age: 25,
      });
    });
  });
});
