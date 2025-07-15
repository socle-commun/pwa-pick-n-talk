# Forms Architecture Documentation

## Overview

The forms system provides a comprehensive, type-safe, and internationalized solution for building forms with automatic validation using Zod schemas and React context.

## Architecture

### Core Components

```
src/components/ui/forms/
├── context.ts          # Types and React context definition
├── FormContext.tsx     # Provider with Zod validation logic
├── hooks.ts           # useForm and useFormField hooks
├── Form.tsx           # Main Form component wrapper
├── FormInput.tsx      # Smart Input component with validation
├── ExampleForm.tsx    # Usage examples
└── index.ts           # Clean exports
```

### Key Features

- **Type Safety**: Full TypeScript support with automatic type inference from Zod schemas
- **Internationalization**: Automatic translation of validation errors using i18next
- **Real-time Validation**: Field validation on blur, form validation on submit
- **State Management**: Centralized form state with isDirty, isSubmitting, isValid flags
- **Accessibility**: Built-in ARIA attributes and semantic HTML
- **Extensibility**: Easy to extend with custom field components

## Basic Usage

### Simple Form Example

```tsx
import { z } from "zod";
import { Form, FormInput } from "@/components/ui/forms";

// Define your schema using our generalized validation keys
const UserSchema = z.object({
  name: z.string().min(1, "validation.errors.field_empty"),
  email: z.string().email("validation.errors.invalid_email"),
  password: z.string().min(8, "validation.errors.string_too_short"),
});

type UserFormData = z.infer<typeof UserSchema>;

function UserRegistrationForm() {
  const handleSubmit = async (data: UserFormData) => {
    console.log("Validated data:", data);
    // Call your API here
  };

  return (
    <Form<UserFormData>
      schema={UserSchema}
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <FormInput
        name="name"
        label="Full Name"
        placeholder="Enter your name"
        required
      />
      
      <FormInput
        name="email"
        label="Email Address"
        type="email"
        placeholder="user@example.com"
        required
      />
      
      <FormInput
        name="password"
        label="Password"
        type="password"
        placeholder="Minimum 8 characters"
        required
      />
      
      <button type="submit" className="btn-primary">
        Register
      </button>
    </Form>
  );
}
```

### Using Entity Schemas

The forms integrate seamlessly with our database entity schemas:

```tsx
import { UserSchema } from "@/db/entities/data/User";
import { Form, FormInput } from "@/components/ui/forms";

function EditUserForm({ user }: { user: User }) {
  return (
    <Form
      schema={UserSchema}
      initialValues={user}
      onSubmit={async (data) => {
        await updateUser(user.uuid, data);
      }}
    >
      <FormInput name="name" label="Name" />
      <FormInput name="email" label="Email" type="email" />
      <button type="submit">Update User</button>
    </Form>
  );
}
```

## Advanced Usage

### Custom Field Components

Create your own field components using the `useFormField` hook:

```tsx
import { useFormField } from "@/components/ui/forms";
import { Field, Label, ErrorMessage } from "@/components/ui/data-input/fieldset";

function CustomSelectField({ name, label, options, ...props }) {
  const { value, error, setValue, validate, isInvalid } = useFormField(name);
  
  return (
    <Field>
      {label && <Label>{label}</Label>}
      <select
        value={value as string || ""}
        onChange={(e) => setValue(e.target.value)}
        onBlur={validate}
        data-invalid={isInvalid}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Field>
  );
}
```

### Manual Form Control

Use the `useForm` hook directly for advanced control:

```tsx
import { useForm } from "@/components/ui/forms";

function AdvancedForm() {
  const form = useForm();
  
  const handleCustomAction = () => {
    // Manually validate specific field
    const isEmailValid = form.validateField("email");
    
    // Get current values
    const currentEmail = form.getValue("email");
    
    // Set values programmatically
    form.setValue("name", "John Doe");
    
    // Clear errors
    form.clearErrors("email");
    
    // Reset entire form
    form.reset();
  };
  
  return (
    <div>
      <FormInput name="email" label="Email" />
      <button onClick={handleCustomAction}>Custom Action</button>
      <p>Form is valid: {form.isValid ? "Yes" : "No"}</p>
      <p>Form is dirty: {form.isDirty ? "Yes" : "No"}</p>
    </div>
  );
}
```

## Validation Error Keys

The system uses generalized validation error keys for consistency across the application:

### Available Error Keys

- `validation.errors.required` - Field is required
- `validation.errors.invalid_uuid` - Invalid UUID format
- `validation.errors.invalid_email` - Invalid email format
- `validation.errors.invalid_url` - Invalid URL format
- `validation.errors.invalid_date` - Invalid date format
- `validation.errors.invalid_file` - Invalid file format
- `validation.errors.field_empty` - Field cannot be empty
- `validation.errors.string_too_short` - Text too short (supports {{min}} parameter)
- `validation.errors.string_too_long` - Text too long (supports {{max}} parameter)
- `validation.errors.number_too_small` - Number too small (supports {{min}} parameter)
- `validation.errors.number_too_large` - Number too large (supports {{max}} parameter)
- `validation.errors.invalid_type` - Invalid type (supports {{expected}} parameter)

