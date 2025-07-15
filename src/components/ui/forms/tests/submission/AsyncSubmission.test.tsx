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

describe("Form Submission - Async Scenarios", () => {
  const AsyncSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    name: z.string().min(1, "validation.errors.field_empty"),
  });

  type AsyncFormData = z.infer<typeof AsyncSchema>;

  const defaultProps = {
    schema: AsyncSchema,
    initialValues: { email: "", name: "" },
  };

  it("supports async submission handlers", async () => {
    const onSubmit = vi.fn().mockImplementation(async (_data) => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 50));
      return { success: true, id: 123 };
    });

    render(
      <Form<AsyncFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill valid data
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "async@test.com" }
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Async User" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("handles loading states during async submission", async () => {
    const onSubmit = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100))
    );

    render(
      <Form<AsyncFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill valid data
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "loading@test.com" }
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Loading User" }
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
    const onSubmit = vi.fn().mockRejectedValue(new Error("Network error"));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Form<AsyncFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill valid data
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "error@test.com" }
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Error User" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalledWith("Form submission error:", expect.any(Error));
    });

    consoleError.mockRestore();
  });
});
