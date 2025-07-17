# E2E Testing with Playwright

This directory contains end-to-end (E2E) tests for the PWA Pick 'n' Talk application using Playwright.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run E2E tests (starts dev server automatically)
npm run e2e

# Run tests in headed mode (with browser UI)
npm run e2e:headed

# Run tests in debug mode
npm run e2e:debug

# Run tests with interactive UI
npm run e2e:ui

# View test report
npm run e2e:report
```

## 📁 Structure

```
e2e/
├── playwright.config.ts          # Playwright configuration
├── tests/                        # Test files
│   ├── auth/                     # Authentication tests
│   ├── binders/                  # Binder management tests
│   ├── navigation/               # Navigation and routing tests
│   ├── settings/                 # Settings and preferences tests
│   └── accessibility/            # Accessibility tests
├── fixtures/                     # Page objects and fixtures
├── utils/                        # Test utilities
└── data/                         # Test data
```

## 🧪 Test Categories

### Authentication Tests
- Sign in/out functionality
- Form validation
- Password recovery
- Registration flow

### Binder Management Tests
- Create, read, update, delete binders
- Binder navigation
- Search functionality
- Error handling

### Navigation Tests
- Route navigation
- Deep linking
- Browser history
- Mobile navigation

### Settings Tests
- Theme switching
- Language preferences
- Accessibility settings
- Persistence

### Accessibility Tests
- WCAG compliance
- Keyboard navigation
- Screen reader support
- High contrast mode

## 🔧 Configuration

### Browser Support
- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile (Pixel 5)

### Test Settings
- **Timeout**: 30 seconds per test
- **Retries**: 2 retries in CI, 0 locally
- **Parallel**: Full parallel execution
- **Screenshots**: On failure only
- **Videos**: On failure only
- **Traces**: On first retry

## 📝 Writing Tests

### Page Objects
Use page objects for reusable test logic:

```typescript
// fixtures/signin.page.ts
export class SignInPage {
  constructor(private page: Page) {}

  async signIn(email: string, password: string) {
    await this.page.getByTestId('email-input').fill(email);
    await this.page.getByTestId('password-input').fill(password);
    await this.page.getByTestId('submit-button').click();
  }
}
```

### Test Data
Use the test data utilities:

```typescript
// Import test data
import { TestUsers, TestBinders } from '../data/test-data';

// Use in tests
await signInPage.signIn(TestUsers.VALID_USER.email, TestUsers.VALID_USER.password);
```

### Utilities
Use utility classes for common operations:

```typescript
// Import utilities
import { DatabaseUtils, WaitUtils } from '../utils/test-utils';

// Use in tests
const dbUtils = new DatabaseUtils(page);
await dbUtils.clearAppData();
```

## 🎯 Best Practices

### Selectors
1. **Use data-testid attributes** (primary)
2. **Use ARIA roles and labels** (secondary)
3. **Use semantic selectors** (fallback)
4. **Avoid brittle selectors** (nth-child, CSS classes)

### Test Structure
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for each test
  });

  test('should perform specific action', async ({ page }) => {
    // Test implementation
  });
});
```

### Waiting Strategies
```typescript
// Wait for element to be visible
await page.getByTestId('element').waitFor({ state: 'visible' });

// Wait for network response
await page.waitForResponse(response => 
  response.url().includes('/api/endpoint')
);

// Wait for navigation
await page.waitForURL('/expected-path');
```

## 🚀 CI/CD Integration

The E2E tests run automatically on:
- Push to main/develop branches
- Pull requests
- Multiple browsers (Chromium, Firefox, WebKit)
- Mobile devices

### GitHub Actions
See `.github/workflows/e2e.yml` for the complete CI configuration.

## 🐛 Troubleshooting

### Common Issues

1. **Test timeouts**
   - Increase timeout in config
   - Use proper waiting strategies
   - Check network requests

2. **Flaky tests**
   - Use stable selectors
   - Implement proper waits
   - Avoid fixed timeouts

3. **Browser installation**
   ```bash
   npx playwright install
   ```

4. **Debug tests**
   ```bash
   npm run e2e:debug
   ```

### Debug Tools
- **Playwright Inspector**: Step through tests
- **Test Generator**: Generate test code
- **Trace Viewer**: Analyze test execution
- **Video Recording**: See test failures

## 📊 Reporting

### HTML Report
```bash
npm run e2e:report
```

### CI Reports
- Test results uploaded as artifacts
- HTML reports available in GitHub Actions
- Test summaries in PR comments

## 🔍 Code Coverage

E2E tests provide functional coverage. For unit test coverage, use:
```bash
npm run test -- --coverage
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI Setup Guide](https://playwright.dev/docs/ci)

---

For more information, see `.github/instructions/e2e.instructions.md`