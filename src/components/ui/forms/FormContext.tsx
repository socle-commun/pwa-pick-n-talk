
import React, { useState, useCallback } from "react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { FormContext, type FormContextType, type ValidationError } from "./context";

type FormProviderProps<T> = {
  children: React.ReactNode;
  schema?: z.ZodSchema<T>;
  initialValues?: Partial<T>;
  onSubmit?: (values: T) => Promise<void> | void;
};

export default function FormProvider<T extends Record<string, unknown> = Record<string, unknown>>({
  children,
  schema,
  initialValues = {},
  onSubmit: _onSubmit,
}: FormProviderProps<T>) {
  const { t } = useTranslation();
  const [values, setValues] = useState<T>(initialValues as T);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDirty, setDirty] = useState(false);

  const setValue = useCallback((field: string, value: unknown) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setDirty(true);
    setErrors(prev => prev.filter(error => error.field !== field));
  }, []);

  const getValue = useCallback((field: string) => {
    return (values as Record<string, unknown>)?.[field];
  }, [values]);

  const translateZodError = useCallback((error: z.ZodError): ValidationError[] => {
    return error.issues.map((err: z.ZodIssue) => {
      const translatedMessage = t(err.message, {
        min: "minimum" in err ? err.minimum : undefined,
        max: "maximum" in err ? err.maximum : undefined,
        expected: "expected" in err ? err.expected : undefined
      });

      return {
        field: err.path.join("."),
        message: translatedMessage,
        code: err.message,
      };
    });
  }, [t]);

  const validateField = useCallback((field: string): boolean => {
    if (!schema) return true;

    try {
      // Type assertion to access shape for object schemas
      const schemaWithShape = schema as { shape?: Record<string, unknown> };
      const fieldSchema = schemaWithShape.shape?.[field];
      if (fieldSchema) {
        (fieldSchema as { parse: (value: unknown) => unknown }).parse(getValue(field));
      }

      setErrors(prev => prev.filter(error => error.field !== field));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = translateZodError(error).map(err => ({
          ...err,
          field,
        }));

        setErrors(prev => [
          ...prev.filter(error => error.field !== field),
          ...fieldErrors,
        ]);
      }
      return false;
    }
  }, [schema, getValue, translateZodError]);

  const validateForm = useCallback((): boolean => {
    if (!schema) return true;

    try {
      schema.parse(values);
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(translateZodError(error));
      }
      return false;
    }
  }, [schema, values, translateZodError]);

  const clearErrors = useCallback((field?: string) => {
    if (field) {
      setErrors(prev => prev.filter(error => error.field !== field));
    } else {
      setErrors([]);
    }
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues as T);
    setErrors([]);
    setDirty(false);
    setSubmitting(false);
  }, [initialValues]);

  const contextValue: FormContextType<T> = {
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
    setSubmitting,
    reset,
    schema,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}
