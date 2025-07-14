# Procédure de Test et de Refactoring

Ce document décrit la procédure à suivre pour refactoriser les composants de l'application, corriger les erreurs de lint (notamment `max-lines`), et garantir la non-régression des fonctionnalités grâce à des tests unitaires.

## Objectif

L'objectif est de réduire la taille des fichiers de composants en extrayant la logique de style, tout en maintenant un code fonctionnel et testé.

## Étapes

Pour chaque composant à refactoriser, suivre les étapes ci-dessous :

### 1. Création du Fichier de Test

Avant toute modification, créer un fichier de test pour le composant cible. Le nom du fichier doit suivre la convention `<NomDuComposant>.test.tsx`.

**Exemple :** Pour `Button.tsx`, créer `Button.test.tsx`.

### 2. Rédaction des Tests Comportementaux

Les tests doivent vérifier le comportement du composant du point de vue de l'utilisateur, et non les détails d'implémentation.

Les tests doivent couvrir au minimum :
- L'affichage correct du composant (`render`).
- Les états par défaut (ex: un `Checkbox` est décoché).
- Les interactions de base (ex: `click`, `change`).
- Le comportement des `props` essentielles (ex: `disabled`).

### 3. Exécution des Tests Initiaux

Lancer les tests pour le fichier nouvellement créé afin de s'assurer qu'ils passent et de valider le comportement actuel du composant avant refactoring.

```bash
npm run test -- <chemin/vers/le/fichier/de/test.tsx>
```

### 4. Refactoring du Composant

Une fois la couverture de test en place, procéder au refactoring. Pour les problèmes de `max-lines` dus aux styles, la stratégie est la suivante :

- Créer un fichier de styles dédié : `<NomDuComposant>.styles.ts`.
- Y déplacer les variables de style (ex: `base`, `colors`) et les types associés.
- Exporter ces variables et les importer dans le fichier du composant.

### 5. Vérification Post-Refactoring

Relancer les tests pour vérifier que le refactoring n'a introduit aucune régression.

```bash
npm run test -- <chemin/vers/le/fichier/de/test.tsx>
```

Les tests doivent continuer à passer sans modification.

### 6. Validation du Linting

Lancer la commande de lint pour confirmer que l'erreur `max-lines` pour le fichier refactorisé est bien corrigée.

```bash
npm run lint
```

### 7. Commit des Modifications

Une fois que les tests et le linting sont au vert, commiter les modifications en incluant le composant refactorisé, son nouveau fichier de styles, et son fichier de test.
