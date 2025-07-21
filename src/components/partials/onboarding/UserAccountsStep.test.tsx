/**
 * @file src/components/partials/onboarding/UserAccountsStep.test.tsx
 * @description Tests for UserAccountsStep component.
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import UserAccountsStep from "./UserAccountsStep";
import { db } from "@/db";

// Mock react-i18next
const mockT = vi.fn((key: string, defaultValue?: string, options?: { count?: number; name?: string }) => {
  if (options?.count !== undefined) {
    return defaultValue?.replace("{{count}}", options.count) || key;
  }
  if (options?.name !== undefined) {
    return defaultValue?.replace("{{name}}", options.name) || key;
  }
  return defaultValue || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

// Mock database
const mockUsers = [
  {
    id: "user1",
    name: "Test User",
    email: "test@example.com",
    role: "user",
    settings: { language: "en", theme: "light" },
    binders: [],
  },
];

vi.mock("@/db", () => ({
  db: {
    deleteUser: vi.fn(),
    users: {
      toArray: vi.fn(() => Promise.resolve(mockUsers)),
    },
  },
}));

// Mock dexie-react-hooks
vi.mock("dexie-react-hooks", () => ({
  useLiveQuery: vi.fn(() => mockUsers),
}));

// Mock UserForm component
vi.mock("@/components/partials/forms", () => ({
  UserForm: ({ onSaved, onCancel }: { onSaved: (user: unknown) => void; onCancel: () => void }) => (
    <div data-testid="user-form">
      <button onClick={() => onSaved({ id: "new-user", name: "New User", role: "user" })}>
        Save User
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  ),
}));

// Wrapper component that provides Router context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("UserAccountsStep", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render step title and subtitle", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      expect(screen.getByText("Setup User Accounts")).toBeInTheDocument();
      expect(screen.getByText("Create accounts for the primary communication users. Configure their personal preferences and accessibility settings.")).toBeInTheDocument();
    });

    it("should render add user button when no form is shown", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      expect(screen.getByText("Add User Account")).toBeInTheDocument();
      expect(screen.getByText("Create an account for someone who will use communication binders")).toBeInTheDocument();
    });

    it("should show continue button with appropriate text", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      expect(screen.getByText("Continue with 1 user account(s)")).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("should show form when add user button is clicked", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      const addButton = screen.getByText("Add User Account");
      fireEvent.click(addButton);

      expect(screen.getByTestId("user-form")).toBeInTheDocument();
    });

    it("should hide form when user is saved", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      // Open form
      fireEvent.click(screen.getByText("Add User Account"));
      expect(screen.getByTestId("user-form")).toBeInTheDocument();

      // Save user
      fireEvent.click(screen.getByText("Save User"));

      // Form should be hidden
      expect(screen.queryByTestId("user-form")).not.toBeInTheDocument();
    });

    it("should hide form when cancel is clicked", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      // Open form
      fireEvent.click(screen.getByText("Add User Account"));
      expect(screen.getByTestId("user-form")).toBeInTheDocument();

      // Cancel
      fireEvent.click(screen.getByText("Cancel"));

      // Form should be hidden
      expect(screen.queryByTestId("user-form")).not.toBeInTheDocument();
    });

    it("should call onContinue when continue button is clicked", () => {
      const mockOnContinue = vi.fn();
      render(
        <TestWrapper>
          <UserAccountsStep onContinue={mockOnContinue} />
        </TestWrapper>
      );

      const continueButton = screen.getByText("Continue with 1 user account(s)");
      fireEvent.click(continueButton);

      expect(mockOnContinue).toHaveBeenCalled();
    });
  });

  describe("user management", () => {
    it("should display existing user accounts", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      expect(screen.getByText("Created User Accounts")).toBeInTheDocument();
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("test@example.com • User")).toBeInTheDocument();
      expect(screen.getByText("2 personal settings configured")).toBeInTheDocument();
    });

    it("should handle user deletion with confirmation", async () => {
      // Mock window.confirm
      const mockConfirm = vi.spyOn(window, "confirm").mockImplementation(() => true);

      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      const deleteButton = screen.getByText("Delete");
      fireEvent.click(deleteButton);

      expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to delete Test User?");
      await waitFor(() => {
        expect(db.deleteUser).toHaveBeenCalledWith("user1");
      });

      mockConfirm.mockRestore();
    });

    it("should handle user editing", () => {
      render(
        <TestWrapper>
          <UserAccountsStep />
        </TestWrapper>
      );

      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      expect(screen.getByTestId("user-form")).toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("should apply custom className", () => {
      const customClass = "custom-user-accounts-class";
      const { container } = render(
        <TestWrapper>
          <UserAccountsStep className={customClass} />
        </TestWrapper>
      );

      expect(container.querySelector(".custom-user-accounts-class")).toBeInTheDocument();
    });
  });
});
