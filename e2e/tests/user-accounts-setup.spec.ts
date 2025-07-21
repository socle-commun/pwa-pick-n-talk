import { test, expect } from "@playwright/test";

test.describe("User Accounts Setup", () => {
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

    // Navigate to setup page and advance to user accounts step (step 3)
    await page.goto("/setup");

    // Wait for welcome step and continue to caregiver accounts step (step 2)
    await page.getByRole("button", { name: "Continue Setup" }).click();

    // Skip caregiver accounts to get to user accounts step (step 3)
    await page.getByRole("button", { name: "Continue without accounts" }).click();
  });

  test("should display user accounts setup page", async ({ page }) => {
    // Check main heading
    await expect(page.getByRole("heading", { name: "Setup User Accounts" })).toBeVisible();

    // Check description
    await expect(page.getByText("Create accounts for the primary communication users")).toBeVisible();

    // Check add user button
    await expect(page.getByRole("button", { name: "Add User Account" })).toBeVisible();
    await expect(page.getByText("Create an account for someone who will use communication binders")).toBeVisible();

    // Check continue button with no accounts
    await expect(page.getByRole("button", { name: "Continue without user accounts" })).toBeVisible();
  });

  test("should create a user account successfully", async ({ page }) => {
    // Click Add User Account
    await page.getByRole("button", { name: "Add User Account" }).click();

    // Fill out the form
    await page.getByTestId("name-input").fill("Test User");
    await page.getByTestId("email-input").fill("testuser@test.com");
    await page.getByTestId("password-input").fill("password123");

    // Check that personal settings panel is visible for user role
    await expect(page.getByText("Personal Preferences")).toBeVisible();
    await expect(page.getByText("Language")).toBeVisible();
    await expect(page.getByText("Appearance")).toBeVisible();
    await expect(page.getByText("Accessibility")).toBeVisible();

    // Submit the form
    await page.getByRole("button", { name: "Create User" }).click();

    // Check that the account appears in the list
    await expect(page.getByText("Created User Accounts")).toBeVisible();
    await expect(page.getByText("Test User")).toBeVisible();
    await expect(page.getByText("testuser@test.com • User")).toBeVisible();

    // Check continue button updates
    await expect(page.getByRole("button", { name: "Continue with 1 user account(s)" })).toBeVisible();
  });

  test("should create user account without password", async ({ page }) => {
    // Click Add User Account
    await page.getByRole("button", { name: "Add User Account" }).click();

    // Fill out the form (no password)
    await page.getByTestId("name-input").fill("No Password User");
    await page.getByTestId("email-input").fill("nopassword@test.com");

    // Submit the form
    await page.getByRole("button", { name: "Create User" }).click();

    // Check that the account appears in the list
    await expect(page.getByText("No Password User")).toBeVisible();
    await expect(page.getByText("nopassword@test.com • User")).toBeVisible();
  });

  test("should display personal settings for user role only", async ({ page }) => {
    // Click Add User Account
    await page.getByRole("button", { name: "Add User Account" }).click();

    // Personal settings should be visible for user role
    await expect(page.getByText("Personal Preferences")).toBeVisible();
    await expect(page.getByText("Customize your experience with personalized settings")).toBeVisible();

    // Check individual settings sections
    await expect(page.getByText("Language")).toBeVisible();
    await expect(page.getByText("Appearance")).toBeVisible();
    await expect(page.getByText("Accessibility")).toBeVisible();

    // Check that theme components are present
    await expect(page.locator("[data-testid*=\"theme\"], [data-testid*=\"locale\"], [data-testid*=\"font\"], [data-testid*=\"daltonism\"], [data-testid*=\"contrast\"]")).toHaveCount({ min: 1 });
  });

  test("should create multiple user accounts", async ({ page }) => {
    // Create first user account
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("First User");
    await page.getByTestId("email-input").fill("first@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Create second user account
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("Second User");
    await page.getByTestId("email-input").fill("second@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Check both accounts are visible
    await expect(page.getByText("First User")).toBeVisible();
    await expect(page.getByText("Second User")).toBeVisible();

    // Check continue button shows correct count
    await expect(page.getByRole("button", { name: "Continue with 2 user account(s)" })).toBeVisible();
  });

  test("should edit an existing user account", async ({ page }) => {
    // Create a user account first
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("Original User");
    await page.getByTestId("email-input").fill("original@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Click edit button
    await page.getByRole("button", { name: "Edit" }).click();

    // Check form is pre-populated
    await expect(page.getByTestId("name-input")).toHaveValue("Original User");
    await expect(page.getByTestId("email-input")).toHaveValue("original@test.com");

    // Check that personal settings are still visible in edit mode
    await expect(page.getByText("Personal Preferences")).toBeVisible();

    // Update the name
    await page.getByTestId("name-input").clear();
    await page.getByTestId("name-input").fill("Updated User");

    // Submit the update
    await page.getByRole("button", { name: "Update User" }).click();

    // Check the updated name appears
    await expect(page.getByText("Updated User")).toBeVisible();
    await expect(page.getByText("original@test.com • User")).toBeVisible();
  });

  test("should delete a user account", async ({ page }) => {
    // Create a user account first
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("To Be Deleted");
    await page.getByTestId("email-input").fill("delete@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Verify account exists
    await expect(page.getByText("To Be Deleted")).toBeVisible();

    // Mock the confirm dialog to return true
    page.on("dialog", dialog => dialog.accept());

    // Click delete button
    await page.getByRole("button", { name: "Delete" }).click();

    // Check account is removed
    await expect(page.getByText("To Be Deleted")).not.toBeVisible();

    // Check continue button returns to default
    await expect(page.getByRole("button", { name: "Continue without user accounts" })).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    // Try to submit empty form
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByRole("button", { name: "Create User" }).click();

    // Form should still be visible (not submitted due to validation)
    await expect(page.getByRole("heading", { name: "Add User" })).toBeVisible();
  });

  test("should cancel form and return to main view", async ({ page }) => {
    // Open form
    await page.getByRole("button", { name: "Add User Account" }).click();

    // Fill partial data
    await page.getByTestId("name-input").fill("Test");

    // Cancel
    await page.getByRole("button", { name: "Cancel" }).click();

    // Should be back to main view
    await expect(page.getByRole("button", { name: "Add User Account" })).toBeVisible();
  });

  test("should navigate back to caregiver accounts step", async ({ page }) => {
    // Click back button
    await page.getByRole("button", { name: "← Back" }).click();

    // Should be on caregiver accounts step
    await expect(page.getByRole("heading", { name: "Setup Caregiver Accounts" })).toBeVisible();
  });

  test("should complete setup flow from user accounts step", async ({ page }) => {
    // Create a user account
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("Test User");
    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Continue to complete the setup (should navigate to binders)
    await page.getByRole("button", { name: "Continue with 1 user account(s)" }).click();

    // Should navigate to binders page (end of setup)
    await page.waitForURL("/binders");
    await expect(page).toHaveURL("/binders");
  });

  test("should show user icon and styling", async ({ page }) => {
    // Create a user account
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("Icon Test User");
    await page.getByTestId("email-input").fill("icon@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Check that user account has appropriate icon styling
    const userAccountCard = page.locator("text=Icon Test User").locator("xpath=ancestor::div[1]");
    await expect(userAccountCard).toBeVisible();

    // The user icon should be different from caregiver/professional icons
    await expect(userAccountCard.locator("svg")).toBeVisible();
  });

  test("should complete full user onboarding flow", async ({ page }) => {
    // Create a user account
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("Complete Flow User");
    await page.getByTestId("email-input").fill("complete@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Continue to complete the setup
    await page.getByRole("button", { name: "Continue with 1 user account(s)" }).click();

    // Should navigate to binders page (end of setup)
    await page.waitForURL("/binders");
    await expect(page).toHaveURL("/binders");
  });

  test("should persist user data in database", async ({ page }) => {
    // Create a user account
    await page.getByRole("button", { name: "Add User Account" }).click();
    await page.getByTestId("name-input").fill("Persistent User");
    await page.getByTestId("email-input").fill("persistent@test.com");
    await page.getByRole("button", { name: "Create User" }).click();

    // Refresh the page
    await page.reload();

    // Navigate back to user accounts step (step 3)
    await page.getByRole("button", { name: "Continue Setup" }).click(); // Step 1 -> 2
    await page.getByRole("button", { name: "Continue without accounts" }).click(); // Step 2 -> 3

    // User should still be visible
    await expect(page.getByText("Persistent User")).toBeVisible();
    await expect(page.getByText("persistent@test.com • User")).toBeVisible();
  });
});
