/* eslint-disable max-lines */
/**
 * @file WelcomeStep.test.tsx
 * @description Tests for the Welcome onboarding step component
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router";

import WelcomeStep from "./WelcomeStep";
import { db } from "@/db";

// Mock the database
vi.mock("@/db", () => ({
  db: {
    createHistory: vi.fn(),
    upsertSetting: vi.fn(),
  },
}));

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock react-i18next
const mockT = vi.fn((key, defaultValue) => defaultValue || key);
const mockI18n = {
  language: "en",
  on: vi.fn(),
  off: vi.fn(),
};

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: mockI18n,
  }),
}));

// Mock theme hooks
vi.mock("@/utils/theme", () => ({
  useThemeMode: () => ({ themeMode: "light", setThemeMode: vi.fn() }),
  useFontSize: () => ({ fontSize: "normal", setFontSize: vi.fn() }),
  useDaltonismMode: () => ({ daltonismMode: "default", setDaltonismMode: vi.fn() }),
  useHighContrastMode: () => ({ highContrastMode: "normal", setHighContrastMode: vi.fn() }),
}));

// Mock Logo component
vi.mock("@/components/partials/global/Logo", () => ({
  default: ({ className }: { className?: string }) => <div data-testid="logo" className={className} />
}));

// Mock UI components
vi.mock("@/components/ui/LocaleSelector", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="locale-selector" className={className}>
      <select data-testid="language-select">
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  )
}));

vi.mock("@/components/ui/theme/ThemeModeToggle", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="theme-toggle" className={className}>
      <select data-testid="theme-select">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}));

vi.mock("@/components/ui/theme/FontSizeSelector", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="font-size-selector" className={className}>
      <select data-testid="font-size-select">
        <option value="normal">Normal</option>
        <option value="large">Large</option>
      </select>
    </div>
  )
}));

vi.mock("@/components/ui/theme/DaltonismModeToggle", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="daltonism-toggle" className={className}>
      <select data-testid="daltonism-select">
        <option value="default">Default</option>
        <option value="protanopia">Protanopia</option>
      </select>
    </div>
  )
}));

vi.mock("@/components/ui/theme/HighContrastModeToggle", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="high-contrast-toggle" className={className}>
      <select data-testid="high-contrast-select">
        <option value="normal">Normal</option>
        <option value="high-contrast">High Contrast</option>
      </select>
    </div>
  )
}));

const renderWelcomeStep = () => {
  return render(
    <BrowserRouter>
      <WelcomeStep />
    </BrowserRouter>
  );
};

describe("WelcomeStep", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock crypto.randomUUID using vi.stubGlobal
    vi.stubGlobal("crypto", {
      randomUUID: vi.fn(() => "test-uuid-123"),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("Rendering", () => {
    it("should render welcome title and subtitle", () => {
      renderWelcomeStep();

      expect(screen.getByText("Welcome to Pick'n'Talk!")).toBeInTheDocument();
      expect(screen.getByText(/Let's get you set up with your personalized communication experience/)).toBeInTheDocument();
    });

    it("should render the logo", () => {
      renderWelcomeStep();

      expect(screen.getByTestId("logo")).toBeInTheDocument();
    });

    it("should render all settings components", () => {
      renderWelcomeStep();

      expect(screen.getByTestId("locale-selector")).toBeInTheDocument();
      expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("font-size-selector")).toBeInTheDocument();
      expect(screen.getByTestId("high-contrast-toggle")).toBeInTheDocument();
      expect(screen.getByTestId("daltonism-toggle")).toBeInTheDocument();
    });

    it("should render action buttons", () => {
      renderWelcomeStep();

      expect(screen.getByText("Start Setup Process")).toBeInTheDocument();
      expect(screen.getByText("Skip for Now")).toBeInTheDocument();
    });

    it("should render informational section", () => {
      renderWelcomeStep();

      expect(screen.getByText("About the Setup Process")).toBeInTheDocument();
      expect(screen.getByText(/The setup process will guide you through creating/)).toBeInTheDocument();
    });
  });

  describe("Database Interactions", () => {
    it("should create setup started history entry on mount", async () => {
      const mockCreateHistory = vi.mocked(db.createHistory);
      mockCreateHistory.mockResolvedValue("history-id");

      renderWelcomeStep();

      await waitFor(() => {
        expect(mockCreateHistory).toHaveBeenCalledWith({
          id: "test-uuid-123",
          entityType: "user",
          entityId: "setup",
          action: "setupStarted",
          performedBy: "system",
          timestamp: expect.any(Date),
          changes: {
            setup: {
              step: "welcome",
              startedAt: expect.any(String),
            },
          },
        });
      });
    });

    it("should initialize tutorial setting", async () => {
      const mockUpsertSetting = vi.mocked(db.upsertSetting);
      mockUpsertSetting.mockResolvedValue("setting-id");

      renderWelcomeStep();

      await waitFor(() => {
        expect(mockUpsertSetting).toHaveBeenCalledWith({
          key: "tutorial",
          value: true,
        });
      });
    });

    it("should handle database errors gracefully", async () => {
      const mockCreateHistory = vi.mocked(db.createHistory);
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockCreateHistory.mockRejectedValue(new Error("Database error"));

      renderWelcomeStep();

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("Failed to log setup started:", expect.any(Error));
      });

      consoleSpy.mockRestore();
    });
  });

  describe("Language Change Handling", () => {
    it("should save language setting when language changes", async () => {
      const mockUpsertSetting = vi.mocked(db.upsertSetting);
      mockUpsertSetting.mockResolvedValue("setting-id");

      renderWelcomeStep();

      // Simulate language change event
      const languageChangeCallback = mockI18n.on.mock.calls.find(
        call => call[0] === "languageChanged"
      )?.[1];

      expect(languageChangeCallback).toBeDefined();

      if (languageChangeCallback) {
        languageChangeCallback("fr");

        await waitFor(() => {
          expect(mockUpsertSetting).toHaveBeenCalledWith({
            key: "language",
            value: "en", // Current i18n.language value
          });
        });
      }
    });

    it("should cleanup language change listener on unmount", () => {
      const { unmount } = renderWelcomeStep();

      expect(mockI18n.on).toHaveBeenCalledWith("languageChanged", expect.any(Function));

      unmount();

      expect(mockI18n.off).toHaveBeenCalledWith("languageChanged", expect.any(Function));
    });
  });

  describe("Start Setup Process", () => {
    it("should handle start setup button click", async () => {
      const mockCreateHistory = vi.mocked(db.createHistory);
      mockCreateHistory.mockResolvedValue("history-id");

      renderWelcomeStep();

      const startButton = screen.getByText("Start Setup Process");
      fireEvent.click(startButton);

      // Check that button shows loading state
      await waitFor(() => {
        expect(screen.getByText("Starting Setup...")).toBeInTheDocument();
      });

      // Check that completion history entry is created
      await waitFor(() => {
        expect(mockCreateHistory).toHaveBeenCalledWith({
          id: expect.any(String),
          entityType: "user",
          entityId: "test-uuid-123",
          action: "update",
          performedBy: "user",
          timestamp: expect.any(Date),
          changes: {
            setup: {
              step: "welcome_completed",
              completedAt: expect.any(String),
            },
          },
        });
      });

      // Check that navigation occurs
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/binders");
      });
    });

    it("should handle errors during setup completion", async () => {
      const mockCreateHistory = vi.mocked(db.createHistory);
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockCreateHistory.mockRejectedValue(new Error("Database error"));

      renderWelcomeStep();

      const startButton = screen.getByText("Start Setup Process");
      fireEvent.click(startButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("Failed to complete welcome step:", expect.any(Error));
      });

      // Button should return to normal state
      await waitFor(() => {
        expect(screen.getByText("Start Setup Process")).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it("should disable button during loading", async () => {
      const mockCreateHistory = vi.mocked(db.createHistory);
      // Make the promise hang to test loading state
      mockCreateHistory.mockImplementation(() => new Promise(() => {}));

      renderWelcomeStep();

      const startButton = screen.getByText("Start Setup Process");
      fireEvent.click(startButton);

      await waitFor(() => {
        const loadingButton = screen.getByText("Starting Setup...");
        expect(loadingButton).toBeDisabled();
      });
    });
  });

  describe("Skip Button", () => {
    it("should render skip button as link to settings", () => {
      renderWelcomeStep();

      const skipButton = screen.getByText("Skip for Now");
      expect(skipButton.closest("a")).toHaveAttribute("href", "/settings");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      renderWelcomeStep();

      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveTextContent("Welcome to Pick'n'Talk!");

      const subHeading = screen.getByRole("heading", { level: 2 });
      expect(subHeading).toHaveTextContent("Global Settings");

      const infoHeading = screen.getByRole("heading", { level: 3 });
      expect(infoHeading).toHaveTextContent("About the Setup Process");
    });

    it("should have proper button roles", () => {
      renderWelcomeStep();

      const startButton = screen.getByRole("button", { name: /start setup process/i });
      expect(startButton).toBeInTheDocument();
    });
  });
});
