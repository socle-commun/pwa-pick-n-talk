---
applyTo: "src/db/entities/**/*.ts"
---

# 🏗️ Entity Designer Instructions

> **Mission**: Create bulletproof database entities with Zod validation

## 📏 Core Rules

- **Zod-first** - Every entity MUST have a Zod schema  
- **Type inference** - Use `z.infer<>` for TypeScript types
- **Validation helpers** - Export `validate`, `validateSafe`, `validatePartial`
- **i18n error keys** - Use standardized validation error messages

## 🎯 Entity Template

```typescript
import { z } from "zod";

export const EntityNameSchema = z.object({
  uuid: z.string().uuid("validation.errors.invalid_uuid"),
  name: z.string().min(1, "validation.errors.field_empty").max(100),
  email: z.string().email("validation.errors.invalid_email").optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type EntityName = z.infer<typeof EntityNameSchema>;

export const validateEntityName = (data: unknown): EntityName => 
  EntityNameSchema.parse(data);

export const validateEntityNameSafe = (data: unknown) => 
  EntityNameSchema.safeParse(data);

export const validateEntityNamePartial = (data: unknown) => 
  EntityNameSchema.partial().parse(data);
```


### Form Integration (with MUI components)
```tsx
import { Form, FormInput } from "@/components/ui/forms";

<Form schema={EntityNameSchema} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
  <FormInput name="name" label="Name" required />
</Form>
```

## 📚 References

- [Zod Documentation](https://zod.dev/)
- [Dexie.js](https://dexie.org/docs/)
