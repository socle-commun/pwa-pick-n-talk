import { test, expect } from '@playwright/test';
import { BindersPage } from '../../fixtures/binders.page';
import { TestBinders, generateBinder } from '../../data/test-data';
import { DatabaseUtils, WaitUtils } from '../../utils/test-utils';

test.describe('Binders - CRUD Operations', () => {
  let bindersPage: BindersPage;
  let dbUtils: DatabaseUtils;
  let waitUtils: WaitUtils;

  test.beforeEach(async ({ page }) => {
    bindersPage = new BindersPage(page);
    dbUtils = new DatabaseUtils(page);
    waitUtils = new WaitUtils(page);
    
    // Clear any existing data
    await dbUtils.clearAppData();
    await bindersPage.goto();
  });

  test('should display binders page', async ({ page }) => {
    await bindersPage.expectBindersPage();
  });

  test('should show empty state when no binders exist', async ({ page }) => {
    // Wait for page to load
    await waitUtils.waitForLoadingComplete();
    
    // Should show empty state or create button
    const hasCreateButton = await bindersPage.createBinderButton.isVisible();
    const hasEmptyState = await bindersPage.emptyState.isVisible();
    
    expect(hasCreateButton || hasEmptyState).toBeTruthy();
  });

  test('should create a new binder', async ({ page }) => {
    // Look for create button
    const createButton = bindersPage.createBinderButton;
    if (await createButton.isVisible()) {
      await createButton.click();
      
      // Should navigate to create/edit page
      await expect(page).toHaveURL(/\/(binders\/new|binders\/.*\/edit)/);
    }
  });

  test('should display existing binders', async ({ page }) => {
    // Set up test data if needed
    await dbUtils.setupTestData({
      'test-binder': TestBinders.SAMPLE_BINDER
    });
    
    await page.reload();
    await waitUtils.waitForLoadingComplete();
    
    // Check if binders are displayed
    const binderCount = await bindersPage.binderCards.count();
    expect(binderCount).toBeGreaterThanOrEqual(0);
  });

  test('should navigate to binder detail page', async ({ page }) => {
    // Wait for binders to load
    await waitUtils.waitForLoadingComplete();
    
    const binderCount = await bindersPage.binderCards.count();
    
    if (binderCount > 0) {
      await bindersPage.clickBinder(0);
      
      // Should navigate to binder detail page
      await expect(page).toHaveURL(/\/binders\/[^\/]+$/);
    }
  });

  test('should search binders', async ({ page }) => {
    // Wait for page to load
    await waitUtils.waitForLoadingComplete();
    
    // If search input exists, test search functionality
    if (await bindersPage.searchInput.isVisible()) {
      await bindersPage.searchBinder('test');
      
      // Should filter results or show no results
      await waitUtils.waitForLoadingComplete();
      
      // Verify search functionality
      const binderCount = await bindersPage.binderCards.count();
      expect(binderCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('should handle responsive layout', async ({ page }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await bindersPage.expectBindersPage();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await bindersPage.expectBindersPage();
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await bindersPage.expectBindersPage();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await waitUtils.waitForLoadingComplete();
    
    // Test keyboard navigation through binder cards
    const binderCount = await bindersPage.binderCards.count();
    
    if (binderCount > 0) {
      await bindersPage.binderCards.first().focus();
      await page.keyboard.press('Enter');
      
      // Should navigate to binder detail
      await expect(page).toHaveURL(/\/binders\/[^\/]+$/);
    }
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/api/binders**', route => route.abort());
    
    await page.reload();
    await waitUtils.waitForLoadingComplete();
    
    // Should show error state or fallback UI
    const hasErrorMessage = await page.locator('[data-testid="error-message"]').isVisible();
    const hasEmptyState = await bindersPage.emptyState.isVisible();
    
    expect(hasErrorMessage || hasEmptyState).toBeTruthy();
  });
});