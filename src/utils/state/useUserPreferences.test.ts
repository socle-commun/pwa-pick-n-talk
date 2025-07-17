import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock document.body.classList
const classListMock = {
  add: vi.fn(),
  remove: vi.fn(),
  contains: vi.fn(),
  toggle: vi.fn(),
};

Object.defineProperty(document.body, "classList", {
  value: classListMock,
});

// We need to dynamically import the hook after setting up mocks
let useUserPreferences: any;
let DEFAULT_USER_PREFERENCES: any;

describe("useUserPreferences", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);

    // Clear the module cache and re-import
    vi.resetModules();
    const preferencesModule = await import("@/db/entities/data/UserPreferences");
    const hookModule = await import("@/utils/state/useUserPreferences");

    DEFAULT_USER_PREFERENCES = preferencesModule.DEFAULT_USER_PREFERENCES;
    useUserPreferences = hookModule.default;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default preferences when localStorage is empty", () => {
    const { result } = renderHook(() => useUserPreferences());

    expect(result.current.preferences).toEqual(DEFAULT_USER_PREFERENCES);
    expect(result.current.isDaltonismEnabled).toBe(false);
    expect(result.current.daltonismType).toBe("none");
  });

  it("should load preferences from localStorage on initialization", () => {
    const storedPrefs = {
      daltonism: {
        enabled: true,
        type: "protanopia",
      },
      locale: "fr",
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedPrefs));

    const { result } = renderHook(() => useUserPreferences());

    expect(result.current.preferences).toEqual(storedPrefs);
    expect(result.current.isDaltonismEnabled).toBe(true);
    expect(result.current.daltonismType).toBe("protanopia");
    expect(localStorageMock.getItem).toHaveBeenCalledWith("user-preferences");
  });

  it("should handle invalid localStorage data gracefully", () => {
    localStorageMock.getItem.mockReturnValue("invalid-json");

    const { result } = renderHook(() => useUserPreferences());

    expect(result.current.preferences).toEqual(DEFAULT_USER_PREFERENCES);
  });

  it("should persist preferences to localStorage when changed", () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.setDaltonismMode(true, "deuteranopia");
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "user-preferences",
      JSON.stringify({
        daltonism: {
          enabled: true,
          type: "deuteranopia",
        },
        locale: "en",
      })
    );
  });

  it("should update daltonism mode correctly", () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.setDaltonismMode(true, "tritanopia");
    });

    expect(result.current.preferences.daltonism.enabled).toBe(true);
    expect(result.current.preferences.daltonism.type).toBe("tritanopia");
    expect(result.current.isDaltonismEnabled).toBe(true);
    expect(result.current.daltonismType).toBe("tritanopia");
  });

  it("should disable daltonism when enabled is false", () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.setDaltonismMode(false);
    });

    expect(result.current.preferences.daltonism.enabled).toBe(false);
    expect(result.current.preferences.daltonism.type).toBe("none");
    expect(result.current.isDaltonismEnabled).toBe(false);
  });

  it("should update locale correctly", () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.setLocale("es");
    });

    expect(result.current.preferences.locale).toBe("es");
  });

  it("should reset to default preferences", () => {
    const { result } = renderHook(() => useUserPreferences());

    // First set some custom preferences
    act(() => {
      result.current.setDaltonismMode(true, "protanopia");
      result.current.setLocale("fr");
    });

    // Then reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.preferences).toEqual(DEFAULT_USER_PREFERENCES);
  });

  it("should apply CSS classes to document body based on daltonism settings", () => {
    const { result } = renderHook(() => useUserPreferences());

    // Enable protanopia
    act(() => {
      result.current.setDaltonismMode(true, "protanopia");
    });

    expect(classListMock.remove).toHaveBeenCalledWith(
      "daltonism-protanopia",
      "daltonism-deuteranopia",
      "daltonism-tritanopia"
    );
    expect(classListMock.add).toHaveBeenCalledWith("daltonism-protanopia");

    // Change to deuteranopia
    act(() => {
      result.current.setDaltonismMode(true, "deuteranopia");
    });

    expect(classListMock.remove).toHaveBeenCalledWith(
      "daltonism-protanopia",
      "daltonism-deuteranopia",
      "daltonism-tritanopia"
    );
    expect(classListMock.add).toHaveBeenCalledWith("daltonism-deuteranopia");

    // Disable daltonism
    act(() => {
      result.current.setDaltonismMode(false);
    });

    expect(classListMock.remove).toHaveBeenCalledWith(
      "daltonism-protanopia",
      "daltonism-deuteranopia",
      "daltonism-tritanopia"
    );
  });

  it("should handle localStorage errors gracefully", () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });

    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.setDaltonismMode(true, "protanopia");
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to save user preferences:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
