---
applyTo: "src/routes/**/*.tsx"
---

# 🛣️ Routing Instructions

## 📏 Rules

- **React Router v7** - Use modern hooks (`useNavigate`, `useParams`, `useLocation`)
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

export default function BinderPage() {
  const { uuid } = useParams<{ uuid: string }>();
  
  if (!uuid) {
    return <ErrorFallback title="Invalid binder ID" />;
  }
  
  return <BinderContent uuid={uuid} />;
}
```

### Navigation Component
```tsx
// Use Link from UI components
import { Link } from "@/components/ui/navigation";

<Link href="/binders/new">Create Binder</Link>
```

### App Router Setup
```tsx
// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router";

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
export default function ErrorPage() {
  return (
    <main className="grid place-items-center">
      <div className="text-center">
        <h1>404 - Page not found</h1>
        <Button href="/">Go back home</Button>
      </div>
    </main>
  );
}
```

## 🧪 Testing

```tsx
describe("Routing", () => {
  it("renders binder page with uuid", () => {
    render(<BinderPage />, { wrapper: RouterWrapper });
    expect(screen.getByText("Binder Details")).toBeVisible();
  });
});
```

## 📚 References

- [React Router v7](https://reactrouter.com/home)
- [File-based Routing](https://reactrouter.com/explanation/file-route-conventions)
