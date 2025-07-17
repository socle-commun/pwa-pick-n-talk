import { Page } from '@playwright/test';

/**
 * Navigation utilities for E2E tests
 */
export class NavigationUtils {
  constructor(private page: Page) {}

  /**
   * Navigate to a specific route and wait for it to load
   */
  async navigateToRoute(route: string) {
    await this.page.goto(route);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on a navigation link by text
   */
  async clickNavLink(linkText: string) {
    await this.page.getByRole('link', { name: new RegExp(linkText, 'i') }).click();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    await this.page.goBack();
    await this.waitForNavigation();
  }

  /**
   * Go forward in browser history
   */
  async goForward() {
    await this.page.goForward();
    await this.waitForNavigation();
  }

  /**
   * Refresh the current page
   */
  async refresh() {
    await this.page.reload();
    await this.waitForNavigation();
  }
}

/**
 * Database utilities for E2E tests
 */
export class DatabaseUtils {
  constructor(private page: Page) {}

  /**
   * Clear all application data
   */
  async clearAppData() {
    await this.page.evaluate(() => {
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear IndexedDB
      if (window.indexedDB) {
        const databaseNames = ['PickNTalkDB', 'pick-n-talk-db'];
        databaseNames.forEach(name => {
          try {
            indexedDB.deleteDatabase(name);
          } catch (e) {
            console.warn(`Could not delete database ${name}:`, e);
          }
        });
      }
    });
  }

  /**
   * Set up test data in localStorage
   */
  async setupTestData(data: Record<string, any>) {
    await this.page.evaluate((testData) => {
      Object.entries(testData).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }, data);
  }

  /**
   * Get data from localStorage
   */
  async getStorageData(key: string) {
    return await this.page.evaluate((storageKey) => {
      const value = localStorage.getItem(storageKey);
      return value ? JSON.parse(value) : null;
    }, key);
  }
}

/**
 * Waiting utilities for E2E tests
 */
export class WaitUtils {
  constructor(private page: Page) {}

  /**
   * Wait for element to be visible and stable
   */
  async waitForElementStable(selector: string, timeout: number = 5000) {
    const element = this.page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    await element.waitFor({ state: 'stable', timeout });
  }

  /**
   * Wait for API response
   */
  async waitForApiResponse(urlPattern: string, timeout: number = 10000) {
    return await this.page.waitForResponse(
      response => response.url().includes(urlPattern) && response.status() === 200,
      { timeout }
    );
  }

  /**
   * Wait for text to appear on page
   */
  async waitForText(text: string, timeout: number = 5000) {
    await this.page.waitForFunction(
      (searchText) => document.body.textContent?.includes(searchText) || false,
      text,
      { timeout }
    );
  }

  /**
   * Wait for loading to complete
   */
  async waitForLoadingComplete(timeout: number = 10000) {
    // Wait for common loading indicators to disappear
    const loadingSelectors = [
      '[data-testid="loading-spinner"]',
      '[data-testid="loader"]',
      '.loading',
      '.spinner'
    ];

    for (const selector of loadingSelectors) {
      try {
        await this.page.waitForSelector(selector, { state: 'detached', timeout: 1000 });
      } catch (e) {
        // Loading indicator not found, continue
      }
    }

    // Wait for network to be idle
    await this.page.waitForLoadState('networkidle', { timeout });
  }
}

/**
 * Accessibility utilities for E2E tests
 */
export class AccessibilityUtils {
  constructor(private page: Page) {}

  /**
   * Check if element is keyboard accessible
   */
  async isKeyboardAccessible(selector: string) {
    const element = this.page.locator(selector);
    await element.focus();
    return await element.evaluate((el) => {
      return document.activeElement === el;
    });
  }

  /**
   * Navigate using keyboard
   */
  async navigateWithKeyboard(key: 'Tab' | 'Enter' | 'Space' | 'ArrowDown' | 'ArrowUp') {
    await this.page.keyboard.press(key);
  }

  /**
   * Check ARIA attributes
   */
  async checkAriaAttribute(selector: string, attribute: string, expectedValue?: string) {
    const element = this.page.locator(selector);
    const value = await element.getAttribute(attribute);
    
    if (expectedValue) {
      return value === expectedValue;
    }
    
    return value !== null;
  }
}

/**
 * Mobile utilities for E2E tests
 */
export class MobileUtils {
  constructor(private page: Page) {}

  /**
   * Simulate mobile viewport
   */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  /**
   * Simulate tablet viewport
   */
  async setTabletViewport() {
    await this.page.setViewportSize({ width: 768, height: 1024 });
  }

  /**
   * Simulate desktop viewport
   */
  async setDesktopViewport() {
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }

  /**
   * Simulate touch gesture
   */
  async tap(selector: string) {
    await this.page.locator(selector).tap();
  }

  /**
   * Simulate swipe gesture
   */
  async swipe(fromSelector: string, toSelector: string) {
    const from = this.page.locator(fromSelector);
    const to = this.page.locator(toSelector);
    
    await from.dragTo(to);
  }
}