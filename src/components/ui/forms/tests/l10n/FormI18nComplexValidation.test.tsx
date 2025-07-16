/**
 * Tests for Form component complex validation scenarios
 * Validates multiple errors, nested objects, and fallback behavior
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { z } from "zod";
import { Form, FormInput } from "../../index";
import {
  I18nTestHelper,
  validationTestSchemas
} from "./__helpers__";

type MultipleErrorsSchema = z.infer<typeof validationTestSchemas.multipleErrors>;

describe("Form i18n Integration - Complex Validation Scenarios", () => {
  let i18nHelpers: I18nTestHelper;

  beforeEach(async () => {
    i18nHelpers = I18nTestHelper.getInstance();
    await i18nHelpers.initializeI18n();
  });

  afterEach(() => {
    i18nHelpers.cleanup();
  });

  it("should handle multiple validation errors in different languages", async () => {
    const onSubmit = i18nHelpers.createMockSubmit();

    render(
      <Form<MultipleErrorsSchema>
        schema={validationTestSchemas.multipleErrors}
        initialValues={{
          name: "ab",  // too short
          email: "invalid-email",  // invalid format
          description: "x".repeat(150)  // too long
        }}
        onSubmit={onSubmit}
      >
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
        <FormInput name="description" label="Description" />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      // Should show multiple translated errors
      expect(screen.getByText("Text too short (minimum 3 characters)")).toBeDefined();
      expect(screen.getByText("Invalid email format")).toBeDefined();
      expect(screen.getByText("Text too long (maximum 100 characters)")).toBeDefined();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should handle nested object validation errors", async () => {
    const nestedSchema = z.object({
      user: z.object({
        profile: z.object({
          name: z.string().min(3, "validation.errors.string_too_short")
        })
      })
    });

    const onSubmit = i18nHelpers.createMockSubmit();

    render(
      <Form
        schema={nestedSchema}
        initialValues={{ user: { profile: { name: "ab" } } }}
        onSubmit={onSubmit}
      >
        <FormInput name="user.profile.name" label="Profile Name" />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Text too short (minimum 3 characters)")).toBeDefined();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should show fallback text when translation key is missing", async () => {
    // Create a schema with a custom error key that doesn't exist in translations
    const customSchema = z.object({
      custom: z.string().refine(() => false, "validation.errors.custom_missing_key")
    });

    const onSubmit = i18nHelpers.createMockSubmit();

    render(
      <Form
        schema={customSchema}
        initialValues={{ custom: "test" }}
        onSubmit={onSubmit}
      >
        <FormInput name="custom" label="Custom Field" />
        <button type="submit">Submit</button>
      </Form>
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      // Should show the fallback key when translation is missing
      expect(screen.getByText("validation.errors.custom_missing_key")).toBeDefined();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
