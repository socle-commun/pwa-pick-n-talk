import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import HighContrastModeToggle from "./HighContrastModeToggle";

// Mock the useHighContrastMode hook
const mockSetHighContrastMode = vi.fn();
const mockToggleHighContrastMode = vi.fn();

vi.mock("@/utils/theme", () => ({
  useHighContrastMode: () => ({
    highContrastMode: "normal",
    setHighContrastMode: mockSetHighContrastMode,
    toggleHighContrastMode: mockToggleHighContrastMode,
    isNormal: true,
    isHighContrast: false,
  }),
}));

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback || key,
  }),
}));

describe("HighContrastModeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<HighContrastModeToggle />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByLabelText("High Contrast Mode")).toBeInTheDocument();
  });

  it("should display current high contrast mode", () => {
    render(<HighContrastModeToggle />);

    expect(screen.getByText("normal")).toBeInTheDocument();
  });

  it("should have proper accessibility attributes", () => {
    render(<HighContrastModeToggle />);

    const label = screen.getByLabelText("High Contrast Mode");
    const combobox = screen.getByRole("combobox");

    expect(label).toBeInTheDocument();
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("should contain SVG icons", () => {
    const { container } = render(<HighContrastModeToggle />);

    // Check that SVG elements are present
    const svgElements = container.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThan(0);
  });
});
