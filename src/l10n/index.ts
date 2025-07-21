import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/**
 * Initializes i18next for multi-language support with optimized loading.
 * Loads translations lazily and detects user language.
 */
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fr", "es"],
    fallbackLng: ["en", "fr", "es"],
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      // Translation files will be loaded from /locales/{{lng}}/translation.json
      loadPath: "/locales/{{lng}}/translation.json",
      // Only load translations when needed
      allowMultiLoading: false,
      // Cache translations in localStorage for better performance
      crossDomain: false,
    },
    // Load only required namespaces
    ns: ["translation"],
    defaultNS: "translation",
    // Lazy loading configuration
    load: "languageOnly", // Load only the language, not the region
    preload: [], // Don't preload all languages, load on demand
    // Performance optimizations
    cleanCode: true,
    // Reduce bundle size by not loading unused features
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: "fallback",
  });

export default i18n;
