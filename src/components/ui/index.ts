/**
 * Central export point for all UI components
 *
 * This file provides a unified interface for importing any UI component
 * from the component library. Components are organized by category:
 * - Actions: Interactive elements like buttons
 * - Data Display: Components for displaying data
 * - Data Input: Form controls and input elements
 * - Navigation: Navigation and routing components
 * - Layout: Structural layout components
 * - Typography: Text and heading components
 * - Feedback: Alerts, dialogs, and status indicators
 */

// Actions
export * from "./actions";

// Data Display
export * from "./data-display";

// Data Input
export * from "./data-input";

// Navigation
export * from "./navigation";

// Layout
export * from "./layout";

// Typography
export * from "./typography";

// Feedback
export * from "./feedback";

// Standalone components
export { default as LocaleSelector } from "./LocaleSelector";

// Error boundaries
export { DatabaseErrorBoundary } from "./errors/DatabaseErrorBoundary";
