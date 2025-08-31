import { test, expect } from "@playwright/test";

test.describe("Font Size Selector Display", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should display font size selector on settings page", async ({ page }) => {
    await page.goto("/settings");
    await expect(page.locator("label#font-size-label")).toBeVisible();
    await expect(page.getByRole("combobox", { name: "Font Size" })).toBeVisible();
  });
});
