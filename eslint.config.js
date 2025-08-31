import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";
import vitest from "eslint-plugin-vitest";
import eslintPluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "coverage", "*.config.js", "*.config.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, sonarjs.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "sonar": sonarjs,
      "import": eslintPluginImport,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // Complexity
      "complexity": ["warn", 10],
      "max-depth": ["warn", 4],
      "max-params": ["warn", 4],
      "max-statements": ["warn", 20],
      "max-nested-callbacks": ["warn", 3],

      // Import 

      "import/no-unresolved": "error",
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "alphabetize": { order: "asc", caseInsensitive: true },
          "newlines-between": "always"
        }
      ],

      // Sonar

      "sonarjs/todo-tag": 0,
      "sonarjs/no-hardcoded-passwords": 0,
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",

      // General code quality rules
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",

      // Naming conventions
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
          trailingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "interface",
          format: ["PascalCase"],
        },
      ],
      'no-warning-comments': ['error', { terms: ['eslint-disable'], location: 'anywhere' }],

      // Design System Rules - CRITICAL: No className allowed
      "no-restricted-globals": [
        "error",
        {
          name: "className",
          message: "❌ INTERDICTION: L'utilisation de 'className' est strictement interdite. Utilisez uniquement le système MUI 'sx' prop.",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='className']",
          message: "❌ INTERDICTION: L'attribut 'className' est strictement interdit. Utilisez uniquement les composants MUI avec la prop 'sx' pour le style.",
        },
        {
          selector: "Property[key.name='className']",
          message: "❌ INTERDICTION: La propriété 'className' est strictement interdite. Utilisez uniquement les composants MUI avec la prop 'sx'.",
        },
      ],

      // Code style rules 
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "max-lines": ["error", { "max": 200, "skipBlankLines": true, "skipComments": true }],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        vi: true,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/no-disabled-tests": "error",
      "vitest/no-focused-tests": "error",
      "vitest/expect-expect": "error",
      "max-lines": ["error", { "max": 500, "skipBlankLines": true, "skipComments": true }],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
    },
  }
);
