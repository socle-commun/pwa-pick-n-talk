import { useContext } from "react";

import { FormContext, type FormContextType, type ValidationError } from "./context";

export function useForm<T = Record<string, unknown>>(): FormContextType<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context as FormContextType<T>;
}

export function useFormField(name: string) {
  const form = useForm();

  const value = form.getValue(name);
  const error = form.errors.find((err: ValidationError) => err.field === name);

  const setValue = (newValue: unknown) => {
    form.setValue(name, newValue);
  };

  const validate = () => {
    return form.validateField(name);
  };

  return {
    value,
    error,
    setValue,
    validate,
    isInvalid: !!error,
  };
}
