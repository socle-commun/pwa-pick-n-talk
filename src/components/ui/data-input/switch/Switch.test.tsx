import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Switch from "./Switch";

describe("Switch Component", () => {
  test("should render without crashing", () => {
    render(<Switch />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
  });

  test("should be unchecked by default", () => {
    render(<Switch />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();
  });

  test("should toggle checked state on click", () => {
    render(<Switch />);
    const switchElement = screen.getByRole("switch");

    // Check the switch
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    // Uncheck the switch
    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  test("should be disabled when the disabled prop is true", () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("data-disabled", "");
  });

  test("should not toggle when disabled", () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();
    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  test("should render with different colors", () => {
    render(<Switch color="red" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeInTheDocument();
    // Further assertions could be made here to check for specific classes based on color prop
  });

  test("should handle controlled state", () => {
    const handleChange = vi.fn();
    render(<Switch checked={true} onChange={handleChange} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();

    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
