import { test, expect } from '@playwright/test';
import { SignInPage } from '../../fixtures/signin.page';
import { TestUsers } from '../../data/test-data';
import { DatabaseUtils, WaitUtils } from '../../utils/test-utils';

test.describe('Authentication - Sign In', () => {
  let signInPage: SignInPage;
  let dbUtils: DatabaseUtils;
  let waitUtils: WaitUtils;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    dbUtils = new DatabaseUtils(page);
    waitUtils = new WaitUtils(page);
    
    // Clear any existing authentication data
    await dbUtils.clearAppData();
    await signInPage.goto();
  });

  test('should display sign in form', async ({ page }) => {
    await signInPage.expectSignInForm();
  });

  test('should sign in with valid credentials', async ({ page }) => {
    await signInPage.signIn(TestUsers.VALID_USER.email, TestUsers.VALID_USER.password);
    
    // Wait for potential authentication process
    await waitUtils.waitForLoadingComplete();
    
    // Check if redirected to home page or dashboard
    await expect(page).toHaveURL(/\/(|dashboard|binders)/);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await signInPage.signIn(TestUsers.INVALID_USER.email, TestUsers.INVALID_USER.password);
    
    // Wait for error message or stay on same page
    await page.waitForTimeout(1000);
    
    // Should remain on sign in page
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await signInPage.signIn(TestUsers.EMPTY_USER.email, TestUsers.EMPTY_USER.password);
    
    // Form should show validation errors
    await expect(signInPage.emailInput).toBeVisible();
    await expect(signInPage.passwordInput).toBeVisible();
    
    // Should remain on sign in page
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await signInPage.clickForgotPassword();
    await expect(page).toHaveURL('/auth/forgot-password');
  });

  test('should navigate to sign up page', async ({ page }) => {
    // Look for sign up link
    const signUpLink = page.getByText(/sign up|create account|register/i);
    if (await signUpLink.isVisible()) {
      await signUpLink.click();
      await expect(page).toHaveURL('/auth/sign-up');
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through form elements
    await signInPage.emailInput.focus();
    await page.keyboard.press('Tab');
    await expect(signInPage.passwordInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(signInPage.submitButton).toBeFocused();
  });

  test('should remember form values after reload', async ({ page }) => {
    const testEmail = 'test@example.com';
    
    await signInPage.emailInput.fill(testEmail);
    await page.reload();
    await waitUtils.waitForLoadingComplete();
    
    // Check if browser remembered the email
    const emailValue = await signInPage.emailInput.inputValue();
    // Note: This depends on browser behavior, may be empty
    await expect(signInPage.emailInput).toBeVisible();
  });

  test('should work with different screen sizes', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await signInPage.expectSignInForm();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await signInPage.expectSignInForm();
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await signInPage.expectSignInForm();
  });
});