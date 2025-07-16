import React, { forwardRef } from "react";
import { Field, Label, ErrorMessage } from "../data-input/fieldset";
import Input from "../data-input/input/Input";
import { useFormField } from "./hooks";

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  required?: boolean;
  disabled?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Input>, "name">;

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
    
    return (
      <Field className={className}>
        {label && (
          <Label>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <Input
          ref={ref}
          type={type}
          value={value as string || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          data-invalid={isInvalid ? true : undefined}
          required={required}
          disabled={disabled}
          {...props}
        />
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </Field>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;