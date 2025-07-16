import { z } from "zod";
import { Form, FormInput } from "@/components/ui/forms";
import { UserSchema } from "@/db/models/schemas";

/**
 * Example form using the migrated Zod validation system
 * This demonstrates the integration of:
 * - Database model schemas with form validation
 * - Type-safe form handling
 * - Real-time validation with i18n error messages
 * - New architecture with 'id' fields instead of 'uuid'
 */

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

interface ExampleFormProps {
  onSubmit?: (data: UserRegistrationData) => Promise<void>;
  initialValues?: Partial<UserRegistrationData>;
}

export default function ExampleForm({ 
  onSubmit, 
  initialValues = { name: "", email: "", password: "", confirmPassword: "" }
}: ExampleFormProps) {
  
  const handleSubmit = async (data: UserRegistrationData) => {
    console.log("Form submitted with validated data:", data);
    
    // Example of using the validation at API boundaries
    const userToCreate = {
      id: crypto.randomUUID(), // Generate ID (not UUID field name)
      name: data.name,
      email: data.email,
      role: "user" as const,
      settings: {},
      binders: [],
      // hash would be generated from password on server
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
          Example form using migrated Zod validation system
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

/**
 * Usage example:
 * 
 * ```tsx
 * import ExampleForm from "./ExampleForm";
 * 
 * function App() {
 *   const handleUserRegistration = async (data) => {
 *     // API call to register user
 *     const response = await fetch('/api/users', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(data)
 *     });
 *     
 *     if (!response.ok) {
 *       throw new Error('Registration failed');
 *     }
 *   };
 * 
 *   return (
 *     <ExampleForm onSubmit={handleUserRegistration} />
 *   );
 * }
 * ```
 */