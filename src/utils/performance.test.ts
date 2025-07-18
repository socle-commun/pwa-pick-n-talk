import { describe, it, expect, vi } from "vitest";
import { performanceMonitor } from "@/utils/performance";

// Mock web-vitals
vi.mock("web-vitals", () => ({
  onCLS: vi.fn((callback) => callback({ value: 0.05 })),
  onFCP: vi.fn((callback) => callback({ value: 1200 })),
  onINP: vi.fn((callback) => callback({ value: 150 })),
  onLCP: vi.fn((callback) => callback({ value: 2000 })),
  onTTFB: vi.fn((callback) => callback({ value: 600 })),
}));

// Mock window.performance
Object.defineProperty(window, "performance", {
  value: {
    getEntriesByType: vi.fn(() => []),
  },
  writable: true,
});

describe("Performance Monitor", () => {
  it("should initialize and track metrics", () => {
    performanceMonitor.init();

    const metrics = performanceMonitor.getMetrics();
    expect(Object.keys(metrics)).toContain("CLS");
    expect(Object.keys(metrics)).toContain("FCP");
    expect(Object.keys(metrics)).toContain("INP");
    expect(Object.keys(metrics)).toContain("LCP");
    expect(Object.keys(metrics)).toContain("TTFB");
  });

  it("should calculate performance score", () => {
    performanceMonitor.init();

    const { score, details } = performanceMonitor.getPerformanceScore();
    expect(score).toBeGreaterThan(0);
    expect(details).toBeDefined();
    expect(details.CLS).toBe("good");
    expect(details.FCP).toBe("good");
    expect(details.INP).toBe("good");
    expect(details.LCP).toBe("good");
    expect(details.TTFB).toBe("good");
  });
});
