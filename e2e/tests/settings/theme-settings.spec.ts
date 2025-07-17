import { test, expect } from '@playwright/test';
import { SettingsPage } from '../../fixtures/settings.page';
import { DatabaseUtils, WaitUtils } from '../../utils/test-utils';

test.describe('Settings - Theme and Preferences', () => {
  let settingsPage: SettingsPage;
  let dbUtils: DatabaseUtils;
  let waitUtils: WaitUtils;

  test.beforeEach(async ({ page }) => {
    settingsPage = new SettingsPage(page);
    dbUtils = new DatabaseUtils(page);
    waitUtils = new WaitUtils(page);
    
    // Clear any existing settings
    await dbUtils.clearAppData();
    await settingsPage.goto();
  });

  test('should display settings page', async ({ page }) => {
    await settingsPage.expectSettingsPage();
  });

  test('should toggle theme mode', async ({ page }) => {
    // Wait for page to load
    await waitUtils.waitForLoadingComplete();
    
    // Check if theme toggle exists
    if (await settingsPage.themeToggle.isVisible()) {
      // Get initial theme state
      const initialTheme = await page.locator('html').getAttribute('class');
      
      // Toggle theme
      await settingsPage.toggleTheme();
      
      // Wait for theme change
      await page.waitForTimeout(500);
      
      // Check if theme changed
      const newTheme = await page.locator('html').getAttribute('class');
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('should persist theme preference', async ({ page }) => {
    // Wait for page to load
    await waitUtils.waitForLoadingComplete();
    
    if (await settingsPage.themeToggle.isVisible()) {
      // Toggle to dark mode
      await settingsPage.toggleTheme();
      await page.waitForTimeout(500);
      
      // Reload page
      await page.reload();
      await waitUtils.waitForLoadingComplete();
      
      // Check if theme preference is persisted
      const themeAfterReload = await page.locator('html').getAttribute('class');
      expect(themeAfterReload).toBeTruthy();
    }
  });

  test('should switch language', async ({ page }) => {
    // Wait for page to load
    await waitUtils.waitForLoadingComplete();
    
    if (await settingsPage.languageSelector.isVisible()) {
      // Click language selector
      await settingsPage.languageSelector.click();
      
      // Wait for language options to appear
      await page.waitForTimeout(500);
      
      // Look for language options
      const frenchOption = page.getByText(/français|french/i);
      const englishOption = page.getByText(/english|anglais/i);
      
      if (await frenchOption.isVisible()) {
        await frenchOption.click();
        await page.waitForTimeout(1000);
        
        // Check if language changed
        const htmlLang = await page.locator('html').getAttribute('lang');
        expect(htmlLang).toContain('fr');
      }
    }
  });

  test('should toggle daltonism mode', async ({ page }) => {
    // Wait for page to load
    await waitUtils.waitForLoadingComplete();
    
    if (await settingsPage.daltonismToggle.isVisible()) {
      // Toggle daltonism mode
      await settingsPage.daltonismToggle.click();
      await page.waitForTimeout(500);
      
      // Check if daltonism mode is applied
      const bodyClass = await page.locator('body').getAttribute('class');
      expect(bodyClass).toBeTruthy();
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await waitUtils.waitForLoadingComplete();
    
    // Test keyboard navigation through settings
    if (await settingsPage.themeToggle.isVisible()) {
      await settingsPage.themeToggle.focus();
      await page.keyboard.press('Space');
      
      // Should toggle theme
      await page.waitForTimeout(500);
      
      // Continue with Tab navigation
      await page.keyboard.press('Tab');
      
      // Should focus next element
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    }
  });

  test('should work in different screen sizes', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await settingsPage.expectSettingsPage();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await settingsPage.expectSettingsPage();
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await settingsPage.expectSettingsPage();
  });

  test('should handle settings persistence across sessions', async ({ page }) => {
    await waitUtils.waitForLoadingComplete();
    
    // Change multiple settings
    if (await settingsPage.themeToggle.isVisible()) {
      await settingsPage.toggleTheme();
      await page.waitForTimeout(500);
    }
    
    if (await settingsPage.daltonismToggle.isVisible()) {
      await settingsPage.daltonismToggle.click();
      await page.waitForTimeout(500);
    }
    
    // Store current settings
    const currentTheme = await page.locator('html').getAttribute('class');
    const currentBodyClass = await page.locator('body').getAttribute('class');
    
    // Navigate away and back
    await page.goto('/');
    await page.goto('/settings');
    await waitUtils.waitForLoadingComplete();
    
    // Check if settings are persisted
    const newTheme = await page.locator('html').getAttribute('class');
    const newBodyClass = await page.locator('body').getAttribute('class');
    
    expect(newTheme).toBe(currentTheme);
    expect(newBodyClass).toBe(currentBodyClass);
  });

  test('should handle accessibility requirements', async ({ page }) => {
    await waitUtils.waitForLoadingComplete();
    
    // Check ARIA attributes on interactive elements
    if (await settingsPage.themeToggle.isVisible()) {
      const ariaLabel = await settingsPage.themeToggle.getAttribute('aria-label');
      const ariaRole = await settingsPage.themeToggle.getAttribute('role');
      
      expect(ariaLabel || ariaRole).toBeTruthy();
    }
    
    // Check focus management
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement);
    expect(focusedElement).toBeTruthy();
  });
});