import { test, expect } from "@playwright/test";

test.describe("Caregiver Accounts Setup", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to setup page
    await page.goto("/setup");

    // Wait for the page to load and click Continue Setup to reach caregiver step
    await page.getByRole("button", { name: "Continue Setup" }).click();
  });

  test("should display caregiver accounts setup page", async ({ page }) => {
    // Check main heading
    await expect(page.getByRole("heading", { name: "Setup Caregiver Accounts" })).toBeVisible();

    // Check description
    await expect(page.getByText("Add caregivers and professionals")).toBeVisible();

    // Check both account type buttons
    await expect(page.getByRole("button", { name: "Add Caregiver" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add Professional" })).toBeVisible();

    // Check continue button with no accounts
    await expect(page.getByRole("button", { name: "Continue without accounts" })).toBeVisible();
  });

  test("should create a caregiver account successfully", async ({ page }) => {
    // Click Add Caregiver
    await page.getByRole("button", { name: "Add Caregiver" }).click();

    // Fill out the form
    await page.getByTestId("name-input").fill("Test Caregiver");
    await page.getByTestId("email-input").fill("caregiver@test.com");
    await page.getByTestId("password-input").fill("password123");

    // Submit the form
    await page.getByRole("button", { name: "Create Caregiver" }).click();

    // Check that the account appears in the list
    await expect(page.getByText("Created Accounts")).toBeVisible();
    await expect(page.getByText("Test Caregiver")).toBeVisible();
    await expect(page.getByText("caregiver@test.com • Caregiver")).toBeVisible();

    // Check continue button updates
    await expect(page.getByRole("button", { name: "Continue with 1 account(s)" })).toBeVisible();
  });

  test("should create a professional account without password", async ({ page }) => {
    // Click Add Professional
    await page.getByRole("button", { name: "Add Professional" }).click();

    // Fill out the form (no password)
    await page.getByTestId("name-input").fill("Dr. Test Professional");
    await page.getByTestId("email-input").fill("doctor@test.com");

    // Submit the form
    await page.getByRole("button", { name: "Create Professional" }).click();

    // Check that the account appears in the list
    await expect(page.getByText("Dr. Test Professional")).toBeVisible();
    await expect(page.getByText("doctor@test.com • Professional")).toBeVisible();
  });

  test("should create multiple accounts", async ({ page }) => {
    // Create first account (Caregiver)
    await page.getByRole("button", { name: "Add Caregiver" }).click();
    await page.getByTestId("name-input").fill("First Caregiver");
    await page.getByTestId("email-input").fill("first@test.com");
    await page.getByRole("button", { name: "Create Caregiver" }).click();

    // Create second account (Professional)
    await page.getByRole("button", { name: "Add Professional" }).click();
    await page.getByTestId("name-input").fill("Second Professional");
    await page.getByTestId("email-input").fill("second@test.com");
    await page.getByRole("button", { name: "Create Professional" }).click();

    // Check both accounts are visible
    await expect(page.getByText("First Caregiver")).toBeVisible();
    await expect(page.getByText("Second Professional")).toBeVisible();

    // Check continue button shows correct count
    await expect(page.getByRole("button", { name: "Continue with 2 account(s)" })).toBeVisible();
  });

  test("should edit an existing account", async ({ page }) => {
    // Create an account first
    await page.getByRole("button", { name: "Add Caregiver" }).click();
    await page.getByTestId("name-input").fill("Original Name");
    await page.getByTestId("email-input").fill("original@test.com");
    await page.getByRole("button", { name: "Create Caregiver" }).click();

    // Click edit button
    await page.getByRole("button", { name: "Edit" }).click();

    // Check form is pre-populated
    await expect(page.getByTestId("name-input")).toHaveValue("Original Name");
    await expect(page.getByTestId("email-input")).toHaveValue("original@test.com");

    // Update the name
    await page.getByTestId("name-input").clear();
    await page.getByTestId("name-input").fill("Updated Name");

    // Submit the update
    await page.getByRole("button", { name: "Update Caregiver" }).click();

    // Check the updated name appears
    await expect(page.getByText("Updated Name")).toBeVisible();
    await expect(page.getByText("original@test.com • Caregiver")).toBeVisible();
  });

  test("should delete an account", async ({ page }) => {
    // Create an account first
    await page.getByRole("button", { name: "Add Caregiver" }).click();
    await page.getByTestId("name-input").fill("To Be Deleted");
    await page.getByTestId("email-input").fill("delete@test.com");
    await page.getByRole("button", { name: "Create Caregiver" }).click();

    // Verify account exists
    await expect(page.getByText("To Be Deleted")).toBeVisible();

    // Mock the confirm dialog to return true
    page.on("dialog", dialog => dialog.accept());

    // Click delete button
    await page.getByRole("button", { name: "Delete" }).click();

    // Check account is removed
    await expect(page.getByText("To Be Deleted")).not.toBeVisible();

    // Check continue button returns to default
    await expect(page.getByRole("button", { name: "Continue without accounts" })).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    // Try to submit empty form
    await page.getByRole("button", { name: "Add Caregiver" }).click();
    await page.getByRole("button", { name: "Create Caregiver" }).click();

    // Form should still be visible (not submitted due to validation)
    await expect(page.getByRole("heading", { name: "Add Caregiver" })).toBeVisible();
  });

  test("should cancel form and return to main view", async ({ page }) => {
    // Open form
    await page.getByRole("button", { name: "Add Caregiver" }).click();

    // Fill partial data
    await page.getByTestId("name-input").fill("Test");

    // Cancel
    await page.getByRole("button", { name: "Cancel" }).click();

    // Should be back to main view
    await expect(page.getByRole("button", { name: "Add Caregiver" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Add Professional" })).toBeVisible();
  });

  test("should navigate back to welcome step", async ({ page }) => {
    // Click back button
    await page.getByRole("button", { name: "← Back" }).click();

    // Should be on welcome step
    await expect(page.getByRole("heading", { name: "Welcome to Pick'n'Talk!" })).toBeVisible();
  });

  test("should continue to next step after creating accounts", async ({ page }) => {
    // Create an account
    await page.getByRole("button", { name: "Add Caregiver" }).click();
    await page.getByTestId("name-input").fill("Test User");
    await page.getByTestId("email-input").fill("test@example.com");
    await page.getByRole("button", { name: "Create Caregiver" }).click();

    // Continue to next step
    await page.getByRole("button", { name: "Continue with 1 account(s)" }).click();

    // Should navigate to binders page (end of setup)
    await page.waitForURL("/binders");
    await expect(page).toHaveURL("/binders");
  });
});
