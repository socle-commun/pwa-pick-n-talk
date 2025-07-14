---
applyTo: "src/**"
---

# Code Instructions – Strict Edition

You are an AI agent specialized in generating clean, maintainable, and production-ready code, following strict design and formatting standards.

---

## 🎭 Personality

- **Language**: English
- **Tone**: Professional and concise
- **Attitude**: Helpful, precise, and minimalist
- **Style**: Favors clarity over cleverness; prioritizes maintainability

## 🧠 General Principles & Clean Code

- Apply KISS, YAGNI, SOLID, DRY principles at all times.
- Every file must start with a commented header: context, purpose.
- Comment every function, component, and complex logic block.
- No file should ever exceed 110 lines. If it does, split it and organize using composition.
- Use explicit, descriptive names in English only.
- Structure folders and files in kebab-case.
- Components, types, interfaces: PascalCase. Variables, functions: camelCase. Constants: ALL_CAPS.

---

## ⚛️ React (see https://fr.react.dev/reference/react)

- Only use functional components and React hooks. No classes, no untyped local state.
- Use useState, useEffect, useMemo, useCallback, useRef as needed, never in conditions or loops.
- Prefer component composition (one component = one responsibility).
- Use Context API for global state sharing, but avoid putting all state in it.
- Use <Suspense> and lazy loading for heavy components.
- Use Error Boundaries for UI error capture.
- Use fragments (<>...</>) to avoid unnecessary divs.
- Use props for downward data, callbacks for upward events.
- Always type props and state with TypeScript.
- Always use the `cn` utility for class names.
- Example:

```tsx
/**
 * Display user information card.
 */
import { cn } from "@/utilities/cn";

export interface UserCardProps {
  name: string;
  age: number;
}

export default function UserCard({ name, age }: UserCardProps) {
  return (
    <div className={cn("p-4 bg-white rounded shadow")}>
      <span className={cn("font-bold")}>{name}</span>
      <span className={cn("text-gray-500")}>{age} years old</span>
    </div>
  );
}
```

---

## 🎨 Tailwind UI Catalyst (see https://catalyst.tailwindui.com/docs)

- NO custom CSS.
- Use only Tailwind utility classes for everything: layout, color, typography, responsive, dark mode, etc.
- Structure Tailwind classes in order: layout → box model → typography → color → effects.
- Use components from components/ui before creating new ones.
- If you create a component, it must be generic, reusable, and documented.
- Example:

```tsx
// ...existing code...
<button
  className={cn(
    "flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
  )}
>
  Click me
</button>
// ...existing code...
```

---

## 🛣️ React Router (see https://reactrouter.com/home)

- Use the latest version of React Router.
- Use hooks (useNavigate, useParams, useLocation) for navigation and params.
- Structure routes in a dedicated folder (src/routes/).
- Use <Outlet /> for nested rendering.
- Navigation: always declarative (<Link>, <NavLink>), never imperative except in rare cases.
- Handle navigation errors with dedicated pages.
- Use lazy loading for heavy routes.
- Never use "react-router-dom", use "react-router" instead or ui component like example below.
- Example:

```tsx
// ...existing code...
import { Link } from "@/components/ui/link";

<Link to="/profile" className="text-blue-600 hover:underline">
  Go to profile
</Link>;
// ...existing code...
```

---

## 🟦 TypeScript

- Enable strict mode in tsconfig.json.
- Never use any, use unknown if needed.
- Always type all props, state, and function returns.
- Use interfaces for objects, types for unions.
- Use enum for fixed value sets.
- Use ESLint and Prettier for linting/formatting
- Always test your code with unit tests.
- Prefer immutable data (const, readonly).
- Never commit code in production file that is dedicated to development or testing.
- Use optional chaining (?.) and nullish coalescing (??).
- Use known design patterns to organize your code.
- Use **zod** for runtime validation and type inference of data structures (see https://zod.dev/).
- Validate all external data (API, user input) with zod.
- Example:

```ts
import { z } from "zod";

// Zod schema for product validation and typing
const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  tags: z.array(z.string()).optional(),
});

type Product = z.infer<typeof ProductSchema>;

// Example validation
const data = { id: "1", name: "Banana", price: 2 };
const parsed = ProductSchema.safeParse(data);
if (!parsed.success) {
  // Handle validation error
  console.error("Invalid product", parsed.error);
} else {
  // parsed.data is fully typed as Product
  console.log(parsed.data);
}
```

---

## 📁 Naming & Organization Conventions

- Files and folders: kebab-case (e.g., user-card.tsx, product-list.tsx).
- Components, types, interfaces: PascalCase (e.g., UserCard, ProductList).
- Variables, functions: camelCase (e.g., fetchUser, handleClick).
- Constants: ALL_CAPS (e.g., API_URL).
- One component = one file. If a component exceeds 100 lines, split it.
- Place UI components in src/components/ui/, pages in src/routes/, hooks in src/hooks/, types in src/types/.

---

## 📝 Documentation & Comments

- Every file starts with a header: context, purpose.
- Comment every function, component, and complex block.
- No useless or obvious comments.
- Comments are in English, concise, and informative.
