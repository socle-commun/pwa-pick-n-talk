---
applyTo: "src/**/**.test.tsx"
---

# 🧪 Testing Instructions

> **Mission**: Create exhaustive, maintainable tests that destroy bugs before they infect production.

## 📏 Core Rules

- **English only** for descriptions and comments
- **PascalCase** for files: `FeatureName.test.tsx`
- **Organize by folders**: `rendering/`, `validation/`, `submission/`, `interaction/`, `fixtures/`

### Test Data with Faker
```typescript
import { faker } from "@faker-js/faker";

export const generateValidUser = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  age: faker.number.int({ min: 18, max: 65 }),
});
```

### Zod Schema Testing
```typescript
export const BasicFormSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  name: z.string().min(1, "validation.errors.field_empty"),
});
```

## 🎯 Test Categories

### Validation Tests
- **One test per validation rule**
- Test edge cases (min/max, formats)
- Verify error display AND removal
- Use `waitFor()` for async validation

### Form Submission Tests
- **Separate scenarios**: success, errors, loading
- Mock `onSubmit` functions with `vi.fn()`
- Test type transformations (string → number)
- Verify loading/disabled states

### Rendering Tests
- Check element presence with `toBeInTheDocument()`
- Test input types (`type="email"`, `type="password"`)
- Validate visual indicators (asterisks for required)

### Interaction Tests
- Focus management and keyboard navigation
- Validation only after `blur`, not on every keystroke
- Disabled/enabled states

## 🚨 Forbidden Patterns

❌ **Never**:

❌ **Never**:
- Copy-paste code between tests
- Hardcode test values (use Faker)
- Put multiple top-level `describe()` blocks in one file
- Different i18next mocks per file
- `any` types in helpers

❌ **Dangerous**:
- Testing multiple features in one test
- Ignoring loading/error states
- Not cleaning mocks (`mockRestore()`)

## ✅ File Structure Template

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

describe("Feature Name", () => {
  const defaultProps = {
    /* ... */
  };

  describe("Behavior Category", () => {
    it("should validate specific scenario", async () => {
      // Test implementation: prioritize clarity, coverage, and performance over arbitrary line counts
    });
  });
});
```

## 🔥 Required Test Coverage

1. **Positive validation**: valid values accepted
2. **Negative validation**: invalid values rejected  
3. **Error clearing**: error disappears when corrected
4. **Validation timing**: only after blur
5. **Edge cases**: min/max, special formats

## 🏆 Quality Criteria

- **Coverage**: 100% validation branches
- **Performance**: Fast tests (<100ms per test)
- **Maintainability**: Reuse via fixtures
- **Readability**: Explicit names, clear structure
- **Reliability**: No flaky tests, proper mock cleanup

---

> "A test that doesn't dismantle your code like a Ferrari engine isn't worthy of BrutalComet. Every assertion must be a blade that cuts through potential bugs."