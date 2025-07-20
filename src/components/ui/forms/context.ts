import { createContext } from "react";

export type ValidationError = {
  field: string;
  message: string;
  code: string;
};

export type FormContextType<T = Record<string, unknown>> = {
  values: T;
  errors: ValidationError[];
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
  setValue: (field: string, value: unknown) => void;
  getValue: (field: string) => unknown;
  validateField: (field: string) => boolean;
  validateForm: () => boolean;
  clearErrors: (field?: string) => void;
  setSubmitting: (submitting: boolean) => void;
  reset: () => void;
  schema?: import("zod").ZodSchema<T>;
};

export const FormContext = createContext<FormContextType<Record<string, unknown>> | null>(null);
