import React from "react";
import { z } from "zod";
import FormProvider from "./FormContext";
import { useForm } from "./hooks";

type FormProps<T> = {
  children: React.ReactNode;
  schema?: z.ZodSchema<T>;
  initialValues?: Partial<T>;
  onSubmit?: (values: T) => Promise<void> | void;
  className?: string;
};

function FormContent<T>({ children, onSubmit, className }: {
  children: React.ReactNode;
  onSubmit?: (values: T) => Promise<void> | void;
  className?: string;
}) {
  const { values, validateForm, setSubmitting, isSubmitting } = useForm<T>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (onSubmit) {
      setSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <fieldset disabled={isSubmitting}>
        {children}
      </fieldset>
    </form>
  );
}

export default function Form<T = Record<string, unknown>>({
  children,
  schema,
  initialValues,
  onSubmit,
  className,
}: FormProps<T>) {
  return (
    <FormProvider<T>
      schema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <FormContent<T> onSubmit={onSubmit} className={className}>
        {children}
      </FormContent>
    </FormProvider>
  );
}
