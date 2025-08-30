/**
 * FormInput Component - MUI Integration
 *
 * Migrated from Headless UI to Material-UI while maintaining the exact same API.
 * Uses MUI TextField with integrated form validation and error handling.
 */

import { TextField } from "@mui/material";
import React, { forwardRef } from "react";

import { useFormField } from "./hooks";

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  required?: boolean;
  disabled?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof TextField>, "name" | "label" | "type" | "required" | "disabled" | "error" | "helperText" | "value" | "onChange" | "onBlur">;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ name, label, placeholder, type = "text", required, disabled, className, ...props }, ref) => {
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
    const displayLabel = label ? (
      required ? `${label} *` : label
    ) : undefined;

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
        helperText={error?.message}
        required={required}
        disabled={disabled}
        className={className}
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
        }}
        {...props}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
