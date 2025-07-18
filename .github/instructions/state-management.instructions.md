---
applyTo: "src/utils/state/**/*.ts"
---

# 🌐 State Management Instructions

## 📏 Rules

- **Jotai atoms** - Use atomic state management for global state
- **Action hooks** - Encapsulate state mutations in custom hooks  
- **Local storage sync** - Persist critical state (user auth, settings)
- **Type safety** - All atoms and actions must be strongly typed
- **No prop drilling** - Use atoms for shared state across components

## 🏗️ Structure

```
src/utils/state/
├── atoms/              # Atomic state definitions
│   ├── index.ts        # Barrel exports
│   └── user-atom.ts    # User authentication state
├── actions/            # State mutation hooks
│   ├── index.ts        # Barrel exports
│   └── use-user-actions.ts # User actions (login, logout)
└── selectors/          # Derived state (if needed)
    └── user-selectors.ts
```

## 🎯 Patterns

### Atom Definition
```typescript
// src/utils/state/atoms/user-atom.ts
import { atomWithStorage } from "jotai/utils";
import type { User } from "@/db/models";

export const userAtom = atomWithStorage<User | null>("user", null);
```

### Action Hook
```typescript
// src/utils/state/actions/use-user-actions.ts
import { compareSync } from "bcryptjs";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { userAtom } from "@/utils/state/atoms";
import { db } from "@/db";

export default function useUserActions() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  function login(email: string, password: string) {
    return db.getUserByEmail(email).then((user) => {
      if (!user || !compareSync(password, user.hash)) {
        throw new Error("Invalid credentials");
      }
      setUser(user);
      navigate("/");
    });
  }

  function logout() {
    setUser(null);
    navigate("/");
  }

  return { login, logout };
}
```

### Component Usage
```typescript
// In components
import { useAtom } from "jotai";
import { userAtom } from "@/utils/state/atoms";
import useUserActions from "@/utils/state/actions";

export default function AuthManager() {
  const [user] = useAtom(userAtom);
  const userActions = useUserActions();

  return user ? (
    <UserProfile user={user} onLogout={userActions.logout} />
  ) : (
    <LoginForm onLogin={userActions.login} />
  );
}
```

### Barrel Exports
```typescript
// src/utils/state/atoms/index.ts
export { userAtom } from "./user-atom";

// src/utils/state/actions/index.ts  
export { default as useUserActions } from "./use-user-actions";
```

## 🚨 Error Handling

```typescript
// In action hooks
.catch(error => {
  console.error("State action failed:", error);
  throw new Error(`Authentication failed: ${error.message}`);
});

// In components - let ErrorBoundary handle
if (error) throw error;
```

## 🧪 Testing

```typescript
// State action tests
import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";

describe("useUserActions", () => {
  it("should login and set user state", async () => {
    const { result } = renderHook(() => useUserActions());
    
    await act(async () => {
      await result.current.login("test@example.com", "password");
    });
    
    expect(localStorage.getItem("user")).toBeTruthy();
  });

  it("should logout and clear user state", async () => {
    const { result } = renderHook(() => useUserActions());
    
    await act(async () => {
      await result.current.logout();
    });
    
    expect(localStorage.getItem("user")).toBeNull();
  });
});
```