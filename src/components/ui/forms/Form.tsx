import { Box, type SxProps, type Theme } from "@mui/material";
import React from "react";
import { z } from "zod";

import { useForm } from "./hooks";

type FormProps<T> = {
  children: React.ReactNode;
  schema?: z.ZodSchema<T>;
  initialValues?: Partial<T>;
  onSubmit?: (values: T) => Promise<void> | void;
  sx?: SxProps<Theme>;
};

function FormContent<T>({ children, onSubmit, sx }: {
  children: React.ReactNode;
  onSubmit?: (values: T) => Promise<void> | void;
  sx?: SxProps<Theme>;
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
    <Box component="form" onSubmit={handleSubmit} sx={sx} noValidate>
      <fieldset disabled={isSubmitting}>
        {children}
      </fieldset>
    </Box>
  );
}

export default function Form<T extends Record<string, unknown> = Record<string, unknown>>({
  children,
  onSubmit,
  sx,
}: FormProps<T>) {
  return (
    <FormContent<T> onSubmit={onSubmit} sx={sx}>
      {children}
    </FormContent>
  );
}
