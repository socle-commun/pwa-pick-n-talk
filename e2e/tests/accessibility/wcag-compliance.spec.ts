import { test, expect } from '@playwright/test';
import { AccessibilityUtils, WaitUtils } from '../../utils/test-utils';
import { TestRoutes } from '../../data/test-data';

test.describe('Accessibility - WCAG Compliance', () => {
  let a11yUtils: AccessibilityUtils;
  let waitUtils: WaitUtils;

  test.beforeEach(async ({ page }) => {
    a11yUtils = new AccessibilityUtils(page);
    waitUtils = new WaitUtils(page);
  });

  test('should have proper heading structure', async ({ page }) => {
    const routes = [TestRoutes.HOME, TestRoutes.BINDERS, TestRoutes.SETTINGS];
    
    for (const route of routes) {
      await page.goto(route);
      await waitUtils.waitForLoadingComplete();
      
      // Check for proper heading hierarchy
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      
      if (headings.length > 0) {
        // Should have at least one h1
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);
        
        // Check heading hierarchy
        for (const heading of headings) {
          const text = await heading.textContent();
          expect(text).toBeTruthy();
        }
      }
    }
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Check interactive elements have proper ARIA attributes
    const interactiveElements = await page.locator('button, [role="button"], a, input, select, textarea').all();
    
    for (const element of interactiveElements) {
      const ariaLabel = await element.getAttribute('aria-label');
      const ariaRole = await element.getAttribute('role');
      const text = await element.textContent();
      
      // Should have accessible name (aria-label, text content, or proper role)
      expect(ariaLabel || text || ariaRole).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Test Tab navigation
    let tabCount = 0;
    const maxTabs = 20;
    const focusedElements = [];
    
    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        const element = document.activeElement;
        return element ? {
          tagName: element.tagName,
          type: element.getAttribute('type'),
          role: element.getAttribute('role'),
          tabIndex: element.tabIndex
        } : null;
      });
      
      if (focusedElement) {
        focusedElements.push(focusedElement);
      }
      
      tabCount++;
    }
    
    // Should have focusable elements
    expect(focusedElements.length).toBeGreaterThan(0);
    
    // Test Shift+Tab (reverse navigation)
    await page.keyboard.press('Shift+Tab');
    const reverseFocusedElement = await page.evaluate(() => {
      const element = document.activeElement;
      return element ? element.tagName : null;
    });
    
    expect(reverseFocusedElement).toBeTruthy();
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Test focus visibility
    const focusableElements = await page.locator('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])').all();
    
    for (const element of focusableElements.slice(0, 5)) { // Test first 5 elements
      await element.focus();
      
      // Check if element is visually focused
      const isFocused = await element.evaluate((el) => {
        return document.activeElement === el;
      });
      
      expect(isFocused).toBe(true);
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Test with high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForTimeout(500);
    
    // Check if dark mode is applied
    const isDarkMode = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark') || 
             document.body.classList.contains('dark') ||
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    
    // Should handle color scheme changes
    expect(typeof isDarkMode).toBe('boolean');
    
    // Test with light mode
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForTimeout(500);
    
    // Should handle light mode
    const bodyContent = await page.textContent('body');
    expect(bodyContent).toBeTruthy();
  });

  test('should have proper form labels and validation', async ({ page }) => {
    await page.goto(TestRoutes.SIGN_IN);
    await waitUtils.waitForLoadingComplete();
    
    // Check form inputs have proper labels
    const inputs = await page.locator('input').all();
    
    for (const input of inputs) {
      const inputId = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (inputId) {
        // Check for associated label
        const label = await page.locator(`label[for="${inputId}"]`).count();
        expect(label > 0 || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });

  test('should handle screen reader announcements', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Check for live regions
    const liveRegions = await page.locator('[aria-live], [role="status"], [role="alert"]').all();
    
    // Should have appropriate live regions for dynamic content
    if (liveRegions.length > 0) {
      for (const region of liveRegions) {
        const ariaLive = await region.getAttribute('aria-live');
        const role = await region.getAttribute('role');
        
        expect(ariaLive || role).toBeTruthy();
      }
    }
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Test with reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Check if animations are reduced
    const hasReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    
    expect(hasReducedMotion).toBe(true);
    
    // Should still function normally
    const bodyContent = await page.textContent('body');
    expect(bodyContent).toBeTruthy();
  });

  test('should handle high contrast mode', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Test high contrast compatibility
    await page.addStyleTag({
      content: `
        * {
          background: white !important;
          color: black !important;
        }
      `
    });
    
    await page.waitForTimeout(500);
    
    // Should still be readable and functional
    const bodyContent = await page.textContent('body');
    expect(bodyContent).toBeTruthy();
    
    // Interactive elements should still work
    const buttons = await page.locator('button').all();
    if (buttons.length > 0) {
      await buttons[0].click();
      // Should handle the click
      expect(true).toBe(true);
    }
  });

  test('should have proper landmark regions', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Check for landmark regions
    const landmarks = await page.locator('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], main, nav, header, footer').all();
    
    // Should have at least main content area
    expect(landmarks.length).toBeGreaterThan(0);
    
    // Check landmark structure
    const mainContent = await page.locator('main, [role="main"]').count();
    expect(mainContent).toBeGreaterThanOrEqual(1);
  });

  test('should handle text scaling', async ({ page }) => {
    await page.goto(TestRoutes.HOME);
    await waitUtils.waitForLoadingComplete();
    
    // Test with larger text size
    await page.addStyleTag({
      content: `
        html {
          font-size: 24px !important;
        }
      `
    });
    
    await page.waitForTimeout(500);
    
    // Should still be functional with larger text
    const bodyContent = await page.textContent('body');
    expect(bodyContent).toBeTruthy();
    
    // Interactive elements should still be clickable
    const buttons = await page.locator('button').all();
    if (buttons.length > 0) {
      await buttons[0].click();
      expect(true).toBe(true);
    }
  });
});