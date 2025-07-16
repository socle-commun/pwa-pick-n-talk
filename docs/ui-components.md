# UI Components Library

A comprehensive collection of headless, typed, and styled UI components built with React, TypeScript, and Tailwind CSS.

## Overview

This UI library provides a complete set of components organized by category:

- **Actions**: Interactive elements like buttons and touch targets
- **Data Display**: Components for displaying information (tables, badges, avatars, etc.)
- **Data Input**: Form controls and input elements (input, select, textarea, etc.)
- **Navigation**: Navigation and routing components (links, navbar, sidebar, pagination)
- **Layout**: Structural layout components (dividers, containers)
- **Typography**: Text and heading components
- **Feedback**: Alerts, dialogs, loading states, and error boundaries
- **Forms**: Advanced form validation with Zod schemas and TypeScript safety

## Usage

### Central Import

All components can be imported from the central index:

```typescript
import { Button, Input, Select, Dialog, Form, FormInput } from "@/components/ui";
```

### Category-specific Imports

Or import from specific categories:

```typescript
import { Button } from "@/components/ui/actions";
import { Input, Select } from "@/components/ui/data-input";
import { Form, FormInput } from "@/components/ui/forms";
```

## Component Categories

### Actions

Interactive elements that trigger actions.

```typescript
import { Button, TouchTarget } from "@/components/ui/actions";

// Primary button
<Button color="blue" onClick={handleClick}>
  Save Changes
</Button>

// Touch-friendly target
<TouchTarget onClick={handleTouch}>
  <Icon />
</TouchTarget>
```

### Data Input

Form controls and input elements with full TypeScript support.

```typescript
import { 
  Input, 
  Select, 
  TextArea, 
  Checkbox, 
  Radio, 
  Switch,
  Combobox,
  Field,
  Label,
  Fieldset
} from "@/components/ui/data-input";

// Form example
<Fieldset>
  <Field>
    <Label htmlFor="email">Email</Label>
    <Input 
      id="email" 
      type="email" 
      placeholder="Enter your email"
      required 
    />
  </Field>
  
  <Field>
    <Label htmlFor="message">Message</Label>
    <TextArea 
      id="message" 
      placeholder="Enter your message"
      rows={4}
    />
  </Field>
  
  <Switch>
    <Label>Email notifications</Label>
  </Switch>
</Fieldset>
```

### Data Display

Components for displaying data and information.

```typescript
import { 
  Table, 
  Badge, 
  Avatar, 
  Dropdown,
  Listbox 
} from "@/components/ui/data-display";

// Table example
<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Status</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>
        <Badge color="green">Active</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Navigation

Navigation and routing components.

```typescript
import { 
  Link, 
  Navbar, 
  Sidebar, 
  Pagination 
} from "@/components/ui/navigation";

// Navigation link
<Link href="/dashboard" color="blue">
  Go to Dashboard
</Link>

// Navbar
<Navbar>
  <NavbarSection>
    <NavbarItem href="/home">Home</NavbarItem>
    <NavbarItem href="/about">About</NavbarItem>
  </NavbarSection>
</Navbar>
```

### Typography

Text and heading components with consistent styling.

```typescript
import { 
  Heading, 
  SubHeading, 
  Text, 
  TextLink, 
  Strong, 
  Code 
} from "@/components/ui/typography";

<Heading level={1}>Main Title</Heading>
<SubHeading level={2}>Subtitle</SubHeading>
<Text>
  Regular text with <Strong>bold text</Strong> and 
  <TextLink href="/link">a link</TextLink>.
  Code example: <Code>npm install</Code>
</Text>
```

### Feedback

Components for user feedback and status indication.

```typescript
import { 
  Alert, 
  Dialog, 
  LoadingSpinner, 
  EmptyState,
  DatabaseErrorBoundary 
} from "@/components/ui/feedback";

// Alert
<Alert color="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

// Dialog
<Dialog open={isOpen} onClose={setIsOpen}>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogBody>
    Are you sure you want to delete this item?
  </DialogBody>
  <DialogActions>
    <Button color="red" onClick={handleDelete}>Delete</Button>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
  </DialogActions>
</Dialog>

// Error Boundary
<DatabaseErrorBoundary>
  <YourComponent />
</DatabaseErrorBoundary>
```

### Forms

Advanced form validation system with Zod schemas, providing runtime type safety and comprehensive validation.

```typescript
import { z } from "zod";
import { 
  Form, 
  FormProvider, 
  FormInput, 
  useForm, 
  useFormField 
} from "@/components/ui/forms";

// Define Zod schema
const UserSchema = z.object({
  name: z.string().min(1, "validation.errors.field_empty"),
  email: z.string().email("validation.errors.invalid_email"),
  age: z.number().min(18, "validation.errors.age_minimum"),
});

