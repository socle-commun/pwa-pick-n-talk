---
applyTo: "**/*.test.{ts,tsx,js,jsx}"
---

# 🧪 BrutalComet Testing Instructions

> **Mission** : Écrire des tests impitoyables, exhaustifs et maintenables. Zero tolérance pour les tests fragiles.

## 📋 Testing Framework Standards

### Core Dependencies
- **Vitest 3.2.4** - Testing framework (NEVER use Jest syntax)
- **@testing-library/react 16.3.0** - Component testing utilities
- **@faker-js/faker** - Generate realistic test data
- **Zod** - Runtime validation for test schemas

### Critical Framework Rules
- ❌ **NEVER use Jest syntax** (`jest.mock`, `describe`, `test`)
- ✅ **ALWAYS use Vitest syntax** (`vi.mock`, `describe`, `it`)
- ✅ Use `@testing-library/jest-dom` matchers (`.toBeInTheDocument()`)
- ✅ Import: `import { vi, describe, it, expect } from "vitest"`

## 🏗️ Test Architecture

### Directory Structure
```
src/components/ui/forms/tests/
├── fixtures/
│   ├── schemas.ts          # Reusable Zod schemas
│   ├── testData.ts         # Faker.js data generators
│   └── testUtils.ts        # Common test utilities
├── rendering/              # Component rendering tests
├── validation/             # Field validation tests
├── submission/             # Form submission tests
└── interaction/            # User interaction tests
```

### File Naming Conventions
- **Test files**: `ComponentName.test.tsx`
- **Fixture files**: `descriptiveName.ts`
- **Maximum 110 lines per test file** (ESLint enforced)
- **Group related tests by functionality, not by component**

## 🔧 Test Writing Standards

### Test Structure Template
```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { mockL10n, simulateUserInput } from "../fixtures/testUtils";
import { generateValidUser } from "../fixtures/testData";

// Mock setup
mockL10n();

describe("Component Feature - Specific Scenario", () => {
  it("describes what should happen when condition occurs", async () => {
    // Arrange
    const testData = generateValidUser();
    
    // Act
    render(<Component {...props} />);
    simulateUserInput(screen.getByLabelText("Field"), testData.field);
    
    // Assert
    await waitFor(() => {
      expect(screen.getByText("Expected text")).toBeInTheDocument();
    });
  });
});
```

## 🔍 **CRITICAL: Debugging Failed Tests**

### **Rule #1: ALWAYS Debug the Source Component First**

When a test fails, **NEVER immediately fix the test**. Follow this systematic approach:

1. **🎯 Analyze the Error Message**
   - What does the actual error say?
   - Is it a component logic error or test expectation error?
   - Example: `"Invalid input: expected number, received string"` = Component bug, not test bug

2. **🔧 Check the Source Component**
   - Read the component file being tested
   - Verify if the component handles the test scenario correctly
   - Look for type mismatches, missing conversions, logic errors
   - **Fix the component first, then rerun tests**

3. **📊 Validate the Fix**
   - Run the specific test file: `npm run test path/to/Component.test.tsx`
   - Only if the component is correct, then check test expectations

### **Common Component Issues**
- **Number inputs**: Ensure string-to-number conversion in `onChange` handlers
- **i18n messages**: Verify translation keys match between component and tests
- **State management**: Check if form state updates correctly
- **Validation timing**: Ensure validation triggers on correct events (`blur`, `change`)

### **Test Debugging Checklist**
```typescript
// ❌ DON'T do this immediately
fireEvent.change(input, { target: { value: "17" } }); // Changing test without understanding

// ✅ DO this first
// 1. Check component onChange handler
// 2. Verify if string "17" should become number 17
// 3. Look for missing Number() conversion
// 4. Fix the component logic
```

**Remember**: Tests should reflect expected behavior. If tests fail, the component probably has a bug.

### Faker.js Integration
```typescript
// fixtures/testData.ts
import { faker } from "@faker-js/faker";

export const generateValidUser = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password({ length: 12 }),
  age: faker.number.int({ min: 18, max: 65 }),
  bio: faker.lorem.paragraph(),
});

export const generateInvalidEmails = () => [
  faker.lorem.word(), // No @
  faker.internet.email().replace("@", ""), // Missing @
  `${faker.lorem.word()}@`, // Missing domain
];
```

### Zod Schema Reusability
```typescript
// fixtures/schemas.ts
export const UserFormSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  name: z.string().min(1, "validation.errors.field_empty"),
});

export const createTestProps = <T>(schema: z.ZodSchema<T>, initialValues: T) => ({
  schema,
  initialValues,
});
```

## 🎯 Test Categories & Focus Areas

### 1. Rendering Tests (`rendering/`)
- **Focus**: Component structure, initial state, props handling
- **Key scenarios**: Default props, custom props, edge cases
- **Example**: Form renders with correct fields, labels, initial values

