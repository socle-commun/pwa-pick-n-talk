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

describe("Form Submission - Success Scenarios", () => {
  const SubmissionSchema = z.object({
    email: z.string().email("validation.errors.invalid_email"),
    name: z.string().min(1, "validation.errors.field_empty"),
    password: z.string().min(8, "validation.errors.string_too_short"),
    age: z.number().min(18, "validation.errors.number_too_small"),
  });

  type SubmissionFormData = z.infer<typeof SubmissionSchema>;

  const defaultProps = {
    schema: SubmissionSchema,
    initialValues: { email: "", name: "", password: "", age: 0 },
  };

  it("submits form with valid data", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <Form<SubmissionFormData> {...defaultProps} onSubmit={onSubmit}>
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

  it("calls onSubmit with transformed data types", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <Form<SubmissionFormData> {...defaultProps} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" />
        <FormInput name="name" label="Name" />
        <FormInput name="password" label="Password" type="password" />
        <FormInput name="age" label="Age" type="number" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Fill with valid data
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "user@domain.com" }
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Smith" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "securepass123" }
    });
    fireEvent.change(screen.getByLabelText("Age"), {
      target: { value: "30" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "user@domain.com",
        name: "Jane Smith",
        password: "securepass123",
        age: 30, // Should be number, not string
      });
    });

    // Verify data types
    const submittedData = onSubmit.mock.calls[0][0];
    expect(typeof submittedData.age).toBe("number");
    expect(typeof submittedData.email).toBe("string");
    expect(typeof submittedData.name).toBe("string");
    expect(typeof submittedData.password).toBe("string");
  });
});
