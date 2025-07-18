import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { useFontSize } from "./useFontSize";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
});

describe("useFontSize", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset CSS custom property
    document.documentElement.style.removeProperty("--font-size-scale");
  });

  it("should initialize with normal font size by default", () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useFontSize());
    
    expect(result.current.fontSize).toBe("normal");
    expect(result.current.scale).toBe(1.0);
    expect(result.current.isNormal).toBe(true);
    expect(result.current.isLarge).toBe(false);
    expect(result.current.isExtraLarge).toBe(false);
  });

  it("should load font size from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("large");
    
    const { result } = renderHook(() => useFontSize());
    
    expect(result.current.fontSize).toBe("large");
    expect(result.current.scale).toBe(1.125);
    expect(result.current.isLarge).toBe(true);
  });

  it("should change font size and update scale", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useFontSize());
    
    await act(async () => {
      result.current.setFontSize("extra-large");
    });
    
    expect(result.current.fontSize).toBe("extra-large");
    expect(result.current.scale).toBe(1.25);
    expect(result.current.isExtraLarge).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("font-size", "extra-large");
  });

  it("should apply CSS custom property to document", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useFontSize());
    
    // Initial state should set normal scale
    expect(document.documentElement.style.getPropertyValue("--font-size-scale")).toBe("1");
    
    await act(async () => {
      result.current.setFontSize("large");
    });
    
    expect(document.documentElement.style.getPropertyValue("--font-size-scale")).toBe("1.125");
  });

  it("should handle invalid localStorage values gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid-value");
    
    const { result } = renderHook(() => useFontSize());
    
    expect(result.current.fontSize).toBe("normal");
    expect(result.current.scale).toBe(1.0);
  });

  it("should handle localStorage errors gracefully", () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });
    
    const { result } = renderHook(() => useFontSize());
    
    expect(result.current.fontSize).toBe("normal");
    expect(result.current.scale).toBe(1.0);
  });

  it("should handle setItem errors gracefully", async () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });
    
    const { result } = renderHook(() => useFontSize());
    
    await act(async () => {
      result.current.setFontSize("large");
    });
    
    // Should still update state even if localStorage fails
    expect(result.current.fontSize).toBe("large");
  });
});