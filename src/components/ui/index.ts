// UI Components Library
//
// This directory contains reusable UI components organized by category:
//
// - actions/       - Interactive components (buttons, links)
// - data-display/  - Components for displaying data (tables, lists, badges)
// - data-input/    - Form inputs and controls (input, select, checkbox)
// - feedback/      - User feedback components (alerts, toasts, progress)
// - forms/         - Complete form system with validation (NEW!)
// - layout/        - Layout and structural components (containers, grids)
// - navigation/    - Navigation components (navbar, breadcrumbs, tabs)
// - typography/    - Text and typography components

// Forms System - Comprehensive form solution
export { default as Form } from "./forms/Form";
export { default as FormProvider } from "./forms/FormContext";
export { default as FormInput } from "./forms/FormInput";
export { useForm, useFormField } from "./forms/hooks";
export type { FormContextType, ValidationError } from "./forms/context";

// Locale Selection
export { default as LocaleSelector } from "./LocaleSelector";

// Re-export common components
export * from "./data-input";
export * from "./actions";
export * from "./feedback";
export * from "./navigation";
export * from "./layout";
export * from "./typography";
export * from "./data-display";
