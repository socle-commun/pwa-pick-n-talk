/**
 * @file src/components/partials/forms/UserForm.settings-save.test.tsx
 * @description Test suite for UserForm settings saving functionality.
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import UserForm from "./UserForm";
import type { User } from "@/db/models";

// Mock react-i18next
const mockT = vi.fn((key: string, defaultValue?: string, options?: any) => {
  if (options?.count !== undefined) {
    return defaultValue?.replace("{{count}}", String(options.count)) || key;
  }
  if (options?.role) {
    return defaultValue?.replace("{{role}}", options.role) || key;
  }
  return defaultValue || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: { language: "en" },
  }),
}));

// Mock bcryptjs
vi.mock("bcryptjs", () => ({
  hash: vi.fn().mockResolvedValue("hashed-password"),
}));

// Mock state management hooks
const mockCreateUserAccount = vi.fn();
const mockUpdateUserAccount = vi.fn();

vi.mock("@/utils/state/actions", () => ({
  useUserActions: () => ({
    createUserAccount: mockCreateUserAccount,
    updateUserAccount: mockUpdateUserAccount,
  }),
}));

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe("UserForm Settings Save", () => {
  const mockOnSaved = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save user settings when creating a new user", async () => {
    render(
      <TestWrapper>
        <UserForm
          role="user"
          onSaved={mockOnSaved}
        />
      </TestWrapper>
    );

    // Fill out the basic form
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Find and interact with settings
    const languageSelector = screen.getByRole("button", { name: /🇺🇸/ });
    const themeSelector = screen.getByRole("button", { name: /light/i });
    const daltonismSelector = screen.getByRole("button", { name: /👁️ default/i });
    const highContrastToggle = screen.getByRole("button", { name: /high contrast/i });

    expect(languageSelector).toBeInTheDocument();
    expect(themeSelector).toBeInTheDocument();
    expect(daltonismSelector).toBeInTheDocument();
    expect(highContrastToggle).toBeInTheDocument();

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /create user/i });
    fireEvent.click(submitButton);

    // Wait for form submission
    await waitFor(() => {
      expect(mockCreateUserAccount).toHaveBeenCalled();
    });

    // Verify that the user data includes settings
    const userData = mockCreateUserAccount.mock.calls[0][0];
    expect(userData).toMatchObject({
      name: "Test User",
      email: "test@example.com",
      role: "user",
      settings: {
        language: "en",
        themeMode: "light",
        fontSize: "normal",
        daltonismMode: "default",
        highContrast: false,
      },
    });
  });

  it("should preserve existing user settings when editing", async () => {
    const existingUser: User = {
      id: "test-user-id",
      name: "Existing User",
      email: "existing@example.com",
      hash: "existing-hash",
      role: "user",
      binders: [],
      settings: {
        language: "fr",
        themeMode: "dark",
        fontSize: "large",
        daltonismMode: "protanopia",
        highContrast: true,
      },
    };

    render(
      <TestWrapper>
        <UserForm
          user={existingUser}
          role="user"
          onSaved={mockOnSaved}
        />
      </TestWrapper>
    );

    // Check that existing settings are loaded
    const languageSelector = screen.getByRole("button", { name: /🇫🇷/ });
    const themeSelector = screen.getByRole("button", { name: /dark/i });
    const daltonismSelector = screen.getByRole("button", { name: /🔴 protanopia/i });

    expect(languageSelector).toBeInTheDocument();
    expect(themeSelector).toBeInTheDocument();
    expect(daltonismSelector).toBeInTheDocument();

    // Submit the form without changes
    const submitButton = screen.getByRole("button", { name: /update user/i });
    fireEvent.click(submitButton);

    // Wait for form submission
    await waitFor(() => {
      expect(mockUpdateUserAccount).toHaveBeenCalled();
    });

    // Verify that the user settings are preserved
    const userData = mockUpdateUserAccount.mock.calls[0][0];
    expect(userData.settings).toMatchObject({
      language: "fr",
      themeMode: "dark", 
      fontSize: "large",
      daltonismMode: "protanopia",
      highContrast: true,
    });
  });

  it("should handle missing settings gracefully", async () => {
    const userWithoutSettings: Partial<User> = {
      id: "test-user-id",
      name: "User No Settings",
      email: "nosettings@example.com",
      hash: "hash",
      role: "user",
      binders: [],
      // settings is undefined
    };

    render(
      <TestWrapper>
        <UserForm
          user={userWithoutSettings as User}
          role="user"
          onSaved={mockOnSaved}
        />
      </TestWrapper>
    );

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /update user/i });
    fireEvent.click(submitButton);

    // Wait for form submission
    await waitFor(() => {
      expect(mockUpdateUserAccount).toHaveBeenCalled();
    });

    // Verify that default settings are applied
    const userData = mockUpdateUserAccount.mock.calls[0][0];
    expect(userData.settings).toMatchObject({
      language: "en",
      themeMode: "light",
      fontSize: "normal", 
      daltonismMode: "default",
      highContrast: false,
    });
  });
});