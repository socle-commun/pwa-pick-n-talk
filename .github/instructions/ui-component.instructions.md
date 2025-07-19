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
