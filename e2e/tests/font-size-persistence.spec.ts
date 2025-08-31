import { test, expect } from "@playwright/test";

test.describe("Font Size Persistence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
  });

  test("should persist font size across page reloads", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("combobox", { name: "Font Size" }).click();
    await page.getByRole("option", { name: "extra-large (125%)" }).click();
    await expect(page.getByRole("combobox", { name: "Font Size" })).toContainText("extra-large");
    // Wait for the font size to be applied
    await page.waitForFunction(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale").trim() === "1.25");
    await page.reload();
    // Wait for font size to be restored after reload
    await page.waitForFunction(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale").trim() === "1.25");
    const persistedFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(persistedFontSize.trim()).toBe("1.25");
    await expect(page.getByRole("combobox", { name: "Font Size" })).toContainText("extra-large");
  });

  test("should persist font size across different pages", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("combobox", { name: "Font Size" }).click();
    await page.getByRole("option", { name: "large (113%)" }).click();
    // Wait for the font size to be applied
    await page.waitForFunction(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale").trim() === "1.125");
    await page.goto("/");
    // Wait for font size to be applied on the home page
    await page.waitForFunction(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale").trim() === "1.125");
    const fontSizeOnHome = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(fontSizeOnHome.trim()).toBe("1.125");
    await page.goto("/settings");
    await expect(page.getByRole("combobox", { name: "Font Size" })).toContainText("large");
  });
});
