import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import { useHighContrastMode } from "./useHighContrastMode";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("useHighContrastMode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset document classes
    document.documentElement.className = "";
  });

  afterEach(() => {
    // Clean up document classes
    document.documentElement.classList.remove("high-contrast");
  });

  it("should initialize with normal contrast mode by default", () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useHighContrastMode());

    expect(result.current.highContrastMode).toBe("normal");
    expect(result.current.isNormal).toBe(true);
    expect(result.current.isHighContrast).toBe(false);
  });

  it("should initialize with stored high contrast mode", () => {
    mockLocalStorage.getItem.mockReturnValue("high-contrast");

    const { result } = renderHook(() => useHighContrastMode());

    expect(result.current.highContrastMode).toBe("high-contrast");
    expect(result.current.isNormal).toBe(false);
    expect(result.current.isHighContrast).toBe(true);
  });

  it("should toggle between normal and high contrast modes", () => {
    mockLocalStorage.getItem.mockReturnValue("normal");

    const { result } = renderHook(() => useHighContrastMode());

    expect(result.current.highContrastMode).toBe("normal");

    act(() => {
      result.current.toggleHighContrastMode();
    });

    expect(result.current.highContrastMode).toBe("high-contrast");

    act(() => {
      result.current.toggleHighContrastMode();
    });

    expect(result.current.highContrastMode).toBe("normal");
  });

  it("should set high contrast mode directly", () => {
    mockLocalStorage.getItem.mockReturnValue("normal");

    const { result } = renderHook(() => useHighContrastMode());

    act(() => {
      result.current.setHighContrastMode("high-contrast");
    });

    expect(result.current.highContrastMode).toBe("high-contrast");
    expect(result.current.isHighContrast).toBe(true);
  });

  it("should apply high-contrast class to document element", () => {
    mockLocalStorage.getItem.mockReturnValue("normal");

    const { result } = renderHook(() => useHighContrastMode());

    expect(document.documentElement.classList.contains("high-contrast")).toBe(false);

    act(() => {
      result.current.setHighContrastMode("high-contrast");
    });

    expect(document.documentElement.classList.contains("high-contrast")).toBe(true);

    act(() => {
      result.current.setHighContrastMode("normal");
    });

    expect(document.documentElement.classList.contains("high-contrast")).toBe(false);
  });

  it("should handle localStorage errors gracefully", () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });

    const { result } = renderHook(() => useHighContrastMode());

    expect(result.current.highContrastMode).toBe("normal");
  });

  it("should ignore invalid stored values", () => {
    mockLocalStorage.getItem.mockReturnValue("invalid-value");

    const { result } = renderHook(() => useHighContrastMode());

    expect(result.current.highContrastMode).toBe("normal");
  });
});
