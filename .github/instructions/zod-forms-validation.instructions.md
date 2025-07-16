---
applyTo: "src/**"
---

# Zod Forms Validation Instructions

## Data Validation Standards

- **All entities must use Zod schemas** instead of plain TypeScript interfaces for runtime validation
- Always use existing schemas from `@/db/models/schemas/` when possible
- Export both the schema and the inferred type: `export const UserSchema = z.object({...}); export type UserValidated = z.infer<typeof UserSchema>;`
- Use standardized validation error keys from `validation.errors.*` for i18n consistency
- Validate data at boundaries (API inputs, form submissions, external data)
- Use `safeParse()` for non-throwing validation in user-facing code
- All database models use `id` fields, not `uuid` fields

## Form Validation Standards

- Use the centralized forms system from `@/components/ui/forms` for all form handling
- Import form components: `import { Form, FormInput } from "@/components/ui";`
- Always specify TypeScript generics for forms: `<Form<DataType> schema={Schema}>`
- Use Zod schemas directly in forms for real-time validation
- Handle form states properly: `isValid`, `isSubmitting`, `isDirty`
- Provide proper accessibility with labels and error messages

## Testing with Vitest

**⚠️ CRITICAL: This project uses Vitest, NOT Jest. Don't embarrass yourself by generating Jest syntax.**

- **ALWAYS** import testing utilities from "vitest": `import { vi, describe, it, expect } from "vitest"`
- Use `vi.mock()` for mocking, **NEVER** `jest.mock()`
- Use `vi.fn()` for creating mock functions
- Use `vi.clearAllMocks()` in `beforeEach()` for cleanup
- Test files should end with `.test.tsx` or `.test.ts`
- Use `it()` or `test()` for individual test cases (both are valid)
- Use `describe()` for grouping related tests

## Form Testing Standards

- **Always test form validation** with both valid and invalid inputs
- Test field validation on blur, not on every keystroke
- Test form submission with proper data transformation (string → number)
- Use `waitFor()` for asynchronous validation assertions
- Mock i18next consistently: `vi.mock("react-i18next", () => ({ useTranslation: () => ({ t: (key) => key }) }))`
- Test error clearing when fixing validation issues
- Test form loading states and error handling

## Schema Testing Standards

- **Test all Zod schemas** with valid and invalid data
- Use `validateSafe()` to test error scenarios without throwing
- Test partial validation for update scenarios
- Test default values and optional fields
- Verify error messages match validation keys
- Test edge cases: empty strings, boundary values, type mismatches

**Correct Vitest syntax examples:**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// ✅ CORRECT - Vitest mocking
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Component Name", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should do something", () => {
    const mockFn = vi.fn();
    render(<Component onClick={mockFn} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

**❌ WRONG - Jest syntax (DO NOT USE):**
```tsx
jest.mock("react-i18next"); // ❌ Wrong framework
describe("Component", () => {
  test("should work", () => { // ❌ Missing Vitest imports
    const mockFn = jest.fn(); // ❌ Wrong mock function
  });
});
```

**Testing environment:**
- Uses jsdom environment for DOM testing
- @testing-library/react for component testing
- All mocks use `vi.*` APIs
- Run tests with `npm test` (which runs Vitest)