/**
 * @file src/components/ui/data-input/UserSettingsPanel.test.tsx
 * @description Tests for UserSettingsPanel component.
 */

import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import UserSettingsPanel from "./UserSettingsPanel";

// Mock react-i18next
const mockT = vi.fn((key: string, defaultValue?: string) => defaultValue || key);

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

// Mock theme components to avoid test complexity
vi.mock("@/components/ui/LocaleSelector", () => ({
  default: () => <div data-testid="locale-selector">Language Selector</div>,
}));

vi.mock("@/components/ui/theme/ThemeModeToggle", () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

vi.mock("@/components/ui/theme/DaltonismModeToggle", () => ({
  default: () => <div data-testid="daltonism-toggle">Daltonism Toggle</div>,
}));

vi.mock("@/components/ui/theme/FontSizeSelector", () => ({
  default: () => <div data-testid="font-size-selector">Font Size Selector</div>,
}));

vi.mock("@/components/ui/theme/HighContrastModeToggle", () => ({
  default: () => <div data-testid="high-contrast-toggle">High Contrast Toggle</div>,
}));

// Wrapper component that provides Router context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("UserSettingsPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render personal preferences title and subtitle", () => {
      render(
        <TestWrapper>
          <UserSettingsPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Personal Preferences")).toBeInTheDocument();
      expect(screen.getByText("Customize your experience with personalized settings.")).toBeInTheDocument();
    });

    it("should render language settings section", () => {
      render(
        <TestWrapper>
          <UserSettingsPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Language")).toBeInTheDocument();
      expect(screen.getByTestId("locale-selector")).toBeInTheDocument();
    });

    it("should render appearance settings section", () => {
      render(
        <TestWrapper>
          <UserSettingsPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Appearance")).toBeInTheDocument();
      expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("font-size-selector")).toBeInTheDocument();
    });

    it("should render accessibility settings section", () => {
      render(
        <TestWrapper>
          <UserSettingsPanel />
        </TestWrapper>
      );

      expect(screen.getByText("Accessibility")).toBeInTheDocument();
      expect(screen.getByTestId("daltonism-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("high-contrast-toggle")).toBeInTheDocument();
    });

    it("should render all setting components", () => {
      render(
        <TestWrapper>
          <UserSettingsPanel />
        </TestWrapper>
      );

      // Verify all settings components are rendered
      expect(screen.getByTestId("locale-selector")).toBeInTheDocument();
      expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("font-size-selector")).toBeInTheDocument();
      expect(screen.getByTestId("daltonism-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("high-contrast-toggle")).toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("should apply custom className", () => {
      const customClass = "custom-settings-panel";
      const { container } = render(
        <TestWrapper>
          <UserSettingsPanel className={customClass} />
        </TestWrapper>
      );

      expect(container.querySelector(".custom-settings-panel")).toBeInTheDocument();
    });
  });

  describe("structure", () => {
    it("should organize settings in proper sections", () => {
      render(
        <TestWrapper>
          <UserSettingsPanel />
        </TestWrapper>
      );

      // Check that section headings are present
      const languageSection = screen.getByText("Language");
      const appearanceSection = screen.getByText("Appearance");
      const accessibilitySection = screen.getByText("Accessibility");

      expect(languageSection).toBeInTheDocument();
      expect(appearanceSection).toBeInTheDocument();
      expect(accessibilitySection).toBeInTheDocument();
    });
  });
});
