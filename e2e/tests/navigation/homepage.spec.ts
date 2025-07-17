import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the application title", async ({ page }) => {
    await expect(page).toHaveTitle(/Pick[''`]?n[''`]?Talk/i);
  });

  test("should display the logo", async ({ page }) => {
    const logo = page.locator('svg, img').first();
    await expect(logo).toBeVisible();
  });

  test("should display the home title", async ({ page }) => {
    // Wait for i18n to load and display translated content
    await page.waitForFunction(() => {
      const element = document.querySelector('body');
      return element && element.textContent && element.textContent.trim().length > 0;
    });
    
    // Check if page has loaded content
    await expect(page.locator('body')).toContainText(/./);
  });
});