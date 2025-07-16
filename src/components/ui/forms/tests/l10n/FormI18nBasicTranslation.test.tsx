/**
 * Tests for Form component basic translation
 * Validates translation of validation errors for required fields and string length
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { z } from "zod";
import { Form, FormInput } from "../../index";
import {
  I18nTestHelper,
  validationTestSchemas,
  TestFormSchema
} from "./__helpers__";

type StringLengthSchema = z.infer<typeof validationTestSchemas.stringLength>;

describe("Form i18n Integration - Basic Translation", () => {
  let i18nHelpers: I18nTestHelper;

  beforeEach(async () => {
    i18nHelpers = I18nTestHelper.getInstance();
    await i18nHelpers.initializeI18n();
  });

  afterEach(() => {
    i18nHelpers.cleanup();
  });

  it("should translate validation errors for required fields", async () => {
    const onSubmit = i18nHelpers.createMockSubmit();

    render(
      <Form<TestFormSchema>
        schema={validationTestSchemas.requiredField}
        initialValues={{ name: "", email: "" }}
        onSubmit={onSubmit}
      >
        <FormInput name="name" label="Name" />
        <FormInput name="email" label="Email" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Submit empty form to trigger validation
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      // Should show translated required error (2 instances since we have 2 required fields)
      const errorMessages = screen.getAllByText("This field is required");
      expect(errorMessages).toHaveLength(2);
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should translate validation errors for string length", async () => {
    const onSubmit = i18nHelpers.createMockSubmit();

    render(
      <Form<StringLengthSchema>
        schema={validationTestSchemas.stringLength}
        initialValues={{ name: "", description: "" }}
        onSubmit={onSubmit}
      >
        <FormInput name="name" label="Name" />
        <FormInput name="description" label="Description" />
        <button type="submit">Submit</button>
      </Form>
    );

    // Enter text that's too short and too long
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "ab" }
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "x".repeat(150) }
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      // Should show actual interpolated error messages as displayed in the DOM
      expect(screen.getByText("Text too short (minimum 3 characters)")).toBeDefined();
      expect(screen.getByText("Text too long (maximum 100 characters)")).toBeDefined();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
