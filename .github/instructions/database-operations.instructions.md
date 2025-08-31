---
applyTo: "src/db/**/*.ts"
---

# 🗄️ Database Operations Instructions

## 📏 Rules

- **Reactive only** - Use `useLiveQuery`, never `useEffect` for data fetching
- **Transaction safety** - Multi-table operations require transactions
- **Method binding** - Bind all queries to `PickNTalkDB` class
- **Type safety** - Validate entities before database operations

## 🏗️ Structure

```
src/db/
├── index.ts            # Main PickNTalkDB class
├── queries/            # Query implementations
│   ├── user-queries.ts    # User read operations
│   ├── binder-queries.ts  # Binder read operations
│   ├── mutations.ts       # Create operations  
│   ├── updates.ts         # Update operations
│   └── deletions.ts       # Delete operations
└── models/             # Entity schemas and types
```

## 🔍 Patterns

### Reactive Hook
```typescript
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";
import { db } from "@/db";

export function useBinders() {
  const { i18n } = useTranslation();
  return useLiveQuery(
    () => db.getBinders().filter(b => b.language === i18n.language),
    [i18n.language]
  );
}
```

### Query Method
```typescript
// src/db/queries/user-queries.ts
import type { PickNTalkDB } from "@/db";

export function getUser(this: PickNTalkDB, uuid: string) {
  return this.users.get(uuid);
}

export function getUserByEmail(this: PickNTalkDB, email: string) {
  return this.users.where("email").equals(email).first();
}
```

### Transaction Update
```typescript
// src/db/queries/updates.ts
import type { PickNTalkDB } from "@/db";
import type { Binder } from "@/db/models";

export function updateBinder(this: PickNTalkDB, binder: Binder) {
  return this.transaction("rw", this.binders, this.pictograms, () => {
    this.binders.update(binder.id, binder);
    this.pictograms.where({ binderId: binder.id }).modify({ 
      binderTitle: binder.title 
    });
  });
}
```

### Safe Delete
```typescript
// src/db/queries/deletions.ts  
import type { PickNTalkDB } from "@/db";

export function deleteBinder(this: PickNTalkDB, binderId: string) {
  return this.transaction("rw", this.binders, this.pictograms, () => {
    this.pictograms.where({ binderId }).delete();
    this.binders.delete(binderId);
  });
}
```

## 🚨 Error Handling

```tsx
// Component level - let ErrorBoundary handle
import { Spinner } from "@/components/ui/feedback";
import { ErrorBoundary } from "@/components/ui/feedback";

if (!data) return (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem' }}>
    <Spinner size="lg" aria-label="Loading..." />
  </Box>
);
if (error) return (
  <ErrorBoundary error={error} />
);

// Query level - log and rethrow
.catch(error => {
  console.error("Database operation failed:", error);
  throw new Error(`Query failed: ${error.message}`);
});
```

## 🧪 Testing

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { db } from "@/db";

describe("Database Operations", () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it("handles reactive queries", async () => {
    const user = await db.createUser({
      id: "test-uuid",
      email: "test@example.com",
      name: "Test User",
      hash: "hashed-password",
      role: "user",
      settings: {},
      binders: [],
    });

    const result = await db.getUser(user.id);
    expect(result).toBeDefined();
    expect(result?.email).toBe("test@example.com");
  });

  it("handles transaction-based updates", async () => {
    const binderId = await db.createBinder({
      id: "test-binder",
      title: "Test Binder",
      author: "user-id",
      isFavorite: false,
      pictograms: [],
      users: [],
    });

    await db.updateBinder({
      id: binderId,
      title: "Updated Binder",
      author: "user-id",
      isFavorite: true,
      pictograms: [],
      users: [],
    });

    const updated = await db.getBinder(binderId);
    expect(updated?.title).toBe("Updated Binder");
  });
});
```

## 📚 References

- [Dexie.js Documentation](https://dexie.org/docs/)
- [useLiveQuery Hook](https://dexie.org/docs/dexie-react-hooks/useLiveQuery())
- [Transaction Documentation](https://dexie.org/docs/Transaction/Transaction)