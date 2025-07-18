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
    
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("High Contrast")).toBeInTheDocument();
  });

  it("should display current high contrast mode", () => {
    render(<HighContrastModeToggle />);
    
    expect(screen.getByText("normal")).toBeInTheDocument();
  });

  it("should apply custom className when provided", () => {
    const { container } = render(<HighContrastModeToggle className="custom-class" />);
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should have proper accessibility attributes", () => {
    render(<HighContrastModeToggle />);
    
    const label = screen.getByText("High Contrast");
    const button = screen.getByRole("button");
    
    expect(label).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("should contain SVG icons", () => {
    const { container } = render(<HighContrastModeToggle />);
    
    // Check that SVG elements are present
    const svgElements = container.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThan(0);
  });
});