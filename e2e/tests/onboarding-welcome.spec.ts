import { test, expect } from "@playwright/test";

test.describe("Onboarding Welcome Step", () => {
  test.beforeEach(async ({ page }) => {
    // Simply navigate to setup page
    await page.goto("/setup");
  });

  test("should display welcome step content on setup page", async ({ page }) => {
    // Check welcome heading
    await expect(page.getByRole("heading", { name: /welcome to pick/i })).toBeVisible();

    // Check feature highlights
    await expect(page.getByText(/personalized setup/i)).toBeVisible();
    await expect(page.getByText(/quick & easy/i)).toBeVisible();

    // Check navigation buttons
    await expect(page.getByRole("button", { name: /continue setup/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /skip for now/i })).toBeVisible();
  });

  test("should show settings configuration panel", async ({ page }) => {
    // Check settings sections
    await expect(page.getByRole("heading", { name: /your preferences/i })).toBeVisible();

    // Language section
    await expect(page.getByRole("heading", { name: /language/i })).toBeVisible();
    await expect(page.getByRole("combobox").filter({ hasText: /^🇺🇸$/ })).toBeVisible();

    // Appearance section
    await expect(page.getByRole("heading", { name: /appearance/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /theme mode/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /font size/i })).toBeVisible();

    // Accessibility section
    await expect(page.getByRole("heading", { name: /accessibility/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /high contrast mode/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /daltonism support/i })).toBeVisible();
  });

  test("should allow language selection", async ({ page }) => {
    // Open language selector and select French
    await page.getByRole("combobox").filter({ hasText: "🇺🇸" }).click();
    await page.getByRole("option", { name: /français/i }).click();

    // Verify language changed (text should be in French)
    await expect(page.getByText(/bienvenue/i)).toBeVisible();
  });

  test("should allow theme mode changes", async ({ page }) => {
    // Toggle to dark mode
    await page.getByRole("combobox", { name: /theme mode/i }).click();
    await page.getByRole("option", { name: /dark/i }).click();

    // Check if dark mode is applied (check for dark class or dark background)
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
  });

  test("should allow font size changes", async ({ page }) => {
    // Change font size
    await page.getByRole("combobox", { name: /font size/i }).click();
    await page.getByRole("option", { name: "large (113%)" }).click();

    // Verify font size changed (check CSS custom property)
    await page.waitForFunction(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale").trim() === "1.125"
    );
  });

  test("should enable high contrast mode", async ({ page }) => {
    // Toggle high contrast
    await page.getByRole("combobox", { name: /high contrast mode/i }).click();
    await page.getByRole("option", { name: /high-contrast/i }).click();

    // Check if high contrast is applied
    const html = page.locator("html");
    await expect(html).toHaveClass(/high-contrast/);
  });

  test("should enable daltonism support", async ({ page }) => {
    // Enable daltonism support
    await page.getByRole("combobox", { name: /daltonism support/i }).click();
    await page.getByRole("option", { name: /protanopia/i }).click();

    // Check if daltonism mode is applied
    const html = page.locator("html");
    await expect(html).toHaveClass(/daltonism-protanopia/);
  });

  test("should navigate with Continue Setup button", async ({ page }) => {
    // Click Continue Setup
    await page.getByRole("button", { name: /continue setup/i }).click();

    // Should stay on setup page but move to caregivers step
    await expect(page).toHaveURL("/setup");
    await expect(page.getByRole("heading", { name: /caregiver accounts/i })).toBeVisible();
  });

  test("should navigate with Skip for Now button", async ({ page }) => {
    // Click Skip for Now (it's a link, not a button)
    await page.getByRole("link", { name: /skip for now/i }).click();

    // Should navigate to binders list page
    await expect(page).toHaveURL("/binders");
  });

  test("should persist settings changes", async ({ page }) => {
    // Change multiple settings
    await page.getByRole("combobox", { name: /theme mode/i }).click();
    await page.getByRole("option", { name: /dark/i }).click();

    await page.getByRole("combobox", { name: /font size/i }).click();
    await page.getByRole("option", { name: "large (113%)" }).click();

    await page.getByRole("combobox", { name: /high contrast mode/i }).click();
    await page.getByRole("option", { name: /high-contrast/i }).click();

    // Navigate away and back
    await page.goto("/");

    // Verify settings persisted
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
    await page.waitForFunction(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale").trim() === "1.125"
    );
    await expect(html).toHaveClass(/high-contrast/);
  });

  test("should be accessible via keyboard navigation", async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press("Tab"); // Should focus on first interactive element
    await page.keyboard.press("Tab"); // Move to next element

    // Test Enter key on Continue Setup button
    await page.getByRole("button", { name: /continue setup/i }).focus();
    await page.keyboard.press("Enter");

    // Should stay on setup page but move to caregivers step
    await expect(page).toHaveURL("/setup");
    await expect(page.getByRole("heading", { name: /caregiver accounts/i })).toBeVisible();
  });

  test("should have proper ARIA labels and roles", async ({ page }) => {
    // Check ARIA labels on form elements
    await expect(page.getByRole("combobox").filter({ hasText: /^🇺🇸$/ })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /theme mode/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /font size/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /high contrast mode/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /daltonism support/i })).toBeVisible();
  });
});
