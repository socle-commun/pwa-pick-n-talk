import "@testing-library/jest-dom";

// Mock ResizeObserver for HeadlessUI components
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
