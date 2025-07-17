---
applyTo: "src/**/*.form.tsx"
---

# 📝 Form Component Instructions

> **Mission**: Create bulletproof form components with integrated validation, accessibility, and testing excellence

## 📏 Core Rules

- **Dedicated folders** - Each form gets its own folder: `src/routes/auth/sign-in/sign-in.form.tsx`
- **Zod validation** - Always use entity schemas from `@/db/models/schemas/`
- **`.form.tsx` suffix** - Forms are NEVER used directly in other components except `.form.tsx` files
- **Type safety** - Use TypeScript generics: `<Form<DataType> schema={Schema}>`

## 🎯 Form Component Template

```typescript
import { useTranslation } from "react-i18next";
import { Form, FormInput } from "@/components/ui/forms";
import { EntitySchema, type EntityFormData } from "@/db/models/schemas/EntityName";

export default function EntityForm() {
  const { t } = useTranslation();

  const handleSubmit = async (data: EntityFormData) => {
    // Process validated data
  };

  return (
    <Form<EntityFormData> schema={EntitySchema} onSubmit={handleSubmit} className="space-y-6">
      <FormInput name="email" label={t("forms.email", "Email")} type="email" required autoComplete="email" />
      <FormInput name="password" label={t("forms.password", "Password")} type="password" required />
      <button type="submit">{t("forms.submit", "Submit")}</button>
    </Form>
  );
}
```

## 🔗 Entity Schema Integration

```typescript
// src/db/models/schemas/EntityName.ts
import { z } from "zod";

export const EntitySchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  password: z.string().min(16, "validation.errors.password_too_short"),
  name: z.string().min(1, "validation.errors.field_empty").max(100, "validation.errors.string_too_long"),
});

export type EntityFormData = z.infer<typeof EntitySchema>;
```

## 🧪 Testing Pattern

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EntityForm from "./entity.form";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("EntityForm", () => {
  it("validates email field on blur", async () => {
    render(<EntityForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "invalid-email" } });
    fireEvent.blur(screen.getByLabelText(/email/i));
    await waitFor(() => {
      expect(screen.getByText(/validation.errors.invalid_email/)).toBeInTheDocument();
    });
  });
});
```

## 🎨 Accessibility & Performance

- **Labels**: Always use `label` prop on FormInput
- **Required fields**: Use `required` attribute and visual indicators  
- **Error messages**: Automatically linked with `aria-describedby`
- **Form submission**: Disable fieldset during submission
- **Validation timing**: On blur, not on every keystroke
- **Schema caching**: Zod schemas are automatically cached
