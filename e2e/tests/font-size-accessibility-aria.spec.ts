import { test, expect } from "@playwright/test";

test.describe("Font Size Accessibility ARIA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should maintain accessibility with ARIA attributes", async ({ page }) => {
    await page.goto("/settings");
    const combobox = page.locator("[role=\"combobox\"]");
    await expect(combobox).toHaveAttribute("role", "combobox");
    await combobox.click();
    await expect(page.locator("[role=\"option\"]").first()).toBeVisible();
    await expect(page.locator("[role=\"option\"]").filter({ hasText: "normal" })).toBeVisible();
    await expect(page.locator("[role=\"option\"]").filter({ hasText: "large" })).toBeVisible();
    await expect(page.locator("[role=\"option\"]").filter({ hasText: "extra-large" })).toBeVisible();
  });
});
