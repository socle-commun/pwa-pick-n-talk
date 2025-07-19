---
applyTo: "src/**/*.form.tsx"
---

# 📝 Form Component Instructions

> **Mission**: Create bulletproof form components with integrated validation, accessibility, and testing excellence

## 📏 Core Rules

- **Dedicated folders** - Each form gets its own folder: `src/components/partials/forms/`
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
      <Button type="submit" className="w-full">
        {t("forms.submit", "Submit")}
      </Button>
    </Form>
  );
}

// Note: Button imported from Catalyst UI
import { Button } from "@/components/ui/actions";
```

## 🎨 Accessibility & Performance

- **Labels**: Always use `label` prop on FormInput
- **Required fields**: Use `required` attribute and visual indicators  
- **Error messages**: Automatically linked with `aria-describedby`
- **Form submission**: Disable fieldset during submission
- **Validation timing**: On blur, not on every keystroke
- **Schema caching**: Zod schemas are automatically cached