// Type-safe form component
function UserForm() {
  const handleSubmit = (data: z.infer<typeof UserSchema>) => {
    console.log("Valid form data:", data);
  };

  return (
    <Form<typeof UserSchema>
      schema={UserSchema}
      initialValues={{ name: "", email: "", age: 18 }}
      onSubmit={handleSubmit}
    >
      <FormInput 
        name="name" 
        label="Full Name" 
        placeholder="Enter your name"
        required 
      />
      <FormInput 
        name="email" 
        label="Email" 
        type="email"
        placeholder="Enter your email"
        required 
      />
      <FormInput 
        name="age" 
        label="Age" 
        type="number"
        min={18}
        required 
      />
      <button type="submit">Submit</button>
    </Form>
  );
}

// Advanced form with custom validation
const AdvancedSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

function AdvancedForm() {
  return (
    <Form schema={AdvancedSchema}>
      <FormInput name="password" type="password" label="Password" />
      <FormInput name="confirmPassword" type="password" label="Confirm Password" />
    </Form>
  );
}
```

**Features:**
- ✅ **Runtime validation** with Zod schemas
- ✅ **TypeScript integration** for compile-time safety
- ✅ **Real-time field validation** on blur events
- ✅ **Internationalized error messages** via react-i18next
- ✅ **Form state management** with loading states
- ✅ **Custom validation rules** and cross-field validation
- ✅ **Accessibility compliant** with proper ARIA attributes

### Layout

Structural layout components.

```typescript
import { 
  AuthLayout, 
  SidebarLayout, 
  StackedLayout, 
  Divider 
} from "@/components/ui/layout";

<SidebarLayout>
  <Sidebar>
    {/* Sidebar content */}
  </Sidebar>
  <main>
    {/* Main content */}
  </main>
</SidebarLayout>
```

## Component Props

All components are fully typed with TypeScript. Common prop patterns:

### Color System

Most components support a consistent color system:

```typescript
type Color = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray' | 'zinc';

<Button color="blue">Primary Action</Button>
<Badge color="green">Success</Badge>
<Alert color="red">Error Message</Alert>
```

### Size Variants

Many components support size variants:

```typescript
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

<Button size="lg">Large Button</Button>
<Input size="sm">Small Input</Input>
```

### Styling

All components accept `className` for custom styling and use Tailwind CSS classes:

```typescript
<Button className="w-full mt-4">Full Width Button</Button>
<Input className="border-red-500">Error State Input</Input>
```

## Testing

All components include comprehensive unit tests. To run tests:

```bash
npm test
```

## Accessibility

Components follow accessibility best practices:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML structure

## Examples

### Complete Form

```typescript
import { 
  Button, 
  Input, 
  Select, 
  TextArea, 
  Checkbox,
  Field, 
  Label, 
  Fieldset 
} from "@/components/ui";

function ContactForm() {
  return (
    <form>
      <Fieldset>
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" required />
        </Field>
        
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </Field>
        
        <Field>
          <Label htmlFor="subject">Subject</Label>
          <Select id="subject">
            <option value="general">General Inquiry</option>
            <option value="support">Support</option>
            <option value="bug">Bug Report</option>
          </Select>
        </Field>
        
        <Field>
          <Label htmlFor="message">Message</Label>
          <TextArea id="message" rows={4} />
        </Field>
        
        <Checkbox>
          <Label>Subscribe to newsletter</Label>
        </Checkbox>
        
        <Button type="submit" color="blue">Send Message</Button>
      </Fieldset>
    </form>
  );
}
```

### Dashboard Layout

```typescript
import { 
  SidebarLayout, 
  Navbar, 
  Sidebar, 
  Heading, 
  Button 
} from "@/components/ui";

function Dashboard() {
  return (
    <SidebarLayout>
      <Sidebar>
        <SidebarHeader>
          <Heading level={2}>Dashboard</Heading>
        </SidebarHeader>
        <SidebarBody>
          <SidebarSection>
            <SidebarItem href="/dashboard">Overview</SidebarItem>
            <SidebarItem href="/projects">Projects</SidebarItem>
            <SidebarItem href="/settings">Settings</SidebarItem>
          </SidebarSection>
        </SidebarBody>
      </Sidebar>
      
      <main>
        <Navbar>
          <NavbarSection>
            <NavbarItem>Welcome back!</NavbarItem>
          </NavbarSection>
          <NavbarSection>
            <Button color="blue">New Project</Button>
          </NavbarSection>
        </Navbar>
        
        {/* Main content */}
      </main>
    </SidebarLayout>
  );
}
```

## Contributing

When adding new components:

1. Place them in the appropriate category folder
2. Include TypeScript types
3. Add comprehensive tests
4. Use Tailwind CSS for styling
5. Follow accessibility best practices
6. Update the central index.ts file
7. Add documentation examples

## Migration Guide

### From Raw HTML Elements

Replace raw HTML elements with their component equivalents:

```typescript
// Before
<button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>

// After
<Button color="blue" onClick={handleClick}>
  Click me
</Button>
```

```typescript
// Before
<input type="text" className="border border-gray-300 rounded px-3 py-2" />

// After
<Input type="text" />
```

### Import Updates

Update imports to use the central index:

```typescript
// Before
import Button from "@/components/ui/actions/Button";
import Input from "@/components/ui/data-input/Input";

// After
import { Button, Input } from "@/components/ui";
```