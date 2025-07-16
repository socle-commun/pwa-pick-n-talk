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
├── lib/                # Query implementations
│   ├── *-queries.ts    # Read operations
│   ├── mutations.ts    # Create operations  
│   ├── updates.ts      # Update operations
│   └── deletions.ts    # Delete operations
└── entities/           # Zod validation schemas
```

## 🔍 Patterns

### Reactive Hook
```typescript
export function useBinders() {
  const { i18n } = useTranslation();
  return useLiveQuery(() => db.getTranslatedBinders(i18n.language), [i18n.language]);
}
```

### Query Method
```typescript
// src/db/lib/user-queries.ts
export function getUser(this: PickNTalkDB, uuid: string) {
  return this.users.get(uuid);
}
```

### Transaction Update
```typescript
// src/db/lib/updates.ts
export function updateBinder(this: PickNTalkDB, binder: TranslatedBinder, language: string) {
  return this.transaction("rw", this.binders, this.translations, () => {
    this.binders.update(binder.uuid, binder);
    this.translations.where({ objectUuid: binder.uuid, language }).modify({ value: binder.title });
  });
}
```

### Safe Delete
```typescript
// src/db/lib/deletions.ts  
export function deleteBinder(this: PickNTalkDB, binderUuid: string) {
  return this.transaction("rw", this.binders, this.pictograms, () => {
    this.pictograms.where({ binderUuid }).delete();
    this.binders.delete(binderUuid);
  });
}
```

## 🚨 Error Handling

```typescript
// Component level - let ErrorBoundary handle
if (!data) return <Loading />;
if (error) throw error;

// Query level - log and rethrow
.catch(error => {
  console.error("Query failed:", error);
  throw new Error(`Database operation failed: ${error.message}`);
});
```

## 🧪 Testing

```typescript
describe("Database Operations", () => {
  it("handles reactive queries", async () => {
    const result = await db.getUser("test-uuid");
    expect(result).toBeDefined();
  });
});
```

## 📚 References

- [Dexie.js](https://dexie.org/docs/)
- [useLiveQuery](https://dexie.org/docs/dexie-react-hooks/useLiveQuery())

---

> "Reactive data is the foundation of a smooth user experience. Let Dexie handle the complexity."
