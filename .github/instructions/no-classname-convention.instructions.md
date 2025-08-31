---
applyTo: "**/*.tsx,**/*.ts"
---

# 🚫 CONVENTION STRICTE: INTERDICTION DES className

## ❌ RÈGLE ABSOLUE

**L'utilisation de `className` est strictement INTERDITE dans ce projet.**

Cette règle s'applique à :
- ✅ Tous les fichiers TypeScript/React (.ts/.tsx)
- ✅ Tous les composants React
- ✅ Toutes les interfaces et types
- ✅ Toute la documentation

## 🎯 Motivation

1. **Cohérence du design system** : MUI v7 fournit un système de design complet
2. **Maintenabilité** : Un seul système de style à maintenir
3. **Thème unifié** : Support automatique du dark mode et des thèmes d'accessibilité
4. **Performance** : Optimisations CSS-in-JS intégrées

## ✅ À UTILISER (Autorisé)

### 1. Composants MUI avec sx prop
```tsx
import { Box, Typography, Button } from "@mui/material";

// ✅ CORRECT
<Box sx={{ p: 2, bgcolor: "background.paper" }}>
  <Typography variant="h4" sx={{ mb: 2, color: "primary.main" }}>
    Titre
  </Typography>
  <Button variant="contained" sx={{ mt: 1 }}>
    Action
  </Button>
</Box>
```

### 2. Style responsive avec sx
```tsx
// ✅ CORRECT
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 1, md: 2 },
    p: { xs: 2, md: 4 },
  }}
>
```

### 3. Système de grille MUI
```tsx
// ✅ CORRECT
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Card>Contenu</Card>
  </Grid>
</Grid>
```

## ❌ INTERDIT (Erreur ESLint)

### 1. className avec Tailwind
```tsx
// ❌ INTERDIT - Erreur ESLint
<div className="bg-blue-500 text-white p-4">
  Contenu
</div>
```

### 2. className personnalisé
```tsx
// ❌ INTERDIT - Erreur ESLint
<div className="my-custom-class">
  Contenu
</div>
```

### 3. Propriété className dans les interfaces
```tsx
// ❌ INTERDIT - Erreur ESLint
interface Props {
  className?: string; // NON !
}
```

### 4. Combinaison className + sx
```tsx
// ❌ INTERDIT - Erreur ESLint
<Box className="custom-box" sx={{ p: 2 }}>
  Contenu
</Box>
```

## 🔧 Migration des className existants

### Avant (❌)
```tsx
<div className="container mx-auto px-4 py-8 max-w-4xl">
  <h1 className="text-2xl font-bold mb-4">Titre</h1>
  <p className="text-gray-600 leading-relaxed">Description</p>
</div>
```

### Après (✅)
```tsx
<Container maxWidth="lg" sx={{ py: 4 }}>
  <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: "bold" }}>
    Titre
  </Typography>
  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
    Description
  </Typography>
</Container>
```

## 🛠️ Outils de validation

### 1. ESLint (Automatique)
Les règles ESLint suivantes sont configurées :
- `no-restricted-syntax` : Interdit l'attribut JSX `className`
- `no-restricted-globals` : Interdit la variable `className`

### 2. Vérification manuelle
```bash
# Rechercher les className restants
npm run lint
```

## 📋 Exceptions (Très rares)

### Cas autorisés uniquement :
1. **Tests** : Sélecteurs pour les tests E2E
2. **Librairies externes** : Quand absolutely nécessaire
3. **Legacy** : Migration en cours (temporaire)

### Syntaxe d'exception :
```tsx
// ✅ Exception documentée pour test E2E
<Button data-testid="submit-button" /* className pour test seulement */>
```

## 🎨 Références MUI

- [sx prop documentation](https://mui.com/system/getting-started/the-sx-prop/)
- [Responsive design](https://mui.com/system/basics/#responsive-values)
- [Theme tokens](https://mui.com/material-ui/customization/default-theme/)
- [Color palette](https://mui.com/material-ui/customization/palette/)

## ⚡ Actions immédiates

1. **Développeurs** : Ne jamais utiliser `className`
2. **Code Review** : Rejeter tout PR avec `className`
3. **CI/CD** : Le build échoue si `className` détecté
4. **Documentation** : Mettre à jour tous les exemples

---

**Résumé** : `className` = ❌ | `sx` prop = ✅
