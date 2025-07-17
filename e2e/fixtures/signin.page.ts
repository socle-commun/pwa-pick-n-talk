import { Page, expect } from '@playwright/test';
import { TestSelectors } from '../data/test-data';

export class SignInPage {
  constructor(private page: Page) {}

  // Locators
  get emailInput() { 
    return this.page.locator(TestSelectors.EMAIL_INPUT).first(); 
  }
  
  get passwordInput() { 
    return this.page.locator(TestSelectors.PASSWORD_INPUT).first(); 
  }
  
  get submitButton() { 
    return this.page.locator(TestSelectors.SUBMIT_BUTTON).first(); 
  }
  
  get forgotPasswordLink() { 
    return this.page.getByText('Forgot password?').or(this.page.getByText('Mot de passe oublié')); 
  }
  
  get signUpLink() { 
    return this.page.getByText('Sign up').or(this.page.getByText('Créer un compte')); 
  }
  
  get errorMessage() { 
    return this.page.locator(TestSelectors.ERROR_MESSAGE).first(); 
  }

  // Actions
  async goto() {
    await this.page.goto('/auth/sign-in');
  }

  async signIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  // Assertions
  async expectSignInForm() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectErrorMessage(message?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (message) {
      await expect(this.errorMessage).toContainText(message);
    }
  }

  async expectSignedIn() {
    await this.page.waitForURL('/');
    await expect(this.page).toHaveURL('/');
  }
}