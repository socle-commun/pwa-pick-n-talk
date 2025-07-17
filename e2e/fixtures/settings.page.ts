import { Page, expect } from '@playwright/test';
import { TestSelectors } from '../data/test-data';

export class SettingsPage {
  constructor(private page: Page) {}

  // Locators
  get themeToggle() { 
    return this.page.locator(TestSelectors.THEME_TOGGLE).or(
      this.page.getByRole('button', { name: /theme|dark|light/i })
    ); 
  }
  
  get languageSelector() { 
    return this.page.locator(TestSelectors.LANGUAGE_SELECTOR).or(
      this.page.getByRole('button', { name: /language|langue/i })
    ); 
  }
  
  get daltonismToggle() { 
    return this.page.locator(TestSelectors.DALTONISM_TOGGLE).or(
      this.page.getByRole('button', { name: /daltonism|color/i })
    ); 
  }

  // Actions
  async goto() {
    await this.page.goto('/settings');
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  async selectLanguage(language: string) {
    await this.languageSelector.click();
    await this.page.getByText(language).click();
  }

  async toggleDaltonism() {
    await this.daltonismToggle.click();
  }

  // Assertions
  async expectSettingsPage() {
    await expect(this.page).toHaveURL('/settings');
    await expect(this.page.locator('h1, h2')).toContainText(/settings|paramètres/i);
  }

  async expectDarkMode() {
    await expect(this.page.locator('html')).toHaveClass(/dark/);
  }

  async expectLightMode() {
    await expect(this.page.locator('html')).not.toHaveClass(/dark/);
  }

  async expectLanguage(language: string) {
    await expect(this.page.locator('html')).toHaveAttribute('lang', language);
  }
}