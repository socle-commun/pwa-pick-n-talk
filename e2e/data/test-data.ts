import { faker } from '@faker-js/faker';

export const TestUsers = {
  VALID_USER: {
    email: 'test@example.com',
    password: 'SecurePass123!',
    name: 'Test User'
  },
  INVALID_USER: {
    email: 'invalid@example.com',
    password: 'wrongpass'
  },
  EMPTY_USER: {
    email: '',
    password: ''
  }
};

export const TestBinders = {
  SAMPLE_BINDER: {
    name: 'Test Binder',
    description: 'A test binder for E2E testing',
    pictograms: []
  },
  EMPTY_BINDER: {
    name: '',
    description: '',
    pictograms: []
  }
};

export const generateUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12 }),
  name: faker.person.fullName()
});

export const generateBinder = () => ({
  name: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  pictograms: []
});

export const TestRoutes = {
  HOME: '/',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  BINDERS: '/binders',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  FEEDBACK: '/feedback',
  PRIVACY: '/privacy'
};

export const TestSelectors = {
  // Common selectors
  LOGO: '[data-testid="logo"], svg, img',
  LOADING_SPINNER: '[data-testid="loading-spinner"]',
  ERROR_MESSAGE: '[data-testid="error-message"]',
  
  // Auth selectors
  EMAIL_INPUT: '[data-testid="email-input"], input[type="email"]',
  PASSWORD_INPUT: '[data-testid="password-input"], input[type="password"]',
  SUBMIT_BUTTON: '[data-testid="submit-button"], button[type="submit"]',
  
  // Navigation selectors
  NAV_LINK: '[data-testid="nav-link"]',
  MENU_BUTTON: '[data-testid="menu-button"]',
  
  // Binder selectors
  BINDER_CARD: '[data-testid="binder-card"]',
  BINDER_NAME: '[data-testid="binder-name"]',
  CREATE_BINDER_BUTTON: '[data-testid="create-binder-button"]',
  
  // Settings selectors
  THEME_TOGGLE: '[data-testid="theme-toggle"]',
  LANGUAGE_SELECTOR: '[data-testid="language-selector"]',
  DALTONISM_TOGGLE: '[data-testid="daltonism-toggle"]'
};