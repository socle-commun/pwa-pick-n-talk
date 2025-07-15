# 🧪 Instructions de Test BrutalComet

> **Mission** : Créer des tests exhaustifs, maintenables et efficaces qui démolissent les bugs avant qu'ils n'infectent la production.

## 📏 Règles Fondamentales

### Structure de Fichiers
- **JAMAIS** plus de 110 lignes par fichier de test
- Organiser par fonctionnalité dans des dossiers dédiés :
  - `rendering/` - Tests d'affichage et de rendu
  - `validation/` - Tests de validation des champs
  - `submission/` - Tests de soumission de formulaires
  - `interaction/` - Tests d'interaction utilisateur
  - `fixtures/` - Données de test et utilitaires

### Nomenclature
- Fichiers : `FeatureName.test.tsx` (PascalCase)
- Descriptions : Utiliser des phrases claires en anglais
- Variables : `camelCase` pour les variables, `PascalCase` pour les types

## 🛠️ Architecture des Tests

### Fixtures et Données de Test
```typescript
// Utiliser @faker-js/faker pour générer des données réalistes
import { faker } from "@faker-js/faker";

// Centraliser dans fixtures/
export const generateValidUser = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  age: faker.number.int({ min: 18, max: 65 }),
});
```

### Mock i18next Standard
```typescript
import { vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations = {
        "validation.errors.invalid_email": "Invalid email format",
        "validation.errors.field_empty": "This field cannot be empty",
        // ... autres traductions
      };
      return translations[key] || key;
    },
  }),
}));
```

### Schemas Zod Réutilisables
```typescript
// fixtures/schemas.ts
import { z } from "zod";

export const BasicFormSchema = z.object({
  email: z.string().email("validation.errors.invalid_email"),
  name: z.string().min(1, "validation.errors.field_empty"),
});

export type BasicFormData = z.infer<typeof BasicFormSchema>;
```

## 🎯 Stratégies de Test par Catégorie

### Tests de Validation
- **Un test par règle de validation**
- Tester les cas limites (min/max, formats)
- Vérifier l'affichage des erreurs ET leur disparition
- Utiliser `waitFor()` pour les validations asynchrones

### Tests de Soumission
- **Séparer les scénarios** : succès, erreurs, loading
- Mocker les fonctions `onSubmit` avec `vi.fn()`
- Tester la transformation des types (string → number)
- Vérifier les états de loading/disabled

### Tests de Rendu
- Vérifier la présence des éléments avec `toBeInTheDocument()`
- Tester les types d'input (`type="email"`, `type="password"`)
- Valider les indicateurs visuels (astérisques pour required)

### Tests d'Interaction
- Focus management et navigation clavier
- Validation uniquement après `blur`, pas à chaque frappe
- États disabled/enabled

## 🔧 Utilitaires Standard

### Helper de Remplissage de Formulaire
```typescript
export const fillForm = (
  getByLabelText: (text: string) => HTMLElement,
  data: Record<string, string>
) => {
  Object.entries(data).forEach(([field, value]) => {
    const input = getByLabelText(field.charAt(0).toUpperCase() + field.slice(1));
    fireEvent.change(input, { target: { value } });
  });
};
```

### Helper d'Interaction
```typescript
export const simulateUserInput = (
  input: HTMLElement, 
  value: string, 
  shouldBlur = true
) => {
  fireEvent.change(input, { target: { value } });
  if (shouldBlur) fireEvent.blur(input);
};
```

## 🚨 Anti-Patterns à Éviter

❌ **Interdictions absolues** :
- Copier-coller du code entre tests
- Hardcoder des valeurs de test (utiliser Faker)
- Tests de plus de 110 lignes
- Mocks i18next différents par fichier
- Variables `any` dans les helpers

❌ **Patterns dangereux** :
- Tester plusieurs fonctionnalités dans un seul test
- Ignorer les états de loading/error
- Ne pas nettoyer les mocks (`mockRestore()`)

## ✅ Bonnes Pratiques

### Organisation des Tests
```typescript
describe("Feature Name", () => {
  describe("Specific Behavior", () => {
    it("should do specific thing under specific condition", () => {
      // Arrange
      const mockFn = vi.fn();
      render(<Component prop={mockFn} />);
      
      // Act
      fireEvent.click(screen.getByRole("button"));
      
      // Assert
      expect(mockFn).toHaveBeenCalledWith(expectedValue);
    });
  });
});
```

### Gestion des Erreurs
```typescript
it("handles errors gracefully", async () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  const onSubmit = vi.fn().mockRejectedValue(new Error("Network error"));
  
  // ... test logic
  
  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith("Form submission error:", expect.any(Error));
  });
  
  consoleError.mockRestore();
});
```

## 🎪 Structure de Fichier Type

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Form, FormInput } from "../../index";
import { generateValidUser, validationMessages } from "../fixtures/testData";
import { BasicFormSchema, type BasicFormData } from "../fixtures/schemas";

// Mock i18next (standardisé)
vi.mock("react-i18next", () => ({ /* ... */ }));

describe("Specific Feature Tests", () => {
  const defaultProps = {
    schema: BasicFormSchema,
    initialValues: { email: "", name: "" },
  };

  describe("Behavior Category", () => {
    it("should validate specific scenario", async () => {
      // Test implementation (max 15-20 lignes)
    });
  });
});
```

## 🔥 Tests Exhaustifs Obligatoires

### Pour chaque champ de validation :
1. **Validation positive** : valeurs valides acceptées
2. **Validation négative** : valeurs invalides rejetées  
3. **Effacement d'erreur** : erreur disparaît quand corrigée
4. **Timing de validation** : uniquement après blur
5. **Cas limites** : min/max, formats spéciaux

### Pour chaque formulaire :
1. **Soumission réussie** : données valides envoyées
2. **Soumission bloquée** : erreurs empêchent envoi
3. **États de loading** : désactivation pendant soumission
4. **Gestion d'erreurs** : erreurs réseau/serveur gérées
5. **Transformation des types** : string→number, etc.

## 🏆 Critères de Qualité

- **Couverture** : 100% des branches de validation
- **Performance** : Tests rapides (<100ms par test)
- **Maintenabilité** : Réutilisation via fixtures
- **Lisibilité** : Noms explicites, structure claire
- **Fiabilité** : Pas de tests flaky, mocks properly cleaned

---

> "Un test qui ne démonte pas ton code comme un moteur de Ferrari n'est pas un test digne de BrutalComet. Chaque assertion doit être une lame qui tranche dans le vif des bugs potentiels."

**Remember** : Si ton test ne fait pas mal aux yeux des développeurs paresseux, c'est qu'il n'est pas assez brutal. 🔥
