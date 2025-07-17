import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

import IndexPage from "./page";

// Mock react-i18next
const mockT = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    "home.title": "Welcome to Pick'n'Talk",
  };
  return translations[key] || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

describe("IndexPage", () => {
  it("renders the home title translation", () => {
    render(<IndexPage />);
    
    expect(screen.getByText("Welcome to Pick'n'Talk")).toBeInTheDocument();
    expect(mockT).toHaveBeenCalledWith("home.title");
  });

  it("displays the logo component", () => {
    const { container } = render(<IndexPage />);
    
    // Check if logo SVG is rendered (it has aria-hidden="true" so we check by tag)
    const logo = container.querySelector("svg");
    expect(logo).toBeInTheDocument();
  });
});