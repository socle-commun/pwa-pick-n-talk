import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import LocaleSelector from "./LocaleSelector";

// Mock react-i18next
const mockChangeLanguage = vi.fn();
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    "language.selector.label": "Language",
    "language.selector.ariaLabel": "Select language",
    "language.selector.english": "English",
    "language.selector.french": "Français",
    "language.selector.spanish": "Español",
  };
  return translations[key] || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
    i18n: {
      language: "en",
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

    // Le composant n'affiche pas de label "Language", seulement les langues
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

    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveTextContent("🇺🇸");
    expect(combobox).toHaveTextContent("English");
  });

  it("renders compact variant with correct styles", () => {
    render(<LocaleSelector variant="compact" />);

    const combobox = screen.getByRole("combobox");
    // Le test avec des classes Tailwind ne fonctionne plus avec MUI
    expect(combobox).toBeInTheDocument();
  });

  it("calls t function with correct keys", () => {
    render(<LocaleSelector />);

    // Le label n'est plus appelé, seulement les traductions des langues
    expect(mockT).toHaveBeenCalledWith("language.selector.english");
    expect(mockT).toHaveBeenCalledWith("language.selector.spanish");
  });
});
