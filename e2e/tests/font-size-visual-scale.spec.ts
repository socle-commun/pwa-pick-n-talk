import { test, expect } from "@playwright/test";

test.describe("Font Size Visual Scaling", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should scale actual text content visually", async ({ page }) => {
    await page.goto("/settings");
    const heading = page.locator("h1").filter({ hasText: "Settings" });
    await expect(heading).toBeVisible();
    const initialSize = await heading.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    await page.locator("[role=\"combobox\"]").click();
    await page.locator("[role=\"option\"]").filter({ hasText: "large" }).click();
    const largeSize = await heading.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(largeSize).toBeGreaterThan(initialSize);
    expect(largeSize / initialSize).toBeCloseTo(1.125, 2);
  });
});
