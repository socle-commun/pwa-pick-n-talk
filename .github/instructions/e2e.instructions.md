---
applyTo: "e2e/**/*.ts"
---

## 📁 Directory Structure

```
e2e/
├── playwright.config.ts          # Playwright configuration
├── tests/                        # E2E test files
│   ├── auth/                     # Authentication tests
│   ├── binders/                  # Binder management tests
│   ├── navigation/               # Navigation and routing tests
│   ├── settings/                 # Settings and preferences tests
│   └── accessibility/            # Accessibility tests
├── fixtures/                     # Test fixtures and page objects
├── utils/                        # Test utilities and helpers
└── data/                         # Test data and mocks
```

## 🎯 Test Organization

### File Naming Convention

- **Test files**: `[feature].spec.ts` (e.g., `auth-signin.spec.ts`)
- **Page objects**: `[page].page.ts` (e.g., `signin.page.ts`)
- **Fixtures**: `[fixture].fixture.ts` (e.g., `auth.fixture.ts`)
- **Utilities**: `[util].util.ts` (e.g., `navigation.util.ts`)

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for each test
  });

  test('should perform specific action', async ({ page }) => {
    // Test implementation
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});
```

## 🔧 Playwright Configuration

### Browser Configuration

- **Default browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: Add mobile devices for PWA testing
- **Headless mode**: Default for CI, headed for local development
- **Viewport**: Desktop (1280x720) and mobile (375x667)

## 🎪 Selector Strategy

### ✅ MANDATORY: Use Robust Selectors

1. **Data Test IDs** (Primary choice):
   ```typescript
   await page.getByTestId('signin-email-input').fill('user@example.com');
   await page.getByTestId('signin-submit-button').click();
   ```

2. **ARIA Roles and Labels**:
   ```typescript
   await page.getByRole('button', { name: 'Sign in' }).click();
   await page.getByLabel('Email address').fill('user@example.com');
   ```

3. **Semantic Selectors**:
   ```typescript
   await page.getByText('Welcome back').click();
   await page.getByPlaceholder('Enter your email').fill('user@example.com');
   ```

## 🏗️ Page Object Pattern

### Page Object Structure

```typescript
// fixtures/signin.page.ts
export class SignInPage {
  constructor(private page: Page) {}

  // Locators
  get emailInput() { return this.page.getByTestId('signin-email-input'); }
  get passwordInput() { return this.page.getByTestId('signin-password-input'); }
  get submitButton() { return this.page.getByTestId('signin-submit-button'); }
  get forgotPasswordLink() { return this.page.getByTestId('forgot-password-link'); }

  // Actions
  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  // Assertions
  async expectSignInForm() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
```

## 📊 Test Data Management

### Test Data Organization

```typescript
// data/test-data.ts
export const TestUsers = {
  VALID_USER: {
    email: 'test@example.com',
    password: 'SecurePass123!',
    name: 'Test User'
  },
  INVALID_USER: {
    email: 'invalid@example.com',
    password: 'wrongpass'
  }
};

export const TestBinders = {
  SAMPLE_BINDER: {
    name: 'Test Binder',
    description: 'A test binder for E2E testing',
    pictograms: []
  }
};
```

### Dynamic Data Generation

```typescript
import { faker } from '@faker-js/faker';

export const generateUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12 }),
  name: faker.person.fullName()
});
```

## 📝 Best Practices

### Test Isolation

```typescript
test.beforeEach(async ({ page }) => {
  // Clear application state
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase('PickNTalkDB');
  });
});
```

### Waiting Strategies

```typescript
// Wait for network requests
await page.waitForResponse(response => 
  response.url().includes('/api/binders') && response.status() === 200
);

// Wait for element state
await page.getByTestId('loader').waitFor({ state: 'detached' });

// Wait for navigation
await page.waitForURL('/dashboard');
```

### Error Handling

```typescript
test('should handle network errors gracefully', async ({ page }) => {
  await page.route('**/api/**', route => route.abort());
  await page.goto('/');
  await expect(page.getByText('Network Error')).toBeVisible();
});
```

## 📚 Required Reading

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Organization](https://playwright.dev/docs/test-organization)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
