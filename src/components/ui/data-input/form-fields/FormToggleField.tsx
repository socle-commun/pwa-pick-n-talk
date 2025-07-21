/**
 * @file src/components/ui/data-input/form-fields/FormToggleField.tsx
 * @description Form-connected toggle field for boolean settings.
 */

import { Field, Label } from "../fieldset";
import { useFormField } from "@/components/ui/forms/hooks";
import cn from "@/utils/cn";

interface FormToggleFieldProps {
  name: string;
  label: string;
  className?: string;
}

export default function FormToggleField({
  name,
  label,
  className
}: FormToggleFieldProps) {
  const { value, setValue } = useFormField(name);
  const isEnabled = Boolean(value);

  return (
    <Field className={className}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name}>
          {label}
        </Label>
        <button
          type="button"
          id={name}
          onClick={() => setValue(!isEnabled)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            isEnabled ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-600"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              isEnabled ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>
    </Field>
  );
}
