import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DaltonismModeToggle from "@/components/ui/accessibility/DaltonismModeToggle";

// Mock the useDaltonismSettings hook
const mockSetDaltonismMode = vi.fn();
const mockDaltonismConfig = {
  enabled: false,
  type: "none" as const,
};

vi.mock("@/utils/state/useDaltonismSettings", () => ({
  default: () => ({
    daltonismConfig: mockDaltonismConfig,
    setDaltonismMode: mockSetDaltonismMode,
  }),
}));

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string, options?: any) => {
      const translations: Record<string, string> = {
        "accessibility.daltonism.label": "Daltonism Support",
        "accessibility.daltonism.options.none.label": "Default",
        "accessibility.daltonism.options.protanopia.label": "Protanopia",
        "accessibility.daltonism.options.deuteranopia.label": "Deuteranopia",
        "accessibility.daltonism.options.tritanopia.label": "Tritanopia",
      };

      if (key === "accessibility.daltonism.enabled") {
        return `Color adjustments are active for ${options?.type || "unknown"}`;
      }

      return translations[key] || defaultValue || key;
    },
  }),
}));

describe("DaltonismModeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock daltonism config to default state
    mockDaltonismConfig.enabled = false;
    mockDaltonismConfig.type = "none";
  });

  describe("Full variant", () => {
    it("should render with label and description", () => {
      render(<DaltonismModeToggle />);

      expect(screen.getByText("Daltonism Support")).toBeInTheDocument();
      expect(screen.getByText("Default")).toBeInTheDocument();
    });

    it("should display all daltonism options when opened", async () => {
      render(<DaltonismModeToggle />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Default")).toBeInTheDocument();
        expect(screen.getByText("Protanopia")).toBeInTheDocument();
        expect(screen.getByText("Deuteranopia")).toBeInTheDocument();
        expect(screen.getByText("Tritanopia")).toBeInTheDocument();
      });

      // No descriptions anymore - they were removed
    });

    it("should call setDaltonismMode when option is selected", async () => {
      render(<DaltonismModeToggle />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Protanopia")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Protanopia"));

      expect(mockSetDaltonismMode).toHaveBeenCalledWith(true, "protanopia");
    });

    it("should disable daltonism when 'None' is selected", async () => {
      // Set initial state to enabled
      mockDaltonismConfig.enabled = true;
      mockDaltonismConfig.type = "protanopia";

      render(<DaltonismModeToggle />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Default")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Default"));

      expect(mockSetDaltonismMode).toHaveBeenCalledWith(false, "none");
    });

    it("should show enabled state message when daltonism is active", () => {
      mockDaltonismConfig.enabled = true;
      mockDaltonismConfig.type = "deuteranopia";

      render(<DaltonismModeToggle />);

      expect(screen.getByText(/Color adjustments are active for/)).toBeInTheDocument();
    });

    it("should not show enabled state message when daltonism is disabled", () => {
      render(<DaltonismModeToggle />);

      expect(screen.queryByText(/Color adjustments are active/)).not.toBeInTheDocument();
    });
  });

  describe("Compact variant", () => {
    it("should render in compact mode", () => {
      render(<DaltonismModeToggle variant="compact" />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();

      // Should not have the full label in compact mode
      expect(screen.queryByText("Daltonism Support")).not.toBeInTheDocument();
    });

    it("should display options in compact dropdown", async () => {
      render(<DaltonismModeToggle variant="compact" />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Default")).toBeInTheDocument();
        expect(screen.getByText("Protanopia")).toBeInTheDocument();
      });
    });

    it("should work with custom className", () => {
      const { container } = render(
        <DaltonismModeToggle variant="compact" className="custom-class" />
      );

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass("custom-class");
    });
  });

  describe("Current selection display", () => {
    it("should show checkmark for currently selected option", async () => {
      mockDaltonismConfig.enabled = true;
      mockDaltonismConfig.type = "tritanopia";

      render(<DaltonismModeToggle />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("Tritanopia")).toBeInTheDocument();
        // Check that the checkmark icon is present somewhere in the options
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("should display the correct current option in the button", () => {
      mockDaltonismConfig.enabled = true;
      mockDaltonismConfig.type = "protanopia";

      render(<DaltonismModeToggle />);

      expect(screen.getByText("Protanopia")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<DaltonismModeToggle />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-haspopup", "listbox");

      const label = screen.getByText("Daltonism Support");
      expect(label).toBeInTheDocument();
    });

    it("should have keyboard navigation support", async () => {
      render(<DaltonismModeToggle />);

      const button = screen.getByRole("button");

      // Focus the button
      button.focus();
      expect(button).toHaveFocus();

      // Open with Enter key
      fireEvent.keyDown(button, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });
  });
});
