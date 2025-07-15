import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "validation.errors.field_empty": "This field cannot be empty",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Required Field Validation", () => {
  const RequiredSchema = z.object({
    name: z.string().min(1, "validation.errors.field_empty"),
    description: z.string().min(1, "validation.errors.field_empty"),
  });

  type RequiredFormData = z.infer<typeof RequiredSchema>;

  const defaultProps = {
    schema: RequiredSchema,
    initialValues: { name: "", description: "" },
  };

  it("shows error for empty required fields", async () => {
    render(
      <Form<RequiredFormData> {...defaultProps}>
        <FormInput name="name" label="Name" />
        <FormInput name="description" label="Description" />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.blur(nameInput);

    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.getAllByText("This field cannot be empty")).toHaveLength(2);
    });
  });

  it("clears error when field is filled", async () => {
    render(
      <Form<RequiredFormData> {...defaultProps}>
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

  it("maintains field values during validation", async () => {
    render(
      <Form<RequiredFormData> {...defaultProps}>
        <FormInput name="name" label="Name" />
        <FormInput name="description" label="Description" />
      </Form>
    );

    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");

    // Enter values
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(descriptionInput, { target: { value: "A description" } });

    // Blur to trigger validation
    fireEvent.blur(nameInput);
    fireEvent.blur(descriptionInput);

    // Values should be maintained
    expect(nameInput).toHaveValue("John Doe");
    expect(descriptionInput).toHaveValue("A description");
  });
});
