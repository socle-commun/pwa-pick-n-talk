/**
 * @file src/components/partials/onboarding/WelcomeStep.test.tsx
 * @description Tests for WelcomeStep component.
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import WelcomeStep from "./WelcomeStep";
import { db } from "@/db";

// Mock react-i18next
const mockT = vi.fn((key: string, defaultValue?: string) => defaultValue || key);
const mockI18n = {
  language: "en",
  changeLanguage: vi.fn(),
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: mockI18n,
  }),
}));

// Mock database
vi.mock("@/db", () => ({
  db: {
    createHistory: vi.fn(),
    upsertSetting: vi.fn(),
  },
}));

// Mock theme hooks
vi.mock("@/utils/theme", () => ({
  useThemeMode: () => ({
    themeMode: "light",
    setThemeMode: vi.fn(),
  }),
  useDaltonismMode: () => ({
    daltonismMode: "none",
    setDaltonismMode: vi.fn(),
  }),
  useFontSize: () => ({
    fontSize: "medium",
    setFontSize: vi.fn(),
  }),
  useHighContrastMode: () => ({
    highContrastMode: "off",
    setHighContrastMode: vi.fn(),
  }),
}));

// Wrapper component that provides Router context
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

describe("WelcomeStep", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render welcome content and settings", () => {
      render(
        <TestWrapper>
          <WelcomeStep />
        </TestWrapper>
      );

      expect(screen.getByText("Welcome to Pick'n'Talk!")).toBeInTheDocument();
      expect(screen.getByText("Let's get you set up with your personalized communication experience. First, let's configure your preferences.")).toBeInTheDocument();
      expect(screen.getByText("Your Preferences")).toBeInTheDocument();
      expect(screen.getByText("Continue Setup")).toBeInTheDocument();
      expect(screen.getByText("Skip for Now")).toBeInTheDocument();
    });

    it("should render all settings sections", () => {
      render(
        <TestWrapper>
          <WelcomeStep />
        </TestWrapper>
      );

      expect(screen.getByText("Language")).toBeInTheDocument();
      expect(screen.getByText("Appearance")).toBeInTheDocument();
      expect(screen.getByText("Accessibility")).toBeInTheDocument();
    });

    it("should render feature highlights", () => {
      render(
        <TestWrapper>
          <WelcomeStep />
        </TestWrapper>
      );

      expect(screen.getByText("Personalized Setup")).toBeInTheDocument();
      expect(screen.getByText("Quick & Easy")).toBeInTheDocument();
    });
  });

  describe("initialization", () => {
    it("should create setup started history on mount", async () => {
      render(
        <TestWrapper>
          <WelcomeStep />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(db.createHistory).toHaveBeenCalledWith(
          expect.objectContaining({
            entityType: "user",
            entityId: "system",
            action: "setupStarted",
            performedBy: "system",
          })
        );
      });
    });

    it("should initialize tutorial setting on mount", async () => {
      render(
        <TestWrapper>
          <WelcomeStep />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(db.upsertSetting).toHaveBeenCalledWith({
          key: "tutorial",
          value: true,
        });
      });
    });
  });

  describe("interaction", () => {
    it("should call onContinue when Continue Setup button is clicked", () => {
      const mockOnContinue = vi.fn();
      render(
        <TestWrapper>
          <WelcomeStep onContinue={mockOnContinue} />
        </TestWrapper>
      );

      const continueButton = screen.getByText("Continue Setup");
      fireEvent.click(continueButton);

      expect(mockOnContinue).toHaveBeenCalled();
    });

    it("should have skip button that links to /binders", () => {
      render(
        <TestWrapper>
          <WelcomeStep />
        </TestWrapper>
      );

      const skipButton = screen.getByText("Skip for Now");
      expect(skipButton.closest("a")).toHaveAttribute("href", "/binders");
    });
  });

  describe("customization", () => {
    it("should apply custom className", () => {
      const customClass = "custom-welcome-class";
      const { container } = render(
        <TestWrapper>
          <WelcomeStep className={customClass} />
        </TestWrapper>
      );

      expect(container.querySelector(".custom-welcome-class")).toBeInTheDocument();
    });
  });
});
