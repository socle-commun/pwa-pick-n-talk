/**
 * @file src/components/partials/forms/UserForm.user-role.test.tsx
 * @description Tests for UserForm component with user role support.
 */

import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import UserForm from "./UserForm";

// Mock react-i18next
const mockT = vi.fn((key: string, defaultValue?: string, options?: { role?: string }) => {
  if (options?.role !== undefined) {
    return defaultValue?.replace("{{role}}", options.role) || key;
  }
  return defaultValue || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

// Mock database
vi.mock("@/db", () => ({
  db: {
    createUser: vi.fn(),
    updateUser: vi.fn(),
  },
}));

// Mock UserSettingsPanel and UserSettingsFormPanel
vi.mock("@/components/ui/data-input", () => ({
  UserSettingsPanel: () => (
    <div data-testid="user-settings-panel">Personal Settings</div>
  ),
  UserSettingsFormPanel: () => (
    <div data-testid="user-settings-form-panel">Form Personal Settings</div>
  ),
}));

// Wrapper component that provides Router context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("UserForm with User Role", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("user role support", () => {
    it("should render form for user role", () => {
      render(
        <TestWrapper>
          <UserForm role="user" />
        </TestWrapper>
      );

      expect(screen.getByText("Add User")).toBeInTheDocument();
      expect(screen.getByText("User")).toBeInTheDocument(); // Role display
    });

    it("should show personal settings panel for user role", () => {
      render(
        <TestWrapper>
          <UserForm role="user" />
        </TestWrapper>
      );

      expect(screen.getByTestId("user-settings-form-panel")).toBeInTheDocument();
    });

    it("should not show personal settings panel for caregiver role", () => {
      render(
        <TestWrapper>
          <UserForm role="caregiver" />
        </TestWrapper>
      );

      expect(screen.queryByTestId("user-settings-form-panel")).not.toBeInTheDocument();
    });

    it("should not show personal settings panel for professional role", () => {
      render(
        <TestWrapper>
          <UserForm role="professional" />
        </TestWrapper>
      );

      expect(screen.queryByTestId("user-settings-form-panel")).not.toBeInTheDocument();
    });

    it("should display correct role name for user", () => {
      render(
        <TestWrapper>
          <UserForm role="user" />
        </TestWrapper>
      );

      // The role display should show "User"
      expect(screen.getByText("User")).toBeInTheDocument();
    });
  });

  describe("form fields", () => {
    it("should render all required form fields for user role", () => {
      render(
        <TestWrapper>
          <UserForm role="user" />
        </TestWrapper>
      );

      // Basic fields should be present - using text queries since HeadlessUI uses aria-labelledby
      expect(screen.getByText("Full Name")).toBeInTheDocument();
      expect(screen.getByText("Email Address")).toBeInTheDocument();
      expect(screen.getByText("Password")).toBeInTheDocument();
      expect(screen.getByText("Role")).toBeInTheDocument();

      // Also check for the actual input elements by test ids
      expect(screen.getByTestId("name-input")).toBeInTheDocument();
      expect(screen.getByTestId("email-input")).toBeInTheDocument();
      expect(screen.getByTestId("password-input")).toBeInTheDocument();
    });

    it("should show password help text", () => {
      render(
        <TestWrapper>
          <UserForm role="user" />
        </TestWrapper>
      );

      expect(screen.getByText("Password is optional. If not set, the user will need to create one on first sign-in.")).toBeInTheDocument();
    });

    it("should show role help text", () => {
      render(
        <TestWrapper>
          <UserForm role="user" />
        </TestWrapper>
      );

      expect(screen.getByText("Role is determined by the account type being created")).toBeInTheDocument();
    });
  });

  describe("editing mode", () => {
    const mockUser = {
      id: "test-user",
      name: "Test User",
      email: "test@example.com",
      role: "user" as const,
      settings: { language: "en" },
      binders: [],
    };

    it("should show edit title for existing user", () => {
      render(
        <TestWrapper>
          <UserForm role="user" user={mockUser} />
        </TestWrapper>
      );

      expect(screen.getByText("Edit User")).toBeInTheDocument();
    });

    it("should populate form fields with user data", () => {
      render(
        <TestWrapper>
          <UserForm role="user" user={mockUser} />
        </TestWrapper>
      );

      const nameInput = screen.getByDisplayValue("Test User");
      const emailInput = screen.getByDisplayValue("test@example.com");

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });

    it("should show update button for existing user", () => {
      render(
        <TestWrapper>
          <UserForm role="user" user={mockUser} />
        </TestWrapper>
      );

      expect(screen.getByText("Update User")).toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("should apply custom className", () => {
      const customClass = "custom-user-form";
      const { container } = render(
        <TestWrapper>
          <UserForm role="user" className={customClass} />
        </TestWrapper>
      );

      expect(container.querySelector(".custom-user-form")).toBeInTheDocument();
    });
  });
});
