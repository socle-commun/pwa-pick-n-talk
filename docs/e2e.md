# E2E Tests

This directory contains end-to-end tests for the PWA Pick 'n' Talk application using Playwright.

## Running Tests

```bash
# Run all E2E tests
npm run e2e

# Run in UI mode for development
npm run e2e:ui

# Run in debug mode
npm run e2e:debug
```

## Configuration

The tests are configured in `playwright.config.ts` and use:
- Chromium browser for testing
- Local development server at `http://localhost:5173`
- Automatic test retries on CI

## Test Structure

Tests are organized in the `tests/` directory and focus on core application functionality.