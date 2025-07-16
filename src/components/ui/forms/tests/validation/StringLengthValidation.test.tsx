import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";
import { mockI18next } from "../__helpers__/mockUtils";

// Mock i18next using centralized helper
mockI18next();

describe("String Length Validation", () => {
  const StringSchema = z.object({
    password: z.string().min(8, "validation.errors.string_too_short"),
    bio: z.string().max(100, "validation.errors.string_too_long"),
    description: z.string().min(10, "validation.errors.string_too_short")
      .max(200, "validation.errors.string_too_long"),
  });

  type StringFormData = z.infer<typeof StringSchema>;

  const defaultProps = {
    schema: StringSchema,
    initialValues: { password: "", bio: "", description: "" },
  };

  it("shows error for password too short", async () => {
    render(
      <Form<StringFormData> {...defaultProps}>
        <FormInput name="password" label="Password" type="password" />
      </Form>
    );

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText("validation.errors.string_too_short")).toBeInTheDocument();
    });
  });

  it("shows error for bio too long", async () => {
    render(
      <Form<StringFormData> {...defaultProps}>
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    const bioInput = screen.getByLabelText("Bio");
    const longText = "a".repeat(101); // Over 100 character limit
    fireEvent.change(bioInput, { target: { value: longText } });
    fireEvent.blur(bioInput);

    await waitFor(() => {
      expect(screen.getByText("validation.errors.string_too_long")).toBeInTheDocument();
    });
  });

  it("validates both min and max constraints", async () => {
    render(
      <Form<StringFormData> {...defaultProps}>
        <FormInput name="description" label="Description" />
      </Form>
    );

    const descriptionInput = screen.getByLabelText("Description");

    // Test too short
    fireEvent.change(descriptionInput, { target: { value: "short" } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.getByText("validation.errors.string_too_short")).toBeInTheDocument();
    });

    // Test too long
    const longText = "a".repeat(201); // Over 200 character limit
    fireEvent.change(descriptionInput, { target: { value: longText } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.getByText("validation.errors.string_too_long")).toBeInTheDocument();
    });

    // Test valid length
    fireEvent.change(descriptionInput, { target: { value: "A valid description with proper length." } });
    fireEvent.blur(descriptionInput);

    await waitFor(() => {
      expect(screen.queryByText(/validation.errors.string_too/)).not.toBeInTheDocument();
    });
  });
});
