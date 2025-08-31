/**
 * FormInput Component - MUI Integration
 *
 * Migrated from Headless UI to Material-UI while maintaining the exact same API.
 * Uses MUI TextField with integrated form validation and error handling.
 */

import { TextField, type SxProps, type Theme } from "@mui/material";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import { useFormField } from "./hooks";

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
} & Omit<React.ComponentProps<typeof TextField>, "name" | "label" | "type" | "required" | "disabled" | "error" | "helperText" | "value" | "onChange" | "onBlur" | "sx">;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, placeholder, type = "text", required, disabled, sx, ...props }, ref) => {
    const { t } = useTranslation();
    const { value, error, setValue, validate, isInvalid } = useFormField(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const inputValue = e.target.value;

      // Convert string to number for number inputs
      if (type === "number") {
        const numValue = inputValue === "" ? undefined : Number(inputValue);
        setValue(numValue);
      } else {
        setValue(inputValue);
      }
    };

    const handleBlur = () => {
      validate();
    };

    // Prepare the label with required indicator
    let displayLabel: string | undefined = label;
    if (label && required) {
      displayLabel = `${label} *`;
    }

    // Translate error message if it's a translation key
    const translatedErrorMessage = error?.message ? t(error.message, error.message) : undefined;

    return (
      <TextField
        ref={ref}
        name={name}
        label={displayLabel}
        type={type}
        value={value as string || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        error={isInvalid}
        helperText={translatedErrorMessage}
        required={required}
        disabled={disabled}
        inputProps={{
          "data-testid": `${name}-input`,
          "data-invalid": isInvalid ? true : undefined,
        }}
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          // Custom styling to match our design system
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--bg-secondary)",
            "& fieldset": {
              borderColor: "var(--border-primary)",
            },
            "&:hover fieldset": {
              borderColor: "var(--border-focus)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--border-focus)",
            },
            "&.Mui-error fieldset": {
              borderColor: "var(--error-primary)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "var(--text-secondary)",
            "&.Mui-focused": {
              color: "var(--border-focus)",
            },
            "&.Mui-error": {
              color: "var(--error-primary)",
            },
          },
          "& .MuiOutlinedInput-input": {
            color: "var(--text-primary)",
            "&::placeholder": {
              color: "var(--text-tertiary)",
              opacity: 1,
            },
          },
          "& .MuiFormHelperText-root": {
            color: "var(--error-primary)",
            "&.Mui-error": {
              color: "var(--error-primary)",
            },
          },
          // Merge with custom sx prop
          ...sx,
        }}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
