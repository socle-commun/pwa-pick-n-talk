import { defineConfig } from "vite";
/// <reference types="vitest" />
import { mergeConfig } from "vite";
import vitestConfig from "./vitest.config";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

import { resolve } from "path";

// https://vite.dev/config/
export default mergeConfig(
  defineConfig({
    base: process.env.NODE_ENV === "production" ? "/pick-n-talk/" : "/",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            "react-router": ["react-router"],
            cn: ["clsx", "tailwind-merge"],
            dexie: ["dexie", "dexie-react-hooks"],
            i18next: [
              "i18next",
              "react-i18next",
              "i18next-http-backend",
              "i18next-browser-languagedetector",
            ],
            "framer-motion": ["framer-motion"],
            headlessui: ["@headlessui/react"],
            icons: ["@heroicons/react"],
          },
        },
      },
      minify: process.env.NODE_ENV === "production" ? "terser" : false,
      terserOptions: {
        compress: {
          passes: 2,
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    logLevel: "info",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  }),
  vitestConfig
);
