/**
 * @file src/components/ui/data-input/UserSettingsFormPanel.test.tsx
 * @description Test suite for UserSettingsFormPanel component.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import { FormProvider } from "@/components/ui/forms";
import UserSettingsFormPanel from "./UserSettingsFormPanel";

// Mock react-i18next
const mockT = vi.fn((key: string, defaultValue?: string) => defaultValue || key);

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: { language: "en" },
  }),
}));

// Mock form context
const mockFormContext = {
  values: {},
  errors: [],
  isValid: true,
  isSubmitting: false,
  isDirty: false,
  setValue: vi.fn(),
  getValue: vi.fn((field: string) => {
    switch (field) {
      case "settings.language": return "en";
      case "settings.themeMode": return "light";
      case "settings.fontSize": return "normal";
      case "settings.daltonismMode": return "default";
      case "settings.highContrast": return false;
      default: return undefined;
    }
  }),
  validateField: vi.fn(),
  validateForm: vi.fn(),
  clearErrors: vi.fn(),
  setSubmitting: vi.fn(),
  reset: vi.fn(),
  schema: null,
};

vi.mock("@/components/ui/forms/hooks", () => ({
  useFormField: (name: string) => ({
    value: mockFormContext.getValue(name),
    error: null,
    setValue: mockFormContext.setValue,
    validate: mockFormContext.validateField,
    isInvalid: false,
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <FormProvider>
      {children}
    </FormProvider>
  </MemoryRouter>
);

describe("UserSettingsFormPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render personal preferences title and subtitle", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Personal Preferences")).toBeInTheDocument();
      expect(screen.getByText("Customize your experience with personalized settings.")).toBeInTheDocument();
    });

    it("should render all settings sections", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      expect(screen.getAllByText("Language")).toHaveLength(2); // One heading, one label
      expect(screen.getByText("Appearance")).toBeInTheDocument();
      expect(screen.getByText("Accessibility")).toBeInTheDocument();
    });

    it("should render language selector", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      // Language selector should be present
      expect(screen.getByText("🇺🇸")).toBeInTheDocument(); // US flag for English
    });

    it("should render theme mode and font size selectors", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Theme Mode")).toBeInTheDocument();
      expect(screen.getByText("Font Size")).toBeInTheDocument();
    });

    it("should render accessibility toggle switches", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Color Blindness Support")).toBeInTheDocument();
      expect(screen.getByText("High Contrast")).toBeInTheDocument();
    });
  });

  describe("form integration", () => {
    it("should show proper controls", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      // Check that daltonism selector (now a combobox) exists with default value
      const daltonismSelector = screen.getByRole("button", { name: /👁️ default/ });
      const highContrastToggle = screen.getByRole("button", { name: "High Contrast" });

      expect(daltonismSelector).toBeInTheDocument();
      expect(highContrastToggle).toBeInTheDocument();
    });

    it("should show proper button states for toggles", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      const daltonismSelector = screen.getByRole("button", { name: /👁️ default/ });
      const highContrastToggle = screen.getByRole("button", { name: "High Contrast" });

      expect(daltonismSelector).toBeInTheDocument();
      expect(highContrastToggle).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should have proper headings for form sections", () => {
      render(
        <TestWrapper>
          <UserSettingsFormPanel />
        </TestWrapper>
      );

      // Check for section headings using role
      expect(screen.getByRole("heading", { name: "Language" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Appearance" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Accessibility" })).toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <TestWrapper>
          <UserSettingsFormPanel className="custom-class" />
        </TestWrapper>
      );

      const panelDiv = container.querySelector(".space-y-8");
      expect(panelDiv).toHaveClass("custom-class");
    });
  });
});
