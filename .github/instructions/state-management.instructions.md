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
│   └── _user.ts        # User authentication state
├── actions/            # State mutation hooks
│   ├── index.ts        # Barrel exports
│   └── _useUserActions.ts # User actions (login, logout)
└── selectors/          # Derived state (if needed)
    └── _userSelectors.ts
```

## 🎯 Patterns

### Atom Definition
```typescript
// src/utils/state/atoms/_user.ts
import { atom } from "jotai";
import type { User } from "@/db/entities/data/User";

const userString = localStorage.getItem("user");
const initialUser: User | null = userString 
  ? JSON.parse(userString) as User 
  : null;

export default atom<User | null>(initialUser);
```

### Action Hook
```typescript
// src/utils/state/actions/_useUserActions.ts
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { userAtom } from "@/utils/state/atoms";

export default function useUserActions() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  function login(email: string, password: string) {
    return db.getUserByEmail(email).then((user) => {
      if (!user || !compareSync(password, user.hash)) {
        throw new Error("Invalid credentials");
      }
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    });
  }

  function logout() {
    localStorage.removeItem("user");
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
    <UserMenu onLogout={userActions.logout} />
  ) : (
    <LoginForm onLogin={userActions.login} />
  );
}
```

### Barrel Exports
```typescript
// src/utils/state/atoms/index.ts
export { default as userAtom } from "./_user";

// src/utils/state/actions/index.ts  
export { default as useUserActions } from "./_useUserActions";
```

## 🔄 State Persistence

```typescript
// Sync with localStorage
const userAtom = atom<User | null>(
  JSON.parse(localStorage.getItem("user") || "null")
);

// Update localStorage in actions
function updateUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
  setUser(user);
}
```

## 🚨 Error Handling

```typescript
// Action error handling
async function login(email: string, password: string) {
  try {
    const user = await db.getUserByEmail(email);
    if (!user) throw new Error("User not found");
    
    setUser(user);
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Let UI handle error display
  }
}
```

## 🧪 Testing

```typescript
describe("useUserActions", () => {
  it("logs in user successfully", async () => {
    const { result } = renderHook(() => useUserActions());
    await act(() => result.current.login("test@example.com", "password"));
    
    expect(localStorage.getItem("user")).toBeTruthy();
  });
});
```

## 📚 References

- [Jotai Documentation](https://jotai.org/)
- [Atomic State Management](https://jotai.org/docs/core/atom)
