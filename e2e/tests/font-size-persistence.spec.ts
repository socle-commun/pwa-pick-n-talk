import { test, expect } from "@playwright/test";

test.describe("Font Size Persistence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should persist font size across page reloads", async ({ page }) => {
    await page.goto("/settings");
    await page.locator("[role=\"combobox\"]").filter({ hasText: "normal" }).click();
    await page.locator("[role=\"option\"]").filter({ hasText: "extra-large" }).click();
    await expect(page.locator("[role=\"combobox\"]").filter({ hasText: "extra-large" })).toBeVisible();
    await expect(page.locator("text=\"125%\"")).toBeVisible();
    await page.reload();
    const persistedFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(persistedFontSize.trim()).toBe("1.25");
    await expect(page.locator("[role=\"combobox\"]").filter({ hasText: "extra-large" })).toBeVisible();
  });

  test("should persist font size across different pages", async ({ page }) => {
    await page.goto("/settings");
    await page.locator("[role=\"combobox\"]").filter({ hasText: "normal" }).click();
    await page.locator("[role=\"option\"]").filter({ hasText: "large" }).click();
    await page.goto("/");
    const fontSizeOnHome = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(fontSizeOnHome.trim()).toBe("1.125");
    await page.goto("/settings");
    await expect(page.locator("[role=\"combobox\"]").filter({ hasText: "large" })).toBeVisible();
  });
});
