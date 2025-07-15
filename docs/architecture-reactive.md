# Architecture réactive ⚡

L'application utilise une architecture réactive avancée basée sur **Dexie.js** et **useLiveQuery** pour garantir une expérience utilisateur fluide et temps réel.

## Stratégie de données réactive 

**🎯 Principe fondamental** : Toutes les données locales sont gérées de manière réactive avec `useLiveQuery` de Dexie, éliminant le besoin de `useEffect` pour les requêtes de base de données.

### ✅ Implémentation actuelle

- **Listes de classeurs** (`/routes/binders/page.tsx`) : Mise à jour automatique lors d'ajout/suppression
- **Détails des classeurs** (`/routes/binders/[uuid]/page.tsx`) : Réactivité sur les modifications
- **Grille de pictogrammes** (`/components/partials/pictograms/PictogramsGrid.tsx`) : Synchronisation temps réel

### 🔧 Patterns utilisés

1. **useLiveQuery avec gestion d'erreur** :
```tsx
const data = useLiveQuery(async () => {
  try {
    return await db.queryMethod(params);
  } catch (error) {
    console.error("Query failed:", error);
    throw error; // Let Error Boundary handle it
  }
}, [dependencies]);
```

2. **États de chargement standardisés** :
```tsx
if (data === undefined) {
  return <LoadingSpinner />;
}
```

3. **Error Boundaries** : Gestion robuste des erreurs avec `DatabaseErrorBoundary`

### 🚫 Anti-patterns évités

- ❌ `useEffect` pour fetcher des données locales
- ❌ Gestion manuelle du state pour les données DB
- ❌ Polling ou re-fetch manuel

### 🧪 Tests de réactivité

Les tests valident que :
- `useLiveQuery` est correctement utilisé
- Les dépendances sont bien définies  
- Les états de loading/erreur sont gérés
- Les mises à jour réactives fonctionnent

## Avantages

- **Performance** : Pas de re-renders inutiles
- **UX fluide** : Mises à jour instantanées
- **Cohérence** : Synchronisation automatique entre composants
- **Simplicité** : Code plus maintenable sans gestion manuelle d'état