import { test, expect } from "@playwright/test";

test.describe("Font Size Accessibility Feature", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test to ensure clean state
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should display font size selector on settings page", async ({ page }) => {
    await page.goto("/settings");
    
    // Check that the font size selector exists
    await expect(page.locator('text="Font Size"')).toBeVisible();
    await expect(page.locator('[role="combobox"]').filter({ hasText: "normal" })).toBeVisible();
  });

  test("should change font size and apply scaling immediately", async ({ page }) => {
    await page.goto("/settings");
    
    // Get initial font size of root element
    const initialFontSize = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(initialFontSize.trim()).toBe('1');
    
    // Open font size selector and select large
    await page.locator('[role="combobox"]').filter({ hasText: "normal" }).click();
    await page.locator('[role="option"]').filter({ hasText: "large" }).click();
    
    // Verify the CSS custom property is updated
    const largeFontSize = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(largeFontSize.trim()).toBe('1.125');
    
    // Verify the selector shows the new selection
    await expect(page.locator('[role="combobox"]').filter({ hasText: "large" })).toBeVisible();
    await expect(page.locator('text="113%"')).toBeVisible();
  });

  test("should persist font size across page reloads", async ({ page }) => {
    await page.goto("/settings");
    
    // Change to extra-large
    await page.locator('[role="combobox"]').filter({ hasText: "normal" }).click();
    await page.locator('[role="option"]').filter({ hasText: "extra-large" }).click();
    
    // Verify selection
    await expect(page.locator('[role="combobox"]').filter({ hasText: "extra-large" })).toBeVisible();
    await expect(page.locator('text="125%"')).toBeVisible();
    
    // Reload page
    await page.reload();
    
    // Verify font size is still applied
    const persistedFontSize = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(persistedFontSize.trim()).toBe('1.25');
    
    // Verify selector still shows extra-large
    await expect(page.locator('[role="combobox"]').filter({ hasText: "extra-large" })).toBeVisible();
  });

  test("should persist font size across different pages", async ({ page }) => {
    await page.goto("/settings");
    
    // Set to large
    await page.locator('[role="combobox"]').filter({ hasText: "normal" }).click();
    await page.locator('[role="option"]').filter({ hasText: "large" }).click();
    
    // Navigate to home page
    await page.goto("/");
    
    // Verify font size is still applied
    const fontSizeOnHome = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(fontSizeOnHome.trim()).toBe('1.125');
    
    // Navigate back to settings
    await page.goto("/settings");
    
    // Verify selector still shows large
    await expect(page.locator('[role="combobox"]').filter({ hasText: "large" })).toBeVisible();
  });

  test("should handle all three font size options correctly", async ({ page }) => {
    await page.goto("/settings");
    
    // Test normal (default)
    let currentScale = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(currentScale.trim()).toBe('1');
    
    // Test large
    await page.locator('[role="combobox"]').click();
    await page.locator('[role="option"]').filter({ hasText: "large" }).click();
    
    currentScale = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(currentScale.trim()).toBe('1.125');
    
    // Test extra-large
    await page.locator('[role="combobox"]').click();
    await page.locator('[role="option"]').filter({ hasText: "extra-large" }).click();
    
    currentScale = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(currentScale.trim()).toBe('1.25');
    
    // Test back to normal
    await page.locator('[role="combobox"]').click();
    await page.locator('[role="option"]').filter({ hasText: "normal" }).click();
    
    currentScale = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(currentScale.trim()).toBe('1');
  });

  test("should scale actual text content visually", async ({ page }) => {
    await page.goto("/settings");
    
    // Get initial text size of a heading
    const heading = page.locator('h1').filter({ hasText: "Settings" });
    await expect(heading).toBeVisible();
    
    const initialSize = await heading.evaluate((el) => {
      return parseFloat(getComputedStyle(el).fontSize);
    });
    
    // Change to large font
    await page.locator('[role="combobox"]').click();
    await page.locator('[role="option"]').filter({ hasText: "large" }).click();
    
    // Check that text is actually larger
    const largeSize = await heading.evaluate((el) => {
      return parseFloat(getComputedStyle(el).fontSize);
    });
    
    expect(largeSize).toBeGreaterThan(initialSize);
    expect(largeSize / initialSize).toBeCloseTo(1.125, 2);
  });

  test("should maintain accessibility with ARIA attributes", async ({ page }) => {
    await page.goto("/settings");
    
    // Check that the combobox has proper ARIA attributes
    const combobox = page.locator('[role="combobox"]');
    await expect(combobox).toHaveAttribute('role', 'combobox');
    
    // Open dropdown and check options have proper roles
    await combobox.click();
    await expect(page.locator('[role="option"]').first()).toBeVisible();
    
    // Verify all three options are present
    await expect(page.locator('[role="option"]').filter({ hasText: "normal" })).toBeVisible();
    await expect(page.locator('[role="option"]').filter({ hasText: "large" })).toBeVisible(); 
    await expect(page.locator('[role="option"]').filter({ hasText: "extra-large" })).toBeVisible();
  });

  test("should work correctly on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/settings");
    
    // Verify font size selector is still accessible
    await expect(page.locator('text="Font Size"')).toBeVisible();
    await expect(page.locator('[role="combobox"]')).toBeVisible();
    
    // Test font size change on mobile
    await page.locator('[role="combobox"]').click();
    await page.locator('[role="option"]').filter({ hasText: "extra-large" }).click();
    
    // Verify change applied
    const mobileScale = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--font-size-scale');
    });
    expect(mobileScale.trim()).toBe('1.25');
    
    // Check that top navigation is still accessible with extra-large font
    await page.goto("/");
    
    // The navbar should be visible and functional
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();
    
    // Brand/logo should be visible
    await expect(page.locator('a[href="/"]')).toBeVisible();
  });
});