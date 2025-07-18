# Pick'n'Talk

[![Tests](https://github.com/socle-commun/pwa-pick-n-talk/actions/workflows/test.yml/badge.svg)](https://github.com/socle-commun/pwa-pick-n-talk/actions/workflows/test.yml)
[![Lint](https://github.com/socle-commun/pwa-pick-n-talk/actions/workflows/lint.yml/badge.svg)](https://github.com/socle-commun/pwa-pick-n-talk/actions/workflows/lint.yml)

Pick'n'Talk est une application de communication visuelle 📱 destinée aux personnes ayant des troubles de la parole 🗣️. Elle permet de créer et d'utiliser plusieurs classeurs de pictogrammes 📚 pour faciliter l'expression des besoins, des émotions et des idées 💬.

## Fonctionnalités principales ✨

- Création de plusieurs classeurs personnalisés 🗂️
- Ajout, modification et organisation de pictogrammes 🖼️
- **🔊 Synthèse vocale (TTS)** : Lecture à voix haute des mots associés aux pictogrammes
- Interface intuitive et accessible 👆
- Prise en charge de différents profils utilisateurs 👤
- Support multilingue (français, anglais) 🌍 avec sélecteur de langue rapide
- **🌐 Sélecteur de langue** : Changement de langue instantané via interface dédiée
- **⚡ Interface ultra-réactive** : Mise à jour temps réel des données avec useLiveQuery (voir [documentation](docs/architecture-reactive.md))
- Adaptée aux enfants comme aux adultes 👶👵

## Pour qui ? 🤔

Pick'n'Talk s'adresse aux personnes en situation de handicap de la parole, aux aidants, aux familles et aux professionnels de santé 👨‍⚕️👩‍🏫.

## Objectif 🎯

Favoriser l'autonomie et l'inclusion en offrant un outil simple, flexible et efficace pour communiquer au quotidien 🤝.

## CI/CD et Qualité du Code 🔧

Ce projet utilise GitHub Actions pour maintenir la qualité du code :

- **Tests automatisés** : Exécution des tests Vitest sur chaque push et pull request
- **Lint automatique** : Validation du code avec ESLint pour maintenir la cohérence
- **Blocage des PR** : Les pull requests sont automatiquement bloquées si les tests ou le linting échouent
- **Multi-version Node.js** : Tests sur Node.js 18.x et 20.x pour assurer la compatibilité

Les workflows se déclenchent automatiquement sur les branches `main` et `develop` ainsi que sur toutes les pull requests.
