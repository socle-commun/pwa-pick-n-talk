import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Form Rendering", () => {
  const TestSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    name: z.string().min(1, "validation.errors.field_empty"),
    password: z.string().min(8, "validation.errors.string_too_short"),
    age: z.number().min(18, "validation.errors.number_too_small"),
    bio: z.string().max(500, "validation.errors.string_too_long").optional(),
  });

  type TestFormData = z.infer<typeof TestSchema>;

  const defaultProps = {
    schema: TestSchema,
    initialValues: { email: "", name: "", password: "", age: 0, bio: "" },
  };

  it("renders all form elements correctly", () => {
    render(
      <Form<TestFormData> {...defaultProps}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <FormInput name="bio" label="Bio" />
        <button type="submit">Submit</button>
      </Form>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("displays pre-filled initial values correctly", () => {
    const initialValues = {
      email: "prefilled@example.com",
      name: "Prefilled Name",
      password: "prefilled123",
      age: 25,
      bio: "Prefilled bio text",
    };

    render(
      <Form<TestFormData> {...defaultProps} initialValues={initialValues}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    expect(screen.getByDisplayValue("prefilled@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Prefilled Name")).toBeInTheDocument();
    expect(screen.getByDisplayValue("prefilled123")).toBeInTheDocument();
    expect(screen.getByDisplayValue("25")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Prefilled bio text")).toBeInTheDocument();
  });

  it("shows required field indicators when specified", () => {
    render(
      <Form<TestFormData> {...defaultProps}>
        <FormInput name="email" label="Email" required />
        <FormInput name="name" label="Name" required />
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    // Required fields should have asterisks
    const emailLabel = screen.getByText("Email").closest("label");
    const nameLabel = screen.getByText("Name").closest("label");
    const bioLabel = screen.getByText("Bio").closest("label");

    expect(emailLabel).toHaveTextContent("*");
    expect(nameLabel).toHaveTextContent("*");
    expect(bioLabel).not.toHaveTextContent("*");
  });

  it("supports different input types correctly", () => {
    render(
      <Form<TestFormData> {...defaultProps}>
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <FormInput name="bio" label="Bio" />
      </Form>
    );

    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("Age")).toHaveAttribute("type", "number");
    expect(screen.getByLabelText("Bio")).toHaveAttribute("type", "text");
  });
});
