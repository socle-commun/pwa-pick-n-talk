---
applyTo: "src/**/**.test.tsx"
---

# 🧪 Testing Instructions

> **Mission**: Create exhaustive, maintainable tests that destroy bugs before they infect production.

## 📏 Core Rules

- **English only** for descriptions and comments
- **PascalCase** for files: `FeatureName.test.tsx`
- **Organize by folders**: `rendering/`, `validation/`, `submission/`, `interaction/`, `fixtures/`

## 🚨 Forbidden Patterns

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
      // Arrange: Set up initial state and props
      // Act: Perform the action being tested
      // Assert: Verify the expected outcome
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
