---
applyTo: "src/components/ui/**"
---

# UI Component Development Instructions

Instructions for developing consistent, accessible, and maintainable UI components following established patterns after PR #27 integration.

---

## 🏗️ **Component Architecture**

### Headless UI Integration
- **Base**: Always extend `@headlessui/react` components for interactive elements
- **Pattern**: Import as `HeadlessComponentName`, extend props, apply custom styling
```typescript
import { Button as HeadlessButton, type ButtonProps as HeadlessButtonProps } from "@headlessui/react";
```

### ForwardRef Usage
- **Required**: All interactive components must use `forwardRef` for proper ref handling
- **Pattern**: Export with proper TypeScript typing for ref forwarding
```typescript
export default forwardRef(function ComponentName(props, ref: ForwardedRef<HTMLElement>) {
  // Implementation
});
```

### TypeScript Standards
- **Props**: Use discriminated unions for mutually exclusive prop combinations
- **Omit**: Remove conflicting props from Headless UI: `Omit<HeadlessProps, "as" | "className">`
- **Extensions**: Extend component props with `{ className?: string } & ComponentSpecificProps`

---

## 🎨 **Design System Standards**

### Tailwind CSS Organization
- **Base Classes**: Define core component styles in separate `.styles.ts` files
- **Design Tokens**: Use CSS custom properties: `--spacing()`, `--radius-lg`, `--btn-bg`
- **Modular**: Split complex styling into `base`, `variants`, and `colors` objects

### cn() Utility Usage
- **Import**: `import cn from "@/utils/cn"` for all conditional class merging
- **Pattern**: Always merge `className` prop with component defaults
```typescript
className={cn(styles.base, variant && styles[variant], className)}
```

### Dark Mode Support
- **Built-in**: All components support `dark:` prefixes automatically
- **Pseudo-elements**: Use `before:` and `after:` for complex layering with dark mode variants
- **Colors**: Define both light and dark variants in color systems

### Accessibility Requirements
- **ARIA**: Include proper ARIA attributes, especially `aria-hidden`, `aria-label`
- **Focus**: Use `data-focus:outline-2` for focus management patterns
- **Touch Targets**: Wrap interactive content with `<TouchTarget>` for mobile optimization

---

## 📝 **Component Structure**

### File Organization
- **Location**: All components in `src/components/ui/**` with category-based folders
- **Files**: `ComponentName.tsx`, `ComponentName.test.tsx`, `index.ts`, optional `component.styles.ts`
- **Exports**: Use barrel exports in category `index.ts` and main `ui/index.ts`

### Props Interface Design
- **Naming**: Use `ComponentNameProps` for primary interface
- **Composition**: Combine Headless UI props with custom props using intersections
- **Optional**: Make `className` always optional with sensible defaults

### Slot-based Architecture
- **Data Slots**: Use `data-slot` attributes for styling hooks: `data-slot="control"`, `data-slot="icon"`
- **Selectors**: Target slots in CSS: `*:data-[slot=icon]:size-5`
- **Flexibility**: Enable composition through slot-based styling patterns

---

## 🧪 **Testing Requirements**

### Vitest Patterns (NOT Jest!)
- **Imports**: Always `import { vi, describe, it, expect } from "vitest"`
- **Mocking**: Use `vi.mock()` and `vi.fn()` - never Jest equivalents
- **Setup**: Use `beforeEach(() => vi.clearAllMocks())` for cleanup

### Component Testing Standards
```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("ComponentName", () => {
  it("should render without crashing", () => {
    render(<Component>Content</Component>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Accessibility Testing
- **Roles**: Test proper ARIA roles with `getByRole()`
- **Labels**: Verify accessible names and descriptions
- **Keyboard**: Test focus management and keyboard navigation

---

## 📚 **Documentation & Performance**

### Component API Documentation
- **Props**: Document all props with TypeScript interfaces
- **Examples**: Include usage examples in component files
- **Variants**: Document all styling variants and combinations

### Performance Guidelines
- **Lazy Loading**: Use dynamic imports for large component sets
- **Memoization**: Apply `React.memo()` only when necessary
- **Bundle Size**: Keep individual components under 10KB when built

### Browser Compatibility
- **Target**: Modern browsers with CSS custom properties support
- **Touch**: Optimize for both pointer and touch interactions
- **Responsive**: Design mobile-first with progressive enhancement

---

## 🔗 **Related Files & Documentation**

### Core Files
- [`src/components/ui/index.ts`](../../../src/components/ui/index.ts) - Central component exports
- [`src/utils/cn.ts`](../../../src/utils/cn.ts) - Class name utility function
- [`docs/ui-components.md`](../../../docs/ui-components.md) - Complete UI library documentation

### Component Categories
- [`src/components/ui/actions/`](../../../src/components/ui/actions/) - Interactive components (buttons, touch targets)
- [`src/components/ui/data-input/`](../../../src/components/ui/data-input/) - Form controls and inputs
- [`src/components/ui/data-display/`](../../../src/components/ui/data-display/) - Data presentation components
- [`src/components/ui/navigation/`](../../../src/components/ui/navigation/) - Navigation elements
- [`src/components/ui/feedback/`](../../../src/components/ui/feedback/) - Alerts, dialogs, error boundaries
- [`src/components/ui/typography/`](../../../src/components/ui/typography/) - Text and heading components
- [`src/components/ui/layout/`](../../../src/components/ui/layout/) - Layout and structural components

### Configuration & Testing
- [`vitest.config.ts`](../../../vitest.config.ts) - Vitest testing configuration
- [`package.json`](../../../package.json) - Dependencies (Headless UI, Tailwind CSS, testing)
- [`vitest.setup.ts`](../../../vitest.setup.ts) - Test environment setup

### Development Guidelines
- [`.github/instructions/developer.instructions.md`](../developer.instructions.md) - General coding standards
- [`.github/instructions/tester.instructions.md`](../tester.instructions.md) - Testing guidelines and patterns
- [`README.md`](../../../README.md) - Project overview and setup