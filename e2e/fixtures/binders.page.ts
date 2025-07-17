import { Page, expect } from '@playwright/test';
import { TestSelectors } from '../data/test-data';

export class BindersPage {
  constructor(private page: Page) {}

  // Locators
  get binderCards() { 
    return this.page.locator(TestSelectors.BINDER_CARD); 
  }
  
  get createBinderButton() { 
    return this.page.locator(TestSelectors.CREATE_BINDER_BUTTON).or(
      this.page.getByRole('button', { name: /create|new|add/i })
    ); 
  }
  
  get searchInput() { 
    return this.page.getByPlaceholder(/search/i); 
  }
  
  get emptyState() { 
    return this.page.getByText(/no binders/i).or(this.page.getByText(/aucun classeur/i)); 
  }

  // Actions
  async goto() {
    await this.page.goto('/binders');
  }

  async createBinder() {
    await this.createBinderButton.click();
  }

  async searchBinder(query: string) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
  }

  async clickBinder(index: number = 0) {
    await this.binderCards.nth(index).click();
  }

  async getBinderName(index: number = 0) {
    return await this.binderCards.nth(index).locator(TestSelectors.BINDER_NAME).textContent();
  }

  // Assertions
  async expectBindersPage() {
    await expect(this.page).toHaveURL('/binders');
    await expect(this.page.locator('h1, h2')).toContainText(/binders|classeurs/i);
  }

  async expectBinderCount(count: number) {
    await expect(this.binderCards).toHaveCount(count);
  }

  async expectEmptyState() {
    await expect(this.emptyState).toBeVisible();
  }

  async expectBinderVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }
}