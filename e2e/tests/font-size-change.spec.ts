import { test, expect } from "@playwright/test";

test.describe("Font Size Change", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should change font size and apply scaling immediately", async ({ page }) => {
    await page.goto("/settings");
    const initialFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(initialFontSize.trim()).toBe("1");
    await page.locator("[role=\"combobox\"]").filter({ hasText: "normal" }).click();
    await page.locator("[role=\"option\"]").filter({ hasText: "large" }).click();
    const largeFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(largeFontSize.trim()).toBe("1.125");
    await expect(page.locator("[role=\"combobox\"]").filter({ hasText: "large" })).toBeVisible();
    await expect(page.locator("text=\"113%\"")).toBeVisible();
  });

  test("should handle all three font size options correctly", async ({ page }) => {
    await page.goto("/settings");
    let currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1");
    await page.locator("[role=\"combobox\"]").click();
    await page.locator("[role=\"option\"]").filter({ hasText: "large" }).click();
    currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1.125");
    await page.locator("[role=\"combobox\"]").click();
    await page.locator("[role=\"option\"]").filter({ hasText: "extra-large" }).click();
    currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1.25");
    await page.locator("[role=\"combobox\"]").click();
    await page.locator("[role=\"option\"]").filter({ hasText: "normal" }).click();
    currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1");
  });
});
