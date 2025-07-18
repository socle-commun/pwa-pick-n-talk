import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router";

import IndexPage from "./page";

// Mock react-i18next
const mockT = vi.fn((key: string, options?: { name?: string }) => {
  const translations: Record<string, string> = {
    "home.title": "Welcome to Pick'n'Talk",
    "homepage.hero.title": "Communicate with Confidence",
    "homepage.hero.subtitle": "Pick'n'Talk empowers communication through customizable pictogram binders, designed for everyone who needs alternative communication tools.",
    "homepage.hero.cta.primary": "Get Started",
    "homepage.hero.cta.secondary": "Learn More",
    "homepage.cta.title": "Ready to Get Started?",
    "homepage.cta.description": "Join thousands of users who have improved their communication with Pick'n'Talk.",
    "homepage.features.title": "Why Choose Pick'n'Talk?",
    "homepage.features.items.customizable.title": "Fully Customizable",
    "homepage.features.items.customizable.description": "Create personalized communication binders tailored to your specific needs and preferences.",
    "homepage.features.items.accessible.title": "Accessible Design",
    "homepage.features.items.accessible.description": "Built with accessibility in mind, supporting multiple languages and visual accessibility features.",
    "homepage.features.items.offline.title": "Works Offline",
    "homepage.features.items.offline.description": "Use your communication tools anytime, anywhere - no internet connection required.",
    "homepage.authenticated.welcome": options?.name ? `Welcome back, ${options.name}!` : "Welcome back!",
    "homepage.authenticated.quick_actions": "Quick Actions",
    "homepage.authenticated.recent_binders": "Recent Binders",
    "homepage.empty_state.title": "Let's Get You Started",
    "homepage.empty_state.subtitle": "It looks like this is your first time using Pick'n'Talk. Let's create your communication profile!",
    "homepage.empty_state.cta": "Create Your First Binder",
  };
  return translations[key] || key;
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: mockT,
  }),
}));

// Mock jotai
let mockUser: any = null;
vi.mock("jotai", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAtom: () => [mockUser, vi.fn()],
  };
});

// Mock useBinders hook
let mockBindersData: any = undefined;
vi.mock("@/hooks/useBinders", () => ({
  useBinders: () => mockBindersData,
}));

// Mock useIsEmptyDatabase hook
let mockIsEmptyDatabase: any = undefined;
vi.mock("@/hooks/useIsEmptyDatabase", () => ({
  useIsEmptyDatabase: () => mockIsEmptyDatabase,
}));

// Mock react-router
const mockNavigate = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithRouter(component: React.ReactElement) {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
}

describe("IndexPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
    mockBindersData = undefined;
    mockIsEmptyDatabase = undefined;
    mockNavigate.mockClear();
  });

  it("shows loading state when user is null and binders are undefined", () => {
    mockUser = null;
    mockBindersData = undefined;
    mockIsEmptyDatabase = undefined;

    const { container } = renderWithRouter(<IndexPage />);
    
    const logo = container.querySelector("svg");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("animate-pulse");
  });

  it("renders non-authenticated user experience with hero and features", () => {
    mockUser = null;
    mockBindersData = [];
    mockIsEmptyDatabase = false; // Not empty, so non-authenticated user should see hero

    renderWithRouter(<IndexPage />);
    
    // Check hero section
    expect(screen.getByText("Communicate with Confidence")).toBeInTheDocument();
    expect(screen.getByText("Pick'n'Talk empowers communication through customizable pictogram binders, designed for everyone who needs alternative communication tools.")).toBeInTheDocument();
    expect(screen.getAllByText("Get Started")).toHaveLength(2); // One in hero, one in CTA
    expect(screen.getByText("Learn More")).toBeInTheDocument();
    
    // Check features section
    expect(screen.getByText("Why Choose Pick'n'Talk?")).toBeInTheDocument();
    expect(screen.getByText("Fully Customizable")).toBeInTheDocument();
    expect(screen.getByText("Accessible Design")).toBeInTheDocument();
    expect(screen.getByText("Works Offline")).toBeInTheDocument();
    
    // Check CTA section
    expect(screen.getByText("Ready to Get Started?")).toBeInTheDocument();
    expect(screen.getByText("Join thousands of users who have improved their communication with Pick'n'Talk.")).toBeInTheDocument();
  });

  it("renders authenticated user with empty state when no binders", () => {
    mockUser = { name: "John Doe", email: "john@example.com" };
    mockBindersData = [];
    mockIsEmptyDatabase = false; // Database is not empty, so no redirect

    renderWithRouter(<IndexPage />);
    
    expect(screen.getByText("Welcome back, John Doe!")).toBeInTheDocument();
    expect(screen.getByText("Let's Get You Started")).toBeInTheDocument();
    expect(screen.getByText("It looks like this is your first time using Pick'n'Talk. Let's create your communication profile!")).toBeInTheDocument();
    expect(screen.getByText("Create Your First Binder")).toBeInTheDocument();
  });

  it("renders authenticated user with dashboard when binders exist", () => {
    mockUser = { name: "Jane Doe", email: "jane@example.com" };
    mockBindersData = [
      { id: "1", name: "Binder 1" },
      { id: "2", name: "Binder 2" }
    ];
    mockIsEmptyDatabase = false; // Database is not empty, so no redirect

    renderWithRouter(<IndexPage />);
    
    expect(screen.getByText("Welcome back, Jane Doe!")).toBeInTheDocument();
    expect(screen.getByText("Quick Actions")).toBeInTheDocument();
    expect(screen.getByText("Recent Binders")).toBeInTheDocument();
    expect(screen.getByText("Create Your First Binder")).toBeInTheDocument();
  });

  it("displays the logo component in all states", () => {
    mockUser = null;
    mockBindersData = [];
    mockIsEmptyDatabase = false; // Not empty, so non-authenticated user should see hero

    const { container } = renderWithRouter(<IndexPage />);
    
    const logo = container.querySelector("svg");
    expect(logo).toBeInTheDocument();
  });

  it("redirects to setup when authenticated user has empty database", () => {
    mockUser = { name: "John Doe", email: "john@example.com" };
    mockBindersData = [];
    mockIsEmptyDatabase = true; // Database is empty, should redirect

    renderWithRouter(<IndexPage />);
    
    expect(mockNavigate).toHaveBeenCalledWith("/setup");
  });
});