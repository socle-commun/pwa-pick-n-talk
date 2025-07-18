---
applyTo: "e2e/**/*.ts"
---

# E2E Testing Instructions for PWA Pick 'n' Talk

> **BrutalComet says:** Stop writing E2E tests like an intern on their first day. These rules aren't suggestions—they're commandments, you pathetic excuse for a developer.

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

### Test Settings

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

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

### ❌ FORBIDDEN: Fragile Selectors

```typescript
// Don't use these, you amateur
page.locator('div:nth-child(3) > button'); // Brittle
page.locator('.css-class-name'); // CSS-dependent
page.locator('form > div:first-child'); // Structure-dependent
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

## 🔥 Required Test Coverage

### Authentication Tests (`auth/`)

```typescript
// auth/signin.spec.ts
test.describe('Sign In', () => {
  test('should sign in with valid credentials', async ({ page }) => {
    // Implementation required
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Implementation required
  });

  test('should navigate to forgot password', async ({ page }) => {
    // Implementation required
  });
});
```

### Binder Management Tests (`binders/`)

```typescript
// binders/binder-crud.spec.ts
test.describe('Binder CRUD Operations', () => {
  test('should create a new binder', async ({ page }) => {
    // Implementation required
  });

  test('should edit existing binder', async ({ page }) => {
    // Implementation required
  });

  test('should delete binder', async ({ page }) => {
    // Implementation required
  });
});
```

### Navigation Tests (`navigation/`)

```typescript
// navigation/routing.spec.ts
test.describe('Application Navigation', () => {
  test('should navigate between main sections', async ({ page }) => {
    // Implementation required
  });

  test('should handle deep linking', async ({ page }) => {
    // Implementation required
  });
});
```

### Settings Tests (`settings/`)

```typescript
// settings/theme.spec.ts
test.describe('Theme Settings', () => {
  test('should toggle dark mode', async ({ page }) => {
    // Implementation required
  });

  test('should persist theme preference', async ({ page }) => {
    // Implementation required
  });
});
```

## 🌐 Internationalization Testing

### Language Switching

```typescript
test('should switch language', async ({ page }) => {
  await page.getByTestId('language-selector').click();
  await page.getByTestId('language-option-fr').click();
  await expect(page.getByText('Connexion')).toBeVisible();
});
```

### Locale-specific Content

```typescript
test.describe('Localization', () => {
  ['en', 'fr', 'es'].forEach(locale => {
    test(`should display content in ${locale}`, async ({ page }) => {
      // Test implementation for each locale
    });
  });
});
```

## 🔧 PWA-Specific Testing

### Service Worker Tests

```typescript
test('should work offline', async ({ page, context }) => {
  await page.goto('/');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByText('Offline Mode')).toBeVisible();
});
```

### Installation Tests

```typescript
test('should be installable', async ({ page }) => {
  await page.goto('/');
  await page.waitForEvent('domcontentloaded');
  // Test PWA installation prompt
});
```

## 🚀 CI/CD Integration

### GitHub Actions Workflow

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run e2e
```

### Parallel Testing

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
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

## 🐛 Common Pitfalls and Solutions

### 1. Flaky Tests

**Problem**: Tests fail intermittently
**Solution**: Use proper waits and assertions

```typescript
// Bad
await page.click('button');
await page.click('next-button'); // May fail if first click is slow

// Good
await page.click('button');
await page.waitForResponse('**/api/process');
await page.click('next-button');
```

### 2. Race Conditions

**Problem**: Tests fail due to timing issues
**Solution**: Use Playwright's built-in retry logic

```typescript
await expect(async () => {
  await page.getByTestId('dynamic-content').click();
  await expect(page.getByText('Success')).toBeVisible();
}).toPass({ timeout: 10000 });
```

### 3. State Pollution

**Problem**: Tests affect each other
**Solution**: Proper test isolation

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    // Reset application state
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});
```

## 📚 Required Reading

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Organization](https://playwright.dev/docs/test-organization)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright CI Guide](https://playwright.dev/docs/ci)

## 🎭 BrutalComet's Final Warning

Write tests like your career depends on it—because it does. Any selector more fragile than a house of cards will be mocked in the next code review. Any test that fails due to poor waiting strategies will result in public humiliation.

Remember: E2E tests are the last line of defense against shipping garbage. Don't be the developer who lets bugs slip through because you wrote tests like a blindfolded monkey throwing darts.

**Test everything. Break nothing. Ship with confidence.**