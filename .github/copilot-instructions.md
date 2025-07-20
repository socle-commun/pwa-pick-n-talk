---
applyTo: "**"
---

- Always use git blame and git log to understand the context before taking decision.
- Always validate your changes with `npm run lint` and `npm run test` before committing.
- Always look at the project [instructions](./instructions/) and [documentation](../docs/).
- Always put documentation in the `docs/` directory.
- Concise responses, organized blocks.
- Technical vocabulary, simple, no fluff.
- Priority to clarity, readability, rigor.
- Always propose an action or plan.
- Regular reminders of code weaknesses or questionable choices.
- Analyze what you read (code, context, instructions).
- Validate all files by creating unit tests.
- All commit messages **must** follow the [Gitmoji](https://gitmoji.dev/) convention.
- prefer to commit in small, logical chunks.
- Language: English
- Always repair lint warnings before committing.
- Never bypass linting rules. Do not add `eslint-disable` comments.
- Never ignore file size or structure. Split components into reusable code.
- Always respect the file architecture.
- Prefer splitting logic into `utils/`, `hooks/`, and `partials/`.
- If the component grows too much, refactor immediately.

## Code Instructions

## 🧠 General Principles & Clean Code

- Apply KISS, YAGNI, SOLID, DRY principles at all times.
- Every file must start with a commented header: context, purpose.
- Comment every function, component, and complex logic block.
- Use explicit, descriptive names in English only.
- Structure folders and files in kebab-case.
- Components, types, interfaces: PascalCase. Variables, functions: camelCase. Constants: ALL_CAPS.

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
- Always use the [`cn`](../src/utils/cn.ts) utility for class names.

## 🎨 Tailwind UI Catalyst (see https://catalyst.tailwindui.com/docs)

- NO custom CSS.
- Use only Tailwind utility classes for everything: layout, color, typography, responsive, dark mode, etc.
- Structure Tailwind classes in order: layout → box model → typography → color → effects.
- Use components from components/ui before creating new ones.
- If you create a component, it must be generic, reusable, and documented.
- See Tailwind UI Catalyst https://catalyst.tailwindui.com/docs
- Always use the template for colors, backgrounds, and borders:
- Never use Tailwind's color palette directly.
- If you need more colors, you need to add them in the templates files first.

## 🛣️ React Router (see https://reactrouter.com/home)

- Structure routes in a dedicated folder (src/routes/).
- Use <Outlet /> for nested rendering.
- Navigation: always declarative (<Link>, <NavLink>), never imperative except in rare cases.
- Handle navigation errors with dedicated pages.
- Use lazy loading for heavy routes.
- **React Router v7** - Use modern hooks (`useNavigate`, `useParams`, `useLocation`)
- **Import from react-router** - Use `import { Outlet } from "react-router"`
- **Navigation** - Declarative with UI components, avoid imperative navigation
- **Error handling** - Dedicated error pages and boundaries

## Forms

- **Labels**: Always use `label` prop on FormInput
- **Required fields**: Use `required` attribute and visual indicators  
- **Error messages**: Automatically linked with `aria-describedby`
- **Form submission**: Disable fieldset during submission
- **Validation timing**: On blur, not on every keystroke
- **Schema caching**: Zod schemas are automatically cached
- Forms are always stored as a partial in src/components/partials/forms/
- Always use the Form component from components/ui/forms

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

## 📁 Naming & Organization Conventions

- Files and folders: kebab-case (e.g., user-card.tsx, product-list.tsx).
- Components, types, interfaces: PascalCase (e.g., UserCard, ProductList).
- Variables, functions: camelCase (e.g., fetchUser, handleClick).
- Constants: ALL_CAPS (e.g., API_URL).
- One component = one file. If a component exceeds 100 lines, split it.
- Place UI components in src/components/ui/, pages in src/routes/, hooks in src/hooks/, types in types/ folder.

## 📝 Documentation & Comments

- Every file starts with a header: context, purpose.
- Comment every function, component, and complex block.
- No useless or obvious comments.
- Comments are in English, concise, and informative.

## Entities & Validation

- Always use [Zod](https://zod.dev/)

## 🗄️ Database Operations 

- **Reactive only** - Use `useLiveQuery`, never `useEffect` for data fetching
- **Transaction safety** - Multi-table operations require transactions
- **Method binding** - Bind all queries to `PickNTalkDB` class
- **Type safety** - Validate entities before database operations
- [Dexie.js Documentation](https://dexie.org/docs/)
- [useLiveQuery Hook](https://dexie.org/docs/dexie-react-hooks/useLiveQuery())
- [Transaction Documentation](https://dexie.org/docs/Transaction/Transaction)

## 🧪 Unit Testing

- Use [Vitest](https://vitest.dev/) for unit testing.
- Use [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for React components.
- Always test your code with unit tests.
- **Organize by folders**: `rendering/`, `validation/`, `submission/`, `interaction/`, `fixtures/`
- Objective is 100% coverage on all files.

## E2E Testing Instructions

- Use Playwright for end-to-end testing.
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Organization](https://playwright.dev/docs/test-organization)
- [Playwright Fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright CI Guide](https://playwright.dev/docs/ci)

### File Naming Convention

- **Test files**: `[feature].spec.ts` (e.g., `auth-signin.spec.ts`)
- **Page objects**: `[page].page.ts` (e.g., `signin.page.ts`)
- **Fixtures**: `[fixture].fixture.ts` (e.g., `auth.fixture.ts`)
- **Utilities**: `[util].util.ts` (e.g., `navigation.util.ts`)

## Performance Guidelines
- **Lazy Loading**: Use dynamic imports for large component sets
- **Memoization**: Apply `React.memo()` only when necessary
- **Bundle Size**: Keep individual components under 10KB when built

## 🧱 Architecture Rules
## Structure
- `components/ui/` → atomic components (Button, Input, etc.)
- `components/partials/` → composed components (forms, cards...)
- `hooks/` → reusable hooks, 1 hook = 1 file
- `types/` → interfaces, enums, types, Zod schemas
- `utils/` → small pure functions, no side effects