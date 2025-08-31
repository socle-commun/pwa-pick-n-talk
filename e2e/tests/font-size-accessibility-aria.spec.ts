import { test, expect } from "@playwright/test";

test.describe("Font Size Accessibility ARIA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should maintain accessibility with ARIA attributes", async ({ page }) => {
    await page.goto("/settings");
    const combobox = page.getByRole("combobox", { name: "Font Size" });
    await expect(combobox).toHaveAttribute("role", "combobox");
    await combobox.click();
    await expect(page.getByRole("option").first()).toBeVisible();
    await expect(page.getByRole("option", { name: "normal (100%)" })).toBeVisible();
    await expect(page.getByRole("option", { name: "large (113%)" })).toBeVisible();
    await expect(page.getByRole("option", { name: "extra-large (125%)" })).toBeVisible();
  });
});
