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
    await page.getByRole("combobox", { name: "Font Size" }).click();
    await page.getByRole("option", { name: "large (113%)" }).click();
    const largeFontSize = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(largeFontSize.trim()).toBe("1.125");
    await expect(page.getByRole("combobox", { name: "Font Size" })).toContainText("large");
  });

  test("should handle all three font size options correctly", async ({ page }) => {
    await page.goto("/settings");
    let currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1");
    await page.getByRole("combobox", { name: "Font Size" }).click();
    await page.getByRole("option", { name: "large (113%)" }).click();
    currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1.125");
    await page.getByRole("combobox", { name: "Font Size" }).click();
    await page.getByRole("option", { name: "extra-large (125%)" }).click();
    currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1.25");
    await page.getByRole("combobox", { name: "Font Size" }).click();
    await page.getByRole("option", { name: "normal (100%)" }).click();
    currentScale = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--font-size-scale"));
    expect(currentScale.trim()).toBe("1");
  });
});
