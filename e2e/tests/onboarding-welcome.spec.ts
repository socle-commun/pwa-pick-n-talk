import { test, expect } from "@playwright/test";

test.describe("Onboarding Welcome Step", () => {
  test.beforeEach(async ({ page }) => {
    // Clear application state
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test("should display welcome step content on setup page", async ({ page }) => {
    await page.goto("/setup");

    // Check welcome heading
    await expect(page.getByRole("heading", { name: /welcome to pick/i })).toBeVisible();

    // Check feature highlights
    await expect(page.getByText(/personalized setup/i)).toBeVisible();
    await expect(page.getByText(/quick & easy/i)).toBeVisible();

    // Check navigation buttons
    await expect(page.getByRole("button", { name: /continue setup/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /skip for now/i })).toBeVisible();
  });

  test("should show settings configuration panel", async ({ page }) => {
    await page.goto("/setup");

    // Check settings sections
    await expect(page.getByRole("heading", { name: /your preferences/i })).toBeVisible();

    // Language section
    await expect(page.getByRole("heading", { name: /language/i })).toBeVisible();
    await expect(page.getByTestId("locale-selector")).toBeVisible();

    // Appearance section
    await expect(page.getByRole("heading", { name: /appearance/i })).toBeVisible();
    await expect(page.getByTestId("theme-mode-toggle")).toBeVisible();
    await expect(page.getByTestId("font-size-selector")).toBeVisible();

    // Accessibility section
    await expect(page.getByRole("heading", { name: /accessibility/i })).toBeVisible();
    await expect(page.getByTestId("high-contrast-toggle")).toBeVisible();
    await expect(page.getByTestId("daltonism-mode-toggle")).toBeVisible();
  });

  test("should allow language selection", async ({ page }) => {
    await page.goto("/setup");

    // Open language selector and select French
    await page.getByTestId("locale-selector").click();
    await page.getByRole("option", { name: /français/i }).click();

    // Verify language changed (text should be in French)
    await expect(page.getByText(/bienvenue/i)).toBeVisible();
  });

  test("should allow theme mode changes", async ({ page }) => {
    await page.goto("/setup");

    // Toggle to dark mode
    await page.getByTestId("theme-mode-toggle").click();

    // Check if dark mode is applied (check for dark class or dark background)
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
  });

  test("should allow font size changes", async ({ page }) => {
    await page.goto("/setup");

    // Change font size
    await page.getByTestId("font-size-selector").click();
    await page.getByRole("option", { name: /large/i }).click();

    // Verify font size changed (check if large font class is applied)
    const html = page.locator("html");
    await expect(html).toHaveClass(/font-large/);
  });

  test("should enable high contrast mode", async ({ page }) => {
    await page.goto("/setup");

    // Toggle high contrast
    await page.getByTestId("high-contrast-toggle").click();

    // Check if high contrast is applied
    const html = page.locator("html");
    await expect(html).toHaveClass(/high-contrast/);
  });

  test("should enable daltonism support", async ({ page }) => {
    await page.goto("/setup");

    // Enable daltonism support
    await page.getByTestId("daltonism-mode-toggle").click();

    // Check if daltonism mode is applied
    const html = page.locator("html");
    await expect(html).toHaveClass(/daltonism-support/);
  });

  test("should navigate with Continue Setup button", async ({ page }) => {
    await page.goto("/setup");

    // Click Continue Setup
    await page.getByRole("button", { name: /continue setup/i }).click();

    // Should navigate to binders page for next setup step
    await expect(page).toHaveURL("/binders");
  });

  test("should navigate with Skip for Now button", async ({ page }) => {
    await page.goto("/setup");

    // Click Skip for Now
    await page.getByRole("button", { name: /skip for now/i }).click();

    // Should navigate to main dashboard
    await expect(page).toHaveURL("/");
  });

  test("should persist settings changes", async ({ page }) => {
    await page.goto("/setup");

    // Change multiple settings
    await page.getByTestId("theme-mode-toggle").click(); // Dark mode
    await page.getByTestId("font-size-selector").click();
    await page.getByRole("option", { name: /large/i }).click();
    await page.getByTestId("high-contrast-toggle").click(); // High contrast

    // Navigate away and back
    await page.goto("/");
    await page.goto("/setup");

    // Verify settings persisted
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
    await expect(html).toHaveClass(/font-large/);
    await expect(html).toHaveClass(/high-contrast/);
  });

  test("should be accessible via keyboard navigation", async ({ page }) => {
    await page.goto("/setup");

    // Tab through interactive elements
    await page.keyboard.press("Tab"); // Should focus on first interactive element
    await page.keyboard.press("Tab"); // Move to next element

    // Test Enter key on Continue Setup button
    await page.getByRole("button", { name: /continue setup/i }).focus();
    await page.keyboard.press("Enter");

    // Should navigate as if clicked
    await expect(page).toHaveURL("/binders");
  });

  test("should have proper ARIA labels and roles", async ({ page }) => {
    await page.goto("/setup");

    // Check ARIA labels on form elements
    await expect(page.getByRole("combobox", { name: /language/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /theme mode/i })).toBeVisible();
    await expect(page.getByRole("combobox", { name: /font size/i })).toBeVisible();
    await expect(page.getByRole("switch", { name: /high contrast/i })).toBeVisible();
    await expect(page.getByRole("switch", { name: /daltonism/i })).toBeVisible();
  });
});
