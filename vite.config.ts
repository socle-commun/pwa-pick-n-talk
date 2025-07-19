import { defineConfig } from "vite";
/// <reference types="vitest" />
import { mergeConfig } from "vite";
import vitestConfig from "./vitest.config";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

import { resolve } from "path";

// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    base: process.env.NODE_ENV === "production" ? "/pick-n-talk/" : "/",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React libraries
            "react": ["react", "react-dom"],
            "react-router": ["react-router"],

            // State management
            "state-management": ["jotai"],

            // UI libraries (split by size and usage)
            "ui": ["@headlessui/react", "@heroicons/react", "framer-motion"],

            // Utilities
            "utils": ["clsx", "tailwind-merge"],

            // Database
            "database": ["dexie", "dexie-react-hooks"],

            // i18n (keep together for efficiency)
            "i18n": [
              "i18next",
              "react-i18next",
              "i18next-http-backend",
              "i18next-browser-languagedetector",
            ],

            // Forms and validation
            "forms": ["react-hook-form", "zod"],

            // Other utilities
            "crypto": ["bcryptjs"],
          },
        },
      },
      // Enable compression and optimize build
      reportCompressedSize: true,
      chunkSizeWarningLimit: 500,
      minify: process.env.NODE_ENV === "production" ? "terser" : false,
      terserOptions: {
        compress: {
          passes: 2,
          drop_console: process.env.NODE_ENV === "production",
          drop_debugger: process.env.NODE_ENV === "production",
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
      // Optimize CSS
      cssCodeSplit: true,
      cssMinify: process.env.NODE_ENV === "production",
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    logLevel: "info",
    plugins: [
      react(),
      tailwindcss(),
      visualizer({
        filename: "dist/bundle-analyzer.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  }),
  vitestConfig
);
