import { test, expect } from "@playwright/test";

test.describe("Font Size Responsive/Mobile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should work correctly on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/settings");
    await expect(page.locator("text=\"Font Size\"")).toBeVisible();
    await expect(page.locator("[role=\"combobox\"]")).toBeVisible();
    await page.locator("[role=\"combobox\"]").click();
    await page.locator("[role=\"option\"]").filter({ hasText: "extra-large" }).click();
    const mobileScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(mobileScale.trim()).toBe("1.25");
    await page.goto("/");
    const navbar = page.locator("nav");
    await expect(navbar).toBeVisible();
    await expect(page.locator("a[href=\"/\"]")).toBeVisible();
  });
});
