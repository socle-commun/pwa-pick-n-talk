---
applyTo: "src/routes/**/*.tsx"
---

# 🛣️ Routing Instructions

## 📏 Rules

- **React Router v7** - Use modern hooks (`useNavigate`, `useParams`, `useLocation`)
- **Import from react-router** - Use `import { Outlet } from "react-router"` instead of `react-router-dom`
- **File structure** - Pages in `src/routes/` with nested folders for organization
- **Layout pattern** - Use `<Outlet />` for nested rendering
- **Navigation** - Declarative with UI components, avoid imperative navigation
- **Error handling** - Dedicated error pages and boundaries

## 🏗️ Structure

```
src/routes/
├── layout.tsx          # Root layout with <Outlet />
├── page.tsx            # Home page
├── error.tsx           # 404/error fallback
├── auth/               # Authentication routes
│   ├── sign-in/page.tsx
│   └── sign-up/page.tsx
├── binders/            # Resource routes
│   ├── page.tsx        # List page
│   ├── [uuid]/page.tsx # Detail page  
│   └── [uuid]/edit/page.tsx # Edit page
└── settings/page.tsx   # Settings page
```

## 🎯 Patterns

### Layout Component
```tsx
// src/routes/layout.tsx
import { Outlet } from "react-router";
import { StackedLayout } from "@/components/ui/layout";
import NavBar from "@/components/partials/navigation/NavBar";
import SideBar from "@/components/partials/navigation/SideBar";

export default function Layout() {
  return (
    <StackedLayout navbar={<NavBar />} sidebar={<SideBar />}>
      <Outlet />
    </StackedLayout>
  );
}
```

### Page Component
```tsx
// src/routes/binders/[uuid]/page.tsx
import { useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { BinderContent } from "@/components/partials/binders";
import { ErrorFallback } from "@/components/ui/feedback";
import { db } from "@/db";

export default function BinderPage() {
  const { uuid } = useParams();
  const binder = useLiveQuery(() => uuid ? db.getBinder(uuid) : null, [uuid]);
  
  if (!uuid) {
    return <ErrorFallback title="Invalid binder ID" />;
  }
  
  return (
    <section className="max-w-2xl mx-auto p-6">
      <Heading level={1} className="mb-4">Binder Details</Heading>
      <BinderContent binder={binder} uuid={uuid} />
    </section>
  );

// Note: Heading imported from Catalyst UI
import { Heading } from "@/components/ui/typography";
}
```

### Navigation Component
```tsx
// Use Link from UI components
import { Link } from "@/components/ui/navigation";

<Link to="/binders/new" variant="primary" className="inline-flex items-center gap-2">
  <PlusIcon className="size-5" aria-hidden="true" />
  Create Binder
</Link>

// Note: PlusIcon imported from Catalyst UI icons
import { PlusIcon } from "@/components/ui/icons";
```

### App Router Setup
```tsx
// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "@/routes/layout";
import IndexPage from "@/routes/page";
import BindersPage from "@/routes/binders/page";
import BinderPage from "@/routes/binders/[uuid]/page";
import ErrorPage from "@/routes/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="binders" element={<BindersPage />} />
          <Route path="binders/:uuid" element={<BinderPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## 🚨 Error Handling

```tsx
// src/routes/error.tsx
import { ErrorFallback } from "@/components/ui/feedback";
import { Button } from "@/components/ui/actions";

export default function ErrorPage() {
  return (
    <ErrorFallback 
      title="404 - Page not found"
      description="The page you're looking for doesn't exist."
    >
      <Button href="/" variant="primary">
        Go back home
      </Button>
    </ErrorFallback>
  );
}
```