### Adding New Error Keys

1. Add the key to both `fr-FR/translation.json` and `en-US/translation.json`
2. Use the key in your Zod schema
3. The form system will automatically translate it

```json
// public/locales/en-US/translation.json
{
  "validation": {
    "errors": {
      "custom_error": "This is a custom error message"
    }
  }
}
```

```tsx
// In your schema
const schema = z.object({
  field: z.string().refine(
    (val) => customValidation(val),
    "validation.errors.custom_error"
  )
});
```

## Form State Management

### Form Provider Props

```tsx
type FormProviderProps<T> = {
  children: React.ReactNode;
  schema?: z.ZodSchema<T>;        // Zod validation schema
  initialValues?: Partial<T>;     // Initial form values
  onSubmit?: (values: T) => Promise<void> | void;  // Submit handler
};
```

### Form Context API

```tsx
type FormContextType<T> = {
  // Current state
  values: T;                      // Current form values
  errors: ValidationError[];      // Current validation errors
  isValid: boolean;              // True if no validation errors
  isSubmitting: boolean;         // True during form submission
  isDirty: boolean;              // True if form has been modified
  
  // Field management
  setValue: (field: string, value: unknown) => void;
  getValue: (field: string) => unknown;
  
  // Validation
  validateField: (field: string) => boolean;
  validateForm: () => boolean;
  clearErrors: (field?: string) => void;
  
  // Form state
  setSubmitting: (submitting: boolean) => void;
  reset: () => void;
  
  // Schema reference
  schema?: z.ZodSchema<T>;
};
```

## Best Practices

### 1. Use Entity Schemas
Always prefer using existing entity schemas from `@/db/entities/` rather than creating new ones:

```tsx
// ✅ Good
import { UserSchema } from "@/db/entities/data/User";

// ❌ Avoid
const CustomUserSchema = z.object({ ... });
```

### 2. Handle Loading States
Always handle form submission states:

```tsx
function MyForm() {
  const { isSubmitting } = useForm();
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormInput name="email" label="Email" />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </Form>
  );
}
```

### 3. Provide User Feedback
Use the form state to provide clear feedback:

```tsx
function MyForm() {
  const { isValid, isDirty, errors } = useForm();
  
  return (
    <div>
      <Form>
        <FormInput name="email" label="Email" />
        {isDirty && !isValid && (
          <p className="text-amber-600">Please fix the errors above</p>
        )}
      </Form>
    </div>
  );
}
```

### 4. Use TypeScript Generics
Always specify the form data type for better type safety:

```tsx
// ✅ Good
<Form<UserFormData> schema={UserSchema}>

// ❌ Less safe
<Form schema={UserSchema}>
```

## Troubleshooting

### Common Issues

1. **"useForm must be used within a FormProvider"**
   - Make sure your component is wrapped in a `<Form>` component or `<FormProvider>`

2. **Validation errors not translating**
   - Check that your error keys exist in both language files
   - Verify i18next is properly configured

3. **TypeScript errors with form values**
   - Ensure you're using the correct generic type with `useForm<T>()`
   - Check that your schema matches your TypeScript interface

### Performance Tips

1. Use `React.memo` for expensive field components
2. Avoid creating new objects in render methods
3. Use `useCallback` for event handlers in custom components

## Testing

### Testing Form Components

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form, FormInput } from "@/components/ui/forms";
import { z } from "zod";

const TestSchema = z.object({
  email: z.string().email("validation.errors.invalid_email")
});

test("should validate email field", async () => {
  const onSubmit = jest.fn();
  
  render(
    <Form schema={TestSchema} onSubmit={onSubmit}>
      <FormInput name="email" label="Email" />
      <button type="submit">Submit</button>
    </Form>
  );
  
  const emailInput = screen.getByLabelText("Email");
  const submitButton = screen.getByRole("button", { name: "Submit" });
  
  // Test invalid email
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  fireEvent.blur(emailInput);
  
  await waitFor(() => {
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
  
  // Test valid email
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({ email: "test@example.com" });
  });
});
```

## Migration Guide

### From Existing Forms

If you have existing forms, migrate them gradually:

1. **Step 1**: Wrap existing form in `<Form>` component
2. **Step 2**: Replace individual inputs with `<FormInput>`
3. **Step 3**: Add Zod schema for validation
4. **Step 4**: Update error handling to use translated keys

### Breaking Changes

- All validation error messages must use translation keys
- Form submission now requires explicit error handling
- Field names must match schema property names exactly
