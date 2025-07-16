import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { z } from "zod";
import { Form, FormInput } from "../../index";
import {
  I18nTestHelper,
  translationAssertions,
  validationTestData
} from "./__helpers__";

describe("L10n Parameter Interpolation", () => {
  let i18nHelpers: I18nTestHelper;

  beforeEach(async () => {
    i18nHelpers = I18nTestHelper.getInstance();
    await i18nHelpers.initializeI18n();
  });

  afterEach(() => {
    i18nHelpers.cleanup();
  });

  // Schema de test simple avec validation de longueur
  const TestSchema = z.object({
    name: z.string().min(8, "validation.errors.string_too_short").max(100, "validation.errors.string_too_long"),
    age: z.number().min(18, "validation.errors.number_too_small").max(120, "validation.errors.number_too_big"),
  });

  type TestFormData = z.infer<typeof TestSchema>;

  const defaultProps = {
    schema: TestSchema,
    submitButtonText: "Submit",
  };

  describe("String validation with interpolation", () => {
    it("should interpolate minimum character length in validation message", async () => {
      const { stringTooShort } = validationTestData;
      const onSubmit = i18nHelpers.createMockSubmit();

      render(
        <Form<TestFormData>
          {...defaultProps}
          initialValues={{ name: "", age: 25 }}
          onSubmit={onSubmit}
        >
          <FormInput
            name="name"
            label="Name"
            type="text"
            data-testid="name-input"
          />
        </Form>
      );
      
      const nameInput = screen.getByTestId("name-input");
      
      // Saisir une valeur trop courte
      fireEvent.change(nameInput, { target: { value: stringTooShort.value } });
      fireEvent.blur(nameInput);
      
      // Attendre le message d'erreur interpolé
      await waitFor(() => {
        const errorMessage = screen.getByText(/Text too short \(minimum 8 characters\)/);
        expect(errorMessage).toBeDefined();
        
        // Vérifier qu'aucune clé brute n'apparaît
        translationAssertions.expectNoRawKeys(errorMessage.textContent || "");
      });
    });

    it("should interpolate maximum character length in validation message", async () => {
      const { stringTooLong } = validationTestData;
      const onSubmit = i18nHelpers.createMockSubmit();
      
      render(
        <Form<TestFormData> 
          {...defaultProps}
          initialValues={{ name: "", age: 25 }}
          onSubmit={onSubmit}
        >
          <FormInput
            name="name"
            label="Name"
            type="text"
            data-testid="name-input"
          />
        </Form>
      );
      
      const nameInput = screen.getByTestId("name-input");
      
      // Saisir une valeur trop longue
      fireEvent.change(nameInput, { target: { value: stringTooLong.value } });
      fireEvent.blur(nameInput);
      
      // Attendre le message d'erreur
      await waitFor(() => {
        const errorMessage = screen.getByText(/Text too long \(maximum 100 characters\)/);
        expect(errorMessage).toBeDefined();
        
        // Vérifier qu'aucune clé brute n'apparaît
        translationAssertions.expectNoRawKeys(errorMessage.textContent || "");
      });
    });
  });

  describe("Number validation with interpolation", () => {
    it("should interpolate minimum value in validation message", async () => {
      const { numberTooSmall } = validationTestData;
      const onSubmit = i18nHelpers.createMockSubmit();
      
      render(
        <Form<TestFormData> 
          {...defaultProps}
          initialValues={{ name: "valid name", age: 0 }}
          onSubmit={onSubmit}
        >
          <FormInput
            name="age"
            label="Age"
            type="number"
            data-testid="age-input"
          />
        </Form>
      );
      
      const ageInput = screen.getByTestId("age-input");
      
      // Saisir une valeur trop petite
      fireEvent.change(ageInput, { target: { value: numberTooSmall.value.toString() } });
      fireEvent.blur(ageInput);
      
      // Attendre le message d'erreur
      await waitFor(() => {
        const errorMessage = screen.getByText(/Number too small \(minimum 18\)/);
        expect(errorMessage).toBeDefined();
        
        // Vérifier qu'aucune clé brute n'apparaît
        translationAssertions.expectNoRawKeys(errorMessage.textContent || "");
      });
    });

    it("should interpolate maximum value in validation message", async () => {
      const { numberTooBig } = validationTestData;
      const onSubmit = i18nHelpers.createMockSubmit();
      
      render(
        <Form<TestFormData> 
          {...defaultProps}
          initialValues={{ name: "valid name", age: 0 }}
          onSubmit={onSubmit}
        >
          <FormInput
            name="age"
            label="Age"
            type="number"
            data-testid="age-input"
          />
        </Form>
      );
      
      const ageInput = screen.getByTestId("age-input");
      
      // Saisir une valeur trop grande
      fireEvent.change(ageInput, { target: { value: numberTooBig.value.toString() } });
      fireEvent.blur(ageInput);
      
      // Attendre le message d'erreur
      await waitFor(() => {
        const errorMessage = screen.getByText(/Number too large \(maximum 120\)/);
        expect(errorMessage).toBeDefined();
        
        // Vérifier qu'aucune clé brute n'apparaît
        translationAssertions.expectNoRawKeys(errorMessage.textContent || "");
      });
    });
  });
});
