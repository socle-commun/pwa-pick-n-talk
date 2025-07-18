import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import FontSizeSelector from "./FontSizeSelector";
import * as fontSizeHook from "@/utils/theme/useFontSize";

// Mock the translation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, fallback: string) => fallback,
  }),
}));

// Mock the useFontSize hook
const mockSetFontSize = vi.fn();
const mockUseFontSize = vi.spyOn(fontSizeHook, "useFontSize");

describe("FontSizeSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFontSize.mockReturnValue({
      fontSize: "normal",
      setFontSize: mockSetFontSize,
      scale: 1.0,
      isNormal: true,
      isLarge: false,
      isExtraLarge: false,
    });
  });

  it("should render without crashing", () => {
    render(<FontSizeSelector />);
    
    expect(screen.getByText("Font Size")).toBeInTheDocument();
    expect(screen.getByText("normal")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("should show current font size and scale", () => {
    mockUseFontSize.mockReturnValue({
      fontSize: "large",
      setFontSize: mockSetFontSize,
      scale: 1.125,
      isNormal: false,
      isLarge: true,
      isExtraLarge: false,
    });

    render(<FontSizeSelector />);
    
    expect(screen.getByText("large")).toBeInTheDocument();
    expect(screen.getByText("113%")).toBeInTheDocument();
  });

  it("should render button with proper accessibility attributes", () => {
    render(<FontSizeSelector />);
    
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-haspopup", "listbox");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("should apply scale transform to icons", () => {
    mockUseFontSize.mockReturnValue({
      fontSize: "extra-large",
      setFontSize: mockSetFontSize,
      scale: 1.25,
      isNormal: false,
      isLarge: false,
      isExtraLarge: true,
    });

    render(<FontSizeSelector />);
    
    const button = screen.getByRole("button");
    const icon = button.querySelector("svg");
    
    expect(icon).toHaveStyle({ transform: "scale(1.25)" });
  });

  it("should support custom className", () => {
    const { container } = render(<FontSizeSelector className="custom-class" />);
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should display extra-large font size correctly", () => {
    mockUseFontSize.mockReturnValue({
      fontSize: "extra-large",
      setFontSize: mockSetFontSize,
      scale: 1.25,
      isNormal: false,
      isLarge: false,
      isExtraLarge: true,
    });

    render(<FontSizeSelector />);
    
    expect(screen.getByText("extra-large")).toBeInTheDocument();
    expect(screen.getByText("125%")).toBeInTheDocument();
  });
});