### 2. Validation Tests (`validation/`)
- **Focus**: Field-level validation rules, error display, error clearing
- **Key scenarios**: Invalid input, valid input, edge cases, i18n messages
- **Sub-categories**: Email, Required fields, String length, Numbers

### 3. Submission Tests (`submission/`)
- **Focus**: Form submission flow, success/error handling, loading states
- **Key scenarios**: Valid submission, validation blocks, async operations
- **Sub-categories**: Success scenarios, Error scenarios, Async behavior

### 4. Interaction Tests (`interaction/`)
- **Focus**: User behavior, focus management, keyboard navigation
- **Key scenarios**: Field focus, tab navigation, disabled states

## 🚫 Testing Anti-Patterns

### NEVER Do This
```typescript
// ❌ Hard-coded test data
const user = { email: "test@test.com", name: "Test User" };

// ❌ Duplicate test setup
describe("Email", () => {
  it("test 1", () => {
    render(<Form schema={z.object({...})} />); // Repeated
  });
  it("test 2", () => {
    render(<Form schema={z.object({...})} />); // Repeated
  });
});

// ❌ Jest syntax in Vitest project
jest.mock("react-i18next");
test("should work", () => {});
```

### ALWAYS Do This
```typescript
// ✅ Generated test data
const user = generateValidUser();

// ✅ Shared fixtures
const emailFormProps = createEmailFormProps();

// ✅ Vitest syntax
vi.mock("l10n");
it("should work", () => {});
```

## 🔍 Testing Best Practices

### Data Generation
- **Use Faker.js** for all dynamic test data
- **Create generators** for different user types (valid, invalid, edge cases)
- **Seed faker** for reproducible tests when needed

### Error Testing
- **Test error display**: Verify error messages appear correctly
- **Test error clearing**: Verify errors disappear when fixed
- **Test l10n integration**: Use translation keys, not hardcoded text

### Async Testing
- **Always use waitFor**: For any async operations
- **Test loading states**: Button disabled during submission
- **Test error handling**: Network failures, validation errors

### Mocking Strategy
- **Mock external dependencies**: l10n, API calls, timers
- **Use shared mocks**: Create reusable mock utilities
- **Reset mocks**: Use beforeEach for clean test isolation

## 📊 Test Coverage Requirements

### Minimum Coverage
- **Validation rules**: Every Zod constraint must be tested
- **User interactions**: Every user action must be tested
- **Error scenarios**: Every error condition must be tested
- **Success flows**: Every happy path must be tested

### Quality Metrics
- **No flaky tests**: Tests must be deterministic
- **Fast execution**: Each test file < 5 seconds
- **Clear descriptions**: Test names explain the scenario
- **Minimal duplication**: Reuse fixtures and utilities

## 🛠️ Development Workflow

### Before Writing Tests
1. **Analyze component**: Understand all props, states, behaviors
2. **Identify scenarios**: List all user interactions and edge cases
3. **Plan test structure**: Choose appropriate test category
4. **Prepare fixtures**: Create or reuse test data and utilities

### While Writing Tests
1. **Follow AAA pattern**: Arrange, Act, Assert
2. **One assertion focus**: Each test should verify one behavior
3. **Use descriptive names**: Test names should read like specifications
4. **Validate continuously**: Run tests frequently during development

### After Writing Tests
1. **Run full suite**: Ensure no regressions
2. **Check coverage**: Verify all scenarios are covered
3. **Review performance**: Ensure tests run efficiently
4. **Document edge cases**: Comment complex test scenarios

## 🚨 Common Pitfalls & Solutions

### Problem: Tests are fragile
**Solution**: Use `getByRole` and `getByLabelText` instead of class selectors

### Problem: Async tests fail randomly
**Solution**: Always use `waitFor` with proper timeout and assertions

### Problem: Test data is unrealistic
**Solution**: Use Faker.js to generate varied, realistic test data

### Problem: Tests are too slow
**Solution**: Mock heavy dependencies, avoid unnecessary re-renders

### Problem: Hard to debug test failures
**Solution**: Use descriptive test names and clear assertion messages

---

## 🎖️ BrutalComet Testing Mantras

1. **"If it's not tested, it's broken"** - Every feature needs comprehensive tests
2. **"Flaky tests are worse than no tests"** - Deterministic behavior is mandatory
3. **"Test behavior, not implementation"** - Focus on user outcomes, not code structure
4. **"Realistic data reveals real bugs"** - Use Faker.js for authentic test scenarios
5. **"One failing test stops everything"** - Fix tests immediately, never ignore failures

> Remember: You're not just testing code, you're documenting expected behavior and preventing regressions. Make every test count, you magnificent testing machine!
