import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Form Submission - Advanced Scenarios", () => {
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

  it("handles form submission loading state", async () => {
    const onSubmit = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <Form<TestFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill valid data
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

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    // Check that form is disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Wait for submission to complete
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    // Form should be enabled again after submission
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("handles submission errors gracefully", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("Submission failed"));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Form<TestFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill valid data
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
      expect(onSubmit).toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith("Form submission error:", expect.any(Error));
    });

    consoleError.mockRestore();
  });
});
