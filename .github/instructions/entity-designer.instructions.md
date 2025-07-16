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

## 🔧 Common Patterns

### String Validation
```typescript
// Required with length
name: z.string().min(1, "validation.errors.field_empty").max(100)

// Email format
email: z.string().email("validation.errors.invalid_email")

// Slug format with transform
slug: z.string().regex(/^[a-z0-9-]+$/, "validation.errors.invalid_slug").transform(s => s.toLowerCase())
```

### File & Date Validation
```typescript
// File upload
avatar: z.instanceof(File).refine(f => f.size <= 5 * 1024 * 1024, "validation.errors.file_too_large")

// Date with constraints
birthDate: z.date().max(new Date(), "validation.errors.date_in_future")

// ISO string to Date
updatedAt: z.string().datetime("validation.errors.invalid_datetime").transform(s => new Date(s))
```

### Error Messages (i18n keys)
```typescript
"validation.errors.field_empty"      // Required field is empty
"validation.errors.invalid_uuid"     // Invalid UUID format
"validation.errors.invalid_email"    // Invalid email format
"validation.errors.string_too_long"  // String exceeds max length
"validation.errors.file_too_large"   // File size too big
```

## 🧪 Testing Pattern

```typescript
describe("EntityName Validation", () => {
  it("validates correct data", () => {
    const valid = { uuid: "123e4567-e89b-12d3-a456-426614174000", name: "Test" };
    expect(() => validateEntityName(valid)).not.toThrow();
  });

  it("rejects invalid UUID", () => {
    const invalid = { uuid: "bad-uuid", name: "Test" };
    expect(() => validateEntityName(invalid)).toThrow();
  });
});
```

## 🔗 Integration

### Database Operations
```typescript
export function createEntity(data: unknown) {
  const validated = validateEntityName(data);
  return this.entities.add(validated);
}
```

### Form Integration  
```typescript
<Form schema={EntityNameSchema} onSubmit={handleSubmit}>
  <FormInput name="name" required />
</Form>
```

## 📚 References

- [Zod Documentation](https://zod.dev/)
- [Dexie.js](https://dexie.org/docs/)
