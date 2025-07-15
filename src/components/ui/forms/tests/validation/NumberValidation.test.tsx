import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { z } from "zod";
import { Form, FormInput } from "../../index";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        "validation.errors.number_too_small":
          `Number too small (minimum ${params?.min || 0})`,
        "validation.errors.number_too_big":
          `Number too big (maximum ${params?.max || 100})`,
      };
      return translations[key] || key;
    },
  }),
}));

describe("Number Validation", () => {
  const NumberSchema = z.object({
    age: z.number().min(18, "validation.errors.number_too_small")
      .max(120, "validation.errors.number_too_big"),
    score: z.number().min(0, "validation.errors.number_too_small")
      .max(100, "validation.errors.number_too_big"),
    quantity: z.number().min(1, "validation.errors.number_too_small"),
  });

  type NumberFormData = z.infer<typeof NumberSchema>;

  const defaultProps = {
    schema: NumberSchema,
    initialValues: { age: 0, score: 0, quantity: 0 },
  };

  it("shows error for age too small", async () => {
    render(
      <Form<NumberFormData> {...defaultProps}>
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
      <Form<NumberFormData> {...defaultProps}>
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

  it("validates score range correctly", async () => {
    render(
      <Form<NumberFormData> {...defaultProps}>
        <FormInput name="score" label="Score" type="number" />
      </Form>
    );

    const scoreInput = screen.getByLabelText("Score");

    // Test negative score
    fireEvent.change(scoreInput, { target: { value: "-1" } });
    fireEvent.blur(scoreInput);

    await waitFor(() => {
      expect(screen.getByText("Number too small (minimum 0)")).toBeInTheDocument();
    });

    // Test score too high
    fireEvent.change(scoreInput, { target: { value: "101" } });
    fireEvent.blur(scoreInput);

    await waitFor(() => {
      expect(screen.getByText("Number too big (maximum 100)")).toBeInTheDocument();
    });

    // Test valid score
    fireEvent.change(scoreInput, { target: { value: "75" } });
    fireEvent.blur(scoreInput);

    await waitFor(() => {
      expect(screen.queryByText(/Number too/)).not.toBeInTheDocument();
    });
  });

  it("handles minimum-only validation", async () => {
    render(
      <Form<NumberFormData> {...defaultProps}>
        <FormInput name="quantity" label="Quantity" type="number" />
      </Form>
    );

    const quantityInput = screen.getByLabelText("Quantity");

    // Test zero quantity
    fireEvent.change(quantityInput, { target: { value: "0" } });
    fireEvent.blur(quantityInput);

    await waitFor(() => {
      expect(screen.getByText("Number too small (minimum 1)")).toBeInTheDocument();
    });

    // Test valid quantity
    fireEvent.change(quantityInput, { target: { value: "5" } });
    fireEvent.blur(quantityInput);

    await waitFor(() => {
      expect(screen.queryByText("Number too small")).not.toBeInTheDocument();
    });
  });
});
