import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import LocaleSelector from "./LocaleSelector";

// Mock react-i18next
const mockChangeLanguage = vi.fn();
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    "language.selector.label": "Language",
    "language.selector.ariaLabel": "Select language",
    "language.selector.english": "English",
    "language.selector.french": "Français",
  };
  return translations[key] || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: {
      language: "en-US",
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe("LocaleSelector", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the full variant with label", () => {
    render(<LocaleSelector />);

    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("renders the compact variant without label", () => {
    render(<LocaleSelector variant="compact" />);

    expect(screen.queryByText("Language")).not.toBeInTheDocument();
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
  });

  it("shows current language correctly", () => {
    render(<LocaleSelector />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("🇺🇸");
    expect(button).toHaveTextContent("English");
  });

  it("applies custom className", () => {
    const { container } = render(<LocaleSelector className="custom-class" />);

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders compact variant with correct styles", () => {
    render(<LocaleSelector variant="compact" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("flex", "items-center", "gap-2");
  });

  it("calls t function with correct keys", () => {
    render(<LocaleSelector />);

    expect(mockT).toHaveBeenCalledWith("language.selector.label");
    expect(mockT).toHaveBeenCalledWith("language.selector.english");
  });
});
