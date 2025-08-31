/**
 * FormProvider Component
 *
 * Provides form context and state management for Form components.
 * Handles form validation using Zod schemas and manages form state.
 */

import React, { useState, useMemo, useCallback } from "react";
import { z } from "zod";

import { FormContext, type FormContextType, type ValidationError } from "./context";

interface FormProviderProps<T extends Record<string, unknown>> {
  children: React.ReactNode;
  schema?: z.ZodSchema<T>;
  initialValues?: Partial<T>;
}

export function FormProvider<T extends Record<string, unknown>>({
  children,
  schema,
  initialValues = {} as Partial<T>,
}: FormProviderProps<T>) {
  const [values, setValues] = useState<T>(initialValues as T);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const setValue = useCallback((field: string, value: unknown) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    // Clear field error when value changes
    setErrors(prev => prev.filter(err => err.field !== field));
  }, []);

  const getValue = useCallback((field: string) => {
    return values[field as keyof T];
  }, [values]);

  const validateField = useCallback((field: string): boolean => {
    if (!schema) return true;

    try {
      // For now, we'll validate the whole form and filter errors
      schema.parse(values);
      // Clear any existing errors for this field
      setErrors(prev => prev.filter(err => err.field !== field));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: ValidationError[] = error.issues
          .filter(issue => issue.path[0] === field)
          .map(issue => ({
            field,
            message: issue.message,
            code: issue.code,
          }));
        setErrors(prev => [...prev.filter(err => err.field !== field), ...fieldErrors]);
        return fieldErrors.length === 0;
      }
      return false;
    }
  }, [schema, values]);

  const validateForm = useCallback((): boolean => {
    if (!schema) return true;

    try {
      schema.parse(values);
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors: ValidationError[] = error.issues.map(issue => ({
          field: issue.path[0] as string,
          message: issue.message,
          code: issue.code,
        }));
        setErrors(formErrors);
      }
      return false;
    }
  }, [schema, values]);

  const clearErrors = useCallback((field?: string) => {
    if (field) {
      setErrors(prev => prev.filter(err => err.field !== field));
    } else {
      setErrors([]);
    }
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues as T);
    setErrors([]);
    setIsDirty(false);
    setIsSubmitting(false);
  }, [initialValues]);

  const contextValue: FormContextType<T> = useMemo(() => ({
    values,
    errors,
    isValid: errors.length === 0,
    isSubmitting,
    isDirty,
    setValue,
    getValue,
    validateField,
    validateForm,
    clearErrors,
    setSubmitting: setIsSubmitting,
    reset,
    schema,
  }), [values, errors, isSubmitting, isDirty, setValue, getValue, validateField, validateForm, clearErrors, reset, schema]);

  return (
    <FormContext.Provider value={contextValue as FormContextType<Record<string, unknown>>}>
      {children}
    </FormContext.Provider>
  );
}
