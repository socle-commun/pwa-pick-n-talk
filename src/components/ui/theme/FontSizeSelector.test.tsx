import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import * as fontSizeHook from "@/utils/theme/useFontSize";

import FontSizeSelector from "./FontSizeSelector";

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

    // Utilisons le label spécifiquement
    expect(screen.getByLabelText("Font Size")).toBeInTheDocument();
    expect(screen.getByText("normal")).toBeInTheDocument();
    // Le pourcentage n'est visible que dans le dropdown, pas dans la valeur affichée
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
    // Le pourcentage n'est visible que dans le dropdown, pas dans la valeur affichée
  });

  it("should render button with proper accessibility attributes", () => {
    render(<FontSizeSelector />);

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
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

    const combobox = screen.getByRole("combobox");
    const icon = combobox.querySelector("svg");

    expect(icon).toHaveStyle({ transform: "scale(1.25)" });
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
    // Le pourcentage n'est visible que dans le dropdown, pas dans la valeur affichée
  });
});
