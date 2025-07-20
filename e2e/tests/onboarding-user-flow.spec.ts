import { test, expect } from "@playwright/test";

test.describe("User Registration and Onboarding Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Clear application state
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
      // Clear IndexedDB
      if ("indexedDB" in window) {
        indexedDB.deleteDatabase("pick-n-talk");
      }
    });
  });

  test("should redirect new user to setup after registration", async ({ page }) => {
    // Go to sign-up page
    await page.goto("/auth/sign-up");

    // Fill registration form
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill(`test-${Date.now()}@example.com`);
    await page.getByLabel(/password/i).fill("SecurePassword123!");

    // Submit form
    await page.getByRole("button", { name: /sign up/i }).click();

    // Should be redirected to setup page
    await expect(page).toHaveURL("/setup");

    // Should see welcome step content
    await expect(page.getByRole("heading", { name: /welcome to pick/i })).toBeVisible();
  });

  test("should redirect existing user with empty database to setup", async ({ page }) => {
    // First, register a user and navigate away
    await page.goto("/auth/sign-up");

    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill(`test-existing-${Date.now()}@example.com`);
    await page.getByLabel(/password/i).fill("SecurePassword123!");

    await page.getByRole("button", { name: /sign up/i }).click();

    // Verify we're redirected to setup
    await expect(page).toHaveURL("/setup");

    // Now go to home page directly
    await page.goto("/");

    // Should be redirected back to setup since database is still empty
    await expect(page).toHaveURL("/setup");
  });

  test("should not redirect users with existing data", async ({ page }) => {
    // This test would require pre-populating the database
    // For now, we'll test the scenario where user has data

    // Simulate user already authenticated with data
    await page.evaluate(() => {
      const mockUser = {
        id: "test-user-id",
        name: "Test User",
        email: "test@example.com",
        hash: "hashed-password",
        role: "user",
        settings: {},
        binders: []
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
    });

    // Go to home page
    await page.goto("/");

    // Should stay on home page since user has existing setup
    await expect(page).toHaveURL("/");

    // Should see authenticated user content
    await expect(page.getByText(/welcome.*test user/i)).toBeVisible();
  });

  test("should handle sign-up form validation", async ({ page }) => {
    await page.goto("/auth/sign-up");

    // Try to submit empty form
    await page.getByRole("button", { name: /sign up/i }).click();

    // Should show validation errors
    await expect(page.getByText(/name.*required/i)).toBeVisible();
    await expect(page.getByText(/email.*required/i)).toBeVisible();
    await expect(page.getByText(/password.*required/i)).toBeVisible();
  });

  test("should handle invalid email format", async ({ page }) => {
    await page.goto("/auth/sign-up");

    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByLabel(/password/i).fill("SecurePassword123!");

    // Blur email field to trigger validation
    await page.getByLabel(/email/i).blur();

    // Should show email validation error
    await expect(page.getByText(/invalid.*email/i)).toBeVisible();
  });

  test("should handle weak password", async ({ page }) => {
    await page.goto("/auth/sign-up");

    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill(`test-${Date.now()}@example.com`);
    await page.getByLabel(/password/i).fill("weak");

    // Blur password field to trigger validation
    await page.getByLabel(/password/i).blur();

    // Should show password validation error (assuming password strength validation)
    // Note: This depends on the actual validation schema
    await expect(page.getByText(/password.*too.*short/i)).toBeVisible();
  });

  test("should prevent duplicate email registration", async ({ page }) => {
    const email = `duplicate-${Date.now()}@example.com`;

    // Register first user
    await page.goto("/auth/sign-up");
    await page.getByLabel(/name/i).fill("First User");
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill("SecurePassword123!");
    await page.getByRole("button", { name: /sign up/i }).click();

    // Should be redirected to setup
    await expect(page).toHaveURL("/setup");

    // Logout
    await page.evaluate(() => {
      localStorage.removeItem("user");
    });

    // Try to register with same email
    await page.goto("/auth/sign-up");
    await page.getByLabel(/name/i).fill("Second User");
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill("AnotherPassword123!");
    await page.getByRole("button", { name: /sign up/i }).click();

    // Should show error message
    await expect(page.getByText(/user.*already.*exists/i)).toBeVisible();
  });

  test("should maintain authentication state across page refreshes", async ({ page }) => {
    // Register new user
    await page.goto("/auth/sign-up");

    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill(`test-persist-${Date.now()}@example.com`);
    await page.getByLabel(/password/i).fill("SecurePassword123!");
    await page.getByRole("button", { name: /sign up/i }).click();

    // Should be redirected to setup
    await expect(page).toHaveURL("/setup");

    // Refresh page
    await page.reload();

    // Should still be on setup page and authenticated
    await expect(page).toHaveURL("/setup");
    await expect(page.getByRole("heading", { name: /welcome to pick/i })).toBeVisible();
  });

  test("should redirect to home page after completing setup flow", async ({ page }) => {
    // Register new user
    await page.goto("/auth/sign-up");

    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill(`test-complete-${Date.now()}@example.com`);
    await page.getByLabel(/password/i).fill("SecurePassword123!");
    await page.getByRole("button", { name: /sign up/i }).click();

    // Should be redirected to setup
    await expect(page).toHaveURL("/setup");

    // Complete setup by clicking Skip for Now
    await page.getByRole("button", { name: /skip for now/i }).click();

    // Should be redirected to home page
    await expect(page).toHaveURL("/");

    // Should see authenticated home content
    await expect(page.getByText(/welcome.*test user/i)).toBeVisible();
  });
});
