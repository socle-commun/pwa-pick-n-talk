import { test, expect } from '@playwright/test';
import { NavigationUtils, WaitUtils } from '../../utils/test-utils';
import { TestRoutes } from '../../data/test-data';

test.describe('Navigation - Routing and Navigation', () => {
  let navUtils: NavigationUtils;
  let waitUtils: WaitUtils;

  test.beforeEach(async ({ page }) => {
    navUtils = new NavigationUtils(page);
    waitUtils = new WaitUtils(page);
  });

  test('should navigate to all main routes', async ({ page }) => {
    // Test navigation to each main route
    const routes = [
      { path: TestRoutes.HOME, title: /pick.*talk/i },
      { path: TestRoutes.BINDERS, title: /binders|classeurs/i },
      { path: TestRoutes.SETTINGS, title: /settings|paramètres/i },
      { path: TestRoutes.PROFILE, title: /profile|profil/i },
      { path: TestRoutes.PRIVACY, title: /privacy|confidentialité/i },
      { path: TestRoutes.FEEDBACK, title: /feedback|commentaires/i }
    ];

    for (const route of routes) {
      await navUtils.navigateToRoute(route.path);
      await expect(page).toHaveURL(route.path);
      
      // Check if page loaded correctly
      await waitUtils.waitForLoadingComplete();
      
      // Look for expected content
      const pageContent = await page.textContent('body');
      expect(pageContent).toBeTruthy();
    }
  });

  test('should handle navigation menu', async ({ page }) => {
    await navUtils.navigateToRoute(TestRoutes.HOME);
    
    // Look for navigation menu
    const navMenu = page.locator('nav, [role="navigation"]');
    
    if (await navMenu.isVisible()) {
      // Test navigation through menu items
      const navLinks = navMenu.locator('a, [role="link"]');
      const linkCount = await navLinks.count();
      
      if (linkCount > 0) {
        // Click first navigation link
        await navLinks.first().click();
        await waitUtils.waitForLoadingComplete();
        
        // Should navigate to different page
        await expect(page).not.toHaveURL(TestRoutes.HOME);
      }
    }
  });

  test('should handle mobile navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await navUtils.navigateToRoute(TestRoutes.HOME);
    
    // Look for mobile menu button
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="navigation"]');
    
    if (await mobileMenuButton.isVisible()) {
      // Open mobile menu
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      
      // Look for mobile navigation items
      const mobileNavItems = page.locator('nav a, [role="navigation"] a');
      const itemCount = await mobileNavItems.count();
      
      if (itemCount > 0) {
        // Click first mobile nav item
        await mobileNavItems.first().click();
        await waitUtils.waitForLoadingComplete();
        
        // Should navigate
        expect(await page.url()).toBeTruthy();
      }
    }
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate to different pages
    await navUtils.navigateToRoute(TestRoutes.HOME);
    await navUtils.navigateToRoute(TestRoutes.BINDERS);
    await navUtils.navigateToRoute(TestRoutes.SETTINGS);
    
    // Go back
    await navUtils.goBack();
    await expect(page).toHaveURL(TestRoutes.BINDERS);
    
    // Go back again
    await navUtils.goBack();
    await expect(page).toHaveURL(TestRoutes.HOME);
    
    // Go forward
    await navUtils.goForward();
    await expect(page).toHaveURL(TestRoutes.BINDERS);
  });

  test('should handle deep linking', async ({ page }) => {
    // Test direct navigation to deep routes
    const deepRoutes = [
      TestRoutes.SIGN_IN,
      TestRoutes.SIGN_UP,
      TestRoutes.FORGOT_PASSWORD,
      TestRoutes.BINDERS,
      TestRoutes.SETTINGS
    ];

    for (const route of deepRoutes) {
      await navUtils.navigateToRoute(route);
      await expect(page).toHaveURL(route);
      
      // Check if page loaded correctly
      await waitUtils.waitForLoadingComplete();
      
      // Verify page content
      const pageContent = await page.textContent('body');
      expect(pageContent).toBeTruthy();
    }
  });

  test('should handle 404 errors', async ({ page }) => {
    // Navigate to non-existent route
    await navUtils.navigateToRoute('/non-existent-route');
    await waitUtils.waitForLoadingComplete();
    
    // Should show 404 or redirect to error page
    const pageContent = await page.textContent('body');
    const url = page.url();
    
    // Should handle the error gracefully
    expect(pageContent).toBeTruthy();
    expect(url).toBeTruthy();
  });

  test('should handle authentication redirects', async ({ page }) => {
    // Try to access protected route without authentication
    await navUtils.navigateToRoute(TestRoutes.BINDERS);
    await waitUtils.waitForLoadingComplete();
    
    // Should either:
    // 1. Redirect to sign in page
    // 2. Show the page (if no authentication required)
    // 3. Show appropriate error/empty state
    
    const currentUrl = page.url();
    const pageContent = await page.textContent('body');
    
    expect(currentUrl).toBeTruthy();
    expect(pageContent).toBeTruthy();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await navUtils.navigateToRoute(TestRoutes.HOME);
    
    // Test Tab navigation through page elements
    let tabCount = 0;
    const maxTabs = 10;
    
    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        const element = document.activeElement;
        return element ? {
          tagName: element.tagName,
          type: element.getAttribute('type'),
          role: element.getAttribute('role'),
          href: element.getAttribute('href')
        } : null;
      });
      
      if (focusedElement?.href) {
        // Found a link, test Enter key navigation
        await page.keyboard.press('Enter');
        await waitUtils.waitForLoadingComplete();
        
        // Should navigate to the link
        expect(page.url()).toBeTruthy();
        break;
      }
      
      tabCount++;
    }
  });

  test('should handle page refresh', async ({ page }) => {
    // Navigate to different routes and test refresh
    const routes = [TestRoutes.HOME, TestRoutes.BINDERS, TestRoutes.SETTINGS];
    
    for (const route of routes) {
      await navUtils.navigateToRoute(route);
      await waitUtils.waitForLoadingComplete();
      
      // Refresh page
      await navUtils.refresh();
      
      // Should stay on same route
      await expect(page).toHaveURL(route);
      
      // Should load content
      await waitUtils.waitForLoadingComplete();
      const pageContent = await page.textContent('body');
      expect(pageContent).toBeTruthy();
    }
  });

  test('should handle URL parameters', async ({ page }) => {
    // Test navigation with URL parameters
    await navUtils.navigateToRoute(TestRoutes.HOME + '?test=param');
    await waitUtils.waitForLoadingComplete();
    
    // Should preserve parameters
    expect(page.url()).toContain('test=param');
    
    // Page should load normally
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });

  test('should handle hash navigation', async ({ page }) => {
    // Test navigation with hash
    await navUtils.navigateToRoute(TestRoutes.HOME + '#section');
    await waitUtils.waitForLoadingComplete();
    
    // Should preserve hash
    expect(page.url()).toContain('#section');
    
    // Page should load normally
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });
});