import { test, expect } from "@playwright/test";

test.describe("Basic Application Tests", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });
});
