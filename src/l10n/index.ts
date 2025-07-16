import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

/**
 * Initializes i18next for multi-language support.
 * Loads translations from /locales and detects user language.
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
    },
  });

export default i18n;
