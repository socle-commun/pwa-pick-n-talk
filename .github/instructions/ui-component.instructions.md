---
applyTo: "src/components/ui/**"
---

# UI Component Development Instructions

- See: https://catalyst.tailwindui.com/docs

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
- **Omit**: Remove conflicting props from component interfaces: `Omit<ComponentProps, "sx">`
- **Extensions**: Extend component props with `{ sx?: SxProps<Theme> } & ComponentSpecificProps`

---

## 🎨 **Design System Standards**

### MUI Theme Organization
- **Base Styles**: Define core component styles using MUI's `styled` API
- **Design Tokens**: Use theme variables: `theme.spacing()`, `theme.shape.borderRadius`, `theme.palette.primary.main`
- **Modular**: Split complex styling into `base`, `variants`, and `colors` objects

### Styling Management
- **sx Prop**: Always use sx prop for dynamic styling: `sx={{ ...baseStyles, ...conditionalStyles }}`
- **Conditional**: Use conditional styling with sx:
```typescript
sx={{
  ...baseStyles,
  ...(variant && variantStyles[variant]),
  ...sx
}}
```
- **Pattern**: Always merge `sx` prop with component defaults

### Accessibility Requirements
- **ARIA**: Include proper ARIA attributes, especially `aria-hidden`, `aria-label`
- **Focus**: Use MUI's focus management with `focusVisible` for focus patterns
- **Touch Targets**: Wrap interactive content with `<TouchTarget>` for mobile optimization

---

## 📝 **Component Structure**

### File Organization
- **Location**: All components in `src/components/ui/**` with category-based folders
- **Files**: `ComponentName.tsx`, `ComponentName.test.tsx`, `index.ts`, optional `component.styles.ts`
- **Exports**: Use barrel exports in category `index.ts` and main `ui/index.ts`

### Props Interface Design
- **Naming**: Use `ComponentNameProps` for primary interface
- **Composition**: Combine MUI component props with custom props using intersections
- **Optional**: Make `sx` always optional with sensible defaults

### Slot-based Architecture
- **Data Slots**: Use `data-slot` attributes for styling hooks: `data-slot="control"`, `data-slot="icon"`
- **MUI Slots**: Leverage MUI's slot system for component customization
- **Flexibility**: Enable composition through MUI's built-in slot system

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
