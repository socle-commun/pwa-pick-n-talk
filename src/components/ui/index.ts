/**
 * Central export point for all UI components
 *
 * This file provides a unified interface for importing any UI component
 * from the component library. Components are organized by category:
 * - Data Display: Components for displaying data
 * - Data Input: Form controls and input elements
 * - Navigation: Navigation and routing components
 * - Layout: Structural layout components
 * - Feedback: Alerts, dialogs, and status indicators
 * - Forms: Form validation and submission components
 * - Theme: Theme control components
 */

// Feedback
export * from "./feedback";

// Forms
export * from "./forms";

// Theme controls (functional components with business logic)
export { default as DaltonismModeToggle } from "./theme/DaltonismModeToggle";
export { default as FontSizeSelector } from "./theme/FontSizeSelector";
export { default as HighContrastModeToggle } from "./theme/HighContrastModeToggle";
export { default as ThemeModeToggle } from "./theme/ThemeModeToggle";

// Standalone components
export { default as LocaleSelector } from "./LocaleSelector";

// Error boundaries
export { DatabaseErrorBoundary } from "./errors/DatabaseErrorBoundary";
