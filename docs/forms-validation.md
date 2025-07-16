# Forms System Documentation

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
import { UserSchema } from "@/db/models/schemas";
import { Form, FormInput } from "@/components/ui/forms";

function EditUserForm({ user }: { user: UserValidated }) {
  return (
    <Form
      schema={UserSchema}
      initialValues={user}
      onSubmit={async (data) => {
        await updateUser(user.id, data);
      }}
    >
      <FormInput name="name" label="Name" />
      <FormInput name="email" label="Email" type="email" />
      <button type="submit">Update User</button>
    </Form>
  );
}
```

## Comprehensive Example

### User Registration Form with Database Integration

This example demonstrates a complete user registration form that integrates with the database models and showcases all the advanced features of the forms system:

```tsx
import { z } from "zod";
import { Form, FormInput } from "@/components/ui/forms";
import { UserSchema } from "@/db/models/schemas";

// Create a form schema for user registration (subset of UserSchema)
const UserRegistrationSchema = UserSchema.pick({
  name: true,
  email: true,
}).extend({
  password: z.string().min(8, "validation.errors.string_too_short"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type UserRegistrationData = z.infer<typeof UserRegistrationSchema>;

interface UserRegistrationFormProps {
  onSubmit?: (data: UserRegistrationData) => Promise<void>;
  initialValues?: Partial<UserRegistrationData>;
}

export default function UserRegistrationForm({ 
  onSubmit, 
  initialValues = { name: "", email: "", password: "", confirmPassword: "" }
}: UserRegistrationFormProps) {
  
  const handleSubmit = async (data: UserRegistrationData) => {
    console.log("Form submitted with validated data:", data);
    
    // Example of using the validation at API boundaries
    const userToCreate = {
      id: crypto.randomUUID(), // Generate ID (note: using 'id' field, not 'uuid')
      name: data.name,
      email: data.email,
      role: "user" as const,
      settings: {},
      binders: [],
      // password hash would be generated on server
    };

    // This would be validated by UserSchema on the server
    console.log("User to create:", userToCreate);
    
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Registration</h2>
        <p className="text-gray-600">
          Complete example using Zod validation system
        </p>
      </div>

      <Form<UserRegistrationData>
        schema={UserRegistrationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
          className="w-full"
        />
        
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="user@example.com"
          required
          className="w-full"
        />
        
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Minimum 8 characters"
          required
          className="w-full"
        />
        
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          required
          className="w-full"
        />
        
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Register
          </button>
          <button 
            type="button" 
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
      </Form>

      <div className="text-sm text-gray-500 space-y-1">
        <p><strong>Features demonstrated:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Runtime validation with Zod schemas</li>
          <li>Integration with database models (using 'id' fields)</li>
          <li>Type-safe form submission</li>
          <li>Real-time field validation on blur</li>
          <li>Internationalized error messages</li>
          <li>Custom validation rules (password confirmation)</li>
          <li>Accessibility with proper ARIA attributes</li>
        </ul>
      </div>
    </div>
  );
}
```

### Usage Example

```tsx
import UserRegistrationForm from "./UserRegistrationForm";

function App() {
  const handleUserRegistration = async (data) => {
    // API call to register user
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
  };

  return (
    <UserRegistrationForm onSubmit={handleUserRegistration} />
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
- `validation.errors.number_too_big` - Number too large (supports {{max}} parameter)
- `validation.errors.invalid_type` - Invalid type (supports {{expected}} parameter)

## Best Practices

### 1. Use Entity Schemas
Always prefer using existing entity schemas from `@/db/models/schemas/` rather than creating new ones:

```tsx
// ✅ Good
import { UserSchema } from "@/db/models/schemas";

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

### 3. Use TypeScript Generics
Always specify the form data type for better type safety:

```tsx
// ✅ Good
<Form<UserFormData> schema={UserSchema}>

// ❌ Less safe
<Form schema={UserSchema}>
```

## Testing

### Testing Form Components

Use Vitest with proper mocking:

```tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Form, FormInput } from "@/components/ui/forms";
import { z } from "zod";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const TestSchema = z.object({
  email: z.string().email("validation.errors.invalid_email")
});

describe("Form Component", () => {
  it("should validate email field", async () => {
    const onSubmit = vi.fn();
    
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
});
```

## Integration with Database Models

The forms system works seamlessly with the new database architecture:

### Model Schema Integration

```tsx
// All models now use 'id' instead of 'uuid'
import { UserSchema, BinderSchema } from "@/db/models/schemas";

// Create forms directly from model schemas
<Form schema={UserSchema} initialValues={{ 
  id: "", 
  name: "", 
  email: "", 
  role: "user",
  settings: {},
  binders: []
}} />
```

### Validation at API Boundaries

```tsx
import { validateUser, validateUserSafe } from "@/db/models/schemas";

// API route with validation
app.post('/users', (req, res) => {
  try {
    const user = validateUser(req.body);
    // Data is guaranteed to be valid
    await userService.create(user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Safe validation for user input
const result = validateUserSafe(formData);
if (!result.success) {
  setErrors(result.error.errors);
  return;
}
// Use result.data safely
```

This forms system provides the foundation for all data validation and form handling in the application, ensuring type safety, proper validation, and excellent user experience.