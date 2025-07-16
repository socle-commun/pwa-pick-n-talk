import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Checkbox from "./Checkbox";

describe("Checkbox Component", () => {
  test("should render without crashing", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  test("should be unchecked by default", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("should toggle checked state on click", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    // Check the box
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Uncheck the box
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("should be disabled when the disabled prop is true", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-disabled", "true");
  });

  test("should not toggle when disabled", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
