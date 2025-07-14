---
applyTo: '*.feature.md|issues|features|user-stories|.github/ISSUE_TEMPLATE/*'
---

# Feature & Issue Writing Instructions

## Objectif

Garantir que chaque feature, issue ou user story soit complète, auto-suffisante et exploitable par n'importe quel membre de l'équipe, sans connaissance préalable du contexte.


## Structure recommandée

Il est recommandé d’utiliser le format YAML moderne de GitHub pour les templates d’issues, qui guide l’utilisateur et garantit la complétude des informations. Exemple de structure :

```yaml
name: Feature Request
description: Proposer une nouvelle fonctionnalité ou une amélioration
labels: ['enhancement', 'feature', 'status/need-triage']
body:
  - type: markdown
    attributes:
      value: |
        > Merci de prendre le temps de suggérer une amélioration !
        >
        > Avant de créer une nouvelle demande, vérifiez que la fonctionnalité n’a pas déjà été proposée dans les [issues existantes](../../issues).
        >
        > Merci de suivre le standard de rédaction : `.github/instructions/feature-writing.instructions.md`

  - type: input
    id: title
    attributes:
      label: Titre de la feature
      description: Un titre clair et explicite pour la fonctionnalité.
    validations:
      required: true

  - type: textarea
    id: contexte
    attributes:
      label: Contexte
      description: Expliquez le besoin, le problème ou la demande. Ajoutez des liens vers la documentation, specs ou tickets liés.
    validations:
      required: true

  - type: textarea
    id: objectif
    attributes:
      label: Objectif / Résultat attendu
      description: Décrivez précisément ce qui doit être livré ou modifié.
    validations:
      required: true

  - type: textarea
    id: criteres
    attributes:
      label: Critères d’acceptation
      description: Listez les conditions à remplir pour considérer la tâche comme terminée (exemples, cas limites…).
    validations:
      required: true

  - type: textarea
    id: etapes
    attributes:
      label: Étapes de réalisation
      description: Découpez la tâche en étapes techniques ou fonctionnelles si pertinent.
    validations:
      required: false

  - type: textarea
    id: impacts
    attributes:
      label: Impacts
      description: Précisez les impacts sur l’existant, la documentation, les tests, etc.
    validations:
      required: false

  - type: textarea
    id: exemples
    attributes:
      label: Exemples
      description: Ajoutez des exemples de données, d’UI, de code ou de comportement attendu.
    validations:
      required: false

  - type: textarea
    id: contexte-supplementaire
    attributes:
      label: Contexte supplémentaire
      description: Ajoutez tout autre contexte, capture d’écran ou information utile.
    validations:
      required: false
```

## Conseils de rédaction

- Être factuel, précis, éviter les termes vagues
- Toujours lier les specs, docs ou tickets concernés
- Préciser les dépendances ou prérequis
- Utiliser le Markdown ou le formatage YAML pour la lisibilité
- Relire pour s’assurer que la tâche est compréhensible sans contexte externe


## Exigence

Aucune feature, issue ou user story ne doit être validée sans respecter ce standard et le template YAML fourni.

